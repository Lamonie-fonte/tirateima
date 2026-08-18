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
    -- A Cagece fatura esgoto sobre 80% do volume faturado de água e
    -- despreza a parte decimal (por exemplo, 16 m³ de água viram 12 m³).
    v_sewer_volume := greatest(
      floor(v_water_volume * 0.80),
      v_tariff.sewer_minimum_m3
    );

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

comment on function public.estimate_cagece_bill(text, numeric, boolean, date, text, text, text)
  is 'Calcula uma estimativa com a tabela oficial da Cagece e esgoto faturado sobre 80% do volume de água.';
