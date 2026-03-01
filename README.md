# AIDQA — AI Visual Regression System

## Overview

AIDQA is a production-grade visual regression system that:

- Captures live screenshots via remote browser
- Stores versioned baselines in Supabase
- Computes pixel-level diffs
- Uses GPT-4o Vision for AI-assisted change classification
- Runs fully serverless via Supabase Edge Functions

Built for automated UI drift detection in fast-moving frontend environments.

---

## Core Features

- Automated screenshot capture (remote browser via WebSocket)
- Versioned baseline storage
- Pixel-perfect PNG diff generation
- AI-assisted change classification (structured JSON output)
- Signed artifact URLs (private storage)
- SSRF protection and rate limiting
- Health check endpoint
- Production-ready Supabase + Vercel deployment

---

## Architecture

### Flow

1. Capture screenshot (Browserless)
2. Store baseline in Supabase Storage
3. Capture current screenshot
4. Compute PNG diff
5. Store artifacts + metadata
6. Run AI classification (optional)
7. Return structured result

### Components

**Frontend**
- React 18
- TypeScript
- TanStack Query
- shadcn/ui
- Vercel deployment

**Backend**
- Deno (Supabase Edge Functions)
- Supabase Postgres
- Supabase Storage (private bucket)
- Remote browser via Browserless WebSocket
- OpenAI GPT-4o Vision

**Security**
- Row Level Security (RLS)
- Service role key server-side only
- SSRF protection (blocks localhost/private IP ranges)
- Per-IP rate limiting
- Signed URLs with expiration

---

## Folder Structure

AIDQA/
├── src/                    # Frontend (React + Vite)
│   ├── components/
│   ├── lib/
│   └── pages/
│
├── supabase/
│   ├── functions/
│   │   └── visual-api/
│   │       ├── index.ts
│   │       ├── _lib/
│   │       └── visual/
│   └── sql/
│       └── 001_init.sql
│
├── .env.example
└── README.md

---

## API Reference

Base URL:

https://<project-ref>.supabase.co/functions/v1/visual-api

### Health

GET /health

### Create Baseline

POST /api/v1/visual/baselines

{
  "projectId": "demo",
  "name": "Homepage",
  "url": "https://example.com",
  "viewport": { "width": 1440, "height": 900 }
}

### Create Run

POST /api/v1/visual/baselines/{baselineId}/runs

### Get Run

GET /api/v1/visual/baselines/{baselineId}/runs/{runId}

Response includes:
- mismatchPercentage
- diffPixels
- Signed URLs for baseline/current/diff images
- aiJson (if AI enabled)

---

## Deployment

### Supabase

supabase link --project-ref <project-ref>  
supabase db push  
supabase functions deploy visual-api  

Set required secrets:

- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- STORAGE_BUCKET
- BROWSERLESS_WS_ENDPOINT
- OPENAI_API_KEY (optional)
- AI_ENABLED=true

### Frontend (Vercel)

Set environment variable:

VITE_API_BASE_URL=https://<project-ref>.supabase.co/functions/v1/visual-api

Deploy via Vercel CLI or GitHub integration.

---

## Environment Variables

Required (Edge Function):
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- STORAGE_BUCKET
- BROWSERLESS_WS_ENDPOINT

Optional:
- OPENAI_API_KEY
- AI_ENABLED
- ALLOWED_ORIGINS
- RATE_LIMIT_PER_MINUTE

---

## Status

Core capture, diff, AI classification, and artifact storage are operational.

Currently optimizing throughput and scaling strategy.

---

## License

MIT