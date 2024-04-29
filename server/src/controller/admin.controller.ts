import { AdminService } from "../services/admin/admin.service";
import { Request, Response, NextFunction } from "express";
import {
  createBatchServices,
  getBatchService,
  getBatchByIdService,
} from "../services/admin.service";
import { handleFourStatusError } from "../utils/Errors/CommonFourResponseError";
import { functionReq } from "../@types/interface/CustomRequest";

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


export const getBatchById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  try {
    const result = await getBatchByIdService(res, id);
    return result; 
  } catch (error) {
    console.error('Error in getBatchById controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

