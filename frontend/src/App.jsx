import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Certifications from './components/Certifications/Certifications';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Login from './pages/Admin/Login';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import ProjectManager from './pages/Admin/ProjectManager';
import SkillManager from './pages/Admin/SkillManager';
import ExperienceManager from './pages/Admin/ExperienceManager';
import ProfileManager from './pages/Admin/ProfileManager';
import MessageManager from './pages/Admin/MessageManager';
import EducationManager from './pages/Admin/EducationManager';
import CertificationManager from './pages/Admin/CertificationManager';
import Resume from './pages/Resume/Resume';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  useEffect(() => {
    // Reveal animation on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      
      elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          el.classList.add('active');
        }
      });
    };

    // Hidden Admin Trigger: Ctrl + Shift + A
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        window.location.href = '/admin/login';
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    handleScroll(); 
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Main Portfolio Route */}
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Education />
                <Certifications />
                <Projects />
                <Contact />
              </main>
              <Footer />
            </>
          } />

          {/* Resume Route */}
          <Route path="/resume" element={<Resume />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="skills" element={<SkillManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route path="education" element={<EducationManager />} />
            <Route path="certifications" element={<CertificationManager />} />
            <Route path="profile" element={<ProfileManager />} />
            <Route path="messages" element={<MessageManager />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

