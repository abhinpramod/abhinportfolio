import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Briefcase, 
  Code2, 
  GraduationCap, 
  Award, 
  UserCircle, 
  MessageSquare,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';

const navItems = [
  { path: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: 'projects', label: 'Projects', icon: Briefcase },
  { path: 'skills', label: 'Skills', icon: Code2 },
  { path: 'experience', label: 'Experience', icon: BarChart3 },
  { path: 'education', label: 'Education', icon: GraduationCap },
  { path: 'certifications', label: 'Certifications', icon: Award },
  { path: 'profile', label: 'Profile', icon: UserCircle },
  { path: 'messages', label: 'Messages', icon: MessageSquare },
];

const Sidebar = () => {
  return (
    <aside className="w-72 bg-[#0f0f0f] border-r border-gray-800/50 flex flex-col h-full z-20">
      <div className="p-8 pb-4">
        <h1 className="text-2xl font-bold font-serif tracking-tight">
          <span className="text-blue-500">Dev</span>
          <span className="text-gray-300">.</span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Folio</span>
        </h1>
        <p className="text-xs text-gray-500 mt-2 font-medium tracking-widest uppercase">Management Suite</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group
              ${isActive 
                ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30' 
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={isActive ? 'text-blue-400' : 'group-hover:text-blue-400 transition-colors'} />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800/50">
        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-4 border border-blue-500/10">
          <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">Status</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300 px-1">System Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
