import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Trash2, Calendar, User, Phone, MessageSquare, Trash, CheckCircle2, AlertCircle } from 'lucide-react';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/contact', { headers });
      setMessages(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Wipe this message from records?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`, { headers });
      setMessages(messages.filter(m => m._id !== id));
      showMessage('success', 'Transmission purged');
    } catch (err) {
      showMessage('error', 'Purge failed');
    }
  };

  const showMessage = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: '', text: '' }), 3000);
  };

  if (loading) return <div className="text-gray-500 animate-pulse font-medium tracking-widest uppercase">Deciphering incoming signals...</div>;

  return (
    <div className="space-y-10 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-100 italic">Communication Log</h1>
        <p className="text-gray-400 mt-1">Intercepted transmissions from your portfolio visitors.</p>
      </div>

      {statusMsg.text && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 animate-in fade-in duration-300 ${
          statusMsg.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-500'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="font-semibold text-sm tracking-wide uppercase">{statusMsg.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {messages.map((msg) => (
          <div key={msg._id} className="bg-[#111111] border border-gray-800/50 rounded-3xl p-8 group hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[80px] -mr-12 -mt-12 rounded-full"></div>
            
            <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                    <User size={14} /> {msg.name}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm font-medium hover:text-cyan-400 transition-colors cursor-pointer">
                    <Mail size={14} /> {msg.email}
                  </div>
                  {msg.phone && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                      <Phone size={14} /> {msg.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase tracking-[0.22em] ml-auto">
                    <Calendar size={14} /> {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-black text-gray-100 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                    {msg.subject || 'Inquiry Signal'}
                  </h4>
                  <div className="bg-gray-900/50 border border-gray-800/30 rounded-2xl p-6 text-gray-400 text-sm leading-relaxed font-medium">
                    {msg.message}
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col justify-end gap-2">
                <button 
                  onClick={() => handleDelete(msg._id)}
                  className="p-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl border border-red-500/10 transition-all"
                  title="Purge Transmission"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="py-24 text-center border-2 border-dashed border-gray-800/50 rounded-3xl bg-gray-900/10">
            <MessageSquare size={48} className="mx-auto text-gray-700 mb-6 opacity-30" />
            <p className="text-gray-400 text-xl font-bold uppercase tracking-widest">No Signals Intercepted</p>
            <p className="text-gray-600 mt-2 font-medium">Silence is golden, or maybe your contact form is lonely.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageManager;
