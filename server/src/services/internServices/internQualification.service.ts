import mongoose from "mongoose";
import InternQualification from "../../database/schema/internQualification.schema";
import {Response, NextFunction} from "express";
import AppError from "../../utils/errorUtils/appError";
import user from "../../database/schema/user.schema";
import {sendResponse} from "../../helpers/customResponse";
import ExcelJS from "exceljs";

export class InternQualificationService {
    public static async addQualifications(
        res: Response,
        userId: mongoose.Types.ObjectId | string,
        body: any,
        next: NextFunction
    ) {
        const existUser = await user
            .findOne({_id: userId})
            .populate({path: "Batch", select: "name"});
        const {universityName, graduationYear, graduationMonth, skills} = body;

        const newInternQualification = {
            Intern: userId,
            Batch: existUser?.Batch,
            universityName: universityName,
            graduationYear: graduationYear,
            graduationMonth: graduationMonth,
            skills: skills,
        };
        const internQualification = new InternQualification(newInternQualification);

        await internQualification.save();

        sendResponse(
            res,
            201,
            "Intern Qualifications added successfully",
            internQualification
        );
    }

    public static async getInternQualificationById(
        res: Response,
        userId: mongoose.Types.ObjectId | string,
        next: NextFunction
    ) {
        const internQualifications = await InternQualification.find({
            Intern: userId,
        })
            .populate("Intern", "username")
            .populate("Batch", "name");
        if (!internQualifications) {
            return next(
                new AppError("No qualifications found for the specified user.", 404)
            );
        }
        sendResponse(
            res,
            200,
            "Intern Qualifications fetched successfully",
            internQualifications
        );
    }

    public static async downloadBatchData(
        batchId: mongoose.Types.ObjectId | string
    ) {
        const qualifications = await InternQualification.find({
            Batch: batchId,
        }).populate("Intern", "-_id username");

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Batch Qualifications");

        worksheet.columns = [
            {header: "Intern Name", key: "name", width: 30},
            {header: "University Name", key: "universityName", width: 30},
            {header: "Graduation Year", key: "graduationYear", width: 15},
            {header: "Graduation Month", key: "graduationMonth", width: 15},
            {header: "Skills", key: "skills", width: 30},
        ];

        qualifications.forEach((q) => {
            const {username}: any = q.Intern
            worksheet.addRow({
                name: username,
                universityName: q.universityName,
                graduationYear: q.graduationYear,
                graduationMonth: q.graduationMonth,
                skills: q.skills,
            });
        });

        return workbook;
    }
}
