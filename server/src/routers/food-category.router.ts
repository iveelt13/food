import { Router } from "express";
import {
  AllCategories,
  CategoryCreateController,
  DeleteFoodCategory,
  UpdateFoodCategory,
} from "../controllers";
import { AuthenticateUser, authorization } from "../middlewares";
import { UserRoleEnum } from "../models";

export const categoryRouter = Router();

categoryRouter
  .route("/")
  .post(
    AuthenticateUser,
    authorization(UserRoleEnum.ADMIN),
    CategoryCreateController
  )
  .get(AllCategories);

categoryRouter
  .route("/:foodCategoryId")
  .patch(
    AuthenticateUser,
    authorization(UserRoleEnum.ADMIN),
    UpdateFoodCategory
  )
  .delete(
    AuthenticateUser,
    authorization(UserRoleEnum.ADMIN),
    DeleteFoodCategory
  );
