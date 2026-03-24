import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import Hero3DVisual from './Hero3DVisual';
import './Hero.css';

const Typewriter = ({ texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500 }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;
    let timer;
    const currentFullText = texts[textIndex];

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        timer = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (text === currentFullText) {
        timer = setTimeout(() => setIsDeleting(true), pauseTime);
      } else {
        timer = setTimeout(() => {
          setText(currentFullText.slice(0, text.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="typewriter">
      {text}
      <span className="cursor">|</span>
    </span>
  );
};

const Hero = () => {
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

  const name = profile?.name || "Abhin Pramod";
  const titleTexts = profile?.titleChunks?.length > 0 ? profile.titleChunks : ["MERN Stack Apps", "Scalable Backends", "Modern UIs", "REST APIs"];
  const subtitle = profile?.subtitle || "Aspiring MERN Stack Developer with hands-on experience in building full-stack web applications. Passionate about scalable and user-friendly solutions.";

  return (
    <section id="home" className="hero">
      {/* Background elements */}
      <div className="custom-shape-divider-bottom-1682356588">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
      </div>
      <div className="hero-glow bg-primary"></div>
      <div className="hero-glow bg-secondary"></div>
      
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="badge glass"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="badge-dot animate-pulse-btn"></span> Available for Work
          </motion.div>
          
          <h1 className="heading-xl hero-title">
            Hi, I'm <span className="text-gradient">{name}</span><br/>
            I build <Typewriter texts={titleTexts} />
          </h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a href="#projects" className="btn btn-primary btn-lg">
              View Work <ArrowRight size={18} />
            </a>
            <a href={profile?.github || "https://github.com/abhinpramod"} className="btn btn-outline btn-lg" target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual animate-float"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <React.Suspense fallback={<div style={{color: 'white'}}>Loading 3D Visual...</div>}>
            <Hero3DVisual />
          </React.Suspense>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
