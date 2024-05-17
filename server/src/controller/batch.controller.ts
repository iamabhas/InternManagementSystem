import { NextFunction, Request, Response } from "express";
import { BatchService } from "../services/batchServices/batch.service";
import mongoose from "mongoose";
import { AdminService } from "../services/adminServices/admin.service";
import { validationResult } from "express-validator";
import AppError from "../utils/errorUtils/appError";
export class BatchController {
  public static async getBatchController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await BatchService.getAllBatchServices(res);
    } catch (err: any) {
      next(err);
    }
  }

  public static async getBatchControllerPieChart(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await BatchService.getAllBatchServicesForDashBoard(res);
    } catch (err: any) {
      next(err);
    }
  }

  public static async getBatchByIdController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id: string | mongoose.Types.ObjectId = req.params.id;
      await BatchService.getBatchByIdService(res, id);
    } catch (err: any) {
      next(err);
    }
  }

  public static async getAllIntern(
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
      await BatchService.getAllInternService(res, pagination);
    } catch (err: any) {
      next(err);
    }
  }

  public static async getInternById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id: string | mongoose.Types.ObjectId = req.params.id;
      await BatchService.getInternByID(res, id);
    } catch (err: any) {
      next(err);
    }
  }
  public static async getAllMentors(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await BatchService.getAllMentorService(res);
    } catch (err: any | unknown) {
      next(err);
    }
  }

  public static async getAllDashBoard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await BatchService.getAllBatchServicesForDashBoard(res);
    } catch (err: any | unknown) {
      next(err);
    }
  }
  public static async deleteBatchById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const batchId = req.params.id;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return next(
          new AppError(
            result.array().map((data) => data.msg),
            401
          )
        );
      }
      await BatchService.deleteBatchByIdService(res, batchId);
    } catch (error) {
      next(error);
    }
  }

  public static async updateBatchById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return next(
          new AppError(
            result.array().map((data) => `${data.msg}`),
            401
          )
        );
      }
      const body = req.body;
      const batchId = req.params.id;
      await BatchService.updateBatchByIdservice(res, batchId, body);
    } catch (error) {
      next(error);
    }
  }
}
