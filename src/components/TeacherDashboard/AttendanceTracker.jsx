import React, { useState, useEffect } from 'react';
import Icon from '../Icons';

export default function AttendanceTracker({ students, authorizedFetch, showToast }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 10));
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [loadingRecords, setLoadingRecords] = useState(false);

  const loadExistingAttendance = async () => {
    if (!selectedDate) return;
    setLoadingRecords(true);
    try {
      const existing = await authorizedFetch(`/attendance/date/${selectedDate}`);
      const map = {};
      existing.forEach(r => {
        if (r.student) map[r.student._id] = r.status;
      });

      const finalMap = { ...map };
      students.forEach(s => {
        if (!finalMap[s._id]) finalMap[s._id] = 'Present'; // default
      });
      setAttendanceRecords(finalMap);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoadingRecords(false);
    }
  };

  useEffect(() => {
    loadExistingAttendance();
  }, [selectedDate, students]);

  const handleStatusChange = (id, status) => {
    setAttendanceRecords(prev => ({ ...prev, [id]: status }));
  };

  const handleSave = async () => {
    const payload = Object.keys(attendanceRecords).map(id => ({
      studentId: id,
      status: attendanceRecords[id]
    }));

    if (payload.length === 0) {
      showToast('No records to log.', 'error');
      return;
    }

    try {
      await authorizedFetch('/attendance', {
        method: 'POST',
        body: JSON.stringify({ date: selectedDate, records: payload })
      });
      showToast(`Logged registers for ${selectedDate}`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-5 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Attendance Logging</h2>
          <p className="text-slate-400 text-sm mt-1">Configure student register statuses by target date</p>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="date" 
            className="px-3 py-2 bg-gray-200 border border-slate-850 rounded-xl text-white text-sm focus:outline-none w-auto"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
          <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all cursor-pointer">
            Confirm Register
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
        {loadingRecords ? (
          <div className="text-center py-12 text-slate-500 animate-pulse">Syncing logs status...</div>
        ) : students.length === 0 ? (
          <div className="text-center py-16 text-slate-500 space-y-2">
            <Icon name="calendar" className="w-12 h-12 mx-auto text-slate-700" />
            <p>Directory holds no active students.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
            <table className="w-full text-left text-sm text-slate-400 border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-white font-medium">
                  <th className="p-4">Roll Number</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Course Dept.</th>
                  <th className="p-4 text-center" style={{ width: '320px' }}>Mark Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s._id} className="border-b border-slate-800/50 hover:bg-slate-850/10">
                    <td className="p-4 font-semibold text-white">{s.rollNumber}</td>
                    <td className="p-4 text-slate-300">{s.name}</td>
                    <td className="p-4">{s.course} - {s.branch}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {['Present', 'Absent'].map(status => {
                          const isChecked = attendanceRecords[s._id] === status;
                          return (
                            <label key={status} className="flex-1 text-center cursor-pointer select-none">
                              <input 
                                type="radio" 
                                name={`att-${s._id}`}
                                className="hidden"
                                checked={isChecked}
                                onChange={() => handleStatusChange(s._id, status)}
                              />
                              <span className={`block py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                isChecked 
                                  ? (status === 'Present' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : 'border-red-500 text-red-500 bg-red-500/10')
                                  : 'border-slate-800 text-slate-500 hover:bg-slate-800/40 hover:text-slate-300'
                              }`}>
                                {status}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
