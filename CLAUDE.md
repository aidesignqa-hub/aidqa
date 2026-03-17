# AIDQA — Project Brain

> This file is the authoritative reference for AI assistants working on this codebase.
> Update it whenever a milestone is completed or architecture changes.
> Last audited: 2026-03-18 (full code audit, migrated to Gemini, dead v1 code removed)

---

## What this product is

AIDQA is a design QA tool for AI-generated UI. A user submits a URL or screenshot. The system inspects the interface for measurable design quality issues — layout incoherence, weak hierarchy, inconsistency, accessibility failures, design-system drift — and returns 3–7 prioritized findings. Each finding includes an evidence region, a plain-English explanation, repair guidance, and an AI-ready fix instruction.

**The product is not:**
- A visual regression tool (no baselines, no pixel diff, no monitoring)
- A taste judge (no subjective style opinions)
- A replacement for designers

**The core user:** indie hackers and startup teams shipping UI fast with AI builders (v0, Lovable, Cursor) who can tell the output feels off but cannot diagnose why.

---

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite + TypeScript + shadcn/ui + Tailwind CSS |
| Backend | Supabase Edge Functions (Deno runtime) |
| Database | Supabase Postgres |
| Storage | Supabase Storage (bucket: `aidqa`) |
| Auth | Supabase Auth — email/password + Google OAuth |
| Headless render | Browserless REST API |
| AI analysis | Google Gemini Vision (Google AI Studio) |
| Queue | `EdgeRuntime.waitUntil` for MVP; pgmq upgrade path documented below |
| Hosting | Vercel (frontend) |

---

## Repository structure

```
/
├── src/                          # React frontend
│   ├── pages/
│   │   ├── ScanInput.tsx         # Upload or URL entry
│   │   ├── ScanResult.tsx        # Score + findings + overlay viewer
│   │   ├── ScanHistory.tsx       # Past scans list
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── components/
│   │   ├── NavBar.tsx
│   │   ├── FindingCard.tsx
│   │   ├── EvidenceOverlay.tsx   # Canvas overlay on screenshot
│   │   └── ScoreBar.tsx
│   ├── lib/
│   │   ├── supabaseClient.ts
│   │   ├── auth.ts               # getAuthHeaders()
│   │   └── apiBase.ts
│   └── main.tsx
├── supabase/
│   ├── functions/
│   │   └── aidqa-api/            # Single Edge Function, all routes
│   │       ├── index.ts          # Router
│   │       ├── _lib/
│   │       │   ├── cors.ts
│   │       │   ├── ssrfGuard.ts
│   │       │   ├── supabaseServer.ts
│   │       │   ├── types.ts
│   │       │   ├── storage.ts
│   │       │   └── gemini.ts     # Gemini API call (vision + repair guidance)
│   │       └── scan/
│   │           ├── handlers.ts   # HTTP handlers
│   │           ├── capture.ts    # Browserless screenshot + DOM
│   │           ├── normalize.ts  # Image resize pipeline
│   │           ├── deterministic.ts  # Rule engine
│   │           ├── evidence.ts   # Evidence model builders
│   │           └── score.ts      # Scoring logic
│   └── migrations/
│       ├── 20260312000100_create_scans.sql
│       ├── 20260312000200_create_findings.sql
│       ├── 20260312000300_rls_policies.sql
│       └── 20260312000400_storage_policies.sql
├── landing/                      # Next.js marketing site
├── vercel.json
├── vite.config.ts
└── package.json
```

---

## Database schema

### Table: `scans`

```sql
CREATE TABLE scans (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           TEXT NOT NULL,                    -- auth.uid()
  input_type        TEXT NOT NULL CHECK (input_type IN ('url', 'screenshot')),
  input_url         TEXT,                             -- populated for url scans
  input_filename    TEXT,                             -- populated for screenshot scans
  original_path     TEXT,                             -- storage path
  normalized_path   TEXT,                             -- storage path, 1440px PNG
  overlay_path      TEXT,                             -- storage path, annotated image
  dom_path          TEXT,                             -- storage path, dom-snapshot.json
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  score             INTEGER,                          -- 0–100, null until completed
  category_scores   JSONB,                            -- {layout, hierarchy, consistency, accessibility, design_system, ux_readiness}
  finding_count     INTEGER,
  error_message     TEXT,
  det_status        TEXT NOT NULL DEFAULT 'pending'
                    CHECK (det_status IN ('pending', 'completed', 'failed', 'skipped')),
  ai_status         TEXT NOT NULL DEFAULT 'pending'
                    CHECK (ai_status IN ('pending', 'completed', 'failed', 'skipped')),
  ai_error          TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at      TIMESTAMPTZ
);
```

### Table: `findings`

```sql
CREATE TABLE findings (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id           UUID NOT NULL REFERENCES scans(id) ON DELETE CASCADE,
  user_id           TEXT NOT NULL,
  category          TEXT NOT NULL
                    CHECK (category IN ('layout', 'hierarchy', 'consistency', 'accessibility', 'design_system', 'ux_readiness')),
  severity          TEXT NOT NULL
                    CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  title             TEXT NOT NULL,
  evidence_type     TEXT NOT NULL
                    CHECK (evidence_type IN ('bbox', 'multi_bbox', 'region', 'metric', 'explanation')),
  evidence          JSONB NOT NULL,
  why_it_matters    TEXT NOT NULL,
  repair_guidance   TEXT NOT NULL,
  ai_fix_instruction TEXT NOT NULL,
  metric_value      TEXT,
  score_impact      INTEGER,
  source            TEXT NOT NULL
                    CHECK (source IN ('deterministic', 'ai')),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### RLS policies

```sql
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_scans" ON scans USING (user_id = auth.uid()::text);

ALTER TABLE findings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_findings" ON findings USING (user_id = auth.uid()::text);
```

### Storage policies

Bucket name: `aidqa`

```sql
CREATE POLICY "user_storage_access" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'aidqa' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'aidqa' AND (storage.foldername(name))[1] = auth.uid()::text);
```

Storage path convention: `{userId}/scans/{scanId}/{filename}`

---

## API contract

All user routes require `Authorization: Bearer <jwt>` header.

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | Liveness check, no auth |
| POST | `/v1/scans` | Create scan. Body: `{ url }` OR multipart file upload |
| GET | `/v1/scans` | List user's scans, paginated (`?page=1&limit=20`) |
| GET | `/v1/scans/:id` | Scan status + score. Poll until `status = completed` |
| GET | `/v1/scans/:id/findings` | Prioritized finding list |
| GET | `/v1/scans/:id/artifacts` | Signed URLs for normalized, overlay, dom-snapshot |
| DELETE | `/v1/scans/:id` | Delete scan and all findings |

### Frontend polling

After `POST /v1/scans` returns `{ scan_id }`, the frontend polls `GET /v1/scans/:id` every 1500ms.

Stop condition: `scan.status === 'completed' || scan.status === 'failed'`

Hard timeout: 60 seconds → show error state.

---

## Processing pipeline

```
POST /v1/scans
  → SSRF check → insert scan row → return { scan_id } (202)
  → EdgeRuntime.waitUntil(processScan())
      PHASE 1: Capture — captureScreenshot + captureDomSnapshot + normalizeImage + upload
      PHASE 2: Deterministic — runAllChecks(domSnapshot) → Finding[]
      PHASE 3: Gemini Vision — callGeminiVision(imageSignedUrl, deterministicFindings) → Finding[]
      PHASE 4: Repair guidance — callGeminiRepairGuidance(deterministicFindings) [text-only, non-blocking]
      PHASE 5: Merge + score + overlay → INSERT findings → UPDATE scans status=completed
```

Screenshot upload skips Phase 1 DOM capture. Only Gemini Vision runs. `det_status=skipped`. Findings are fewer and less precise — disclosed in the UI.

---

## AI analysis (Gemini Vision)

`_lib/gemini.ts` exports:

### `callGeminiVision(imageSignedUrl, deterministicFindings): Promise<Finding[]>`
- Fetches image from signed URL → base64 encode with `encodeBase64` from `jsr:@std/encoding/base64`
- Posts to Gemini with image as `inlineData` + prompt text
- Uses `generationConfig.responseMimeType: "application/json"`
- Passes deterministic finding titles to avoid duplicates
- Throws on failure

### `callGeminiRepairGuidance(findings): Promise<Finding[]>`
- Text-only call — rewrites `repair_guidance` and `ai_fix_instruction` on deterministic findings
- Returns original findings on any failure (non-blocking)

### Gemini API details
```
Endpoint: https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={GEMINI_API_KEY}
Response: candidates[0].content.parts[0].text  (JSON string — parse it)
Default model: gemini-2.0-flash (configurable via GEMINI_MODEL env var)
```

---

## Deterministic rule engine

Runs only when DOM snapshot is available (URL scan path).

| Rule | Category | Severity | Evidence |
|---|---|---|---|
| Text contrast failure (WCAG ratio) | accessibility | critical | metric |
| Touch target < 44×44px | accessibility | high | bbox |
| Spacing rhythm break | layout | medium | multi_bbox |
| Edge misalignment | layout | medium | multi_bbox |
| Whitespace imbalance | layout | low | region |
| Button style drift | consistency | medium | multi_bbox |
| Card/component variance | consistency | medium | multi_bbox |
| Heading scale weakness | hierarchy | medium | metric |
| Spacing token violation | design_system | medium | metric |
| Typography scale chaos | design_system | low | metric |

---

## Scoring

```typescript
const WEIGHTS = { critical: 20, high: 12, medium: 7, low: 3 }
// Start at 100, deduct per finding by severity, floor at 0
// Category scores derived from per-category deduction subtotals
```

Score is secondary to findings. Never lead with the number in the UI.

---

## Auth

```typescript
// Frontend — src/lib/auth.ts
export async function getAuthHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Not authenticated')
  return {
    'Authorization': `Bearer ${session.access_token}`,
    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
  }
}

// Edge Function — _lib/supabaseServer.ts
export async function getUserFromRequest(req: Request): Promise<string> {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) throw new AuthError('No token')
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) throw new AuthError('Invalid token')
  return user.id
}
```

---

## Environment variables

### Edge Function secrets (Supabase dashboard → Settings → Edge Functions → Secrets)
```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
GEMINI_API_KEY              # Google AI Studio key — required
GEMINI_MODEL                # optional, default: gemini-2.0-flash
BROWSERLESS_API_KEY
BROWSERLESS_URL             # e.g. https://chrome.browserless.io
```

### Vercel env (frontend)
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_API_BASE_URL           # https://your-project.supabase.co/functions/v1/aidqa-api
```

---

## Guiding principles

1. **URL scan is the core path.** Screenshot upload is a deliberate fallback with lower quality output.
2. **Findings lead, score follows.** Findings are the hero element. Score is a compact secondary signal.
3. **Deterministic first, AI second.** Gemini receives deterministic finding titles and must not repeat them.
4. **Evidence must match the finding.** Spacing → `multi_bbox`. Contrast → `metric`. Hierarchy → `region` or `explanation`.
5. **`EdgeRuntime.waitUntil` for all async work.** Never fire a floating promise. Always update the scan row on failure.
6. **SSRF guard on every user URL.** Call `isUrlSafe()` before passing any URL to Browserless. No exceptions.
7. **Service role on backend, anon key on frontend.** Never cross these.
8. **Signed URLs only.** Generate on demand. Store only storage paths in the database.
9. **RLS on every table.** `user_id = auth.uid()`. Never trust a `user_id` in the request body.
10. **Migrations are append-only.** Never edit an existing `.sql` file. Always create a new timestamped migration.

---

## What NOT to build

- Baseline comparison / pixel diff — wrong product
- Monitor scheduling / cron — wrong product
- Figma import — post-MVP
- Team workspaces / collaboration — post-MVP
- Webhooks / alerting — post-MVP
