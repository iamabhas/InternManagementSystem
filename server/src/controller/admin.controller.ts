import { AdminService } from "../services/admin/admin.service";
import { Request, Response, NextFunction } from "express";
import {
  createBatchServices,
  getBatchService,
} from "../services/admin.service";
import { handleFourStatusError } from "../utils/Errors/CommonFourResponseError";

export const createBatch: functionReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return createBatchServices(res, req.body);
};

export const getBatch: functionReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  if (!id) {
    return handleFourStatusError(res, 400, "ERROR", "ID DOES NOT EXISTS");
  }
  return getBatchService(res, id);
};
