import { Router } from "express";
import { loginController } from "../controller/user.controller";
import { verifyToken } from "../middleware/VerifyToken";
import { Request, Response } from "express";
const userRouter: Router = Router();

userRouter.post("/login", loginController);
userRouter.get("/testing", verifyToken, (_req: Request, res: Response) => {
  return res.json({
    message: "Testing Controller",
  });
});
export default userRouter;
