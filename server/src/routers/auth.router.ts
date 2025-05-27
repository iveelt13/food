import { Router } from "express";
import {
  SignInController,
  SignUpController,
  VerifyUserController,
  SendEmailForResetPasswordController,
  ChangePassword,
} from "../controllers";
import { VerifyResetPasswordRequestController } from "../controllers";

export const authRouter = Router();

authRouter.post("/sign-up", SignUpController);
authRouter.post("/sign-in", SignInController);
authRouter.get("/verify-user", VerifyUserController);

authRouter.get("/verify-email", VerifyResetPasswordRequestController);
authRouter.post(
  "/send-email-for-reset-password",
  SendEmailForResetPasswordController
);
authRouter.post("/change-password", ChangePassword);
