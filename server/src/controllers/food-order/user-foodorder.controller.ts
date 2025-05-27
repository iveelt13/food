import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

export const UserFoodOrder = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userOrders = await FoodOrderModel.findOne({
    user: userId,
  });

  const totalUserOrder = await FoodOrderModel.countDocuments({
    user: userId,
  });

  res.status(200).send({ userOrders });
};
