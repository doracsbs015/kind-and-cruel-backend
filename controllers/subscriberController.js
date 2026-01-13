import Subscriber from "../models/Subscriber.js";
import SubscriberMessage from "../models/SubscriberMessage.js";
import sendEmail from "../utils/sendEmail.js";

// USER → Subscribe
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    await Subscriber.create({ email });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already subscribed" });
    }
    res.status(500).json({ message: "Subscription failed" });
  }
};

// USER → Unsubscribe
export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const result = await Subscriber.deleteOne({ email });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Email not found or already unsubscribed" });
    }

    res.json({ message: "You have been unsubscribed successfully 💛" });
  } catch (err) {
    res.status(500).json({ message: "Unsubscribe failed" });
  }
};

// ADMIN → Get all subscribers (protected)
export const getSubscribers = async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscribers" });
  }
};

// ADMIN → Get all sent messages (protected)
export const getSentMessages = async (req, res) => {
  try {
    const messages = await SubscriberMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sent messages" });
  }
};

// ADMIN → Send message to all subscribers (protected)
  
export const sendMessageToSubscribers = async (req, res) => {
  console.log("🔥 sendMessageToSubscribers HIT");

  try {
    const { message } = req.body;
    console.log("📩 Message received:", message);

    if (!message) {
      console.log("❌ No message in body");
      return res.status(400).json({ message: "Message is required" });
    }

    const subscribers = await Subscriber.find();
    console.log("👥 Subscribers count:", subscribers.length);

    for (const sub of subscribers) {
      console.log("➡️ Sending mail to:", sub.email);

      const unsubscribeLink = `${process.env.BACKEND_URL}/api/subscribers/unsubscribe?email=${encodeURIComponent(
        sub.email
      )}`;

      await sendEmail(
        sub.email,
        "A message for you 🌼",
        message,
        unsubscribeLink
      );

      console.log("✅ Mail sent to:", sub.email);
    }

    console.log("💾 Saving sent message in DB");

    const sentMessage = await SubscriberMessage.create({
      message,
      sentToCount: subscribers.length,
    });

    console.log("🎉 Message saved:", sentMessage._id);

    res.status(201).json(sentMessage);
  } catch (err) {
    console.error("💥 ERROR in sendMessageToSubscribers:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
};