import user from "../../database/schema/user.schema";
import Batch from "../../database/schema/batch.schema";
import { NextFunction, Response } from "express";
import validator from "validator";
import { sendEmail } from "../../utils/smtpServerUtils/smtpEmail";
import AppError from "../../utils/errorUtils/appError";
import { sendResponse } from "../../helpers/customResponse";
import { HelperFunction } from "../../helpers/registerFormat";
import { send } from "process";

export class AdminService {
  public static async createBatchService(
    res: Response,
    body: any,
    next: NextFunction
  ) {
    const { name, startDate, endDate } = body;
    console.log(name, startDate, endDate);
    if (startDate > endDate) {
      throw new AppError("Start Date Must Be Greater than End Date", 400);
    }

    const batch = new Batch({
      name: name,
      startDate: startDate,
      endDate: endDate,
    });
    const sendData = await batch.save();
    console.log(sendData);
    sendResponse(res, 201, "Batch Saved SuccessFully", sendData);
  }

  public static async registerInternService(
    res: Response,
    body: any,
    next: NextFunction
  ) {
    const { username, fullname, email, phoneNo, role, BatchId } = body;
    const responseBody = {
      username: username,
      fullname: fullname,
      email: email,
      phoneNo: phoneNo,
      role: role,
      BatchId: BatchId,
    };
    await HelperFunction.register(res, responseBody);
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
    const responseBody = {
      username: username,
      fullname: fullname,
      email: email,
      phoneNo: phoneNo,
      role: role,
      BatchId: BatchId,
      position: position,
    };
    await HelperFunction.register(res, responseBody);
  }
}
