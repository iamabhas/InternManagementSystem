import user from "../../database/schema/user.schema";
import Batch from "../../database/schema/batch.schema";
import { NextFunction, Response } from "express";
import validator from "validator";
import { sendEmail } from "../../utils/smtpServerUtils/smtpEmail";
import AppError from "../../utils/errorUtils/appError";
import mongoose from "mongoose";

export class AdminService {
  public static async createService(
    res: Response,
    body: any,
    next: NextFunction
  ) {
    const { name, startDate, endDate } = body;
    console.log(name, startDate, endDate);
    if (startDate > endDate) {
      throw new AppError("Start Date Must Be Greater than End Date", 400);
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
        return next(new AppError("JWT TOKEN EXPIRED", 403));
      } else {
        return next(new AppError("Batch Cannot Be Saved", 403));
      }
    }
  }

  public static async registerService(
    res: Response,
    body: any,
    next: NextFunction
  ) {
    const { username, fullname, email, phoneNo, role, BatchId } = body;
    const existingBatch = await Batch.findOne({ _id: BatchId });
    if (!existingBatch) {
      return next(new AppError("Fail,Batch Is Not Available", 401));
    }
    if (!validator.isEmail(email)) {
      return next(
        new AppError(
          "The Email you have Provided is not a valid Email, Please Provide A valid Email",
          400
        )
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
      await user.updateOne(
        {
          _id: dbUser._id,
        },
        {
          $set: { Batch: BatchId },
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
    body: any,
    next: NextFunction
  ) {
    const {
      username,
      fullname,
      email,
      phoneNo,
      role,
      expertise,
      position,
      BatchId,
    } = body;
    const existingBatch = await Batch.findOne({ _id: BatchId });
    if (!existingBatch) {
      return next(new AppError("Batch is not Available", 401));
    }
    if (!validator.isEmail(email)) {
      return next(
        new AppError(
          "The Email you have provided is not valid Email, Please Provide A valid Email",
          400
        )
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

      await user.updateOne(
        {
          _id: dbUser._id,
        },
        {
          $set: {
            Batch: BatchId,
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
