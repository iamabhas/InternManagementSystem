import user from "../../database/schema/user.schema";
import Batch from "../../database/schema/batch.schema";
import { Response } from "express";
import validator from "validator";
import { sendEmail } from "../../utils/smtpServer/smtpEmail";
import { handleFourStatusError } from "../../utils/errorUtils/commonFourResponseError";

import mongoose from "mongoose";

export class AdminService {
  public static async createService(
    res: Response,
    name: string,
    startDate: Date,
    endDate: Date
  ) {
    console.log(name, startDate, endDate);
    if (startDate > endDate) {
      return handleFourStatusError(
        res,
        400,
        "ERROR",
        "Start Date must be Lesser than End Date"
      );
    }
    try {
      console.log("Hi");

      const batch = new Batch({
        name: name,
        startDate: startDate,
        endDate: endDate,
      });
      await batch.save();
      return res.status(201).json({
        message: "Batch Saved SuccessFully",
        data: batch,
      });
    } catch (err: any) {
      console.log(err);
      if (err.message === "TokenExpiredError") {
        return handleFourStatusError(res, 403, "FAIL", "JWT TOKEN EXPIRED");
      } else {
        return handleFourStatusError(res, 401, "FAIL", "Batch Cannot Be Saved");
      }
    }
  }

  public static async registerService(
    res: Response,
    username: string | undefined,
    fullname: string | undefined,
    email: string,
    phoneNo: number,
    role: string | undefined,
    BatchId: string | mongoose.Types.ObjectId
  ) {
    const existingBatch = await Batch.findOne({ _id: BatchId });
    if (!existingBatch) {
      return handleFourStatusError(res, 401, "FAIL", "Batch is not Available");
    }
    if (!validator.isEmail(email)) {
      return handleFourStatusError(
        res,
        400,
        "FAIL",
        "The Email you have Provided is not a valid Email, Please Provide A valid Email"
      );
    }
    const password = "admin1234";
    const lowercaseRegex = /[a-z]/;

    if (lowercaseRegex.test(password) && password.length > 8) {
      console.log("true");
      const subject = "Password Authentication ";
      const text = `Password for ${username}`;
      const html = `<h1>Dear ${username}, You have Been Your Current Password is ${password} Please Contact the Admin (HR) if you Forget your Password</h1> `;
      await sendEmail(email, subject, text, html);
      const newUser = new user({
        username: username,
        fullname: fullname,
        email: email,
        phoneNo: phoneNo,
        role: role,
        password: password,
      });
      const dbUser = await newUser.save();

      await Batch.updateOne(
        { _id: BatchId },
        {
          $push: {
            interns: dbUser._id,
          },
        },
        {
          new: true,
        }
      );
      return res.status(201).json({
        data: dbUser,
      });
    }
  }

  public static async registerMentorService(
    res: Response,
    username: string | undefined,
    fullname: string | undefined,
    email: string,
    phoneNo: number,
    role: string | undefined,
    expertise: string[],
    position: string,
    BatchId: string | mongoose.Types.ObjectId
  ) {
    const existingBatch = await Batch.findOne({ _id: BatchId });
    if (!existingBatch) {
      return handleFourStatusError(res, 401, "FAIL", "Batch is not Available");
    }
    if (!validator.isEmail(email)) {
      return handleFourStatusError(
        res,
        400,
        "FAIL",
        "The Email you have Provided is not a valid Email, Please Provide A valid Email"
      );
    }
    const password = "admin1234";
    const minLength = 8;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;

    if (lowercaseRegex.test(password) && password.length > 8) {
      console.log("true");
      const subject = "Password Authentication ";
      const text = `Password for ${username}`;
      const html = `<h1>Dear ${username} Mentor, You have Been Your Current Password is ${password} Please Contact the Admin (HR) if you Forget your Password</h1> `;
      await sendEmail(email, subject, text, html);
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

      await Batch.updateOne(
        { _id: BatchId },
        {
          $push: {
            mentor: dbUser._id,
          },
        },
        {
          new: true,
        }
      );
      return res.status(201).json({
        data: dbUser,
      });
    }
  }
}
