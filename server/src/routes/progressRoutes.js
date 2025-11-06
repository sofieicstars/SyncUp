import express from "express";
import {
  getProgressUpdates,
  createProgressUpdate,
} from "../controllers/progressController.js";

const router = express.Router();

router.get("/", getProgressUpdates);
router.post("/", createProgressUpdate);

export default router;
