import mongoose from "mongoose";
import Batch from "../../database/schema/batch.schema";
import { Request, Response } from "express";
import user from "../../database/schema/user.schema";
import AppError from "../../utils/errorUtils/appError";
import { sendResponse } from "../../helpers/customResponse";

export class BatchService {
  public static async getAllBatchServicesForDashBoard(res: Response) {
    const batchList = await Batch.find({})
      .populate({
        path: "interns",
        select: " -_id fullname role ",
      })
      .populate({
        path: "mentor",
        select: " -_id fullname expertise position",
      });

    if (!batchList) {
      throw new AppError("Batch Cannot be Fetched", 401);
    }
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
          name: 1,
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
          name: 1,
          numberOfMentor: 1,
        },
      },
    ]);

    let data: Array<any> = [];

    batchList.forEach((batch) => {
      data.push({
        Batchname: batch.name,
        Interns: batch.interns.length,
        Mentors: batch.mentor.length,
      });
    });

    return res.status(201).json({
      message: "Batch List",
      data,
    });
  }

  public static async getAllBatchServices(res: Response) {
    const batchList = await Batch.find({})
      .populate({
        path: "interns",
        select: " -_id fullname role ",
      })
      .populate({
        path: "mentor",
        select: " -_id fullname expertise position",
      });

    if (!batchList) {
      throw new AppError("Batch Cannot be Fetched", 401);
    }
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
  }
  public static async getBatchByIdService(
    res: Response,
    id: string | undefined | mongoose.Types.ObjectId
  ) {
    const existingBatch = await Batch.find({ _id: id }).countDocuments();
    if (existingBatch === 0 || existingBatch < 0) {
      throw new AppError("Batch Is Not Available", 400);
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

    return sendResponse(res, 200, "Batch Fetches SuccessFully", existBatch);
  }

  public static async getAllInternService(res: Response) {
    const internList = await user
      .find({ role: "intern" })
      .populate({ path: "Batch", select: "-_id name" });

    if (!internList || internList === null || undefined) {
      throw new AppError("Error Fetching Intern List", 401);
    }

    return sendResponse(res, 200, "Intern List", internList);
  }

  public static async getInternByID(
    res: Response,
    id: string | mongoose.Types.ObjectId | undefined
  ) {
    const existsIntern = await user
      .findOne({ _id: id })
      .select("-expertise -status")
      .populate({
        path: "Batch",
        select: " -_id name",
      });
    if (!existsIntern) {
      throw new AppError("Intern Does Not Exists", 403);
    }
    console.log(existsIntern.get("fullname"));
    if (
      existsIntern.get("_id") == id &&
      existsIntern.get("role").includes("intern")
    ) {
      return sendResponse(
        res,
        201,
        `${existsIntern.get("fullname")} Profile`,
        existsIntern
      );
    }
  }

  public static async getAllMentorService(res: Response) {
    const mentorList = await user
      .find({ role: "mentor" })
      .populate({ path: "Batch", select: "-_id name" });

    mentorList.forEach((mentor) => {
      if (mentor.role !== "mentor") {
        throw new AppError("Mentor Is Not Available", 401);
      }
    });

    return sendResponse(res, 201, "Mentors", mentorList);
  }
}
