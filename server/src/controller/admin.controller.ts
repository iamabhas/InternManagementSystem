import { AdminService } from "../services/admin/admin.service";
import { Request, Response, NextFunction } from "express";

class adminController extends AdminService {
  public static async createBatch(req: Request, res: Response) {
    try {
      const { name, startDate, endDate } = req.body;
      await AdminService.createService(res, name, startDate, endDate);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        message: "Failed To Create Batch",
        error: err.message,
      });
    }
  }

  public static async registerInterns(req: Request, res: Response) {
    try {
      const { username, fullname, email, phoneNo, role, Batch } = req.body;
      await AdminService.registerService(
        res,
        username,
        fullname,
        email,
        phoneNo,
        role,
        Batch
      );
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        message: "Failed To Register Intern",
        error: err.message,
      });
    }
  }

  public static async registerMentors(req: Request, res: Response) {
    try {
      const {
        username,
        fullname,
        email,
        phoneNo,
        role,
        expertise,
        position,
        Batch,
      } = req.body;
      await AdminService.registerMentorService(
        res,
        username,
        fullname,
        email,
        phoneNo,
        role,
        expertise,
        position,
        Batch
      );
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
