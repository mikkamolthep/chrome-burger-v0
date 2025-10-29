SELECT order_item_id,
       order_id,
       item_id,
       quantity
FROM public.orderitems
LIMIT 1000;