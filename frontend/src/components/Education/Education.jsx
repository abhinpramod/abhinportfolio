import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';
import axios from 'axios';
import './Education.css';

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchEdu = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/education');
        setEducation(data.data);
      } catch (err) {
        console.error('Error fetching education', err);
      }
    };
    fetchEdu();
  }, []);

  if (education.length === 0) return null;

  return (
    <section id="education" className="section-padding education-section bg-light">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Academic <span className="text-gradient">Background</span>
          </motion.h2>
          <motion.div 
            className="section-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>

        <div className="education-grid">
          {education.map((edu, idx) => (
            <motion.div 
              key={edu._id}
              className="education-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="card-icon text-gradient">
                <GraduationCap size={32} />
              </div>
              <h3 className="degree">{edu.degree}</h3>
              <p className="school">{edu.school}</p>
              <div className="edu-meta">
                <Calendar size={14} className="text-primary" />
                <span>{edu.duration}</span>
              </div>
              <div className="card-decoration">
                 <BookOpen size={64} className="decoration-icon" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
