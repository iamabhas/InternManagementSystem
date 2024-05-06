import { Router } from "express";
import leaveApplicationController from "../controller/leaveApplication.controller";
import { roleConstants } from "../constants/roleConstants";
import { validateToken } from "../middleware/apiAuth.middleware";
import { validateRole } from "../middleware/checkRole.middleware";
import { restrictRole } from "../middleware/restrictRoles.middleware";
import { internValidation } from "../middleware/internsValidations.middleware";

const { ADMIN, MENTOR, USER } = roleConstants;

const leaveManagementRouter = Router();

leaveManagementRouter.post(
  "/send-leave-application",
  validateToken,
  validateRole,
  restrictRole(MENTOR, ADMIN),
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
  "/verify-leave-application/:id",
  validateToken,
  validateRole,
  restrictRole(USER, MENTOR),
  leaveApplicationController.verifiedLeave
);

leaveManagementRouter.patch(
  "/reject-leave-application/:id",
  validateToken,
  validateRole,
  restrictRole(USER, MENTOR),
  leaveApplicationController.rejectLeave
);

leaveManagementRouter.get(
  "/download-leave-application/:id",
  validateToken,
  validateRole,
  restrictRole(USER, MENTOR),
  leaveApplicationController.downloadLeave
);

leaveManagementRouter.get(
  "/current",
  validateToken,
  validateRole,
  restrictRole(USER, MENTOR),
  leaveApplicationController.viewCurrentLeave
);

leaveManagementRouter.get(
  "/incoming",
  validateToken,
  validateRole,
  restrictRole(USER, MENTOR),
  leaveApplicationController.IncomingApplication
);

leaveManagementRouter.get(
  "/leave-intern/:id",
  validateToken,
  validateRole,
  restrictRole(MENTOR),
  //   internValidation,
  leaveApplicationController.getInternLeaves
);

leaveManagementRouter.get(
  "/leave-intern-all",
  validateToken,
  validateRole,
  restrictRole(MENTOR),
  leaveApplicationController.getAllInternLeaves
);
export default leaveManagementRouter;
