import { Response } from "express";
import { statusConstants } from "../constants/statusConstants";
import { userNameValidation } from "../utils/schemaUtils/checklength";
import { roleConstants } from "../constants/roleConstants";
import { handleTwoErrorResponse } from "../utils/Errors/CommonoTwoResponseError";
import { IUserRequestBody } from "../@types/interface/RequestBody";
import { AccessToken } from "../utils/jwtUtils/token";
import { handleFourStatusError } from "../utils/Errors/CommonFourResponseError";
import { isStrongPassword } from "../utils/password/CheckPassword";
import user from "../database/schema/user.schema";
const { ERROR, FAIL, SUCCESS } = statusConstants;
const { ADMIN, USER, SUPER_ADMIN } = roleConstants;

export const loginService = async (
  username: string,
  password: string,
  res: Response
): Promise<any> => {
  // return async (_req: Request, res: Response) => {
  if ((!username && username === null) || (!password && password === null)) {
    return res.status(404).json({
      error: FAIL,
      message: "Missing Credentials, Email and Password is Not Provided",
    });
  }

  //dont delete it is for register purpose for later
  // if (!isStrongPassword(password)) {
  //   return handleFourStatusError(
  //     res,
  //     404,
  //     FAIL,
  //     "PassWord is Not Strong , Please Include LowerCase , UpperCase and a Digit"
  //   );
  // }

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

      // const UserRole : Pick<IUserRequestBody, "role"> = User;
      const Roles: string[] = [ADMIN, USER, SUPER_ADMIN];
      const UserRole: string | Partial<IUserRequestBody> = User.role;

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

          return handleTwoErrorResponse(
            res,
            200,
            response,
            SUCCESS,
            accesstoken,
            User.username,
            User.role,
            User.id
          );
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
