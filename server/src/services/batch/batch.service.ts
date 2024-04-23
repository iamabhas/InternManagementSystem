import Batch from "../../database/schema/batch.schema";
import { Request, Response } from "express";

export class BatchService {
  public static async getAllBatchServices(req: Request, res: Response) {
    const batchList = await Batch.find({})
      .populate({
        path: "interns",
        select: "fullname role ",
      })
      .populate({
        path: "mentor",
        select: "fullname expertise position",
      });

    return res.status(201).json({
      message: "Batch List",
      data: batchList,
    });
  }
}
