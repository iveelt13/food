import { FoodCategoryModel } from "../../models";
import { Request, Response } from "express";

type CategoryBody = {
  categoryName: string;
};

export const CategoryCreateController = async (req: Request, res: Response) => {
  const { categoryName } = req.body as CategoryBody;

  const existingCategory = await FoodCategoryModel.findOne({ categoryName });

  if (existingCategory) {
    res.status(400).send({ message: "Category exists" });
    return;
  }

  const newCategory = await FoodCategoryModel.create({
    categoryName,
  });

  const foodCategoryId = newCategory.id;

  res.status(201).send({ message: "Success", foodCategoryId });
};
