-- StudyCircle database tables.
-- Run this in Supabase: SQL Editor -> New query -> paste -> Run.

-- One row per study group (Story 1: Create a Study Group).
create table public.groups (
    id uuid primary key default gen_random_uuid(),
    course_name text not null check (char_length(trim(course_name)) > 0),
    section_number text not null check (char_length(trim(section_number)) > 0),
    meeting_times text,
    meeting_days text,
    description text,
    created_at timestamptz not null default now()
);

-- Row Level Security: there are no logins yet, so anyone can view and create groups.
-- Nobody can edit or delete groups from the website until we add policies for that.
alter table public.groups enable row level security;

grant select, insert on public.groups to anon, authenticated;

create policy "Anyone can view groups"
    on public.groups for select
    to anon, authenticated
    using (true);

create policy "Anyone can create groups"
    on public.groups for insert
    to anon, authenticated
    with check (true);
