-- Add indexes on user_id for scans and findings tables.
-- All RLS policies and handler queries filter by user_id; without these
-- every query does a full table scan.

CREATE INDEX IF NOT EXISTS scans_user_id_idx ON scans(user_id);
CREATE INDEX IF NOT EXISTS findings_user_id_idx ON findings(user_id);
