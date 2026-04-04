# AIDQA v2 — Project Brain

> This is the authoritative reference for all AI assistants working on this codebase.
> Read this file fully before writing any code. Update it when architecture changes.

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
| AI analysis | Claude claude-sonnet-4-6 Vision (Anthropic API) |
| Queue | `EdgeRuntime.waitUntil` for MVP; pgmq upgrade path documented below |
| Hosting | Vercel (frontend + cron) |

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
│   │       │   └── anthropic.ts  # Claude API call
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
├── api/
│   └── cron-tick.ts              # Vercel cron (not needed for MVP, placeholder)
├── tasks/
│   ├── todo.md                   # Current task checklist
│   └── lessons.md                # Mistakes and corrections log
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
  evidence          JSONB NOT NULL,                   -- shape depends on evidence_type (see Evidence model)
  why_it_matters    TEXT NOT NULL,
  repair_guidance   TEXT NOT NULL,
  ai_fix_instruction TEXT NOT NULL,
  metric_value      TEXT,                             -- e.g. "contrast ratio 2.1:1"
  score_impact      INTEGER,                          -- negative, e.g. -12
  source            TEXT NOT NULL
                    CHECK (source IN ('deterministic', 'ai')),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### RLS policies

```sql
-- scans
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_scans" ON scans
  USING (user_id = auth.uid()::text);

-- findings
ALTER TABLE findings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_findings" ON findings
  USING (user_id = auth.uid()::text);
```

### Storage policies

Bucket name: `aidqa`

```sql
-- Users can only read/write their own prefix
CREATE POLICY "user_storage_access" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'aidqa' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'aidqa' AND (storage.foldername(name))[1] = auth.uid()::text);
```

Storage path convention: `{userId}/scans/{scanId}/{filename}`
- `original.png` or `original.jpg` — as uploaded
- `normalized.png` — 1440px wide, always PNG
- `overlay.png` — normalized image with evidence boxes drawn on it
- `dom-snapshot.json` — extracted computed styles + layout data

---

## Evidence model

Every finding carries a typed evidence object. The `evidence_type` column indexes which shape is in `evidence`.

```typescript
type BboxEvidence = {
  type: "bbox"
  x: number; y: number; width: number; height: number
  label?: string
}

type MultiBboxEvidence = {
  type: "multi_bbox"
  boxes: Array<{ x: number; y: number; width: number; height: number; label?: string }>
  description?: string   // e.g. "3 buttons with inconsistent border-radius"
}

type RegionEvidence = {
  type: "region"
  description: string    // e.g. "top navigation area", "hero section"
}

type MetricEvidence = {
  type: "metric"
  measured: string       // e.g. "2.1:1 contrast ratio"
  threshold: string      // e.g. "4.5:1 required (WCAG AA)"
  element?: string       // e.g. "body text in hero section"
}

type ExplanationEvidence = {
  type: "explanation"
  // No spatial component. Finding is qualitative. why_it_matters carries the evidence.
}

type Evidence = BboxEvidence | MultiBboxEvidence | RegionEvidence | MetricEvidence | ExplanationEvidence
```

Frontend rendering rules by type:
- `bbox` → draw one colored rectangle on the overlay image
- `multi_bbox` → draw multiple labeled rectangles
- `region` → show a text badge on the result card; no overlay rectangle
- `metric` → show a measurement callout card (measured vs threshold); no overlay rectangle  
- `explanation` → show finding card only; no overlay

---

## API contract

All user routes require `Authorization: Bearer <jwt>` header.

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | Liveness check, no auth |
| POST | `/v1/scans` | Create scan. Body: `{ url }` OR multipart file upload |
| GET | `/v1/scans` | List user's scans, paginated (`?page=1&limit=20`) |
| GET | `/v1/scans/:id` | Scan status, score, category scores. Poll until `status = completed` |
| GET | `/v1/scans/:id/findings` | Prioritized finding list |
| GET | `/v1/scans/:id/artifacts` | Signed URLs for normalized, overlay, dom-snapshot |
| DELETE | `/v1/scans/:id` | Delete scan and all findings |

### POST /v1/scans — request shapes

URL scan:
```json
{ "type": "url", "url": "https://example.com" }
```

Screenshot upload: multipart/form-data with field `file` (PNG/JPG/WEBP, max 10 MB).

### GET /v1/scans/:id — response shape

```json
{
  "id": "scan_abc",
  "status": "completed",
  "input_type": "url",
  "input_url": "https://example.com",
  "score": 74,
  "category_scores": {
    "layout": 68,
    "hierarchy": 72,
    "consistency": 80,
    "accessibility": 60,
    "design_system": 85,
    "ux_readiness": 75
  },
  "finding_count": 5,
  "det_status": "completed",
  "ai_status": "completed",
  "created_at": "2026-03-12T10:00:00Z",
  "completed_at": "2026-03-12T10:00:42Z"
}
```

### GET /v1/scans/:id/findings — response shape

```json
{
  "findings": [
    {
      "id": "f_01",
      "category": "accessibility",
      "severity": "critical",
      "title": "Body text fails WCAG AA contrast",
      "evidence_type": "metric",
      "evidence": {
        "type": "metric",
        "measured": "2.1:1",
        "threshold": "4.5:1 (WCAG AA)",
        "element": "paragraph text in hero section"
      },
      "why_it_matters": "Users with low vision cannot read this text reliably.",
      "repair_guidance": "Change text color from #9CA3AF to #4B5563 or darker.",
      "ai_fix_instruction": "Update the hero paragraph text color to pass 4.5:1 contrast against its background.",
      "metric_value": "2.1:1 contrast ratio",
      "score_impact": -20,
      "source": "deterministic"
    }
  ]
}
```

---

## Processing pipeline

### Primary path: URL scan

This is the core product path. Screenshot upload is a secondary fallback.

```
POST /v1/scans { type: "url", url: "..." }
  │
  ├─ SSRF check (isUrlSafe — block private IPs, localhost)
  ├─ Insert scans row: status=pending
  ├─ Return { scan_id } to client immediately (HTTP 202)
  │
  └─ EdgeRuntime.waitUntil(processScan(scanId, userId, input))
       │
       ├─ UPDATE scans SET status=processing
       │
       ├─ PHASE 1 — Capture (Browserless)
       │   ├─ captureScreenshot(url) → PNG buffer (1440×1024 viewport)
       │   ├─ captureDomSnapshot(url) → structured DOM metadata JSON
       │   │     DOM snapshot contains per-element:
       │   │       selector, tag, role, boundingBox {x,y,width,height},
       │   │       computedStyles {color, backgroundColor, fontSize, fontWeight,
       │   │                       lineHeight, padding, margin, borderRadius,
       │   │                       cursor, display, gap, opacity},
       │   │       textContent (truncated), isVisible, isInteractive
       │   ├─ normalizeImage(png) → 1440px wide PNG
       │   ├─ Upload original, normalized, dom-snapshot to Storage
       │   └─ UPDATE scans SET original_path, normalized_path, dom_path
       │
       ├─ PHASE 2 — Deterministic engine (runs on DOM snapshot)
       │   ├─ runAllChecks(domSnapshot, normalizedImagePath)
       │   ├─ Returns Finding[] (source: "deterministic")
       │   └─ UPDATE scans SET det_status=completed
       │
       ├─ PHASE 3 — AI analysis (Claude Vision)
       │   ├─ buildPrompt(normalizedImageUrl, deterministicFindings)
       │   ├─ callClaude(prompt) → structured JSON findings
       │   ├─ Returns Finding[] (source: "ai")
       │   └─ UPDATE scans SET ai_status=completed (or failed + ai_error)
       │
       ├─ PHASE 4 — Merge + score
       │   ├─ mergeFindings(deterministicFindings, aiFindings)
       │   ├─ deduplicateFindings(merged)
       │   ├─ prioritize(deduplicated) → top 3–7 by severity
       │   ├─ calculateScore(findings) → { overall, categoryScores }
       │   ├─ generateOverlay(normalizedImage, findings) → annotated PNG
       │   ├─ Upload overlay to Storage
       │   └─ INSERT all findings rows
       │
       └─ UPDATE scans SET status=completed, score, category_scores,
                           finding_count, completed_at, overlay_path
```

### Secondary path: Screenshot upload

Screenshot upload skips Phase 1 DOM capture entirely. This means:
- Contrast, spacing, touch target, and token checks that require computed CSS **cannot run**
- Only Claude Vision runs (hierarchy, coherence, rough grouping, rough layout)
- `det_status` is set to `skipped`
- The finding list will be shorter and less precise — this is disclosed to the user in the UI

Do not claim screenshot-only produces "precise contrast ratios" or "measured spacing values." It does not. The image-only path gives Claude something to reason about visually, nothing more.

### Frontend polling

After `POST /v1/scans` returns `{ scan_id }`, the frontend polls `GET /v1/scans/:id` every 1500ms.

Stop condition (all true):
```
scan.status === 'completed' || scan.status === 'failed'
```

Hard timeout: 60 seconds → show error state.

On completion: fetch `/findings` and `/artifacts`, render result page.

---

## Deterministic rule engine

These checks run only when a DOM snapshot is available (URL scan path). All checks are measurable and defensible — no AI involved. Each check returns zero or more `Finding` objects.

### Rules

**Accessibility — always run first, highest priority**

| Rule | Detection | Severity | Evidence type |
|---|---|---|---|
| Text contrast failure | Extract `color` + `backgroundColor` from computed styles per text element. Compute WCAG luminance ratio. Flag below 4.5:1 (normal text) or 3:1 (large text ≥18px or ≥14px bold) | critical | metric |
| Touch target risk | Find all elements where `isInteractive=true`. Flag bounding box < 44×44px (width OR height) | high | bbox |

**Layout**

| Rule | Detection | Severity | Evidence type |
|---|---|---|---|
| Spacing rhythm break | Collect all `margin` and `gap` values from sibling elements in the same container. Find the dominant value (mode). Flag elements where the value differs by > 4px or > 25% from dominant. | medium | multi_bbox |
| Edge misalignment | For sibling blocks in a flex/grid container expected to align on the same axis, flag left/top edge offsets > 6px | medium | multi_bbox |
| Whitespace imbalance | Detect sections where one side has > 3× the whitespace of the other (padding asymmetry) | low | region |

**Consistency**

| Rule | Detection | Severity | Evidence type |
|---|---|---|---|
| Button style drift | Find all elements with `role=button` or `<button>` tag. Compare `borderRadius`, `height`, `paddingLeft`/`Right` across all instances. Flag if stddev > 2px on any property | medium | multi_bbox |
| Card/component variance | Find repeated sibling elements with the same class or similar structure (>= 3 instances). Compare padding, border, borderRadius. Flag if variance > 2px | medium | multi_bbox |

**Typography / Design system**

| Rule | Detection | Severity | Evidence type |
|---|---|---|---|
| Heading scale weakness | Compute h1/h2/h3 to body font-size ratio. Flag if h1:body < 1.5× or h2:body < 1.25× | medium | metric |
| Spacing token violation | Collect all spacing values (margin, padding, gap). Flag frequent values that are not multiples of 4px | medium | metric |
| Typography scale chaos | Count distinct font-size values on the page. Flag if > 6 distinct sizes | low | metric |

### Implementation notes for deterministic checks

- Extract computed styles in the Browserless DOM snapshot script — do not try to infer CSS from pixels
- `color` and `backgroundColor` come back as `rgb(r, g, b)` strings — parse to hex before computing luminance
- For contrast: handle alpha/transparency by compositing against the nearest opaque ancestor background
- Bounding boxes in the DOM snapshot are viewport-relative — they map directly to the normalized image coordinates (both are 1440px wide)
- Cap findings per rule: if 12 buttons all have the same drift, that is one finding with `multi_bbox` evidence listing all 12, not 12 findings

---

## AI analysis (Claude Vision)

Claude runs after the deterministic engine. It receives the screenshot and a summary of deterministic findings so it does not re-report the same issues.

### What Claude assesses

Claude handles the checks that require understanding context and intent — things that cannot be expressed as threshold comparisons:

1. **Visual hierarchy** — Is there a clear primary action? Does the heading structure guide the eye? Is emphasis balanced?
2. **Layout coherence** — Does the whitespace distribution make sense? Does the scan flow hold together?
3. **UX readiness** — For forms, data views, or async surfaces: are error states, empty states, loading states, and validation visible or implied?
4. **Repair guidance** — Claude writes `repair_guidance` and `ai_fix_instruction` for every finding, including the deterministic ones (which are passed back to Claude for this step)

### Claude API call

```typescript
// anthropic.ts
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": Deno.env.get("ANTHROPIC_API_KEY"),
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "url",
              url: normalizedImageSignedUrl,
            },
          },
          {
            type: "text",
            text: buildPrompt(deterministicFindings),
          },
        ],
      },
    ],
  }),
})
```

### Prompt structure

```
You are a senior product designer performing a design QA review.

## Screenshot
The attached image is a UI screenshot at 1440px desktop width.

## Already detected (deterministic checks)
The following issues were already found by automated measurement. Do NOT repeat these.
Return an empty array if you have no new findings to add.

<deterministic_findings>
{JSON.stringify(deterministicFindings.map(f => ({ category: f.category, title: f.title })))}
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
- Be specific. "Button has no hover state" is better than "interactive feedback missing".
```

### Repair guidance pass

After merging, Claude does a second lightweight call (text only, no image) to write `repair_guidance` and `ai_fix_instruction` for any deterministic findings that only have template-generated guidance. This ensures all findings have polished, contextual guidance, not just "normalize spacing values."

---

## Scoring

```typescript
function calculateScore(findings: Finding[]): { overall: number; categoryScores: CategoryScores } {
  const WEIGHTS = { critical: 20, high: 12, medium: 7, low: 3 }

  // Start at 100
  let total = 100
  const categoryDeductions: Record<string, number> = {}

  // Track which rules have been penalized to cap duplicate patterns
  const penalizedRules = new Set<string>()

  for (const finding of findings) {
    const ruleKey = `${finding.category}:${finding.title}`
    if (penalizedRules.has(ruleKey)) continue  // cap repeated pattern penalty

    const deduction = WEIGHTS[finding.severity]
    total -= deduction
    categoryDeductions[finding.category] = (categoryDeductions[finding.category] ?? 0) + deduction
    penalizedRules.add(ruleKey)
  }

  total = Math.max(0, total)

  // Category subtotals
  const categories = ['layout', 'hierarchy', 'consistency', 'accessibility', 'design_system', 'ux_readiness']
  const categoryScores: CategoryScores = {}
  for (const cat of categories) {
    categoryScores[cat] = Math.max(0, 100 - (categoryDeductions[cat] ?? 0))
  }

  return { overall: total, categoryScores }
}
```

Score is always secondary to findings in the UI. Never lead with the number.

---

## Frontend — page breakdown

### ScanInput.tsx (/)

- Two tabs: "Scan URL" and "Upload screenshot"
- URL tab: text input + "Scan" button. Validate it's a real URL before submit.
- Screenshot tab: drag-and-drop zone + file picker. Accept PNG/JPG/WEBP. Show file size limit (10 MB). 
- Show disclaimer on screenshot tab: "Screenshot scans provide layout and hierarchy analysis only. For precise contrast, spacing, and accessibility checks, scan a live URL."
- On submit: POST /v1/scans → navigate to /scans/:id with polling active

### ScanResult.tsx (/scans/:id)

**Do not lead with the score.** Layout:

```
[ NavBar ]
[ Scan header: URL/filename, timestamp, input type badge ]

[ Main content — two columns on desktop, stacked on mobile ]
  LEFT (60%):
    [ Evidence overlay viewer ]
      - Displays normalized screenshot
      - Colored border rectangles drawn over findings with bbox/multi_bbox evidence
      - Color = severity: red=critical, orange=high, yellow=medium, blue=low
      - Click rectangle → jump to finding card
      - Click finding card → highlight rectangle

  RIGHT (40%):
    [ Score bar — compact, NOT a hero element ]
      - Overall score as a number + horizontal bar
      - 6 category scores as small pips

    [ Finding cards — this is the hero ]
      - Sorted by severity (critical first)
      - Each card:
          - Severity badge (color-coded)
          - Category badge
          - Title (bold)
          - Evidence callout (metric/region/explanation as appropriate)
          - "Why it matters" text
          - Repair guidance text
          - "AI fix instruction" — monospace expandable block
          - Source badge (Automated / AI)
```

### ScanHistory.tsx (/history)

- Table: date, URL/filename, score (with color), finding count, status badge
- Click row → navigate to /scans/:id
- Paginated (20 per page)
- Empty state: prompt to start a scan

---

## Auth

Copied pattern from old repo. No changes.

```typescript
// src/lib/auth.ts
export async function getAuthHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Not authenticated')
  return {
    'Authorization': `Bearer ${session.access_token}`,
    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
  }
}
```

Edge Function auth (supabaseServer.ts):
```typescript
export async function getUserFromRequest(req: Request): Promise<string> {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) throw new AuthError('No token')
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) throw new AuthError('Invalid token')
  return user.id
}
```

---

## SSRF guard

Copy `ssrfGuard.ts` verbatim from the old repo. Call `isUrlSafe(url)` before passing any user-supplied URL to Browserless. This is non-negotiable. Block:
- localhost, 127.0.0.1, ::1
- 10.x.x.x, 172.16–31.x.x, 192.168.x.x
- 169.254.x.x (link-local)
- Any IP that resolves to a private range

---

## Async execution model

### MVP: `EdgeRuntime.waitUntil`

The intake handler returns HTTP 202 immediately after inserting the scan row. All processing happens in a background task registered with `EdgeRuntime.waitUntil`. The Edge Function worker stays alive until the task completes (wall clock limit: 150s free tier, 400s Pro).

```typescript
// handlers.ts — createScan
Deno.serve(async (req) => {
  // ... validate, insert scan row ...
  
  const response = new Response(JSON.stringify({ scan_id }), { status: 202 })
  
  // Register background work — does not block response
  EdgeRuntime.waitUntil(processScan(scanId, userId, input))
  
  return response
})
```

**Important constraint:** A full scan (Browserless render + DOM extraction + deterministic checks + Claude Vision) should complete in 30–60 seconds on a fast page. For complex pages or slow Browserless responses, this approaches the 150s free tier limit. Handle this by:
- Setting a per-phase timeout (Browserless: 20s, Claude: 30s)
- If any phase times out, mark `status=failed` with a clear error message
- Do not attempt to resume — the user should retry

### Upgrade path: pgmq queue (when needed)

When scan processing becomes more complex or regularly exceeds 60 seconds, switch to:
1. `POST /v1/scans` inserts scan row + sends message to pgmq queue
2. `pg_cron` fires a worker Edge Function every 30 seconds
3. Worker pops one message, processes it, updates the scan row
4. Frontend polls the same `GET /v1/scans/:id` endpoint — no frontend changes needed

This upgrade requires adding pgmq extension and a worker function. The frontend polling contract does not change.

---

## Environment variables

### Edge Function secrets (set in Supabase dashboard → Settings → Edge Functions → Secrets)
```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
ANTHROPIC_API_KEY
BROWSERLESS_API_KEY
BROWSERLESS_URL          # e.g. https://chrome.browserless.io
```

### Vercel env (frontend)
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_API_BASE_URL        # Supabase Edge Function base URL
```

---

## Browserless usage

### Screenshot capture

```typescript
// capture.ts
export async function captureScreenshot(url: string): Promise<Uint8Array> {
  const response = await fetch(`${BROWSERLESS_URL}/screenshot?token=${BROWSERLESS_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url,
      options: { type: 'png', fullPage: false },
      viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
      gotoOptions: { waitUntil: 'networkidle2', timeout: 15000 },
    }),
  })
  if (!response.ok) throw new Error(`Browserless screenshot failed: ${response.status}`)
  return new Uint8Array(await response.arrayBuffer())
}
```

### DOM snapshot capture

The DOM snapshot script runs in-browser via Browserless `/function` endpoint. It returns a JSON array of visible elements with computed styles and bounding boxes.

```typescript
export async function captureDomSnapshot(url: string): Promise<DomElement[]> {
  const response = await fetch(`${BROWSERLESS_URL}/function?token=${BROWSERLESS_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url,
      context: {},
      code: `
        module.exports = async ({ page }) => {
          await page.setViewport({ width: 1440, height: 900 });
          await page.goto(context.url, { waitUntil: 'networkidle2', timeout: 15000 });
          
          return await page.evaluate(() => {
            const STYLE_PROPS = [
              'color', 'backgroundColor', 'fontSize', 'fontWeight', 'lineHeight',
              'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
              'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
              'borderRadius', 'borderColor', 'borderWidth',
              'cursor', 'display', 'gap', 'opacity', 'visibility',
              'alignItems', 'justifyContent', 'flexDirection',
            ];
            
            const isVisible = (el) => {
              const s = window.getComputedStyle(el);
              return s.display !== 'none' && s.visibility !== 'hidden' 
                     && s.opacity !== '0' && el.offsetWidth > 0;
            };
            
            const isInteractive = (el) => {
              const tag = el.tagName.toLowerCase();
              const role = el.getAttribute('role');
              const cursor = window.getComputedStyle(el).cursor;
              return ['a', 'button', 'input', 'select', 'textarea'].includes(tag)
                || ['button', 'link', 'checkbox', 'radio', 'menuitem'].includes(role)
                || cursor === 'pointer';
            };
            
            const elements = [...document.querySelectorAll('*')]
              .filter(el => isVisible(el))
              .map(el => {
                const rect = el.getBoundingClientRect();
                const computed = window.getComputedStyle(el);
                const styles = {};
                for (const prop of STYLE_PROPS) {
                  styles[prop] = computed[prop];
                }
                return {
                  tag: el.tagName.toLowerCase(),
                  id: el.id || null,
                  classes: [...el.classList].slice(0, 5),
                  role: el.getAttribute('role') || null,
                  ariaLabel: el.getAttribute('aria-label') || null,
                  boundingBox: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
                  computedStyles: styles,
                  textContent: (el.textContent || '').trim().slice(0, 100),
                  isInteractive: isInteractive(el),
                  tagDepth: el.closest('body') 
                    ? el.closest('body').querySelectorAll(':scope *').length : 0,
                };
              })
              .filter(el => el.boundingBox.width > 0 && el.boundingBox.height > 0);
            
            return elements;
          });
        };
      `,
    }),
  })
  if (!response.ok) throw new Error(`Browserless DOM snapshot failed: ${response.status}`)
  return response.json()
}
```

---

## Image normalization

```typescript
// normalize.ts — using imagescript (pure Deno, no native deps)
import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'

export async function normalizeImage(input: Uint8Array): Promise<Uint8Array> {
  const img = await Image.decode(input)
  
  // Resize to 1440px wide, maintain aspect ratio
  if (img.width !== 1440) {
    const scale = 1440 / img.width
    img.resize(1440, Math.round(img.height * scale))
  }
  
  // Cap height at 6000px to avoid enormous full-page renders
  if (img.height > 6000) {
    img.crop(0, 0, 1440, 6000)
  }
  
  return img.encode() // PNG
}
```

---

## Overlay generation

After findings are merged and scored, draw evidence boxes on the normalized image:

```typescript
// In score.ts / after merge
const SEVERITY_COLORS = {
  critical: [220, 38, 38],   // red
  high:     [234, 88, 12],   // orange
  medium:   [202, 138, 4],   // yellow-dark
  low:      [37, 99, 235],   // blue
}

export async function generateOverlay(
  normalizedImageBytes: Uint8Array,
  findings: Finding[]
): Promise<Uint8Array> {
  const img = await Image.decode(normalizedImageBytes)
  
  for (const finding of findings) {
    const color = SEVERITY_COLORS[finding.severity]
    
    if (finding.evidence_type === 'bbox') {
      const { x, y, width, height } = finding.evidence
      drawRect(img, x, y, width, height, color, 3)
    } else if (finding.evidence_type === 'multi_bbox') {
      for (const box of finding.evidence.boxes) {
        drawRect(img, box.x, box.y, box.width, box.height, color, 2)
      }
    }
    // region, metric, explanation types — no overlay rectangle
  }
  
  return img.encode()
}
```

---

## Implementation order

Build in this exact sequence. Do not skip ahead. Each step must be working before the next starts.

### Step 1 — Project scaffold
- [ ] Init repo, install deps (React + Vite + TS + shadcn/ui + Tailwind)
- [ ] Supabase project setup
- [ ] Run migrations: scans, findings, RLS, storage policies
- [ ] Edge Function scaffold with `/health` route
- [ ] Vercel project setup + env vars
- [ ] Auth pages: Login, Signup, ProtectedRoute (copy pattern from old repo)
- [ ] NavBar

**Done when:** `GET /health` returns 200, auth flow works end to end

---

### Step 2 — Scan intake + capture
- [ ] `POST /v1/scans` handler (URL path only for now)
- [ ] SSRF guard wired to all URL inputs
- [ ] Browserless screenshot capture
- [ ] Browserless DOM snapshot capture
- [ ] Image normalization (imagescript)
- [ ] Upload original + normalized + dom-snapshot to Storage
- [ ] `EdgeRuntime.waitUntil` wired — processing happens in background
- [ ] `GET /v1/scans/:id` returns status (pending → processing → completed/failed)
- [ ] `GET /v1/scans/:id/artifacts` returns signed URLs
- [ ] Frontend ScanInput.tsx (URL tab only) + polling

**Done when:** User submits a URL, scan row goes pending → completed, signed image URLs work

---

### Step 3 — Deterministic engine
- [ ] Contrast check (text color vs background, WCAG ratio)
- [ ] Touch target check (interactive elements < 44px)
- [ ] Spacing rhythm check (outlier detection)
- [ ] Edge misalignment check
- [ ] Button style drift check
- [ ] Card/component variance check
- [ ] Heading scale check
- [ ] Spacing token violation check
- [ ] Each check returns `Finding[]` with correct evidence type
- [ ] Scoring logic
- [ ] Overlay image generation
- [ ] Insert findings to DB after deterministic phase

**Done when:** Scanning a URL produces real deterministic findings with evidence boxes

---

### Step 4 — Claude Vision
- [ ] `anthropic.ts` — Claude API call with image + prompt
- [ ] Prompt construction (pass deterministic finding titles so Claude doesn't repeat)
- [ ] Parse Claude JSON response, validate against Finding shape
- [ ] Merge + deduplicate deterministic + AI findings
- [ ] Re-sort by severity, select top 3–7
- [ ] Second Claude pass for repair guidance on deterministic findings
- [ ] Final scoring calculation
- [ ] Final overlay generation with all findings
- [ ] Update scan row: status=completed, score, category_scores

**Done when:** Full scan pipeline produces a complete, merged, scored finding list

---

### Step 5 — Frontend result view
- [ ] ScanResult.tsx — evidence overlay viewer (canvas or positioned divs)
- [ ] Finding cards — all fields, severity badge, source badge
- [ ] Evidence callout rendering by type (metric, region, bbox, explanation)
- [ ] Score bar + category pips (secondary, below findings)
- [ ] Click finding → highlight overlay rectangle
- [ ] Click rectangle → scroll to finding card
- [ ] ScanHistory.tsx — table + pagination
- [ ] Empty states, error states, loading states on all views

**Done when:** Full end-to-end flow works and looks professional

---

### Step 6 — Screenshot upload path
- [ ] ScanInput.tsx screenshot tab (drag-and-drop + file picker)
- [ ] `POST /v1/scans` multipart file upload handling
- [ ] Skip DOM capture, set `det_status=skipped`
- [ ] Run Claude Vision only (no deterministic findings)
- [ ] UI disclaimer about screenshot-only limitations

**Done when:** Screenshot upload path works, disclaimer is visible

---

### Step 7 — Polish + production readiness
- [ ] Rate limiting on scan creation (e.g. 10 scans/hour per user)
- [ ] Error handling everywhere — no unhandled promise rejections
- [ ] Scan deletion (`DELETE /v1/scans/:id` + cascade)
- [ ] `GET /v1/scans` paginated history
- [ ] Retry logic on Browserless calls (3 attempts, exponential backoff)
- [ ] Env var audit — all secrets confirmed in both Supabase and Vercel
- [ ] Basic telemetry (scan count, failure rate logged to console)
- [ ] Test with 10 real AI-generated UIs from v0/Lovable

---

## Guiding principles

1. **URL scan is the core path.** Screenshot upload is a deliberate fallback with lower output quality. Never imply screenshot-only gives the same results as URL+DOM.

2. **Findings lead, score follows.** The score is a compact summary derived from findings. The result page UI must reflect this hierarchy — findings are the hero, score is a secondary signal.

3. **Deterministic first, AI second.** The deterministic engine runs before Claude. Claude receives a summary of what was already found and is instructed not to repeat it.

4. **Evidence must match the finding.** A spacing finding gets `multi_bbox`. A contrast finding gets `metric`. A hierarchy finding gets `region` or `explanation`. Never use `bbox` for something that cannot be precisely located.

5. **`EdgeRuntime.waitUntil` for all async work.** Never fire a floating promise. Always register background work via `waitUntil`. If the task fails, update the scan row — never silently discard the error.

6. **SSRF guard on every user URL.** Call `isUrlSafe()` before passing any URL to Browserless. No exceptions.

7. **Service role on backend, anon key on frontend.** Edge Function uses `SUPABASE_SERVICE_ROLE_KEY`. Frontend uses `VITE_SUPABASE_ANON_KEY`. Never cross these.

8. **Signed URLs only — never store public URLs.** Generate signed URLs on demand in API responses. Store only storage paths in the database.

9. **RLS on every table.** `user_id = auth.uid()`. The Edge Function always uses the authenticated user's ID from the JWT — never trust a `user_id` in the request body.

10. **Plan before coding.** For any non-trivial task, write a short plan first. Track work in `tasks/todo.md`. Log corrections in `tasks/lessons.md`.

---

## tasks/todo.md template

```markdown
# Current tasks

## In progress
- [ ] Step 2: scan intake + capture

## Done
- [x] Step 1: scaffold, auth, migrations

## Blocked
- None
```

## tasks/lessons.md template

```markdown
# Lessons learned

## 2026-03-12
- Browserless `/function` endpoint needs `context` passed explicitly to the page.evaluate call via module.exports pattern — not via direct URL param injection.
```

---

## What NOT to build in MVP

- Baseline comparison / pixel diff — wrong product
- Monitor scheduling / cron — wrong product
- Figma import — post-MVP
- Design token / Tailwind config ingestion — post-MVP
- Team workspaces / collaboration — post-MVP
- Component library pattern recognition — post-MVP
- Webhooks / alerting — post-MVP
- pgmq queue — post-MVP (document upgrade path, do not build)
