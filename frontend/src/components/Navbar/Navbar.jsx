import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [socials, setSocials] = useState({ github: '', linkedin: '', twitter: '' });
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/profile`);
        setSocials(data.data.socialLinks || { github: '', linkedin: '', twitter: '' });
      } catch (err) {
        console.error('Error fetching profile in navbar', err);
      }
    };
    fetchProfile();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hidden admin trigger: tap logo 5 times quickly
  const handleLogoCounter = (e) => {
    // If it's a touch or click, prevent default ONLY if we are tapping fast, so normal clicks still go to #home
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    
    if (newCount === 3) {
      window.location.href = '/admin/login';
      setLogoClicks(0);
    }
    
    setTimeout(() => {
      setLogoClicks(0);
    }, 2000);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        {/* Logo with hidden admin trigger */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="logo"
          onClick={handleLogoCounter}
        >
          <a href="#home" className="text-gradient">Dev.Folio</a>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link, i) => (
              <motion.li 
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <a href={link.href} className="nav-link">{link.name}</a>
              </motion.li>
            ))}
          </ul>
          
          <motion.div 
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer"><Github size={18} /></a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /></a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer"><Twitter size={18} /></a>}
            <a href="#contact" className="btn btn-primary nav-btn">Hire Me</a>
          </motion.div>
        </nav>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu glass"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="mobile-nav-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="mobile-nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <div className="mobile-socials">
                  {socials.github && <a href={socials.github} target="_blank" rel="noreferrer"><Github size={22} /></a>}
                  {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={22} /></a>}
                  {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer"><Twitter size={22} /></a>}
                </div>
              </li>
              <li style={{ marginTop: '1rem' }}>
                <a href="#contact" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
