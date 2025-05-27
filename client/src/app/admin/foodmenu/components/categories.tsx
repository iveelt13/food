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

type FoodCategory = {
  _id: string;
  categoryName: string;
};

type AllFoodCategories = {
  categories: FoodCategory[];
};

export const CategoriesForAdmin = () => {
  const { push } = useRouter();
  const [data, setData] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios<AllFoodCategories>(`http://localhost:8000/food-category`)
      .then((res) => {
        setData(res.data?.categories);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6 bg-[#FFFFFF] border rounded-xl w-230">
      <h4 className="font-semibold text-[20px]">Dishes category</h4>
      <div className="flex gap-4">
        <Button className="border rounded-full bg-white text-black border-[#E4E4E7] justify-center items-center cursor-pointer">
          All Dishes
        </Button>
        {data.map((category) => (
          <Button
            key={category._id}
            className="border rounded-full bg-white text-black border-[#E4E4E7] justify-center items-center cursor-pointer"
          >
            {category.categoryName}
          </Button>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border rounded-full flex bg-[#EF4444] text-white"
            >
              +
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-10">
            <DialogHeader>
              <DialogTitle>Add new category</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-5">
              <Label className="items-start">Category name</Label>
              <Input id="name" placeholder="Type category name..." />
            </div>
            <DialogFooter>
              <Button type="submit">Add category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* <div className="flex flex-col gap-4">
        {data.slice(5, 10).map((category) => (
          <p
            key={category._id}
            className="cursor-pointer hover:underline text-white"
          >
            {category.categoryName}
          </p>
        ))}
      </div> */}
    </div>
  );
};
