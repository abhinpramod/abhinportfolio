import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import axios from 'axios';
import { Plus, Trash2, Edit2, Save, X, Briefcase, CheckCircle2, AlertCircle } from 'lucide-react';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState({ 
    role: '', 
    company: '', 
    duration: '', 
    description: '' 
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data } = await axios.get(`\${BASE_URL}/experience`);
      setExperiences(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (exp) => {
    setCurrentExp({
      ...exp,
      description: exp.description.join('\n')
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    try {
      await axios.delete(`\${BASE_URL}/experience/${id}`, { headers });
      setExperiences(experiences.filter(e => e._id !== id));
      showMessage('success', 'Experience deleted');
    } catch (err) {
      showMessage('error', 'Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expData = {
      ...currentExp,
      description: currentExp.description.split('\n').filter(line => line.trim() !== '')
    };
    try {
      if (currentExp._id) {
        await axios.put(`\${BASE_URL}/experience/${currentExp._id}`, expData, { headers });
        showMessage('success', 'Experience updated');
      } else {
        await axios.post(`\${BASE_URL}/experience`, expData, { headers });
        showMessage('success', 'Experience added');
      }
      setIsEditing(false);
      setCurrentExp({ role: '', company: '', duration: '', description: '' });
      fetchExperiences();
    } catch (err) {
      showMessage('error', 'Operation failed');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (loading) return <div className="text-gray-500 animate-pulse">Retrieving career logs...</div>;

  return (
    <div className="space-y-10 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Career Timeline</h1>
          <p className="text-gray-400 mt-1">Manage your professional journey and key milestones.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
          >
            <Plus size={20} /> Add Milestone
          </button>
        )}
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-500'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="font-semibold text-sm tracking-wide uppercase">{message.text}</span>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-[#111111] border border-gray-800/50 rounded-3xl p-8 space-y-8 animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-100 uppercase tracking-tight">
              {currentExp._id ? 'Edit Professional History' : 'New Career Milestone'}
            </h3>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Role / Designation</label>
              <input 
                type="text" 
                value={currentExp.role}
                onChange={(e) => setCurrentExp({...currentExp, role: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all font-medium"
                placeholder="Ex: Senior Developer"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Company & Location</label>
              <input 
                type="text" 
                value={currentExp.company}
                onChange={(e) => setCurrentExp({...currentExp, company: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all font-medium"
                placeholder="Ex: Google | Kozhikode"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Duration</label>
            <input 
              type="text" 
              value={currentExp.duration}
              onChange={(e) => setCurrentExp({...currentExp, duration: e.target.value})}
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all font-medium"
              placeholder="Ex: Jan 2022 - Present"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Key Accomplishments (One per line)</label>
            <textarea 
              value={currentExp.description}
              onChange={(e) => setCurrentExp({...currentExp, description: e.target.value})}
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all h-40 resize-none font-medium leading-relaxed"
              placeholder="- Led a team of 5 engineers...&#10;- Architected microservices..."
              required
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all active:scale-95">
              <Save size={18} /> {currentExp._id ? 'Update History' : 'Log Milestone'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 font-bold hover:text-white px-6">Abort Mission</button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp._id} className="bg-[#111111] border border-gray-800/50 rounded-3xl p-8 group hover:border-orange-500/30 transition-all duration-300 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[80px] -mr-12 -mt-12 rounded-full"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-gray-900 border border-gray-800/80 rounded-2xl flex items-center justify-center text-orange-400 group-hover:scale-110 transition-all">
                  <Briefcase size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-100 uppercase tracking-tight group-hover:text-orange-400 transition-colors">{exp.role}</h4>
                  <p className="text-gray-400 font-bold mt-1 tracking-wide">{exp.company}</p>
                  <p className="text-xs text-gray-500 uppercase font-black tracking-[0.2em] mt-2">{exp.duration}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => handleEdit(exp)} className="p-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/10"><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(exp._id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl border border-red-500/10"><Trash2 size={18} /></button>
              </div>
            </div>

            <ul className="mt-8 space-y-3 relative z-10">
              {exp.description.map((point, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-400 font-medium leading-relaxed">
                  <span className="text-orange-500 mt-1.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;
