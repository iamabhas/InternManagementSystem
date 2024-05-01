import { Request, Response, NextFunction } from "express";
import user, { IUser } from "../../database/schema/user.schema";
import AppError from "../../utils/errorUtils/appError";

export class UserService {
  public static async getUserService(
    res: Response,
    id: string | undefined,
    next: NextFunction
  ) {
    try {
      const existUser = await user.findOne({ _id: id });
      console.log(existUser);
      if (!existUser) {
        return next(new AppError("User not Found", 401));
      }
      return res.status(201).json({
        message: "User Profile",
        data: existUser,
      });
    } catch (err: any | unknown) {
      return next(new AppError(err.message, 403));
    }
  }
}
