import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import axios from 'axios';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Github, 
  ExternalLink, 
  Save, 
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    description: '',
    tech: '',
    github: '',
    live: '',
    featured: false
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/projects`);
      setProjects(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setCurrentProject({
      ...project,
      tech: project.tech.join(', ')
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(`${BASE_URL}/projects/${id}`, { headers });
      setProjects(projects.filter(p => p._id !== id));
      showMessage('success', 'Project deleted successfully');
    } catch (err) {
      showMessage('error', 'Failed to delete project');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...currentProject,
      tech: currentProject.tech.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    try {
      if (currentProject._id) {
        await axios.put(`${BASE_URL}/projects/${currentProject._id}`, projectData, { headers });
        showMessage('success', 'Project updated successfully');
      } else {
        await axios.post(`${BASE_URL}/projects`, projectData, { headers });
        showMessage('success', 'Project created successfully');
      }
      setIsEditing(false);
      setCurrentProject({ title: '', description: '', tech: '', github: '', live: '', featured: false });
      fetchProjects();
    } catch (err) {
      showMessage('error', 'Operation failed');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (loading) return <div className="animate-pulse text-gray-500 font-medium">Loading Galaxy of Projects...</div>;

  return (
    <div className="space-y-10 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Project Management</h1>
          <p className="text-gray-400 mt-1">Showcase your best work and technical prowess.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <Plus size={20} /> New Project
          </button>
        )}
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 ${
          message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-500'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="font-semibold text-sm tracking-wide uppercase">{message.text}</span>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-[#111111] border border-gray-800/50 rounded-3xl p-8 space-y-8 animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent underline decoration-blue-500/30 underline-offset-8">
              {currentProject._id ? 'Edit Mission' : 'Ignite New Project'}
            </h3>
            <button type="button" onClick={() => { setIsEditing(false); setCurrentProject({ title: '', description: '', tech: '', github: '', live: '', featured: false }); }} className="text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Project Title</label>
              <input 
                type="text" 
                value={currentProject.title}
                onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all cursor-text placeholder-gray-700 font-medium"
                placeholder="Ex: Caremall Super Admin"
                required
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Technologies (Comma Separated)</label>
              <input 
                type="text" 
                value={currentProject.tech}
                onChange={(e) => setCurrentProject({...currentProject, tech: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-mono text-sm placeholder-gray-700"
                placeholder="MERN, Tailwind, Mongoose, Socket.IO"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Brief Description</label>
            <textarea 
              value={currentProject.description}
              onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all h-32 resize-none placeholder-gray-700 font-medium leading-relaxed"
              placeholder="Describe the mission goals and architectural challenges..."
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">GitHub Repository Link</label>
              <div className="relative">
                <Github size={18} className="absolute left-6 top-5 text-gray-600" />
                <input 
                  type="url" 
                  value={currentProject.github}
                  onChange={(e) => setCurrentProject({...currentProject, github: e.target.value})}
                  className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 pl-14 pr-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium text-sm text-blue-400 placeholder-gray-700"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Live Deployment Link</label>
              <div className="relative">
                <ExternalLink size={18} className="absolute left-6 top-5 text-gray-600" />
                <input 
                  type="url" 
                  value={currentProject.live}
                  onChange={(e) => setCurrentProject({...currentProject, live: e.target.value})}
                  className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 pl-14 pr-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-medium text-sm text-purple-400 placeholder-gray-700"
                  placeholder="https://caremall.com"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-900/40 p-5 rounded-2xl border border-gray-800/30 w-fit">
            <input 
              type="checkbox" 
              id="featured"
              checked={currentProject.featured}
              onChange={(e) => setCurrentProject({...currentProject, featured: e.target.checked})}
              className="w-5 h-5 rounded-lg border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="featured" className="text-sm font-bold text-gray-300 uppercase tracking-widest select-none cursor-pointer">Pin to Featured Section</label>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all active:scale-[0.98]">
              <Save size={18} /> {currentProject._id ? 'Update Mission' : 'Commit Project'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800 text-gray-300 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all border border-gray-700/50">
              Abandon Changes
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project._id} className="bg-[#111111] border border-gray-800/50 rounded-3xl p-8 group hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[80px] -mr-12 -mt-12 rounded-full"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-14 h-14 bg-gray-900/80 rounded-2xl border border-gray-800/50 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                <ImageIcon size={28} />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(project)}
                  className="p-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl transition-all border border-blue-500/10 cursor-pointer"
                  title="Edit Mission"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all border border-red-500/10 cursor-pointer"
                  title="Delete Mission"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-black text-gray-100 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{project.title}</h3>
                {project.featured && <span className="text-[10px] font-black bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full uppercase tracking-widest border border-blue-500/20">Featured</span>}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 font-medium">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[10px] bg-gray-900 border border-gray-800/60 text-gray-500 px-3 py-1.5 rounded-lg uppercase tracking-widest font-bold group-hover:text-blue-400/80 group-hover:border-blue-500/20 transition-all">{t}</span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800/40 flex items-center gap-6 relative z-10">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-white transition-all uppercase tracking-widest">
                  <Github size={16} /> Repository
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-black text-blue-500 hover:text-blue-300 transition-all uppercase tracking-widest">
                  <ExternalLink size={16} /> Live Ops
                </a>
              )}
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-800/50 rounded-3xl bg-gray-900/10">
            <ImageIcon size={48} className="mx-auto text-gray-700 mb-6 opacity-30" />
            <p className="text-gray-400 text-xl font-bold uppercase tracking-widest">No Projects Found in this Sector</p>
            <p className="text-gray-600 mt-2 font-medium">Ignite your first mission to see it displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
