import { Request, Response } from "express";
import { UserModel } from "../../models";
import { encryptHash } from "../../utils";
import { verifyResetPasswordToken } from "../../utils";

type NewPassWordBody = {
  userId: number;
  newPassword: string;
};

export const ChangePassword = async (req: Request, res: Response) => {
  const { newPassword } = req.body as NewPassWordBody;

  // if (!newPassword || newPassword.length < 6) {
  //   return res.status(400).json({
  //     message: "New password must be at least 6 characters.",
  //   });
  // }

  let token = String(req.query.token);

  // const tokenPayload = verifyResetPasswordToken(token);
  // const userId = (tokenPayload && typeof tokenPayload !== "string") ? tokenPayload.userId : null;

  // if(!userId) {
  //   return res.status(400).json({
  //     message: "Invalid or expired token.",
  //   });
  // }

  const decodedToken = verifyResetPasswordToken(token) as { userId: string };
  const hashedPassword = encryptHash(newPassword);

  await UserModel.findByIdAndUpdate(
    decodedToken.userId,
    { password: hashedPassword },
    { new: true }
  );

  res.redirect(
    `${process.env.FRONTEND_ENDPOINT}/reset-password?token=${token}`
  );
};
