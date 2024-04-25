import { IPayload } from "../../@types/interface/RequestBody";
import envConfig from "../../config/env.config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";

export const AccessToken = async (
  user_id: mongoose.Types.ObjectId,
  username: string,
  role: string
): Promise<string> => {
  const payload: Required<IPayload> = {
    user_id: user_id,
    username: username,
    role: role,
  };

  const secretKey = envConfig.accessTokenSecret as string;
  const expiratonTimeInSeconds = 24 * 60 * 60; // 30 minutes in seconds

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
