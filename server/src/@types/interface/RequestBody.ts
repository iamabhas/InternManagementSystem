import mongoose from "mongoose";
import { NextFunction } from "express";
export interface IUserRequestBody {
  username: string;
  password: string;
}

export interface IUserRole extends IUserRequestBody {
  role: string;
}

export type IOptions = {
  issuer: string;
  expiresIn: Date;
};

export interface ICookie {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "strict" | "lax" | "none"; // Adjusted sameSite property
}
export type functionReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type TdefaultOptions = {
  format: string;
  printBackground: boolean;
};
