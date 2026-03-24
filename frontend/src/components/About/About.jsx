import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import { motion } from 'framer-motion';
import { Code, Server, Database, Layout } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, expRes, eduRes] = await Promise.all([
          axios.get(`${BASE_URL}/profile`),
          axios.get(`${BASE_URL}/experience`),
          axios.get(`${BASE_URL}/education`)
        ]);
        setProfile(profileRes.data.data);
        setExperiences(expRes.data.data);
        setEducation(eduRes.data.data);
      } catch (err) {
        console.error('Error fetching about data', err);
      }
    };
    fetchData();
  }, []);

  const cards = [
    {
      icon: <Layout size={32} />,
      title: "Frontend Engineering",
      desc: "Creating pixel-perfect, responsive, and accessible user interfaces using React, Vue, and modern CSS frameworks like Tailwind."
    },
    {
      icon: <Server size={32} />,
      title: "Backend Architecture",
      desc: "Designing robust server-side applications and RESTful APIs with Node.js, Express, and Python."
    },
    {
      icon: <Database size={32} />,
      title: "Database Management",
      desc: "Modeling complex data structures and optimizing queries with MongoDB, PostgreSQL, and Redis."
    },
    {
      icon: <Code size={32} />,
      title: "Clean Code",
      desc: "Writing maintainable, scalable, and well-documented code following SOLID principles and best practices."
    }
  ];

  const leadText = profile?.subtitle || "I am an aspiring MERN Stack Developer with hands-on experience in building full-stack web applications.";
  const aboutBio = profile?.aboutText || "My journey in software development has been driven by a passion for scalable and user-friendly solutions. I specialize in the JavaScript ecosystem and enjoy bringing ideas to life through robust backend APIs and dynamic React interfaces.";

  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>
          <motion.div 
            className="section-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>

        <div className="about-grid">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="lead">
              {leadText}
            </p>
            <p>
              {aboutBio}
            </p>
            
            <div className="about-cta mt-8">
              <a href="#contact" className="btn btn-primary">Let's Connect</a>
              <Link to="/resume" className="btn btn-outline ml-4">View CV</Link>
            </div>
          </motion.div>

          <div className="services-grid">
            {cards.map((card, idx) => (
              <motion.div 
                key={card.title}
                className="service-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="service-icon-wrapper">
                  {card.icon}
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
