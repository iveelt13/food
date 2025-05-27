import { Router } from "express";
import {
  FoodMenuController,
  UpdateFoodMenu,
  DeleteFood,
  AllFoods,
  FoodsFilteredByCategory,
} from "../controllers";
import { AuthenticateUser, authorization } from "../middlewares";
import { UserRoleEnum } from "../models";

export const foodRouter = Router();

foodRouter
  .route("/")
  .post(AuthenticateUser, authorization(UserRoleEnum.ADMIN), FoodMenuController)
  .get(AllFoods);
foodRouter
  .route("/:foodId")
  .patch(AuthenticateUser, authorization(UserRoleEnum.ADMIN), UpdateFoodMenu)
  .delete(AuthenticateUser, authorization(UserRoleEnum.ADMIN), DeleteFood);
foodRouter.get("/:categoryId", FoodsFilteredByCategory);
