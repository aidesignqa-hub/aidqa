alter table if exists public.visual_runs
  add column if not exists monitor_id uuid;

alter table if exists public.visual_runs
  drop constraint if exists visual_runs_monitor_id_fkey;

alter table if exists public.visual_runs
  add constraint visual_runs_monitor_id_fkey
  foreign key (monitor_id)
  references public.monitors(id)
  on delete set null;

create index if not exists idx_visual_runs_monitor_id
  on public.visual_runs(monitor_id);
