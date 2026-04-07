# AIDQA Copilot Instructions

> Authoritative instructions for AI agents working on this codebase.
> Full details: `CLAUDE.md` and `docs/`

---

## What This Product Is

AIDQA is a **design QA tool for AI-generated UI**. Users submit a URL or screenshot; the system returns 3–7 prioritized findings (layout incoherence, weak hierarchy, contrast failures, design-system drift, etc.) with evidence regions, plain-English explanations, and AI-ready fix instructions.

**NOT a visual regression / pixel diff / baseline comparison tool.** Do not build those.

---

## Code Generation Rules

- **No narration**: Never claim files were created/edited/tests passed unless terminal output confirms it
- **Smallest safe diff**: No refactors, optimizations, or cosmetic changes unless explicitly requested
- **Plan before multi-file changes**: State goal, acceptance criteria, files to modify, and risks — wait for "GO"
- **Never claim "this should work"**: Provide a verify command instead

---

## Deployment Topology

| Domain | Project | Purpose |
|---|---|---|
| `app.aidesignqa.com` | `apps/app/` (React/Vite SPA) | Auth-gated scan/results UI |
| `aidesignqa.com` | `apps/landing/` (Next.js) | Homepage — stable, SEO-optimised |
| `lp.aidesignqa.com` | `apps/landing/` (Next.js) | Marketing LP — actively iterated |

Backend: **Supabase Edge Function** (`supabase/functions/aidqa-api/`) — single Deno function, all routes.

---

## Architecture

```
apps/app/src/
  pages/          # ScanInput.tsx, ScanResult.tsx, ScanHistory.tsx, Login.tsx, Signup.tsx
  components/     # NavBar.tsx, DesignPreview.tsx, ProtectedRoute.tsx
  lib/            # supabaseClient.ts, auth.ts (getAuthHeaders()), apiBase.ts

supabase/functions/aidqa-api/
  index.ts        # Router
  _lib/           # cors, ssrfGuard, supabaseServer, types, storage, gemini, embedding, rag
  scan/           # handlers.ts, capture.ts, normalize.ts, deterministic.ts, score.ts

supabase/migrations/   # Append-only, timestamped .sql files — never edit existing ones
```

---

## Scan Pipeline

```
POST /v1/scans → SSRF check → INSERT scan (pending) → return { scan_id } → EdgeRuntime.waitUntil(processScan())

processScan():
  Phase 1: Capture    — Browserless screenshot + DOM snapshot → normalize to 1440px
  Phase 2: Det        — runAllChecks(dom, axe, designSystemConfig) → Finding[]
  Phase 3: AI Vision  — callGeminiVision(normalizedImageUrl, deterministicFindings) → Finding[]
  Phase 4: Repair     — callGeminiRepairGuidance() [non-blocking, never throws]
  Phase 5: Merge      — mergeAndPrioritize() → calculateScore() → generateOverlay() → persist
```

Screenshot upload path skips Phases 1 DOM capture and Phase 2 (`det_status = 'skipped'`).

---

## API

Base URL: `https://eboaqtbktyaxzrbcntzy.supabase.co/functions/v1/aidqa-api`

| Method | Route | Purpose |
|---|---|---|
| POST | `/v1/scans` | Create scan — `{ url }` or multipart file upload |
| GET | `/v1/scans` | List user's scans |
| GET | `/v1/scans/:id` | Poll until `status = completed \| failed` |
| GET | `/v1/scans/:id/findings` | Top-7 prioritized findings |
| GET | `/v1/scans/:id/artifacts` | Signed URLs for screenshot, overlay, dom-snapshot |
| DELETE | `/v1/scans/:id` | Delete scan + findings |

Auth headers required on all user routes:
```
Authorization: Bearer <supabase_jwt>
apikey: <VITE_SUPABASE_ANON_KEY>
```

---

## Security Rules

- **SSRF guard**: Call `isUrlSafe()` before passing ANY user URL to Browserless. No exceptions.
- **Service role on backend, anon key on frontend.** Never cross these.
- **Signed URLs only**: Generate on demand; store only storage paths in the database.
- **RLS on every table**: `user_id = auth.uid()`. Never trust `user_id` in the request body.
- **Never log secrets**: No `GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or any env var values.
- **`EdgeRuntime.waitUntil` for all async work**: Never fire floating promises. Always update the scan row on failure.

---

## Critical Patterns

- **shadcn/ui**: `import { Button } from "@/components/ui/button"`
- **Auth headers** (`apps/app/src/lib/auth.ts`):
  ```typescript
  const headers = await getAuthHeaders() // { Authorization, apikey }
  ```
- **Edge function auth** (`_lib/supabaseServer.ts`):
  ```typescript
  const userId = await getUserFromRequest(req) // validates JWT server-side
  ```
- **Migrations**: Always create a new timestamped file — never edit existing `.sql` files.
- **Deploy edge function**:
  ```bash
  npm run supabase:deploy   # runs with --no-verify-jwt — never omit this flag
  ```

---

## Pre-Production Checklist

Run after every change, before every commit:

```bash
# TypeScript — Vite app (must produce no output)
cd apps/app && npx tsc --noEmit

# TypeScript — Landing (must produce no output)
cd apps/landing && npx tsc --noEmit

# Build — Vite app
cd apps/app && npm run build

# ESLint (0 errors, 0 warnings; ui/ excluded)
cd apps/app && npx eslint "src/" --ignore-pattern "src/components/ui/**" --max-warnings=0

# Tests (all must pass)
cd apps/app && npm run test -- --run
```

---

## What NOT to Build

- Baseline comparison / pixel diff / visual regression — wrong product
- Monitor scheduling / cron — wrong product
- Figma import — post-MVP
- Team workspaces / collaboration — post-MVP
- Webhooks / alerting — post-MVP

---

## Reference Docs

| Topic | File |
|---|---|
| Tech stack, repo structure, deployment | `docs/ARCHITECTURE.md` |
| Database schema, RLS, storage policies | `docs/DATABASE_SCHEMA.md` |
| API contract, endpoints, polling | `docs/API.md` |
| Processing pipeline, Gemini, auth patterns | `docs/PIPELINE.md` |
| Environment variables | `docs/ENV_VARS.md` |
| Deterministic rule engine, scoring | `docs/DETERMINISTIC_SCORING.md` |
| Open code review issues | `docs/CODE_REVIEW.md` |
| Deployment checklist | `docs/DEPLOYMENT_CHECKLIST.md` |
