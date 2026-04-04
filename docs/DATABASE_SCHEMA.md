# AIDQA Database Schema

> Last updated: 2026-04-02
> Scope: Table definitions, RLS policies, storage policies

---

## Table: `scans`

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

---

## Table: `findings`

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
  evidence          JSONB NOT NULL,
  why_it_matters    TEXT NOT NULL,
  repair_guidance   TEXT NOT NULL,
  ai_fix_instruction TEXT NOT NULL,
  metric_value      TEXT,
  score_impact      INTEGER,
  source            TEXT NOT NULL
                    CHECK (source IN ('deterministic', 'ai')),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## RLS Policies

```sql
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_scans" ON scans USING (user_id = auth.uid()::text);

ALTER TABLE findings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_findings" ON findings USING (user_id = auth.uid()::text);
```

---

## Storage Policies

Bucket name: `aidqa`

```sql
CREATE POLICY "user_storage_access" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'aidqa' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'aidqa' AND (storage.foldername(name))[1] = auth.uid()::text);
```

Storage path convention: `{userId}/scans/{scanId}/{filename}`

---

## Migrations

All migrations live in `supabase/migrations/` and are append-only. Never edit an existing `.sql` file — always create a new timestamped migration.

Naming convention: `YYYYMMDDHHMMSS_description.sql`
