import type { EnhancedCapture, DomElement, AxeViolation } from '../_lib/types.ts'

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
const BODY_TEXT_TAGS = new Set(['p', 'li', 'span', 'label', 'caption', 'figcaption', 'td', 'th'])
const CONTAINER_TAGS = new Set(['div', 'section', 'article', 'nav', 'header', 'footer', 'main', 'aside', 'form', 'ul', 'ol'])

// Styles that matter for design QA — strip everything else to save tokens
const KEEP_STYLES = new Set([
  'color', 'backgroundColor', 'fontSize', 'fontWeight', 'lineHeight', 'borderRadius',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'width', 'height',
])

function pickStyles(styles: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const key of KEEP_STYLES) {
    const v = styles[key]
    if (v && v !== 'none' && v !== 'normal' && v !== '0px' && v !== 'auto' && v !== 'rgba(0, 0, 0, 0)') {
      out[key] = v
    }
  }
  return out
}

function formatBbox(bb: { x: number; y: number; width: number; height: number }): string {
  return `x:${Math.round(bb.x)} y:${Math.round(bb.y)} w:${Math.round(bb.width)} h:${Math.round(bb.height)}`
}

function isOffScreen(el: DomElement): boolean {
  return el.boundingBox.x < -10 || el.boundingBox.y < -10
}

function isDeep(el: DomElement): boolean {
  return (el.tagDepth ?? 999) > 8
}

function isEmptyContainer(el: DomElement): boolean {
  return CONTAINER_TAGS.has(el.tag) && !el.isInteractive && (el.textContent ?? '').trim().length === 0
}

function formatElement(el: DomElement, prefix = ''): string {
  const styles = pickStyles(el.computedStyles)
  const styleStr = Object.entries(styles).map(([k, v]) => `${k}:${v}`).join(' ')
  const text = (el.textContent ?? '').trim().slice(0, 60)
  const role = el.role ? ` role=${el.role}` : ''
  const aria = el.ariaLabel ? ` aria-label="${el.ariaLabel}"` : ''
  const textPart = text ? ` "${text}"` : ''
  const stylesPart = styleStr ? ` [${styleStr}]` : ''
  return `${prefix}<${el.tag}${role}${aria}> ${formatBbox(el.boundingBox)}${textPart}${stylesPart}`
}

function processDomElements(elements: DomElement[]): string[] {
  const lines: string[] = []
  let bodyTextCount = 0

  const headings = elements.filter(el => HEADING_TAGS.has(el.tag) && !isOffScreen(el) && !isDeep(el))
  if (headings.length > 0) {
    lines.push('# Headings')
    for (const el of headings) lines.push(formatElement(el))
  }

  const interactive = elements.filter(el =>
    el.isInteractive && !isOffScreen(el) && !isDeep(el) && !HEADING_TAGS.has(el.tag)
  )
  if (interactive.length > 0) {
    lines.push('# Interactive elements')
    for (const el of interactive) lines.push(formatElement(el))
  }

  lines.push('# Body text (first 20)')
  for (const el of elements) {
    if (bodyTextCount >= 20) break
    if (!BODY_TEXT_TAGS.has(el.tag)) continue
    if (el.isInteractive) continue
    if (isOffScreen(el) || isDeep(el) || isEmptyContainer(el)) continue
    const text = (el.textContent ?? '').trim()
    if (text.length < 3) continue
    lines.push(formatElement(el))
    bodyTextCount++
  }

  return lines
}

function formatAxeViolations(violations: AxeViolation[]): string {
  if (violations.length === 0) return ''
  const lines = ['# Axe-core accessibility violations']
  for (const v of violations) {
    lines.push(`[${v.impact}] ${v.id}: ${v.help}`)
    for (const node of v.nodes.slice(0, 3)) {
      const bb = node.boundingBox ? ` @ ${formatBbox(node.boundingBox)}` : ''
      lines.push(`  • ${node.html.slice(0, 120)}${bb}`)
      if (node.failureSummary) lines.push(`    Fix: ${node.failureSummary.slice(0, 200)}`)
    }
  }
  return lines.join('\n')
}

export function buildDomContext(snapshot: EnhancedCapture): string {
  const sections: string[] = []

  const axeSection = formatAxeViolations(snapshot.axeViolations)
  if (axeSection) sections.push(axeSection)

  const desktopFiltered = snapshot.dom1440.filter(el => !isOffScreen(el) && !isDeep(el) && !isEmptyContainer(el))
  const desktopLines = processDomElements(desktopFiltered)
  if (desktopLines.length > 0) {
    sections.push(`[desktop 1440px]\n${desktopLines.join('\n')}`)
  }

  if (snapshot.dom375.length > 0) {
    const mobileFiltered = snapshot.dom375.filter(el => !isOffScreen(el) && !isDeep(el) && !isEmptyContainer(el))
    const mobileLines = processDomElements(mobileFiltered)
    if (mobileLines.length > 0) {
      sections.push(`[mobile 375px]\n${mobileLines.join('\n')}`)
    }
  }

  const headingCount = snapshot.dom1440.filter(el => HEADING_TAGS.has(el.tag) && !isOffScreen(el) && !isDeep(el)).length
  const interactiveCount = snapshot.dom1440.filter(el => el.isInteractive && !isOffScreen(el) && !isDeep(el)).length
  const axeCount = snapshot.axeViolations.length

  let result = sections.join('\n\n')

  // Safety net: hard cap at ~40K chars (~10K tokens) to avoid budget overrun
  if (result.length > 40000) {
    result = result.slice(0, 40000) + '\n... [DOM context truncated]'
    console.log(`DOM context: truncated to 40000 chars — headings=${headingCount}, interactive=${interactiveCount}, axe_violations=${axeCount}`)
  } else {
    console.log(`DOM context: built ${result.length} chars — headings=${headingCount}, interactive=${interactiveCount}, axe_violations=${axeCount}`)
  }

  return result
}
