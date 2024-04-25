import { TwoResponseConstant } from "../../constants/statusCodeConstant";
const { OK, CREATED, ACCEPTED, NON_AUTHORITATIVE_INFORMATION, NO_CONTENT } =
  TwoResponseConstant;
import { Response } from "express";

type functionParam = (
  res: Response,
  statusCode: number,
  Status: boolean,
  error: string,
  id?: any
) => any;
export const handleTwoStatusResponse: functionParam = (
  res: Response,
  statusCode: number,
  Status: boolean,
  error: string,
  id?: any
) => {
  if (
    typeof error !== "string" ||
    typeof statusCode !== "number" ||
    !statusCode.toString().startsWith("2")
  ) {
    return res.status(500).json({
      message: error,
      statusCode: statusCode,
      ErrorMessage: "The Message You Provided is not a Valid Message",
    });
  }

  switch (statusCode) {
    case OK: {
      return res.status(statusCode).json({
        title: "OK",
        Status: Status,
        message: error,
      });
    }
    case CREATED: {
      return res.status(statusCode).json({
        status: statusCode,
        title: "CREATED",
        Status: Status,
        message: error,
        id: id,
      });
    }
    case ACCEPTED: {
      return res.status(statusCode).json({
        status: statusCode,
        title: "Accepted",
        Status: Status,
        message: error,
      });
    }
    case NON_AUTHORITATIVE_INFORMATION: {
      return res.status(statusCode).json({
        status: statusCode,
        title: "NON_AUTHORITATIVE_INFORMATION",

        message: error,
      });
    }
    case NO_CONTENT: {
      return res.status(statusCode).json({
        status: statusCode,
        title: "No_Content",
        Status: Status,

        message: error,
      });
    }

    default:
      return res.status(statusCode).json({
        message: "Unmatched Status Code",
      });
  }
};
