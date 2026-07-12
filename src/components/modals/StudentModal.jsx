import React from 'react';
import Icon from '../Icons';

export default function StudentModal({
  isOpen,
  onClose,
  isEditing,
  onSubmit,
  name, setName,
  rollNumber, setRollNumber,
  course, setCourse,
  branch, setBranch,
  semester, setSemester,
  email, setEmail,
  phone, setPhone,
  guardianPhone, setGuardianPhone,
  dob, setDob
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">{isEditing ? 'Modify Student Details' : 'Enroll Student'}</h3>
          <button onClick={onClose} className="text-slate-505 hover:text-white cursor-pointer">
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Full Name</label>
            <input type="text" className="w-full px-3 py-2 bg-slate-955 border border-slate-805 rounded-xl text-white text-sm focus:border-indigo-505 focus:outline-none" required value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-404 mb-1.5 uppercase">Roll Number</label>
              <input type="text" className="w-full px-3 py-2 bg-slate-955 border border-slate-805 rounded-xl text-white text-sm focus:border-indigo-505 focus:outline-none disabled:opacity-50" required value={rollNumber} onChange={e => setRollNumber(e.target.value)} disabled={isEditing} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-404 mb-1.5 uppercase">Course Program</label>
              <input type="text" className="w-full px-3 py-2 bg-slate-955 border border-slate-805 rounded-xl text-white text-sm focus:border-indigo-505 focus:outline-none placeholder-slate-700" placeholder="e.g. B.Tech" required value={course} onChange={e => setCourse(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-404 mb-1.5 uppercase">Branch / Major</label>
              <input type="text" className="w-full px-3 py-2 bg-slate-955 border border-slate-805 rounded-xl text-white text-sm focus:border-indigo-505 focus:outline-none placeholder-slate-755" placeholder="e.g. EC" required value={branch} onChange={e => setBranch(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-404 mb-1.5 uppercase">Semester</label>
              <input type="text" className="w-full px-3 py-2 bg-slate-955 border border-slate-850 rounded-xl text-white text-sm focus:border-indigo-505 focus:outline-none" placeholder="e.g. 1" required value={semester} onChange={e => setSemester(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-404 mb-1.5 uppercase">Email Address</label>
            <input type="email" className="w-full px-3 py-2 bg-slate-955 border border-slate-805 rounded-xl text-white text-sm focus:border-indigo-505 focus:outline-none" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-404 mb-1.5 uppercase">Student Phone</label>
              <input type="tel" className="w-full px-3 py-2 bg-slate-955 border border-slate-805 rounded-xl text-white text-sm focus:border-indigo-505 focus:outline-none" required value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-404 mb-1.5 uppercase">Guardian Phone</label>
              <input type="tel" className="w-full px-3 py-2 bg-slate-955 border border-slate-805 rounded-xl text-white text-sm focus:border-indigo-505 focus:outline-none" required value={guardianPhone} onChange={e => setGuardianPhone(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-404 mb-1.5 uppercase">Date of Birth</label>
            <input type="date" className="w-full px-3 py-2 bg-slate-955 border border-slate-805 rounded-xl text-white text-sm focus:border-indigo-505 focus:outline-none" required value={dob} onChange={e => setDob(e.target.value)} />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 text-sm">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-705 text-white font-semibold rounded-xl transition-all cursor-pointer">
              {isEditing ? 'Update Profile' : 'Register Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
