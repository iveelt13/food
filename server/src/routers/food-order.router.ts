import { Router } from "express";
import {
  FoodOrderCreateController,
  UpdateFoodOrderController,
  UserFoodOrder,
  AllFoodOrder,
} from "../controllers";
import { AuthenticateUser, authorization } from "../middlewares";
import { UserRoleEnum } from "../models";

export const foodOrderRouter = Router();

foodOrderRouter
  .route("/")
  .post(AuthenticateUser, FoodOrderCreateController)
  .get(AllFoodOrder);
foodOrderRouter.patch(
  "/:foodOrderId",
  AuthenticateUser,
  authorization(UserRoleEnum.ADMIN),
  UpdateFoodOrderController
);
foodOrderRouter.get("/:userId", UserFoodOrder);
