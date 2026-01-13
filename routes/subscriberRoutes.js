import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  subscribe,
  unsubscribe,
  getSubscribers,
  sendMessageToSubscribers,
  getSentMessages,
} from "../controllers/subscriberController.js";

const router = express.Router();

// Public routes for users
router.post("/subscribe", subscribe);
router.get("/unsubscribe", unsubscribe);
// Protected routes for admin
router.get("/", protect, getSubscribers);
router.post("/send", protect, sendMessageToSubscribers);
router.get("/sent", protect, getSentMessages);

export default router;
