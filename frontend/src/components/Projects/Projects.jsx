import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, RefreshCw } from 'lucide-react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/projects`);
      setProjects(data.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch projects. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const seedProjects = async () => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/projects/seed`);
      fetchProjects();
    } catch (err) {
      setError('Failed to seed projects.');
      setLoading(false);
    }
  };

  const categories = ['All', 'React', 'Node.js', 'MongoDB'];
  
  const filteredProjects = projects.filter(project => {
    if (filter === 'All') return true;
    return project.tech.some(t => t.toLowerCase().includes(filter.toLowerCase()));
  });

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.div 
            className="section-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          className="filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-msg">{error}</p>
            <button className="btn btn-outline" onClick={seedProjects}>
              <RefreshCw size={18} /> Seed Sample Projects
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects found.</p>
            <button className="btn btn-primary" onClick={seedProjects}>
              <RefreshCw size={18} /> Load Sample Data
            </button>
          </div>
        ) : (
          <motion.div className="projects-grid" layout>
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div 
                  key={project._id}
                  className="project-card glass-card"
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="project-image-container">
                    <img 
                      src={project.image || "/placeholder-project.png"} 
                      alt={project.title} 
                      className="project-image"
                    />
                    <div className="project-image-overlay">
                      <div className="project-links">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noreferrer"><Github size={20} /></a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noreferrer"><ExternalLink size={20} /></a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">
                      <a href={project.live || project.github} target="_blank" rel="noreferrer">{project.title}</a>
                    </h3>
                    
                    <div className="project-description">
                      <p>{project.description}</p>
                    </div>
                  </div>
                  
                  <ul className="project-tech-list">
                    {project.tech.map(tech => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
