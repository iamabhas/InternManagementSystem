import user from "../../database/schema/user.schema";
import { Response } from "express";
import { sendResponse } from "../../helpers/customResponse";

export class MentorServices {
  public static async getMentorExpertiseService(res: Response) {
    const existMentor = await user.findOne({ role: "mentor" });
    sendResponse(res, 201, "Mentor Expertise", existMentor);
  }
}
