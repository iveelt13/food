import { Request, Response } from "express";
import { FoodOrderModel, UserModel } from "../../models";

type FoorOrderItem = {
  food: string;
  quantity: number;
};

type FoodOrderBody = {
  user: string;
  totalPrice: number;
  foodOrderItems: FoorOrderItem[];
  status: string;
};

export const FoodOrderCreateController = async (
  req: Request,
  res: Response
) => {
  const { user, totalPrice, foodOrderItems, status } =
    req.body as FoodOrderBody;

  if (!user || !totalPrice || !foodOrderItems || !status) {
    res.status(400).send({ message: "Provide all details!" });
    return;
  }

  const { _id } = await FoodOrderModel.create({
    user,
    totalPrice,
    foodOrderItems,
    status,
  });

  await UserModel.updateOne({
    $push: { orderedFoods: _id },
  });

  res.status(201).send({ message: "Success" });
};
