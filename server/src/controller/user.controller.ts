import { userNameValidation } from "./../../utils/checklength";
import { AccessToken } from "./../../utils/JWT/token";

import { UserRequestBody } from "./../../@types/interface/RequestBody";
import { Request, Response } from "express";
import { statusConstants } from "../constants/statusConstants";
import user from "../database/schema/user.schema";
import { Role } from "../constants/roleEnum";
import { CookieInterface } from "./../../@types/interface/RequestBody";

export const loginController = async (
  req: Request<Required<UserRequestBody>>,
  res: Response
): Promise<any> => {
  const { username, password }: Required<UserRequestBody> = req.body;
  if ((!username && username === null) || (!password && password === null)) {
    return res.status(404).json({
      error: statusConstants.FAIL,
      message: "Missing Credentials, Email and Password is Not Provided",
    });
  }

  switch (true) {
    case password.length < 8: {
      return res.status(404).json({
        error: statusConstants.FAIL,
        message: "Minimum Password Length must be 8 characters",
      });
    }

    case password.length > 50: {
      return res.status(404).json({
        error: statusConstants.FAIL,
        message: "Password Exceeded 50 Maxmimum Length",
      });
    }
    default:
  }

  await userNameValidation(username)
    .then(async (response: boolean | string): Promise<any> => {
      const User = await user.findOne({ username: username });
      console.log(User);
      if (
        !User ||
        (await user.find({ username: username }).countDocuments()) === 0
      ) {
        return res.status(404).json({
          error: statusConstants.ERROR,
          message: "Email Not Found , Please Contact Super Admin",
        });
      }

      // const UserRole : Pick<UserRequestBody, "role"> = User;
      const Roles: string[] = [Role.Admin, Role.User, Role.SuperAdmin];
      const UserRole: string | Partial<UserRequestBody> = User.role;

      if (Roles.includes(UserRole)) {
        if (
          User.password.includes(password) &&
          User.password.split(" ").includes(password)
        ) {
          const accesstoken = await AccessToken(
            User._id,
            User.username,
            User.role
          );

          const CookieOptions: CookieInterface = {
            path: "/",
            maxAge: 3600,
            expires: new Date(Date.now() + 3600000),
            secure: true,
            httpOnly: true,
            sameSite: "strict",
          };

          res.cookie("access_token", accesstoken, CookieOptions);

          return res.status(201).json({
            Status: response,
            error: statusConstants.SUCCESS,
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
      return res.status(404).json({
        error: statusConstants.FAIL,
        errormessage: error,
        message:
          "Minimum RequiredMent Failed, Please Enter UpperCase, LowerCase and A Number",
      });
    });
};
