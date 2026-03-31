# Agent Behavior Rules

## Planning Phase (Required Before Multi-File Changes)
Before making changes spanning 2+ files, provide:
1. **Goal**: What problem are we solving?
2. **Acceptance Criteria**: How do we know it works?
3. **Files to Modify**: Full paths + reason for each
4. **Risks**: Breaking changes, dependency impacts, migration needs

**Wait for explicit "GO" from user before proceeding.**

## Execution Phase
- **Smallest safe diff**: Change only what's necessary to meet acceptance criteria
- **No refactors**: Unless explicitly requested ("refactor X to use Y pattern")
- **No optimizations**: Unless explicitly requested or fixing a bug
- **No cosmetic changes**: Formatting, renaming, reordering unless part of the task

## Verification Phase
- **Never claim**: "Tests passed", "File created", "Server started"
- **Always provide**: Commands to verify (`npm test`, `ls -la .github/`)
- **Show diffs**: When unclear if change worked, show `git diff` command

## Communication
- Be concise: State what you're doing, show the code, move on
- No preambles: Skip "Let me...", "I'll now...", "First, we should..."
- Actionable feedback: "Run `npm test` to verify" not "This should work"

## Error Handling
- If a tool fails, show the error verbatim
- Propose fix OR ask for clarification (never guess silently)
- When stuck after 2 attempts, stop and ask user for input

---

## Pre-Production Checklist

Run these checks after every code change, before every commit.

### 1. TypeScript — Vite app
```bash
npx tsc --noEmit
```
Must produce **no output**. Any output = fix before committing.

### 2. TypeScript — Landing (Next.js)
```bash
cd landing && npx tsc --noEmit
```
Must produce **no output**.

### 3. Build — Vite app
```bash
npm run build
```
Must complete without errors. The bundle size warning (`>500 kB`) is pre-existing — acceptable until code-splitting is addressed. Any new error = fix before pushing.

### 4. ESLint
```bash
npx eslint "src/" --ignore-pattern "src/components/ui/**" --max-warnings=0
```
Must produce **0 errors, 0 warnings**. `src/components/ui/` is excluded — it is auto-generated shadcn code with pre-existing `react-refresh` warnings that must not be modified.

### 5. Tests
```bash
npm run test -- --run
```
All 40 tests must pass. No new failures.

### 6. Deploy via Vercel only
**Never** manually copy files or trigger deployments outside of Vercel.
Commit → push to `main` → Vercel auto-deploys both the Vite app (`app.aidesignqa.com`) and the landing site (`aidesignqa.com`).

Landing deploys from the `landing/` subdirectory via its own Vercel project (`prj_ozaUqs...`).

### 7. Edge Function deploy (when supabase/functions/ changed)
```bash
npx supabase@latest functions deploy aidqa-api --no-verify-jwt
```
Must complete without errors. Requires `SUPABASE_ACCESS_TOKEN` in env or active `supabase login` session.
