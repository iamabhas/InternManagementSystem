import { Request, Response, NextFunction } from "express";
import { functionReq } from "../../@types/interface/CustomRequest";
import { handleFourStatusError } from "../../utils/Errors/CommonFourResponseError";

export const hrValidator: functionReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role: string = req.user.role;
  //here admin is hr
  const hr: string = "admin";
  if (
    role.startsWith("ad") &&
    role.endsWith("in") &&
    hr.includes(role) &&
    role.split(" ").reverse().join(" ") === hr
  ) {
    next();
  } else {
    return handleFourStatusError(
      res,
      403,
      "ERROR",
      "You are Unauthorized to this route, You cannot access to this Routes"
    );
  }
};
