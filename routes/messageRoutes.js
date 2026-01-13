import express from "express";
import {
  getMessagesByCategory,
  getRandomMessage,
  getAllMessages,
  createMessage,
  deleteMessage,
  updateMessage,
} from "../controllers/messageController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC (user side)
router.get("/category/:type", getMessagesByCategory);
      // ?category=bible
router.get("/random", getRandomMessage);

// ADMIN (protected)
router.get("/admin", protect, getAllMessages);
router.post("/", protect, createMessage);
router.put("/:id", protect, updateMessage);
router.delete("/:id", protect, deleteMessage);

export default router;
