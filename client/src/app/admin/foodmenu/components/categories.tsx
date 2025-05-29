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
  const [isOpen, setIsOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [data, setData] = useState<FoodCategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<AllFoodCategories>(
        "http://localhost:8000/food-category"
      );
      setData(response.data?.categories || []);
    } catch (error: any) {
      setError(error.message || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    setIsOpen(true);
    try {
      const token =
        typeof window !== "undefined" && localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/food-category",
        { categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("New Category is being added to the menu");

      setCategoryName("");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-[#FFFFFF] border rounded-xl w-230">
      <h4 className="font-semibold text-[20px]">Dishes category</h4>

      <div className="flex gap-4 flex-wrap">
        <Button className="border rounded-full bg-white text-black border-[#E4E4E7]">
          All Dishes
        </Button>

        {data.map((category) => (
          <Button
            key={category._id}
            className="border rounded-full bg-white text-black border-[#E4E4E7]"
          >
            {category.categoryName}
          </Button>
        ))}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="border rounded-full bg-[#EF4444] text-white px-4">
              +
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-10">
            <DialogHeader>
              <DialogTitle>Add new category</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-5">
              <Label>Category name</Label>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Type category name..."
              />
            </div>

            <DialogFooter>
              <Button
                onClick={handleAddCategory}
                disabled={!categoryName.trim() || adding}
              >
                {adding ? "Adding..." : "Add category"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CategoriesForAdmin;
