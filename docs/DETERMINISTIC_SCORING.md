# AIDQA Deterministic Scoring

> Last updated: 2026-04-01
> Scope: Rule engine, scoring algorithm, evidence types, and how to extend the system
> Source files: `supabase/functions/aidqa-api/scan/deterministic.ts`, `scan/score.ts`, `scan/handlers.ts`

The deterministic engine is the first analysis pass on every URL scan. It runs 15 rule checkers against a DOM snapshot, produces structured findings, and feeds them into the scoring algorithm — all without an AI call. It is fast, predictable, and free to run.

---

## Where It Fits in the Pipeline

```
POST /v1/scans
  → Phase 1: Capture — screenshot + DOM snapshot + normalize
  → Phase 2: Deterministic — runAllChecks(dom1440, axeViolations, dom375, designSystemConfig)
  → Phase 3: AI Vision — callGeminiVision(image, deterministicFindings)
  → Phase 4: Merge + Score — mergeAndPrioritize() → calculateScore() → generateOverlay()
  → Phase 5: Persist — INSERT findings → UPDATE scans SET status='completed'
```

**Screenshot upload path:** Phases 1 DOM capture and Phase 2 are both skipped. `det_status` is set to `skipped`. Only Gemini Vision runs. Findings are fewer and less precise — disclosed in the UI.

---

## Rule Catalogue

All rules live in `supabase/functions/aidqa-api/scan/deterministic.ts`.

| Rule function | Category | Severity | What it checks | Evidence type | Threshold |
|---|---|---|---|---|---|
| `checkContrast` | accessibility | critical | WCAG AA contrast ratio between text and background | metric | < 4.5:1 normal text / < 3:1 large text |
| `checkTouchTargets` | accessibility | high | Interactive element size on desktop viewport | bbox | < 44 × 44 px |
| `checkSpacingRhythm` | layout | medium | Consistency of vertical/horizontal gaps between elements | multi_bbox | > 3 distinct gap values |
| `checkButtonDrift` | consistency | medium | Variance in button border-radius and height | multi_bbox | > 2 distinct button styles |
| `checkHeadingScale` | hierarchy | medium | h1 font size relative to body text | metric | h1 < 1.5× body size |
| `checkSpacingTokens` | design_system | medium | Alignment of spacing values to 4px grid (or custom scale) | metric | > 30% of values off-grid |
| `checkTypographyScale` | design_system | low | Number of distinct font sizes in use | metric | > 4 distinct sizes |
| `checkLineHeight` | accessibility | medium | WCAG 1.4.12 text spacing compliance | metric | line-height < 1.5× font size |
| `checkColorDiversity` | consistency | medium | Number of distinct text colours in use | metric | > 5 distinct colours |
| `checkHeadingOrder` | hierarchy | medium | Semantic heading level sequence (no skips) | explanation | any h1→h3 or h2→h4 skip |
| `checkSmallText` | accessibility | high | Minimum readable text size on desktop | bbox | < 12 px |
| `checkFontWeightDiscipline` | design_system | low | Number of distinct font weights in use | metric | > 4 distinct weights |
| `convertAxeToFindings` | accessibility | varies | axe-core automated accessibility violations | explanation | any violation reported by axe |
| `checkMobileOverflow` | layout | medium | Fixed-width elements causing horizontal overflow at 375 px | region | overflow detected |
| `checkMobileTouchTargets` | accessibility | high | Interactive element size on mobile viewport (375 px) | bbox | < 44 × 44 px |
| `checkMobileFontSize` | accessibility | medium | Readable text size on mobile viewport | bbox | < 14 px |

### `runAllChecks()` — main export

Orchestrates all checks, merges results, deduplicates by title, and sorts by severity before returning. Signature:

```typescript
runAllChecks(
  dom1440: DomElement[],          // DOM snapshot at 1440px viewport
  axeViolations?: AxeViolation[], // axe-core output (optional)
  dom375?: DomElement[],          // DOM snapshot at 375px viewport (optional)
  config?: DesignSystemConfig     // custom design tokens (optional)
): Finding[]
```

---

## Scoring Algorithm

Scoring lives in `supabase/functions/aidqa-api/scan/score.ts`.

### Weights

```
critical  →  −20 pts
high      →  −12 pts
medium    →   −7 pts
low       →   −3 pts
```

### `calculateScore(findings)`

```
1. Start at 100
2. For each finding:
   - Dedup key: `category:title` — only one deduction per unique rule per category
   - Deterministic source: apply full weight
   - AI source: critical/high → 40% of weight; medium/low → 0 (no impact)
3. Floor at 0 (score never goes negative)
4. Category scores: 100 − sum(deductions for that category)
```

Returns `{ overall: number, categoryScores: CategoryScores }`.

### `mergeAndPrioritize(deterministic, ai)`

```
1. Combine both arrays
2. Deduplicate: first 40 chars of title, case-insensitive
3. Sort by severity (critical → high → medium → low)
4. Return top 7 findings
```

---

## Evidence Types

Each finding carries structured evidence to drive the overlay renderer in `ScanResult.tsx`.

| Type | Shape | Used for |
|---|---|---|
| `bbox` | `{ x, y, w, h }` | Single element highlight (touch targets, small text) |
| `multi_bbox` | `{ boxes: Array<{ x, y, w, h }> }` | Multiple elements for comparison (button drift, spacing) |
| `region` | `{ top, left, width, height }` | Page-level region (mobile overflow) |
| `metric` | `{ value, unit, threshold }` | Numeric measurement (contrast ratio, font size counts) |
| `explanation` | `{ text }` | Text-only, no coordinates (heading order, axe violations) |

---

## Design System Config

Pass a `DesignSystemConfig` to `runAllChecks` to validate against custom tokens instead of defaults.

```typescript
interface DesignSystemConfig {
  colors: string[]    // hex values — used by checkColorDiversity
  spacing: number[]   // px values — used by checkSpacingTokens instead of 4px grid
}
```

Sent from the frontend as `design_system_config` in the scan POST body.

---

## How to Add a New Rule

1. **Write the check function** in `deterministic.ts` — return `Finding[]`

```typescript
function checkMyNewRule(elements: DomElement[]): Finding[] {
  const findings: Finding[] = []
  // ... your logic
  findings.push({
    category: 'layout',            // pick from types.ts
    severity: 'medium',
    title: 'My rule title',
    evidence_type: 'metric',
    evidence: { value: '42', unit: 'px', threshold: '16px' },
    why_it_matters: 'One sentence — user impact.',
    repair_guidance: 'Concrete fix instruction.',
    ai_fix_instruction: 'Prompt-ready instruction for AI builders.',
    source: 'deterministic',
  })
  return findings
}
```

2. **Call it inside `runAllChecks()`** — add to the existing list of calls

```typescript
const myResults = checkMyNewRule(dom1440)
all.push(...myResults)
```

3. **No changes needed to `score.ts`** — weights are applied automatically by severity.

4. **No changes needed to `handlers.ts`** — `runAllChecks` output flows through the pipeline automatically.

---

## Known Limitations

- **Transparent backgrounds:** `checkContrast` skips elements with transparent backgrounds (`bg[3] < 0.1`). Text on modal overlays or layered navbars may produce false negatives.
- **`checkHeadingScale` body baseline:** Uses the first `p` or `span` in DOM order as the body size reference. On pages where the first text element is a nav label or disclaimer, the baseline may be skewed.
- **`checkSpacingRhythm` on small pages:** Uses statistical mode of raw pixel gap values. Pages with fewer than ~10 elements may produce unstable results.
- **Screenshot path:** No deterministic findings — axe-core and DOM checks require a DOM snapshot, which is only available on URL scans.
