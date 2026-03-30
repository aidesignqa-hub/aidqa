const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const EMBEDDING_MODEL = 'text-embedding-004'
const EMBEDDING_URL = `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent`

/**
 * Generate a 768-dimension embedding vector for the given text using Gemini.
 * Returns null on any failure — callers treat embeddings as non-blocking enrichment.
 */
export async function embedText(text: string): Promise<number[] | null> {
  if (!GEMINI_API_KEY) return null
  if (!text?.trim()) return null

  try {
    const response = await fetch(`${EMBEDDING_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: `models/${EMBEDDING_MODEL}`,
        content: { parts: [{ text: text.slice(0, 2000) }] },
      }),
    })

    if (!response.ok) {
      console.warn('[embedding] API error:', response.status)
      return null
    }

    const result = await response.json()
    const values: number[] = result?.embedding?.values
    if (!Array.isArray(values) || values.length === 0) return null
    return values
  } catch (err) {
    console.warn('[embedding] Failed:', err)
    return null
  }
}

/**
 * Compute cosine similarity between two same-length vectors.
 * Returns value in [-1, 1]; higher = more similar.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0
  let dot = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB)
  return denom === 0 ? 0 : dot / denom
}
