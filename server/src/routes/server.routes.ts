import { Application } from "express";
import testRouter from "./test.routes";
import { statusConstants } from "../constants/statusConstants";
import userRouter from "./user.route";
const { ERROR, SUCCESS } = statusConstants;

export const initializeRoutes = (expressApplication: Application) => {
  //landing route
  expressApplication.get("/", (_, res) => {
    res.json({ status: SUCCESS, message: "Intern Management System" });
  });

  //app routes
  expressApplication.use("/api/", [testRouter, userRouter]);

  //error route
  expressApplication.get("*", (_, res) => {
    res.json({ status: ERROR, message: "Endpoint does not exist" });
  });
};
