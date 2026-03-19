import express from "express";
import Profile from "../models/Profile.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
