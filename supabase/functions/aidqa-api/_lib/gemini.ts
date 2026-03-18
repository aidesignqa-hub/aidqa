import type { Finding } from './types.ts'
import { encodeBase64 } from 'jsr:@std/encoding/base64'

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const MODEL = Deno.env.get('GEMINI_MODEL') ?? 'gemini-2.0-flash'

const GEMINI_URL = (model: string, key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`

function buildPrompt(deterministicFindings: Finding[]): string {
  const alreadyFound = deterministicFindings.map(f => ({ category: f.category, title: f.title }))

  return `You are a senior product designer performing a design QA review.

## Screenshot
The attached image is a UI screenshot at 1440px desktop width.

## Already detected (deterministic checks)
The following issues were already found by automated measurement. Do NOT repeat these.
Return an empty array if you have no new findings to add.

<deterministic_findings>
${JSON.stringify(alreadyFound, null, 2)}
</deterministic_findings>

## Your task
Inspect the screenshot for design quality issues NOT already listed above.
Focus on:
- Visual hierarchy: Is there a clear primary action? Does heading structure guide the eye?
- Layout coherence: Does whitespace distribution and scan flow make sense?
- UX readiness: Are obvious states missing (error, empty, loading, validation)?
- Consistency: Anything not caught by automated checks?
- Accessibility — look hard at these specific issues:
  * Color contrast: Is any text difficult to read against its background? Yellow/light text on light or gradient backgrounds, low-contrast text on colored backgrounds, text over images. Flag these as severity "critical" with category "accessibility".
  * Text over gradients: Gradient backgrounds shift color — text must be readable across the ENTIRE gradient, not just part of it. If any portion of the gradient makes the text hard to read, flag it.
  * Small or thin text on colored backgrounds that reduces legibility.

Return ONLY a valid JSON object. No prose before or after. No comments.

Allowed values:
- category: hierarchy, layout, consistency, ux_readiness, design_system, accessibility
- severity: critical, high, medium, low
- evidence_type: bbox, multi_bbox, region, explanation
- For evidence_type "region": evidence = { "region": "description of area" }
- For evidence_type "explanation": evidence = { "explanation": "description" }
- For evidence_type "bbox": evidence = { "x": 0, "y": 0, "width": 100, "height": 50 }
- For evidence_type "multi_bbox": evidence = { "boxes": [{ "x": 0, "y": 0, "width": 100, "height": 50 }] }

Example output format:
{
  "findings": [
    {
      "category": "hierarchy",
      "severity": "high",
      "title": "One-line issue label under 60 chars",
      "evidence_type": "region",
      "evidence": { "region": "hero section" },
      "why_it_matters": "How this harms coherence, trust, usability, or clarity.",
      "repair_guidance": "Concrete human-readable fix.",
      "ai_fix_instruction": "Instruction a developer could paste into an AI coding tool."
    }
  ]
}

Rules:
- Maximum 5 new findings. Return fewer if the UI is mostly sound.
- evidence_type "explanation" means no spatial location — use this for coherence/flow issues.
- evidence_type "region" means describe the area in words (e.g. "hero section", "navigation bar").
- For bbox/multi_bbox: coordinates are in the 1440px screenshot coordinate space.
- Severity "critical" only for accessibility failures or completely broken layouts.
- Be specific. "Button has no hover state" is better than "interactive feedback missing".`
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
  deterministicFindings: Finding[]
): Promise<Finding[]> {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not set')

  console.log('[AI] Fetching image for Gemini vision call')
  const imageResponse = await fetch(imageSignedUrl)
  if (!imageResponse.ok) throw new Error(`Failed to fetch image: ${imageResponse.status}`)
  const imageBytes = new Uint8Array(await imageResponse.arrayBuffer())
  const base64Image = encodeBase64(imageBytes)

  console.log('[AI] Sending vision request to Gemini, model:', MODEL)
  const response = await fetchWithBackoff(GEMINI_URL(MODEL, GEMINI_API_KEY), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { inlineData: { mimeType: 'image/png', data: base64Image } },
          { text: buildPrompt(deterministicFindings) },
        ],
      }],
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
  console.log('[AI] Gemini vision response received, usage:', result.usageMetadata)
  console.log('[AI] Finish reason:', result.candidates?.[0]?.finishReason)
  const parts: Array<{ text?: string; thought?: boolean }> = result.candidates?.[0]?.content?.parts ?? []
  console.log('[AI] Parts count:', parts.length, '| thought flags:', parts.map((p: { thought?: boolean }) => !!p.thought))
  const textPart = parts.findLast((p: { text?: string; thought?: boolean }) => !p.thought && p.text) ?? parts[parts.length - 1]
  const text = textPart?.text ?? ''
  console.log('[AI] Extracted text (first 300 chars):', text.slice(0, 300))
  if (!text) throw new Error('Empty response from Gemini')

  let parsed: { findings?: unknown[] }
  try {
    parsed = JSON.parse(text)
  } catch (e) {
    console.error('[AI] JSON.parse failed:', e, '| Raw text:', text.slice(0, 500))
    throw new Error(`Gemini returned unparseable JSON: ${e}`)
  }
  const findings: Finding[] = (parsed.findings ?? []).map((f: Finding) => ({
    ...f,
    source: 'ai' as const,
    score_impact: f.score_impact ?? undefined,
  }))

  console.log('[AI] Gemini vision findings:', findings.length, '| raw findings from model:', JSON.stringify(parsed.findings ?? []).slice(0, 500))
  return findings
}

export async function callGeminiRepairGuidance(
  findings: Finding[]
): Promise<Finding[]> {
  if (!GEMINI_API_KEY) return findings

  const prompt = `You are a senior product designer. Below are design QA findings detected by automated analysis.
For each finding, rewrite the "repair_guidance" and "ai_fix_instruction" fields to be more specific and actionable.
Keep all other fields identical.

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
