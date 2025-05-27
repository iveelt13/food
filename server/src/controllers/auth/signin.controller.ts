import { Request, Response } from "express";
import { UserModel } from "../../models";
import { decryptHash, generateNewToken } from "../../utils";

type UserBody = { email: string; password: string };

export const SignInController = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserBody;

  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    res.status(400).send({ message: "User not exists" });
    return;
  }

  const checkPassword = decryptHash(password, existingUser?.password);

  if (!checkPassword) {
    res.status(400).send({ message: "Your password is wrong" });
    return;
  }

  const newtokenForSignin = generateNewToken(
    { userId: existingUser._id },
    24 * 60 * 60 * 1000
  );

  res
    .status(201)
    .send({ message: "Success!", newtokenForSignin, existingUser });
};
