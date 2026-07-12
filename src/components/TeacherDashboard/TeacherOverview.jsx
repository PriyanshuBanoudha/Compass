import React from 'react';
import Icon from '../Icons';

export default function TeacherOverview({ students, tickets }) {
  const openQueries = tickets.filter(t => t.status === 'Open').length;
  const resolvedQueries = tickets.filter(t => t.status === 'Resolved').length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Teacher Admin Console</h2>
          <p className="text-slate-400 text-sm mt-1">Review academia statistics and support requests</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-lg transition-transform hover:-translate-y-1">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Enrolled</p>
            <h3 className="text-3xl font-extrabold text-white">{students.length}</h3>
          </div>
          <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
            <Icon name="users" className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-lg transition-transform hover:-translate-y-1">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Open Issues</p>
            <h3 className="text-3xl font-extrabold text-pink-500">{openQueries}</h3>
          </div>
          <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500">
            <Icon name="ticket" className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-lg transition-transform hover:-translate-y-1">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Resolved Tickets</p>
            <h3 className="text-3xl font-extrabold text-emerald-500">{resolvedQueries}</h3>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
            <Icon name="check" className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket review table */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Icon name="ticket" className="text-indigo-400 w-5 h-5" />
            Recent Unresolved Cases
          </h3>
          {tickets.filter(t => t.status === 'Open').length === 0 ? (
            <div className="text-center py-10 text-slate-500 space-y-2">
              <Icon name="check" className="w-8 h-8 mx-auto text-emerald-500" />
              <p className="text-sm font-medium">All support tickets resolved.</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
              <table className="w-full text-left text-sm text-slate-400 border-collapse">
                <thead>
                  <tr className="bg-slate-800/60 text-white font-medium">
                    <th className="p-4">Student</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.filter(t => t.status === 'Open').slice(0, 4).map(t => (
                    <tr key={t._id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                      <td className="p-4 font-semibold text-slate-350">{t.student ? t.student.name : 'N/A'}</td>
                      <td className="p-4 text-white font-medium">{t.subject}</td>
                      <td className="p-4 text-xs max-w-[200px] truncate">{t.description}</td>
                      <td className="p-4"><span className="inline-flex px-2 py-0.5 border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] font-semibold rounded-full uppercase">Open</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick notes */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Icon name="info" className="text-cyan-400 w-5 h-5" />
            Quick Guidelines
          </h3>
          <div className="text-slate-400 text-xs space-y-4 leading-relaxed">
            <p>✓ <strong>Student Management:</strong> Adding a student generates an credentials user profile. Password matches their Roll Number.</p>
            <p>✓ <strong>Attendance:</strong> Update registers daily. Double logs on same date are blocked by server layers.</p>
            <p>✓ <strong>Support Tickets:</strong> Only verified students raise help queries. Admin replies are visible only to that student.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
