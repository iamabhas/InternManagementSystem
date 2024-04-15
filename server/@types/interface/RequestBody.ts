import mongoose from "mongoose";
export interface UserRequestBody {
  username: string;
  password: string;
}

export interface UserRole extends UserRequestBody {
  role: string;
}

export interface payloadInterface {
  user_id: mongoose.Types.ObjectId;
  username: string;
  role: string;
}

export type optionsInterface = {
  issuer: string;
  expiresIn: Date;
};

export interface CookieInterface {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "strict" | "lax" | "none"; // Adjusted sameSite property
}
