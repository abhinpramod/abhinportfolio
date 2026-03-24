import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/skills`);
        setSkills(data.data);
      } catch (err) {
        console.error('Error fetching skills', err);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category
  const categoriesMap = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const displayCategories = Object.keys(categoriesMap).length > 0 
    ? Object.keys(categoriesMap).map(catName => ({
        title: catName,
        skills: categoriesMap[catName].map(s => s.name)
      }))
    : [
        {
          title: "Frontend Development",
          skills: ["React.js", "Tailwind CSS & DaisyUI", "Redux & Zustand", "JavaScript"]
        },
        {
          title: "Backend Development",
          skills: ["Node.js & Express.js", "REST APIs & WebSocket", "MongoDB & Mongoose"]
        },
        {
          title: "Tools & Others",
          skills: ["Git & GitHub", "Postman", "Responsive Design", "Clean Code"]
        }
      ];

  return (
    <section id="skills" className="section-padding bg-light">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            My <span className="text-gradient">Skills</span>
          </motion.h2>
          <motion.div 
            className="section-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>

        <div className="skills-grid">
          {displayCategories.map((cat, idx) => (
            <motion.div 
              key={cat.title}
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="text-gradient">{cat.title}</h3>
              <div className="skills-list">
                {cat.skills.map((skill, sIdx) => (
                  <motion.div 
                    key={skill}
                    className="skill-tag"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.2 }}
                    transition={{ delay: (idx * 0.1) + (sIdx * 0.05) }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
