import React, { useState } from 'react';
import Icon from '../components/Icons';

export default function Login({ onLogin, showToast, apiBase }) {
  const [isRegisteringStudent, setIsRegisteringStudent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Student registration state variables
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [phone, setPhone] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegisteringStudent) {
        const res = await fetch(`${apiBase}/auth/register-student`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name, rollNumber, course, branch, semester, email, phone, guardianPhone, dob, password
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');
        onLogin(data.token, data);
      } else {
        const res = await fetch(`${apiBase}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        onLogin(data.token, data);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
      <div className={`w-full ${isRegisteringStudent ? 'max-w-2xl' : 'max-w-md'} bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl transition-all duration-350 ease-in-out`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-extrabold text-xl shadow-sm mb-4">
            A
          </div>
          <h1 className="text-2xl font-bold text-white">
            Academia Hub
          </h1>
          <p className="text-slate-405 text-sm mt-2">
            {isRegisteringStudent 
              ? 'Enter student details to self-register an account' 
              : 'Sign in to access your dashboard'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegisteringStudent ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-600" 
                  placeholder="e.g. John Doe"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Roll Number (Unique ID)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-605" 
                    placeholder="e.g. CSE-2026-001"
                    value={rollNumber} 
                    onChange={(e) => setRollNumber(e.target.value)} 
                    required 
                />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-405 uppercase tracking-wider mb-2">Course Program (Dept)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-605" 
                    placeholder="e.g. B.Tech"
                    value={course} 
                    onChange={(e) => setCourse(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-405 uppercase tracking-wider mb-2">Branch / Major</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-605" 
                    placeholder="e.g. Computer Science"
                    value={branch} 
                    onChange={(e) => setBranch(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-405 uppercase tracking-wider mb-2">Current Semester</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2.5 bg-slate-955 border border-slate-800 focus:border-indigo-505 focus:ring-1 focus:ring-indigo-550 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-605" 
                    placeholder="1"
                    value={semester} 
                    onChange={(e) => setSemester(e.target.value)} 
                    min="1"
                    max="10"
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-405 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2.5 bg-slate-955 border border-slate-800 focus:border-indigo-550 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-605" 
                    placeholder="e.g. john@university.edu"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Login Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-2.5 bg-slate-955 border border-slate-800 focus:border-indigo-550 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-605" 
                    placeholder="••••••••"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Student Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2.5 bg-slate-955 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-605" 
                    placeholder="e.g. 9876543210"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Guardian Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2.5 bg-slate-955 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-605" 
                    placeholder="e.g. 9876543211"
                    value={guardianPhone} 
                    onChange={(e) => setGuardianPhone(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Date of Birth</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-2.5 bg-slate-955 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-605" 
                  value={dob} 
                  onChange={(e) => setDob(e.target.value)} 
                  required 
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2.5 bg-slate-955 border border-slate-800 focus:border-indigo-505 focus:ring-1 focus:ring-indigo-505 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-505" 
                  placeholder="e.g. john@university.edu"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2.5 bg-slate-955 border border-slate-800 focus:border-indigo-505 focus:ring-1 focus:ring-indigo-505 rounded-xl text-white text-sm transition-all outline-none placeholder-slate-505" 
                  placeholder="••••••••"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <p className="text-[11px] text-slate-505 mt-2 leading-relaxed">
                  For students, sign in using your registered email and your password (or roll number if registered by teacher).
                </p>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-705 active:scale-[0.98] text-white font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Processing...' : (isRegisteringStudent ? 'Validate and Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-400 border-t border-slate-800/60 pt-5">
          {isRegisteringStudent ? (
            <p>
              Already registered?{' '}
              <button 
                type="button" 
                className="text-indigo-400 font-medium hover:underline cursor-pointer" 
                onClick={() => setIsRegisteringStudent(false)}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Student without an account?{' '}
              <button 
                type="button" 
                className="text-indigo-400 font-medium hover:underline cursor-pointer" 
                onClick={() => setIsRegisteringStudent(true)}
              >
                Student Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
