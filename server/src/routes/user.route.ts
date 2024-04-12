import { Router } from "express";
import { loginController } from "../controller/user.controller";
const userRouter: Router = Router();

userRouter.post("/login", loginController);

export default userRouter;
