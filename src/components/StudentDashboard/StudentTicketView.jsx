import React, { useState, useEffect } from 'react';
import Icon from '../Icons';
import RaiseTicketModal from '../modals/RaiseTicketModal';

export default function StudentTicketView({ tickets, onUpdate, authorizedFetch, showToast }) {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Teacher allocation states
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');

  // Fetch teachers when modal is mounted
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await authorizedFetch('/auth/teachers');
        setTeachers(data);
      } catch (err) {
        showToast(err.message, 'error');
      }
    };
    if (showSubmitModal) {
      fetchTeachers();
    }
  }, [showSubmitModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTeacher) {
      showToast('Please select a teacher to assign the query to', 'error');
      return;
    }
    setSubmitting(true);

    try {
      await authorizedFetch('/tickets', {
        method: 'POST',
        body: JSON.stringify({ subject, description, teacherId: selectedTeacher })
      });
      showToast('Support ticket raised successfully.');
      setSubject('');
      setDescription('');
      setSelectedTeacher('');
      setShowSubmitModal(false);
      onUpdate();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-5 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Support Desk</h2>
          <p className="text-slate-400 text-sm mt-1">Submit question queries directly to your teacher</p>
        </div>
        <button 
          onClick={() => setShowSubmitModal(true)} 
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/10 cursor-pointer flex items-center gap-2 self-start md:self-auto"
        >
          <Icon name="plus" className="w-4 h-4" /> Raise Support Ticket
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
          <Icon name="ticket" className="text-indigo-400 w-5 h-5" /> Helpdesk Tickets History
        </h3>

        {tickets.length === 0 ? (
          <div className="text-center py-16 text-slate-500 space-y-2">
            <Icon name="ticket" className="w-12 h-12 mx-auto text-slate-700" />
            <p>You have not submitted any tickets yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
            <table className="w-full text-left text-sm text-slate-400 border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-white font-medium">
                  <th className="p-4">Topic / Subject</th>
                  <th className="p-4">Assigned Teacher</th>
                  <th className="p-4">Description Detail</th>
                  <th className="p-4">Submitted Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Teacher Resolution</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(t => (
                  <tr key={t._id} className="border-b border-slate-800/50 hover:bg-slate-855/5">
                    <td className="p-4 font-semibold text-white">{t.subject}</td>
                    <td className="p-4 text-xs text-slate-300 font-medium">
                      {t.teacher ? (
                        <div className="flex flex-col">
                          <span>{t.teacher.name}</span>
                          <span className="text-[10px] text-slate-505">{t.teacher.email}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="p-4 text-xs max-w-[200px] truncate">{t.description}</td>
                    <td className="p-4 text-slate-550">{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-0.5 border text-[10px] font-semibold rounded-full uppercase ${
                        t.status === 'Resolved' 
                          ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/25' 
                          : 'bg-amber-500/15 text-amber-500 border-amber-500/25'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-normal text-slate-300">
                      {t.status === 'Resolved' ? (
                        <div className="bg-slate-950 border border-slate-800/60 rounded-xl p-3 max-w-[360px] italic border-l-2 border-l-emerald-500">
                          <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-widest not-italic mb-1">Official response</span>
                          <span className="text-slate-202">"{t.resolution}"</span>
                          <span className="block text-[8px] text-slate-500 not-italic mt-2">Closed: {new Date(t.resolvedAt).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-650 italic">Awaiting response reply...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <RaiseTicketModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onSubmit={handleSubmit}
        subject={subject} setSubject={setSubject}
        description={description} setDescription={setDescription}
        teachers={teachers}
        selectedTeacher={selectedTeacher} setSelectedTeacher={setSelectedTeacher}
        submitting={submitting}
      />
    </div>
  );
}
