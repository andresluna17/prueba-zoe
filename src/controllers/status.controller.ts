import { Request, Response } from "express";

export const getStatus = (req: Request, res: Response) => {
  return res.status(200).json({
    status: true,
    message: "Api listen on port 3000"
  });
};
