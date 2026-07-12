import React from 'react';

export default function StudentProfileView({ profile }) {
  if (!profile) return <div className="text-slate-500 py-10 text-center">No profile details available.</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-2xl font-bold text-white tracking-tight">Academic Profile</h2>
        <p className="text-slate-400 text-sm mt-1">Review registered demographic and university files</p>
      </div>

      <div className="max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-800/60 pb-6">
          <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-sm">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white leading-snug">{profile.name}</h3>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 mt-1.5 inline-block">
              Roll No: {profile.rollNumber}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Course / Program</span>
            <p className="text-white font-semibold text-base">{profile.course}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Branch Stream</span>
            <p className="text-white font-semibold text-base">{profile.branch}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-505 uppercase tracking-widest">Active Semester</span>
            <p className="text-white font-semibold text-base">Semester {profile.semester}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-505 uppercase tracking-widest">University Email</span>
            <p className="text-white font-semibold text-base">{profile.email}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-505 uppercase tracking-widest">Student Contact</span>
            <p className="text-white font-semibold text-base">{profile.phone}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-505 uppercase tracking-widest">Guardian Phone</span>
            <p className="text-white font-semibold text-base">{profile.guardianPhone}</p>
          </div>
          <div className="space-y-1 sm:col-span-2">
            <span className="text-[10px] font-bold text-slate-505 uppercase tracking-widest">Date of Birth</span>
            <p className="text-white font-semibold text-base">{new Date(profile.dob).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
