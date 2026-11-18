-- NOVARIS · Stage 3 · Recruiting schema
-- Applied in Stage 9 when Supabase is connected. Row Level Security is ON for every table:
--   • anonymous visitors may INSERT an application, never read one
--   • only staff with the owner / admin / recruiting_manager role may read or change applicant data
--   • every change is written to the audit log

create extension if not exists pgcrypto;

-- Roles (expanded in Stage 4)
do $$ begin
  create type app_role as enum ('owner', 'admin', 'recruiting_manager', 'sales_manager', 'agent', 'trainee');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  role app_role not null default 'trainee',
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create or replace function public.has_role(roles app_role[])
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles p where p.id = auth.uid() and p.active and p.role = any(roles));
$$;

create policy "profiles: read own" on public.profiles for select using (id = auth.uid() or public.has_role(array['owner','admin']::app_role[]));

-- Applications
do $$ begin
  create type application_status as enum (
    'New Application','Under Review','Contacted','Interview Scheduled','Interview Completed',
    'Approved','Onboarding','Active','Rejected','Withdrawn');
exception when duplicate_object then null; end $$;

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  submitted_at timestamptz not null default now(),
  status application_status not null default 'New Application',
  first_name text not null check (char_length(first_name) between 1 and 100),
  last_name text not null check (char_length(last_name) between 1 and 100),
  phone text not null check (char_length(phone) <= 30),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  city text not null, state text not null check (char_length(state) <= 2),
  position_id text not null,
  previous_employment text, sales_experience text, insurance_experience text, financial_experience text,
  current_employment_status text, why_novaris text, preferred_contact text,
  interview_availability text[] not null default '{}', availability_notes text,
  consent_privacy boolean not null check (consent_privacy),
  consent_contact boolean not null check (consent_contact),
  consent_marketing boolean not null default false,
  consent_marketing_at timestamptz,
  arrangement text,                       -- set by NOVARIS after legal classification
  assigned_to uuid references public.profiles
);
alter table public.applications enable row level security;

create policy "applications: public can apply" on public.applications for insert to anon, authenticated
  with check (status = 'New Application' and arrangement is null and assigned_to is null);
create policy "applications: recruiting staff read" on public.applications for select
  using (public.has_role(array['owner','admin','recruiting_manager']::app_role[]));
create policy "applications: recruiting staff update" on public.applications for update
  using (public.has_role(array['owner','admin','recruiting_manager']::app_role[]));
create policy "applications: owners delete" on public.applications for delete
  using (public.has_role(array['owner','admin']::app_role[]));

create table if not exists public.application_notes (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications on delete cascade,
  author uuid not null default auth.uid() references public.profiles,
  body text not null, created_at timestamptz not null default now()
);
create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications on delete cascade,
  scheduled_for timestamptz not null,
  format text not null check (format in ('Phone','Video','In person')),
  interviewer text,
  outcome text not null default 'Pending' check (outcome in ('Pending','Advance','Hold','Do not advance','No show')),
  feedback text, created_by uuid default auth.uid(), created_at timestamptz not null default now()
);
create table if not exists public.onboarding_items (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications on delete cascade,
  key text not null, label text not null, done boolean not null default false, done_at timestamptz,
  unique (application_id, key)
);
do $$ declare t text; begin
  foreach t in array array['application_notes','interviews','onboarding_items'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format($p$create policy "%1$s: recruiting staff" on public.%1$I for all
      using (public.has_role(array['owner','admin','recruiting_manager']::app_role[]))
      with check (public.has_role(array['owner','admin','recruiting_manager']::app_role[]))$p$, t);
  end loop;
end $$;

-- Audit log (append-only for staff; readable by owner/admin)
create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor uuid default auth.uid(),
  entity text not null, entity_id uuid, action text not null, details jsonb
);
alter table public.audit_log enable row level security;
create policy "audit: owners read" on public.audit_log for select using (public.has_role(array['owner','admin']::app_role[]));

create or replace function public.log_application_change() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'UPDATE' and new.status is distinct from old.status then
    insert into audit_log(entity, entity_id, action, details)
    values ('application', new.id, 'status_changed', jsonb_build_object('from', old.status, 'to', new.status));
  elsif tg_op = 'INSERT' then
    insert into audit_log(entity, entity_id, action) values ('application', new.id, 'submitted');
  elsif tg_op = 'DELETE' then
    insert into audit_log(entity, entity_id, action) values ('application', old.id, 'deleted');
  end if;
  return coalesce(new, old);
end $$;
drop trigger if exists trg_application_audit on public.applications;
create trigger trg_application_audit after insert or update or delete on public.applications
  for each row execute function public.log_application_change();

create index if not exists applications_status_idx on public.applications(status);
create index if not exists applications_position_idx on public.applications(position_id);
create index if not exists applications_submitted_idx on public.applications(submitted_at desc);
