-- =====================================================================
-- Nivedyam website: database schema, security rules and storage
-- Run this ONCE in Supabase: Dashboard → SQL Editor → New query → Run.
-- Then run seed.sql to load the starting content.
-- =====================================================================

create extension if not exists "pgcrypto";

-- Helper checks live in a private schema so they are not callable through the public API.
create schema if not exists private;
grant usage on schema private to anon, authenticated;

-- ---------------------------------------------------------------------
-- Admin allow-list. Only Google accounts listed here can use /admin.
-- ---------------------------------------------------------------------
create table if not exists public.admins (
  email      text primary key,
  role       text not null default 'editor' check (role in ('owner', 'editor')),
  created_at timestamptz not null default now()
);

-- True when the signed-in user's email is on the allow-list.
create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- True when the signed-in user is an owner (can manage other admins).
create or replace function private.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and role = 'owner'
  );
$$;

-- ---------------------------------------------------------------------
-- Content tables
-- ---------------------------------------------------------------------

-- Simple key/value settings: contact details, page headings, texts, logo.
create table if not exists public.site_settings (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.slides (
  id           uuid primary key default gen_random_uuid(),
  sort         int  not null default 0,
  published    boolean not null default true,
  eyebrow      text not null default '',
  title        text not null default '',
  body         text not null default '',
  cta_label    text not null default '',
  cta_link     text not null default '/products',
  image_url    text not null default '',
  bottle_brand text not null default '',   -- used when no image: draws a bottle in this brand's colours
  bottle_label text not null default '',
  stat_value   text not null default '',
  stat_label   text not null default ''
);

create table if not exists public.brands (
  id          uuid primary key default gen_random_uuid(),
  sort        int  not null default 0,
  slug        text not null unique,
  name        text not null,
  description text not null default '',
  logo_url    text not null default '',
  image_url   text not null default '',   -- bottle photo; when empty a bottle is drawn
  label_color text not null default '#1E3FA8',
  cap_color   text not null default '#2346B5'
);

create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  sort          int  not null default 0,
  published     boolean not null default true,
  featured      boolean not null default false,  -- shown on the home page
  brand_slug    text not null default '',
  name          text not null,
  size          text not null default '',
  pack          text not null default '',
  tag           text not null default '',
  is_bulk       boolean not null default false,
  image_url     text not null default '',
  bottle_height int  not null default 190
);

-- Numbers shown in stat strips. page = home | about | process
create table if not exists public.stats (
  id    uuid primary key default gen_random_uuid(),
  sort  int  not null default 0,
  page  text not null,
  value text not null,
  label text not null
);

-- Icon cards. page = home_features | about_values | about_steps | about_source
create table if not exists public.features (
  id    uuid primary key default gen_random_uuid(),
  sort  int  not null default 0,
  page  text not null,
  icon  text not null default 'drop',
  title text not null,
  body  text not null default ''
);

create table if not exists public.minerals (
  id        uuid primary key default gen_random_uuid(),
  sort      int  not null default 0,
  label     text not null,
  range     text not null,
  unit      text not null default '',
  note      text not null default '',
  highlight boolean not null default false
);

create table if not exists public.process_phases (
  id    uuid primary key default gen_random_uuid(),
  sort  int  not null default 0,
  name  text not null,
  intro text not null default '',
  color text not null default '#2346B5',
  ink   text not null default '#FFFFFF',
  tint  text not null default '#E8EDFA'
);

create table if not exists public.process_steps (
  id         uuid primary key default gen_random_uuid(),
  sort       int  not null default 0,
  phase_sort int  not null default 1,   -- which phase (1, 2, 3, 4…)
  title      text not null,
  short      text not null default '',
  body       text not null default '',
  spec       text not null default ''
);

create table if not exists public.faqs (
  id       uuid primary key default gen_random_uuid(),
  sort     int  not null default 0,
  question text not null,
  answer   text not null
);

create table if not exists public.reviews (
  id     uuid primary key default gen_random_uuid(),
  sort   int  not null default 0,
  name   text not null,
  text   text not null,
  rating int  not null default 5 check (rating between 1 and 5)
);

-- Messages sent from the contact form.
create table if not exists public.enquiries (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  topic      text not null default 'General enquiry',
  name       text not null default '',
  phone      text not null default '',
  email      text not null,
  subject    text not null,
  message    text not null,
  status     text not null default 'new' check (status in ('new', 'read', 'done'))
);

-- ---------------------------------------------------------------------
-- Row Level Security
-- Visitors can read content; only allow-listed admins can change it.
-- Visitors can send enquiries but never read them.
-- ---------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'site_settings','slides','brands','products','stats','features',
    'minerals','process_phases','process_steps','faqs','reviews'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "admin write" on public.%I for all using (private.is_admin()) with check (private.is_admin())', t);
  end loop;
end $$;

alter table public.enquiries enable row level security;
drop policy if exists "anyone can send" on public.enquiries;
create policy "anyone can send" on public.enquiries for insert
  with check (status = 'new' and char_length(message) <= 5000);
drop policy if exists "admin read" on public.enquiries;
create policy "admin read" on public.enquiries for select using (private.is_admin());
drop policy if exists "admin update" on public.enquiries;
create policy "admin update" on public.enquiries for update using (private.is_admin()) with check (private.is_admin());
drop policy if exists "admin delete" on public.enquiries;
create policy "admin delete" on public.enquiries for delete using (private.is_admin());

alter table public.admins enable row level security;
drop policy if exists "admins read" on public.admins;
create policy "admins read" on public.admins for select using (private.is_admin());
drop policy if exists "owners manage" on public.admins;
create policy "owners manage" on public.admins for all using (private.is_owner()) with check (private.is_owner());

-- ---------------------------------------------------------------------
-- Image storage: public bucket "media"; only admins can upload/delete.
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects for select
  using (bucket_id = 'media');
drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects for insert
  with check (bucket_id = 'media' and private.is_admin());
drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects for update
  using (bucket_id = 'media' and private.is_admin());
drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects for delete
  using (bucket_id = 'media' and private.is_admin());

-- Only the database roles used by the website may run the helper checks.
revoke execute on function private.is_admin() from public;
revoke execute on function private.is_owner() from public;
grant execute on function private.is_admin() to anon, authenticated;
grant execute on function private.is_owner() to anon, authenticated;
