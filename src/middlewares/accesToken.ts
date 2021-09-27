import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization;
    verify(token!, (process.env.JWT_SECRET = "secret"));
    if (!token)
      return res.status(403).send({ status: false, message: "No authorization" });
    return next();
  } catch (error) {
    return res.status(403).send({ status: false, message: "No authorization" });
  }
};
