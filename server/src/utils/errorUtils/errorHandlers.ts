import { Request, Response, NextFunction } from "express";
import AppError from "./appError";
import { CustomError } from "../../@types/interface/customError";

const sendErrorDev = (error: CustomError, res: Response) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stack: error.stack,
  });
};

export const globalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  sendErrorDev(error, res);
};
