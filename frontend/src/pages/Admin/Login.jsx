import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`\${BASE_URL}/auth/login`, { email, password });
      localStorage.setItem('adminToken', data.token);
      setEmail('');
      setPassword('');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050511] flex items-center justify-center p-4 font-sans relative overflow-hidden selection:bg-indigo-500/30">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Ambient base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(40,40,70,0.5)_0%,rgba(5,5,17,1)_100%)]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Animated Orbs */}
        <motion.div 
          animate={{ x: [0, 80, 0], y: [0, -80, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen"
        />
        <motion.div 
          animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[20%] w-[35vw] h-[35vw] min-w-[250px] min-h-[250px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen"
        />
        <motion.div 
          animate={{ x: [0, 50, -50, 0], y: [0, 50, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] min-w-[200px] min-h-[200px] bg-blue-500/10 rounded-full blur-[90px] mix-blend-screen"
        />
      </div>

      {/* Main Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10 relative"
      >
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-3xl p-8 sm:p-10 relative overflow-hidden group">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
          
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring', bounce: 0.5 }}
              className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] mb-6 shadow-inner relative"
            >
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] relative z-10">
                <Lock className="text-white w-6 h-6" />
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 mb-2 tracking-tight"
            >
              Dev.Folio
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-indigo-200/60 text-sm font-medium tracking-wide"
            >
              Secure administrative access
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative group/input">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${focusedInput === 'email' ? 'text-indigo-400' : 'text-gray-500 group-hover/input:text-gray-400'}`}>
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  // value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-[3px] focus:ring-indigo-500/20 transition-all duration-300 shadow-inner"
                  placeholder="Admin Email"
                />
              </div>
            </motion.div>






            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative group/input">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${focusedInput === 'password' ? 'text-indigo-400' : 'text-gray-500 group-hover/input:text-gray-400'}`}>
                  <Lock size={20} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  // value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-[3px] focus:ring-indigo-500/20 transition-all duration-300 shadow-inner"
                  placeholder="Password"
                  // required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 overflow-hidden"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shrink-0"></div>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-2"
            >
              <button 
                type="submit" 
                disabled={loading}
                className="w-full relative group overflow-hidden bg-white/[0.03] border border-white/[0.05] text-white font-semibold py-4 rounded-2xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {/* Button Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/80 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin text-white" size={20} />
                      <span className="tracking-wide">Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span className="tracking-wide text-[15px]">Sign In to Portal</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 group-hover:text-indigo-200 transition-all" />
                    </>
                  )}
                </span>
              </button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center"
          >
            <p className="text-[11px] text-gray-500/80 font-medium tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Dev.Folio &middot; Admin System
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
