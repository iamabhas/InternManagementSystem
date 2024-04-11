import { Router } from "express";
import { TestController } from "../controller/test.controller";

const testRouter = Router();

testRouter.get("/test", TestController);

export default testRouter;
