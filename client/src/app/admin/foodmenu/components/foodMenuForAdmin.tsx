"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pen } from "lucide-react";

type FoodCategory = {
  _id: string;
  categoryName: string;
};

type FoodType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

type AllFoodCategories = {
  categories: FoodCategory[];
};

type AllFood = {
  foods: FoodType[];
};

const FoodMenuForAdmin = () => {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [cateforyData, setCategoryData] = useState<FoodCategory[]>([]);
  const [foodData, setFoodData] = useState<FoodType[]>(Object);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<AllFoodCategories>(
          "http://localhost:8000/food-category"
        );
        setCategoryData(response.data?.categories || []);
      } catch (error: any) {
        setError(error.message || "Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  console.log(cateforyData);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get<AllFood>("http://localhost:8000/food");
        setFoodData(response.data?.foods || []);
      } catch (error: any) {
        setError(error.message || "Failed to fetch foods");
      }
    };
    fetchFood();
  }, []);

  console.log(foodData);

  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.isArray(foodData) &&
        foodData.map((food) => (
          <div className="flex flex-col gap-5 p-4 border rounded-md border-[#E4E4E7]">
            <div className="h-32 rounded-md relative">
              <img
                className="rounded-md w-[238.75px] h-[129px]"
                src={food.image}
                alt={food.foodName}
              />
              <Button
                key={food._id}
                className="bg-white rounded-full absolute z-2 w-11 h-11 top-18 left-46"
              >
                <Pen className="text-[#EF4444]" />
              </Button>
            </div>
            <div className="w-[238.75px]">
              <div className="flex justify-between">
                <p className="text-[#EF4444] font-medium text-sm">
                  {food.foodName}
                </p>
                <p className="text-[12px]">${food.price}</p>
              </div>
              <p className="">{food.ingredients}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FoodMenuForAdmin;
