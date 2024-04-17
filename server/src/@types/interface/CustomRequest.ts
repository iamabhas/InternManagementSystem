import { Request, Response, NextFunction } from "express";

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

export interface Ipayload {
  user_id: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
  iss: string;
}

export interface IMentorRequest {
  mentorName: string;
  email: string;
  expertise: string[];
  role: string;
}
export type functionReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
