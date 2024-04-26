import mongoose from "mongoose";
import LeaveApplication from "../../database/schema/leaveApplication.schema";
import { Response, Request, NextFunction } from "express";
import AppError from "../../utils/errorUtils/appError";
import { error } from "console";

export class LeaveApplicationService {
  public static async createLeaveApplication(
    res: Response,
    userId: mongoose.Types.ObjectId | string,
    body: any,
    next: NextFunction
  ) {
    try {
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

      const leaveApplication = new LeaveApplication({
        User: userId,
        subject: subject,
        applicationBody: applicationBody,
        leaveFromDate: leaveFromDate,
        leaveToDate: leaveToDate,
      });

      await leaveApplication.save();

      res.status(201).json({
        message: "Leave application created successfully.",
        data: leaveApplication,
      });
    } catch (error: any) {
      return next(new AppError(error.message, 500));
    }
  }

  public static async getAllApplications(res: Response, next: NextFunction) {
    try {
      const applications = await LeaveApplication.find({}).populate(
        "User",
        "username"
      );
      res.json(applications);
    } catch (error: any) {
      return next(new AppError(error.message, 400));
    }
  }
}
