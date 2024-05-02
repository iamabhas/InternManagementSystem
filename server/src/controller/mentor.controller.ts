import { NextFunction } from "express";
import { MentorServices } from "../services/mentorServices/mentor.service";

export class MentorController {
  public static async getMentorExpertise(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await MentorServices.getMentorExpertiseService(res);
    } catch (error: any | unknown) {
      next(error);
    }
  }
}
