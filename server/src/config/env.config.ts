import * as dotenv from "dotenv";
import path from "path";
import Logger from "../lib/logger";

const result = dotenv.config();
const isNotLoaded = result.error;

if (isNotLoaded) {
  Logger.error(`'.env' file could not be loaded : ${result.error}`);
  throw result.error;
}

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const envConfig = {
  serverPort: process.env.SERVER_PORT,
  clientPort: process.env.CLIENT_PORT,
  redisUrl: process.env.REDIS_URL,
  nodeEnvironment: process.env.NODE_ENV,
  mongodbConnectionString: process.env.MONGODB_CONNECTION_STRING,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  smtpUsername: process.env.USER,
  smtpPassword: process.env.PASSWORD,
};

export default envConfig;
