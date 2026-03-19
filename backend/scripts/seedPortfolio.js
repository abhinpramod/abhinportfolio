import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Project from '../models/Project.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio");
    console.log("Connected to MongoDB...");

    // 1. Clear existing data
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});
    await Project.deleteMany({});

    // 2. Seed Admin User
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    console.log(`Seeding admin user: ${adminEmail}`);
    try {
      await User.create({ email: adminEmail, password: adminPassword });
    } catch (err) {
      console.error("❌ User creation failed specifically:", err.message);
      console.error(err);
      throw err;
    }
    console.log("Admin user seeded.");

    // 3. Seed Profile
    await Profile.create({
      name: "abhin pramod",
      titleChunks: ["MERN Stack Apps", "Scalable Backends", "Modern UIs", "REST APIs"],
      subtitle: "Aspiring MERN Stack Developer with hands-on experience in building full-stack web applications. Passionate about scalable and user-friendly solutions.",
      aboutText: "I am an aspiring MERN Stack Developer with hands-on experience in building full-stack web applications. My journey in software development has been driven by a passion for scalable and user-friendly solutions. I specialize in the JavaScript ecosystem and enjoy bringing ideas to life through robust backend APIs and dynamic React interfaces.",
      github: "https://github.com/abhinpramod",
      linkedin: "https://linkedin.com/in/abhinpramod", // Placeholder
      email: "abhinpramod@example.com",
    });
    console.log("Profile seeded.");

    // 4. Seed Skills
    const skills = [
      { name: "React.js", level: 90, category: "Frontend Development" },
      { name: "Tailwind CSS & DaisyUI", level: 95, category: "Frontend Development" },
      { name: "Redux & Zustand", level: 85, category: "Frontend Development" },
      { name: "JavaScript", level: 90, category: "Frontend Development" },
      { name: "Node.js & Express.js", level: 85, category: "Backend Development" },
      { name: "REST APIs & WebSocket", level: 85, category: "Backend Development" },
      { name: "MongoDB & Mongoose", level: 80, category: "Backend Development" },
      { name: "Git & GitHub", level: 90, category: "Tools & Others" },
      { name: "Postman", level: 85, category: "Tools & Others" },
    ];
    await Skill.insertMany(skills);
    console.log("Skills seeded.");

    // 5. Seed Experience
    await Experience.create({
      role: "MERN Stack Developer",
      company: "Innowez Software Company, Kozhikode",
      duration: "Aug 2024 – Present",
      description: [
        "Developed full-stack web apps using the MERN stack",
        "Built secure REST APIs with JWT and robust payment gateways",
        "Delivered projects on time with clean, maintainable code"
      ],
      current: true
    });
    console.log("Experience seeded.");

    // 6. Seed Education
    await Education.create({
      degree: "Bachelor of Commerce (Computer Applications)",
      school: "Calicut University",
      duration: "2021 – 2024"
    });
    console.log("Education seeded.");

    // 7. Seed Projects
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
    await Project.insertMany(projects);
    console.log("Projects seeded.");

    console.log("All data seeded successfully! 🌱");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    if (error.name === 'ValidationError') {
      console.error("Validation Error Details:", error.errors);
    }
    process.exit(1);
  }
};

seed();
