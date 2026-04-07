-- Public bucket for static assets (demo video, etc.)
-- Kept separate from 'aidqa' bucket which stores private user scan data.
INSERT INTO storage.buckets (id, name, public)
VALUES ('aidqa-assets', 'aidqa-assets', true)
ON CONFLICT (id) DO NOTHING;
