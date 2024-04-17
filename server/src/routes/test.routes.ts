import { Router } from "express";
import { TestController } from "../controller/test.controller";
import { validateToken } from "../middleware/apiAuth.middleware";
const testRouter = Router();

testRouter.get("/test", validateToken, TestController);

export default testRouter;
