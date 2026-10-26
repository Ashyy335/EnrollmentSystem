import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [view, setView] = useState('landing'); 
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [data, setData] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [myEnrollments, setMyEnrollments] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  const fetchStudentData = async (id) => {
    try {
      const s = await axios.get('http://127.0.0');
      setSchedules(s.data);
      const e = await axios.get(`http://127.0.0{id}`);
      setMyEnrollments(e.data);
    } catch (err) { console.error(err); }
  };

  const handleOldLogin = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.get('http://127.0.0');
      const student = res.data.find(s => s.student_id.trim().toLowerCase() === studentId.trim().toLowerCase());
      if (student) {
        setData(student);
        await fetchStudentData(student.student_id);
        setView('dashboard');
      } else { setMsg('❌ Invalid Credentials.'); }
    } catch { setMsg('❌ Connection to server failed.'); }
  };

  const loadAdminPanel = async () => {
    try {
      const res = await axios.get('http://127.0.0');
      setAllStudents(res.data);
      setView('admin');
    } catch { alert("❌ Failed to fetch student list."); }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await axios.put('http://127.0.0', { student_id: id, status: newStatus });
      alert(res.data.message);
      const refresh = await axios.get('http://127.0.0');
      setAllStudents(refresh.data);
    } catch { alert("❌ Update failed."); }
  };

  const handleConfirmEnrollment = async () => {
    try {
      const res = await axios.post('http://127.0.0', { student_id: data.student_id, schedule_ids: selectedClasses });
      alert(res.data.message);
      setSelectedClasses([]);
      await fetchStudentData(data.student_id);
    } catch { alert("❌ Submission error."); }
  };

  const handleDropCourse = async (id) => {
    if (window.confirm("Drop this subject?")) {
      try {
        const res = await axios.delete(`http://127.0.0{id}`);
        alert(res.data.message);
        await fetchStudentData(data.student_id);
      } catch { alert("❌ Error removing course."); }
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedClasses(prev => prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]);
  };

  const wrapStyle = { fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px', boxSizing: 'border-box' };
  const cardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: (view==='dashboard'||view==='admin') ? '900px' : '360px', transition: 'width 0.2s' };
  const btnStyle = (bg) => ({ padding: '12px', backgroundColor: bg, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', width: '100%', marginBottom: '10px' });
  const inputStyle = { width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '15px' };
  const tblStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '20px' };

  return (
    <div style={wrapStyle}>
      <div style={cardStyle}>
        {view !== 'landing' && view !== 'dashboard' && view !== 'admin' && (
          <button onClick={() => { setView('landing'); setMsg(''); setData(null); }} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' }}>← Back</button>
        )}
        
        {view === 'landing' && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#1a365d' }}>University Portal</h2>
            <button onClick={() => setView('old')} style={btnStyle('#1a73e8')}>🏃‍♂️ Old Student Portal</button>
            <button onClick={() => setView('new')} style={btnStyle('#34a853')}>🌱 New Student Intake</button>
            <button onClick={loadAdminPanel} style={btnStyle('#6c757d')}>⚙️ Registrar Admin Panel (UPDATE)</button>
          </div>
        )}

        {view === 'old' && (
          <form onSubmit={handleOldLogin}>
            <h3>Old Student Login</h3>
            <input type="text" placeholder="Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} required style={inputStyle} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
            <button type="submit" style={btnStyle('#1a73e8')}>Login</button>
            {msg && <p style={{ color: 'red', textAlign: 'center' }}>{msg}</p>}
          </form>
        )}

        {view === 'new' && (
          <form onSubmit={e => { e.preventDefault(); setMsg('✅ Application Initialized!'); }}>
            <h3>New Student Intake</h3>
            <input type="text" placeholder="First Name" required style={inputStyle} />
            <input type="text" placeholder="Last Name" required style={inputStyle} />
            <button type="submit" style={btnStyle('#34a853')}>Submit</button>
            {msg && <p style={{ color: 'green', textAlign: 'center' }}>{msg}</p>}
          </form>
        )}

        {view === 'admin' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #eee', marginBottom: '20px', paddingBottom: '10px' }}>
              <h3>Registrar Admin (UPDATE)</h3>
              <button onClick={() => setView('landing')} style={{ backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px' }}>Exit Admin</button>
            </div>
            <table style={tblStyle}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ccc' }}>
                  <th>ID</th><th>Name</th><th>Track</th><th>Status</th><th>Modify Value</th>
                </tr>
              </thead>
              <tbody>
                {allStudents.map(s => (
                  <tr key={s.student_id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '10px' }}>{s.student_id}</td>
                    <td>{s.first_name} {s.last_name}</td>
                    <td>{s.program_id}</td>
                    <td>{s.status}</td>
                    <td>
                      <select value={s.status} onChange={(e) => handleUpdateStatus(s.student_id, e.target.value)} style={{ padding: '5px' }}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Enrolled">Enrolled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'dashboard' && data && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #eee', marginBottom: '20px', paddingBottom: '10px' }}>
              <div>
                <h3>Student Advising Dashboard</h3>
                <p>{data.first_name} {data.last_name} ({data.student_id}) - <strong>{data.status}</strong></p>
              </div>
              <button onClick={() => setView('landing')} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px' }}>Logout</button>
            </div>

            <h4>Step 1: Select Classes (CREATE)</h4>
            <table style={tblStyle}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th>Select</th><th>Code</th><th>Course Title</th><th>Units</th><th>Schedule</th><th>Room</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map(s => (
                  <tr key={s.schedule_id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td><input type="checkbox" checked={selectedClasses.includes(s.schedule_id)} onChange={() => handleCheckboxChange(s.schedule_id)} /></td>
                    <td>{s.course_code}</td>
                    <td>{s.course_name}</td>
                    <td>{s.units}</td>
                    <td style={{ color: '#007bff' }}>{s.day} {s.time}</td>
                    <td>{s.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleConfirmEnrollment} disabled={selectedClasses.length === 0} style={btnStyle(selectedClasses.length === 0 ? '#94d3a2' : '#2e7d32')}>Confirm Enrollment ({selectedClasses.length})</button>

            <h4 style={{ marginTop: '30px' }}>Step 2: Enrolled Classes (READ / DELETE)</h4>
            {myEnrollments.length === 0 ? (
              <p style={{ fontStyle: 'italic', color: '#777' }}>No classes registered yet.</p>
            ) : (
              <table style={tblStyle}>
                <thead>
                  <tr style={{ backgroundColor: '#e9ecef' }}>
                    <th>Code</th><th>Course Title</th><th>Units</th><th>Schedule</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myEnrollments.map(e => (
                    <tr key={e.enrollment_id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '8px' }}>{e.course_code}</td>
                      <td>{e.course_name}</td>
                      <td>{e.units}</td>
                      <td>{e.day} {e.time}</td>
                      <td>
                        <button onClick={() => handleDropCourse(e.enrollment_id)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}>
                          Drop
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
             </div>
        )}
      </div>
    </div>
  );
}

export default App;