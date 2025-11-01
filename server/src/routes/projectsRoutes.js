import express from "express";
import { getAllProjects } from "../controllers/projectsController.js";

const router = express.Router();

// GET /api/projects
router.get("/", getAllProjects);

export default router;
