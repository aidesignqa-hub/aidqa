-- Add mobile scan artifact columns to scans table
ALTER TABLE scans ADD COLUMN IF NOT EXISTS mobile_normalized_path TEXT;
ALTER TABLE scans ADD COLUMN IF NOT EXISTS mobile_overlay_path TEXT;
ALTER TABLE scans ADD COLUMN IF NOT EXISTS mobile_dom_path TEXT;

-- Add viewport tag to findings (defaults to 'desktop' for all existing rows)
ALTER TABLE findings ADD COLUMN IF NOT EXISTS viewport TEXT NOT NULL DEFAULT 'desktop'
  CHECK (viewport IN ('desktop', 'mobile'));
