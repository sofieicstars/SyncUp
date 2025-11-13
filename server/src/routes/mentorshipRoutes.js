import express from "express";
import {
  getMentors,
  getSessions,
  createSession,
} from "../controllers/mentorshipController.js";

const router = express.Router();

// GET all mentors
router.get("/mentors", getMentors);

// GET all sessions (or filtered)
router.get("/sessions", getSessions);

// POST a new mentorship session
router.post("/sessions", createSession);

export default router;
