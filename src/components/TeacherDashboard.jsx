import React, { useState, useEffect } from 'react';
import TeacherOverview from './TeacherDashboard/TeacherOverview';
import StudentDirectory from './TeacherDashboard/StudentDirectory';
import AttendanceTracker from './TeacherDashboard/AttendanceTracker';
import AdminTickets from './TeacherDashboard/AdminTickets';

export default function TeacherDashboard({ currentView, authorizedFetch, showToast }) {
  const [students, setStudents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const studentList = await authorizedFetch('/students');
      setStudents(studentList);
      const ticketList = await authorizedFetch('/tickets');
      setTickets(ticketList);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentView]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-slate-400">
        <div className="animate-pulse">Loading dashboard database files...</div>
      </div>
    );
  }

  switch (currentView) {
    case 'dashboard':
      return <TeacherOverview students={students} tickets={tickets} />;
    case 'students':
      return <StudentDirectory students={students} onUpdate={fetchData} authorizedFetch={authorizedFetch} showToast={showToast} />;
    case 'attendance':
      return <AttendanceTracker students={students} authorizedFetch={authorizedFetch} showToast={showToast} />;
    case 'tickets':
      return <AdminTickets tickets={tickets} onUpdate={fetchData} authorizedFetch={authorizedFetch} showToast={showToast} />;
    default:
      return <div className="text-red-500 font-medium">Invalid view routing path</div>;
  }
}
