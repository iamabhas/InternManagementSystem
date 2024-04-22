import { Response } from "express";
import { statusConstants } from "../constants/statusConstants";
import { userNameValidation } from "../utils/schemaUtils/checklength";
import { roleConstants } from "../constants/roleConstants";
import { IUserRequestBody } from "../@types/interface/RequestBody";
import { AccessToken } from "../utils/jwtUtils/token";
import { handleFourStatusError } from "../utils/Errors/CommonFourResponseError";
import user from "../database/schema/user.schema";
import bcryptjs from "bcrypt";
const { ERROR, FAIL, SUCCESS } = statusConstants;
const { ADMIN, USER, MENTOR, SUPER_ADMIN } = roleConstants;

export const loginService = async (
  username: string,
  password: string,
  res: Response
): Promise<any> => {
  if ((!username && username === null) || (!password && password === null)) {
    return res.status(404).json({
      error: FAIL,
      message: "Missing Credentials, Email and Password is Not Provided",
    });
  }
  await userNameValidation(username)
    .then(async (response: boolean): Promise<any> => {
      const User = await user.findOne({ username: username });
      console.log(User);

      if (
        !User ||
        (await user.find({ username: username }).countDocuments()) === 0
      ) {
        return handleFourStatusError(
          res,
          404,
          FAIL,
          "Email Not Found , Please Contact Super Admin"
        );
      }
      const Roles: string[] = [MENTOR, USER, ADMIN, SUPER_ADMIN];
      const UserRole: string | Partial<IUserRequestBody> = User.role;
      const checkPassword = await bcryptjs.compare(password, User.password);
      if (Roles.includes(UserRole)) {
        console.log(checkPassword);
        if (checkPassword && typeof checkPassword === "boolean") {
          const accesstoken = await AccessToken(
            User._id,
            User.username,
            User.role
          );
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
      return res.status(404).json({
        error: ERROR,
        errormessage: error,
        message:
          "Minimum RequiredMent Failed, Please Enter UpperCase, LowerCase and A Number",
      });
    });
  // };
};
