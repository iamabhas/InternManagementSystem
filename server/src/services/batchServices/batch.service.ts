import mongoose from "mongoose";
import Batch from "../../database/schema/batch.schema";
import { Request, Response } from "express";
import user from "../../database/schema/user.schema";

export class BatchService {
  public static async getAllBatchServices(req: Request, res: Response) {
    try {
      const batchList = await Batch.find({})
        .populate({
          path: "interns",
          select: " -_id fullname role ",
        })
        .populate({
          path: "mentor",
          select: " -_id fullname expertise position",
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

      const ListOfInterns = await Batch.aggregate([
        {
          $addFields: {
            numberOfInterns: {
              $size: "$interns",
            },
          },
        },
        {
          $project: {
            _id: 0,
            numberOfInterns: 1,
          },
        },
      ]);

      const ListOfMentors = await Batch.aggregate([
        {
          $addFields: {
            numberOfMentor: {
              $size: "$mentor",
            },
          },
        },
        {
          $project: {
            _id: 0,
            numberOfMentor: 1,
          },
        },
      ]);

      return res.status(201).json({
        message: "Batch List",
        data: batchList,
        AverageInternInBatch: computeInternSize,
        InternList: ListOfInterns,
        MentorList: ListOfMentors,
      });
    } catch (err: any | unknown) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  public static async getBatchByIdService(
    res: Response,
    id: string | undefined | mongoose.Types.ObjectId
  ) {
    try {
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
          select: "-_id fullname",
        })
        .populate({
          path: "mentor",
          select: "-_id fullname expertise position",
        });

      return res.status(200).json({
        error: "OK",
        status: 201,
        message: "Batch Fetches SuccessFully",
        data: existBatch,
      });
    } catch (err: any | unknown) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  public static async deleteBatchByIdService(
    res: Response,
    id: string | undefined | mongoose.Types.ObjectId
  ) {
    try {
      const existingBatch = await Batch.find({ _id: id }).countDocuments();
      if (existingBatch === 0 || existingBatch < 0) {
        return res.status(400).json({
          error: "ERROR",
          status: 400,
          message: "Batch with The Given Id is not available",
        });
      }

      const existBatch = await Batch.findOneAndDelete({ _id: id })
        .populate({
          path: "interns",
          select: "-_id fullname",
        })
        .populate({
          path: "mentor",
          select: "-_id fullname expertise position",
        });

      return res.status(200).json({
        error: "OK",
        status: 201,
        message: "Batch Deleted SuccessFully",
        data: existBatch,
      });
    } catch (err: any | unknown) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  public static async getAllInternService(res: Response) {
    try {
      const internList = await user
        .find({ role: "intern" })
        .populate({ path: "Batch", select: "-_id name" });

      if (!internList || internList === null || undefined) {
        return res.status(401).json({
          error: "ERROR",
          message: "Error Fetching Intern List",
        });
      }

      // const testing = await Batch.aggregate([
      //   {
      //     $lookup: {
      //       from: "batch",
      //       localField: "_id",
      //       foreignField: "interns",
      //       as: "OutputArry",
      //     },
      //   },
      //   {
      //     $project: {
      //       _id: 0,
      //       name: 1,
      //     },
      //   },
      // ]);
      return res.status(200).json({
        status: 200,
        message: "Intern List",
        internList: internList,
      });
    } catch (err: any | unknown) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }

  public static async getInternByID(
    res: Response,
    id: string | mongoose.Types.ObjectId | undefined
  ) {
    try {
      const existsIntern = await user
        .findOne({ _id: id })
        .select("-expertise -status")
        .populate({
          path: "Batch",
          select: " -_id name",
        });
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
        return res.status(201).json({
          status: 201,
          message: `${existsIntern.get("fullname")} Profile`,
          data: { intern: existsIntern, Batch },
        });
      }
    } catch (err: any | unknown) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
}
