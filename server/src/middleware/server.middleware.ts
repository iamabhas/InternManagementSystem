import express, {Application} from "express";
import morganMiddleware from "./morgan.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import {corsOptionsConfig} from "../config/corsOptions.config";

export const initializeMiddlewares = (
    expressApplication: Application
): void => {
    expressApplication.use(express.json());
    expressApplication.use(morganMiddleware);
    expressApplication.use(cors());
    expressApplication.use(cookieParser());
};
