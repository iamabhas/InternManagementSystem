import envConfig from "../config/env.config";
import mongoose from "mongoose";
import Logger from "../lib/logger";

export const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(envConfig.mongodbConnectionString as string);
    Logger.http("Initialized db connection");
  } catch (err) {
    Logger.error(`Database connection error: ${err}`);
    throw err;
  }
};
