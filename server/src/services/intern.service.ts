import user from "../database/schema/user.schema";
import { Response } from "express";
import { handleFourStatusError } from "../utils/Errors/CommonFourResponseError";
import { statusConstants } from "../constants/statusConstants";
const { ERROR, SUCCESS, FAIL } = statusConstants;
export const getInternById: (
  res: Response,
  id: string | undefined
) => void = async (res: Response, id: string | undefined) => {
  const requestID = id;
  if (requestID === undefined || null || typeof id === "number") {
    return handleFourStatusError(
      res,
      400,
      ERROR,
      "Invalid Request Path Variable"
    );
  }

  try {
    const obtainedUser = await user.findOne({ _id: id });
    if (!obtainedUser || obtainedUser._id === null) {
      return handleFourStatusError(
        res,
        403,
        ERROR,
        "Intern Cannot be Obtained"
      );
    }

    return res.status(200).json({
      status: true,
      message: SUCCESS,
      Intern_details: obtainedUser,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: 500,
      message: "INTERNAL SERVER ERROR",
    });
  }
};
