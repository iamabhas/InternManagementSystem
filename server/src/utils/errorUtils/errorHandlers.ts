import { Request, Response, NextFunction } from "express";
import AppError from "./appError";
interface CustomError extends Error {
  statusCode?: any;
  status?: string;
  path?: any;
  value?: any;
  isOperational: true;
}

const handleCastErrorDB = (error: CustomError) => {
  const message = `Invalid.`;
  return new AppError(message, 400);
};
const sendErrorDev = (error: CustomError, res: Response) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (error: CustomError, res: Response) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went very wrong",
    });
  }
};

export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  switch (process.env.NODE_ENV) {
    case "development":
      sendErrorDev(err, res);
      break;
    case "production":
      if (err.name === "JsonWebTokenError") {
        {
          return res.status(500).json({
            status: "fail",
          });
        }
      }
      sendErrorProd(err, res);

      break;
    default:
      // Handle other environments (if needed)
      sendErrorProd(err, res);
  }
};
