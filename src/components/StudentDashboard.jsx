import React, { useState, useEffect } from 'react';
import StudentProfileView from './StudentDashboard/StudentProfileView';
import StudentAttendanceView from './StudentDashboard/StudentAttendanceView';
import StudentTicketView from './StudentDashboard/StudentTicketView';

export default function StudentDashboard({ currentView, studentData, authorizedFetch, showToast }) {
  const [profile, setProfile] = useState(studentData || null);
  const [attendance, setAttendance] = useState({
    summary: { total: 0, present: 0, absent: 0, attendanceRate: 100 },
    records: []
  });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentData = async () => {
    if (!profile) return;
    try {
      setLoading(true);
      const prof = await authorizedFetch(`/students/${profile._id}`);
      setProfile(prof);
      const att = await authorizedFetch(`/attendance/student/${profile._id}`);
      setAttendance(att);
      const tick = await authorizedFetch('/tickets');
      setTickets(tick);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [currentView]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-slate-400">
        <div className="animate-pulse">Loading academic registers...</div>
      </div>
    );
  }

  switch (currentView) {
    case 'profile':
      return <StudentProfileView profile={profile} />;
    case 'attendance':
      return <StudentAttendanceView attendance={attendance} />;
    case 'tickets':
      return <StudentTicketView tickets={tickets} onUpdate={fetchStudentData} authorizedFetch={authorizedFetch} showToast={showToast} />;
    default:
      return <div className="text-red-500 font-medium">Invalid view routing path</div>;
  }
}
