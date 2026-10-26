import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard({ user, onSignOut }) {
  const [students, setStudents] = useState([]);

  const loadStudentRecords = () => {
    axios.get('http://localhost:5000/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { loadStudentRecords(); }, []);

  const handleApproveStatus = async (id) => {
    try {
      // Execute a dynamic UPDATE backend command query assignment
      alert(`Approving student record ID: ${id}`);
      // In the future, this will link straight to an app.put router handler row script
    } catch {
      alert('Failed to modify account parameter tier properties.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fdfbf7', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#1e293b', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ backgroundColor: '#dc2626', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', color: 'white' }}>ADMIN SECURE</span>
          <h4 style={{ margin: 0 }}>CIT Registrar Back-Office System</h4>
        </div>
        <button onClick={onSignOut} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Terminate Session</button>
      </header>

      <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h3>Master Enrollment Records Review Panel</h3>
        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>Review incoming applications and approve admission queues into the XAMPP schema logs system.</p>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
            <tr>
              <th style={{ padding: '12px' }}>Student ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Classification Tier</th>
              <th>Program</th>
              <th>System Status</th>
              <th>Action Handler</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.student_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px' }}><strong>{s.student_id}</strong></td>
                <td>{s.first_name} {s.last_name}</td>
                <td>{s.email}</td>
                <td>{s.student_type}</td>
                <td>{s.program_id || 'N/A'}</td>
                <td>
                  <span style={{ backgroundColor: s.status === 'Pending' ? '#fef3c7' : '#d1fae5', color: s.status === 'Pending' ? '#92400e' : '#065f46', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                    {s.status}
                  </span>
                </td>
                <td>
                  {s.status === 'Pending' && (
                    <button onClick={() => handleApproveStatus(s.student_id)} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
                      Approve Admission
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}