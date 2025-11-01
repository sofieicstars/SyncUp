// src/routes/progressRoutes.js
import express from "express";
import {
  getProgressUpdates,
  createProgressUpdate,
} from "../controllers/progressController.js";

const router = express.Router();

// GET recent updates
router.get("/", getProgressUpdates);

// POST new update
router.post("/", createProgressUpdate);

export default router;
