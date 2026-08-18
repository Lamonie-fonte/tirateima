alter table public.properties
  drop constraint if exists properties_category_check;

alter table public.properties
  add constraint properties_category_check
  check (
    category = any (
      array[
        'residencial_social'::text,
        'residencial_popular'::text,
        'residencial_normal'::text,
        'comercial_popular'::text,
        'comercial_ii'::text,
        'industrial'::text,
        'publica'::text,
        'filantropica'::text
      ]
    )
  );

alter table public.properties
  add column if not exists has_sewer boolean not null default false;

alter table public.tariff_versions
  add column if not exists slug text,
  add column if not exists operator text not null default 'CAGECE',
  add column if not exists neighborhood text,
  add column if not exists water_minimum_m3 numeric not null default 0,
  add column if not exists sewer_minimum_m3 numeric not null default 0,
  add column if not exists water_maximum_m3 numeric,
  add column if not exists sewer_maximum_m3 numeric;

alter table public.tariff_tiers
  rename column price_per_m3 to water_price_per_m3;

alter table public.tariff_tiers
  add column if not exists sewer_price_per_m3 numeric not null default 0;

alter table public.tariff_tiers
  add constraint tariff_tiers_water_price_check
  check (water_price_per_m3 >= 0);

alter table public.tariff_tiers
  add constraint tariff_tiers_sewer_price_check
  check (sewer_price_per_m3 >= 0);

create unique index if not exists tariff_versions_scope_unique
  on public.tariff_versions (
    operator,
    state,
    city,
    category,
    coalesce(neighborhood, ''),
    valid_from
  );

delete from public.tariff_tiers;
delete from public.tariff_versions;

insert into public.tariff_versions (
  slug,
  name,
  operator,
  city,
  state,
  neighborhood,
  category,
  valid_from,
  valid_until,
  water_minimum_m3,
  sewer_minimum_m3,
  water_maximum_m3,
  sewer_maximum_m3,
  active,
  source_url,
  notes
)
values
  ('cagece-2025-residencial-social', 'Residencial Social', 'CAGECE', 'Fortaleza', 'CE', null, 'residencial_social', '2025-11-05', null, 0, 0, 10, 8, true, 'https://www.cagece.com.br/produtos-e-servicos/precos-e-prazos/estrutura-tarifaria/', 'Tabela oficial válida a partir de 05/11/2025. Demanda máxima: 10 m³ de água e 8 m³ de esgoto.'),
  ('cagece-2025-residencial-popular', 'Residencial Popular', 'CAGECE', 'Fortaleza', 'CE', null, 'residencial_popular', '2025-11-05', null, 10, 8, null, null, true, 'https://www.cagece.com.br/produtos-e-servicos/precos-e-prazos/estrutura-tarifaria/', 'Tabela oficial válida a partir de 05/11/2025.'),
  ('cagece-2025-residencial-normal', 'Residencial Normal', 'CAGECE', 'Fortaleza', 'CE', null, 'residencial_normal', '2025-11-05', null, 10, 8, null, null, true, 'https://www.cagece.com.br/produtos-e-servicos/precos-e-prazos/estrutura-tarifaria/', 'Tabela oficial válida a partir de 05/11/2025.'),
  ('cagece-2025-comercial-popular', 'Comercial Popular', 'CAGECE', 'Fortaleza', 'CE', null, 'comercial_popular', '2025-11-05', null, 7, 5, 13, 13, true, 'https://www.cagece.com.br/produtos-e-servicos/precos-e-prazos/estrutura-tarifaria/', 'Tabela oficial válida a partir de 05/11/2025. Demanda limitada à faixa popular.'),
  ('cagece-2025-comercial-ii', 'Comercial II', 'CAGECE', 'Fortaleza', 'CE', null, 'comercial_ii', '2025-11-05', null, 10, 8, null, null, true, 'https://www.cagece.com.br/produtos-e-servicos/precos-e-prazos/estrutura-tarifaria/', 'Tabela oficial válida a partir de 05/11/2025.'),
  ('cagece-2025-industrial', 'Industrial', 'CAGECE', 'Fortaleza', 'CE', null, 'industrial', '2025-11-05', null, 15, 12, null, null, true, 'https://www.cagece.com.br/produtos-e-servicos/precos-e-prazos/estrutura-tarifaria/', 'Tabela oficial válida a partir de 05/11/2025.'),
  ('cagece-2025-publica', 'Pública', 'CAGECE', 'Fortaleza', 'CE', null, 'publica', '2025-11-05', null, 15, 12, null, null, true, 'https://www.cagece.com.br/produtos-e-servicos/precos-e-prazos/estrutura-tarifaria/', 'Tabela oficial válida a partir de 05/11/2025.'),
  ('cagece-2025-filantropica', 'Entidade Filantrópica', 'CAGECE', 'Fortaleza', 'CE', null, 'filantropica', '2025-11-05', null, 10, 8, null, null, true, 'https://www.cagece.com.br/produtos-e-servicos/precos-e-prazos/estrutura-tarifaria/', 'Tabela oficial válida a partir de 05/11/2025.');

insert into public.tariff_tiers (
  tariff_version_id,
  min_m3,
  max_m3,
  water_price_per_m3,
  sewer_price_per_m3,
  fixed_amount,
  sort_order
)
select tv.id, rates.min_m3, rates.max_m3, rates.water_rate, rates.sewer_rate, 0, rates.sort_order
from public.tariff_versions tv
join (
  values
    ('residencial_social'::text, 0::numeric, 10::numeric, 2.33::numeric, 2.33::numeric, 1),
    ('residencial_popular', 0, 10, 4.76, 4.76, 1),
    ('residencial_popular', 10, 15, 8.10, 8.10, 2),
    ('residencial_popular', 15, 20, 8.78, 8.78, 3),
    ('residencial_popular', 20, 50, 15.11, 15.11, 4),
    ('residencial_popular', 50, null, 26.93, 26.93, 5),
    ('residencial_normal', 0, 10, 6.77, 7.52, 1),
    ('residencial_normal', 10, 15, 8.78, 9.61, 2),
    ('residencial_normal', 15, 20, 9.49, 10.42, 3),
    ('residencial_normal', 20, 50, 16.29, 17.90, 4),
    ('residencial_normal', 50, null, 28.77, 31.65, 5),
    ('comercial_popular', 0, 13, 8.10, 8.93, 1),
    ('comercial_ii', 0, 50, 16.99, 18.76, 1),
    ('comercial_ii', 50, null, 26.93, 29.62, 2),
    ('industrial', 0, 15, 15.00, 16.56, 1),
    ('industrial', 15, 50, 17.81, 19.53, 2),
    ('industrial', 50, null, 27.68, 30.43, 3),
    ('publica', 0, 15, 9.90, 10.91, 1),
    ('publica', 15, 50, 14.73, 16.19, 2),
    ('publica', 50, null, 23.66, 26.01, 3),
    ('filantropica', 0, 10, 4.76, 4.76, 1),
    ('filantropica', 10, 15, 8.00, 8.00, 2),
    ('filantropica', 15, 20, 8.60, 8.60, 3),
    ('filantropica', 20, 50, 14.73, 14.73, 4),
    ('filantropica', 50, null, 26.01, 26.01, 5)
) as rates(category, min_m3, max_m3, water_rate, sewer_rate, sort_order)
  on tv.category = rates.category
where tv.valid_from = '2025-11-05';

drop policy if exists tariff_versions_read on public.tariff_versions;
create policy tariff_versions_read
  on public.tariff_versions
  for select
  to anon, authenticated
  using (active = true);

drop policy if exists tariff_tiers_read on public.tariff_tiers;
create policy tariff_tiers_read
  on public.tariff_tiers
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.tariff_versions tv
      where tv.id = tariff_tiers.tariff_version_id
        and tv.active = true
    )
  );

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.properties from anon, authenticated;
revoke all on table public.readings from anon, authenticated;
revoke all on table public.calculations from anon, authenticated;
revoke all on table public.tariff_versions from anon, authenticated;
revoke all on table public.tariff_tiers from anon, authenticated;

grant select, update on table public.profiles to authenticated;
grant select, insert, update, delete on table public.properties to authenticated;
grant select, insert, update, delete on table public.readings to authenticated;
grant select, insert, update, delete on table public.calculations to authenticated;
grant select on table public.tariff_versions to anon, authenticated;
grant select on table public.tariff_tiers to anon, authenticated;

create or replace function public.estimate_cagece_bill(
  p_category text,
  p_consumption_m3 numeric,
  p_has_sewer boolean default false,
  p_reference_date date default current_date,
  p_city text default 'Fortaleza',
  p_state text default 'CE',
  p_neighborhood text default null
)
returns jsonb
language plpgsql
stable
security invoker
set search_path = ''
as $function$
declare
  v_tariff public.tariff_versions%rowtype;
  v_water_volume numeric;
  v_sewer_volume numeric;
  v_water_amount numeric;
  v_sewer_amount numeric;
  v_tiers jsonb;
begin
  if p_consumption_m3 is null or p_consumption_m3 < 0 or p_consumption_m3 > 10000 then
    raise exception 'Consumo inválido. Informe um valor entre 0 e 10.000 m³.'
      using errcode = '22023';
  end if;

  select tv.*
  into v_tariff
  from public.tariff_versions tv
  where tv.operator = 'CAGECE'
    and tv.state = upper(trim(p_state))
    and lower(tv.city) = lower(trim(p_city))
    and tv.category = p_category
    and tv.active = true
    and tv.valid_from <= p_reference_date
    and (tv.valid_until is null or tv.valid_until >= p_reference_date)
    and (
      tv.neighborhood is null
      or lower(tv.neighborhood) = lower(coalesce(trim(p_neighborhood), ''))
    )
  order by (tv.neighborhood is not null) desc, tv.valid_from desc
  limit 1;

  if not found then
    raise exception 'Não existe tarifa cadastrada para os dados informados.'
      using errcode = 'P0002';
  end if;

  if v_tariff.water_maximum_m3 is not null
     and p_consumption_m3 > v_tariff.water_maximum_m3 then
    raise exception 'O consumo ultrapassa o limite da categoria %.', v_tariff.name
      using errcode = '22023';
  end if;

  v_water_volume := greatest(p_consumption_m3, v_tariff.water_minimum_m3);

  if v_tariff.water_maximum_m3 is not null then
    v_water_volume := least(v_water_volume, v_tariff.water_maximum_m3);
  end if;

  if p_has_sewer then
    v_sewer_volume := greatest(p_consumption_m3, v_tariff.sewer_minimum_m3);
    if v_tariff.sewer_maximum_m3 is not null then
      v_sewer_volume := least(v_sewer_volume, v_tariff.sewer_maximum_m3);
    end if;
  else
    v_sewer_volume := 0;
  end if;

  select
    coalesce(
      sum(
        greatest(
          least(v_water_volume, coalesce(tt.max_m3, v_water_volume)) - tt.min_m3,
          0
        ) * tt.water_price_per_m3
      ),
      0
    ),
    coalesce(
      sum(
        greatest(
          least(v_sewer_volume, coalesce(tt.max_m3, v_sewer_volume)) - tt.min_m3,
          0
        ) * tt.sewer_price_per_m3
      ),
      0
    ),
    jsonb_agg(
      jsonb_build_object(
        'fromM3', tt.min_m3,
        'toM3', tt.max_m3,
        'waterRate', tt.water_price_per_m3,
        'sewerRate', tt.sewer_price_per_m3
      )
      order by tt.sort_order
    )
  into v_water_amount, v_sewer_amount, v_tiers
  from public.tariff_tiers tt
  where tt.tariff_version_id = v_tariff.id;

  return jsonb_build_object(
    'tariffId', v_tariff.id,
    'tariffName', v_tariff.name,
    'category', v_tariff.category,
    'validFrom', v_tariff.valid_from,
    'sourceUrl', v_tariff.source_url,
    'consumptionM3', p_consumption_m3,
    'waterBilledM3', v_water_volume,
    'sewerBilledM3', v_sewer_volume,
    'waterAmount', round(v_water_amount, 2),
    'sewerAmount', round(v_sewer_amount, 2),
    'estimatedTotal', round(v_water_amount + v_sewer_amount, 2),
    'tiers', coalesce(v_tiers, '[]'::jsonb)
  );
end;
$function$;

revoke all on function public.estimate_cagece_bill(text, numeric, boolean, date, text, text, text) from public;
grant execute on function public.estimate_cagece_bill(text, numeric, boolean, date, text, text, text) to anon, authenticated;

revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.set_updated_at() from public, anon, authenticated;
grant execute on function public.handle_new_user() to supabase_auth_admin;

comment on function public.estimate_cagece_bill(text, numeric, boolean, date, text, text, text)
  is 'Calcula uma estimativa com a tabela oficial da Cagece vigente na data de referência.';
