import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  duration: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Education", educationSchema);
