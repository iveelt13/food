import { sign, verify } from "jsonwebtoken";

const SECRETKEY = "my_secret";

export const generateNewTokenForReset = (payload: object) => {
  return sign(payload, SECRETKEY, { expiresIn: "2h" });
};

export const verifyResetPasswordToken = (token: string) => {
  return verify(token, SECRETKEY);
};
