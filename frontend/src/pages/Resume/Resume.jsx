import React, { useEffect } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import cvFile from '../../assets/ABHIN_CV (4) (1).pdf';
import './Resume.css';

const Resume = () => {
  useEffect(() => {
    // Scroll to top when mounting
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="resume-page">
      <div className="container">
        <div className="resume-header glass-card">
          <Link to="/" className="btn btn-outline back-btn">
            <ArrowLeft size={18} /> Back
          </Link>
          <h2 className="text-gradient m-0 hidden sm:block">My Resume</h2>
          <a href={cvFile} download="ABHIN_CV.pdf" target="_blank" rel="noreferrer" className="btn btn-primary download-btn">
            <Download size={18} /> <span className="hidden sm:inline">Download</span>
          </a>
        </div>
        
        <div className="resume-content-wrapper fade-in">
          <iframe 
            src={cvFile} 
            title="Resume Document" 
            className="resume-iframe"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default Resume;
