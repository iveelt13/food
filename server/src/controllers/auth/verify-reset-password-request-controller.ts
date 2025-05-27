import { Request, Response } from "express";
import { verifyResetPasswordToken } from "../../utils";
import { UserModel } from "../../models";

export const VerifyResetPasswordRequestController = async (
  req: Request,
  res: Response
) => {
  const token = String(req.query.token);

  const decodedToken = verifyResetPasswordToken(token) as { userId: string };

  const existingUser = await UserModel.findById(decodedToken.userId);

  if (!existingUser) {
    res.status(400).send({ message: "User not exists, create a new profile" });
    return;
  }

  res.redirect(
    `${process.env.FRONTEND_ENDPOINT}/reset-password?token=${token}`
  );
};
