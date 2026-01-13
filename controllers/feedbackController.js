import Feedback from "../models/Feedback.js";

// USER → Send feedback (public)
export const sendFeedback = async (req, res) => {
  try {
    const { name, message, anonymous } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const feedback = await Feedback.create({
      name: anonymous ? "" : name,
      message,
      anonymous,
    });

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Failed to send feedback" });
  }
};

// ADMIN → Get all feedbacks (protected)
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
};
