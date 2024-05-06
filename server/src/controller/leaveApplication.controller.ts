import { Request, Response, NextFunction } from "express";
import { LeaveApplicationService } from "../services/leaveApplicationServices/leaveApplication.service";
import mongoose from "mongoose";
import LeaveApplication from "../database/schema/leaveApplication.schema";

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
      const id: string | mongoose.Types.ObjectId = req.params.id;
      await LeaveApplicationService.verifiedLeaveService(res, id);
    } catch (err: any | unknown) {
      next(err);
    }
  }

  public static async downloadLeave(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id: string | undefined = req.params.id;
      const adminId = req.user.user_id;
      await LeaveApplicationService.DowloadLeaveService(res, id, adminId);
    } catch (err: any | unknown) {
      next(err);
    }
  }

  public static async rejectLeave(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.params.id);
      const id: string | mongoose.Types.ObjectId = req.params.id;
      await LeaveApplicationService.rejectLeaveService(res, id);
    } catch (err: any | unknown) {
      next(err);
    }
  }

  public static async viewCurrentLeave(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await LeaveApplicationService.viewCurrentLeaveService(res);
    } catch (err: any | unknown) {
      next(err);
    }
  }

  public static async IncomingApplication(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await LeaveApplicationService.IncomingApplicationService(res);
    } catch (err: any | unknown) {
      next(err);
    }
  }

  public static async getInternLeaves(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authId = req.user.user_id;
      await LeaveApplicationService.getLeaveApplicationByUserId(res, authId);
    } catch (error: any | unknown) {
      next(error);
    }
  }

  public static async getAllInternLeaves(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authId = req.user.user_id;
      await LeaveApplicationService.getAllInternLeavesService(res, authId);
    } catch (error) {
      next(error);
    }
  }
}

export default leaveApplicationController;
