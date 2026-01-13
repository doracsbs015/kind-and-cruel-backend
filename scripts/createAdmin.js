import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashedPassword = await bcrypt.hash(
  process.env.ADMIN_PASSWORD,
  10
);

await Admin.create({
  email: process.env.ADMIN_EMAIL,
  password: hashedPassword,
});

console.log("Admin created successfully");
process.exit();
