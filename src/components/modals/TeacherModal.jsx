import React from 'react';
import Icon from '../Icons';

export default function TeacherModal({
  isOpen,
  onClose,
  onSubmit,
  adminName, setAdminName,
  adminEmail, setAdminEmail,
  adminPassword, setAdminPassword,
  adminLoading
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="p-6 border-b border-slate-805 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Add Teacher (Admin)</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white cursor-pointer">
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Full Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm focus:outline-none" 
              required 
              value={adminName} 
              onChange={e => setAdminName(e.target.value)} 
              placeholder="e.g. Dr. Jane Smith" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Email Address</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm focus:outline-none" 
              required 
              value={adminEmail} 
              onChange={e => setAdminEmail(e.target.value)} 
              placeholder="e.g. janesmith@university.edu" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Login Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-505 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm focus:outline-none" 
              required 
              value={adminPassword} 
              onChange={e => setAdminPassword(e.target.value)} 
              placeholder="••••••••" 
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 text-sm">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all cursor-pointer" disabled={adminLoading}>
              {adminLoading ? 'Registering...' : 'Register Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
