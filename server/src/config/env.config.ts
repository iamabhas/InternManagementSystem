import * as dotenv from "dotenv";
import path from "path";
import Logger from "../lib/logger";

const result = dotenv.config();

if (result.error) {
  Logger.error(`'.env' file could not be loaded : ${result.error}`);
  throw result.error;
}

dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const envConfig = {
  serverPort: process.env.SERVER_PORT,
  mongodbConnectionString: process.env.MONGODB_CONNECTION_STRING,
};

export default envConfig;
