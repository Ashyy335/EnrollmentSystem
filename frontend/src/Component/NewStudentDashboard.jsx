import { useState } from 'react';

export default function NewStudentDashboard({ user, onSignOut }) {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Portal Top Bar Navigation */}
      <header style={{ backgroundColor: '#0f172a', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ backgroundColor: '#10b981', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px' }}>NEW</span>
          <h4 style={{ margin: 0 }}>CIT New Student Portal Desk</h4>
        </div>
        <button onClick={onSignOut} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Sign Out</button>
      </header>

      {/* Main Panel Column */}
      <div style={{ flex: 1, maxWidth: '800px', width: '100%', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
        
        {/* Welcoming Greeting Header Banner */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', marginBottom: '25px', textAlign: 'center' }}>
          <span style={{ fontSize: '40px' }}>👋</span>
          <h2 style={{ margin: '10px 0 5px 0', color: '#0f172a' }}>Welcome to CIT, {user.first_name}!</h2>
          <p style={{ margin: '0 0 15px 0', color: '#64748b', fontSize: '14px' }}>Your institutional registration account has been successfully initialized.</p>
          <div style={{ display: 'inline-block', backgroundColor: '#f1f5f9', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', color: '#334155' }}>
            Official Student ID: <strong style={{ color: '#0f172a' }}>{user.student_id}</strong>
          </div>
        </div>

        {/* Verification Status Account Metrics Banner */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Admission Status</span>
              <h4 style={{ margin: 0, color: '#1e293b' }}>{user.status || 'Pending Review'}</h4>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '20px' }}>🎓</div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Assigned Degree Program</span>
              <h4 style={{ margin: 0, color: '#1e293b' }}>{user.program_id}</h4>
            </div>
          </div>
        </div>

        {/* Dynamic Context Steps List Checklist */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '16px' }}>Onboarding Requirements Checklist</h3>
          <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '13px' }}>Complete these operational administration milestones to open your subject enlistment desk grid row parameters.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px' }}>
              <span style={{ color: '#166534', fontWeight: 'bold' }}>✓</span>
              <div style={{ fontSize: '13.5px' }}>
                <strong style={{ color: '#14532d' }}>Account Initialization:</strong> Complete. Your credentials match values seeded inside the XAMPP database environment.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px' }}>
              <span style={{ color: '#b45309', fontWeight: 'bold' }}>⏳</span>
              <div style={{ fontSize: '13.5px', color: '#78350f' }}>
                <strong>Document Submission Assessment:</strong> Pending. Please submit physical or digital copies of your transcript documents to the registrar department counter.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: '#fafafa', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <span style={{ color: '#94a3b8', fontWeight: 'bold' }}>○</span>
              <div style={{ fontSize: '13.5px', color: '#475569' }}>
                <strong>Enlistment Window Clearance:</strong> Locked. Once your profile state variable shifts from <code>'Pending'</code> to <code>'Enrolled'</code>, a new subject scheduling choice component form layout will populate your panel workspace.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}