CREATE TABLE finding_embeddings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  finding_id   UUID NOT NULL REFERENCES findings(id) ON DELETE CASCADE,
  user_id      TEXT NOT NULL,
  embedding    vector(768) NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON finding_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

ALTER TABLE finding_embeddings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_embeddings" ON finding_embeddings
  USING (user_id = auth.uid()::text);
