import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import axios from 'axios';
import './Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const { data } = await axios.get(`\${BASE_URL}/experience`);
        setExperiences(data.data);
      } catch (err) {
        console.error('Error fetching experience', err);
      }
    };
    fetchExp();
  }, []);

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="section-padding experience-section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Work <span className="text-gradient">Experience</span>
          </motion.h2>
          <motion.div 
            className="section-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={exp._id}
              className="timeline-item"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="timeline-dot text-gradient">
                 <Briefcase size={20} />
              </div>
              <div className="timeline-content glass-card">
                <div className="timeline-header">
                  <h3 className="role">{exp.role}</h3>
                  <p className="company text-gradient">{exp.company}</p>
                </div>
                <div className="timeline-meta">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{exp.duration}</span>
                  </div>
                </div>
                <ul className="description">
                  {exp.description.map((point, pIdx) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
