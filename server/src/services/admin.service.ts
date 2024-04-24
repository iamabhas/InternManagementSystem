import user from "../database/schema/user.schema";
import Batch from "../database/schema/batch.schema";
import { todayDate } from "../utils/Date/date";
import { Response } from "express";
import { handleFourStatusError } from "../utils/Errors/CommonFourResponseError";

export const createBatchServices = async (res: Response, body: any) => {
  const { name, startDate, endDate, completed, interns, mentor } = body;
  const date = todayDate();

  const mentorChecked = await user.findOne({ _id: mentor });
  if (mentorChecked?._id != mentor[0]) {
    return handleFourStatusError(res, 400, "ERROR", "Mentor Is Not Available");
  }
  try {
    const savedBatch = new Batch({
      name: name,
      startDate : startDate,
      endDate: endDate,
      interns: interns,
      mentor: mentor,
    });

    const batch = await savedBatch.save();

    return res.status(201).json({
      Batch: batch,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: 500,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

export const getBatchService = async (res: Response, id: string) => {
  const batch = await Batch.findOne({ _id: id })
    .populate({
      path: "interns",
      select: "fullname role",
    })
    .populate({
      path: "mentor",
      select: "fullname position",
    });

  try {
    const numberOfMentor = await Batch.aggregate([
      {
        $unwind: "$mentor",
      },
      {
        $group: { _id: "_id", NumberOfmentors: { $sum: 1 } },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    /*
[{
  $addFields:{
   numberofinterns:{
    $size: {$ifNull:["$interns",[]]}
   }
  }
}]
    */
    const numberOfInterns = await Batch.aggregate([
      {
        $unwind: "$interns",
      },
      {
        $group: {
          _id: "$_id",
          numberOfInterns: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    return res.status(201).json({
      message: "Batch",
      mentor: numberOfMentor,
      interns: numberOfInterns,
      data: batch,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: 500,
      message: "INTERNAL SERVER ERROR",
    });
  }
};


export const getBatchByIdService = async (res: Response, id: string) => {
  try {
    const batch = await Batch.findOne({ _id: id })
      .populate({
        path: "interns",
        select: "fullname role",
      })
      .populate({
        path: "mentor",
        select: "fullname position",
      });

    if (!batch) {
      return handleFourStatusError(res, 404, "ERROR", "Batch not found");
    }

    return res.status(200).json({
      message: "Batch found",
      data: batch,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: 500,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

