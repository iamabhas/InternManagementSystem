import mongoose from "mongoose";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import envConfig from "../../config/env.config";
import { IPayload } from "../../@types/interface/customRequest";
import { JwtPayload } from "jsonwebtoken";
export class JwtService {
  public static async generateAccessToken(object: any | {}): Promise<any> {
    const payload: Required<IPayload> = {
      user_id: object.userId,
      username: object.username,
      role: object.userRole,
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
  }

  public static async verifyAccessToken(accesstoken: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        accesstoken,
        envConfig.accessTokenSecret as string,
        (err, payload) => {
          if (err) {
            reject(err);
          } else {
            console.log(payload);
            const info = payload as JwtPayload;
            resolve(info);
          }
        }
      );
    });
  }
}
