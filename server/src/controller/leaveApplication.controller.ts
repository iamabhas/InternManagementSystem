import { Request, Response, NextFunction } from "express";
import { LeaveApplicationService } from "../services/leaveApplication/leaveApplication.service";

export class leaveApplicationController {
  public static async createLeaveApplicationController(
    req: Request,
    res: Response
  ) {
    try {
      const { userId, subject, applicationBody, leaveFromDate, leaveToDate } =
        req.body;

      await LeaveApplicationService.createLeaveApplication(
        res,
        userId,
        subject,
        applicationBody,
        leaveFromDate,
        leaveToDate
      );
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  public static async getApplications(res: Response) {
    try {
      await LeaveApplicationService.getAllApplications(res);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default leaveApplicationController;
