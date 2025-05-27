import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

type FoodOrderUpdateBody = {
  status: string;
};

export const UpdateFoodOrderController = async (
  req: Request,
  res: Response
) => {
  const { status } = req.body as FoodOrderUpdateBody;
  const orderId = req.params.foodOrderId;

  await FoodOrderModel.findByIdAndUpdate(
    orderId,
    { status: status },
    { new: true }
  );

  res.status(201).send({ message: "Success" });
};
