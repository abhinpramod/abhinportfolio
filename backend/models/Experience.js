import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  description: [{ type: String }], // Bullet points
  current: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Experience", experienceSchema);
