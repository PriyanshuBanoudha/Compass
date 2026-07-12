import React from 'react';
import Icon from '../Icons';

export default function AnswerTicketModal({
  ticket,
  onClose,
  onSubmit,
  reply,
  setReply
}) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-905 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Answer Student Query</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white cursor-pointer">
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <span className="block text-[10px] font-bold text-slate-505 uppercase tracking-widest">Question Subject</span>
            <div className="text-white font-semibold text-sm mt-1">{ticket.subject}</div>
          </div>

          <div className="p-3 bg-slate-955 border border-slate-805 rounded-xl text-slate-300 text-xs leading-relaxed max-h-[120px] overflow-auto">
            <span className="block text-[9px] font-bold text-slate-505 uppercase tracking-widest mb-1">Detailed Description</span>
            {ticket.description}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-404 mb-1.5 uppercase">Resolution Response</label>
            <textarea 
              className="w-full px-3 py-2 bg-slate-955 border border-slate-855 rounded-xl text-white text-sm focus:border-indigo-505 focus:outline-none"
              rows="4"
              placeholder="Type advice or resolution details here..."
              value={reply}
              onChange={e => setReply(e.target.value)}
              style={{ resize: 'vertical' }}
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 text-sm">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all cursor-pointer">
              Send & Resolve
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
