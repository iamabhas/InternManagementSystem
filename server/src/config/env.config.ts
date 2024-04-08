import dotenv from "dotenv";
dotenv.config();

const envConfig = {
  serverPort: process.env.SERVER_PORT,
};

export default envConfig;
