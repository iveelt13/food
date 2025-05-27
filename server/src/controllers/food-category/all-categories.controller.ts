import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

export const AllCategories = async (req: Request, res: Response) => {
  const categories = await FoodCategoryModel.find();

  res.send(200).send({ categories });
};
