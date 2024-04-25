import { Request, Response, NextFunction } from "express";
import { handleFourStatusError } from "../utils/errorUtils/commonFourResponseError";
import { statusConstants } from "../constants/statusConstants";
import { verifyAccesToken } from "../utils/jwtUtils/verifyaccesstoken";
import user from "../database/schema/user.schema";
const { FAIL, ERROR } = statusConstants;

declare global {
  namespace Express {
    interface Request {
      user?: any;
      reqRole?: any;
    }
  }
}

type functionParan = (req: Request, res: Response, next: NextFunction) => void;
export const validateToken: functionParan = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log(authToken);
  if (!authToken || typeof authToken !== "string") {
    return handleFourStatusError(
      res,
      401,
      ERROR,
      "Invalid Authorization Token"
    );
  }

  try {
    verifyAccesToken(authToken).then(async (decodedtoken: any) => {
      if (!decodedtoken || typeof decodedtoken === null || undefined) {
        return handleFourStatusError(res, 401, FAIL, "Payload Failed");
      }
      const existingUser = await user.findOne({ _id: decodedtoken.user_id });

      if (!existingUser) {
        return handleFourStatusError(res, 401, FAIL, "User Not Found");
      } else {
        console.log("The decoded token : " + decodedtoken);
        req.user = decodedtoken ? decodedtoken : existingUser;
        next();
      }
    });
  } catch (error: any) {
    switch (error.name) {
      case "JsonWebTokenError": {
        return handleFourStatusError(
          res,
          401,
          FAIL,
          "Invalid Token Please Log In again"
        );
      }

      case "TokenExpiredError": {
        return handleFourStatusError(res, 401, ERROR, "Token has Been Expired");
      }
      default:
        return handleFourStatusError(res, 500, ERROR, "INTERNAL SERVER ERROR");
    }
  }
};
