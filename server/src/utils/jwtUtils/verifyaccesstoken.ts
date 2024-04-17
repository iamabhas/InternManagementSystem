import jwt, { JwtPayload } from "jsonwebtoken";
import envConfig from "../../config/env.config";

export const verifyAccesToken = async (accesstoken: string) => {
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
};
