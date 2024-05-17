import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwtServices/jwt.service";
import user from "../database/schema/user.schema";
import AppError from "../utils/errorUtils/appError";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      reqRole?: any;
    }
  }
}

type functionParam = (req: Request, _: any, next: NextFunction) => void;
export const validateToken: functionParam = (
  req: Request,
  _: any,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  let authToken = authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    authToken = req.headers.authorization?.split(" ")[1];
  }

  if (!authToken) {
    return next(new AppError("Invalid Authorization Token", 401));
  }

  try {
    JwtService.verifyAccessToken(authToken)
      .then(async (decodedtoken: any) => {
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
      })
      .catch((err) => next(new AppError(err.message, 401)));
  } catch (error: any) {
    return next(new AppError(error.message, error.status));
  }
};
