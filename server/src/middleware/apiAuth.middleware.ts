import jwt from "jsonwebtoken";
import envConfig from "../config/env.config";
import user from "../database/schema/user.schema.js";
import { NextFunction, Response } from "express";
import { IAuthRequest } from "./../@types/interface/CustomRequest";

const validateToken = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;
  const authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ status: "fail", message: "Token not provided." });
  }

  if (!envConfig.ACCESS_TOKEN_SECRET) {
    return res.status(500).json({
      status: "error",
      message: "Server misconfiguration: Access token secret is not set.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      envConfig.ACCESS_TOKEN_SECRET
    ) as jwt.JwtPayload;
    const myUser = await user.findOne({ _id: decoded.id }).select("_id");

    if (!myUser) {
      return res
        .status(401)
        .json({ status: "fail", message: "No user found with this ID." });
    }

    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };
    next();
  } catch (err: any) {
    switch (err.name) {
      case "JsonWebTokenError":
        return res.status(403).json({
          status: "fail",
          message: "Invalid token. Please log in again!",
        });
      case "TokenExpiredError":
        return res.status(403).json({
          status: "fail",
          message: "Your token has expired. Please log in again!",
        });
      default:
        return res.status(500).json({
          status: "error",
          message: "An error occurred during authentication. Please try again!",
        });
    }
  }
};

export default validateToken;
