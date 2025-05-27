import { FoodModel } from "../../models";
import { Request, Response } from "express";

export const DeleteFood = async (req: Request, res: Response) => {
  const foodId = req.params.foodId;

  await FoodModel.findByIdAndDelete(foodId);

  res.status(201).send({ message: "Success" });
};
