import { Router } from "express";
import {
  createMentor,
  deleteMentor,
  getMentor,
  updateMentor,
} from "../controller/mentor.controller";
const mentorRouter = Router();

mentorRouter.post("/mentor", createMentor);
mentorRouter.delete("/mentor/:id", deleteMentor);
mentorRouter.post("/mentor/name", getMentor);
mentorRouter.patch("/mentor/update", updateMentor);

export default mentorRouter;
