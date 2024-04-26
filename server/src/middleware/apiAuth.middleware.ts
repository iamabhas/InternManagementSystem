import { Request, Response, NextFunction } from "express";
import { statusConstants } from "../constants/statusConstants";
import { JwtService } from "../services/jwtServices/jwt.service";
import user from "../database/schema/user.schema";
import AppError from "../utils/errorUtils/appError";
import App from "../server";
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
  //const authToken = req.headers["authorization"];
  const authToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  console.log(authToken);
  if (!authToken || typeof authToken !== "string") {
    return next(new AppError("Invalid Authorization Token", 401));
  }

  try {
    JwtService.verifyAccessToken(authToken).then(async (decodedtoken: any) => {
      if (!decodedtoken || typeof decodedtoken === null || undefined) {
        return next(new AppError("Payload Failed", 401));
      }
      const existingUser = await user.findOne({ _id: decodedtoken.user_id });

      if (!existingUser) {
        return next(new AppError("User Not Found", 401));
      } else {
        console.log("The decoded token : " + decodedtoken);
        req.user = decodedtoken ? decodedtoken : existingUser;
        next();
      }
    });
  } catch (error: any) {
    switch (error.name) {
      case "JsonWebTokenError": {
        return next(new AppError("Invalid Token, Please Log In", 401));
      }

      case "TokenExpiredError": {
        return next(new AppError("Token Has Been Expired", 401));
      }
      default:
        return next(new AppError("INTERNAL SERVER ERROR", 500));
    }
  }
};
