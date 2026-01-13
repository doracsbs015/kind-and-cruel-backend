import mongoose from "mongoose";

const subscriberMessageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    sentToCount: { type: Number, default: 0 }, // number of subscribers emailed
  },
  { timestamps: true }
);

export default mongoose.model("SubscriberMessage", subscriberMessageSchema);
