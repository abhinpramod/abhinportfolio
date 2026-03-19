import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import axios from 'axios';
import { Plus, Trash2, Edit2, Save, X, Award, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

const CertificationManager = () => {
  const [certifications, setCertifications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCert, setCurrentCert] = useState({ 
    name: '', 
    issuer: '', 
    date: '', 
    link: '' 
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/certifications`);
      setCertifications(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cert) => {
    setCurrentCert(cert);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certification?')) return;
    try {
      await axios.delete(`${BASE_URL}/certifications/${id}`, { headers });
      setCertifications(certifications.filter(c => c._id !== id));
      showMessage('success', 'Certification deleted');
    } catch (err) {
      showMessage('error', 'Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentCert._id) {
        await axios.put(`${BASE_URL}/certifications/${currentCert._id}`, currentCert, { headers });
        showMessage('success', 'Certification updated');
      } else {
        await axios.post(`${BASE_URL}/certifications`, currentCert, { headers });
        showMessage('success', 'Certification added');
      }
      setIsEditing(false);
      setCurrentCert({ name: '', issuer: '', date: '', link: '' });
      fetchCertifications();
    } catch (err) {
      showMessage('error', 'Operation failed');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (loading) return <div className="text-gray-500 animate-pulse">Syncing credential vault...</div>;

  return (
    <div className="space-y-10 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Professional Credentials</h1>
          <p className="text-gray-400 mt-1">Verify and manage your industry-standard certifications.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
          >
            <Plus size={20} /> Deploy Credential
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
              {currentCert._id ? 'Modify Credential' : 'New Industry Verification'}
            </h3>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Certification Name</label>
              <input 
                type="text" 
                value={currentCert.name}
                onChange={(e) => setCurrentCert({...currentCert, name: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all font-medium"
                placeholder="Ex: AWS Certified Solutions Architect"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Issuing Authority</label>
              <input 
                type="text" 
                value={currentCert.issuer}
                onChange={(e) => setCurrentCert({...currentCert, issuer: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all font-medium"
                placeholder="Ex: Amazon Web Services"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Date Issued</label>
              <input 
                type="text" 
                value={currentCert.date}
                onChange={(e) => setCurrentCert({...currentCert, date: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all font-medium"
                placeholder="Ex: Oct 2023"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Verification Link</label>
              <input 
                type="url" 
                value={currentCert.link}
                onChange={(e) => setCurrentCert({...currentCert, link: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/50 transition-all font-medium"
                placeholder="https://credly.com/..."
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-pink-500/10 hover:shadow-pink-500/20 transition-all active:scale-95">
              <Save size={18} /> {currentCert._id ? 'Confirm Identity' : 'Store Credential'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 font-bold hover:text-white px-6">Discard Data</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((cert) => (
          <div key={cert._id} className="bg-[#111111] border border-gray-800/50 rounded-3xl p-8 group hover:border-pink-500/30 transition-all duration-300 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-[80px] -mr-12 -mt-12 rounded-full"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-gray-900 border border-gray-800/80 rounded-2xl flex items-center justify-center text-pink-400 group-hover:scale-110 transition-all">
                  <Award size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-100 uppercase tracking-tight group-hover:text-pink-400 transition-colors leading-tight">{cert.name}</h4>
                  <p className="text-gray-400 font-bold mt-2 tracking-wide uppercase text-xs">{cert.issuer}</p>
                  <p className="text-xs text-gray-500 font-black tracking-widest mt-2 bg-gray-900/80 w-fit px-3 py-1 rounded-full border border-gray-800/50">{cert.date}</p>
                </div>
              </div>
              <div className="flex gap-1 opacity-100 group-hover:opacity-100 transition-all">
                 <button onClick={() => handleEdit(cert)} className="p-2 text-gray-500 hover:text-blue-400 transition-colors"><Edit2 size={18} /></button>
                 <button onClick={() => handleDelete(cert._id)} className="p-2 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>

            {cert.link && (
              <div className="mt-8 pt-6 border-t border-gray-800/40 relative z-10">
                <a href={cert.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-black text-pink-500 hover:text-pink-300 transition-all uppercase tracking-[0.2em]">
                  <ExternalLink size={14} /> Verify Credential
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationManager;
