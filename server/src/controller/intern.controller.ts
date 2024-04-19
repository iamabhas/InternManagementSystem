import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { functionReq } from "../@types/interface/CustomRequest";
import { getInternById } from "../services/intern.service";
export const getInternByIdController: functionReq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string | mongoose.Types.ObjectId | undefined = req.params.id;
  return getInternById(res, id);
};
