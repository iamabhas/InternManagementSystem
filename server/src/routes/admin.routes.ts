import {Router} from "express";
import adminController from "../controller/admin.controller";
import {roleConstants} from "../constants/roleConstants";
import {BatchController} from "../controller/batch.controller";
import {validateToken} from "../middleware/apiAuth.middleware";
import {validateRole} from "../middleware/checkRole.middleware";
import {restrictRole} from "../middleware/restrictRoles.middleware";
import {param, body} from "express-validator";
import {query} from "express-validator";

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
    param("id").exists().isString(),
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
    param("id").exists().isString(),
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
    "/filterBatch",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    query("filter").exists(),
    adminController.fetchBatchByFilter
);


adminRouter.delete(
    "/batch/:id",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),

    param("id").exists().isString(),
    BatchController.deleteBatchById
);

adminRouter.patch(
    "/batch/:id",
    validateToken,
    validateRole,
    restrictRole(USER, MENTOR),
    body("name").exists().isString(),
    param("id").exists().isString(),
    BatchController.updateBatchById
);

export default adminRouter;
