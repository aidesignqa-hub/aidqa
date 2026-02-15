alter table if exists public.visual_runs
  drop constraint if exists visual_runs_baseline_id_fkey;

alter table if exists public.visual_runs
  add constraint visual_runs_baseline_id_fkey
  foreign key (baseline_id)
  references public.design_baselines(id)
  on delete cascade
  not valid;
