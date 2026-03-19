import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import axios from 'axios';
import { Plus, Trash2, Edit2, Save, X, Code2, CheckCircle2, AlertCircle } from 'lucide-react';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({ name: '', level: 80, category: 'Frontend Development' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/skills`);
      setSkills(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setCurrentSkill(skill);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await axios.delete(`${BASE_URL}/skills/${id}`, { headers });
      setSkills(skills.filter(s => s._id !== id));
      showMessage('success', 'Skill deleted');
    } catch (err) {
      showMessage('error', 'Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSkill._id) {
        await axios.put(`${BASE_URL}/skills/${currentSkill._id}`, currentSkill, { headers });
        showMessage('success', 'Skill updated');
      } else {
        await axios.post(`${BASE_URL}/skills`, currentSkill, { headers });
        showMessage('success', 'Skill added');
      }
      setIsEditing(false);
      setCurrentSkill({ name: '', level: 80, category: 'Frontend Development' });
      fetchSkills();
    } catch (err) {
      showMessage('error', 'Operation failed');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (loading) return <div className="text-gray-500 animate-pulse">Scanning technical arsenal...</div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Technical Expertise</h1>
          <p className="text-gray-400 mt-1">Refine and manage your specialized skill segments.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20 active:scale-95"
          >
            <Plus size={20} /> Add Power
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
              {currentSkill._id ? 'Modify Specialization' : 'New Technical Module'}
            </h3>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Skill Name</label>
              <input 
                type="text" 
                value={currentSkill.name}
                onChange={(e) => setCurrentSkill({...currentSkill, name: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-medium"
                placeholder="Ex: React.js"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Segment / Category</label>
              <select 
                value={currentSkill.category}
                onChange={(e) => setCurrentSkill({...currentSkill, category: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-bold tracking-tight appearance-none"
              >
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="Tools & Others">Tools & Others</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Proficiency Mastery</label>
              <span className="text-2xl font-black text-purple-400">{currentSkill.level}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={currentSkill.level}
              onChange={(e) => setCurrentSkill({...currentSkill, level: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all active:scale-95">
              <Save size={18} /> {currentSkill._id ? 'Sync Module' : 'Deploy Skill'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 font-bold hover:text-white px-6">Cancel Ops</button>
          </div>
        </form>
      )}

      {/* Skills Grid grouped by category */}
      {['Frontend Development', 'Backend Development', 'Tools & Others'].map(cat => (
        <div key={cat} className="space-y-6">
          <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-4">
            {cat}
            <div className="flex-1 h-px bg-gray-800/50"></div>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.filter(s => s.category === cat).map(skill => (
              <div key={skill._id} className="bg-[#111111] border border-gray-800/50 rounded-2xl p-6 group hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-[60px] -mr-8 -mt-8 rounded-full"></div>
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-900 border border-gray-800/80 rounded-xl flex items-center justify-center text-purple-400 group-hover:scale-110 transition-all">
                      <Code2 size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-200 group-hover:text-purple-400 transition-colors">{skill.name}</h5>
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{skill.level}% Optimized</span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(skill)} className="p-2 text-gray-500 hover:text-blue-400 transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(skill._id)} className="p-2 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
                <div className="mt-4 w-full h-1 bg-gray-800/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillManager;
