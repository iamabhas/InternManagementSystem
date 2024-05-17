import { Request, Response, NextFunction } from "express";
import { InternQualificationService } from "../services/internServices/internQualification.service";
import { validationResult } from "express-validator";
import AppError from "../utils/errorUtils/appError";

export class internQualificationController {
  public static async addQualificationsController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.user_id;
      const body = req.body;
      await InternQualificationService.addQualifications(res, userId, body);
    } catch (err: any) {
      next(err);
    }
  }

  public static async getQualificationsByIdController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return next(
        new AppError(
          result.array().map((data) => data.msg),
          401
        )
      );
    }

    try {
      await InternQualificationService.getInternQualificationById(
        res,
        req.params.id,
        next
      );
    } catch (err: any) {
      next(err);
    }
  }

  public static async getInternQualificationByBatchController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return next(
        new AppError(
          result.array().map((data) => data.msg),
          401
        )
      );
    }
    const batchId = req.params.batchId;
    try {
      await InternQualificationService.getInternQualificationByBatch(
        res,
        batchId,
        next
      );
    } catch (err: any) {
      next(err);
    }
  }

  public static async downloadBatchDataController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return next(
        new AppError(
          result.array().map((data) => data.msg),
          401
        )
      );
    }

    try {
      const batchId = req.params.batchId;
      const workbook: any = await InternQualificationService.downloadBatchData(
        res,
        batchId
      );

      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      next(err);
    }
  }
}

export default internQualificationController;
