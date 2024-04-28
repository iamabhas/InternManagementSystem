import { Request, Response, NextFunction } from "express";
import { LeaveApplicationService } from "../services/leaveApplication/leaveApplication.service";
import mongoose from "mongoose";
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
    } catch (err: any) {
      next(err);
    }
  }
  public static async getApplications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.user.user_id;

      await LeaveApplicationService.getAllApplications(res, id, next);
    } catch (err: any) {
      next(err);
    }
  }

  public static async verifiedLeave(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.params.id);
      const id: string | mongoose.Types.ObjectId = req.params.id;
      await LeaveApplicationService.verifiedLeaveService(res, id);
    } catch (err: any | unknown) {
      next(err);
    }
  }
}

export default leaveApplicationController;
