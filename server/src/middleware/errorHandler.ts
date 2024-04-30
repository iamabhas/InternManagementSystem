import { NextFunction, Request, Response } from "express";
import { CustomError } from "../@types/interface/customRequest";
import { statusConstants } from "../constants/statusConstants";
import { HTTPStatusCode } from "../constants/statusCodeConstant";
const { InternalServerError } = HTTPStatusCode;
const { ERROR } = statusConstants;
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message, err.name);
  err.statusCode = err.statusCode || InternalServerError;
  err.status = err.status || ERROR;

  return res.status(403).json({
    statuscode: err.statusCode,
    message: err.message,
    status: err.name,
  });
};
