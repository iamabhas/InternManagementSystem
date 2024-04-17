import { Request, Response, NextFunction } from "express";
import { IMentorRequest, functionReq } from "../@types/interface/CustomRequest";
import { createMentorServicde } from "../services/mentor.service";
export const createMentor: functionReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mentorName, email, expertise, role }: IMentorRequest = req.body;
  return createMentorServicde(res, mentorName, email, expertise, role);
};
