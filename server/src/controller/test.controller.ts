import { Request, Response } from "express";

export const TestController = async (req: Request, res: Response) => {
  console.log(req.body);
  return res.status(200).json({
    message: "Test Controller",
  });
};
