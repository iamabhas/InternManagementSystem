import express, { Application } from "express";
import morganMiddleware from "./morgan.middleware";
import cors from "cors";

export const initializeMiddlewares = (
  expressApplication: Application
): void => {
  expressApplication.use(cors());
  expressApplication.use(express.json());
  expressApplication.use(morganMiddleware);
};
