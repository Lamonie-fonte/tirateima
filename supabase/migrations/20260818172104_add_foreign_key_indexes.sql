create index if not exists calculations_user_id_idx on public.calculations(user_id);
create index if not exists calculations_reading_id_idx on public.calculations(reading_id);
create index if not exists calculations_property_id_idx on public.calculations(property_id);
create index if not exists calculations_tariff_version_id_idx on public.calculations(tariff_version_id);
create index if not exists properties_user_id_idx on public.properties(user_id);
create index if not exists readings_user_id_idx on public.readings(user_id);
create index if not exists tariff_tiers_tariff_version_id_idx on public.tariff_tiers(tariff_version_id);
