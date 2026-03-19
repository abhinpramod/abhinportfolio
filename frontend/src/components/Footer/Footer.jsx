import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <a href="#home" className="text-gradient font-serif">Dev.Folio</a>
            <p>Building beautiful, scalable digital experiences that make a difference.</p>
          </div>
          
          <div className="footer-links-group">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-socials">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={20} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p onDoubleClick={() => window.location.href = '/admin/login'} style={{ cursor: 'pointer' }}>
            &copy; {currentYear} abhin pramod. All rights reserved.
          </p>
          <p className="made-with">
            Made with <Heart size={14} className="heart-icon" /> using React & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
