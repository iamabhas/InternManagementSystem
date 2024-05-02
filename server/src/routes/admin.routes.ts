import {Router} from "express";
import adminController from "../controller/admin.controller";
import {roleConstants} from "../constants/roleConstants";
import {BatchController} from "../controller/batch.controller";
import {validateToken} from "../middleware/apiAuth.middleware";
import {validateRole} from "../middleware/checkRole.middleware";
import {restrictRole} from "../middleware/restrictRoles.middleware";

const {USER, MENTOR} = roleConstants;
const adminRouter = Router();

adminRouter.post(
    "/batch",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    adminController.createBatch
);

adminRouter.post(
    "/batch/intern",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    adminController.registerInterns
);

adminRouter.post(
    "/batch/mentor",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    adminController.registerMentors
);

adminRouter.get(
    "/batch",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    BatchController.getBatchController
);
adminRouter.get(
    "/batchdash",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    BatchController.getBatchControllerPieChart
);

adminRouter.get(
    "/batch/:id",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    BatchController.getBatchByIdController
);

adminRouter.get(
    "/batchintern",
    validateToken,
    validateRole,
    restrictRole(USER),
    BatchController.getAllIntern
);

adminRouter.get(
    "/batch/intern/:id",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    BatchController.getInternById
);

adminRouter.get(
    "/batchmentor",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    BatchController.getAllMentors
);

adminRouter.get(
    "/dashboard",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    BatchController.getAllDashBoard
);

adminRouter.get(
    "/batchcomplete",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    BatchController.getALLCompletedBatch
);

adminRouter.get(
    "/batchongoing",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    BatchController.getAllOngoingBatch
);

export default adminRouter;
