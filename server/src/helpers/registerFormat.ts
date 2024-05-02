import Batch from "../database/schema/batch.schema";
import user from "../database/schema/user.schema";
import validator from "validator";
import AppError from "../utils/errorUtils/appError";
import { sendResponse } from "./customResponse";
import { sendEmail } from "../utils/smtpServerUtils/smtpEmail";
import { Response } from "express";
type testing = {
  username: string;
  fullname: string;
  email: string;
  phoneNo: string;
  role: string;
  password: any;
  expertise: any;
  position?: string;
};
export class HelperFunction {
  public static async register(res: Response, bodyObj: testing | any) {
    const existingBatch = await Batch.findOne({ _id: bodyObj.BatchId });
    if (!existingBatch) {
      throw new AppError("Fail,Batch Is Not Available", 401);
    }
    if (!validator.isEmail(bodyObj.email)) {
      throw new AppError(
        "The Email you have Provided is not a valid Email, Please Provide A valid Email",
        400
      );
    }
    const password = "admin1234";
    const lowercaseRegex = /[a-z]/;
    if (lowercaseRegex.test(password) && password.length > 8) {
      // console.log("true");
      // const subject = "Password Authentication ";
      // const text = `Password for ${username}`;
      // const html = `<h1>Dear ${username}, You have Been Your Current Password is ${password} Please Contact the Admin (HR) if you Forget your Password</h1> `;
      // await sendEmail(email, subject, text, html);
      const newUser = new user({
        username: bodyObj.username,
        fullname: bodyObj.fullname,
        email: bodyObj.email,
        phoneNo: bodyObj.phoneNo,
        role: bodyObj.role,
        password: password,
        position: bodyObj.position,
      });
      const dbUser = await newUser.save();

      await Batch.updateOne(
        { _id: bodyObj.BatchId },
        {
          $push: {
            interns: dbUser._id,
          },
        },
        {
          new: true,
        }
      );
      await user.updateOne(
        {
          _id: dbUser._id,
        },
        {
          $set: { Batch: bodyObj.BatchId },
        },
        {
          new: true,
        }
      );

      sendResponse(res, 201, "Intern Registed SuccessFully", dbUser);
    }
  }
}
