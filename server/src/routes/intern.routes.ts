import { Router } from "express";
import { validateToken } from "../middleware/apiAuth.middleware";
import { hrValidator } from "../middleware/hr/hrRole.middleware";
import { getInternByIdController } from "../controller/intern.controller";
import { validateRole } from "../middleware/checkRole.middleware";
const internRouter = Router();

internRouter.get(
  "/intern/:id",
  validateToken,
  validateRole,
  hrValidator,
  getInternByIdController
);

export default internRouter;
