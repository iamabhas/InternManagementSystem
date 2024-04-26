import { AdminService } from "../services/adminServices/admin.service";
import { Request, Response, NextFunction } from "express";

class adminController {
  public static async createBatch(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      await AdminService.createService(res, body, next);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        message: "Failed To Create Batch",
        error: err.message,
      });
    }
  }

  public static async registerInterns(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      await AdminService.registerService(res, body, next);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        message: "Failed To Register Intern",
        error: err.message,
      });
    }
  }

  public static async registerMentors(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;

      await AdminService.registerMentorService(res, body, next);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        message: "Failed To Register Intern",
        error: err.message,
      });
    }
  }
}

export default adminController;
