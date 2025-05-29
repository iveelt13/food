import { Request, Response } from "express";
import { FoodCategoryModel, FoodModel } from "../../models";

export const AllCategories = async (req: Request, res: Response) => {
  const categories = await FoodCategoryModel.find();
  const foods = await FoodModel.find();

  const allFilteredFoods = categories.map(({ _id, categoryName }) => {
    const foodsByCategory = foods.filter((food) => {
      const foodCategories = food.category || [];
      return foodCategories.some(
        (category: any) => String(category) === String(_id)
      );
    });
    return { _id, categoryName, foods: foodsByCategory };
  });

  if (!allFilteredFoods.length) {
    res.status(404).json({ message: "No foods found" });
  }

  res.status(200).send({ allFilteredFoods });
};
