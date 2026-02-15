-- Add AI status tracking to visual_runs table
-- This allows runs to succeed even if OpenAI fails or API key is missing

ALTER TABLE public.visual_runs
ADD COLUMN ai_status text NOT NULL DEFAULT 'skipped';

ALTER TABLE public.visual_runs
ADD COLUMN ai_error text NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.visual_runs.ai_status IS 'AI analysis status: skipped | pending | completed | failed';
COMMENT ON COLUMN public.visual_runs.ai_error IS 'Error message if AI analysis failed';
