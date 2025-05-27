import { FoodCategoryModel } from "../../models";
import { Request, Response } from "express";

type CategoryBody = {
  catergoryName: string;
};

export const CategoryCreateController = async (req: Request, res: Response) => {
  const { catergoryName } = req.body as CategoryBody;

  const existingCategory = await FoodCategoryModel.findOne({ catergoryName });

  if (existingCategory) {
    res.status(400).send({ message: "Category exists" });
    return;
  }

  const newCategory = await FoodCategoryModel.create({
    catergoryName,
  });

  const foodCategoryId = newCategory.id;

  res.status(201).send({ message: "Success", foodCategoryId });
};
