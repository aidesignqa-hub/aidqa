AIDQA Infrastructure Overview

Domains
app.aidesignqa.com  → Vite SaaS application (apps/app/) — Vercel deployment #1
aidesignqa.com      → Homepage, stable brand page (apps/landing/) — Vercel deployment #2
lp.aidesignqa.com   → Marketing funnel LP, actively iterated (apps/landing/) — same deployment as above

Hosting
Both deployments are on Vercel.
The apps/landing/ Next.js app serves both aidesignqa.com and lp.aidesignqa.com.
Domain routing is handled by apps/landing/src/middleware.ts — lp.* requests are internally rewritten to /lp.

Purpose
This document prevents future contributors from accidentally restructuring the repository.
<!-- test -->