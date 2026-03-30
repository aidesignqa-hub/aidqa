import type { DomElement, Finding, AxeViolation, DesignSystemConfig } from '../_lib/types.ts'

// --- Helpers ---

function parseRgb(cssColor: string): [number, number, number, number] | null {
  const m = cssColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!m) return null
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), m[4] !== undefined ? parseFloat(m[4]) : 1]
}

function relativeLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function contrastRatio(fg: [number, number, number, number], bg: [number, number, number, number]): number {
  const l1 = relativeLuminance(fg[0], fg[1], fg[2])
  const l2 = relativeLuminance(bg[0], bg[1], bg[2])
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function parsePx(value: string): number {
  const n = parseFloat(value)
  return isNaN(n) ? 0 : n
}

function stddev(values: number[]): number {
  if (values.length < 2) return 0
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  return Math.sqrt(values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length)
}

function mode(values: number[]): number {
  const freq: Record<number, number> = {}
  for (const v of values) freq[v] = (freq[v] ?? 0) + 1
  return Number(Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0])
}

// --- Rules ---

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return null
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
}

function checkContrast(elements: DomElement[], config?: DesignSystemConfig): Finding[] {
  const textTags = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'label', 'li', 'td', 'th', 'button'])
  const findings: Finding[] = []
  const seen = new Set<string>()

  // Build safe color set from design system config — suppress false positives for brand colors
  const safeBrandColors = new Set<string>()
  if (config?.colors?.length) {
    for (const hex of config.colors) {
      const rgb = hexToRgb(hex)
      if (rgb) safeBrandColors.add(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
    }
  }

  for (const el of elements) {
    if (!textTags.has(el.tag)) continue
    if (!el.textContent.trim()) continue

    const fg = parseRgb(el.computedStyles.color)
    const bg = parseRgb(el.computedStyles.backgroundColor)
    if (!fg || !bg || bg[3] < 0.1) continue  // skip transparent backgrounds

    // If this color pair matches brand colors in design system, skip
    if (safeBrandColors.has(el.computedStyles.color) && safeBrandColors.has(el.computedStyles.backgroundColor)) continue

    const ratio = contrastRatio(fg, bg)
    const fontSize = parsePx(el.computedStyles.fontSize)
    const fontWeight = el.computedStyles.fontWeight
    const isLargeText = fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || parseInt(fontWeight) >= 700))
    const required = isLargeText ? 3 : 4.5

    if (ratio < required) {
      const key = `${el.computedStyles.color}|${el.computedStyles.backgroundColor}`
      if (seen.has(key)) continue
      seen.add(key)

      findings.push({
        category: 'accessibility',
        severity: ratio < 2 ? 'critical' : 'high',
        title: 'Text fails WCAG contrast requirement',
        evidence_type: 'metric',
        evidence: {
          type: 'metric',
          measured: `${ratio.toFixed(2)}:1`,
          threshold: `${required}:1 (WCAG AA${isLargeText ? ' large text' : ''})`,
          element: `${el.tag}${el.textContent.slice(0, 30)}`,
        },
        why_it_matters: 'Users with low vision cannot reliably read this text.',
        repair_guidance: `Increase contrast between text color ${el.computedStyles.color} and background ${el.computedStyles.backgroundColor} to at least ${required}:1.`,
        ai_fix_instruction: `Update the text color or background color of the ${el.tag} element to achieve at least ${required}:1 contrast ratio per WCAG AA.`,
        metric_value: `${ratio.toFixed(2)}:1 contrast ratio`,
        score_impact: -20,
        source: 'deterministic',
      })
    }
  }

  return findings.slice(0, 3)
}

function checkTouchTargets(elements: DomElement[]): Finding[] {
  // Only check elements with explicit interactive tags or ARIA roles — not cursor-inherited children
  const INTERACTIVE_TAGS = new Set(['a', 'button', 'input', 'select', 'textarea'])
  const small = elements.filter(el =>
    (INTERACTIVE_TAGS.has(el.tag) || !!el.role) &&
    (el.boundingBox.width < 44 || el.boundingBox.height < 44) &&
    el.boundingBox.width > 0 &&
    el.boundingBox.height > 0
  )

  if (small.length === 0) return []

  return [{
    category: 'accessibility',
    severity: 'high',
    title: `${small.length} interactive element${small.length > 1 ? 's' : ''} below 44×44px touch target`,
    evidence_type: small.length === 1 ? 'bbox' : 'multi_bbox',
    evidence: small.length === 1
      ? { type: 'bbox', ...small[0].boundingBox, label: small[0].tag }
      : {
          type: 'multi_bbox',
          boxes: small.slice(0, 8).map(el => ({ ...el.boundingBox, label: el.tag })),
          description: `${small.length} interactive elements smaller than 44×44px`,
        },
    why_it_matters: 'Small targets are hard to tap on mobile and strain motor accuracy on desktop.',
    repair_guidance: 'Increase the clickable area to at least 44×44px using padding or min-width/min-height.',
    ai_fix_instruction: 'Add min-width: 44px and min-height: 44px (or equivalent padding) to all interactive elements flagged here.',
    score_impact: -12,
    source: 'deterministic',
  }]
}

function checkSpacingRhythm(elements: DomElement[]): Finding[] {
  const spacingValues: number[] = []

  for (const el of elements) {
    const vals = [
      parsePx(el.computedStyles.marginTop),
      parsePx(el.computedStyles.marginBottom),
      parsePx(el.computedStyles.gap),
    ].filter(v => v > 0)
    spacingValues.push(...vals)
  }

  if (spacingValues.length < 3) return []

  const dominant = mode(spacingValues)
  const outliers = elements.filter(el => {
    const margin = parsePx(el.computedStyles.marginTop)
    if (margin === 0) return false
    const diff = Math.abs(margin - dominant)
    return diff > 4 && diff / dominant > 0.25
  })

  if (outliers.length < 2) return []

  return [{
    category: 'layout',
    severity: 'medium',
    title: 'Inconsistent spacing rhythm',
    evidence_type: 'multi_bbox',
    evidence: {
      type: 'multi_bbox',
      boxes: outliers.slice(0, 6).map(el => ({ ...el.boundingBox })),
      description: `${outliers.length} elements break the dominant ${dominant}px spacing pattern`,
    },
    why_it_matters: 'Irregular spacing makes the layout feel unpolished and hard to scan.',
    repair_guidance: `Normalize margins and gaps to multiples of the dominant spacing value (${dominant}px).`,
    ai_fix_instruction: `Standardize vertical spacing to use consistent increments. The dominant spacing value is ${dominant}px — align outlier elements to this or a multiple of it.`,
    score_impact: -7,
    source: 'deterministic',
  }]
}

function checkButtonDrift(elements: DomElement[]): Finding[] {
  const buttons = elements.filter(el =>
    el.tag === 'button' || el.role === 'button'
  )

  if (buttons.length < 3) return []

  const radii = buttons.map(b => parsePx(b.computedStyles.borderRadius))
  const heights = buttons.map(b => b.boundingBox.height)

  if (stddev(radii) > 2 || stddev(heights) > 4) {
    return [{
      category: 'consistency',
      severity: 'medium',
      title: 'Button style inconsistency across the page',
      evidence_type: 'multi_bbox',
      evidence: {
        type: 'multi_bbox',
        boxes: buttons.slice(0, 6).map(el => ({ ...el.boundingBox })),
        description: `${buttons.length} buttons with varying border-radius or height`,
      },
      why_it_matters: 'Visually inconsistent buttons signal a lack of design system discipline.',
      repair_guidance: 'Standardize all buttons to use a single border-radius and consistent height.',
      ai_fix_instruction: 'Apply a consistent button style: same border-radius, padding, and height across all button elements.',
      score_impact: -7,
      source: 'deterministic',
    }]
  }

  return []
}

function checkHeadingScale(elements: DomElement[]): Finding[] {
  const h1 = elements.find(el => el.tag === 'h1')
  const h2 = elements.find(el => el.tag === 'h2')
  const body = elements.find(el => el.tag === 'p' || el.tag === 'span')

  if (!h1 || !body) return []

  const h1Size = parsePx(h1.computedStyles.fontSize)
  const bodySize = parsePx(body.computedStyles.fontSize)

  if (bodySize === 0) return []

  const h1Ratio = h1Size / bodySize
  if (h1Ratio < 1.5) {
    return [{
      category: 'design_system',
      severity: 'medium',
      title: 'Heading scale too weak — h1 not distinct from body text',
      evidence_type: 'metric',
      evidence: {
        type: 'metric',
        measured: `${h1Ratio.toFixed(1)}× body size`,
        threshold: '1.5× minimum for h1',
        element: 'h1 vs body text',
      },
      why_it_matters: 'A weak heading scale makes it hard to scan and understand page hierarchy.',
      repair_guidance: `Increase h1 font size to at least ${Math.round(bodySize * 1.5)}px (currently ${h1Size}px).`,
      ai_fix_instruction: `Set h1 font size to at least ${Math.round(bodySize * 1.5)}px to establish a clear visual hierarchy over body text (${bodySize}px).`,
      metric_value: `${h1Ratio.toFixed(1)}× ratio`,
      score_impact: -7,
      source: 'deterministic',
    }]
  }

  if (h2) {
    const h2Size = parsePx(h2.computedStyles.fontSize)
    const h2Ratio = h2Size / bodySize
    if (h2Ratio < 1.25) {
      return [{
        category: 'design_system',
        severity: 'low',
        title: 'h2 heading not sufficiently distinct from body text',
        evidence_type: 'metric',
        evidence: {
          type: 'metric',
          measured: `${h2Ratio.toFixed(1)}× body size`,
          threshold: '1.25× minimum for h2',
          element: 'h2 vs body text',
        },
        why_it_matters: 'Section headings blend into body copy, reducing scannability.',
        repair_guidance: `Increase h2 font size to at least ${Math.round(bodySize * 1.25)}px.`,
        ai_fix_instruction: `Increase h2 font-size to ${Math.round(bodySize * 1.25)}px or larger.`,
        metric_value: `${h2Ratio.toFixed(1)}× ratio`,
        score_impact: -3,
        source: 'deterministic',
      }]
    }
  }

  return []
}

function checkSpacingTokens(elements: DomElement[], config?: DesignSystemConfig): Finding[] {
  const values: number[] = []

  for (const el of elements) {
    const props = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'gap']
    for (const prop of props) {
      const v = parsePx(el.computedStyles[prop])
      if (v > 0 && v <= 100) values.push(v)
    }
  }

  if (values.length < 6) return []

  // If user provided explicit spacing tokens, validate against those instead of generic 4px grid
  const isValidSpacing = config?.spacing?.length
    ? (v: number) => config.spacing.some(s => Math.abs(v - s) <= 1)
    : (v: number) => v % 4 === 0

  const nonMultiples = values.filter(v => !isValidSpacing(v))
  const ratio = nonMultiples.length / values.length
  const thresholdLabel = config?.spacing?.length
    ? `design system tokens: ${config.spacing.slice(0, 6).join(', ')}px`
    : 'multiples of 4px'

  if (ratio > 0.3) {
    const offenders = [...new Set(nonMultiples)].slice(0, 5)
    return [{
      category: 'design_system',
      severity: 'medium',
      title: 'Spacing values not aligned to design grid',
      evidence_type: 'metric',
      evidence: {
        type: 'metric',
        measured: `${Math.round(ratio * 100)}% of spacing values`,
        threshold: `All values should be ${thresholdLabel}`,
        element: `Offending values: ${offenders.join(', ')}px`,
      },
      why_it_matters: 'Off-grid spacing creates subtle visual inconsistency and signals missing design tokens.',
      repair_guidance: `Round all spacing values to the nearest values from your design grid (${thresholdLabel}).`,
      ai_fix_instruction: `Replace all padding and margin values with values from your design grid: ${thresholdLabel}.`,
      metric_value: `${Math.round(ratio * 100)}% off-grid`,
      score_impact: -7,
      source: 'deterministic',
    }]
  }

  return []
}

function checkTypographyScale(elements: DomElement[]): Finding[] {
  const sizes = new Set<number>()

  for (const el of elements) {
    const size = parsePx(el.computedStyles.fontSize)
    if (size > 0) sizes.add(size)
  }

  if (sizes.size > 4) {
    return [{
      category: 'design_system',
      severity: 'low',
      title: `${sizes.size} distinct font sizes — type scale is fragmented`,
      evidence_type: 'metric',
      evidence: {
        type: 'metric',
        measured: `${sizes.size} distinct font sizes`,
        threshold: '4 or fewer for a clean type scale',
        element: `Sizes: ${[...sizes].sort((a, b) => a - b).slice(0, 8).join(', ')}px`,
      },
      why_it_matters: 'Too many font sizes signal an absence of a type system and create visual noise.',
      repair_guidance: 'Consolidate to a type scale of 4 or fewer sizes (e.g. 14, 16, 24, 32px).',
      ai_fix_instruction: 'Define a type scale with 4 sizes maximum and replace all font-size declarations with tokens from that scale.',
      metric_value: `${sizes.size} sizes`,
      score_impact: -3,
      source: 'deterministic',
    }]
  }

  return []
}

// --- New rules ---

// WCAG 1.4.12: line-height must be at least 1.5× font-size for body text
function checkLineHeight(elements: DomElement[]): Finding[] {
  const bodyTags = new Set(['p', 'li', 'td', 'dd'])
  const offenders: DomElement[] = []

  for (const el of elements) {
    if (!bodyTags.has(el.tag)) continue
    if (!el.textContent.trim() || el.textContent.length < 20) continue

    const fontSize = parsePx(el.computedStyles.fontSize)
    if (fontSize < 12) continue

    const lhRaw = el.computedStyles.lineHeight
    const lineHeight = lhRaw === 'normal' ? fontSize * 1.2 : parsePx(lhRaw)
    if (lineHeight === 0) continue

    if (lineHeight / fontSize < 1.4) offenders.push(el)
  }

  if (offenders.length === 0) return []

  return [{
    category: 'accessibility',
    severity: 'medium',
    title: 'Body text line-height too tight — below WCAG 1.4.12',
    evidence_type: offenders.length === 1 ? 'bbox' : 'multi_bbox',
    evidence: offenders.length === 1
      ? { type: 'bbox', ...offenders[0].boundingBox, label: offenders[0].tag }
      : {
          type: 'multi_bbox',
          boxes: offenders.slice(0, 6).map(el => ({ ...el.boundingBox })),
          description: `${offenders.length} text blocks with line-height below 1.4×`,
        },
    why_it_matters: 'Tight line-height makes paragraphs hard to read, especially for users with dyslexia or low vision. WCAG 1.4.12 requires line-height of at least 1.5× font size.',
    repair_guidance: 'Set line-height to at least 1.5 on all paragraph and list text elements.',
    ai_fix_instruction: 'Set line-height: 1.5 on all p, li, and td elements. Do not use "normal" — it resolves to ~1.2 which is below threshold.',
    metric_value: 'line-height below 1.4×',
    score_impact: -7,
    source: 'deterministic',
  }]
}

// Design system: too many distinct text colors = absent token discipline
function checkColorDiversity(elements: DomElement[]): Finding[] {
  const textTags = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'label', 'li', 'button'])
  const colors = new Set<string>()

  for (const el of elements) {
    if (!textTags.has(el.tag)) continue
    if (!el.textContent.trim()) continue
    const color = el.computedStyles.color
    if (!color || color === 'rgba(0, 0, 0, 0)') continue
    colors.add(color)
  }

  if (colors.size <= 5) return []

  return [{
    category: 'design_system',
    severity: 'low',
    title: `${colors.size} distinct text colors — color system lacks discipline`,
    evidence_type: 'metric',
    evidence: {
      type: 'metric',
      measured: `${colors.size} unique text colors`,
      threshold: '5 or fewer for a disciplined color system',
      element: 'Text elements across the page',
    },
    why_it_matters: 'Too many text colors signal missing design tokens — the color palette is growing ad-hoc rather than from a defined system.',
    repair_guidance: 'Define 4–5 semantic text color tokens (primary, secondary, muted, inverse, accent) and replace all ad-hoc color values.',
    ai_fix_instruction: 'Consolidate all text color values into a maximum of 5 semantic tokens. Replace inline color overrides with token references.',
    metric_value: `${colors.size} colors`,
    score_impact: -3,
    source: 'deterministic',
  }]
}

// Semantic HTML: heading levels must not skip (h1 → h3 without h2 violates ARIA spec)
function checkHeadingOrder(elements: DomElement[]): Finding[] {
  const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  const headings = elements.filter(el => headingTags.includes(el.tag))
  if (headings.length < 2) return []

  const violations: DomElement[] = []
  let lastLevel = 0

  for (const h of headings) {
    const level = parseInt(h.tag[1])
    if (lastLevel > 0 && level > lastLevel + 1) violations.push(h)
    lastLevel = level
  }

  if (violations.length === 0) return []

  return [{
    category: 'hierarchy',
    severity: 'medium',
    title: 'Heading levels skip — broken document hierarchy',
    evidence_type: violations.length === 1 ? 'bbox' : 'multi_bbox',
    evidence: violations.length === 1
      ? { type: 'bbox', ...violations[0].boundingBox, label: violations[0].tag }
      : {
          type: 'multi_bbox',
          boxes: violations.map(el => ({ ...el.boundingBox, label: el.tag })),
          description: `${violations.length} headings that skip levels`,
        },
    why_it_matters: 'Skipping heading levels (e.g. h1 → h3) breaks document structure for screen readers and signals hierarchy achieved visually rather than semantically.',
    repair_guidance: 'Ensure headings follow sequential order (h1 → h2 → h3) without skipping levels. Adjust visual size with CSS, not by skipping tags.',
    ai_fix_instruction: 'Fix heading tags so levels increase by one at a time. Do not skip from h1 to h3 — rename the h3 to h2 and restyle if needed.',
    score_impact: -7,
    source: 'deterministic',
  }]
}

// Typography: text below 12px is unreadable for most users
function checkSmallText(elements: DomElement[]): Finding[] {
  const textTags = new Set(['p', 'span', 'a', 'li', 'td', 'label', 'dd'])
  const small = elements.filter(el => {
    if (!textTags.has(el.tag)) return false
    if (!el.textContent.trim() || el.textContent.length < 3) return false
    const fontSize = parsePx(el.computedStyles.fontSize)
    return fontSize > 0 && fontSize < 12
  })

  if (small.length === 0) return []

  const sizes = [...new Set(small.map(el => parsePx(el.computedStyles.fontSize)))]

  return [{
    category: 'accessibility',
    severity: 'high',
    title: 'Text below 12px minimum readable size',
    evidence_type: small.length === 1 ? 'bbox' : 'multi_bbox',
    evidence: small.length === 1
      ? { type: 'bbox', ...small[0].boundingBox, label: small[0].tag }
      : {
          type: 'multi_bbox',
          boxes: small.slice(0, 6).map(el => ({ ...el.boundingBox })),
          description: `${small.length} text elements below 12px (sizes: ${sizes.join(', ')}px)`,
        },
    why_it_matters: 'Text below 12px is unreadable for most users without zooming. Browser minimum and readability research both converge on 12px as the absolute floor.',
    repair_guidance: 'Increase all visible text to at least 12px. Body text should be 14–16px.',
    ai_fix_instruction: 'Set font-size to a minimum of 12px on all visible text elements. Set a global minimum via `body { font-size: 16px }` and avoid overriding below 12px.',
    metric_value: `${sizes.join(', ')}px`,
    score_impact: -12,
    source: 'deterministic',
  }]
}

// Font weight discipline: too many distinct weights = no type system
function checkFontWeightDiscipline(elements: DomElement[]): Finding[] {
  const textTags = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'label', 'li', 'button'])
  const weights = new Set<string>()

  for (const el of elements) {
    if (!textTags.has(el.tag)) continue
    if (!el.textContent.trim()) continue
    const w = el.computedStyles.fontWeight
    if (w && w !== '400' && w !== 'normal') weights.add(w)
  }

  // Add 400 back as one slot — we want total distinct weights including regular
  const totalWeights = weights.size + 1

  if (totalWeights <= 4) return []

  return [{
    category: 'design_system',
    severity: 'low',
    title: `${totalWeights} distinct font weights — type system is fragmented`,
    evidence_type: 'metric',
    evidence: {
      type: 'metric',
      measured: `${totalWeights} distinct font weights`,
      threshold: '4 or fewer (regular, medium, semibold, bold)',
      element: `Weights in use: ${['400', ...weights].join(', ')}`,
    },
    why_it_matters: 'Using more than 4 font weights creates visual inconsistency and signals an absent or ignored type system.',
    repair_guidance: 'Limit font weights to 4: regular (400), medium (500), semibold (600), bold (700). Consolidate any others.',
    ai_fix_instruction: 'Audit all font-weight values and consolidate to four: 400, 500, 600, 700. Replace any other weights with the nearest standard value.',
    metric_value: `${totalWeights} weights`,
    score_impact: -3,
    source: 'deterministic',
  }]
}

// --- axe-core violation converter ---

// Axe rules already covered by our deterministic checks — skip to avoid duplicates
const AXE_SKIP_RULES = new Set(['color-contrast', 'target-size', 'target-size-2'])

const AXE_IMPACT_SEVERITY: Record<string, string> = {
  critical: 'critical',
  serious: 'high',
  moderate: 'medium',
  minor: 'low',
}

const AXE_SCORE_IMPACT: Record<string, number> = {
  critical: -20,
  serious: -12,
  moderate: -7,
  minor: -3,
}

export function convertAxeToFindings(violations: AxeViolation[]): Finding[] {
  const findings: Finding[] = []

  for (const v of violations) {
    if (AXE_SKIP_RULES.has(v.id)) continue

    const severity = (AXE_IMPACT_SEVERITY[v.impact] ?? 'medium') as Finding['severity']
    const nodesWithBbox = v.nodes.filter(n => n.boundingBox !== null)

    let evidence: Finding['evidence']
    let evidence_type: Finding['evidence_type']

    if (nodesWithBbox.length === 1) {
      evidence_type = 'bbox'
      evidence = { type: 'bbox', ...nodesWithBbox[0].boundingBox! }
    } else if (nodesWithBbox.length > 1) {
      evidence_type = 'multi_bbox'
      evidence = {
        type: 'multi_bbox',
        boxes: nodesWithBbox.slice(0, 8).map(n => n.boundingBox!),
        description: `${v.nodes.length} element${v.nodes.length !== 1 ? 's' : ''} — ${v.nodes[0]?.failureSummary?.split('\n')[0] ?? v.help}`,
      }
    } else {
      evidence_type = 'explanation'
      evidence = { type: 'explanation' }
    }

    const firstNode = v.nodes[0]
    findings.push({
      category: 'accessibility',
      severity,
      title: v.help,
      evidence_type,
      evidence,
      why_it_matters: v.description,
      repair_guidance: firstNode?.failureSummary
        ? firstNode.failureSummary.replace(/^Fix (any|all) of the following:\s*/i, '').split('\n')[0].trim()
        : `See ${v.helpUrl}`,
      ai_fix_instruction: `Fix WCAG violation "${v.id}": ${v.help}. Affected elements: ${v.nodes.slice(0, 3).map(n => n.html.slice(0, 80)).join(' | ')}. Reference: ${v.helpUrl}`,
      score_impact: AXE_SCORE_IMPACT[v.impact] ?? -7,
      source: 'deterministic',
    })

    if (findings.length >= 6) break
  }

  return findings
}

// --- Responsive / mobile rules ---

export function checkMobileOverflow(elements375: DomElement[], elements1440: DomElement[]): Finding[] {
  // Elements that are wider than the 375px mobile viewport
  const FIXED_WIDTH_PATTERN = /^\d+px$/
  const overflowing = elements1440.filter(el => {
    if (el.boundingBox.width <= 375) return false
    // Only flag elements with hard-coded pixel widths (likely not responsive)
    const widthStyle = el.computedStyles['width'] ?? ''
    if (!FIXED_WIDTH_PATTERN.test(widthStyle)) return false
    // Skip very small elements and elements outside main content area
    if (el.boundingBox.height < 20) return false
    // Check if same element exists in 375 DOM with matching overflow
    const match375 = elements375.find(m =>
      m.tag === el.tag &&
      Math.abs(m.boundingBox.y - el.boundingBox.y) < 50 &&
      m.boundingBox.width > 360
    )
    return !!match375
  })

  if (overflowing.length === 0) return []

  return [{
    category: 'layout',
    severity: 'high',
    title: `${overflowing.length} element${overflowing.length > 1 ? 's' : ''} overflow on mobile viewport`,
    evidence_type: 'multi_bbox',
    evidence: {
      type: 'multi_bbox',
      boxes: overflowing.slice(0, 6).map(el => ({ ...el.boundingBox })),
      description: `${overflowing.length} elements with fixed pixel widths exceed 375px mobile viewport`,
    },
    why_it_matters: 'Fixed-width elements cause horizontal scroll on mobile, breaking the layout entirely for most users.',
    repair_guidance: 'Replace fixed px widths with max-width, %, or responsive Tailwind classes (w-full, max-w-*).',
    ai_fix_instruction: 'Replace all fixed pixel width declarations on these elements with responsive equivalents: use max-width + width: 100%, percentage widths, or Tailwind responsive prefixes (sm:, md:).',
    score_impact: -12,
    source: 'deterministic',
  }]
}

export function checkMobileTouchTargets(elements375: DomElement[], existingTitles: Set<string>): Finding[] {
  // Same as desktop touch target check but only for new violations at mobile size
  if ([...existingTitles].some(t => t.includes('interactive element') && t.includes('44×44px touch target'))) return []

  const INTERACTIVE_TAGS = new Set(['a', 'button', 'input', 'select', 'textarea'])
  const small = elements375.filter(el =>
    (INTERACTIVE_TAGS.has(el.tag) || !!el.role) &&
    (el.boundingBox.width < 44 || el.boundingBox.height < 44) &&
    el.boundingBox.width > 0 &&
    el.boundingBox.height > 0
  )

  if (small.length === 0) return []

  return [{
    category: 'accessibility',
    severity: 'high',
    title: `${small.length} touch target${small.length > 1 ? 's' : ''} too small on mobile`,
    evidence_type: small.length === 1 ? 'bbox' : 'multi_bbox',
    evidence: small.length === 1
      ? { type: 'bbox', ...small[0].boundingBox, label: small[0].tag }
      : {
          type: 'multi_bbox',
          boxes: small.slice(0, 8).map(el => ({ ...el.boundingBox, label: el.tag })),
          description: `${small.length} interactive elements below 44×44px at 375px viewport`,
        },
    why_it_matters: 'Touch targets that are adequate on desktop can shrink below the 44px minimum on mobile, making them impossible to tap accurately.',
    repair_guidance: 'Add min-height: 44px and sufficient padding to all interactive elements. Check at 375px viewport.',
    ai_fix_instruction: 'Add min-height: 44px; min-width: 44px to all interactive elements. Use padding to reach the minimum without affecting layout.',
    score_impact: -12,
    source: 'deterministic',
  }]
}

export function checkMobileFontSize(elements375: DomElement[]): Finding[] {
  const TEXT_TAGS = new Set(['p', 'span', 'a', 'li', 'td', 'label', 'button', 'dd'])
  const small = elements375.filter(el => {
    if (!TEXT_TAGS.has(el.tag)) return false
    if (!el.textContent.trim() || el.textContent.length < 3) return false
    const size = parsePx(el.computedStyles.fontSize)
    return size > 0 && size < 14
  })

  if (small.length === 0) return []

  const sizes = [...new Set(small.map(el => parsePx(el.computedStyles.fontSize)))]

  return [{
    category: 'accessibility',
    severity: 'medium',
    title: 'Text too small for mobile readability',
    evidence_type: 'multi_bbox',
    evidence: {
      type: 'multi_bbox',
      boxes: small.slice(0, 6).map(el => ({ ...el.boundingBox })),
      description: `${small.length} text elements below 14px on mobile (sizes: ${sizes.join(', ')}px)`,
    },
    why_it_matters: 'Text below 14px is hard to read on mobile screens without zooming. Mobile readability requires a minimum of 14–16px.',
    repair_guidance: 'Increase all visible text to at least 14px on mobile viewports. Use Tailwind responsive prefixes: text-sm (14px) as the minimum.',
    ai_fix_instruction: `Set minimum font-size of 14px for mobile. Use responsive Tailwind classes: text-xs → text-sm on mobile (add sm: prefix). Sizes to fix: ${sizes.join(', ')}px.`,
    score_impact: -7,
    source: 'deterministic',
  }]
}

// --- Main export ---

export function runAllChecks(
  elements: DomElement[],
  axeViolations?: AxeViolation[],
  elements375?: DomElement[],
  designSystemConfig?: DesignSystemConfig
): Finding[] {
  // Build set of safe colors from design system config (suppress false positive contrast failures)
  const safeColorPairs = new Set<string>()
  if (designSystemConfig?.colors?.length) {
    // We don't suppress per-pair, but pass config into checkContrast indirectly via elements filter
    // The actual suppression happens in checkContrast below
  }

  const all: Finding[] = [
    ...checkContrast(elements, designSystemConfig),
    ...checkTouchTargets(elements),
    ...checkSpacingRhythm(elements),
    ...checkButtonDrift(elements),
    ...checkHeadingScale(elements),
    ...checkSpacingTokens(elements, designSystemConfig),
    ...checkTypographyScale(elements),
    ...checkLineHeight(elements),
    ...checkColorDiversity(elements),
    ...checkHeadingOrder(elements),
    ...checkSmallText(elements),
    ...checkFontWeightDiscipline(elements),
  ]

  // Add axe-core findings (Phase 2)
  if (axeViolations && axeViolations.length > 0) {
    all.push(...convertAxeToFindings(axeViolations))
  }

  // Add responsive/mobile findings (Phase 2)
  if (elements375 && elements375.length > 0) {
    const existingTitles = new Set(all.map(f => f.title.toLowerCase()))
    all.push(...checkMobileOverflow(elements375, elements))
    all.push(...checkMobileTouchTargets(elements375, existingTitles))
    all.push(...checkMobileFontSize(elements375))
  }

  // Deduplicate by title prefix (first 40 chars)
  const seen = new Set<string>()
  const deduped: Finding[] = []
  for (const f of all) {
    const key = f.title.toLowerCase().slice(0, 40)
    if (seen.has(key)) continue
    seen.add(key)
    deduped.push(f)
  }

  // Sort by severity weight
  const weight: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 }
  return deduped.sort((a, b) => (weight[b.severity] ?? 0) - (weight[a.severity] ?? 0))
}
