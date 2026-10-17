import React, { useState } from 'react'
import {
  Shield,
  Bell,
  User,
  CheckCircle2
} from 'lucide-react'

export const CandidateSettingsTab: React.FC = () => {
  const [jobSearchStatus, setJobSearchStatus] = useState('ACTIVELY_APPLYING')
  const [hideFromCurrentCompany, setHideFromCurrentCompany] = useState(true)
  const [showVerifiedBadge, setShowVerifiedBadge] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [interviewWhatsappAlerts, setInterviewWhatsappAlerts] = useState(true)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = () => {
    setSavedSuccess(true)
    setTimeout(() => {
      setSavedSuccess(false)
    }, 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
          Account &amp; Privacy Settings
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Manage your job seeking visibility, background verification disclosure, and communication preferences.
        </p>
      </div>

      {/* 1. Job Seeking Visibility */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px 28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <User size={20} color="#2563eb" />
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Job Search Availability
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {[
            { value: 'ACTIVELY_APPLYING', title: 'Actively Looking & Interviewing', desc: 'Recruiters can immediately view profile and schedule interviews' },
            { value: 'OPEN', title: 'Open to Opportunities', desc: 'Only verified recruiters from top matched roles can reach out' },
            { value: 'NOT_LOOKING', title: 'Not Looking Right Now', desc: 'Profile hidden from public search' }
          ].map((item) => (
            <label
              key={item.value}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '14px',
                borderRadius: '12px',
                border: jobSearchStatus === item.value ? '2px solid #0f172a' : '1px solid #e2e8f0',
                backgroundColor: jobSearchStatus === item.value ? '#f8fafc' : '#ffffff',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="job_search_status"
                value={item.value}
                checked={jobSearchStatus === item.value}
                onChange={() => setJobSearchStatus(item.value)}
                style={{ marginTop: '3px' }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{item.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Privacy & Employer Controls */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px 28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Shield size={20} color="#059669" />
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Privacy &amp; Current Employer Protection
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                Hide Profile from Current Employer (ABC Technologies)
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Prevent internal recruiters at your current workplace from viewing your candidate profile.
              </div>
            </div>
            <input
              type="checkbox"
              checked={hideFromCurrentCompany}
              onChange={(e) => setHideFromCurrentCompany(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ height: '1px', backgroundColor: '#f1f5f9' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                Display 100% Background Verification (BGV) Stamp
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Show the green verified shield badge to recruiters for 3x higher response rate.
              </div>
            </div>
            <input
              type="checkbox"
              checked={showVerifiedBadge}
              onChange={(e) => setShowVerifiedBadge(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* 3. Notification Preferences */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px 28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Bell size={20} color="#7e22ce" />
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Notifications &amp; Alerts
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                Instant Email Notifications for Shortlists &amp; Offers
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Sent to sreenandini@example.com
              </div>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ height: '1px', backgroundColor: '#f1f5f9' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                WhatsApp &amp; SMS Reminders for Upcoming Interviews
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Sent to +91 98765 43210 (1 hour before scheduled time)
              </div>
            </div>
            <input
              type="checkbox"
              checked={interviewWhatsappAlerts}
              onChange={(e) => setInterviewWhatsappAlerts(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          type="button"
          onClick={handleSave}
          style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '13px',
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Save Preferences
        </button>

        {savedSuccess && (
          <span style={{ color: '#16a34a', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={16} /> Preferences updated successfully!
          </span>
        )}
      </div>
    </div>
  )
}
