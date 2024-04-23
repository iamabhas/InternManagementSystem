import { Request, Response } from "express";
import { BatchService } from "../services/batch/batch.service";
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
}
