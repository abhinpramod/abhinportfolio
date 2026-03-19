import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });
    
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus({ submitting: false, success: true, error: '' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (err) {
      setStatus({ 
        submitting: false, 
        success: false, 
        error: err.response?.data?.message || 'Something went wrong. Please try again.' 
      });
    }
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h2>
          <motion.div 
            className="section-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>

        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's talk about your project</h3>
            <p className="contact-subtitle">
              Feel free to reach out for collaborations, freelance projects, or just a friendly hello. I'm currently open to new opportunities.
            </p>
            
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon glass">
                  <Mail size={24} />
                </div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:abhinabhi310@gmail.com">abhinabhi310@gmail.com</a>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon glass">
                  <Phone size={24} />
                </div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+918606424892">+91 86064 24892</a>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon glass">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Kozhikode, Kerala</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-container glass-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-control" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-control" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="form-control" 
                  placeholder="+91 86064 24892"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  className="form-control" 
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  className="form-control" 
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              {status.error && <div className="form-error">{status.error}</div>}
              {status.success && <div className="form-success">Message sent successfully! I'll get back to you soon.</div>}
              
              <button 
                type="submit" 
                className={`btn btn-primary submit-btn ${status.submitting ? 'loading' : ''}`}
                disabled={status.submitting}
              >
                {status.submitting ? 'Sending...' : 'Send Message'} 
                {!status.submitting && <Send size={18} />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
