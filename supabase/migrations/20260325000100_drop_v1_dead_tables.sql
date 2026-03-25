-- Drop all dead v1 visual regression tables and storage.
-- No active code references these. Safe to remove entirely.
-- Active tables (scans, findings, join_waitlist) and aidqa bucket are untouched.

-- 1. Drop storage policies for the visual bucket
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated reads"   ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "own_storage_objects"         ON storage.objects;

-- 2. visual bucket: delete manually via Supabase dashboard → Storage
--    (direct SQL on storage.objects is blocked by Supabase)

-- 3. Drop tables (CASCADE handles remaining FK constraints)
DROP TABLE IF EXISTS public.visual_jobs      CASCADE;
DROP TABLE IF EXISTS public.visual_runs      CASCADE;
DROP TABLE IF EXISTS public.monitors         CASCADE;
DROP TABLE IF EXISTS public.design_baselines CASCADE;
DROP TABLE IF EXISTS public.baseline_sources CASCADE;
DROP TABLE IF EXISTS public.visual_baselines CASCADE;
