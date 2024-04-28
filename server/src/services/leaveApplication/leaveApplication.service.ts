import mongoose from "mongoose";
import LeaveApplication from "../../database/schema/leaveApplication.schema";
import { Response, NextFunction, application } from "express";
import AppError from "../../utils/errorUtils/appError";

import user from "../../database/schema/user.schema";
import { sendResponse } from "../../helpers/customResponse";
import { send } from "process";

export class LeaveApplicationService {
  public static async createLeaveApplication(
    res: Response,
    userId: mongoose.Types.ObjectId | string,
    body: any,
    next: NextFunction
  ) {
    const existUser = await user
      .findOne({ _id: userId })
      .populate({ path: "Batch", select: "name" });
    const { subject, applicationBody, leaveFromDate, leaveToDate } = body;
    const currentDate = new Date();
    const leaveDate = new Date(leaveFromDate);
    if (leaveDate < currentDate) {
      throw new AppError(
        "Start of leave date must be on or after the current date",
        400
      );
    }
    if (leaveDate >= leaveToDate) {
      throw new AppError(
        "Start of leave Date must be  earlier than End of leave Date",
        400
      );
    }
    const newLeaveApplication = {
      User: userId,
      Batch: existUser?.Batch,
      subject: subject,
      applicationBody: applicationBody,
      leaveFromDate: leaveFromDate,
      leaveToDate: leaveToDate,
    };
    const leaveApplication = new LeaveApplication(newLeaveApplication);

    await leaveApplication.save();

    sendResponse(
      res,
      201,
      "Leave Application created SuccessFully",
      leaveApplication
    );
  }

  public static async getAllApplications(
    res: Response,
    userId: mongoose.Types.ObjectId | string,
    next: NextFunction
  ) {
    const applications = await LeaveApplication.find({}).populate({
      path: "Batch",
      select: "name",
    });
    if (!applications) {
      throw new AppError("Leave Application Cannot Be Fetched", 403);
    }
    sendResponse(res, 201, "Data Fetches SuccessFully", applications);
  }

  public static async verifiedLeaveService(
    res: Response,
    id: string | mongoose.Types.ObjectId
  ) {
    console.log("Hi");
    const checkLeave = await LeaveApplication.findOne({ _id: id });
    if (!checkLeave) {
      throw new AppError("Leave Is Expired or Does not Exists", 400);
    }
    await LeaveApplication.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          approveStatus: true,
        },
      },
      {
        new: true,
      }
    );

    return sendResponse(res, 200, "Leave Is Verified SuccessFully");
  }
}
