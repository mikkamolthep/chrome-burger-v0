-- select *
-- from orders
-- WHERE staff_id =1 --ทำเองข้อ 6 และผู้สอนก็ทำเหมือนกัน--

-- SELECT staff.staff_id, first_name, last_name, COUNT(staff.staff_id)
-- FROM orders
-- JOIN staff ON orders.staff_id = staff.staff_id
-- GROUP BY staff.staff_id --ของผู้เรียน--

-- SELECT
--     s.first_name,
--     s.last_name,
--     COUNT(o.order_id) AS order_count
-- FROM Staff s
-- JOIN Orders o ON s.staff_id = o.staff_id
-- GROUP BY s.staff_id
-- ORDER BY order_count DESC; --ของผู้สอน--


-- select staff.staff_id, first_name, last_name, count(staff.staff_id) 
-- from orders 
-- join staff on orders.staff_id = staff.staff_id 
-- GROUP BY staff.staff_id 
-- ORDER BY staff.staff_id asc;

-- SELECT 
--   staff.first_name, 
--   staff.last_name, 
--   COUNT(orders.order_id) as order_count
-- FROM orders
-- JOIN staff ON orders.staff_id = staff.staff_id
-- ORDER BY order_count; --*ข้อ 7*--

-- SELECT 
--   DATE(order_date) as sale_date,
--   sum(total_price) as revenue
-- FROM orders
-- GROUP BY DATE(order_date)
-- ORDER BY sale_date; --*ข้อ 8*--

-- SELECT menuitems.name AS name,
--   sum(orderitems.quantity) AS ordered
-- from menuitems
-- join orderitems on menuitems.item_id = orderitems.item_id
-- GROUP BY menuitems.name
-- order BY ordered DESC
-- LIMIT 1 ; -- ข้อ9 --

-- select 
--   ingredients.name,
--   recipeitems.quantity_needed,
--   ingredients.unit
-- from recipeitems -- ให้ตัวนี้ขึ้นก่อน เพราะเป็นตัวเชื่อมกลางที่มีชื่อคอมลัมน์ของทั้ง 2 ตาราง
-- JOIN menuitems ON recipeitems.item_id = menuitems.item_id
-- JOIN ingredients ON recipeitems.ingredient_id = ingredients.ingredient_id
-- where menuitems.name = 'Bacon Cheeseburger';
-- menuitems >> item_id
-- recipeitems >> item_id 
            -- >> ingredient_id
-- ingredients >> ingredient_id


-----------------------------------------------------------
-- SELECT
--     i.name,
--     ri.quantity_needed,
--     i.unit
-- FROM RecipeItems ri
-- JOIN MenuItems mi ON ri.item_id = mi.item_id
-- JOIN Ingredients i ON ri.ingredient_id = i.ingredient_id
-- WHERE mi.name = 'Bacon Cheeseburger'; -- เฉลย --


SELECT
  ingredients.name,
  recipeitems.quantity_needed,
  ingredients.unit
FROM recipeitems
JOIN ingredients ON recipeitems.ingredient_id = ingredients.ingredient_id
JOIN menuitems ON recipeitems.item_id = menuitems.item_id
WHERE menuitems.name = 'Bacon Cheeseburger'
