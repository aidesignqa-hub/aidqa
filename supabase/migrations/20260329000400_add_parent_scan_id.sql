ALTER TABLE scans ADD COLUMN parent_scan_id UUID REFERENCES scans(id);
