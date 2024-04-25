import bcryptjs from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { handleFourStatusError } from "../utils/errorUtils/commonFourResponseError";
import { functionReq } from "../@types/interface/customRequest";
import user from "../database/schema/user.schema";
import { statusConstants } from "../constants/statusConstants";
import validator from "validator";
import generator from "generate-password";
import { sendEmail } from "../utils/smtpServer/smtpEmail";
const { ERROR, SUCCESS, FAIL } = statusConstants;

export const testSignUpController: functionReq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullname, username, email, phoneNo, role, expertise, position } =
    req.body;

  if (!validator.isEmail(email)) {
    return handleFourStatusError(
      res,
      400,
      FAIL,
      "The Email you have Provided is not a valid Email, Please Provide A valid Email"
    );
  }

  // const password = generator.generate({
  //   length: 10,
  //   numbers: true,
  // });

  const password = "admin1234";

  const minLength = 8;
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /\d/;

  if (lowercaseRegex.test(password) && password.length > 8) {
    console.log("true");
    const subject = "Password Authentication ";
    const text = `Password for ${username}`;
    const html = `<h1>Dear ${username}, Your Current Password is ${password} Please Contact the Admin (HR) if you Forget your Password</h1> `;

    await sendEmail(email, subject, text, html);
    // const salt = await bcryptjs.genSalt(10);
    // const hashPass = await bcryptjs.hash(password, salt);
    if (password !== null || typeof password !== null || undefined) {
      const newUser = new user({
        username: username,
        fullname: fullname,
        email: email,
        phoneNo: phoneNo,
        role: role,
        password: password,
        expertise: expertise,
        position: position,
      });

      const dbUser = await newUser.save();
      return res.status(201).json({
        data: dbUser,
      });
    }
  }
};
