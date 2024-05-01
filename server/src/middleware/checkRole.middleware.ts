import { Request, Response, NextFunction } from "express";

import { roleConstants } from "../constants/roleConstants";
import { statusConstants } from "../constants/statusConstants";
import AppError from "../utils/errorUtils/appError";
const { ADMIN, USER, SUPER_ADMIN, MENTOR } = roleConstants;
const { FAIL, ERROR, SUCCESS } = statusConstants;

const checkUser = async (role: string) => {
  if (role === USER) {
    return true;
  }
};

export const validateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role: string = req.user.role;
  if (typeof role !== "string" || role === null || undefined) {
    throw new AppError("Role is not Invalid Type", 405);
  }
  const roleArray: Array<String> = [ADMIN, USER, SUPER_ADMIN, MENTOR];

  if (roleArray.includes(role)) {
    next();
  } else {
    throw new AppError(`${role} Does Not Exists`, 401);
  }
};
