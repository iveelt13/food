import { NextFunction, Request, Response } from "express";

export const authorization =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    try {
      if (roles.includes(user.role)) {
        next();
      }

      if (!roles.includes(user.role)) {
        res
          .status(400)
          .send({ message: "Only Admins allowed to add menu, category etc." });
        return;
      }
    } catch (error) {
      res.status(500).send({
        message: "Aldaa garlaa",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
