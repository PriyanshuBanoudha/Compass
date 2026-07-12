import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import Login from './pages/Login';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

// const API_BASE = 'http://localhost:5000/api';
const API_BASE = 'https://backend-management-81xn.onrender.com/api';


export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const authorizedFetch = async (endpoint, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers
    };
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Server request error');
    }
    return data;
  };

  useEffect(() => {
    if (token) {
      authorizedFetch('/auth/me')
        .then(userData => {
          setUser(userData);
          setCurrentView(userData.role === 'admin' ? 'dashboard' : 'profile');
        })
        .catch(err => {
          showToast(err.message, 'error');
          handleLogout();
        });
    }
  }, [token]);

  const handleLogin = (jwtToken, userData) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
    setUser(userData);
    showToast(`Session authenticated: welcome ${userData.name}`);
    setCurrentView(userData.role === 'admin' ? 'dashboard' : 'profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    showToast('Logged out successfully');
  };

  if (!token || !user) {
    return (
      <Login 
        onLogin={handleLogin} 
        showToast={showToast}
        apiBase={API_BASE}
      />
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar 
        user={user} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        handleLogout={handleLogout} 
      />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-hidden">
        {user.role === 'admin' ? (
          <TeacherDashboard 
            currentView={currentView} 
            authorizedFetch={authorizedFetch} 
            showToast={showToast} 
          />
        ) : (
          <StudentDashboard 
            currentView={currentView} 
            studentData={user.studentId} 
            authorizedFetch={authorizedFetch} 
            showToast={showToast} 
          />
        )}
      </main>

      <Toast toast={toast} />
    </div>
  );
}
