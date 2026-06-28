create table if not exists public.cms_site_snapshots (
  id text primary key check (id in ('draft', 'published')),
  snapshot jsonb not null,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.cms_site_snapshots enable row level security;

drop policy if exists "Anyone can read published CMS site snapshot" on public.cms_site_snapshots;
create policy "Anyone can read published CMS site snapshot"
on public.cms_site_snapshots
for select
to anon, authenticated
using (id = 'published');

drop policy if exists "CMS admins can read all CMS site snapshots" on public.cms_site_snapshots;
create policy "CMS admins can read all CMS site snapshots"
on public.cms_site_snapshots
for select
to authenticated
using (public.is_cms_admin());

drop policy if exists "CMS admins can insert CMS site snapshots" on public.cms_site_snapshots;
create policy "CMS admins can insert CMS site snapshots"
on public.cms_site_snapshots
for insert
to authenticated
with check (public.is_cms_admin());

drop policy if exists "CMS admins can update CMS site snapshots" on public.cms_site_snapshots;
create policy "CMS admins can update CMS site snapshots"
on public.cms_site_snapshots
for update
to authenticated
using (public.is_cms_admin())
with check (public.is_cms_admin());

drop policy if exists "CMS admins can delete CMS site snapshots" on public.cms_site_snapshots;
create policy "CMS admins can delete CMS site snapshots"
on public.cms_site_snapshots
for delete
to authenticated
using (public.is_cms_admin());
