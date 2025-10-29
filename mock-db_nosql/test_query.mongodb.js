use("sample_mflix");

// db.theaters.find({ "location.address.state": "AL" }).count() // เข้าถึง field > state ที่อยู่ใน address ของ location // สไลด์ 48

// db.theaters.find({ "location.address.city": "La Quinta" }).count() // 49

// db.theaters.findOne({ "location.address.city": "La Quinta" }) // 50

// db.movies.find({
//   countries: {$in: ["USA"]},
//   year: {$gte: 1950, $lte: 1970}
// }) // 71

// db.movies.find({ 
//   genres: { $all: ["Drama", "History"] },
//   released: { $gt: ISODate("1970-01-01T00:00:00Z") }
// }).count() // 72

// db.movies.find({ cast: "Roy L. McCardell" }).count() //73

// db.movies.find({ directors: "Hal Roach" }).count() //74

// db.movies.find({ directors: { $in: ["Hal Roach"] } }); // ใน $in คือเงื่อนไขในการหา สามารถเพิ่มชื่อ คนอื่นต่อได้ คั่นโดย , // 75 

// db.movies.find(
// { 
// directors: { $in: ["Hal Roach"] } 
// }, 
// {
// title: 1, 
// "awards.wins": 1, _id: 0 
// }
// ); // 76

// db.movies.find(
//   {
//     year: 1995,              // condition #1
//     genres: "Action"         // condition #2  → implicit AND
//   },
//   { _id: 0, title: 1, year: 1, genres: 1 }   // projection
// ); 
// 77

// db.movies.find(
//   {
//     $or: [
//       { languages: "French" },
//       { languages: "Spanish" }
//     ]
//   },
//   { _id: 0, title: 1, languages: 1 }
// ); // 78 // 0 คือไม่แสดงค่า 1 คือแสดง

// db.movies.find(
//   {
//     year: { $gt: 2010 },                         
//     $or: [
//       { genres: "Drama" },                       
//       { "imdb.rating": { $gte: 8 } }             
//     ]
//   },
//   { _id: 0, title: 1, year: 1, genres: 1, "imdb.rating": 1 }
// ).limit(10); //อันนี้ต้องผ่านเงื่อนไขแรกก่อน คือ 2010 แล้วค่อยดูเงื่อนไขใน or //79

// db.movies.aggregate([
// 	{$match: {directors: "Christopher Nolan"}},
// 	{$sort: {year: -1}},
// 	{$limit: 5},
// 	{$project: {_id: 0, title: 1, year: 1}}
// ]) 
// 115

db.movies.aggregate([
  { $match: { year: { $gte: 2000, $lte: 2010 } } },
  { $group: { _id: "$year", totalMovies: { $sum: 1 } } },
  { $sort: { _id: 1 } },
  {$project: { _id:0, year:"$_id",Total:"$totalMovies"
  }}
]); 
//116 // project ทำเอง