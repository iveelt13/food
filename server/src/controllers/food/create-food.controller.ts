import { Request, Response } from "express";
import { FoodModel } from "../../models";

type FoodBody = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

export const FoodMenuController = async (req: Request, res: Response) => {
  const { foodName, price, image, ingredients, category } =
    req.body as FoodBody;

  if (!foodName || !price || !image || !ingredients) {
    res.status(400).send({ message: "Provide all details!" });
    return;
  }

  await FoodModel.create({
    foodName,
    price,
    image,
    ingredients,
    category,
  });

  res.status(201).send({ message: "Success" });
};
