# AIDQA — Project Brain

> This file is the authoritative reference for AI assistants working on this codebase.
> Update it whenever a milestone is completed or architecture changes.
> Last audited: 2026-02-20 (full code audit, all sections verified against actual files)

---

## Project Overview

**AIDQA** is a SaaS visual regression testing platform. It continuously monitors web pages by
capturing screenshots, comparing them pixel-by-pixel against an approved baseline, and using
GPT-4o Vision to explain what changed and why.

**Target user:** Developers and QA teams who want to catch unintended visual regressions in
production without maintaining a local browser test suite.

**Business model:** SaaS (multi-tenant). Each user's data is isolated by `project_id = auth.uid()`.

---

## Current Architecture

### Frontend
- React 18 + Vite + TypeScript
- React Router v6 routes:
  - `/login` — Login (unprotected)
  - `/signup` — Signup (unprotected)
  - `/` — Dashboard (protected)
  - `/create-monitor` — Baseline + monitor creation wizard (protected)
  - `/monitors/:monitorId/history` — Run history with trend chart (protected)
  - `/visual/baselines/:baselineId/runs/:runId` — Individual run detail (protected)
  - `/runs/:runId` — Run detail by ID (protected)
- `ProtectedRoute` component: checks `supabase.auth.getSession()`, subscribes to `onAuthStateChange`, redirects to `/login` if no session
- TanStack React Query is installed (`@tanstack/react-query@5`) but **not used** — all data fetching uses raw `fetch()` + `useState`
- shadcn/ui + Tailwind CSS
- Deployed to Vercel; SPA rewrites configured in `vercel.json`

### Backend
- Supabase Edge Function (`supabase/functions/visual-api/`) — Deno runtime
- Single deployed unit; all routes dispatched in `index.ts` via regex path matching → `visual/handlers.ts`
- Screenshot capture via Browserless REST API (`/screenshot` for PNG, `/function` for DOM snapshot JS execution)
- Image diffing via `pixelmatch` + `imagescript` (pure Deno, no native deps)
- AI analysis via OpenAI `gpt-4o-mini` Vision — runs **asynchronously** after run row is inserted
- Import map in `deno.json` uses `npm:@supabase/supabase-js@2` (not `jsr:`)

### Auth Tiers (index.ts)
1. `/health` — no auth
2. `/cron/tick` — authenticated by comparing `Authorization: Bearer` value to `SUPABASE_SERVICE_ROLE_KEY` env var
3. All other routes — user JWT validated via `supabase.auth.getUser(token)` with **explicit token** passed (not session-based)

### Database (Supabase Postgres)
```
design_baselines
  id, project_id, name, source_type, snapshot_path, viewport (JSONB),
  approved, approved_at, created_at,
  diff_threshold_pct (NUMERIC, default 0.2),
  ignore_regions (JSONB, default []),
  baseline_dom_path (TEXT, nullable)    ← path to stored baseline DOM snapshot JSON

monitors
  id, project_id, baseline_id (FK → design_baselines), target_url,
  cadence ('hourly'|'daily'), enabled, created_at,
  last_run_at (TIMESTAMPTZ, nullable)   ← used by cron cadence enforcement

visual_runs
  id, monitor_id (FK → monitors), baseline_id (FK → design_baselines),
  project_id, status ('completed'|'failed'), mismatch_percentage, diff_pixels,
  current_path, diff_path, result_path,
  severity ('minor'|'warning'|'critical'),
  current_source_url,
  ai_json (JSONB, nullable),            ← populated async by OpenAI
  ai_status (text, default 'skipped'),  ← 'skipped' | 'pending' | 'completed' | 'failed'
  ai_error (text, nullable),
  created_at,
  baseline_dom_path (TEXT, nullable),   ← stored but not used in comparison (baseline path is on design_baselines)
  current_dom_path (TEXT, nullable),    ← path to current run DOM snapshot
  css_diff_json (JSONB, nullable)       ← populated by compareDomSnapshots() in runMonitor()
```

### Storage (Supabase Storage, bucket: `visual`)
```
{projectId}/baselines/{baselineId}/baseline.png
{projectId}/baselines/{baselineId}/baseline-dom.json      ← DOM snapshot captured at baseline creation
{projectId}/monitors/{monitorId}/runs/{runId}/current.png
{projectId}/monitors/{monitorId}/runs/{runId}/diff.png
{projectId}/monitors/{monitorId}/runs/{runId}/current-dom.json  ← DOM snapshot captured at run time
```

### Scheduling
- Vercel Cron: `0 2 * * *` (daily at 02:00 UTC — Hobby plan allows one cron per day) → `GET /api/cron/tick` → `api/cron-tick.ts`
- `api/cron-tick.ts` proxies a POST to the Edge Function `/cron/tick` using `SUPABASE_SERVICE_ROLE_KEY`
- `handleCronTick()` fetches all `enabled = true` monitors (up to 50), filters by cadence:
  - hourly: `last_run_at < 1 hour ago` (or never run)
  - daily: `last_run_at < 24 hours ago` (or never run)
  - Returns `{ processed, succeeded, failed, skipped }` counts

---

## API Routes

All user routes require `Authorization: Bearer <jwt>` header.

| Method | Path | Handler | Auth |
|--------|------|---------|------|
| GET | `/health` | inline | none |
| POST | `/cron/tick` | `handleCronTick` | service role key |
| GET | `/baselines` | `handleListBaselines` | user JWT |
| POST | `/baselines` | `handleCreateDesignBaseline` | user JWT |
| POST | `/baselines/:id/approve` | `handleApproveBaseline` | user JWT |
| GET | `/baselines/:id/runs` | `handleListRuns` | user JWT |
| GET | `/baselines/:id/runs/:runId` | `handleGetRun` | user JWT |
| GET | `/runs/:runId` | `handleGetRunById` | user JWT |
| GET | `/monitors` | `handleListMonitors` | user JWT |
| POST | `/monitors` | `handleCreateMonitor` | user JWT |
| GET | `/monitors/:id/runs` | `handleListMonitorRuns` | user JWT |
| DELETE | `/monitors/:id` | `handleDeleteMonitor` | user JWT |

---

## Core Pipeline: runMonitor()

`runMonitor()` is the single source of truth for the capture → diff → CSS diff → store → AI pipeline.
Called by both `handleCreateMonitor()` (inline, returns result) and `handleCronTick()` (background).

**Execution order:**
1. Fetch monitor row and approved baseline from DB
2. Download baseline screenshot from storage
3. Call `captureScreenshot()` for target URL (Browserless `/screenshot`)
4. Call `comparePngExact()` → produces diff PNG + mismatch stats
5. Upload `current.png` and `diff.png` to storage
6. **CSS Diff (non-blocking, wrapped in try/catch):**
   - Call `captureDomSnapshot()` for target URL (Browserless `/function`)
   - Upload `current-dom.json` to storage
   - Download `baseline-dom.json` from storage
   - Call `compareDomSnapshots()` → returns `CssDiffItem[]`
   - Store result in `css_diff_json` (null if step fails or baseline DOM missing)
7. Get signed URLs for images
8. Insert `visual_runs` row with: `css_diff_json`, `ai_json: null`, `ai_status: 'skipped'`
9. **AI Analysis (non-blocking async IIFE, only if `OPENAI_API_KEY` set):**
   - Call `generateAIInsights()` with image URLs + mismatch stats
   - `UPDATE visual_runs SET ai_json=..., ai_status='completed'`
   - On failure: `UPDATE visual_runs SET ai_status='failed', ai_error=...`
10. Update `monitors.last_run_at = now()`
11. Return `{ runId, mismatchPercentage }`

---

## Frontend Polling (Index.tsx)

After monitor creation, frontend polls `visual_runs` every 1500ms.

**Stop condition** (all three must be true):
```ts
run.status === 'completed'
&& run.mismatch_percentage !== null
&& (run.ai_status === 'completed' || run.ai_status === 'failed')
```

Polling continues while `ai_status` is `'skipped'` or `'pending'` — this prevents the race condition
where the UI reads the run before async AI has finished updating the row.

**Hard timeout:** 30 seconds → shows "Run timed out".

**On successful stop:** reads `ai_json`, `ai_status`, `css_diff_json` directly from the polled row.

**Render order (Index.tsx result panel):**
1. Drift % card
2. Three images (Baseline / Current / Diff)
3. AI Analysis card (if `ai_status === 'completed'` or `=== 'failed'`)
4. CSS Changes card (if `css_diff_json` is non-empty)

---

## Completed Milestones

### Milestone 1 — Core Infrastructure
- Supabase Edge Function with full request router
- Database schema for `design_baselines`, `monitors`, `visual_runs`
- Supabase Storage bucket with signed URL generation
- SSRF protection (`ssrfGuard.ts`) — blocks localhost and private IP ranges
- CORS headers on all responses
- Screenshot capture via Browserless with 3 retries (exponential backoff), blank image detection

### Milestone 2 — Visual Diff Pipeline
- Pixel comparison via `pixelmatch` + `imagescript`
- Two-tone diff overlay (green = removed, red = added)
- Per-baseline drift tolerance (`diff_threshold_pct`)
- Ignore regions (canvas-drawn rectangles, masked before comparison)
- `handleCreateMonitor()` delegates to `runMonitor()` — no duplicate pipeline

### Milestone 3 — Async AI Analysis
- GPT-4o-mini receives baseline + current + diff image URLs and mismatch stats
- Structured output: `{ summary, severity, issues[], quickWins[] }`
- `filterAIIssues()` suppresses false "duplication" reports caused by diff ghosting
- `ai_status` lifecycle: `skipped → pending → completed | failed`
- If `OPENAI_API_KEY` is not set, AI is skipped (run completes normally)

### Milestone 4 — Monitor Lifecycle
- Step 1: capture baseline screenshot → store PNG → return signed preview URL
- Step 2: approve baseline (sets `approved = true`)
- Step 3: create monitor → runs first comparison immediately via `runMonitor()`
- Cron picks up monitors that are due based on cadence + `last_run_at`

### Milestone 5 — Frontend MVP
- **Dashboard** (`/`): monitor table (name, status badge, drift %, last check), View Result dialog, Delete button with confirm
- **Create Monitor** (`/create-monitor`): two-step wizard, device preset picker, canvas ignore region drawing, polling for run results
- **MonitorHistory** (`/monitors/:id/history`): drift trend chart (Recharts), paginated run table with AI and CSS change counts, run detail dialog
- **VisualRun** (`/visual/baselines/:id/runs/:id`): status/stats cards, AI insights panel, CSS changes panel, three-panel image viewer

### Milestone 6 — Codebase Consolidation
- Removed: old `visual_baselines` / `visual_jobs` handlers, dead files (`rateLimit.ts`, `router.ts`, stubs), unused `src/core/` directory, stale docs
- Removed legacy deps: `express`, `cors`, `playwright`, `pngjs`
- All handlers query only `design_baselines` and `monitors`

### Milestone 7 — Correctness Fixes
- **First-run severity:** `handleCreateMonitor()` now calls `runMonitor()` — every run has `severity` set
- **Cron cadence:** `monitors.last_run_at` added; `handleCronTick()` enforces hourly/daily cadence
- **Return type bug in cron:** `runMonitor()` return type corrected

### Milestone 8 — CSS Diff Pipeline (fully wired)
- `captureDomSnapshot()` called in both `handleCreateDesignBaseline()` and `runMonitor()`
- `compareDomSnapshots()` runs in `runMonitor()`, result stored in `css_diff_json`
- `handleListMonitorRuns()` and `handleGetRun()` return `cssDiffJson` in response
- Frontend (`MonitorHistory.tsx`, `VisualRun.tsx`, `Index.tsx`) renders CSS change panels

### Milestone 9 — Authentication & Multi-tenancy
- RLS policies on `design_baselines`, `monitors`, `visual_runs`: `project_id = auth.uid()::text`
- Storage RLS: users can only access objects under their own `{userId}/` prefix
- `getUserFromRequest()` validates JWT via `supabase.auth.getUser(token)` (explicit token — not session-based)
- Login page: email/password + Google OAuth with `redirectTo: window.location.origin`
- Signup page with email confirmation support
- `ProtectedRoute` wraps all app routes
- `getAuthHeaders()` sends `Authorization: Bearer <token>` + `apikey` on all API calls
- `.env` removed from Git tracking; `.gitignore` updated

---

## Remaining Gaps

These have no implementation. Listed in priority order.

### 1. Notifications & Alerting
No alert mechanism exists. Drift can exceed threshold silently.
- Add `webhook_url TEXT NULL`, `alert_threshold_pct NUMERIC NULL DEFAULT 5.0` to `monitors`
- In `runMonitor()`: if mismatch exceeds threshold and webhook URL is set, POST payload (non-blocking async, same pattern as AI)
- Payload should be Slack-compatible
- UI: webhook + threshold fields in monitor creation form

### 2. Tests & CI
No tests of any kind exist.
- GitHub Actions: `tsc --noEmit` + `vite build` on every push to main
- Vitest unit tests: `cssDiff.ts` matching logic, `filterAIIssues.ts`, diff edge cases
- Optional: Deno tests for Edge Function handlers with mocked Supabase client

### 3. Minor Functional Gaps
- Dashboard fetches up to 200 runs without pagination — will degrade at scale
- No way to edit or pause a monitor (delete is implemented)
- No way to re-capture or update a baseline (must create a new one)
- No rate limiting (was removed, not replaced)

---

## Production Readiness Checklist

### Infrastructure
- [x] Supabase Edge Function deployed
- [x] Supabase Storage bucket configured
- [x] Vercel deployment with SPA rewrites
- [x] Vercel Cron configured — daily at 02:00 UTC (`0 2 * * *`, Hobby plan)
- [x] SSRF protection on all user-supplied URLs
- [x] RLS policies on all tables (migrations `20260220000200` + `20260220000300`)
- [ ] Environment variable audit (all secrets confirmed in Supabase secrets + Vercel env)

### Security
- [x] SSRF guard blocks internal network access
- [x] Signed URLs for storage (generated on demand, not stored)
- [x] Email/password auth + Google OAuth (`redirectTo: window.location.origin`)
- [x] JWT validated in Edge Function with explicit token; all DB queries scoped to `user.id` via RLS
- [x] `.env` removed from Git history; ignored in `.gitignore`
- [ ] Rate limiting — removed, not replaced

### Correctness
- [x] Pixel diff produces correct visual output
- [x] Ignore regions correctly masked before comparison
- [x] Per-baseline tolerance applied in comparison
- [x] AI analysis runs async without blocking run creation
- [x] AI polling race condition fixed — stop condition requires `ai_status` settled
- [x] Severity stored on all runs including the first
- [x] Cron cadence enforced (hourly/daily based on `last_run_at`)
- [x] CSS diff populated in `visual_runs.css_diff_json` by `runMonitor()`

### Observability
- [x] `console.log` / `console.error` throughout handlers (visible in Supabase Edge Function logs)
- [x] `ai_status` + `ai_error` columns track AI pipeline state
- [ ] No structured error reporting or alerting on backend failures
- [ ] No uptime monitoring

### Feature Completeness for Launch
- [x] Baseline capture and approval
- [x] Monitor creation with immediate first run
- [x] Continuous monitoring via cron
- [x] Visual diff with image viewer
- [x] AI-powered analysis with full structured output
- [x] CSS-level diff (wired end-to-end)
- [x] Monitor history with drift trend chart
- [x] Authentication (email/password + Google OAuth)
- [x] Multi-tenant data isolation via RLS
- [x] Monitor deletion
- [ ] Notifications / alerts
- [ ] Monitor editing / pausing
- [ ] Tests / CI

---

## Execution Roadmap

### Stage 1 — Correctness Fixes ✅ COMPLETE
- First-run severity fixed (`handleCreateMonitor` → `runMonitor`)
- Cron cadence enforcement added (`last_run_at` + filter in `handleCronTick`)
- Return type bug fixed in cron response

### Stage 2 — CSS Diff Pipeline ✅ COMPLETE
- `captureDomSnapshot()` wired in `handleCreateDesignBaseline` and `runMonitor`
- `compareDomSnapshots()` result stored in `css_diff_json`
- Frontend renders CSS Changes panel in all three result views

### Stage 3 — Authentication & Multi-tenancy ✅ COMPLETE
- RLS policies on all tables and storage
- JWT validation in Edge Function
- Login / Signup / ProtectedRoute
- Google OAuth with dynamic `redirectTo`
- `.env` removed from repository

### Stage 4 — Notifications (next)
- Add `webhook_url` + `alert_threshold_pct` to `monitors` table
- Fire non-blocking webhook in `runMonitor()` when drift exceeds threshold
- Add fields to monitor creation form

### Stage 5 — Tests & CI/CD
- GitHub Actions: typecheck + build on every push
- Vitest unit tests for CSS diff engine and AI filter logic

---

## Guiding Technical Principles

1. **Async AI, sync everything else.** Insert the run row first, then kick off AI in a detached async IIFE. AI must never block run creation or cron completion.

2. **Service role on the backend, anon key on the frontend.** Edge Function uses `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS). Frontend uses `VITE_SUPABASE_ANON_KEY` (subject to RLS). Never expose service role to the frontend.

3. **SSRF check every user-supplied URL.** Call `isUrlSafe()` before passing any URL to Browserless. Non-negotiable.

4. **Never store signed URLs.** Generate on demand in API responses only. Store storage paths (e.g. `userId/baselines/abc/baseline.png`).

5. **`runMonitor()` is the single pipeline.** `handleCreateMonitor()` calls `runMonitor()` — no duplicate comparison logic anywhere.

6. **`projectId = auth.uid()`.** Every table row is scoped to `project_id`. The backend ignores any `projectId` in request bodies and always uses the authenticated user's ID.

7. **Migrations are append-only.** Never edit an existing `.sql` file. Always create a new timestamped migration.

8. **One Edge Function deployment.** All routes in `supabase/functions/visual-api/`. Do not split — cold start overhead multiplies.

9. **CSS diff is supplementary, never gating.** All DOM snapshot and diff logic is in try/catch. A failure results in `css_diff_json = null`; the run still completes and is marked `completed`.

10. **Cron is not exactly-once.** Vercel can fire a cron job twice. Duplicate runs are acceptable for now. A deduplication mechanism can be added later if needed.
