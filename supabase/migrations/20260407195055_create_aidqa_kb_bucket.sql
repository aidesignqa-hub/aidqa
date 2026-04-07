-- Creates the aidqa-kb bucket for static knowledge base assets (reference images + knowledgebase.json)
insert into storage.buckets (id, name, public)
values ('aidqa-kb', 'aidqa-kb', false)
on conflict (id) do nothing;

-- Service role can read/write all files in this bucket
create policy "service_role_kb_access"
on storage.objects
for all
to service_role
using (bucket_id = 'aidqa-kb')
with check (bucket_id = 'aidqa-kb');
