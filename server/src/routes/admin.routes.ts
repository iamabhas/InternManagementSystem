import e, { Router } from "express";
import adminController from "../controller/admin.controller";
import { validateToken } from "../middleware/apiAuth.middleware";
import { validateRole } from "../middleware/checkRole.middleware";
import { restrictRole } from "../middleware/RestrictRoles";
const adminRouter = Router();

adminRouter.post(
  "/batch",
  validateToken,
  validateRole,
  restrictRole("user", "mentor"),
  adminController.createBatch
);

adminRouter.post(
  "/batch/intern",
  validateToken,
  validateRole,
  restrictRole("user", "mentor"),
  adminController.registerInterns
);

adminRouter.post(
  "/batch/mentor",
  validateToken,
  validateRole,
  restrictRole("user", "mentor"),
  adminController.registerMentors
);

export default adminRouter;
