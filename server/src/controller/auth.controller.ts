import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService/login.service";

export class loginController {
  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const body = req.body;
      await AuthService.loginService(res, body, next);
    } catch (err: any | unknown) {
      next(err);
    }
  }
}
