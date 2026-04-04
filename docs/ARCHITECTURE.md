# AIDQA Architecture

> Last updated: 2026-04-02
> Scope: Tech stack, repository structure, deployment topology

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite + TypeScript + shadcn/ui + Tailwind CSS |
| Backend | Supabase Edge Functions (Deno runtime) |
| Database | Supabase Postgres |
| Storage | Supabase Storage (bucket: `aidqa`) |
| Auth | Supabase Auth — email/password + Google OAuth |
| Headless render | Browserless REST API |
| AI analysis | Google Gemini Vision (Google AI Studio) |
| Queue | `EdgeRuntime.waitUntil` for MVP; pgmq upgrade path available |
| Hosting | Vercel (frontend) |

---

## Deployment Topology

The project has **two Vercel deployments** serving three domains:

| Domain | Deployment | Purpose |
|---|---|---|
| `app.aidesignqa.com` | `apps/app/` (React/Vite SPA) | The product — auth-gated, scan/results UI |
| `aidesignqa.com` | `apps/landing/` (Next.js) | Homepage — stable, broad audience, SEO-optimised |
| `lp.aidesignqa.com` | `apps/landing/` (Next.js) | Marketing funnel LP — evolving, sent to prospects |

The `apps/landing/` Next.js app serves both `aidesignqa.com` and `lp.aidesignqa.com` from a single Vercel project. Routing is handled by `apps/landing/src/middleware.ts`: requests from `lp.*` are internally rewritten to `/lp`, so the URL stays clean.

### Homepage vs LP — intentional distinction

- **Homepage** (`/`) uses `components/marketing/` — stable brand page, not frequently changed.
- **LP** (`/lp`) uses `components/lp/` — actively experimented on (different pricing, hero copy, CTAs). Sent in cold outreach and campaigns.
- The two component trees start similar and are expected to diverge. Duplication between `marketing/` and `lp/` is intentional.

---

## Repository Structure

```
/
├── apps/
│   ├── app/                      # React/Vite SPA (app.aidesignqa.com)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── ScanInput.tsx         # Upload or URL entry
│   │   │   │   ├── ScanResult.tsx        # Score + findings + overlay viewer
│   │   │   │   ├── ScanHistory.tsx       # Past scans list
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Signup.tsx
│   │   │   ├── components/
│   │   │   │   ├── NavBar.tsx
│   │   │   │   ├── DesignPreview.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── lib/
│   │   │   │   ├── supabaseClient.ts
│   │   │   │   ├── auth.ts               # getAuthHeaders()
│   │   │   │   └── apiBase.ts
│   │   │   └── main.tsx
│   │   ├── vercel.json
│   │   └── vite.config.ts
│   └── landing/                  # Next.js marketing site (aidesignqa.com + lp.aidesignqa.com)
│       ├── src/
│       │   ├── app/              # Next.js App Router pages
│       │   ├── components/
│       │   │   ├── marketing/    # Homepage components (stable)
│       │   │   └── lp/           # LP components (actively iterated)
│       │   └── middleware.ts     # Routes lp.* → /lp internally
│       └── vercel.json
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
│   │       │   ├── gemini.ts     # Gemini API call (vision + repair guidance)
│   │       │   ├── embedding.ts  # Vector embedding helpers
│   │       │   └── rag.ts        # RAG retrieval for repair guidance
│   │       └── scan/
│   │           ├── handlers.ts   # HTTP handlers
│   │           ├── capture.ts    # Browserless screenshot + DOM
│   │           ├── normalize.ts  # Image resize pipeline
│   │           ├── deterministic.ts  # Rule engine
│   │           └── score.ts      # Scoring logic
│   └── migrations/               # Append-only, timestamped
│       ├── 20260314000100_create_scans.sql
│       ├── 20260314000200_create_findings.sql
│       ├── 20260314000300_rls_policies.sql
│       ├── 20260314000400_storage_policies.sql
│       └── ...
└── package.json                  # Root (workspace tooling only)
```
