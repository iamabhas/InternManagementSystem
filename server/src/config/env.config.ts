import * as dotenv from "dotenv";
import Logger from "../lib/logger";

// dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const envPath = "/opt/render/project/src/server/.env";
const result = dotenv.config({ path: envPath });

const isNotLoaded = result.error;

if (isNotLoaded) {
  Logger.error(`'.env' file could not be loaded : ${result.error}`);
  throw result.error;
}

const envConfig = {
  serverPort: process.env.SERVER_PORT,
  clientPort: process.env.CLIENT_PORT,
  mongodbConnectionString: process.env.MONGODB_CONNECTION_STRING,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  smtpUsername: process.env.USER,
  smtpPassword: process.env.PASSWORD,
};

export default envConfig;
