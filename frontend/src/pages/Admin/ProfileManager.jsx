import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import axios from 'axios';
import { Save, User, Github, Linkedin, Twitter, Instagram, Facebook, Mail, Phone, MapPin, Globe, CheckCircle2, AlertCircle } from 'lucide-react';

const ProfileManager = () => {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    subtitle: '',
    aboutText: '',
    resumeLink: '',
    profileImage: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: ''
    },
    contactInfo: {
      email: '',
      phone: '',
      address: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`\${BASE_URL}/profile`);
      if (data.data) {
        const d = data.data;
        setProfile({
          name: d.name || '',
          title: d.titleChunks ? d.titleChunks.join(' | ') : '',
          subtitle: d.subtitle || '',
          aboutText: d.aboutText || '',
          resumeLink: d.resumeLink || '',
          profileImage: d.profileImage || '',
          socialLinks: {
            github: d.github || '',
            linkedin: d.linkedin || '',
            twitter: d.twitter || '',
            instagram: d.instagram || '',
            facebook: d.facebook || ''
          },
          contactInfo: {
            email: d.email || '',
            phone: d.phone || '',
            address: d.address || ''
          }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: profile.name,
        titleChunks: profile.title ? profile.title.split('|').map(t => t.trim()).filter(Boolean) : [],
        subtitle: profile.subtitle,
        aboutText: profile.aboutText,
        resumeLink: profile.resumeLink,
        profileImage: profile.profileImage,
        github: profile.socialLinks?.github || '',
        linkedin: profile.socialLinks?.linkedin || '',
        twitter: profile.socialLinks?.twitter || '',
        instagram: profile.socialLinks?.instagram || '',
        facebook: profile.socialLinks?.facebook || '',
        email: profile.contactInfo?.email || '',
        phone: profile.contactInfo?.phone || '',
        address: profile.contactInfo?.address || ''
      };
      await axios.post(`\${BASE_URL}/profile`, payload, { headers });
      showMessage('success', 'Profile identity updated');
    } catch (err) {
      showMessage('error', 'Update synchronization failed');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSocialChange = (platform, value) => {
    setProfile({
      ...profile,
      socialLinks: { ...profile.socialLinks, [platform]: value }
    });
  };

  const handleContactChange = (field, value) => {
    setProfile({
      ...profile,
      contactInfo: { ...profile.contactInfo, [field]: value }
    });
  };

  if (loading) return <div className="text-gray-500 animate-pulse font-medium">Reconstructing identity data...</div>;

  return (
    <div className="space-y-10 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Identity Configuration</h1>
        <p className="text-gray-400 mt-1">Configure your personal brand and global contact vectors.</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-500'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="font-semibold text-sm tracking-wide uppercase">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Info */}
        <div className="bg-[#111111] border border-gray-800/50 rounded-3xl p-10 space-y-8 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-[100px] -mr-16 -mt-16 rounded-full"></div>
          <h3 className="text-xl font-black text-gray-100 uppercase tracking-tight flex items-center gap-3 relative z-10">
             <User size={24} className="text-blue-500" /> Core Bio
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Full Legal Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Professional Title</label>
              <input 
                type="text" 
                value={profile.title}
                onChange={(e) => setProfile({...profile, title: e.target.value})}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-3 relative z-10">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Tagline / Subtitle</label>
            <input 
              type="text" 
              value={profile.subtitle}
              onChange={(e) => setProfile({...profile, subtitle: e.target.value})}
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium"
              required
            />
          </div>

          <div className="space-y-3 relative z-10">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Executive Summary / About</label>
            <textarea 
              value={profile.aboutText}
              onChange={(e) => setProfile({...profile, aboutText: e.target.value})}
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 px-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all h-64 resize-none leading-relaxed font-medium"
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Resume / CV Link</label>
              <div className="relative">
                 <Globe size={18} className="absolute left-6 top-5 text-gray-600" />
                 <input 
                    type="url" 
                    value={profile.resumeLink}
                    onChange={(e) => setProfile({...profile, resumeLink: e.target.value})}
                    className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 pl-14 pr-6 text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 font-medium text-sm"
                 />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Profile Avatar URL</label>
              <div className="relative">
                 <User size={18} className="absolute left-6 top-5 text-gray-600" />
                 <input 
                    type="text" 
                    value={profile.profileImage}
                    onChange={(e) => setProfile({...profile, profileImage: e.target.value})}
                    className="w-full bg-gray-900/50 border border-gray-700/50 rounded-2xl py-4 pl-14 pr-6 text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 font-medium text-sm"
                 />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Social Links */}
          <div className="bg-[#111111] border border-gray-800/50 rounded-3xl p-10 space-y-8 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-600/5 blur-[80px] -ml-12 -mt-12 rounded-full"></div>
            <h3 className="text-xl font-black text-gray-100 uppercase tracking-tight flex items-center gap-3 relative z-10">
               <Globe size={24} className="text-purple-500" /> Connect Hub
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-1">GitHub Orbit</label>
                <div className="relative">
                  <Github size={18} className="absolute left-5 top-4 text-gray-600" />
                  <input type="url" value={profile.socialLinks?.github} onChange={(e) => handleSocialChange('github', e.target.value)} className="w-full bg-gray-900/40 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium text-blue-400 focus:border-purple-500/50 focus:ring-0 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-1">LinkedIn Professional</label>
                <div className="relative">
                  <Linkedin size={18} className="absolute left-5 top-4 text-gray-600" />
                  <input type="url" value={profile.socialLinks?.linkedin} onChange={(e) => handleSocialChange('linkedin', e.target.value)} className="w-full bg-gray-900/40 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium text-blue-400 focus:border-purple-500/50 focus:ring-0 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-1">Twitter / X Feed</label>
                <div className="relative">
                  <Twitter size={18} className="absolute left-5 top-4 text-gray-600" />
                  <input type="url" value={profile.socialLinks?.twitter} onChange={(e) => handleSocialChange('twitter', e.target.value)} className="w-full bg-gray-900/40 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium text-blue-400 focus:border-purple-500/50 focus:ring-0 transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-1">Instagram</label>
                  <div className="relative text-rose-400"><Instagram size={18} className="absolute left-5 top-4 opacity-40 border-none" /><input type="url" value={profile.socialLinks?.instagram} onChange={(e) => handleSocialChange('instagram', e.target.value)} className="w-full bg-gray-900/40 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-xs font-medium focus:border-purple-500/50 focus:ring-0 transition-all" /></div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-1">Facebook</label>
                   <div className="relative text-blue-600"><Facebook size={18} className="absolute left-5 top-4 opacity-40" /><input type="url" value={profile.socialLinks?.facebook} onChange={(e) => handleSocialChange('facebook', e.target.value)} className="w-full bg-gray-900/40 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-xs font-medium focus:border-purple-500/50 focus:ring-0 transition-all" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-[#111111] border border-gray-800/50 rounded-3xl p-10 space-y-8 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 blur-[80px] -mr-12 -mt-12 rounded-full"></div>
            <h3 className="text-xl font-black text-gray-100 uppercase tracking-tight flex items-center gap-3 relative z-10">
               <Mail size={24} className="text-emerald-500" /> Contact Grid
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-1">Primary Email Signal</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-5 top-4 text-gray-600" />
                  <input type="email" value={profile.contactInfo?.email} onChange={(e) => handleContactChange('email', e.target.value)} className="w-full bg-gray-900/40 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium text-emerald-400 focus:border-emerald-500/50 focus:ring-0 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-1">Phone Comms</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-5 top-4 text-gray-600" />
                  <input type="text" value={profile.contactInfo?.phone} onChange={(e) => handleContactChange('phone', e.target.value)} className="w-full bg-gray-900/40 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium text-emerald-400 focus:border-emerald-500/50 focus:ring-0 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-1">Physical Base / Address</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-5 top-4 text-gray-600" />
                  <input type="text" value={profile.contactInfo?.address} onChange={(e) => handleContactChange('address', e.target.value)} className="w-full bg-gray-900/40 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium text-emerald-400 focus:border-emerald-500/50 focus:ring-0 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white font-black py-5 rounded-3xl transition-all duration-300 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.99] flex items-center justify-center gap-3 text-lg uppercase tracking-[0.3em]"
        >
          <Save size={24} /> Finalize Configuration
        </button>
      </form>
    </div>
  );
};

export default ProfileManager;
