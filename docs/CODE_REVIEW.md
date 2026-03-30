# AIDQA Code Review

> Reviewed: 2026-03-30 by Code Reviewer agent
> Scope: Full codebase — backend (Edge Functions), frontend (React/Vite), landing (Next.js), migrations
> Last updated: 2026-03-30 — 6 issues fixed

Overall the code quality is good. RLS is applied correctly, SSRF guard is present, service role stays on the backend, and the async `waitUntil` patterns are correct. The issues below are correctness gaps and hardening tasks rather than fundamental design problems.

---

## Fix Before Production Traffic Grows

### ~~BLOCKER: CORS wildcard — `_lib/cors.ts:2`~~ ✅ Fixed

~~```ts
'Access-Control-Allow-Origin': '*'
```~~

~~Any website can make authenticated requests to your Edge Function on behalf of a user whose browser holds a valid JWT. Scans contain screenshots and personal design data — this is a meaningful risk.~~

~~**Fix:** Inspect `req.headers.get('origin')` and echo it back only if it's in an allowlist of known domains (production domain + localhost dev URL).~~

---

### BLOCKER: AI output not validated before persisting — `_lib/gemini.ts:213`

```ts
const parsed = JSON.parse(text)
return parsed.findings ?? findings
```

`callGeminiRepairGuidance` does not verify that `parsed.findings` is an array, that each element has required fields, or that the AI did not mutate `category`, `severity`, or other read-only fields. Malformed AI output propagates to the database.

**Fix:** Validate `Array.isArray(parsed.findings)`, filter out elements missing required fields, and fall back to the original finding on a per-element basis.

---

### ~~Bug: Broken mobile touch target dedup guard — `deterministic.ts:660`~~ ✅ Fixed

~~```ts
if (existingTitles.has('interactive element below 44×44px touch target')) return []
```~~

~~The desktop check emits a count-prefixed title like `'3 interactive elements below 44×44px touch target'`. This guard string never matches — both desktop and mobile checks always fire and produce duplicate findings.~~

~~**Fix:** Change the guard to check with `.some()` and a partial string match, or normalize the title format across both checks.~~

---

### Admin email hardcoded in source — `_lib/supabaseServer.ts:31`

```ts
export const ADMIN_EMAILS = new Set(['oskars.zvingulis@gmail.com'])
```

Personal email in version history. Admin bypass skips rate limiting entirely. Cannot update without a code deploy.

**Fix:** Move admin status to a database column or Supabase environment secret.

---

### Suggestion: SSRF guard bypassed by redirect chains — `_lib/ssrfGuard.ts`

The app-layer guard validates the user-supplied URL, but Browserless may follow HTTP redirects to internal addresses after the guard passes (e.g. a page that redirects to `http://169.254.169.254/`).

**Fix:** Rely on network-level firewall rules at the infrastructure level to block internal ranges. Document this as a known dependency on network controls rather than application-layer-only protection.

---

## Fix in the Near Term

### ~~`handleDismissFinding` returns 200 on no-op — `handlers.ts:526`~~ ✅ Fixed

~~Supabase `.update()` does not error when zero rows are matched. If a caller sends a finding ID that doesn't belong to them, RLS ensures nothing updates, but the server still returns `{ success: true }`. The frontend shows a success toast while nothing changed.~~

~~**Fix:** Use `.select()` after the update to confirm at least one row was affected; return 404 if none.~~

---

### ~~Rate-limit logic duplicated — `handlers.ts:61` and `handlers.ts:481`~~ ✅ Fixed

~~The month-start calculation, count query, and threshold check are copy-pasted between `handleCreateScan` and `handleRescan`. If the threshold changes or a new plan tier is introduced, both places must be updated.~~

~~**Fix:** Extract into a shared `checkRateLimit(userId: string): Promise<boolean>` function.~~

---

### ~~No `user_id` index on `scans` or `findings` tables~~ ✅ Fixed

~~RLS policies and all handlers filter by `user_id`, but there is no database-level index on this column. Every query does a full table scan.~~

~~**Fix:** Added migration `20260330000100_add_user_id_indexes.sql`.~~ ⚠️ **Still needs `supabase db push` to apply to the live database.**

---

### ~~AI findings have null `score_impact` — `handlers.ts` / `score.ts`~~ ✅ Fixed

~~The Gemini Vision path never sets `score_impact` on AI findings. The findings list is sorted by `score_impact` ascending, so Postgres places NULLs after all deterministic findings in arbitrary order — AI findings are not ordered by severity.~~

~~**Fix:** Set a `score_impact` value on AI findings based on their `severity` field using the same weights as the scoring logic, or handle NULLs explicitly in the sort.~~

---

### ~~Polling error handling in `ScanResult.tsx:89`~~ ✅ Fixed

~~```ts
if (!res.ok) return  // poll continues silently
```~~

~~Network errors and 5xx responses silently keep the interval running until the 120-second timeout. Also, `getAuthHeaders()` is called on every tick — if the session expires mid-poll it throws and the exception is swallowed.~~

~~**Fix:**~~
~~- Count consecutive failures; show a "slow connection" warning after 3–4 failed polls~~
~~- Wrap `getAuthHeaders()` in a try/catch; clear the interval and show an error on auth failure~~

---

## Quality Improvements

### Dead code in `capture.ts`

`captureScreenshot` (lines 8–39) is never called — the screenshot-upload path uses `fileBuffer` directly. `captureDomSnapshot` delegates to `captureEnhanced` for backwards compat but appears unused as well. Keeping them increases maintenance surface and causes confusion.

---

### `processScan` is a 175-line monolith — `handlers.ts:102`

All five pipeline phases, uploads, embedding, and scoring are in one function. A failure in Phase 4/5 is caught by the generic outer catch which marks the entire scan as failed even when Phases 1–3 completed successfully.

**Fix:** Extract each phase into a named function. Scope try/catch to each phase individually.

---

### Sequential uploads in screenshot path — `handlers.ts`

The URL scan path parallelizes its uploads with `Promise.all`. The screenshot path does two sequential `await uploadFile` calls. These have no dependency on each other.

**Fix:** Wrap the two screenshot uploads in `Promise.all` to match the URL scan path.

---

### Sequential embeddings in `embedAndStoreFindingsAsync` — `handlers.ts:282`

```ts
for (const f of findings) {
  const embedding = await embedText(text)
  await supabase.from('finding_embeddings').insert(...)
}
```

Each finding's embed + insert runs sequentially. 7 findings × ~500ms each = ~3.5 seconds of sequential work inside the `waitUntil` budget.

**Fix:** Use `Promise.allSettled` across all findings in parallel.

---

### `checkHeadingScale` uses `find()` for body baseline — `deterministic.ts:219`

```ts
const body = elements.find(el => el.tag === 'p' || el.tag === 'span')
```

This picks the first `p` or `span` in DOM order, which may be a nav link, legal disclaimer, or other non-body text. The body baseline is foundational to the h1/h2 ratio check.

**Fix:** Use median font-size across all `p` elements with text content.

---

### Contrast check false negatives on transparent backgrounds — `deterministic.ts:73`

```ts
if (!fg || !bg || bg[3] < 0.1) continue
```

Skipping transparent backgrounds is necessary to avoid false positives from inherited backgrounds, but it also skips text on modal overlays, navbars, and layered elements — common real failures.

**Note:** Document this as a known limitation so future contributors understand why some obvious contrast failures may not be caught.

---

### `checkSpacingRhythm` relies on `mode()` of raw pixel values — `deterministic.ts:144`

On a Tailwind page, spacing values like `16`, `24`, and `32` may each appear with similar frequency. The "dominant" value is statistically fragile on small pages. Worth monitoring as a source of false positives.

---

### Nit: `ScanInput` sends unused `type` field — `ScanInput.tsx:89`

```ts
body: JSON.stringify({ type: 'url', url: trimmed, ... })
```

The backend infers input type from whether `url` is present or the request is multipart — the `type` field is never read.

---

### Nit: `auth.ts` uses `getSession()` instead of `getUser()`

`getSession()` returns the session from local storage without re-validating against the server. A revoked token would still be used until it expires. Acceptable for header generation (server validates), but worth documenting.

---

### Nit: Migration history has dead v1 tables

Migrations `20260215*` create `visual_jobs`, `visual_runs`, `monitors`, `design_baselines`, and `baseline_sources`, all dropped in `20260325000100_drop_v1_dead_tables.sql`. A fresh `supabase db reset` replays all of this churn — confusing for new contributors. No fix needed (migrations are append-only) but worth a comment in the drop migration explaining the context.

---

## Priority Summary

| Priority | Issue | File |
|---|---|---|
| ~~Fix now~~ | ~~CORS wildcard~~ | ✅ `_lib/cors.ts` |
| ~~Fix now~~ | ~~Broken mobile touch target dedup~~ | ✅ `deterministic.ts` |
| Fix now | AI output not validated | `_lib/gemini.ts:213` |
| Fix now | Admin email in source | `_lib/supabaseServer.ts:31` |
| ~~Soon~~ | ~~Dismiss returns 200 on no-op~~ | ✅ `handlers.ts` |
| ~~Soon~~ | ~~Rate-limit logic duplicated~~ | ✅ `handlers.ts` |
| ~~Soon~~ | ~~Missing `user_id` indexes~~ | ✅ migration written — **run `supabase db push` to apply** |
| ~~Soon~~ | ~~AI findings null `score_impact`~~ | ✅ `handlers.ts` |
| ~~Soon~~ | ~~Polling swallows errors~~ | ✅ `ScanResult.tsx` |
| Improve | Dead code in `capture.ts` | `capture.ts:8` |
| Improve | `processScan` monolith | `handlers.ts:102` |
| Improve | Sequential uploads in screenshot path | `handlers.ts` |
| Improve | Sequential embeddings | `handlers.ts:282` |
| Improve | `checkHeadingScale` body baseline | `deterministic.ts:219` |
