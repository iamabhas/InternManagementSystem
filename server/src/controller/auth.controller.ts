// import { IUserRequestBody } from "../@types/interface/requestBody";
import { NextFunction, Request, Response } from "express";
import { loginService } from "../services/authService/login.service";

export class loginController {
  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const body = req.body;
    loginService(res, body, next);
  }
}
