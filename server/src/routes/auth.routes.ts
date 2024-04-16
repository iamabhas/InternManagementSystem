import { Router } from "express";
import { loginController } from "../controller/auth.controller";
import { Request, Response } from "express";

const userRouter: Router = Router();

userRouter.post("/login", loginController);
userRouter.get;
userRouter.get("/testing", (_req: Request, res: Response) => {
  return res.json({
    message: "Testing Controller",
  });
});
export default userRouter;
