// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// type FoodCategory = {
//   _id: string;
//   categoryName: string;
// };

// type FoodMenu = {
//   _id: string;
//   categoryName: FoodCategory[];
//   foodName: string;
//   price: number;
//   image: string;
//   ingredients: string;
// };

// export const FoodMenu = () => {
//   const [categories, setCategories] = useState<FoodCategory[]>([]);
//   const [foods, setFoods] = useState<FoodMenu[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const [categoryResponse, foodResponse] = await Promise.all([
//         axios<FoodCategory[]>("http://localhost:8000/food-category"),
//         axios<FoodMenu[]>("http://localhost:8000/food"),
//       ]);
//       setCategories(categoryResponse.data);
//       setFoods(foodResponse.data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {categories.map((category) => (
//         <div key={category._id}>
//           <h2>{category.categoryName}</h2>
//           <ul>
//             {Array.isArray(foods) &&
//               foods
//                 .filter((food) =>
//                   food.categoryName.some(
//                     (category) => category._id === category.categoryName
//                   )
//                 )
//                 .map((food) => (
//                   <li key={food._id}>
//                     <img src={`food.image`} alt="" />
//                   </li>
//                 ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };
