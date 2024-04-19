import { Application } from "express";
import testRouter from "./test.routes";
import internRouter from "./intern.routes";
import { statusConstants } from "../constants/statusConstants";
import userRouter from "./auth.routes";
import adminRouter from "./admin.routes";
const { ERROR, SUCCESS } = statusConstants;

export const initializeRoutes = (expressApplication: Application) => {
  //landing route
  expressApplication.get("/", (_, res) => {
    res.json({ status: SUCCESS, message: "Intern Management System" });
  });

  //app routes
  expressApplication.use("/api/", [
    testRouter,
    userRouter,
    internRouter,
    adminRouter,
  ]);

  //error route
  expressApplication.get("*", (_, res) => {
    res.json({ status: ERROR, message: "Endpoint does not exist" });
  });
};
