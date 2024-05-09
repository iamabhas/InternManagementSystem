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
    // const computeInternSize = await Batch.aggregate([
    //   {
    //     $unwind: {
    //       path: "$interns",
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       numberOfInterns: {
    //         $sum: 1,
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       averageNumberOfInterns: {
    //         $avg: "$numberOfInterns",
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       averageNumberOfInterns: 1,
    //     },
    //   },
    // ]);

    // const ListOfInterns = await Batch.aggregate([
    //   {
    //     $addFields: {
    //       numberOfInterns: {
    //         $size: "$interns",
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       name: 1,
    //       numberOfInterns: 1,
    //     },
    //   },
    // ]);

    // const ListOfMentors = await Batch.aggregate([
    //   {
    //     $addFields: {
    //       numberOfMentor: {
    //         $size: "$mentor",
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       name: 1,
    //       numberOfMentor: 1,
    //     },
    //   },
    // ]);

    let data: Array<any> = [];

    batchList.forEach((batch) => {
      if (new Date() < new Date(batch.endDate)) {
        data.push({
          id: batch._id,
          Batchname: batch.name,
          Interns: batch.interns.length,
          Mentors: batch.mentor.length,
        });
      }
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

  public static async getAllInternService(
    res: Response,
    pagination: object | any
  ) {
    const { page, size } = pagination;
    const skip = (page - 1) * size;

    const internList = await user
      .find({ role: "intern" })
      .populate({ path: "Batch", select: "-_id name" })
      .skip(skip)
      .limit(size);

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

  public static async fetchBatchByFilterService(
    res: Response,
    check: string | any
  ) {
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
    let data;

    switch (check) {
      case "completed": {
        data = await Batch.find({ endDate: { $lt: new Date() } })
          .populate({
            path: "interns",
            select: " -_id fullname role ",
          })
          .populate({
            path: "mentor",
            select: " -_id fullname expertise position",
          });
        break;
      }
      case "ongoing": {
        data = await Batch.find({ endDate: { $gt: new Date() } })
          .populate({
            path: "interns",
            select: " -_id fullname role ",
          })
          .populate({
            path: "mentor",
            select: " -_id fullname expertise position",
          });
        break;
      }
      case "all": {
        data = await Batch.find({})
          .populate({
            path: "interns",
            select: " -_id fullname role ",
          })
          .populate({
            path: "mentor",
            select: " -_id fullname expertise position",
          });
        break;
      }
      default:
    }
    if (data === null || undefined) {
      throw new AppError("No Batch Matches Any Filter", 401);
    }
    return sendResponse(res, 201, "Batches", data);
  }

  public static async deleteBatchByIdService(
    res: Response,
    batchId: string | undefined
  ) {
    const existsBatch = await Batch.findOne({ _id: batchId });
    if (existsBatch === null || existsBatch.get("name") == null) {
      throw new AppError("Batch Does Not Exists", 401);
    }
    if (existsBatch.get("endDate") > new Date()) {
      throw new AppError(
        "Batch Is Currently Running, Please Contact Mentors And Interns Before Deleting It",
        401
      );
    }
    await Batch.deleteOne({ _id: batchId })
      .then((message) => {
        if (message) {
          return sendResponse(res, 201, "Batch Deleted SuccessFully");
        }
      })
      .catch((error) => {
        throw new AppError(error.message, 401);
      });
  }
  public static async updateBatchByIdservice(
    res: Response,
    batchId: string,
    body: object | any
  ) {
    const { name, startDate, endDate } = body;
    const existsBatch = await Batch.findOne({ _id: batchId });
    if (typeof existsBatch !== "object" || existsBatch === null) {
      throw new AppError("Batch Cannot Be Updated", 401);
    }
    await Batch.updateOne(
      { _id: batchId },
      {
        $set: {
          name: name,
          startDate: startDate,
          endDate: endDate,
        },
      },
      {
        $new: true,
      }
    );
    return sendResponse(
      res,
      201,
      `${existsBatch.name} Has Been Updated SuccessFully`
    );
  }
}
