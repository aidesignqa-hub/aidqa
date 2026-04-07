import type { Finding } from './types.ts'
import type { EnhancedCapture } from './types.ts'
import { encodeBase64 } from 'jsr:@std/encoding/base64'
import { downloadKbFile } from './storage.ts'
import { addFoldLine } from '../scan/normalize.ts'
import { buildDomContext } from '../scan/domContext.ts'

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const MODEL = Deno.env.get('GEMINI_MODEL') ?? 'gemini-2.0-flash'

const GEMINI_URL = (model: string, key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`

interface KnowledgeObject {
  id: string
  type: string
  category: string
  subcategory: string
  severity_if_violated: string
  scope: string
  rule: string
  detail: string
  detection_signals: string[]
}

// Curated reference images injected into every Gemini vision call as calibration examples.
// Each file must be uploaded to Supabase Storage at kb/images/ (run scripts/upload-kb-images.py).
const CURATED_IMAGES = [
  {
    path: 'kb/images/williamssonoma.png',
    label: 'REFERENCE EXAMPLE - Visual Hierarchy (Focal Point): Williams-Sonoma product page - all blocks are equal in size, color, and spacing with no dominant element. This illustrates collapsed visual hierarchy.',
    mimeType: 'image/png',
  },
  {
    path: 'kb/images/moma.png',
    label: 'REFERENCE EXAMPLE - Visual Hierarchy (Color Count): MoMA - excessive distinct colors at similar saturation, reducing the ability to perceive hierarchy between page elements.',
    mimeType: 'image/png',
  },
  {
    path: 'kb/images/hipcamp.png',
    label: 'REFERENCE EXAMPLE - Typography (Type Scale): Hipcamp - a systematically scaled type hierarchy with a clear H1 > subheading > body progression.',
    mimeType: 'image/png',
  },
  {
    path: 'kb/images/spotify.png',
    label: 'REFERENCE EXAMPLE - Spacing (Proximity Grouping): Spotify - tight spacing groups related elements; generous gaps separate sections. Proximity communicates structure without explicit visual dividers.',
    mimeType: 'image/png',
  },
  {
    path: 'kb/images/shopify.png',
    label: 'REFERENCE EXAMPLE - Spacing (Explicit Containers): Shopify - demonstrates container discipline; whitespace and minimal borders used rather than stacking border + shadow + background fill on the same element.',
    mimeType: 'image/png',
  },
]

// Module-level cache - knowledge base loaded once per function instance.
let knowledgeCache: KnowledgeObject[] | null = null

async function loadKnowledgeBase(): Promise<KnowledgeObject[]> {
  if (knowledgeCache) {
    console.log(`Knowledge base: using cached ${knowledgeCache.length} objects`)
    return knowledgeCache
  }
  try {
    const bytes = await downloadKbFile('knowledgebase.json')
    const raw = JSON.parse(new TextDecoder().decode(bytes)) as {
      knowledge: Array<KnowledgeObject & { image_path: string | null; vector_embedding_text: string }>
    }
    knowledgeCache = (raw.knowledge ?? []).map(
      ({ id, type, category, subcategory, severity_if_violated, scope, rule, detail, detection_signals }) => ({
        id, type, category, subcategory, severity_if_violated, scope, rule, detail, detection_signals,
      })
    )
    console.log(`Knowledge base: loaded ${knowledgeCache.length} objects from storage`)
    return knowledgeCache
  } catch (e) {
    console.error('Knowledge base: FAILED to load from storage — proceeding without it. Error:', String(e))
    return []
  }
}

function buildPrompt(knowledgeObjects: KnowledgeObject[], domContext?: string): string {
  const knowledgeSection = knowledgeObjects.length > 0
    ? `\n[DESIGN KNOWLEDGE]\nThe following design rules and principles are extracted from authoritative sources (Nielsen Norman Group, WCAG 2.2, Apple HIG, etc.). Apply them when evaluating the page.\n- type "rule" = measurable violation with specific thresholds\n- type "principle" = evaluative judgment about hierarchy, clarity, and flow\n- scope "viewport" = apply only to the above-the-fold area (~900px from top)\n- scope "full-page" = evaluate across the entire screenshot\n- scope "both" = applies everywhere; higher severity above the fold\n\n<knowledge_objects>\n${JSON.stringify(knowledgeObjects)}\n</knowledge_objects>\n`
    : ''

  const domSection = domContext
    ? `\n[DOM DATA]\nComputed design properties extracted from the live page at 1440px desktop and 375px mobile.\nA dashed blue line on the screenshot marks the viewport fold at y=900 — what users see without scrolling.\nUse this data to identify specific values (exact font sizes, color hex, contrast failures) rather than estimating from the screenshot alone.\n<dom_context>\n${domContext}\n</dom_context>\n`
    : ''

  return `You are a senior product designer performing a design QA audit on a UI screenshot.
${knowledgeSection}
[REFERENCE EXAMPLES]
The images labeled "REFERENCE EXAMPLE" that appear before the page screenshot are calibration examples - NOT the page being audited. Use them to understand what good and bad implementations look like in practice. Compare the page you are auditing against these benchmarks.
${domSection}
[PAGE SCREENSHOT]
The final image in this request is the UI being audited, captured at 1440px desktop width.

[KNOWN DESIGN SYSTEM - do NOT flag these as issues]
This UI uses an intentional design system. The following are correct by design:
- Orange (#FF8B00) on the "Design QA" badge - deliberate accent tag, not an error
- Blue (#2563EB) primary CTA button - correct brand usage
- Dark navy (#172B4D) for headings, medium gray (#5A6679) for secondary text - intentional
- Light gray (#F9FAFB) page background with white (#FFFFFF) card surfaces - correct

[NEVER flag these - invisible in a static screenshot]
This is a static image. Discard any finding that mentions these - they cannot be evaluated:
- Loading spinners, skeleton screens, progress indicators, "Scanning..." text
- Error messages, error borders, error toasts, inline validation errors
- Hover states, focus rings, active states
- Form validation feedback of any kind
- Empty states or zero-data states
- Disabled element styling when the element is interactable in code

[WHAT TO CHECK - scoped to measurable dimensions only]

**accessibility** - Color contrast only. Flag text where you are HIGHLY CONFIDENT the contrast ratio is definitively below 4.5:1 for normal text or below 3:1 for large text (18pt or 14pt bold). Do NOT flag borderline cases. A missed finding is better than a false positive.

**hierarchy** - Is there a clear visual primary action? Does the heading scale (h1 > h2 > body) guide the eye correctly? Are competing elements of equal visual weight when one should dominate?

**layout** - Whitespace imbalance visible in the screenshot. Elements visually misaligned. Scan path that forces the eye to jump unexpectedly.

**consistency** - Interactive elements of the same type styled differently. Inconsistent spacing between repeated elements.

**design_system** - Typography that clearly breaks from the established scale. Spacing values visually inconsistent with the rest of the layout.

**ux_readiness** - ONLY: Is the primary action immediately obvious to a first-time visitor? Is the purpose of the page clear from the visible content alone?

[OUTPUT FORMAT]
Return ONLY a valid JSON object. No prose before or after. No comments.

Allowed values:
- category: hierarchy, layout, consistency, ux_readiness, design_system, accessibility
- severity: critical, high, medium, low
- evidence_type: bbox, multi_bbox, region, explanation
- For evidence_type "region": evidence = { "region": "description of area" }
- For evidence_type "explanation": evidence = { "explanation": "description" }
- For evidence_type "bbox": evidence = { "x": 0, "y": 0, "width": 100, "height": 50 }
- For evidence_type "multi_bbox": evidence = { "boxes": [{ "x": 0, "y": 0, "width": 100, "height": 50 }] }

{
  "findings": [
    {
      "category": "hierarchy",
      "severity": "high",
      "title": "One-line issue label under 60 chars",
      "evidence_type": "region",
      "evidence": { "region": "hero section" },
      "why_it_matters": "How this harms coherence, trust, usability, or clarity.",
      "repair_guidance": "Concrete human-readable fix targeting something visible in the screenshot.",
      "ai_fix_instruction": "Instruction a developer can paste into an AI coding tool to implement the fix."
    }
  ]
}

Rules:
- Maximum 7 findings. Return fewer if the UI is mostly sound. Return an empty array if everything looks good.
- Only report a finding if you are highly confident it is a real, visible problem in this screenshot.
- Severity "critical" only for contrast failures definitively failing WCAG AA, or completely broken layouts.
- Be specific and scoped. "Heading font size is identical to body text, creating no hierarchy" is good. "Add animations" is not.
- Do not suggest adding new features, illustrations, or content. Only flag what is visibly broken.`
}

async function fetchWithBackoff(url: string, init: RequestInit, maxRetries = 4): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(url, init)
    if (res.status !== 503 && res.status !== 429) return res
    if (attempt === maxRetries) return res
    const delay = (2 ** attempt) * 1000 + Math.random() * 500
    console.log(`[AI] Gemini ${res.status}, retrying in ${Math.round(delay)}ms (attempt ${attempt + 1}/${maxRetries})`)
    await new Promise(r => setTimeout(r, delay))
  }
  throw new Error('unreachable')
}

export async function callGeminiVision(
  imageSignedUrl: string,
  domSnapshot?: EnhancedCapture
): Promise<Finding[]> {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not set')

  // Load knowledge base and page image in parallel
  const [knowledgeObjects, imageResponse] = await Promise.all([
    loadKnowledgeBase(),
    fetch(imageSignedUrl),
  ])
  if (!imageResponse.ok) throw new Error(`Failed to fetch image: ${imageResponse.status}`)
  let imageBytes = new Uint8Array(await imageResponse.arrayBuffer())
  console.log(`Gemini Vision: screenshot downloaded, ${(imageBytes.length / 1024).toFixed(0)}kb`)

  // Draw viewport fold line at y=900 on a copy of the image (stored normalized.png stays clean)
  try {
    imageBytes = await addFoldLine(imageBytes)
    console.log('Gemini Vision: fold line drawn at y=900')
  } catch (e) {
    console.warn('Gemini Vision: fold line failed (non-fatal), skipping:', String(e))
  }

  const base64Image = encodeBase64(imageBytes)

  // Build DOM context if snapshot is available (URL scans only)
  let domContext: string | undefined
  if (domSnapshot) {
    try {
      domContext = buildDomContext(domSnapshot)
      console.log(`Gemini Vision: DOM context built — ${domContext.length} chars`)
    } catch (e) {
      console.error('Gemini Vision: buildDomContext FAILED (non-fatal), proceeding without DOM context:', String(e))
    }
  } else {
    console.log('Gemini Vision: no DOM snapshot (screenshot-only scan) — DOM context skipped')
  }

  // Fetch curated reference images (non-fatal — proceed even if some are missing)
  const refImageParts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = []
  for (const img of CURATED_IMAGES) {
    try {
      const imgBytes = await downloadKbFile(`images/${img.path.replace('kb/images/', '')}`)
      refImageParts.push({ text: img.label })
      refImageParts.push({ inlineData: { mimeType: img.mimeType, data: encodeBase64(imgBytes) } })
    } catch (e) {
      console.warn(`Gemini Vision: reference image MISSING — ${img.path}. Run scripts/upload-kb-images.py to fix. Error: ${String(e)}`)
    }
  }
  const refImagesLoaded = refImageParts.length / 2
  console.log(`Gemini Vision: ${refImagesLoaded}/${CURATED_IMAGES.length} reference images loaded`)

  console.log(`Gemini Vision: sending request — model=${MODEL}, knowledge_objects=${knowledgeObjects.length}, ref_images=${refImagesLoaded}, dom=${domContext ? 'yes (' + domContext.length + ' chars)' : 'no'}`)

  const parts = [
    ...refImageParts,
    { text: '[PAGE BEING AUDITED]' },
    { inlineData: { mimeType: 'image/png', data: base64Image } },
    { text: buildPrompt(knowledgeObjects, domContext) },
  ]

  console.log('[AI] Sending vision request to Gemini, model:', MODEL)
  const response = await fetchWithBackoff(GEMINI_URL(MODEL, GEMINI_API_KEY), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 8192,
        temperature: 0.3,
      },
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Gemini API error ${response.status}: ${text}`)
  }

  const result = await response.json()
  const finishReason = result.candidates?.[0]?.finishReason ?? 'unknown'
  const usage = result.usageMetadata
  console.log(`Gemini Vision: response received — finish_reason=${finishReason}, input_tokens=${usage?.promptTokenCount ?? '?'}, output_tokens=${usage?.candidatesTokenCount ?? '?'}`)

  const responseParts: Array<{ text?: string; thought?: boolean }> = result.candidates?.[0]?.content?.parts ?? []
  const thoughtParts = responseParts.filter((p) => p.thought).length
  if (thoughtParts > 0) console.log(`Gemini Vision: response contains ${thoughtParts} thought part(s) (filtered out)`)
  const textPart = responseParts.findLast((p: { text?: string; thought?: boolean }) => !p.thought && p.text) ?? responseParts[responseParts.length - 1]
  const text = textPart?.text ?? ''

  if (!text) throw new Error('Gemini returned empty text — no content in response')

  console.log(`Gemini Vision: raw response preview (first 400 chars): ${text.slice(0, 400)}`)

  let parsed: { findings?: unknown[] }
  try {
    parsed = JSON.parse(text)
  } catch (e) {
    console.error(`Gemini Vision: JSON parse FAILED — raw text (first 600 chars): ${text.slice(0, 600)}`)
    throw new Error(`Gemini returned unparseable JSON: ${e}`)
  }

  const findings: Finding[] = (parsed.findings ?? []).map((f: Finding) => ({
    ...f,
    source: 'ai' as const,
    score_impact: f.score_impact ?? undefined,
  }))

  if (findings.length === 0) {
    console.warn(`Gemini Vision: 0 findings returned — this is unusual. Full parsed response: ${JSON.stringify(parsed).slice(0, 600)}`)
  } else {
    const titles = findings.map((f) => f.title ?? 'untitled').join(', ')
    console.log(`Gemini Vision: ${findings.length} findings returned — ${titles}`)
  }
  return findings
}

export async function callGeminiRepairGuidance(
  findings: Finding[],
  ragContext = ''
): Promise<Finding[]> {
  if (!GEMINI_API_KEY) return findings

  const referenceSection = ragContext
    ? `\n## Reference material (WCAG / design standards)\nUse the following authoritative references to make repair_guidance and ai_fix_instruction specific, accurate, and grounded. Include exact WCAG success criterion numbers, specific CSS property values, or Tailwind class names where applicable.\n\n${ragContext}\n`
    : ''

  const prompt = `You are a senior product designer. Below are design QA findings detected by automated analysis.
For each finding, rewrite the "repair_guidance" and "ai_fix_instruction" fields to be more specific and actionable.
Keep all other fields identical.
${referenceSection}
Rules:
- repair_guidance: 1–2 sentences, concrete, references specific CSS values or design system tokens
- ai_fix_instruction: paste-ready instruction a developer can give to an AI coding tool; include specific property names, values, and selectors
- Do not change title, category, severity, evidence, why_it_matters, or any other field

Return ONLY a JSON object: { "findings": [...] }

${JSON.stringify({ findings }, null, 2)}`

  try {
    const response = await fetchWithBackoff(GEMINI_URL(MODEL, GEMINI_API_KEY), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          maxOutputTokens: 2000,
          temperature: 0.3,
        },
      }),
    })

    if (!response.ok) return findings

    const result = await response.json()
    const rParts: Array<{ text?: string; thought?: boolean }> = result.candidates?.[0]?.content?.parts ?? []
    const rTextPart = rParts.findLast((p: { text?: string; thought?: boolean }) => !p.thought && p.text) ?? rParts[rParts.length - 1]
    const text = rTextPart?.text ?? ''
    if (!text) return findings

    const parsed = JSON.parse(text)
    return parsed.findings ?? findings
  } catch {
    // Non-fatal — return original guidance
    return findings
  }
}

export async function callGeminiDesignPreview(
  imageSignedUrl: string,
  finding: Finding
): Promise<{ description: string; fix_prompt: string; preview_image_bytes: null }> {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not set')

  const imageResponse = await fetch(imageSignedUrl)
  if (!imageResponse.ok) throw new Error(`Failed to fetch image: ${imageResponse.status}`)
  const imageBytes = new Uint8Array(await imageResponse.arrayBuffer())
  const base64Image = encodeBase64(imageBytes)

  const prompt = `You are a senior product designer reviewing a UI screenshot.

The following design issue was found:
- [${finding.severity}] ${finding.title}
- Why it matters: ${finding.why_it_matters}
- Current repair guidance: ${finding.repair_guidance}

Generate a focused, actionable fix for this specific issue.

Return ONLY a valid JSON object with this structure:
{
  "description": "2-3 sentences explaining what needs to change and why it will improve the design",
  "fix_prompt": "A complete, ready-to-paste prompt a developer can give to v0, Cursor, or Lovable to implement this fix. Be specific: include exact CSS property names, values, selectors, or Tailwind classes where applicable."
}`

  const response = await fetchWithBackoff(GEMINI_URL(MODEL, GEMINI_API_KEY), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { inlineData: { mimeType: 'image/png', data: base64Image } },
          { text: prompt },
        ],
      }],
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 4096,
        temperature: 0.4,
      },
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Gemini preview error ${response.status}: ${errText}`)
  }

  const result = await response.json()
  const parts: Array<{ text?: string; thought?: boolean }> = result.candidates?.[0]?.content?.parts ?? []
  const textPart = parts.findLast((p: { text?: string; thought?: boolean }) => !p.thought && p.text)
  const text = textPart?.text ?? ''

  let description = ''
  let fix_prompt = ''
  try {
    const parsed = JSON.parse(text)
    description = parsed.description ?? ''
    fix_prompt = parsed.fix_prompt ?? ''
  } catch {
    description = text.slice(0, 300)
  }

  console.log('[PREVIEW] Generated description for finding:', finding.title, '|', description.slice(0, 100))
  return { description, fix_prompt, preview_image_bytes: null }
}
