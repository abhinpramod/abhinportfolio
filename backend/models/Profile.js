import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  titleChunks: [{ type: String }],
  subtitle: { type: String },
  aboutText: { type: String },
  resumeLink: { type: String },
  profileImage: { type: String },
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String }
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
