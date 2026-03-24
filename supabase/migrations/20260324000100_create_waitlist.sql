CREATE TABLE join_waitlist (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  role          TEXT,
  company_size  TEXT,
  notes         TEXT,
  source        TEXT NOT NULL DEFAULT 'landing',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE join_waitlist ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write
CREATE POLICY "service_role_only" ON join_waitlist
  USING (false)
  WITH CHECK (false);
