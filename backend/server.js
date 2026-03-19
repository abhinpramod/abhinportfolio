import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contact.js";
import projectRoutes from "./routes/projects.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import skillsRoutes from "./routes/skills.js";
import experienceRoutes from "./routes/experience.js";
import educationRoutes from "./routes/education.js";
import certificationRoutes from "./routes/certifications.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    // Allow any origin for now to prevent Vercel CORS issues
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/certifications", certificationRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
