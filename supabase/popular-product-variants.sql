begin;

alter table public.products
  add column if not exists variants jsonb not null default '[]'::jsonb;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'products_variants_array_check'
      and conrelid = 'public.products'::regclass
  ) then
    alter table public.products
      add constraint products_variants_array_check
      check (jsonb_typeof(variants) = 'array');
  end if;
end;
$$;

create temporary table popular_variant_groups on commit drop as
with matched_products as (
  select
    id,
    name,
    price,
    regexp_match(
      name,
      '^(.*?)\s+((?:\d+(?:[./-]\d+)*(?:x\d+(?:[./-]\d+)*)?(?:mm2?|in|m|liter|litre|gal|ft|kg)(?:\s+(?:[a-z]+-\d+(?:\.\d+)?|[a-z]+-series|female|male|single|double|m/f))?(?:\s*,\s*.+)?|\d+(?:-\d+)+(?:\s+(?:female|male))?|\d+\s+(?:pair|core)(?:,\s*\d+m\s+coil|\s+per meter)|\d+m\s+coil|per kg))$',
      'i'
    ) as parts,
    coalesce(
      (regexp_match(id, '^price-list-([0-9]+)-'))[1]::bigint,
      9223372036854775807
    ) as source_order
  from public.products
  where brand = 'Popular'
    and jsonb_array_length(variants) = 0
),
variant_rows as (
  select
    id,
    parts[1] as base_name,
    parts[2] as size,
    price,
    source_order
  from matched_products
  where parts is not null
),
grouped as (
  select
    base_name,
    (array_agg(id order by source_order, id))[1] as keep_id,
    jsonb_agg(
      jsonb_build_object('size', size, 'priceAmount', price, 'productId', id)
      order by source_order, id
    ) as variants,
    count(*) as variant_count
  from variant_rows
  group by base_name
  having count(*) > 1
)
select
  grouped.base_name,
  grouped.keep_id,
  grouped.variants,
  variant_rows.id as member_id
from grouped
join variant_rows using (base_name);

update public.products as product
set
  name = grouped.base_name,
  price = (grouped.variants -> 0 ->> 'priceAmount')::numeric,
  variants = grouped.variants
from (
  select distinct base_name, keep_id, variants
  from popular_variant_groups
) as grouped
where product.id = grouped.keep_id;

delete from public.products as product
using popular_variant_groups as grouped
where product.id = grouped.member_id
  and grouped.member_id <> grouped.keep_id;

commit;
