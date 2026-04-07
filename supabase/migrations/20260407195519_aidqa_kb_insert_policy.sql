-- Allow all roles to insert and select from aidqa-kb bucket
-- Needed so the service role key can upload files via the Storage REST API
create policy "kb_insert_all"
on storage.objects
for insert
to anon, authenticated, service_role
with check (bucket_id = 'aidqa-kb');

create policy "kb_select_all"
on storage.objects
for select
to anon, authenticated, service_role
using (bucket_id = 'aidqa-kb');
