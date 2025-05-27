import { Schema } from "mongoose";
import { FoodModel } from "../../models";
import { Request, Response } from "express";

type FoodMenuChangeBody = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: Schema.Types.ObjectId[];
};

export const UpdateFoodMenu = async (req: Request, res: Response) => {
  const { foodName, price, image, ingredients, category } =
    req.body as FoodMenuChangeBody;
  const foodId = req.params.foodId;

  await FoodModel.findByIdAndUpdate(
    foodId,
    { foodName, price, image, ingredients, category },
    { new: true }
  );

  res.status(201).send({ message: "Success" });
};
