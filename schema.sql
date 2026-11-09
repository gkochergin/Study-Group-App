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

-- User profiles are linked to Supabase Auth; passwords stay in auth.users.
create table public."User" (
    id uuid primary key references auth.users(id) on delete cascade,
    "Name" text not null check (char_length(trim("Name")) > 0)
);

alter table public."User" enable row level security;

-- The public directory exposes names only; profile IDs remain private.
revoke select on public."User" from anon, authenticated;
grant select ("Name") on public."User" to anon, authenticated;

create policy "Anyone can view user profiles"
    on public."User" for select
    to anon, authenticated
    using (true);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public."User" (id, "Name")
    values (
        new.id,
        coalesce(nullif(trim(new.raw_user_meta_data ->> 'name'), ''), 'User')
    );
    return new;
end;
$$;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
