import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    category: {
      type: String,
      enum: ["bible", "strong", "comfort", "share"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
