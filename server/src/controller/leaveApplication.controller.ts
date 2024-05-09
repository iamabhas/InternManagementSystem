import { Request, Response, NextFunction } from "express";
import { LeaveApplicationService } from "../services/leaveApplicationServices/leaveApplication.service";
import mongoose from "mongoose";
import LeaveApplication from "../database/schema/leaveApplication.schema";
import { validationResult } from "express-validator";
import AppError from "../utils/errorUtils/appError";

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
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const size = req.query.size ? parseInt(req.query.size as string) : 3;
      const pagination = {
        page,
        size,
      };
      await LeaveApplicationService.getAllApplications(
        res,
        id,
        next,
        pagination
      );
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
      const result = validationResult(req);

      if (!result.isEmpty()) {
        return next(
          new AppError(
            result.array().map((data) => data.msg),
            401
          )
        );
      }
      const id = req.params.id;
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
      const result = validationResult(req);

      if (!result.isEmpty()) {
        return next(
          new AppError(
            result.array().map((data) => data.msg),
            401
          )
        );
      }
      const id = req.params.id;
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
      const result = validationResult(req);

      if (!result.isEmpty()) {
        return next(
          new AppError(
            result.array().map((data) => data.msg),
            401
          )
        );
      }
      const id = req.params.id;
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
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const size = req.query.size ? parseInt(req.query.size as string) : 5;
      const pagination = {
        page,
        size,
      };
      const authId = req.user.user_id;
      await LeaveApplicationService.getAllInternLeavesService(
        res,
        authId,
        pagination
      );
    } catch (error) {
      next(error);
    }
  }
  public static async filterDate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reqDate: any = req.query.targetDate;
      await LeaveApplicationService.filterDateServices(res, reqDate);
    } catch (error: any | unknown) {
      next(error);
    }
  }
}

export default leaveApplicationController;
