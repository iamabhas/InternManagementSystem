import * as dotenv from "dotenv";
import path from "path";
import Logger from "../lib/logger";

const result = dotenv.config();
const isNotLoaded = result.error;

if (isNotLoaded) {
  Logger.error(`'.env' file could not be loaded : ${result.error}`);
  throw result.error;
}

dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const envConfig = {
  serverPort: process.env.SERVER_PORT,
  mongodbConnectionString: process.env.MONGODB_CONNECTION_STRING,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

export default envConfig;
