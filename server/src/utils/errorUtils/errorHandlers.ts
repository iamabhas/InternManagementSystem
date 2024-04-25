import { Request, Response, NextFunction } from "express";
import AppError from "./appError";
interface CustomError extends Error {
  statusCode?: any;
  status?: string;
  path?: any;
  value?: any;
}

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
