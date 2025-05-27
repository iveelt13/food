import { Request, Response } from "express";
import { UserModel } from "../../models";
import {
  generateNewTokenForReset,
  sendUserVerificationLink,
} from "../../utils";

type UserEmail = {
  email: string;
};

export const SendEmailForResetPasswordController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body as UserEmail;

  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    res.status(400).send({ message: "User not exists, create a new profile" });
    return;
  }

  const token = generateNewTokenForReset({ userId: existingUser._id });

  sendUserVerificationLink(
    `${req.protocol}://${req.get("host")}/auth/verify-email?token=${token}`,
    email
  );

  res.status(200).send({ message: "Success" });
};
