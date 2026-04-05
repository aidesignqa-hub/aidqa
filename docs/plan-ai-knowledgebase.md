# Plan: Pure-AI Findings with Knowledge Base Context

## Context

The pipeline is already effectively pure-AI — deterministic rules are defined in `deterministic.ts` but `handlers.ts` passes `[]` as the first arg to `mergeAndPrioritize()`, so they never run. This plan formalizes that direction: improve AI finding quality by (a) giving Gemini structured design knowledge from the curated knowledge base, and (b) passing pre-processed DOM data alongside the screenshot — currently captured but never used.

The design knowledge base lives in `docs/Design_knowledgebase/` — 15 cleaned markdown articles covering visual hierarchy, typography, contrast, spacing, accessibility, Gestalt, usability heuristics, and design system guidelines. The folder also contains local reference images (PNG, AVIF, JPG) and online image references.

---

## Phase 1: Knowledge Object Extraction (human-in-the-loop)

**Goal:** Turn the 15 MD articles into a curated `knowledgebase.json` of structured knowledge objects — both strict testable rules AND softer design principles.

### Two tiers of knowledge objects

The `type` field distinguishes them:

- **`rule`** — Measurable and testable. Has a clear pass/fail threshold or observable violation. *Example: "Body text must maintain ≥4.5:1 contrast ratio (WCAG AA)."*
- **`principle`** — Evaluative and contextual. Informs judgment but isn't binary. *Example: "Users scan pages in an F-pattern — the most critical content should anchor the top-left; pages that bury their primary message in centered or bottom-positioned text lose users before they reach it."*

Both types belong in the knowledge base. Rules help Gemini flag specific violations. Principles help it make holistic judgments about hierarchy, clarity, and flow.

### Taxonomy note

**Scope field — `viewport | full-page | both`**
The full-page screenshot sent to Gemini can be up to 8000px tall, but a real user's first experience is only the top ~900px (the viewport). Scope tells Gemini where to apply the rule:
- `viewport` — evaluate only the above-the-fold area (~900px). Violations below the fold are not findings. Used for: dominant element presence, CTA visibility, hero hierarchy, first impression clarity.
- `full-page` — evaluate across the entire screenshot as one unit. Used for: color consistency, spacing rhythm, total number of font sizes or colors used, pattern violations that accumulate across sections.
- `both` — applies everywhere, but severity is higher when the violation is above the fold. Used for: contrast, grouping, type weight hierarchy.

A fold line annotation will be drawn on the screenshot at ~900px before sending to Gemini, labeled clearly so the model understands the viewport boundary.

**Category and subcategory values** — starting proposal, not a fixed spec. — not a fixed spec. They should be treated as a working taxonomy, refined during curation:
- Do the first 2–3 articles together and see what categories naturally emerge from the content
- Split, merge, or rename categories as needed (e.g. `accessibility` might split into `accessibility-contrast` and `accessibility-structure`; `gestalt` and `visual-hierarchy` might partially overlap)
- Lock the taxonomy after those first articles, before processing the remaining 12 — so you're not renaming across already-processed objects
- The **format** (field names and schema structure) stays fixed; the **values** are flexible until locked

### Knowledge object schema

```json
{
  "id": "kb-[category-abbreviation]-[zero-padded-number]",
  "type": "rule | principle",
  "category": "visual-hierarchy | typography | contrast-color | spacing-layout | accessibility | ux-usability | content-copy | responsive-mobile | navigation-ia | gestalt",
  "subcategory": "e.g. focal-point, touch-targets, f-pattern",
  "severity_if_violated": "critical | high | medium | low",
  "scope": "viewport | full-page | both",
  "rule": "Core rule or principle stated clearly. Present tense. Max 2 sentences.",
  "detail": "Why it matters and what it affects. 2–4 sentences. For rules: preserve exact numbers. For principles: explain the perceptual or behavioural reason.",
  "detection_signals": [
    "For rules: specific measurable signal (threshold, ratio, px value)",
    "For principles: evaluative cue to look for in a screenshot or DOM"
  ],
  "image_path": "kb/images/filename.png or null",
  "vector_embedding_text": "Self-contained 100–200 word paragraph: category + rule/principle + why + what to look for. No image references."
}
```

### Extraction method (AI-assisted, human approval)

1. Feed each MD file to Claude with the extraction prompt
2. Claude proposes extracted objects (rules + principles) for that article
3. User reviews each proposal: approve / reject / edit
4. Confirmed objects appended to `docs/Design_knowledgebase/knowledgebase.json`
5. Repeat for all 15 files

**Extraction rules:**
- One object per concept — split articles covering multiple distinct principles
- Rules must be visually detectable or DOM-measurable
- Principles must describe something that can be evaluated in a screenshot (not abstract philosophy)
- Discard anything too vague to evaluate — flag it for the user with a reason
- Numbers from sources are sacred — preserve exact px values, ratios, thresholds
- Deduplicate across articles (one canonical object per concept)
- Expected output: 60–120 objects

**Output file:** `docs/Design_knowledgebase/knowledgebase.json`

### Deterministic rules (dormant in `scan/deterministic.ts`)

Leave in place. Once the knowledge base is populated, do a manual pass to verify those thresholds are represented in the objects. Delete only after confirmed coverage.

---

## Phase 2: Reference Image Pipeline

**Goal:** Make the knowledge base reference images accessible to Gemini as visual calibration examples.

### Image types in the knowledge base

- **Local files** in `docs/Design_knowledgebase/`: AVIF, PNG, JPG (good-vs-bad comparison screenshots, design principle diagrams)
- **Online images** linked in the MD files: external URLs referenced inline

### One-time setup

1. Upload all local reference images to Supabase Storage: `aidqa` bucket, path `kb/images/`
2. For online image URLs in the MD files: download and store in the same location during the extraction phase
3. Update each knowledge object's `image_path` to the storage path

### Runtime: curated subset injection (Level 1)

True on-demand image retrieval requires Level 2 RAG. For Level 1, include a fixed curated set of the most illustrative comparison images in every Gemini call.

**How it works:**
- Maintain a `curated_images` list in `gemini.ts` — an array of `image_path` values for the 5–10 most impactful good-vs-bad comparison images (visual hierarchy, spacing, contrast, CTA clarity, etc.)
- At call time: fetch each image from Supabase Storage, encode as base64
- Inject as additional `inlineData` parts in the Gemini request, *before* the page screenshot
- Label each: `"REFERENCE EXAMPLE — [principle name]: [caption]"`

**Token cost estimate:**
- 5 reference images × ~800 tokens/image = ~4K tokens
- 10 reference images × ~800 tokens = ~8K tokens
- Acceptable, well within the 1M window

**Future (Level 2):** When the knowledge base is larger and retrieval is needed, store image paths in the vector DB metadata and fetch only images for the top-K retrieved knowledge objects.

---

## Phase 3: DOM Pre-processing

**Goal:** Serialize only the design-relevant subset of the DOM snapshot to include in the Gemini prompt.

**New utility:** `supabase/functions/aidqa-api/scan/domContext.ts` → `buildDomContext(domSnapshot): string`

**What to include:**
- `axeViolations` — all (already structured, real violations with impact + HTML snippets)
- Heading elements (`h1`–`h6`): tag, fontSize, fontWeight, color, textContent (truncated to 60 chars), boundingBox
- Interactive elements (`isInteractive: true`): tag, role, textContent, boundingBox + computed styles: `color`, `backgroundColor`, `fontSize`, `fontWeight`, `borderRadius`, `padding`, `width`, `height`
- Body/paragraph text (first 20 instances): `fontSize`, `lineHeight`, `color`, `textContent` (truncated)
- Mobile viewport (375px): same subset, labeled `[mobile]`

**What to strip:**
- Structural containers (`div`, `section`, `article`, `nav`, etc.) with no textContent and no interactive children
- CSS properties irrelevant to design QA: `overflow`, `position`, `display`, `zIndex`, `transform`, `transition`, etc.
- Elements outside the visible viewport (negative `y` or `x`)
- Deep nesting (`tagDepth > 8`)
- Raw class arrays (not useful without the stylesheet)

**Target output:** < 10K tokens for a typical page.

---

## Phase 4: System Prompt Restructure

**File:** `supabase/functions/aidqa-api/_lib/gemini.ts`, function `buildPrompt()`

**New prompt structure:**

```
[ROLE]
You are a senior product designer performing a design QA audit...

[DESIGN KNOWLEDGE]
Use the following design rules and principles when evaluating the page.
Rules (type: "rule") identify measurable violations.
Principles (type: "principle") guide holistic judgment.
<knowledge_objects> ... all knowledge objects as JSON array ... </knowledge_objects>

[REFERENCE EXAMPLES]
The following images illustrate good vs. bad implementations of key principles.
Use them to calibrate your judgments.
<image: REFERENCE EXAMPLE — Visual Hierarchy: poor vs good>
<image: REFERENCE EXAMPLE — CTA prominence: weak vs strong>
... (curated set, 5-10 images)

[DOM DATA]  (omitted for screenshot-only scans)
Computed design properties from the page (1440px desktop + 375px mobile):
<dom_context> ... pre-processed DOM text ... </dom_context>

[PAGE SCREENSHOT]
<image: the page being audited>

[OUTPUT REQUIREMENTS]
... (existing: evidence types, max 7 findings, severity thresholds, JSON format, etc.)
```

**Changes to `callGeminiVision()` signature:**
```typescript
callGeminiVision(imageSignedUrl: string, domSnapshot?: DomSnapshot): Promise<Finding[]>
```
- `domSnapshot` optional — screenshot-only scans skip it
- `buildPrompt()` calls `buildDomContext()` and injects it

**Knowledge injection strategy (Level 1 — start here):**
- Inject all knowledge objects as text (~50–80K tokens for 60–120 objects)
- Total context estimate: knowledge objects (~70K) + DOM (~10K) + reference images (~5K) + page screenshot (~2K) + prompt overhead (~2K) = ~89K tokens — well within Gemini's 1M window
- If token costs become a concern: filter to highest-severity objects first

---

## Phase 5: Wire DOM Data into the Pipeline

**File:** `supabase/functions/aidqa-api/scan/handlers.ts`

In `processScan()`, after loading the DOM snapshot from storage:
1. Parse `dom-snapshot.json`
2. Pass to `callGeminiVision(imageUrl, domSnapshot)`
3. No changes to finding storage schema or scoring

---

## Phase 6: Level 2 RAG (future — not building now)

When the knowledge base grows and per-call token cost becomes a concern:
- Use **pgvector** (already available in Supabase Postgres) — no new infrastructure
- Embed `vector_embedding_text` per object using `text-embedding-004`
- At runtime: retrieve top-K relevant objects based on initial screenshot/DOM summary
- For images: retrieve only the images associated with the top-K objects
- The schema works for both Level 1 and Level 2 — no restructuring needed

---

## Build Order

1. **Extract knowledge objects** — AI-assisted extraction, human approval per article, output `knowledgebase.json`
2. **Image setup** — upload reference images to Supabase Storage, update knowledge objects with `image_path`
3. **Curate reference image list** — select 5–10 best good-vs-bad comparison images for static injection
4. **Build `domContext.ts`** — `buildDomContext()` utility
5. **Update `buildPrompt()`** — inject knowledge objects + reference images + DOM context
6. **Update `callGeminiVision()`** — accept optional `domSnapshot`, wire through pipeline
7. **Test end-to-end** — run URL scans, compare finding quality before/after

---

## What NOT to build in this phase

- Dynamic image retrieval per-query (needs Level 2 RAG first)
- Vector DB retrieval pipeline (Level 1 fits the context window)
- Base64 images embedded *inside* knowledge object JSON (store separately in Supabase Storage)
- New UI for knowledge management
- Changes to findings table schema
- Removal of deterministic rules (keep dormant)

---

## Verification

1. Run URL scans against known-bad UIs — compare finding quality vs. current output
2. Check DOM-derived facts appear in findings (e.g. actual contrast ratio from hex values in computed styles)
3. Check principle-based categories (Gestalt, typography rhythm, UX writing) now produce findings where they previously didn't
4. Log `usageMetadata` from Gemini responses — verify token usage stays within budget
5. Screenshot-only scan: DOM context absent gracefully, reference images still included
