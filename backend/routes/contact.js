import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    
    // Save to database
    const contact = await Contact.create({ name, email, phone, subject, message });
    
    // Send Email using Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.default.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'abhinabhi310@gmail.com', // Sends directly to Abhin's email
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h3>New Contact Message from Portfolio</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <h4>Message:</h4>
            <p>${message}</p>
          `
        };
        
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to abhinabhi310@gmail.com");
      } catch (emailError) {
        console.error("Nodemailer Error:", emailError);
      }
    }

    res.status(201).json({ success: true, message: "Message sent successfully!", data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

// GET /api/contact (admin - get all messages)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// DELETE /api/contact/:id (admin - delete a message)
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

export default router;
