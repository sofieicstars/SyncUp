import express from "express";
import {
  getMentors,
  getSessions,
  createSession,
  updateSessionStatus,
  deleteSession,
} from "../controllers/mentorshipController.js";

const router = express.Router();

// GET all mentors
router.get("/mentors", getMentors);

// GET all sessions
router.get("/sessions", getSessions);

// POST new mentorship session
router.post("/sessions", createSession);

// PUT update session status
router.put("/sessions/:id", updateSessionStatus);

// DELETE session
router.delete("/sessions/:id", deleteSession);

export default router;
