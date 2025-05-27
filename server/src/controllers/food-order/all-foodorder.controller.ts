import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

export const AllFoodOrder = async (req: Request, res: Response) => {
  const orders = await FoodOrderModel.find()
    .populate("user")
    .populate({ path: "foodOrderItems.food", model: "food" });

  res.status(200).send({ orders });
};
