import React from 'react';
import Icon from '../Icons';

export default function StudentAttendanceView({ attendance }) {
  const { summary, records } = attendance;

  // Percentage color thresholds
  let barColor = 'stroke-emerald-500';
  let textColor = 'text-emerald-500';
  if (summary.attendanceRate < 75) {
    barColor = 'stroke-red-500';
    textColor = 'text-red-500';
  } else if (summary.attendanceRate < 85) {
    barColor = 'stroke-amber-500';
    textColor = 'text-amber-500';
  }

  const dashArray = `${summary.attendanceRate}, 100`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-2xl font-bold text-white tracking-tight">Attendance Report</h2>
        <p className="text-slate-400 text-sm mt-1">Review session records and average thresholds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance listings logs */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Icon name="calendar" className="text-indigo-400 w-5 h-5" />
            Attendance History Log
          </h3>
          
          {records.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No registers marked by the teacher.</div>
          ) : (
            <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
              <table className="w-full text-left text-sm text-slate-400 border-collapse">
                <thead>
                  <tr className="bg-slate-800/60 text-white font-medium">
                    <th className="p-4">Session Date</th>
                    <th className="p-4">Register Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(r => (
                    <tr key={r._id} className="border-b border-slate-800/50 hover:bg-slate-800/10">
                      <td className="p-4 text-slate-200 font-medium">
                        {new Date(r.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-0.5 border text-[10px] font-semibold rounded-full uppercase ${
                          r.status === 'Present' 
                            ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/25' 
                            : 'bg-red-500/15 text-red-500 border-red-500/25'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Circular Percentage widget */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-3 w-full self-start">Cumulative Rate</h3>
          
          <div className="relative w-36 h-36 flex items-center justify-center my-4">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path className="stroke-slate-800 fill-none" strokeWidth="2.8" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className={`fill-none stroke-linecap-round transition-all ${barColor}`} strokeWidth="2.8" strokeDasharray={dashArray} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className={`absolute text-2xl font-bold font-heading ${textColor}`}>
              {summary.attendanceRate}%
            </div>
          </div>

          <div className="w-full text-slate-400 text-[11px] uppercase tracking-wider font-semibold space-y-3.5 mt-6 border-t border-slate-800/80 pt-5">
            <div className="flex justify-between">
              <span>Total Session Days:</span>
              <span className="text-white text-xs">{summary.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Present Days:</span>
              <span className="text-emerald-500 text-xs">{summary.present}</span>
            </div>
            <div className="flex justify-between">
              <span>Absent Days:</span>
              <span className="text-red-500 text-xs">{summary.absent}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
