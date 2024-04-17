import { Response } from "express";
import Mentor from "../database/schema/mentor.schema";
import { statusConstants } from "../constants/statusConstants";
import { handleTwoErrorResponse } from "../utils/Errors/CommonoTwoResponseError";
import { mentorName } from "../constants/mentorConstant";
import { handleFourStatusError } from "../utils/Errors/CommonFourResponseError";
const { Prabesh, Subash } = mentorName;
const { FAIL, SUCCESS, ERROR } = statusConstants;
export const createMentorServicde = async (
  res: Response,
  mentorName: string,
  email: string,
  expertise: string[],
  role: string
) => {
  console.log(mentorName, email, expertise, role);

  const mentorArray: Array<String> = [Prabesh, Subash];
  if (!mentorArray.includes(mentorName)) {
    return handleFourStatusError(
      res,
      401,
      ERROR,
      "Mentor You are Trying To Assigned Is not Available"
    );
  }

  const Mentorr = new Mentor({
    mentorName: mentorName,
    email: email,
    expertise: expertise,
    role: role,
  });

  const savedMentor = Mentorr.save();
  return handleTwoErrorResponse(res, 201, true, "Mentor Saved SuccessFully");
};
