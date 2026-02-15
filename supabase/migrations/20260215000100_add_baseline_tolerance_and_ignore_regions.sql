-- Add tolerance threshold and ignore regions to baselines
-- Supports per-baseline diff thresholds and region masking to reduce false positives

ALTER TABLE public.visual_baselines
ADD COLUMN diff_threshold_pct numeric NOT NULL DEFAULT 0.2;

ALTER TABLE public.visual_baselines
ADD COLUMN ignore_regions jsonb NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.visual_baselines
ADD COLUMN capture_settings jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Add comments for documentation
COMMENT ON COLUMN public.visual_baselines.diff_threshold_pct IS 'Percentage threshold (e.g., 0.2 = 0.2%) below which differences are considered PASS';
COMMENT ON COLUMN public.visual_baselines.ignore_regions IS 'Array of regions to ignore during comparison: [{x, y, width, height}]';
COMMENT ON COLUMN public.visual_baselines.capture_settings IS 'Additional capture settings (for future use)';
