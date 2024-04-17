import { Router } from "express";
import { createMentor } from "../controller/mentor.controller";
const mentorRouter = Router();

mentorRouter.post("/mentor", createMentor);

export default mentorRouter;
