create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nickname text not null default 'Meu imóvel',
  cep text not null,
  street text not null,
  number text not null,
  complement text,
  neighborhood text not null,
  city text not null default 'Fortaleza',
  state text not null default 'CE',
  category text not null default 'residencial' check (category in ('residencial','social','comercial','industrial','publica')),
  sewage_percent numeric(6,2) not null default 0 check (sewage_percent between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  reference_month date not null,
  previous_reading numeric(12,3) not null check (previous_reading >= 0),
  current_reading numeric(12,3) not null check (current_reading >= previous_reading),
  consumption_m3 numeric(12,3) generated always as (current_reading - previous_reading) stored,
  billed_consumption_m3 numeric(12,3),
  bill_amount numeric(12,2),
  photo_path text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(property_id, reference_month)
);

create table public.tariff_versions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null default 'Fortaleza',
  state text not null default 'CE',
  category text not null,
  valid_from date not null,
  valid_until date,
  minimum_charge numeric(12,2) not null default 0,
  active boolean not null default true,
  source_url text,
  notes text,
  created_at timestamptz not null default now()
);

create table public.tariff_tiers (
  id uuid primary key default gen_random_uuid(),
  tariff_version_id uuid not null references public.tariff_versions(id) on delete cascade,
  min_m3 numeric(12,3) not null,
  max_m3 numeric(12,3),
  price_per_m3 numeric(12,6) not null check (price_per_m3 >= 0),
  fixed_amount numeric(12,2) not null default 0,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.calculations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reading_id uuid references public.readings(id) on delete set null,
  property_id uuid not null references public.properties(id) on delete cascade,
  tariff_version_id uuid references public.tariff_versions(id) on delete set null,
  consumption_m3 numeric(12,3) not null,
  water_amount numeric(12,2) not null,
  sewage_amount numeric(12,2) not null default 0,
  estimated_total numeric(12,2) not null,
  bill_amount numeric(12,2),
  difference_amount numeric(12,2),
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger properties_set_updated_at before update on public.properties for each row execute function public.set_updated_at();
create trigger readings_set_updated_at before update on public.readings for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.health_check()
returns timestamptz language sql stable security invoker set search_path = '' as $$
  select now();
$$;
grant execute on function public.health_check() to anon, authenticated;

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.readings enable row level security;
alter table public.tariff_versions enable row level security;
alter table public.tariff_tiers enable row level security;
alter table public.calculations enable row level security;

create policy profiles_select_own on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy profiles_update_own on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy properties_all_own on public.properties for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy readings_all_own on public.readings for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy calculations_all_own on public.calculations for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy tariff_versions_read on public.tariff_versions for select to authenticated using (active = true);
create policy tariff_tiers_read on public.tariff_tiers for select to authenticated using (exists (select 1 from public.tariff_versions tv where tv.id = tariff_version_id and tv.active = true));

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.profiles, public.properties, public.readings, public.calculations to authenticated;
grant select on public.tariff_versions, public.tariff_tiers to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('meter-photos', 'meter-photos', false, 10485760, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy meter_photos_select_own on storage.objects for select to authenticated using (bucket_id = 'meter-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy meter_photos_insert_own on storage.objects for insert to authenticated with check (bucket_id = 'meter-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy meter_photos_update_own on storage.objects for update to authenticated using (bucket_id = 'meter-photos' and (storage.foldername(name))[1] = (select auth.uid())::text) with check (bucket_id = 'meter-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy meter_photos_delete_own on storage.objects for delete to authenticated using (bucket_id = 'meter-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
