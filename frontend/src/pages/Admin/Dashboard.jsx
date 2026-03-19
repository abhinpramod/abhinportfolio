import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Briefcase, 
  Code2, 
  BarChart3, 
  GraduationCap, 
  Award, 
  MessageSquare,
  TrendingUp,
  Clock,
  ExternalLink
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    education: 0,
    certifications: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const results = await Promise.allSettled([
          axios.get('http://localhost:5000/api/projects'),
          axios.get('http://localhost:5000/api/skills'),
          axios.get('http://localhost:5000/api/experience'),
          axios.get('http://localhost:5000/api/education'),
          axios.get('http://localhost:5000/api/certifications'),
          axios.get('http://localhost:5000/api/contact', {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
          })
        ]);

        const getLength = (result) => result.status === 'fulfilled' && result.value.data.data ? result.value.data.data.length : 0;

        setStats({
          projects: getLength(results[0]),
          skills: getLength(results[1]),
          experience: getLength(results[2]),
          education: getLength(results[3]),
          certifications: getLength(results[4]),
          messages: getLength(results[5]),
        });
      } catch (err) {
        console.error('Error fetching stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Skills', value: stats.skills, icon: Code2, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Experience', value: stats.experience, icon: BarChart3, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Education', value: stats.education, icon: GraduationCap, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Certifications', value: stats.certifications, icon: Award, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-400 font-medium animate-pulse">Initializing Dashboard...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Welcome Back, Admin</h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your portfolio today.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <Clock size={18} className="text-blue-400" />
          <span className="text-sm font-medium text-blue-100">Last login: Today 10:45 AM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-[#111111] border border-gray-800/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.bg} blur-3xl -mr-8 -mt-8 opacity-50`}></div>
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-4">
                <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center ${card.color}`}>
                  <card.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{card.label}</p>
                  <h3 className="text-4xl font-black text-white mt-1">{card.value}</h3>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full">
                <TrendingUp size={12} />
                +2
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800/50 flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest relative z-10">
              <span>Updated 5m ago</span>
              <a href={`/admin/${card.label.toLowerCase()}`} className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group/link">
                Manage <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111111] border border-gray-800/50 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-400" />
            Portfolio Performance
          </h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-800 rounded-2xl text-gray-600 font-medium">
            Performance Visualization Placeholder
          </div>
        </div>
        
        <div className="bg-[#111111] border border-gray-800/50 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock size={20} className="text-purple-400" />
            Recent Activity
          </h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all">
                  {i % 2 === 0 ? <Briefcase size={16} /> : <MessageSquare size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-200 truncate group-hover:text-white transition-colors">
                    {i % 2 === 0 ? 'New project uploaded' : 'New message received'}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">{i * 15} minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
