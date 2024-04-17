import { Request, Response, NextFunction } from "express";
import { IMentorRequest, functionReq } from "../@types/interface/CustomRequest";
import {
  createMentorServicde,
  deleteMentorService,
  getMentorService,
  updateMentorService,
} from "../services/mentor.service";
import mongoose from "mongoose";
export const createMentor: functionReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mentorName, email, expertise, role }: IMentorRequest = req.body;
  return createMentorServicde(res, mentorName, email, expertise, role);
};

export const deleteMentor: functionReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string | mongoose.Types.ObjectId = req.params.id;
  return deleteMentorService(res, id);
};

export const getMentor: functionReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name: string =
    typeof req.body.name === "string" ? req.body.name : false;
  return getMentorService(res, name);
};

export const updateMentor: functionReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, newName, email, expertise, role } = req.body;
  return updateMentorService(res, name, newName, email, expertise, role);
};
