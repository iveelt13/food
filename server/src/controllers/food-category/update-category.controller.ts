import { FoodCategoryModel } from "../../models";
import { Request, Response } from "express";

type CategoryChangeBody = {
  categoryName: string;
};

export const UpdateFoodCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.body as CategoryChangeBody;
  const categoryId = req.params.foodCategoryId;

  await FoodCategoryModel.findByIdAndUpdate(
    categoryId,
    { catergoryName: categoryName },
    { new: true }
  );

  res.status(201).send({ message: "Success" });
};
