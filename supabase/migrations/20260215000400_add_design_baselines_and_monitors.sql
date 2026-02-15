-- Add design_baselines table for approved design snapshots
CREATE TABLE design_baselines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT NOT NULL,
  name TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('url', 'figma', 'upload')),
  snapshot_path TEXT NOT NULL,
  viewport JSONB NOT NULL DEFAULT '{"width": 1440, "height": 900}',
  approved BOOLEAN NOT NULL DEFAULT false,
  approved_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for querying baselines by project
CREATE INDEX idx_design_baselines_project_id ON design_baselines(project_id);

-- Add monitors table for continuous monitoring jobs
CREATE TABLE monitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT NOT NULL,
  baseline_id UUID NOT NULL REFERENCES design_baselines(id) ON DELETE CASCADE,
  target_url TEXT NOT NULL,
  cadence TEXT NOT NULL DEFAULT 'daily',
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for querying monitors by baseline
CREATE INDEX idx_monitors_baseline_id ON monitors(baseline_id);

-- Index for querying enabled monitors (used by cron jobs)
CREATE INDEX idx_monitors_enabled ON monitors(enabled);

-- Index for querying monitors by project
CREATE INDEX idx_monitors_project_id ON monitors(project_id);
