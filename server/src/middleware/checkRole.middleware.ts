import { Request, Response, NextFunction } from "express";
import { functionReq } from "../@types/interface/customRequest";
import { roleConstants } from "../constants/roleConstants";
import { handleFourStatusError } from "../utils/errorUtils/commonFourResponseError";
import { FourErrorConstant } from "../constants/statusCodeConstant";
import { statusConstants } from "../constants/statusConstants";
const { ADMIN, USER, SUPER_ADMIN, MENTOR } = roleConstants;
const { FAIL, ERROR, SUCCESS } = statusConstants;
const { VALIDATION_ERROR, FORBIDDEN, UNAUTHORIZED, METHOD_NOT_ALLOWED } =
  FourErrorConstant;

const checkRole = async (roleArray: string[] | Array<String>, role: string) => {
  for (let i = 0; i < roleArray.length; i++) {
    return 0;
  }
};

export const checkUser = async (role: string) => {
  if (role === USER) {
    return true;
  }
};

export const verifyRole = async (role: string) => {};

export const validateRole: functionReq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role: string = req.user.role;
  if (typeof role !== "string" || role === null || undefined) {
    return handleFourStatusError(
      res,
      METHOD_NOT_ALLOWED,
      ERROR,
      "Role is not type of String"
    );
  }
  const roleArray: Array<String> = [ADMIN, USER, SUPER_ADMIN, MENTOR];
  const roleVerified = await checkRole(roleArray, role);
  if (roleArray.includes(role) && roleVerified) {
    next();
  } else {
    return handleFourStatusError(
      res,
      FORBIDDEN,
      FAIL,
      `${role} Does not Exists `
    );
  }
};
