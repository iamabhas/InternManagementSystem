import e, { Router } from "express";
import { createBatch, getBatch } from "../controller/admin.controller";
import { validateToken } from "../middleware/apiAuth.middleware";
import { validateRole } from "../middleware/checkRole.middleware";
import { hrValidator } from "../middleware/hr/hrRole.middleware";
const adminRouter = Router();

adminRouter.post(
  "/batch",
  validateToken,
  validateRole,
  hrValidator,
  createBatch
);

adminRouter.get(
  "/batch/:id",
  validateToken,
  validateRole,
  hrValidator,
  getBatch
);

export default adminRouter;
