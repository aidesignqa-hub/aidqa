-- Add baseline_sources table for URL/Storybook/Figma abstraction
CREATE TABLE baseline_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('url', 'storybook', 'figma_frame')),
  name TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}',
  viewport JSONB NOT NULL DEFAULT '{"width": 1280, "height": 720}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for querying sources by project
CREATE INDEX idx_baseline_sources_project_id ON baseline_sources(project_id);

-- Add source_id to visual_baselines
ALTER TABLE visual_baselines ADD COLUMN source_id UUID REFERENCES baseline_sources(id);

-- Backfill: Create URL sources for existing baselines
DO $$
DECLARE
  baseline_row RECORD;
  new_source_id UUID;
BEGIN
  FOR baseline_row IN 
    SELECT id, project_id, url, viewport, name
    FROM visual_baselines
    WHERE url IS NOT NULL AND source_id IS NULL
  LOOP
    -- Create a URL source for this baseline
    INSERT INTO baseline_sources (project_id, type, name, config, viewport)
    VALUES (
      baseline_row.project_id,
      'url',
      baseline_row.name,
      jsonb_build_object('url', baseline_row.url),
      COALESCE(baseline_row.viewport, '{"width": 1280, "height": 720}'::jsonb)
    )
    RETURNING id INTO new_source_id;
    
    -- Link baseline to source
    UPDATE visual_baselines
    SET source_id = new_source_id
    WHERE id = baseline_row.id;
  END LOOP;
END $$;

-- Make source_id NOT NULL after backfill (future baselines must have a source)
-- Keeping it nullable for now to maintain backward compatibility during transition
-- ALTER TABLE visual_baselines ALTER COLUMN source_id SET NOT NULL;
