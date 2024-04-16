import { payloadInterface } from "./../../@types/interface/RequestBody";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";

dotenv.config();

export const AccessToken = async (
  user_id: mongoose.Types.ObjectId,
  username: string,
  role: string
): Promise<string> => {
  const payload: Required<payloadInterface> = {
    user_id: user_id,
    username: username,
    role: role,
  };

  const secretKey = process.env.ACCESS_TOKEN_SECRET as string;
  const expiratonTimeInSeconds = 30 * 60; // 30 minutes in seconds

  const options: jwt.SignOptions = {
    issuer: "Inter Management System",
    expiresIn: expiratonTimeInSeconds,
  };

  try {
    const token = jwt.sign(payload, secretKey, options);
    return token;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new Error("JSON WEB TOKEN ERROR");
    } else {
      throw error;
    }
  }
};
