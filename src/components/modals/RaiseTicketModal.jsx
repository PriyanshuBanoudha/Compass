import React from 'react';
import Icon from '../Icons';

export default function RaiseTicketModal({
  isOpen,
  onClose,
  onSubmit,
  subject, setSubject,
  description, setDescription,
  teachers,
  selectedTeacher, setSelectedTeacher,
  submitting
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Raise Support Ticket</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white cursor-pointer">
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Topic Subject</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-slate-950 border border-slate-805 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none placeholder-slate-705"
              placeholder="e.g. Attendance mistake on July 10"
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Select Teacher</label>
            <select 
              className="w-full px-3 py-2 bg-slate-950 border border-slate-805 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
              required
              value={selectedTeacher}
              onChange={e => setSelectedTeacher(e.target.value)}
            >
              <option value="">Choose teacher...</option>
              {teachers.map(t => (
                <option key={t._id} value={t._id}>{t.name} ({t.email})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Problem Details</label>
            <textarea 
              className="w-full px-3 py-2 bg-slate-955 border border-slate-805 rounded-xl text-white text-sm focus:border-indigo-550 focus:outline-none placeholder-slate-705"
              rows="5"
              placeholder="Summarize your issue so the administrator can resolve it..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ resize: 'vertical' }}
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 text-sm">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all cursor-pointer" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Raise Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
