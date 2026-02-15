-- Add scheduled jobs table for automated baseline runs
-- Enables monitoring platform behavior over time

CREATE TABLE public.visual_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id text NOT NULL,
  baseline_id uuid NOT NULL REFERENCES public.visual_baselines(id) ON DELETE CASCADE,
  cadence text NOT NULL,
  next_run_at timestamptz NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for efficient job scheduling queries
CREATE INDEX idx_visual_jobs_enabled_next_run 
  ON public.visual_jobs(enabled, next_run_at) 
  WHERE enabled = true;

-- Add comments for documentation
COMMENT ON TABLE public.visual_jobs IS 'Scheduled jobs for automated visual regression testing';
COMMENT ON COLUMN public.visual_jobs.cadence IS 'Schedule frequency: daily, hourly, or cron expression';
COMMENT ON COLUMN public.visual_jobs.next_run_at IS 'Next scheduled execution time';
