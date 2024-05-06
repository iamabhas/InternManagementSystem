import { Application } from "express";
import { statusConstants } from "../constants/statusConstants";
import userRouter from "./auth.routes";
import adminRouter from "./admin.routes";
import leaveManagementRouter from "./leaveManagement.routes";
import internQualificationsRouter from "./internQualifications.routes";

const { SUCCESS } = statusConstants;
import AppError from "../utils/errorUtils/appError";
import { errorHandler } from "../middleware/errorHandler";

export const initializeRoutes = (expressApplication: Application) => {
  //landing route
  expressApplication.get("/", (_, res) => {
    res.json({ status: SUCCESS, message: "Intern Management System" });
  });

  //app routes
  expressApplication.use("/api/", [
    userRouter,
    adminRouter,
    leaveManagementRouter,
    internQualificationsRouter,
  ]);

  interface error extends Error {
    status?: any;
    statusCode?: any;
  }

  expressApplication.all("*", (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl}`, 404));
  });

  expressApplication.use(errorHandler);
};
