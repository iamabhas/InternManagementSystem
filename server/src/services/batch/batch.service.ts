import mongoose from "mongoose";
import Batch from "../../database/schema/batch.schema";
import { Request, Response } from "express";
import user from "../../database/schema/user.schema";

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

    const testing = await Batch.aggregate([
      {
        $lookup: {
          from: "batch",
          localField: "_id",
          foreignField: "interns",
          as: "OutputArry",
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
        },
      },
    ]);

    return res.status(201).json({
      message: "Batch List",
      testing: testing,
      data: batchList,
    });
  }

  public static async getBatchByIdService(
    res: Response,
    id: string | undefined | mongoose.Types.ObjectId
  ) {
    console.log("I reached here");
    const existingBatch = await Batch.find({ _id: id }).countDocuments();
    if (existingBatch === 0 || existingBatch < 0) {
      return res.status(400).json({
        error: "ERROR",
        status: 400,
        message: "Batch with The Given Id is not available",
      });
    }

    const existBatch = await Batch.findOne({ _id: id })
      .populate({
        path: "interns",
        select: "fullname",
      })
      .populate({
        path: "mentor",
        select: "fullname expertise position",
      });

    const computeInternSize = await Batch.aggregate([
      {
        $unwind: {
          path: "$interns",
        },
      },
      {
        $group: {
          _id: "$_id",
          numberOfInterns: {
            $sum: 1,
          },
        },
      },
      {
        $group: {
          _id: null,
          averageNumberOfInterns: {
            $avg: "$numberOfInterns",
          },
        },
      },
      {
        $project: {
          _id: 0,
          averageNumberOfInterns: 1,
        },
      },
    ]);

    const anotherTry = await Batch.aggregate([
      {
        $addFields: {
          numberOfInterns: {
            $size: "$interns",
          },
        },
      },
      {
        $project: {
          numberOfInterns: 1,
        },
      },
    ]);

    return res.status(200).json({
      error: "OK",
      status: 201,
      message: "Batch Fetches SuccessFully",
      data: existBatch,
      AverageInternInBatch: computeInternSize,
      anotherTry: anotherTry,
    });
  }

  public static async getAllInternService(res: Response) {
    const internList = await user
      .find({ role: "intern" })
      .select("fullname email ");
    if (!internList || internList === null || undefined) {
      return res.status(401).json({
        error: "ERROR",
        message: "Error Fetching Intern List",
      });
    }

    const testing = await Batch.aggregate([
      {
        $lookup: {
          from: "batch",
          localField: "_id",
          foreignField: "interns",
          as: "OutputArry",
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
        },
      },
    ]);
    return res.status(200).json({
      status: 200,
      message: "Intern List",
      internList: internList,
      test: testing,
    });
  }

  public static async getInternByID(
    res: Response,
    id: string | mongoose.Types.ObjectId | undefined
  ) {
    const existsIntern = await user
      .findOne({ _id: id })
      .select("-expertise -status");
    if (!existsIntern) {
      return res.status(403).json({
        error: "ERROR",
        status: 403,
        message: "Intern Is Not Available",
      });
    }
    console.log(existsIntern.get("fullname"));
    if (
      existsIntern.get("_id") == id &&
      existsIntern.get("role").includes("intern")
    ) {
      const loookupTesting = await Batch.aggregate([
        {
          $lookup: {
            from: "batch",
            localField: "_id",
            foreignField: "interns",
            as: "OutputArry",
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
          },
        },
      ]);

      return res.status(201).json({
        status: 201,
        message: `${existsIntern.get("fullname")} Profile`,
        data: existsIntern,
        Batch: loookupTesting,
      });
    }
  }
}
