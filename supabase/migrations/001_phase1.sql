-- Santa Prod. Phase 1 schema
-- Run in Supabase SQL Editor or via supabase db push

create extension if not exists "pgcrypto";

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  type text not null default 'feature'
    check (type in ('feature', 'short', 'series', 'pilot', 'other')),
  status text not null default 'development'
    check (status in ('development', 'pre_production', 'production', 'archived')),
  logline text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Scripts (one per project in phase 1)
create table if not exists public.scripts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.projects (id) on delete cascade,
  title text not null,
  current_version_id uuid,
  created_at timestamptz not null default now()
);

-- Script versions
create table if not exists public.script_versions (
  id uuid primary key default gen_random_uuid(),
  script_id uuid not null references public.scripts (id) on delete cascade,
  version_number int not null,
  label text,
  note text,
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users (id) on delete cascade,
  unique (script_id, version_number)
);

alter table public.scripts
  add constraint scripts_current_version_id_fkey
  foreign key (current_version_id) references public.script_versions (id)
  on delete set null deferrable initially deferred;

-- Script blocks
create table if not exists public.script_blocks (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.script_versions (id) on delete cascade,
  sort_order int not null,
  type text not null check (type in (
    'scene_heading', 'action', 'character', 'dialogue', 'parenthetical'
  )),
  content text not null default '',
  scene_number int,
  unique (version_id, sort_order)
);

create index if not exists idx_projects_owner on public.projects (owner_id);
create index if not exists idx_script_blocks_version on public.script_blocks (version_id, sort_order);
create index if not exists idx_script_versions_script on public.script_versions (script_id, version_number desc);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- RLS
alter table public.projects enable row level security;
alter table public.scripts enable row level security;
alter table public.script_versions enable row level security;
alter table public.script_blocks enable row level security;

create policy "Users manage own projects"
  on public.projects for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "Users manage scripts of own projects"
  on public.scripts for all
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

create policy "Users manage versions of own scripts"
  on public.script_versions for all
  using (
    exists (
      select 1
      from public.scripts s
      join public.projects p on p.id = s.project_id
      where s.id = script_id and p.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.scripts s
      join public.projects p on p.id = s.project_id
      where s.id = script_id and p.owner_id = auth.uid()
    )
  );

create policy "Users manage blocks of own versions"
  on public.script_blocks for all
  using (
    exists (
      select 1
      from public.script_versions v
      join public.scripts s on s.id = v.script_id
      join public.projects p on p.id = s.project_id
      where v.id = version_id and p.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.script_versions v
      join public.scripts s on s.id = v.script_id
      join public.projects p on p.id = s.project_id
      where v.id = version_id and p.owner_id = auth.uid()
    )
  );
