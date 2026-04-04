# AIDQA Processing Pipeline

> Last updated: 2026-04-02
> Scope: 5-phase scan pipeline, Gemini Vision integration, auth patterns
> Source files: `supabase/functions/aidqa-api/scan/handlers.ts`, `_lib/gemini.ts`, `_lib/supabaseServer.ts`

---

## Pipeline Overview

```
POST /v1/scans
  → SSRF check (isUrlSafe)
  → INSERT scan row (status=pending)
  → return { scan_id } (202)
  → EdgeRuntime.waitUntil(processScan())

processScan():
  PHASE 1: Capture
    captureScreenshot(url) → raw PNG
    captureDomSnapshot(url) → DomElement[]
    normalizeImage(png) → 1440px PNG
    upload(original, normalized, domSnapshot) → storage paths

  PHASE 2: Deterministic
    runAllChecks(dom1440, axeViolations, dom375, designSystemConfig) → Finding[]
    UPDATE scans SET det_status='completed'

  PHASE 3: Gemini Vision
    callGeminiVision(normalizedImageSignedUrl, deterministicFindings) → Finding[]
    UPDATE scans SET ai_status='completed'

  PHASE 4: Repair Guidance (non-blocking)
    callGeminiRepairGuidance(deterministicFindings) → enriched Finding[]

  PHASE 5: Merge + Score + Persist
    mergeAndPrioritize(deterministic, ai) → top 7 Finding[]
    calculateScore(findings) → { overall, categoryScores }
    generateOverlay(image, findings) → annotated PNG
    INSERT findings
    UPDATE scans SET status='completed', score, category_scores, finding_count
```

### Screenshot upload path (Phase 1 skipped)
Screenshot uploads skip DOM capture entirely. `det_status` is set to `skipped`. Only Gemini Vision runs. Findings are fewer and less precise — this is disclosed in the UI.

---

## Gemini Vision Integration

`_lib/gemini.ts` exports two functions:

### `callGeminiVision(imageSignedUrl, deterministicFindings)`

```
1. Fetch image from signed URL
2. Base64-encode with encodeBase64 from jsr:@std/encoding/base64
3. POST to Gemini with image as inlineData + prompt
4. Use generationConfig.responseMimeType: "application/json"
5. Pass deterministic finding titles to avoid duplicates
6. Throw on failure (ai_status → 'failed', scan continues)
```

```
Endpoint: https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={GEMINI_API_KEY}
Response path: candidates[0].content.parts[0].text  (JSON string — parse it)
Default model: gemini-2.0-flash (override via GEMINI_MODEL secret)
```

### `callGeminiRepairGuidance(findings)`

```
1. Text-only Gemini call — no image
2. Rewrites repair_guidance and ai_fix_instruction on deterministic findings
3. Returns original findings on ANY failure (non-blocking, never throws)
```

---

## Auth Patterns

### Frontend — `apps/app/src/lib/auth.ts`

```typescript
export async function getAuthHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Not authenticated')
  return {
    'Authorization': `Bearer ${session.access_token}`,
    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
  }
}
```

Note: `getSession()` returns the local session without re-validating against the server. Acceptable for header generation — the Edge Function validates the token server-side.

### Edge Function — `_lib/supabaseServer.ts`

```typescript
export async function getUserFromRequest(req: Request): Promise<string> {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) throw new AuthError('No token')
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) throw new AuthError('Invalid token')
  return user.id
}
```

This uses the **service role client** to validate the JWT. The gateway-level JWT check is disabled (`--no-verify-jwt` deploy flag) because newer Supabase projects issue ES256 tokens that the gateway rejects. The function does its own validation here.

---

## SSRF Guard

`_lib/ssrfGuard.ts` — call `isUrlSafe(url)` before passing any user URL to Browserless.

The guard blocks private IP ranges at the application layer. It does not protect against redirect chains (a page that redirects to an internal address after the guard passes). Infrastructure-level firewall rules are the defence against that.

---

## Async Model

All post-response work runs inside `EdgeRuntime.waitUntil()`. Never fire a floating promise. Always update the scan row on failure so the frontend polling loop can exit cleanly:

```typescript
EdgeRuntime.waitUntil(
  processScan(scanId, ...).catch(async (err) => {
    await supabase.from('scans').update({
      status: 'failed',
      error_message: err.message,
    }).eq('id', scanId)
  })
)
```
