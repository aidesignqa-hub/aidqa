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

Return ONLY a JSON object matching this schema. No prose before or after.

{
  "findings": [
    {
      "category": "hierarchy" | "layout" | "consistency" | "ux_readiness" | "design_system",
      "severity": "critical" | "high" | "medium" | "low",
      "title": "One-line issue label, max 60 chars",
      "evidence_type": "bbox" | "multi_bbox" | "region" | "explanation",
      "evidence": { ... matches evidence type shape },
      "why_it_matters": "How this harms coherence, trust, usability, or clarity. 1-2 sentences.",
      "repair_guidance": "Concrete human-readable fix. 1-2 sentences.",
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
  const response = await fetch(GEMINI_URL(MODEL, GEMINI_API_KEY), {
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
        maxOutputTokens: 2000,
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

  const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  if (!text) throw new Error('Empty response from Gemini')

  const parsed = JSON.parse(text)
  const findings: Finding[] = (parsed.findings ?? []).map((f: Finding) => ({
    ...f,
    source: 'ai' as const,
    score_impact: f.score_impact ?? undefined,
  }))

  console.log('[AI] Gemini vision findings:', findings.length)
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
    const response = await fetch(GEMINI_URL(MODEL, GEMINI_API_KEY), {
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
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    if (!text) return findings

    const parsed = JSON.parse(text)
    return parsed.findings ?? findings
  } catch {
    // Non-fatal — return original guidance
    return findings
  }
}
