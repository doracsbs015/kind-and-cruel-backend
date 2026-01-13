import express from "express";
import {
  sendFeedback,
  getFeedbacks,
} from "../controllers/feedbackController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public (user)
router.post("/", sendFeedback);

// Protected (admin)
router.get("/", protect, getFeedbacks);

export default router;
