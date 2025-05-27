import { FoodCategoryModel } from "../../models";
import { Request, Response } from "express";

export const DeleteFoodCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.foodCategoryId;

  await FoodCategoryModel.findByIdAndDelete(categoryId);

  res.status(201).send({ message: "Success" });
};
