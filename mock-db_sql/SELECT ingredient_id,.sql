SELECT ingredient_id,
       name,
       stock_level,
       unit,
       supplier_id
FROM public.ingredients
LIMIT 1000;