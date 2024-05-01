import {Router} from "express";
import internQualificationController from "../controller/internQualification.controller";
import {roleConstants} from "../constants/roleConstants";
import {validateToken} from "../middleware/apiAuth.middleware";
import {validateRole} from "../middleware/checkRole.middleware";
import {restrictRole} from "../middleware/RestrictRoles";

const {ADMIN, MENTOR, USER} = roleConstants;

const internQualificationsRouter = Router();

internQualificationsRouter.post(
    "/add-intern-qualifications",
    validateToken,
    validateRole,
    restrictRole(ADMIN, MENTOR),
    internQualificationController.addQualificationsController
);

internQualificationsRouter.get(
    "/get-qualification/:id",
    validateToken,
    validateRole,
    restrictRole(USER),
    internQualificationController.getQualificationsByIdController
);

internQualificationsRouter.get(
    "/excel-batchData-download/:batchId",
    validateToken,
    validateRole,
    restrictRole(USER),
    internQualificationController.downloadBatchDataController
);

export default internQualificationsRouter;
