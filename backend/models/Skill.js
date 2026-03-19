import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  category: { type: String, required: true }, // Frontend, Backend, Tools, etc.
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);
