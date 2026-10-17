import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  ShieldCheck,
  User,
  BookOpen,
  X
} from 'lucide-react'
import { CompanyLogo } from '../common/CompanyLogo'

interface CandidateInterviewsTabProps {
  onNavigateTab: (tab: any) => void
  onOpenOfferModal?: (app: any) => void
  onOpenFeedbackModal?: (app: any) => void
}

export const CandidateInterviewsTab: React.FC<CandidateInterviewsTabProps> = ({
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PAST'>('UPCOMING')
  const [rescheduleModalItem, setRescheduleModalItem] = useState<any | null>(null)
  const [systemCheckOpen, setSystemCheckOpen] = useState(false)
  const [cameraMicTesting, setCameraMicTesting] = useState(false)

  const upcomingInterviews = [
    {
      id: 'int-swiggy',
      company: 'Swiggy',
      logoName: 'swiggy',
      role: 'Frontend Developer',
      round: 'Round 2: Technical Live Coding & React Performance',
      date: '12 Oct 2026 (Monday)',
      time: '10:00 AM - 11:00 AM IST',
      platform: 'Google Meet',
      meetUrl: 'https://meet.google.com/abc-defg-hij',
      interviewer: 'Priya Raman',
      interviewerRole: 'Staff Software Engineer • Consumer Tech',
      status: 'Confirmed',
      instructions: 'Please be ready in a quiet room with your IDE and GitHub account open. The interviewer will share a CodeSandbox environment for the live component test.',
      topics: ['React 19 Hooks', 'State Management (Zustand/Redux)', 'Web Vitals & Performance', 'CSS Layouts']
    },
    {
      id: 'int-google',
      company: 'Google',
      logoName: 'google',
      role: 'Software Engineer',
      round: 'Round 1: Data Structures & Problem Solving',
      date: '15 Oct 2026 (Thursday)',
      time: '02:30 PM - 03:30 PM IST',
      platform: 'Google Meet',
      meetUrl: 'https://meet.google.com/xyz-uvwx-rst',
      interviewer: 'Rajesh Kulkarni',
      interviewerRole: 'Senior Tech Lead • Search Engineering',
      status: 'Confirmed',
      instructions: 'The interview will be conducted via Google Meet with a shared Google Docs coding workspace. Focus will be on algorithmic approach and optimal time/space complexity.',
      topics: ['Binary Trees / Graphs', 'Dynamic Programming', 'Clean Code Principles', 'Complexity Analysis']
    },
    {
      id: 'int-adobe',
      company: 'Adobe',
      logoName: 'adobe',
      role: 'Product Engineer',
      round: 'Round 3: System Architecture & Web Canvas Discussion',
      date: '18 Oct 2026 (Sunday)',
      time: '11:00 AM - 12:00 PM IST',
      platform: 'Microsoft Teams',
      meetUrl: 'https://teams.microsoft.com/l/meetup-join',
      interviewer: 'David Miller',
      interviewerRole: 'Engineering Director • Creative Cloud',
      status: 'Scheduled',
      instructions: 'Prepare to discuss past web application architecture, state sync across distributed frontends, and browser memory leak profiling.',
      topics: ['Microfrontend Architecture', 'Browser Memory Profiling', 'WebGL Canvas', 'Design Systems']
    }
  ]

  const pastInterviews = [
    {
      id: 'int-zoho',
      company: 'Zoho',
      logoName: 'zoho',
      role: 'Backend Developer',
      round: 'Final Management & Technical Round',
      date: '18 Sep 2026',
      outcome: 'SELECTED_OFFER',
      outcomeLabel: 'Offer Released 🎉',
      outcomeBg: '#d1fae5',
      outcomeColor: '#059669',
      notes: 'Outstanding technical score in REST API design and SQL query performance. Formal offer letter generated.'
    },
    {
      id: 'int-microsoft',
      company: 'Microsoft',
      logoName: 'microsoft',
      role: 'Product Designer',
      round: 'Round 2: Portfolio Presentation & Design Systems',
      date: '24 Sep 2026',
      outcome: 'REJECTED',
      outcomeLabel: 'Completed • Feedback Available',
      outcomeBg: '#fee2e2',
      outcomeColor: '#dc2626',
      notes: 'Strong presentation and visual design skills. Role filled with a senior specialist experienced with Fluent 2 multi-platform components.'
    }
  ]

  const handleRunSystemCheck = () => {
    setSystemCheckOpen(true)
    setCameraMicTesting(true)
    setTimeout(() => {
      setCameraMicTesting(false)
    }, 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header with Stats */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                Interview Calls &amp; Schedules
              </h1>
              <span
                style={{
                  backgroundColor: '#f3e8ff',
                  color: '#7e22ce',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '9999px'
                }}
              >
                3 Upcoming
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Attend verified interview rounds, join video calls directly, and track interview progress.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={handleRunSystemCheck}
              style={{
                backgroundColor: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 600,
                padding: '9px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Video size={15} color="#2563eb" />
              Camera &amp; Mic Test
            </button>
          </div>
        </div>

        {/* Tab Switcher: Upcoming vs Past */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('UPCOMING')}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: activeTab === 'UPCOMING' ? 700 : 500,
              backgroundColor: activeTab === 'UPCOMING' ? '#0f172a' : '#f8fafc',
              color: activeTab === 'UPCOMING' ? '#ffffff' : '#64748b',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Upcoming Rounds</span>
            <span style={{ backgroundColor: activeTab === 'UPCOMING' ? 'rgba(255,255,255,0.2)' : '#e2e8f0', padding: '1px 7px', borderRadius: '9999px', fontSize: '11px' }}>
              3
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('PAST')}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: activeTab === 'PAST' ? 700 : 500,
              backgroundColor: activeTab === 'PAST' ? '#0f172a' : '#f8fafc',
              color: activeTab === 'PAST' ? '#ffffff' : '#64748b',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Past &amp; Outcomes</span>
            <span style={{ backgroundColor: activeTab === 'PAST' ? 'rgba(255,255,255,0.2)' : '#e2e8f0', padding: '1px 7px', borderRadius: '9999px', fontSize: '11px' }}>
              2
            </span>
          </button>
        </div>
      </div>

      {/* 2. Main Content Split Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.45fr 1fr',
          gap: '24px',
          alignItems: 'start'
        }}
        className="interviews-split-grid"
      >
        {/* Left: Interview Cards */}
        <div>
          {activeTab === 'UPCOMING' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {upcomingInterviews.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <CompanyLogo name={item.logoName} size={48} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{item.company}</span>
                          <span style={{ fontSize: '10px', backgroundColor: '#ecfdf5', color: '#059669', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <ShieldCheck size={11} /> Verified Recruiter
                          </span>
                        </div>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                          {item.role}
                        </h3>
                      </div>
                    </div>

                    <span
                      style={{
                        backgroundColor: '#f3e8ff',
                        color: '#7e22ce',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '9999px'
                      }}
                    >
                      {item.round.split(':')[0]}
                    </span>
                  </div>

                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                    {item.round}
                  </div>

                  {/* Date, Time & Platform Badge */}
                  <div
                    style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      padding: '14px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '16px',
                      fontSize: '13px',
                      color: '#334155'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={15} color="#7e22ce" />
                      <span style={{ fontWeight: 700 }}>{item.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={15} color="#7e22ce" />
                      <span>{item.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Video size={15} color="#059669" />
                      <span>{item.platform}</span>
                    </div>
                  </div>

                  {/* Interviewer details */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                      <User size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{item.interviewer}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{item.interviewerRole}</div>
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                    {item.instructions}
                  </p>

                  {/* Topics Covered */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Core Assessment Topics:
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {item.topics.map((t, idx) => (
                        <span key={idx} style={{ backgroundColor: '#eff6ff', color: '#2563eb', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                    <a
                      href={item.meetUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '13px',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Video size={14} />
                      Join Meeting Room
                    </a>

                    <button
                      type="button"
                      onClick={() => alert(`Added ${item.company} interview to Google Calendar for ${item.date}`)}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        color: '#475569',
                        fontWeight: 600,
                        fontSize: '13px',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      Add to Calendar
                    </button>

                    <button
                      type="button"
                      onClick={() => setRescheduleModalItem(item)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#64748b',
                        fontWeight: 600,
                        fontSize: '12px',
                        padding: '10px 8px',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Request Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Past Interviews */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {pastInterviews.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <CompanyLogo name={item.logoName} size={46} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{item.company}</div>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                          {item.role}
                        </h3>
                      </div>
                    </div>

                    <span
                      style={{
                        backgroundColor: item.outcomeBg,
                        color: item.outcomeColor,
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '9999px'
                      }}
                    >
                      {item.outcomeLabel}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    Interview completed on <strong>{item.date}</strong> • {item.round}
                  </div>

                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    {item.notes}
                  </p>

                  <div style={{ display: 'flex', gap: '10px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                    {item.outcome === 'SELECTED_OFFER' ? (
                      <button
                        type="button"
                        onClick={() => onNavigateTab('applications')}
                        style={{
                          backgroundColor: '#16a34a',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '13px',
                          padding: '9px 18px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        View Official Offer Letter
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onNavigateTab('applications')}
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #cbd5e1',
                          color: '#475569',
                          fontWeight: 600,
                          fontSize: '13px',
                          padding: '9px 18px',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Read Interview Feedback
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar: Guidelines & Prep Kit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Prep Kit Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <BookOpen size={20} color="#2563eb" />
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Interview Readiness Guide
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              Follow these Bengaluru tech company hiring best practices for maximum selection rate.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '13px', color: '#334155' }}>
                  <strong>Verify Camera &amp; Mic:</strong> Check browser permissions on Google Meet 15 minutes before slot.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '13px', color: '#334155' }}>
                  <strong>Keep BGV Certificate Handy:</strong> Employers may request your Proxy verification ID (BGV-PRX-2026-88194).
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '13px', color: '#334155' }}>
                  <strong>Prepare Real Project Examples:</strong> Highlight code architecture, performance optimization, and problem resolution.
                </div>
              </div>
            </div>
          </div>

          {/* Proxy Verified Candidate Advantage */}
          <div
            style={{
              background: 'linear-gradient(135deg, #090d16 0%, #1e293b 100%)',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ color: '#4ade80', marginBottom: '8px' }}>
              <ShieldCheck size={28} />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 6px 0' }}>
              Verified Candidate Priority
            </h4>
            <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              Your BGV verified badge has been forwarded directly to the hiring managers at Swiggy, Google, and Adobe.
            </p>
            <button
              type="button"
              onClick={() => onNavigateTab('profile')}
              style={{
                backgroundColor: '#ffffff',
                color: '#090d16',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              View Verification Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModalItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '480px',
              width: '100%',
              padding: '28px',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}
          >
            <button
              type="button"
              onClick={() => setRescheduleModalItem(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Request Slot Reschedule
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>
              For {rescheduleModalItem.role} at {rescheduleModalItem.company}
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Preferred Alternative Date &amp; Time
              </label>
              <input
                type="text"
                defaultValue="Next available slot on 14 Oct 2026, afternoon"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '13px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Reason for Rescheduling
              </label>
              <textarea
                rows={3}
                defaultValue="Prior technical commitment at current organization."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '13px',
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setRescheduleModalItem(null)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Reschedule request sent to ${rescheduleModalItem.company} talent team! They will confirm via email.`)
                  setRescheduleModalItem(null)
                }}
                style={{ flex: 2, padding: '10px', borderRadius: '8px', border: 'none', background: '#0f172a', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Send Request to Recruiter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera & Mic Test Modal */}
      {systemCheckOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '460px',
              width: '100%',
              padding: '28px',
              textAlign: 'center',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => setSystemCheckOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Video size={28} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Camera &amp; Audio Readiness Test
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
              Checking audio drivers, webcam connectivity, and network bandwidth.
            </p>

            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span style={{ color: '#475569' }}>High-Definition Webcam:</span>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>
                  {cameraMicTesting ? 'Testing...' : 'Ready (1080p) ✓'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span style={{ color: '#475569' }}>Microphone &amp; Audio Input:</span>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>
                  {cameraMicTesting ? 'Testing...' : 'Clear Input (48kHz) ✓'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span style={{ color: '#475569' }}>Internet Speed (Latency):</span>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>
                  {cameraMicTesting ? 'Pinging...' : '18ms (Optimal for Video) ✓'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSystemCheckOpen(false)}
              style={{
                width: '100%',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              All Systems Ready! Close Test
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .interviews-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
