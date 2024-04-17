import Mentor from "../database/schema/mentor.schema";
import { statusConstants } from "../constants/statusConstants";
import { handleTwoErrorResponse } from "../utils/Errors/CommonoTwoResponseError";
import { mentorName } from "../constants/mentorConstant";
import { handleFourStatusError } from "../utils/Errors/CommonFourResponseError";
const { Prabesh, Subash } = mentorName;
import { Response } from "express";
import mongoose from "mongoose";
const { FAIL, SUCCESS, ERROR } = statusConstants;
export const createMentorServicde = async (
  res: Response,
  mentorName: string,
  email: string,
  expertise: string[],
  role: string
) => {
  console.log(mentorName, email, expertise, role);

  const mentorArray: Array<String> = [Prabesh, Subash];
  if (!mentorArray.includes(mentorName)) {
    return handleFourStatusError(
      res,
      401,
      ERROR,
      "Mentor You are Trying To Assigned Is not Available"
    );
  }

  const Mentorr = new Mentor({
    mentorName: mentorName,
    email: email,
    expertise: expertise,
    role: role,
  });

  const savedMentor = Mentorr.save();
  return handleTwoErrorResponse(
    res,
    201,
    true,
    "Mentor Saved SuccessFully",
    Mentorr._id
  );
};

export const deleteMentorService: (
  res: Response,
  id: string | mongoose.Types.ObjectId
) => void = async (res: Response, id: string | mongoose.Types.ObjectId) => {
  if (typeof id === "number") {
    return handleFourStatusError(
      res,
      404,
      ERROR,
      "ID EXCEEDED THE MAXIMUM LENGTH"
    );
  }
  await Mentor.deleteOne({ _id: id }).then((data) => {
    return handleTwoErrorResponse(res, 204, true, "Delete SuccessFully");
  });
};

export const getMentorService: (res: Response, name: string) => void = async (
  res: Response,
  name: string
) => {
  console.log();
  if (
    typeof name !== "string" ||
    !(name.split(" ").reverse().join(" ") === name)
  ) {
    return handleFourStatusError(res, 403, ERROR, "Name is not a Valid String");
  }
  const findMentor = await Mentor.findOne({ mentorName: name });
  const checkBoolean = findMentor?._id === null ? false : true;
  if (checkBoolean) {
    return res.status(202).json({
      Mentor: findMentor,
    });
  }
};

export const updateMentorService: (
  res: Response,
  name: string,
  newName: string,
  email: string,
  expertise: string[],
  role: string
) => void = async (
  res: Response,
  name: string,
  newName: string,
  email: string,
  expertise: string[],
  role: string
) => {
  const findMentor = await Mentor.findOne({ mentorName: name });
  if (!findMentor || findMentor === null || undefined) {
    return handleFourStatusError(res, 404, ERROR, "Mentor is Not Available");
  }
  await Mentor.updateOne(
    { mentorName: name },
    {
      $set: {
        mentorName: newName,
        email: email,
        expertise: expertise,
        role: role,
      },
    }
  ).then((data) => {
    if (data.matchedCount === 0) {
      return handleFourStatusError(res, 404, ERROR, "No Mentor is Matches");
    } else if (data.modifiedCount === 0) {
      return handleFourStatusError(res, 404, ERROR, "No Mentor is Modified");
    } else {
      return data;
    }
  });

  const updatedMentor = await Mentor.findOne({ mentorName: newName });
  if (updatedMentor !== null || undefined) {
    return res.status(201).json({
      message: `${name} Has Been Updated to ${newName}`,
      data: updatedMentor,
    });
  }
};
