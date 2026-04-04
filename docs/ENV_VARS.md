# AIDQA Environment Variables

> Last updated: 2026-04-02
> Scope: All environment variables required to run the system

---

## Edge Function Secrets

Set in Supabase dashboard → Settings → Edge Functions → Secrets.
Also settable via CLI: `npx supabase secrets set KEY=value`

| Variable | Required | Notes |
|---|---|---|
| `SUPABASE_URL` | Yes | `https://eboaqtbktyaxzrbcntzy.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | From Supabase dashboard → Settings → API |
| `GEMINI_API_KEY` | Yes | Google AI Studio — used for vision analysis and repair guidance |
| `GEMINI_MODEL` | No | Default: `gemini-2.0-flash` |
| `BROWSERLESS_API_KEY` | Yes | Browserless dashboard |
| `BROWSERLESS_URL` | Yes | e.g. `https://chrome.browserless.io` |

Check currently set secrets:
```bash
npx supabase secrets list
```

---

## Vercel Frontend — `apps/app/` (app.aidesignqa.com)

Set in Vercel dashboard → Project → Settings → Environment Variables, or via:
```bash
vercel env add VARIABLE_NAME production --cwd apps/app
```

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://eboaqtbktyaxzrbcntzy.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | From Supabase dashboard → Settings → API |
| `VITE_API_BASE_URL` | `https://eboaqtbktyaxzrbcntzy.supabase.co/functions/v1/aidqa-api` |

---

## Vercel Frontend — `apps/landing/` (aidesignqa.com + lp.aidesignqa.com)

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://eboaqtbktyaxzrbcntzy.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase dashboard → Settings → API (server-side only — admin dashboard) |
| `ADMIN_PASSWORD` | Hashed password for `/admin/login` — stored in `.env.local`, never commit plaintext |

---

## Local Development

Pull current env vars from Vercel:
```bash
vercel env pull .env.local --cwd apps/app
vercel env pull .env.local --cwd apps/landing
```

The `.env.local` files are gitignored. Never commit them.
