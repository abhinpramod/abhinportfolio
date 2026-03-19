import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// POST /api/projects/seed  — seed sample projects
router.post("/seed", async (req, res) => {
  try {
    await Project.deleteMany({});
    const projects = [
      {
        title: "LocalFinder",
        description: "Full-stack platform connecting users with local laborers, contractors, and stores. Includes Stripe payment integration, real-time notifications, and booking system with role-based access control.",
        tech: ["MongoDB", "Express", "React", "Node.js", "Stripe", "JWT", "Tailwind CSS", "MUI", "Cloudinary"],
        github: "https://github.com/abhinpramod",
        live: "https://my-localfinder.vercel.app",
        featured: true,
      },
      {
        title: "Real-Time Chat Application",
        description: "Real-time chat using Socket.IO, image sharing via Cloudinary, and responsive UI with theme customization.",
        tech: ["MERN", "Zustand", "DaisyUI", "Socket.IO", "Cloudinary"],
        github: "https://github.com/abhinpramod",
        live: "",
        featured: true,
      },
      {
        title: "Caremall",
        description: "Developed and contributed extensively to multiple core modules for the live Caremall e-commerce and Super Admin platform. Handled complex scalable structures for the Admin Dashboard, Warehouse, Affiliate, Accounting, Rider, and Delivery Hub modules.",
        tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
        github: "",
        live: "https://caremallonline.com/",
        featured: true,
      }
    ];
    const created = await Project.insertMany(projects);
    res.json({ success: true, message: `${created.length} projects seeded.`, data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: "Seeding failed." });
  }
});

export default router;
