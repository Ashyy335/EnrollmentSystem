import { useState } from 'react';
import axios from 'axios';

export default function RegisterForm({ onSwitchToLogin }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', programId: 'PROG-IT-01' });
  const [successId, setSuccessId] = useState('');
  const [err, setErr] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setSuccessId('');

    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      if (res.data?.student_id) setSuccessId(res.data.student_id);
    } catch (error) {
      setErr(error.response?.data?.error || 'Registration service unlinked.');
    }
  };

  if (successId) return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3 style={{ color: '#10b981' }}>🎉 Registration Successful!</h3>
      <p style={{ margin: '10px 0', fontSize: '14px' }}>Your uniquely generated tracking ID credential is:</p>
      <div style={{ backgroundColor: '#f1f5f9', padding: '12px', fontSize: '18px', fontWeight: 'bold', borderRadius: '6px', color: '#0f172a', border: '1px dashed #cbd5e1', letterSpacing: '0.5px', marginBottom: '20px' }}>{successId}</div>
      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '15px' }}>Write down this ID. Use it along with your password to log into the main dashboard portal desk.</p>
      <button onClick={onSwitchToLogin} style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Proceed to Account Login</button>
    </div>
  );

  return (
    <div>
      <h3 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>Create Student Profile</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748b' }}>Provide registration row variables to log your profile.</p>
      
      {err && <div style={{ color: '#b91c1c', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', textAlign: 'center' }}>{err}</div>}

      <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Given First Name</label>
          <input type="text" onChange={e => setForm({...form, firstName: e.target.value})} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', marginTop: '4px' }} required />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Family Last Name</label>
          <input type="text" onChange={e => setForm({...form, lastName: e.target.value})} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', marginTop: '4px' }} required />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Institutional Contact Email</label>
          <input type="email" onChange={e => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', marginTop: '4px' }} required />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Account Security Password</label>
          <input type="password" placeholder="••••••••" onChange={e => setForm({...form, password: e.target.value})} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', marginTop: '4px' }} required />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Select Specialization Path Track</label>
          <select onChange={e => setForm({...form, programId: e.target.value})} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', marginTop: '4px', backgroundColor: 'white' }}>
            <option value="PROG-IT-01">BSIT - Web and Mobile Application</option>
            <option value="PROG-IT-02">BSIT - Network and Security</option>
            <option value="PROG-IT-03">BSIT - Data Analytics</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', marginTop: '5px' }}>Submit Registration Request</button>
      </form>
      <div style={{ marginTop: '15px', fontSize: '13px', color: '#64748b', textAlign: 'center' }}>
        Already registered? <span onClick={onSwitchToLogin} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}>Sign In here</span>
      </div>
    </div>
  );
}