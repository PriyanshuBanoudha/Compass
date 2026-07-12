import React, { useState } from 'react';
import Icon from '../Icons';
import AnswerTicketModal from '../modals/AnswerTicketModal';

export default function AdminTickets({ tickets, onUpdate, authorizedFetch, showToast }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState('');

  const handleResolve = async (e) => {
    e.preventDefault();
    if (!reply) return;

    try {
      await authorizedFetch(`/tickets/${selectedTicket._id}/resolve`, {
        method: 'PUT',
        body: JSON.stringify({ resolution: reply })
      });
      showToast('Support ticket status resolved.');
      setSelectedTicket(null);
      setReply('');
      onUpdate();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const openTickets = tickets.filter(t => t.status === 'Open');
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved');

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-2xl font-bold text-white tracking-tight">Support Tickets</h2>
        <p className="text-slate-400 text-sm mt-1">Review student issues and reply to solve tickets</p>
      </div>

      {/* Open tickets */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Icon className="text-pink-500" /> Open Tickets ({openTickets.length})
        </h3>
        
        {openTickets.length === 0 ? (
          <div className="text-center py-10 text-slate-500">No pending queries.</div>
        ) : (
          <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
            <table className="w-full text-left text-sm text-slate-400 border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-white font-medium">
                  <th className="p-4">Student</th>
                  <th className="p-4">Topic Subject</th>
                  <th className="p-4">Description Text</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {openTickets.map(t => (
                  <tr key={t._id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                    <td className="p-4 font-semibold text-white">
                      {t.student ? t.student.name : 'Unknown Student'}
                      <div className="text-slate-500 text-[10px] uppercase mt-0.5">Roll: {t.student ? t.student.rollNumber : 'N/A'}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-205">{t.subject}</td>
                    <td className="p-4 text-xs max-w-[240px] truncate">{t.description}</td>
                    <td className="p-4 text-slate-500">{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => setSelectedTicket(t)} className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ml-auto">
                        <Icon  className="w-3.5 h-3.5" /> Answer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Resolved history */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Icon className="text-emerald-500" /> Answered & Resolved ({resolvedTickets.length})
        </h3>
        
        {resolvedTickets.length === 0 ? (
          <div className="text-center py-10 text-slate-500">No history found.</div>
        ) : (
          <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
            <table className="w-full text-left text-sm text-slate-400 border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-white font-medium">
                  <th className="p-4">Student</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Issue Description</th>
                  <th className="p-4">Official Resolution</th>
                  <th className="p-4 text-right">Resolved On</th>
                </tr>
              </thead>
              <tbody>
                {resolvedTickets.map(t => (
                  <tr key={t._id} className="border-b border-slate-800/50 hover:bg-slate-855/10">
                    <td className="p-4 font-semibold text-slate-350">{t.student ? t.student.name : 'Unknown'}</td>
                    <td className="p-4 text-white font-medium">{t.subject}</td>
                    <td className="p-4 text-xs max-w-[200px] truncate">{t.description}</td>
                    <td className="p-4 text-xs max-w-[300px] font-normal leading-relaxed text-indigo-305">
                      <div className="bg-slate-950 border border-slate-800/50 rounded-lg p-2 italic text-emerald-400">
                        "{t.resolution}"
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 text-right">{new Date(t.resolvedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnswerTicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onSubmit={handleResolve}
        reply={reply}
        setReply={setReply}
      />
    </div>
  );
}
