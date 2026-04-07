-- Per-user monthly scan quota overrides.
-- Admins manage rows directly in the Supabase dashboard (Table Editor → user_scan_limits).
-- Users without a row are subject to the system default (7 scans/month).
-- To grant more scans: INSERT a row with the user_id (from Authentication → Users) and desired monthly_limit.
-- To grant effectively unlimited scans: set monthly_limit = 999.

CREATE TABLE public.user_scan_limits (
  user_id       uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         text        NOT NULL,
  monthly_limit integer     NOT NULL DEFAULT 50,
  notes         text,
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_scan_limits ENABLE ROW LEVEL SECURITY;
-- No user-level policies — only service role (edge function) can access this table.

COMMENT ON TABLE public.user_scan_limits IS
  'Per-user monthly scan quota overrides. Rows managed by admins in the Supabase dashboard.
   Users without a row get the system default (7 scans/month).
   To grant more scans: INSERT a row with the user_id (from auth.users) and desired monthly_limit.';

COMMENT ON COLUMN public.user_scan_limits.email IS 'Copy from auth.users for readability. Not authoritative — user_id is the key.';
COMMENT ON COLUMN public.user_scan_limits.monthly_limit IS 'Max completed scans allowed this calendar month. Set to 999 for effectively unlimited.';
COMMENT ON COLUMN public.user_scan_limits.notes IS 'Optional admin note (e.g. "beta tester", "paid plan", "manual override").';
