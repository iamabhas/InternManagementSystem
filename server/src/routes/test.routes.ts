import { Router, Request, Response } from "express";
import { testSignUpController } from "../controller/test.controller";
import { validateToken } from "../middleware/apiAuth.middleware";
import { validateRole } from "../middleware/checkRole.middleware";
import { hrValidator } from "../middleware/hr/hrRole.middleware";
const testRouter = Router();

testRouter.post("/test", testSignUpController);

testRouter.get(
  "/test/check",
  validateToken,
  validateRole,
  hrValidator,
  (req: Request, res: Response) => {
    return res.status(200).json({
      message: req.user.role,
    });
  }
);

export default testRouter;
