create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_content (
  id text primary key check (id in ('draft', 'published')),
  content jsonb not null,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.cms_content enable row level security;

create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_cms_admin() to anon, authenticated;

drop policy if exists "CMS admins can read admin allowlist" on public.admin_users;
create policy "CMS admins can read admin allowlist"
on public.admin_users
for select
to authenticated
using (public.is_cms_admin());

drop policy if exists "Anyone can read published CMS content" on public.cms_content;
create policy "Anyone can read published CMS content"
on public.cms_content
for select
to anon, authenticated
using (id = 'published');

drop policy if exists "CMS admins can read all CMS content" on public.cms_content;
create policy "CMS admins can read all CMS content"
on public.cms_content
for select
to authenticated
using (public.is_cms_admin());

drop policy if exists "CMS admins can insert CMS content" on public.cms_content;
create policy "CMS admins can insert CMS content"
on public.cms_content
for insert
to authenticated
with check (public.is_cms_admin());

drop policy if exists "CMS admins can update CMS content" on public.cms_content;
create policy "CMS admins can update CMS content"
on public.cms_content
for update
to authenticated
using (public.is_cms_admin())
with check (public.is_cms_admin());

drop policy if exists "CMS admins can delete CMS content" on public.cms_content;
create policy "CMS admins can delete CMS content"
on public.cms_content
for delete
to authenticated
using (public.is_cms_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ehray-media',
  'ehray-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can read EHRay media" on storage.objects;
create policy "Anyone can read EHRay media"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'ehray-media');

drop policy if exists "CMS admins can upload EHRay media" on storage.objects;
create policy "CMS admins can upload EHRay media"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'ehray-media' and public.is_cms_admin());

drop policy if exists "CMS admins can update EHRay media" on storage.objects;
create policy "CMS admins can update EHRay media"
on storage.objects
for update
to authenticated
using (bucket_id = 'ehray-media' and public.is_cms_admin())
with check (bucket_id = 'ehray-media' and public.is_cms_admin());

drop policy if exists "CMS admins can delete EHRay media" on storage.objects;
create policy "CMS admins can delete EHRay media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'ehray-media' and public.is_cms_admin());

-- After creating the Supabase Auth user, add the dashboard admin email:
-- insert into public.admin_users (email) values ('client@example.com');
