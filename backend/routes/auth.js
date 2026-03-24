import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return res.status(500).json({ success: false, message: "Admin credentials not configured on server" });
    }

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Use a fixed ID "admin" for token since there is no DB user
    const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET || "secret", {
      expiresIn: "30d",
    });

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
