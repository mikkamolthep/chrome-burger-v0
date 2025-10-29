--Exercise 1
-- Write a query to see a list of all employees working at Chrome & Burger.

-- select * from staff

--Exercise 2
-- Write a query to find all menu items that fall under the 'Burger' category.

-- SELECT * FROM menuitems
-- WHERE category = 'Burger'

--Exercise 3
-- Write a query to show all menu items, but list them from the most expensive to the least expensive.

-- SELECT * FROM menuitems
-- ORDER BY price DESC

--Exercise 4
-- Write a query to find the three cheapest items available on the menu.

-- SELECT name, price
-- FROM menuitems
-- ORDER BY price ASC
-- LIMIT 3

--Exercise 5
-- Write a query to find all the ingredients supplied by 'Patty''s Premium Meats'.

-- SELECT ingredients.name
-- FROM ingredients
-- JOIN suppliers on ingredients.supplier_id = suppliers.supplier_id
-- WHERE suppliers.name = 'Patty''s Premium Meats';

--Exercise 6
-- Write a query to see all orders processed by the staff member with staff_id = 1

-- SELECT *
-- FROM orders
-- WHERE staff_id =1

--Exercise 7
-- Write a query to find out how many orders each staff member has processed. Show the staff member's first name, last name, and their total order count.

-- SELECT staff.first_name, staff.last_name,COUNT(orders.order_id) AS total_order
-- FROM staff
-- JOIN orders ON orders.staff_id = staff.staff_id
-- GROUP BY staff.staff_id
-- ORDER BY total_order DESC

--Exercise 8
-- Write a query to calculate the total revenue for each day of sales.

-- SELECT 
--   DATE(orders.order_date) AS sale_day,
--   sum(orders.total_price) AS total_revenue
-- FROM orders
-- -- GROUP BY DATE(orders.order_date) -- แบบนี้ก็ได้นะ ต้องเอา AS ออก
-- -- ORDER BY DATE(orders.order_date) -- เรียงตามวัน
-- GROUP BY sale_day
-- ORDER BY total_revenue --เรียงตามรายได้
-- -- ORDER BY sum(orders.total_price) -- แบบนี้ก็ได้นะ ต้องเอา AS ออก

--Exercise 9
-- Write a query to find out which menu item has been ordered the most.

-- SELECT menuitems.name,SUM(orderitems.quantity) AS total
-- FROM menuitems
-- JOIN orderitems ON menuitems.item_id = orderitems.item_id
-- GROUP BY menuitems.name
-- ORDER BY total DESC

--Exercise 10
-- List All Ingredients for the 'Bacon Cheeseburger'

SELECT 
  ingredients.name,
  recipeitems.quantity_needed,
  Ingredients.unit
FROM recipeitems
JOIN ingredients ON recipeitems.ingredient_id = ingredients.ingredient_id
JOIN menuitems ON recipeitems.item_id = menuitems.item_id
WHERE menuitems.name = 'Bacon Cheeseburger'