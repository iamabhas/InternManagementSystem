import { Request } from "express";
import mongoose from "mongoose";
export interface IUserData {
  id: string;
  username: string;
  role: string;
}

export interface CustomRequest extends Request {
  user?: IUserData;
}

export type IAuthRequest = CustomRequest & {
  headers: { authorization: string };
};

export interface IPayload {
  user_id: mongoose.Types.ObjectId;
  username: string;
  role: string;
}

export interface IMentorRequest {
  mentorName: string;
  email: string;
  expertise: string[];
  role: string;
}
export interface CustomError extends Error {
  statusCode?: any;
  status?: any;
  isOperationaL: true;
}
