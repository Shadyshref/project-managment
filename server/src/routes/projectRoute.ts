import { Router } from "express";
import { createProject, getProject } from "../controllers/projectControllers";

const router=Router()

router.get("/",getProject)
router.post("/",createProject)

export default router