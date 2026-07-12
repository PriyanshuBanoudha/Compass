import React, { useState } from 'react';
import Icon from '../Icons';
import StudentModal from '../modals/StudentModal';
import TeacherModal from '../modals/TeacherModal';

export default function StudentDirectory({ students, onUpdate, authorizedFetch, showToast }) {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Teacher registration states
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  // Form hooks
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [dob, setDob] = useState('');

  const loadEditPayload = (student) => {
    setSelectedStudent(student);
    setName(student.name);
    setRollNumber(student.rollNumber);
    setCourse(student.course);
    setBranch(student.branch);
    setSemester(student.semester);
    setEmail(student.email);
    setPhone(student.phone);
    setGuardianPhone(student.guardianPhone);
    setDob(student.dob ? student.dob.substring(0, 10) : '');
    setIsEditing(true);
    setShowAddModal(true);
  };

  const clearForm = () => {
    setSelectedStudent(null);
    setName('');
    setRollNumber('');
    setCourse('');
    setBranch('');
    setSemester('');
    setEmail('');
    setPhone('');
    setGuardianPhone('');
    setDob('');
    setIsEditing(false);
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    try {
      await authorizedFetch('/auth/register-admin', {
        method: 'POST',
        body: JSON.stringify({ name: adminName, email: adminEmail, password: adminPassword })
      });
      showToast('Successfully registered new Teacher account.');
      setShowAddAdminModal(false);
      setAdminName('');
      setAdminEmail('');
      setAdminPassword('');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setAdminLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, rollNumber, course, branch, semester, email, phone, guardianPhone, dob };

    try {
      if (isEditing && selectedStudent) {
        await authorizedFetch(`/students/${selectedStudent._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        showToast('Successfully updated student record.');
      } else {
        await authorizedFetch('/students', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        showToast('Successfully enrolled student.');
      }
      setShowAddModal(false);
      clearForm();
      onUpdate();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete student and associated login, attendance records, and tickets?')) {
      try {
        await authorizedFetch(`/students/${id}`, { method: 'DELETE' });
        showToast('Deleted student registers.');
        onUpdate();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
  };

  const courses = Array.from(new Set(students.map(s => s.course)));
  const filteredStudents = students.filter(s => {
    const q = search.toLowerCase();
    const matchesSearch = s.name.toLowerCase().includes(q) || s.rollNumber.toLowerCase().includes(q);
    const matchesCourse = courseFilter === '' || s.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-5 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Students Directory</h2>
          <p className="text-slate-400 text-sm mt-1 font-normal">Add, update, search, or delete enrolled candidates</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { clearForm(); setShowAddModal(true); }}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/10 cursor-pointer flex items-center gap-2 self-start md:self-auto"
          >
            <Icon name="plus" className="w-4 h-4" /> Add Student
          </button>
          <button 
            onClick={() => { setShowAddAdminModal(true); }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-205 border border-slate-700 font-semibold text-sm transition-all shadow-md cursor-pointer flex items-center gap-2 self-start md:self-auto"
          >
            <Icon name="plus" className="w-4 h-4" /> Add Teacher
          </button>
        </div>
      </div>

      {/* Inputs filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-500" 
            placeholder="Search by name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer font-medium"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="">All Courses</option>
          {courses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-16 text-slate-500 space-y-2">
            <Icon name="users" className="w-12 h-12 mx-auto text-slate-700" />
            <p>No student results matched search queries.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
            <table className="w-full text-left text-sm text-slate-400 border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-white font-medium">
                  <th className="p-4">Roll Number</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Course Dept.</th>
                  <th className="p-4">Branch Detail</th>
                  <th className="p-4">Semester</th>
                  <th className="p-4">Contacts</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(s => (
                  <tr key={s._id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                    <td className="p-4 font-semibold text-white">{s.rollNumber}</td>
                    <td className="p-4 text-slate-205">{s.name}</td>
                    <td className="p-4">{s.course}</td>
                    <td className="p-4">{s.branch}</td>
                    <td className="p-4">Sem {s.semester}</td>
                    <td className="p-4 text-xs font-normal">
                      <div className="text-slate-300">{s.email}</div>
                      <div className="text-slate-500">Tel: {s.phone}</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex gap-1">
                        <button onClick={() => loadEditPayload(s)} className="p-2 hover:bg-slate-850 hover:text-indigo-400 rounded-lg text-slate-400 transition-all cursor-pointer">
                          <Icon name="edit" className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(s._id)} className="p-2 hover:bg-slate-850 hover:text-red-400 rounded-lg text-slate-400 transition-all cursor-pointer">
                          <Icon name="delete" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <StudentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        name={name} setName={setName}
        rollNumber={rollNumber} setRollNumber={setRollNumber}
        course={course} setCourse={setCourse}
        branch={branch} setBranch={setBranch}
        semester={semester} setSemester={setSemester}
        email={email} setEmail={setEmail}
        phone={phone} setPhone={setPhone}
        guardianPhone={guardianPhone} setGuardianPhone={setGuardianPhone}
        dob={dob} setDob={setDob}
      />

      <TeacherModal
        isOpen={showAddAdminModal}
        onClose={() => setShowAddAdminModal(false)}
        onSubmit={handleAdminSubmit}
        adminName={adminName} setAdminName={setAdminName}
        adminEmail={adminEmail} setAdminEmail={setAdminEmail}
        adminPassword={adminPassword} setAdminPassword={setAdminPassword}
        adminLoading={adminLoading}
      />
    </div>
  );
}
