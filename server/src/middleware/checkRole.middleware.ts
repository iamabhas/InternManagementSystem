import { Request, Response, NextFunction } from "express";
import { functionReq } from "../@types/interface/CustomRequest";
import { roleConstants } from "../constants/roleConstants";
import { handleFourStatusError } from "../utils/Errors/CommonFourResponseError";
import { FourErrorConstant } from "../constants/statusCodeConstant";
import { statusConstants } from "../constants/statusConstants";
import { checkRole } from "../utils/Function/RoleCheck";
const { ADMIN, USER, SUPER_ADMIN, MENTOR } = roleConstants;
const { FAIL, ERROR, SUCCESS } = statusConstants;
const { VALIDATION_ERROR, FORBIDDEN, UNAUTHORIZED, METHOD_NOT_ALLOWED } =
  FourErrorConstant;

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
      "Role is not Accessiable"
    );
  }
};
