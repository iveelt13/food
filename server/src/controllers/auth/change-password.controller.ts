import { Request, Response } from "express";
import { UserModel } from "../../models";
import { encryptHash } from "../../utils";
import { verifyResetPasswordToken } from "../../utils";

type NewPassWordBody = {
  newPassword: string;
};

export const ChangePassword = async (req: Request, res: Response) => {
  const { newPassword } = req.body as NewPassWordBody;

  const token = String(req.query.token);

  const decodedToken = verifyResetPasswordToken(token) as { userId: string };
  const hashedPassword = encryptHash(newPassword);

  await UserModel.findByIdAndUpdate(
    decodedToken.userId,
    { password: hashedPassword },
    { new: true }
  );

  res.redirect(`${process.env.FRONTEND_ENDPOINT}/login`);
};
