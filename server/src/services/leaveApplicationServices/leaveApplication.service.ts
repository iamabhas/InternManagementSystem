import mongoose from "mongoose";
import LeaveApplication from "../../database/schema/leaveApplication.schema";
import { handleFourStatusError } from "../../utils/errorUtils/commonFourResponseError";
import { Response, Request } from "express";

export class LeaveApplicationService {
  public static async createLeaveApplication(
    res: Response,
    userId: mongoose.Types.ObjectId | string,
    subject: string,
    applicationBody: string,
    leaveFromDate: Date,
    leaveToDate: Date
  ) {
    try {
      const currentDate = new Date();
      if (leaveFromDate < currentDate) {
        return handleFourStatusError(
          res,
          400,
          "ERROR",
          "Start of leave date must be on or after the current date."
        );
      }
      if (leaveFromDate >= leaveToDate) {
        return handleFourStatusError(
          res,
          400,
          "ERROR",
          "Start of leave Date must be earlier than End of leave Date."
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
      handleFourStatusError(res, 500, "ERROR", error.message);
    }
  }

  public static async getAllApplications(res: Response) {
    try {
      const applications = await LeaveApplication.find({}).populate(
        "User",
        "username"
      );
      res.json(applications);
    } catch (error: any) {
      return handleFourStatusError(res, 500, "ERROR", error.message);
    }
  }
}
