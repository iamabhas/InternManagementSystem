import { Response } from "express";
import { FourErrorConstant } from "../../constants/statusCodeConstant";
const {
  VALIDATION_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  METHOD_NOT_ALLOWED,
} = FourErrorConstant;

type functionParam = (
  res: Response,
  statusCode: number,
  error: string,
  errorMessage: string
) => any;
export const handleFourStatusError: functionParam = (
  res: Response,
  statusCode: number,
  error: string,
  errorMessage: string
) => {
  if (
    typeof errorMessage !== "string" ||
    typeof statusCode !== "number" ||
    !statusCode.toString().startsWith("4")
  ) {
    return res.status(500).json({
      message: errorMessage,
      statusCode: statusCode,
      error,
      ErrorMessage: "The Message You Provided is not a Valid Message",
    });
  }
  switch (statusCode) {
    case VALIDATION_ERROR: {
      return res.status(statusCode).json({
        status: statusCode,
        title: "VALIDATION_ERROR",
        error,
        message: errorMessage,
      });
    }
    case UNAUTHORIZED: {
      return res.status(statusCode).json({
        status: statusCode,
        title: "UNAUTHORIZED",
        error,
        message: errorMessage,
      });
    }
    case FORBIDDEN: {
      return res.status(statusCode).json({
        status: statusCode,
        title: "FORBIDDEN",
        error,
        message: errorMessage,
      });
    }
    case NOT_FOUND: {
      return res.status(statusCode).json({
        status: statusCode,
        title: "NOT_FOUND",
        error,
        message: errorMessage,
      });
    }
    case METHOD_NOT_ALLOWED: {
      return res.status(statusCode).json({
        status: statusCode,
        title: "METHOD_NOT_ALLOWED",
        error,
        message: errorMessage,
      });
    }

    default:
      return res.status(500).json({
        message: "Un Matched Status Code",
      });
  }
};
