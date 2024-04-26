import mongoose from "mongoose";
import LeaveApplication from "../../database/schema/leaveApplication.schema";
import { Response, NextFunction } from "express";
import AppError from "../../utils/errorUtils/appError";

import user from "../../database/schema/user.schema";

export class LeaveApplicationService {
  public static async createLeaveApplication(
    res: Response,
    userId: mongoose.Types.ObjectId | string,
    body: any,
    next: NextFunction
  ) {
    try {
      const existUser = await user
        .findOne({ _id: userId })
        .populate({ path: "Batch", select: "name" });
      const { subject, applicationBody, leaveFromDate, leaveToDate } = body;
      const currentDate = new Date();
      const leaveDate = new Date(leaveFromDate);
      if (leaveDate < currentDate) {
        return next(
          new AppError(
            "Start of leave date must be on or after the current date",
            400
          )
        );
      }
      if (leaveDate >= leaveToDate) {
        return next(
          new AppError(
            "Start of leave Date must be  earlier than End of leave Date",
            400
          )
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

      res.status(201).json({
        message: "Leave application created successfully.",
        data: leaveApplication,
      });
    } catch (error: any) {
      return next(new AppError(error.message, 500));
    }
  }

  public static async getAllApplications(
    res: Response,
    userId: mongoose.Types.ObjectId | string,
    next: NextFunction
  ) {
    try {
      const applications = await LeaveApplication.find({}).populate({
        path: "Batch",
        select: "name",
      });

      res.json({
        application: applications,
      });
    } catch (error: any) {
      return next(new AppError(error.message, 400));
    }
  }
}
