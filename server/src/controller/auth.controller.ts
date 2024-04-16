import { IUserRequestBody } from "../@types/interface/RequestBody";
import { Request, Response } from "express";
import { loginService } from "../services/login.service";

export const loginController = async (
  req: Request<Required<IUserRequestBody>>,
  res: Response
): Promise<any> => {
  const { username, password }: Required<IUserRequestBody> = req.body;
  loginService(username, password, res);
};
