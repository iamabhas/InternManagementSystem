import { Router } from "express";
import leaveApplicationController from "../controller/leaveApplication.controller";
import { roleConstants } from "../constants/roleConstants";
import { validateToken } from "../middleware/apiAuth.middleware";
import { validateRole } from "../middleware/checkRole.middleware";
import { restrictRole } from "../middleware/RestrictRoles";

const { ADMIN, MENTOR, USER } = roleConstants;

const leaveManagementRouter = Router();

leaveManagementRouter.post(
  "/send-leave-application",
  validateToken,
  validateRole,
  restrictRole(MENTOR),
  leaveApplicationController.createLeaveApplicationController
);

leaveManagementRouter.get(
  "/get-leave-applications",
  validateToken,
  validateRole,
  restrictRole(USER, MENTOR),
  leaveApplicationController.getApplications
);

leaveManagementRouter.patch(
  "/verify/:id",
  validateToken,
  validateRole,
  restrictRole(USER, MENTOR),
  leaveApplicationController.verifiedLeave
);
export default leaveManagementRouter;
