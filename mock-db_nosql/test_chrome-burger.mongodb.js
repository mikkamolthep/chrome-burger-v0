
//Exercise1 
// slide 135
//Write a query to see a list of all employees working at Chrome & Burger.

use("chrome-burger-db");
// db.staff.find();


//Exercise 2 
// slide 136
//Write a query to find all menu items that fall under the 'Burger' category.

// db.menu_items.find({category:"Burger"})


//Exercise 3 
// slide 137
// Write a query to show all menu items, but list them from the most expensive to the least expensive.

// db.menu_items.find({},{_id:0,name:1,price:1}).sort({price:-1})
// {} เปล่าคือ เลือกทุก Doc เนื่องจากใช้ sort และ sort ใช้เรียงลำดับ -1 คือ มาก>น้อย


//Exercise 4
// slide 138
//Write a query to find the three cheapest items available on the menu.

// db.menu_items.find({},{_id:0,name:1,price:1}).sort({price:1}).limit(1)
//หาที่ราคาถูกสุด


//Exercise 5
// slide 139
//Write a query to find all the ingredients supplied by 'Patty''s Premium Meats'.

// db.ingredients.aggregate([  
//   //aggregate ใช้ ประมวลผลข้อมูลแบบซับซ้อนกว่า find(), ประมวลผลข้อมูลหลายขั้นตอน
//   {
//     $lookup: {            
//       // lookup ทำหน้าที่เหมือน JOIN ใน SQL
//       from: "suppliers",
//       localField: "supplier_id",   
//       //localField = ฟิลด์ใน collection ปัจจุบัน (ingredients)
//       foreignField: "_id", 
//       //foreignField = ฟิลด์ใน collection ที่จะเอามาแมทช์กับ localField (supplier)
//       as: "supplier_info" 
//       //กำหนดชื่อใหม่
//     }
//   },
//   {
//     $match:{"supplier_info.name":"Patty's Premium Meats"} 
//   }, // $match กรองเอกสารที่ "supplier_info.name" และใช้ .name เพราะfield name อยู่ ภายใน document ของ suppliers
//   {
//     $project: {
//       _id:0,
//       name:1
//     }
//   }
// ])


//Exercise 6
// slide 140
//Write a query to see all orders processed by the staff member Jane Doe.

// db.orders.find(
//   {
//     "staff.first_name":"Jane",
//     "staff.last_name":"Doe"
//   },
//   {
//     _id: 0,
//     items: 1,
//     order_date:1,
//     total_price:1
//   }
// );

// //First, find Jane's staff ID
// var jane = db.staff.findOne({first_name: "Jane", last_name: "Doe"});

// // Then, find all orders processed by her
// db.orders.find({ "staff.staff_id": jane._id });


//Exercise 7
// slide 141
//Write a query to find out how many orders each staff member has processed. Show the staff member's first name, last_name, and their total order count.

// db.orders.aggregate([
//   {
//     $group: {
//       _id: "$staff.staff_id",                 // รวมตามพนักงานแต่ละคน
//       first_name: { $first: "$staff.first_name" },  // เอาชื่อแรกของแต่ละกลุ่มมา
//       last_name: { $first: "$staff.last_name" },    // เอานามสกุลแรกของแต่ละกลุ่มมา
//       order_count: { $sum: 1 }                // นับจำนวนออเดอร์ของแต่ละพนักงาน
//     }
//   },
//   {
//     $sort: { order_count: -1 }                // เรียงจากคนที่มีออเดอร์มาก → น้อย
//   },
//   {
//     $project: {                               // แสดงเฉพาะ field ที่ต้องการ
//       _id: 0,
//       first_name: 1,
//       last_name: 1,
//       order_count: 1
//     }
//   }
// ]);


//Exercise 8
// slide 142
//Write a query to calculate the total revenue for each day of sales

// db.orders.aggregate([
//   {
//     $group: {
//       _id: { $dateToString: { format: "%Y-%m-%d", date: "$order_date" } },
//       daily_revenue: { $sum: "$total_price" }
//     }
//   },
//   {
//     $project: {
//         _id: 0,
//         sales_day: "$_id",
//         daily_revenue: 1
//     }
//   },
//   {
//     $sort: {
//       sales_day: 1
//     }
//   }
// ]);

//Exercise 9
// slide 143
//Write a query to find out which menu item has been ordered the most.

// db.orders.aggregate([
//   {
//     $unwind: "$items"
//   },
//   {
//     $group: {
//       _id: "$items.name",
//       total_sold: { $sum: "$items.quantity" }
//     }
//   },
//   {
//       $project: {
//           _id: 0,
//           name: "$_id",
//           total_sold: 1
//       }
//   },
//   {
//     $sort: {
//       total_sold: -1
//     }
//   },
//   {
//     $limit: 1
//   }
// ]);

//Exercise 10
// slide 144
//Write a query that lists all the ingredients and their quantities needed for the 'Bacon Cheeseburger'.

// db.menu_items.aggregate([
//     {
//         $match: { name: "Bacon Cheeseburger" }
//     },
//     {
//         $unwind: "$recipe"
//     },
//     {
//         $lookup: {
//             from: "ingredients",
//             localField: "recipe.ingredient_id",
//             foreignField: "_id",
//             as: "ingredient_detail"
//         }
//     },
//     {
//         $unwind: "$ingredient_detail"
//     },
//     {
//         $project: {
//             _id: 0,
//             name: "$recipe.name",
//             quantity_needed: "$recipe.quantity_needed",
//             unit: "$ingredient_detail.unit"
//         }
//     }
// ]);