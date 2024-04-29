import { NextFunction, Request, Response } from "express";
import { ICustomError } from "../@types/interface/customError";
export const errorHandler = (
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message, err.name);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  return res.status(403).json({
    statuscode: err.statusCode,
    message: err.message,
    status: err.name,
  });
};
