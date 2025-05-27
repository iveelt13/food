import { Request, Response } from "express";
import { FoodModel } from "../../models";

export const AllFoods = async (req: Request, res: Response) => {
  const foods = await FoodModel.find().populate({
    path: "category",
    model: "FoodCategory",
  });

  res.status(200).send({ foods });
};
