import mongoose from "mongoose";
import LeaveApplication from "../../database/schema/leaveApplication.schema";
import { Response, NextFunction, application } from "express";
import AppError from "../../utils/errorUtils/appError";
import user from "../../database/schema/user.schema";
import { sendResponse } from "../../helpers/customResponse";
import PDF from "../../utils/pdfUtils/pdf";
import { roleConstants } from "../../constants/roleConstants";
const { ADMIN } = roleConstants;
export class LeaveApplicationService {
  public static async createLeaveApplication(
    res: Response,
    userId: mongoose.Types.ObjectId | string,
    body: any,
    next: NextFunction
  ) {
    const existUser = await user
      .findOne({ _id: userId })
      .populate({ path: "Batch", select: "name" });
    const { subject, applicationBody, leaveFromDate, leaveToDate } = body;
    const currentDate = new Date();
    const leaveDate = new Date(leaveFromDate);
    if (leaveDate < currentDate) {
      throw new AppError(
        "Start of leave date must be on or after the current date",
        400
      );
    }
    if (leaveDate >= leaveToDate) {
      throw new AppError(
        "Start of leave Date must be  earlier than End of leave Date",
        400
      );
    }
    const newLeaveApplication = {
      User: userId,
      Batch: existUser?.Batch,
      subject: subject,
      applicationBody: applicationBody,
      leaveFromDate: leaveFromDate,
      leaveToDate: leaveToDate,
    };
    const leaveApplication = new LeaveApplication(newLeaveApplication);

    await leaveApplication.save();

    sendResponse(
      res,
      201,
      "Leave Application created SuccessFully",
      leaveApplication
    );
  }

  public static async getAllApplications(
    res: Response,
    userId: mongoose.Types.ObjectId | string,
    next: NextFunction
  ) {
    const applications = await LeaveApplication.find({}).populate({
      path: "Batch",
      select: "name",
    });
    if (!applications) {
      throw new AppError("Leave Application Cannot Be Fetched", 403);
    }
    sendResponse(res, 201, "Data Fetches SuccessFully", applications);
  }

  public static async verifiedLeaveService(
    res: Response,
    id: string | mongoose.Types.ObjectId
  ) {
    console.log("Hi");
    const checkLeave = await LeaveApplication.findOne({ _id: id });
    if (!checkLeave) {
      throw new AppError("Leave Is Expired or Does not Exists", 400);
    }
    await LeaveApplication.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          approveStatus: true,
        },
      },
      {
        new: true,
      }
    );

    return sendResponse(res, 200, "Leave Is Verified SuccessFully");
  }

  public static async DowloadLeaveService(
    res: Response,
    id: string | undefined,
    adminId: string | undefined
  ) {
    const existAdmin = await user.findOne({ _id: adminId });
    const check = existAdmin?.get("role") === ADMIN ? true : false;

    if (!check) {
      throw new AppError(
        "Admin Are Only Allowed To View Or Dowload Leave Applications",
        401
      );
    }

    const existLeave = await LeaveApplication.findOne({ _id: id });
    if (!existLeave) {
      throw new AppError("Leave Is Already Removed Or It Does Not Exists", 401);
    }

    const sendDate = existLeave.get("sendDate");
    const leaveFromDate = existLeave.get("leaveFromDate");
    const leaveToDate = existLeave.get("leaveToDate");
    const subject = existLeave.get("subject");
    const applicationBody = existLeave.get("applicationBody");

    //sample Testing For Now
    const pdf = await PDF.htmlToPdf(
      `<html>
      <body>
      <h1>${subject}</h1>
      <h2>${applicationBody}</h2>
      <p><span>Leave Date </span>${leaveFromDate} </p>
      <p><span>Leave To  Date </span>${leaveToDate} </p>
      <h1>Leave Send At: ${sendDate}</h1>
      </body>
      </html>`
    );
    res.contentType("application/pdf");
    res.send(pdf);
  }
}
