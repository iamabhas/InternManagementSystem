import { MentorServices } from "../services/mentorServices/mentor.service";
import { Request, Response, NextFunction } from "express";
export class MentorController {
  public static async getMentorExpertise(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await MentorServices.getMentorExpertiseService(res);
    } catch (error: any | unknown) {
      next(error);
    }
  }
}
