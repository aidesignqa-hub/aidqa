const ALLOWED_ORIGINS = new Set([
  'https://app.aidesignqa.com',
  'https://aidqa-six.vercel.app',
  'https://aidqa-aidesignqa-6662s-projects.vercel.app',
  'https://aidqa-git-main-aidesignqa-6662s-projects.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
])
// In production, you should replace the above with your actual allowed origins and ensure that this list is secure.
function getAllowedOrigin(req: Request): string {
  const origin = req.headers.get('origin') ?? ''
  return ALLOWED_ORIGINS.has(origin) ? origin : ''
}

export function getCorsHeaders(req: Request): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': getAllowedOrigin(req),
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type, apikey',
  }
}

/**
 * Creates request-scoped `corsResponse` and `corsError` helpers.
 * Call at the top of each handler: const { corsResponse, corsError } = makeCors(req)
 */
export function makeCors(req: Request) {
  const headers = getCorsHeaders(req)
  return {
    corsResponse(body: unknown, status = 200): Response {
      return new Response(JSON.stringify(body), {
        status,
        headers: { ...headers, 'Content-Type': 'application/json' },
      })
    },
    corsError(message: string, status: number): Response {
      return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { ...headers, 'Content-Type': 'application/json' },
      })
    },
  }
}
