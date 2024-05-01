import { AdminService } from "../services/adminServices/admin.service";
import { Request, Response, NextFunction } from "express";

class adminController {
  public static async createBatch(
    req: Request,
    res: Response,
    next: NextFunction
  ):Promise<void> {
    try {
      const body = req.body;
      await AdminService.createBatchService(res, body, next);
    } catch (err: any) {
      next(err);
    }
  }

  public static async registerInterns(
    req: Request,
    res: Response,
    next: NextFunction
  ):Promise<void> {
    try {
      const body = req.body;
      await AdminService.registerInternService(res, body, next);
    } catch (err: any) {
      console.log(err);
      next(err);
    }
  }

  public static async registerMentors(
    req: Request,
    res: Response,
    next: NextFunction
  ):Promise<void> {
    try {
      const body = req.body;

      await AdminService.registerMentorService(res, body, next);
    } catch (err: any) {
      next(err);
    }
  }
}

export default adminController;
