import { NextFunction, Response } from "express";
import { statusConstants } from "../../constants/statusConstants";
import { roleConstants } from "../../constants/roleConstants";
import { IUserRequestBody } from "../../@types/interface/requestBody";
import AppError from "../../utils/errorUtils/appError";
import user from "../../database/schema/user.schema";
import { JwtService } from "../jwtServices/jwt.service";

const { SUCCESS } = statusConstants;
const { ADMIN, USER, MENTOR, SUPER_ADMIN } = roleConstants;

export class AuthService {
  public static async loginService(
    res: Response,
    body: any,
    next: NextFunction
  ) {
    const { username, password } = body;

    if (!username && !password) {
      throw new AppError(
        "Missing Credentials, Email and Password is Required",
        400
      );
    }
    const existUser = await user.findOne({ username: username });
    if (!existUser) {
      throw new AppError("Username Does Not Match", 401);
    }
    const Roles: string[] = [MENTOR, USER, ADMIN, SUPER_ADMIN];
    const UserRole: string | Partial<IUserRequestBody> = existUser.role;
    // const checkPassword = await bcryptjs.compare(password, User.password);
    const checkPasswordAgain = password === existUser.password ? true : false;
    if (!checkPasswordAgain) {
      throw new AppError("Password Does Not Match", 403);
    }

    if (Roles.includes(UserRole)) {
      console.log(checkPasswordAgain);
      if (checkPasswordAgain && typeof checkPasswordAgain === "boolean") {
        const object = {
          userId: existUser._id,
          username: existUser.username,
          userRole: existUser.role,
        };
        const accesstoken = await JwtService.generateAccessToken(object);
        return res.status(203).json({
          status: SUCCESS,
          access_token: accesstoken,
          user_Name: existUser.username,
          user_role: existUser.role,
          user_id: existUser.id,
        });
      }
    }
  }
}
