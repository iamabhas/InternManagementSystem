import { Router } from "express";
import { validateToken } from "../middleware/apiAuth.middleware";
import { validateRole } from "../middleware/checkRole.middleware";
import { restrictRole } from "../middleware/restrictRoles.middleware";
import { roleConstants } from "../constants/roleConstants";
import { UserController } from "../controller/user.controller";
const { MENTOR, USER, ADMIN } = roleConstants;
const internRouter = Router();

internRouter.get(
  "/intern-user",
  validateToken,
  validateRole,
  restrictRole(MENTOR),
  UserController.getUserInfo
);
export default internRouter;
