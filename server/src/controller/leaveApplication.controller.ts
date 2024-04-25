import { Request, Response, NextFunction } from "express";
import { LeaveApplicationService } from "../services/leaveApplicationServices/leaveApplication.service";

export class leaveApplicationController {
  public static async createLeaveApplicationController(
    req: Request,
    res: Response
  ) {
    try {
      const { subject, applicationBody, leaveFromDate, leaveToDate } = req.body;
      const userId = req.user.user_id;
      console.log(userId);
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
  public static async getApplications(req: Request, res: Response) {
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
