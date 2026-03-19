import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import './Certifications.css';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/certifications`);
        setCertifications(data.data);
      } catch (err) {
        console.error('Error fetching certifications', err);
      }
    };
    fetchCerts();
  }, []);

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="section-padding certifications-section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Professional <span className="text-gradient">Certifications</span>
          </motion.h2>
          <motion.div 
            className="section-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>

        <div className="cert-grid">
          {certifications.map((cert, idx) => (
            <motion.div 
              key={cert._id}
              className="cert-card glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="cert-badge text-gradient">
                <Award size={32} />
              </div>
              <div className="cert-info">
                <h3>{cert.name}</h3>
                <p className="issuer">{cert.issuer}</p>
                <p className="date">{cert.date}</p>
              </div>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noreferrer" className="cert-link">
                  <ExternalLink size={20} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
