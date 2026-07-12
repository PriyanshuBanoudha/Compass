import React from 'react';
import Icon from './Icons';

export default function Sidebar({ user, currentView, setCurrentView, handleLogout }) {
  return (
    <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col md:h-screen md:sticky md:top-0 z-50">
      <div className="p-5 border-b border-slate-800 flex items-center justify-between md:justify-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
          S
        </div>
        <span className="font-heading font-bold text-lg text-white tracking-wide">Academia Hub</span>
      </div>

      <nav className="flex-1 px-3 py-4 md:py-6 overflow-y-auto">
        <ul className="flex flex-row md:flex-col gap-1.5 md:space-y-1">
          {user.role === 'admin' ? (
            <>
              <li className="flex-1 md:flex-none">
                <button 
                  onClick={() => setCurrentView('dashboard')} 
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider md:normal-case md:text-sm md:font-medium transition-all cursor-pointer ${
                    currentView === 'dashboard' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon name="chart" className="w-4 h-4 shrink-0" /> <span className="hidden md:inline">Dashboard</span>
                </button>
              </li>
              <li className="flex-1 md:flex-none">
                <button 
                  onClick={() => setCurrentView('students')} 
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider md:normal-case md:text-sm md:font-medium transition-all cursor-pointer ${
                    currentView === 'students' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon name="users" className="w-4 h-4 shrink-0" /> <span className="hidden md:inline">Directory</span>
                </button>
              </li>
              <li className="flex-1 md:flex-none">
                <button 
                  onClick={() => setCurrentView('attendance')} 
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider md:normal-case md:text-sm md:font-medium transition-all cursor-pointer ${
                    currentView === 'attendance' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon name="calendar" className="w-4 h-4 shrink-0" /> <span className="hidden md:inline">Attendance</span>
                </button>
              </li>
              <li className="flex-1 md:flex-none">
                <button 
                  onClick={() => setCurrentView('tickets')} 
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider md:normal-case md:text-sm md:font-medium transition-all cursor-pointer ${
                    currentView === 'tickets' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-405 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon name="ticket" className="w-4 h-4 shrink-0" /> <span className="hidden md:inline">Queries</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex-1 md:flex-none">
                <button 
                  onClick={() => setCurrentView('profile')} 
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider md:normal-case md:text-sm md:font-medium transition-all cursor-pointer ${
                    currentView === 'profile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon name="user" className="w-4 h-4 shrink-0" /> <span className="hidden md:inline">Profile</span>
                </button>
              </li>
              <li className="flex-1 md:flex-none">
                <button 
                  onClick={() => setCurrentView('attendance')} 
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider md:normal-case md:text-sm md:font-medium transition-all cursor-pointer ${
                    currentView === 'attendance' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon name="calendar" className="w-4 h-4 shrink-0" /> <span className="hidden md:inline">Attendance</span>
                </button>
              </li>
              <li className="flex-1 md:flex-none">
                <button 
                  onClick={() => setCurrentView('tickets')} 
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider md:normal-case md:text-sm md:font-medium transition-all cursor-pointer ${
                    currentView === 'tickets' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-405 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon name="ticket" className="w-4 h-4 shrink-0" /> <span className="hidden md:inline">Support</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex flex-row md:flex-col items-center md:items-stretch justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-white truncate max-w-[125px]">{user.name}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">{user.role === 'admin' ? 'Teacher' : 'Student'}</div>
          </div>
        </div>
        <button 
          type="button" 
          onClick={handleLogout}
          className="px-3.5 py-1.5 md:w-full rounded-xl bg-slate-900 hover:bg-slate-805 text-slate-405 hover:text-white text-xs font-semibold border border-slate-800 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Icon name="exit" className="w-3.5 h-3.5" /> <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </aside>
  );
}
