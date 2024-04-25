import e, { Router } from "express";
import express from 'express' ;
import { createBatch } from "../controller/admin.controller";
import { getUserById } from "../controller/admin.controller";
import { roleConstants } from "../constants/roleConstants";
import { BatchController } from "../controller/batch.controller";
import { validateToken } from "../middleware/apiAuth.middleware";
import { validateRole } from "../middleware/checkRole.middleware";
import { restrictRole } from "../middleware/RestrictRoles";


const { USER, ADMIN, MENTOR } = roleConstants;
const adminRouter = Router();

adminRouter.post(
  "/batch",
  validateToken,
  validateRole,
  restrictRole(USER, MENTOR),
  createBatch
);

// adminRouter.post(
//   "/batch/intern",
//   validateToken,
//   validateRole,
//   restrictRole(USER, MENTOR),
//   adminController.registerInterns
// );

// adminRouter.post(
// //   "/batch/mentor",
// //   validateToken,
// //   validateRole,
// //   restrictRole(USER, MENTOR),
// //   adminController.registerMentors
// // );

// adminRouter.get(
//   "/batch",
//   validateToken,
//   validateRole,
//   restrictRole(USER, MENTOR),
//  g
// );

// adminRouter.get(
//   "/batch/:id",
//   validateToken,
//   validateRole,
//   restrictRole(USER, MENTOR),
//   BatchController.getBatchByIdController
// );

// adminRouter.get(
//   "/batchintern",
//   validateToken,
//   validateRole,
//   restrictRole(USER),
//   BatchController.getAllIntern
// );

// adminRouter.get(
//   "/batch/intern/:id",
//   validateToken,
//   validateRole,
//   restrictRole(USER, MENTOR),
//   BatchController.getInternById
// );


const router = express.Router ();
router.get('/users/:id' , getUserById);

export default { router , adminRouter } ;
