import { NextFunction, Request, Response } from "express";
import { BatchService } from "../services/batchServices/batch.service";
import mongoose from "mongoose";
import { AdminService } from "../services/adminServices/admin.service";
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

  public static async deleteBatchByIdController(req: Request, res: Response) {
    try {
      const id: string | mongoose.Types.ObjectId = req.params.id;
      await BatchService.deleteBatchByIdService(res, id);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  public static async getAllIntern(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await BatchService.getAllInternService(res);
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
      const id: string | mongoose.Types.ObjectId | undefined = req.params.id;
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

  public static async getALLCompletedBatch(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await BatchService.getAllCompletedBatchService(res);
    } catch (err: any | unknown) {
      next(err);
    }
  }

  public static async getAllOngoingBatch(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await BatchService.getAllOngoingBatchService(res);
    } catch (err: any | unknown) {
      next(err);
    }
  }
}
