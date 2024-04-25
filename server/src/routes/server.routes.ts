import { Application } from "express";

import { statusConstants } from "../constants/statusConstants";
import userRouter from "./auth.routes";
import adminRouter from "./admin.routes";
import leaveManagementRouter from "./leaveManagement.routes";
const { ERROR, SUCCESS } = statusConstants;
import { globalErrorHandler } from "../utils/errorUtils/errorHandlers";

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
  ]);

  expressApplication.use(globalErrorHandler);
};
