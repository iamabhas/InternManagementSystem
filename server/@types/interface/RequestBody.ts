import mongoose from "mongoose";
export interface IUserRequestBody {
  username: string;
  password: string;
}

export interface IUserRole extends IUserRequestBody {
  role: string;
}

export interface IPayload {
  user_id: mongoose.Types.ObjectId;
  username: string;
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
