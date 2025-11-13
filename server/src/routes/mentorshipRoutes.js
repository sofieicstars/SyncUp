// mentorshipRoutes.js
import express from "express";
import {
  getAllSessions,
  createSession,
  getSessionsByUser,
  updateSessionStatus,
} from "../controllers/mentorshipController.js";

const router = express.Router();

router.get("/sessions", getAllSessions);
router.get("/sessions/:userId", getSessionsByUser);
router.post("/sessions", createSession);
router.put("/sessions/:id/status", updateSessionStatus);

export default router;
