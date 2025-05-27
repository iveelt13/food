import { sign, verify } from "jsonwebtoken";

const SECRETKEY = "my_secret";

export const generateNewToken = (
  payload: object,
  expiresIn = 6 * 60 * 60 * 1000
) => {
  return sign(payload, SECRETKEY, { expiresIn });
};

export const verifyToken = (token: string) => {
  return verify(token, SECRETKEY);
};
