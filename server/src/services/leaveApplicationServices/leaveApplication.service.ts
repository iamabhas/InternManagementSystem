import mongoose from "mongoose";
import LeaveApplication from "../../database/schema/leaveApplication.schema";
import { Response, NextFunction, application } from "express";
import AppError from "../../utils/errorUtils/appError";
import user from "../../database/schema/user.schema";
import { sendResponse } from "../../helpers/customResponse";
import PDF from "../../utils/pdfUtils/pdf";
import { roleConstants } from "../../constants/roleConstants";
import { formatDate } from "../../helpers/dateFormatter";

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
    const applications = await LeaveApplication.find({})
      .populate({
        path: "Batch",
        select: " -_id name",
      })
      .populate({ path: "User", select: "-_id fullname" });
    if (!applications) {
      throw new AppError("Leave Application Cannot Be Fetched", 403);
    }
    sendResponse(res, 201, "Data Fetches SuccessFully", applications);
  }

  public static async getLeaveApplicationByUserId(
    res: Response,
    userId: mongoose.Types.ObjectId | string
  ) {
    const existsUser = await user.findOne({ _id: userId });
    if (existsUser?.get("Batch") === null || undefined) {
      throw new AppError("User Not Found", 401);
    }
    let checkBoolean = false;

    const data = await LeaveApplication.find({
      $and: [
        { User: userId },
        { approveStatus: true },
        { leaveToDate: { $gt: new Date() } },
        { leaveFromDate: { $lt: new Date() } },
      ],
    });

    return sendResponse(res, 200, `${existsUser?.fullname} Leaves`, data);
  }

  public static async verifiedLeaveService(res: Response, id: string) {
    const checkLeave = await LeaveApplication.findOne({ _id: id });
    if (!checkLeave) {
      throw new AppError("Leave Is Expired or Does not Exists", 400);
    }
    if (checkLeave.get("approveStatus") === true) {
      throw new AppError("Leave Is Already Approved", 400);
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
    id: string,
    adminId: string
  ) {
    const existAdmin = await user.findOne({ _id: adminId });
    const check = existAdmin?.get("role") === ADMIN ? true : false;

    if (!check) {
      throw new AppError(
        "Admin Are Only Allowed To View Or Dowload Leave Applications",
        401
      );
    }

    const existLeave = await LeaveApplication.findOne({ _id: id }).populate({
      path: "User",
      select: "-_id username",
    });
    if (!existLeave) {
      throw new AppError("Leave Is Already Removed Or It Does Not Exists", 401);
    }

    const sendDate = existLeave.get("sendDate");
    const subject = existLeave.get("subject");
    const { username }: any = existLeave.get("User");
    const applicationBody = existLeave.get("applicationBody");

    const pdf = await PDF.htmlToPdf(
      `<html>
      <body>
            <h1>UBA Solutions</h1>
            <p>Date: ${formatDate(sendDate)}</p>
            <h3>Subject: ${subject}</h3>
            <p>Dear HR, </p>
            <h4> ${applicationBody} </h4>
            <p>Sincerely, ${username} </p>
      </body>
      </html>`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=leave_application.pdf"
    );

    res.send(pdf);
  }

  public static async rejectLeaveService(res: Response, id: string) {
    const checkLeave = await LeaveApplication.findOne({ _id: id });
    if (!checkLeave) {
      throw new AppError("Leave Is Expired or Does not Exists", 400);
    }
    if (checkLeave.approveStatus === false || !checkLeave.approveStatus) {
      throw new AppError("Leave is Already Rejected", 400);
    }
    await LeaveApplication.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          approveStatus: false,
        },
      },
      {
        new: true,
      }
    );

    return sendResponse(res, 200, "Leave Is Rejected SuccessFully");
  }

  public static async viewCurrentLeaveService(res: Response) {
    const allLeave = await LeaveApplication.find({})
      .select(
        "-_id  -subject -applicationBody -leaveToDate -leaveFromDate -sendDate "
      )
      .populate({
        path: "User",
        select: "-_id fullname role email phoneNo",
      })
      .populate({
        path: "Batch",
        select: "-_id name",
      });
    let data: Array<any> = [];
    allLeave.forEach((leave) => {
      if (leave.get("approveStatus") && leave.get("approveStatus") === true) {
        data.push(leave);
      }
    });
    if (data.length === 0 || typeof data !== "object") {
      throw new AppError("There are no Intern on Current Leave", 401);
    }
    return sendResponse(res, 201, "Current Leave", data);
  }

  public static async IncomingApplicationService(res: Response) {
    const existLeave = await LeaveApplication.find({})
      .select("-_id   -applicationBody  -sendDate  ")
      .populate({
        path: "User",
        select: "-_id fullname ",
      })
      .populate({
        path: "Batch",
        select: "-_id name",
      });

    let resData: Array<any> | any[] = [];
    existLeave.forEach((data) => {
      if (data.get("approveStatus") === false || !data.get("approveStatus")) {
        resData.push(data);
      }
    });
    return sendResponse(res, 201, "Incoming Application", resData);
  }

  public static async getAllInternLeavesService(
    res: Response,
    userId: string | mongoose.Types.ObjectId | undefined
  ) {
    const findUser = await user.findOne({ _id: userId });
    const data = await LeaveApplication.find({ User: userId });
    if (data.length === 0) {
      throw new AppError("The Intern Has No Leaves", 401);
    }
    return sendResponse(res, 201, `${findUser?.fullname} All Leaves`, data);
  }
}
