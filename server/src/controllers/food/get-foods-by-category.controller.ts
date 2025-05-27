import { Request, Response } from "express";
import { FoodModel } from "../../models";

export const FoodsFilteredByCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const categoryfoods = await FoodModel.findOne({ category: categoryId });

  if (!categoryId) {
    res.status(400).send({ message: "no food" });
  }

  res.status(200).send({ categoryfoods });
};
