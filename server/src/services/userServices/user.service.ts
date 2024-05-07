import { Response, NextFunction } from "express";
import user, { IUser } from "../../database/schema/user.schema";
import AppError from "../../utils/errorUtils/appError";
import { sendResponse } from "../../helpers/customResponse";
import Batch from "../../database/schema/batch.schema";

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

  public static async getUserInformation(
    res: Response,
    userId: string | undefined,
    queryname: any
  ) {
    const existUser = await user.findOne({ _id: userId });
    if (
      existUser?._id == userId &&
      existUser?.get("username").includes(queryname)
    ) {
      const data = await Batch.find({ interns: existUser._id })
        .populate({
          path: "interns",
          select: "fullname",
        })
        .populate({
          path: "mentor",
          select: "fullname",
        });
      return sendResponse(res, 201, `${existUser.fullname} Information`, data);
    }
  }
}
