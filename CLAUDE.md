# AIDQA — Agent Instructions

> Authoritative instructions for AI agents working on this codebase.
> Update when architecture changes or new rules are established.
> Last audited: 2026-04-02

---

## What This Product Is

AIDQA is a design QA tool for AI-generated UI. A user submits a URL or screenshot. The system inspects the interface for measurable design quality issues — layout incoherence, weak hierarchy, inconsistency, accessibility failures, design-system drift — and returns 3–7 prioritized findings with evidence regions, plain-English explanations, repair guidance, and AI-ready fix instructions.

**Core user:** indie hackers and startup teams shipping UI fast with AI builders (v0, Lovable, Cursor) who can tell the output feels off but cannot diagnose why.

---

## Deployment Map

| Domain | Project | Purpose |
|---|---|---|
| `app.aidesignqa.com` | `apps/app/` (React/Vite SPA) | The product — auth-gated scan/results UI |
| `aidesignqa.com` | `apps/landing/` (Next.js) | Homepage — stable, SEO-optimised |
| `lp.aidesignqa.com` | `apps/landing/` (Next.js) | Marketing LP — actively iterated |

`apps/landing/` serves both domains from one Vercel project. `lp.*` requests are rewritten to `/lp` by `apps/landing/src/middleware.ts`. Duplication between `components/marketing/` and `components/lp/` is **intentional** — these trees are expected to diverge.

Full architecture details: `docs/ARCHITECTURE.md`

---

## Guiding Principles

1. **URL scan is the core path.** Screenshot upload is a deliberate fallback with lower quality output.
2. **Findings lead, score follows.** Findings are the hero element. Score is a compact secondary signal. Never lead with the number in the UI.
3. **Deterministic first, AI second.** Gemini receives deterministic finding titles and must not repeat them.
4. **Evidence must match the finding.** Spacing → `multi_bbox`. Contrast → `metric`. Hierarchy → `region` or `explanation`.
5. **`EdgeRuntime.waitUntil` for all async work.** Never fire a floating promise. Always update the scan row on failure.
6. **SSRF guard on every user URL.** Call `isUrlSafe()` before passing any URL to Browserless. No exceptions.
7. **Service role on backend, anon key on frontend.** Never cross these.
8. **Signed URLs only.** Generate on demand. Store only storage paths in the database.
9. **RLS on every table.** `user_id = auth.uid()`. Never trust a `user_id` in the request body.
10. **Migrations are append-only.** Never edit an existing `.sql` file. Always create a new timestamped migration.
11. **Always deploy edge functions with `--no-verify-jwt`.** Run `npm run supabase:deploy` (never `supabase functions deploy aidqa-api` bare). Supabase's gateway-level JWT verification silently re-enables after every deploy and rejects ES256 tokens before the request reaches the function. Without this flag, all authenticated routes return 401.

---

## What NOT to Build

- Baseline comparison / pixel diff — wrong product
- Monitor scheduling / cron — wrong product
- Figma import — post-MVP
- Team workspaces / collaboration — post-MVP
- Webhooks / alerting — post-MVP

---

## Agent Behavior Rules

### Planning Phase (Required Before Multi-File Changes)

Before making changes spanning 2+ files, provide:
1. **Goal** — what problem are we solving?
2. **Acceptance Criteria** — how do we know it works?
3. **Files to Modify** — full paths + reason for each
4. **Risks** — breaking changes, dependency impacts, migration needs

**Wait for explicit "GO" from the user before proceeding.**

### Execution Phase

- **Smallest safe diff** — change only what's necessary to meet acceptance criteria
- **No refactors** — unless explicitly requested
- **No optimizations** — unless explicitly requested or fixing a bug
- **No cosmetic changes** — no formatting, renaming, or reordering unless part of the task

### Verification Phase

- **Never claim** "tests passed", "file created", "server started"
- **Always provide** commands to verify (`npm test`, `ls -la .github/`)
- **Show diffs** when unclear if a change worked: provide `git diff` command

### Communication

- Be concise: state what you're doing, show the code, move on
- No preambles: skip "Let me...", "I'll now...", "First, we should..."
- Actionable feedback: "Run `npm test` to verify" not "this should work"

### Error Handling

- Show tool errors verbatim
- Propose fix OR ask for clarification — never guess silently
- When stuck after 2 attempts, stop and ask the user for input

---

## Pre-Production Checklist

Run after every code change, before every commit.

### 1. TypeScript — Vite app
```bash
cd apps/app && npx tsc --noEmit
```
Must produce **no output**.

### 2. TypeScript — Landing (Next.js)
```bash
cd apps/landing && npx tsc --noEmit
```
Must produce **no output**.

### 3. Build — Vite app
```bash
cd apps/app && npm run build
```
Must complete without errors. The `>500 kB` bundle size warning is pre-existing — acceptable until code-splitting is addressed.

### 4. ESLint
```bash
cd apps/app && npx eslint "src/" --ignore-pattern "src/components/ui/**" --max-warnings=0
```
Must produce **0 errors, 0 warnings**. `src/components/ui/` is excluded — auto-generated shadcn code, do not modify.

### 5. Tests
```bash
cd apps/app && npm run test -- --run
```
All 40 tests must pass. No new failures.

### 6. Deploy via Vercel only
Never manually copy files or trigger deployments outside of Vercel. Commit → push to `main` → Vercel auto-deploys both projects.

### 7. Edge Function deploy (when `supabase/functions/` changed)
```bash
npm run supabase:deploy
```
This runs `npx supabase functions deploy aidqa-api --no-verify-jwt`. Must complete without errors. Requires active `supabase login` session linked to the `eboaqtbktyaxzrbcntzy` project.

---

## Reference Docs

| Topic | File |
|---|---|
| Tech stack, repo structure, deployment details | `docs/ARCHITECTURE.md` |
| Database schema, RLS, storage policies | `docs/DATABASE_SCHEMA.md` |
| API contract, endpoints, polling | `docs/API.md` |
| Processing pipeline, Gemini Vision, auth patterns | `docs/PIPELINE.md` |
| Environment variables | `docs/ENV_VARS.md` |
| Deterministic rule engine, scoring algorithm | `docs/DETERMINISTIC_SCORING.md` |
| Open code review issues | `docs/CODE_REVIEW.md` |
