import { TwoErrorConstant } from "../../constants/200ErrorConstant";
const { OK, CREATED, ACCEPTED, NON_AUTHORITATIVE_INFORMATION, NO_CONTENT } =
  TwoErrorConstant;
import { Response } from "express";

type functionParam = (
  res: Response,
  statusCode: number,
  Status: boolean,
  error: string,
  access_token: string,
  username: string,
  userRole: string,
  user_id: string
) => any;
export const handleTwoErrorResponse: functionParam = (
  res: Response,
  statusCode: number,
  Status: boolean,
  error: string,
  access_token?: string,
  username?: string,
  userRole?: string,
  user_id?: string
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
      return res.json({
        status: statusCode,
        title: "OK",
        Status: Status,
        access_token: access_token,
        user_name: username,
        user_role: userRole,
        user_id: user_id,
        message: error,
      });
    }
    case CREATED: {
      return res.json({
        status: statusCode,
        title: "CREATED",

        message: error,
      });
    }
    case ACCEPTED: {
      return res.json({
        status: statusCode,
        title: "Accepted",

        message: error,
      });
    }
    case NON_AUTHORITATIVE_INFORMATION: {
      return res.json({
        status: statusCode,
        title: "NON_AUTHORITATIVE_INFORMATION",

        message: error,
      });
    }
    case NO_CONTENT: {
      return res.json({
        status: statusCode,
        title: "No_Content",

        message: error,
      });
    }

    default:
      return res.json({
        message: "Unmatched Status Code",
      });
  }
};
