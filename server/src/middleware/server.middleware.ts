import express, { Application } from "express";
import morganMiddleware from "./morgan.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const initializeMiddlewares = (
  expressApplication: Application
): void => {
  expressApplication.use(express.json());
  expressApplication.use(morganMiddleware);
  expressApplication.use(cors(corsOptions));
  expressApplication.use(cookieParser());
};
