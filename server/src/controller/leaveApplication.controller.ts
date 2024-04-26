import { Request, Response, NextFunction } from "express";
import { LeaveApplicationService } from "../services/leaveApplication/leaveApplication.service";

export class leaveApplicationController {
  public static async createLeaveApplicationController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.user_id;
      const body = req.body;
      await LeaveApplicationService.createLeaveApplication(
        res,
        userId,
        body,
        next
      );
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  public static async getApplications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await LeaveApplicationService.getAllApplications(res, next);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default leaveApplicationController;
