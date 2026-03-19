import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import axios from 'axios';
import { Plus, Trash2, Edit2, Save, X, GraduationCap, CheckCircle2, AlertCircle } from 'lucide-react';

const EducationManager = () => {
  const [education, setEducation] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdu, setCurrentEdu] = useState({ 
    school: '', 
    degree: '', 
    duration: '' 
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const { data } = await axios.get(`\${BASE_URL}/education`);
      setEducation(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (edu) => {
    setCurrentEdu(edu);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      await axios.delete(`\${BASE_URL}/education/${id}`, { headers });
      setEducation(education.filter(e => e._id !== id));
      showMessage('success', 'Education deleted');
    } catch (err) {
      showMessage('error', 'Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentEdu._id) {
        await axios.put(`\${BASE_URL}/education/${currentEdu._id}`, currentEdu, { headers });
        showMessage('success', 'Education updated');
      } else {
        await axios.post(`\${BASE_URL}/education`, currentEdu, { headers });
        showMessage('success', 'Education added');
      }
      setIsEditing(false);
      setCurrentEdu({ school: '', degree: '', duration: '' });
      fetchEducation();
    } catch (err) {
      showMessage('error', 'Operation failed');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (loading) return <div className="text-gray-500 animate-pulse">Accessing academic archives...</div>;

  return (
    <div className="space-y-10 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Academic Background</h1>
          <p className="text-gray-400 mt-1">Foundational knowledge and scholarly achievements.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
          >
            <Plus size={20} /> Add Academic Record
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
              {currentEdu._id ? 'Modify Academic Entry' : 'New Scholarly Pursuit'}
            </h3>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Institution / School</label>
              <input 
                type="text" 
                value={currentEdu.school}
                onChange={(e) => setCurrentEdu({...currentEdu, school: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all font-medium"
                placeholder="Ex: Calicut University"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Degree / Certificate</label>
              <input 
                type="text" 
                value={currentEdu.degree}
                onChange={(e) => setCurrentEdu({...currentEdu, degree: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all font-medium"
                placeholder="Ex: B.Tech Computer Science"
                required
              />
            </div>
          </div>

          <div className="space-y-3 max-w-md">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Duration</label>
            <input 
              type="text" 
              value={currentEdu.duration}
              onChange={(e) => setCurrentEdu({...currentEdu, duration: e.target.value})}
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all font-medium"
              placeholder="Ex: 2021 - 2025"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-green-500/10 hover:shadow-green-500/20 transition-all active:scale-95">
              <Save size={18} /> {currentEdu._id ? 'Confirm Record' : 'Record Achievement'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 font-bold hover:text-white px-6">Discard Data</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {education.map((edu) => (
          <div key={edu._id} className="bg-[#111111] border border-gray-800/50 rounded-3xl p-8 group hover:border-green-500/30 transition-all duration-300 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[80px] -mr-12 -mt-12 rounded-full"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-gray-900 border border-gray-800/80 rounded-2xl flex items-center justify-center text-green-400 group-hover:scale-110 transition-all">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-100 uppercase tracking-tight group-hover:text-green-400 transition-colors leading-tight">{edu.degree}</h4>
                  <p className="text-gray-400 font-bold mt-2 tracking-wide">{edu.school}</p>
                  <p className="text-xs text-gray-500 uppercase font-black tracking-[0.2em] mt-3 bg-gray-900/80 w-fit px-3 py-1 rounded-full border border-gray-800/50">{edu.duration}</p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => handleEdit(edu)} className="p-2 text-gray-500 hover:text-blue-400 transition-colors"><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(edu._id)} className="p-2 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationManager;
