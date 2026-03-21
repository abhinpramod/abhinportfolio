import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Heart, Instagram } from 'lucide-react';
import './Footer.css';
import { BASE_URL } from '../../config/api';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();


  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/profile`);
        setProfile(data.data);
      } catch (err) {
        console.error('Error fetching profile', err);
      }
    };
    fetchProfile();
  }, []);

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
              <a href={profile?.github||"https://github.com"} target="_blank" rel="noreferrer"><Github size={20} /></a>
              <a href={profile?.linkedin||"https://linkedin.com"} target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
              <a href={profile?.twitter||"https://twitter.com"} target="_blank" rel="noreferrer"><Twitter size={20} /></a>
              <a href={profile?.instagram||"https://instagram.com"} target="_blank" rel="noreferrer"><Instagram size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p onDoubleClick={() => navigate('/admin/login')} style={{ cursor: 'pointer' }}>
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
