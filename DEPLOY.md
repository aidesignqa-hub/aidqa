# Vercel Deployment — Two Projects, One Repo

## Project 1: AIDQA App (SaaS)
- **Vercel Project Name:** aidqa-app
- **GitHub Repo:** this repo
- **Root Directory:** `.` (repo root)
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Domain:** app.aidesignqa.com
- **Environment variables:** copy all from .env.example

## Project 2: AIDQA Marketing (Next.js)
- **Vercel Project Name:** aidqa-marketing
- **GitHub Repo:** this repo
- **Root Directory:** `landing`
- **Framework:** Next.js (auto-detected)
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Domains:**
  - aidesignqa.com (primary)
  - www.aidesignqa.com → redirect to aidesignqa.com
  - lp.aidesignqa.com

## Steps to deploy

### First-time setup

1. Go to vercel.com → Add New Project
2. Import the GitHub repo
3. For Project 1:
   - Set Root Directory to `.`
   - Add all env vars from .env.example
   - Deploy
   - In project Settings → Domains, add `app.aidesignqa.com`
4. Go to vercel.com → Add New Project again (same repo)
5. For Project 2:
   - Set Root Directory to `landing`
   - Deploy
   - In project Settings → Domains:
     - Add `aidesignqa.com`
     - Add `www.aidesignqa.com` (accept redirect to apex)
     - Add `lp.aidesignqa.com`

### Subsequent deploys
Every push to `main` triggers both projects automatically. Vercel detects
which files changed and only rebuilds what's needed.

## Supabase Auth (for Project 1 only)
- Site URL: `https://app.aidesignqa.com`
- Allowed Redirect URLs: `https://app.aidesignqa.com/**`
- Update these in: Supabase Dashboard → Authentication → URL Configuration

## Cron Jobs
The existing cron config in `./vercel.json` stays with Project 1.
No changes needed to `api/cron-tick.ts`.
