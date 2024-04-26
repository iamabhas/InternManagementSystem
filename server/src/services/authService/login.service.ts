import { NextFunction, Response } from "express";
import { statusConstants } from "../../constants/statusConstants";
import { roleConstants } from "../../constants/roleConstants";
import { IUserRequestBody } from "../../@types/interface/requestBody";
import AppError from "../../utils/errorUtils/appError";
import user from "../../database/schema/user.schema";
import { JwtService } from "../jwtServices/jwt.service";
import { userNameValidation } from "../../utils/schemaUtils/checklength";
const { ERROR, FAIL, SUCCESS } = statusConstants;
const { ADMIN, USER, MENTOR, SUPER_ADMIN } = roleConstants;

export const loginService = async (
  res: Response,
  body: any,
  next: NextFunction
): Promise<any> => {
  const { username, password }: Required<IUserRequestBody> = body;
  if ((!username && username === null) || (!password && password === null)) {
    return next(
      new AppError("Missing Credentials,Email and Password is Required", 400)
    );
  }
  await userNameValidation(username)
    .then(async (response: boolean): Promise<any> => {
      const User = await user.findOne({ username: username });
      console.log(User);

      if (
        !User ||
        (await user.find({ username: username }).countDocuments()) === 0
      ) {
        return next(
          new AppError("Username Does not Exists,Please Try Again", 400)
        );
      }
      const Roles: string[] = [MENTOR, USER, ADMIN, SUPER_ADMIN];
      const UserRole: string | Partial<IUserRequestBody> = User.role;
      // const checkPassword = await bcryptjs.compare(password, User.password);
      const checkPasswordAgain = password === User.password ? true : false;
      if (
        typeof checkPasswordAgain !== "boolean" ||
        checkPasswordAgain == false
      ) {
        return next(new AppError("The Password You Entered Is Incorrect", 403));
      }
      if (Roles.includes(UserRole)) {
        console.log(checkPasswordAgain);
        if (checkPasswordAgain && typeof checkPasswordAgain === "boolean") {
          const object = {
            userId: User._id,
            username: User.username,
            userRole: User.role,
          };
          const accesstoken = await JwtService.generateAccessToken(object);
          return res.status(203).json({
            Status: response,
            error: SUCCESS,
            message: "Access Token Generated and set In Headers",
            access_token: accesstoken,
            user_Name: User.username,
            user_role: User.role,
            user_id: User.id,
          });
        }
      }
    })
    .catch((error: any) => {
      throw new AppError(
        "Minimum Requirement Failed,Please Enter UpperCase,LowerCase and A Number",
        403
      );
    });
  // };
};
