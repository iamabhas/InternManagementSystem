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
  const { authorization } = req.headers;
  let authToken = authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    authToken = req.headers.authorization?.split(" ")[1];
  }

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
        return next(new AppError(error.message, 401));
      }

      case "TokenExpiredError": {
        return next(new AppError(error.message, 401));
      }
      default:
        return next(new AppError(error.message, 500));
    }
  }
};
