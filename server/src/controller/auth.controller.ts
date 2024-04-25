import { IUserRequestBody } from "../@types/interface/requestBody";
import { Request, Response } from "express";
import { loginService } from "../services/authService/login.service";

export const loginController = async (
  req: Request<Required<IUserRequestBody>>,
  res: Response
): Promise<any> => {
  const { username, password }: Required<IUserRequestBody> = req.body;
  loginService(username, password, res);
};
