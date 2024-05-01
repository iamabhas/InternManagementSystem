import { Request, Response, NextFunction } from "express";
import AppError from "../utils/errorUtils/appError";
import { UserService } from "../services/userServices/user.service";

export class UserController {
  public static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user.user_id;

      console.log(id);
      await UserService.getUserService(res, id, next);
    } catch (err: any | unknown) {
      return next(new AppError(err.message, 500));
    }
  }
}
