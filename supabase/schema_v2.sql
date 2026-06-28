create extension if not exists pgcrypto;

create table if not exists public.cms_sites (
  id uuid primary key default gen_random_uuid(),
  site_key text not null unique,
  name text not null,
  domain text,
  default_locale text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_admin_users (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.cms_sites(id) on delete cascade,
  email text not null,
  role text not null default 'editor' check (role in ('owner', 'admin', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  unique (site_id, email)
);

create table if not exists public.cms_theme_versions (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.cms_sites(id) on delete cascade,
  version_number integer not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  theme jsonb not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  published_at timestamptz,
  publish_note text,
  unique (site_id, version_number)
);

create table if not exists public.cms_site_settings_versions (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.cms_sites(id) on delete cascade,
  version_number integer not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  settings jsonb not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  published_at timestamptz,
  publish_note text,
  unique (site_id, version_number)
);

create table if not exists public.cms_pages (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.cms_sites(id) on delete cascade,
  slug text not null,
  title text not null,
  nav_label text not null,
  page_type text not null default 'custom',
  is_system boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (site_id, slug)
);

create table if not exists public.cms_page_versions (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.cms_sites(id) on delete cascade,
  page_id uuid not null references public.cms_pages(id) on delete cascade,
  version_number integer not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  content jsonb not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  published_at timestamptz,
  publish_note text,
  unique (page_id, version_number)
);

create table if not exists public.cms_live_versions (
  site_id uuid primary key references public.cms_sites(id) on delete cascade,
  theme_version_id uuid references public.cms_theme_versions(id) on delete restrict,
  settings_version_id uuid references public.cms_site_settings_versions(id) on delete restrict,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_page_live_versions (
  page_id uuid primary key references public.cms_pages(id) on delete cascade,
  version_id uuid not null references public.cms_page_versions(id) on delete restrict,
  published_by uuid references auth.users(id) on delete set null,
  published_at timestamptz not null default now()
);

create table if not exists public.cms_media (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.cms_sites(id) on delete cascade,
  bucket text not null default 'ehray-media',
  path text not null,
  public_url text not null,
  alt text,
  caption text,
  folder text,
  original_name text,
  mime_type text,
  size_bytes bigint,
  width integer,
  height integer,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_audit_log (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.cms_sites(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.cms_sites enable row level security;
alter table public.cms_admin_users enable row level security;
alter table public.cms_theme_versions enable row level security;
alter table public.cms_site_settings_versions enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_page_versions enable row level security;
alter table public.cms_live_versions enable row level security;
alter table public.cms_page_live_versions enable row level security;
alter table public.cms_media enable row level security;
alter table public.cms_audit_log enable row level security;

create or replace function public.is_cms_admin(target_site_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.cms_admin_users
    where cms_admin_users.site_id = target_site_id
      and lower(cms_admin_users.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and cms_admin_users.role in ('owner', 'admin', 'editor')
  );
$$;

create or replace function public.can_view_cms(target_site_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.cms_admin_users
    where cms_admin_users.site_id = target_site_id
      and lower(cms_admin_users.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and cms_admin_users.role in ('owner', 'admin', 'editor', 'viewer')
  );
$$;

grant execute on function public.is_cms_admin(uuid) to anon, authenticated;
grant execute on function public.can_view_cms(uuid) to anon, authenticated;

drop policy if exists "Public can read sites" on public.cms_sites;
create policy "Public can read sites"
on public.cms_sites
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage sites" on public.cms_sites;
create policy "Admins can manage sites"
on public.cms_sites
for all
to authenticated
using (public.can_view_cms(id))
with check (public.is_cms_admin(id));

drop policy if exists "Admins can read admin users" on public.cms_admin_users;
create policy "Admins can read admin users"
on public.cms_admin_users
for select
to authenticated
using (public.can_view_cms(site_id));

drop policy if exists "Owners can manage admin users" on public.cms_admin_users;
create policy "Owners can manage admin users"
on public.cms_admin_users
for all
to authenticated
using (
  exists (
    select 1 from public.cms_admin_users me
    where me.site_id = cms_admin_users.site_id
      and lower(me.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and me.role in ('owner', 'admin')
  )
)
with check (
  exists (
    select 1 from public.cms_admin_users me
    where me.site_id = cms_admin_users.site_id
      and lower(me.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and me.role in ('owner', 'admin')
  )
);

drop policy if exists "Public can read pages" on public.cms_pages;
create policy "Public can read pages"
on public.cms_pages
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage pages" on public.cms_pages;
create policy "Admins can manage pages"
on public.cms_pages
for all
to authenticated
using (public.is_cms_admin(site_id))
with check (public.is_cms_admin(site_id));

drop policy if exists "Public can read live page versions" on public.cms_page_versions;
create policy "Public can read live page versions"
on public.cms_page_versions
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.cms_page_live_versions live
    where live.version_id = cms_page_versions.id
  )
);

drop policy if exists "Admins can manage page versions" on public.cms_page_versions;
create policy "Admins can manage page versions"
on public.cms_page_versions
for all
to authenticated
using (public.is_cms_admin(site_id))
with check (public.is_cms_admin(site_id));

drop policy if exists "Public can read live page links" on public.cms_page_live_versions;
create policy "Public can read live page links"
on public.cms_page_live_versions
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage live page links" on public.cms_page_live_versions;
create policy "Admins can manage live page links"
on public.cms_page_live_versions
for all
to authenticated
using (
  exists (
    select 1
    from public.cms_pages p
    where p.id = cms_page_live_versions.page_id
      and public.is_cms_admin(p.site_id)
  )
)
with check (
  exists (
    select 1
    from public.cms_pages p
    where p.id = cms_page_live_versions.page_id
      and public.is_cms_admin(p.site_id)
  )
);

drop policy if exists "Public can read live site versions" on public.cms_live_versions;
create policy "Public can read live site versions"
on public.cms_live_versions
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage live site versions" on public.cms_live_versions;
create policy "Admins can manage live site versions"
on public.cms_live_versions
for all
to authenticated
using (public.is_cms_admin(site_id))
with check (public.is_cms_admin(site_id));

drop policy if exists "Public can read published theme versions" on public.cms_theme_versions;
create policy "Public can read published theme versions"
on public.cms_theme_versions
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.cms_live_versions live
    where live.theme_version_id = cms_theme_versions.id
  )
);

drop policy if exists "Admins can manage theme versions" on public.cms_theme_versions;
create policy "Admins can manage theme versions"
on public.cms_theme_versions
for all
to authenticated
using (public.is_cms_admin(site_id))
with check (public.is_cms_admin(site_id));

drop policy if exists "Public can read published settings versions" on public.cms_site_settings_versions;
create policy "Public can read published settings versions"
on public.cms_site_settings_versions
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.cms_live_versions live
    where live.settings_version_id = cms_site_settings_versions.id
  )
);

drop policy if exists "Admins can manage settings versions" on public.cms_site_settings_versions;
create policy "Admins can manage settings versions"
on public.cms_site_settings_versions
for all
to authenticated
using (public.is_cms_admin(site_id))
with check (public.is_cms_admin(site_id));

drop policy if exists "Public can read CMS media" on public.cms_media;
create policy "Public can read CMS media"
on public.cms_media
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage CMS media" on public.cms_media;
create policy "Admins can manage CMS media"
on public.cms_media
for all
to authenticated
using (public.is_cms_admin(site_id))
with check (public.is_cms_admin(site_id));

drop policy if exists "Admins can read audit log" on public.cms_audit_log;
create policy "Admins can read audit log"
on public.cms_audit_log
for select
to authenticated
using (public.can_view_cms(site_id));

drop policy if exists "Admins can create audit log" on public.cms_audit_log;
create policy "Admins can create audit log"
on public.cms_audit_log
for insert
to authenticated
with check (public.is_cms_admin(site_id));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ehray-media',
  'ehray-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']::text[]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read reusable CMS media" on storage.objects;
create policy "Public can read reusable CMS media"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'ehray-media');

drop policy if exists "CMS admins can upload reusable CMS media" on storage.objects;
create policy "CMS admins can upload reusable CMS media"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'ehray-media');

drop policy if exists "CMS admins can update reusable CMS media" on storage.objects;
create policy "CMS admins can update reusable CMS media"
on storage.objects
for update
to authenticated
using (bucket_id = 'ehray-media')
with check (bucket_id = 'ehray-media');

drop policy if exists "CMS admins can delete reusable CMS media" on storage.objects;
create policy "CMS admins can delete reusable CMS media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'ehray-media');
