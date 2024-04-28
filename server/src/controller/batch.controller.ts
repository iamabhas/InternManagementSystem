import { Request, Response } from "express";
import { BatchService } from "../services/batchServices/batch.service";
import mongoose from "mongoose";
export class BatchController {
  public static async getBatchController(req: Request, res: Response) {
    try {
      await BatchService.getAllBatchServices(req, res);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  public static async getBatchByIdController(req: Request, res: Response) {
    try {
      const id: string | mongoose.Types.ObjectId = req.params.id;
      await BatchService.getBatchByIdService(res, id);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
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

  public static async getAllIntern(req: Request, res: Response) {
    try {
      await BatchService.getAllInternService(res);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  public static async getInternById(req: Request, res: Response) {
    try {
      const id: string | mongoose.Types.ObjectId | undefined = req.params.id;
      await BatchService.getInternByID(res, id);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
}
