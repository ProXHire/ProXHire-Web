import React, { useState } from 'react'
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Briefcase,
  Bookmark,
  TrendingUp,
  FileText,
  UserCheck,
  ChevronRight,
  Award,
  Video
} from 'lucide-react'
import { CompanyLogo } from '../common/CompanyLogo'

interface CandidateOverviewTabProps {
  onNavigateTab: (tab: any) => void
  onSaveJob?: (jobId: string) => void
  savedJobIds?: string[]
}

export const CandidateOverviewTab: React.FC<CandidateOverviewTabProps> = ({
  onNavigateTab,
  onSaveJob,
  savedJobIds = []
}) => {
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])
  const [justAppliedModal, setJustAppliedModal] = useState<string | null>(null)

  const recommendedJobs = [
    {
      id: 'rec-job-1',
      title: 'Senior Frontend Engineer',
      company: 'Swiggy',
      logoName: 'swiggy',
      location: 'Koramangala, Bengaluru',
      type: 'Full-time • Hybrid',
      experience: '2 - 5 Years',
      salary: '₹22,00,000 - ₹28,00,000 / yr',
      matchScore: '98% Match',
      tags: ['React', 'TypeScript', 'Next.js'],
      posted: '2 days ago'
    },
    {
      id: 'rec-job-2',
      title: 'Full Stack Developer (Node & React)',
      company: 'Google',
      logoName: 'google',
      location: 'Manyata Tech Park, Bengaluru',
      type: 'Full-time • In-Office',
      experience: '1 - 4 Years',
      salary: '₹26,00,000 - ₹34,00,000 / yr',
      matchScore: '95% Match',
      tags: ['Node.js', 'React', 'Cloud Services'],
      posted: '3 days ago'
    },
    {
      id: 'rec-job-3',
      title: 'Product Engineer - UI Platforms',
      company: 'Adobe',
      logoName: 'adobe',
      location: 'Whitefield, Bengaluru',
      type: 'Full-time • Hybrid',
      experience: '2 - 6 Years',
      salary: '₹24,00,000 - ₹32,00,000 / yr',
      matchScore: '94% Match',
      tags: ['Design Systems', 'Microfrontends', 'CI/CD'],
      posted: 'Yesterday'
    },
    {
      id: 'rec-job-4',
      title: 'Backend Specialist (Java & Microservices)',
      company: 'Zoho',
      logoName: 'zoho',
      location: 'HSR Layout, Bengaluru',
      type: 'Full-time • In-Office',
      experience: '1 - 3 Years',
      salary: '₹14,00,000 - ₹18,00,000 / yr',
      matchScore: '91% Match',
      tags: ['Java', 'Spring Boot', 'PostgreSQL'],
      posted: '4 days ago'
    }
  ]

  const handleApply = (title: string, id: string) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs(prev => [...prev, id])
    }
    setJustAppliedModal(title)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. Welcome Banner with BGV Verified Status */}
      <div
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #1e293b 100%)',
          borderRadius: '20px',
          padding: '28px 32px',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                color: '#4ade80',
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                border: '1px solid rgba(74, 222, 128, 0.3)'
              }}
            >
              <ShieldCheck size={14} />
              100% BGV Verified Profile
            </span>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#e2e8f0',
                fontSize: '12px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '9999px'
              }}
            >
              Bengaluru Tech Hub
            </span>
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Welcome back, Sree Nandini 👋
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
            Your background verification and verified credentials are active. Recruiters are 3x more likely to shortlist your profile!
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 2 }}>
          <button
            type="button"
            onClick={() => onNavigateTab('jobs')}
            style={{
              backgroundColor: '#ffffff',
              color: '#090d16',
              fontWeight: 700,
              fontSize: '13px',
              padding: '11px 20px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <Briefcase size={15} />
            Search Verified Jobs
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('profile')}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '13px',
              padding: '11px 18px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <UserCheck size={15} />
            View Full Profile
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Stats Cards (Internshala style) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}
      >
        <div
          onClick={() => onNavigateTab('applications')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}
          className="hover-lift"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Total Applications</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>18</div>
          <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} />
            <span>5 active under review</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('applications')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}
          className="hover-lift"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Shortlisted</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>4</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>Google, Flipkart &amp; more</div>
        </div>

        <div
          onClick={() => onNavigateTab('interviews')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}
          className="hover-lift"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Interview Calls</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#faf5ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>3</div>
          <div style={{ fontSize: '12px', color: '#9333ea', fontWeight: 600, marginTop: '8px' }}>Next: Swiggy (12 Oct)</div>
        </div>

        <div
          onClick={() => onNavigateTab('applications')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}
          className="hover-lift"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Job Offers</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#059669', lineHeight: 1 }}>1</div>
          <div style={{ fontSize: '12px', color: '#059669', fontWeight: 700, marginTop: '8px' }}>Zoho Corporation 🎉</div>
        </div>
      </div>

      {/* 3. Two Column Section: Upcoming Interview & Profile Completion */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '24px',
          alignItems: 'start'
        }}
        className="overview-split-grid"
      >
        {/* Left Card: Next Scheduled Interview */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Next Scheduled Interview
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('interviews')}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              View All (3)
              <ChevronRight size={14} />
            </button>
          </div>

          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '14px',
              padding: '18px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start'
            }}
          >
            <CompanyLogo name="swiggy" size={48} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px 0' }}>
                    Frontend Developer
                  </h3>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                    Swiggy • Consumer Experience Team
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
                  Round 2: Technical &amp; Live Coding
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  margin: '14px 0',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '13px',
                  color: '#334155',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="#7e22ce" />
                  <span style={{ fontWeight: 600 }}>12 Oct 2026 (Monday)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="#7e22ce" />
                  <span>10:00 AM - 11:00 AM IST</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Video size={14} color="#059669" />
                  <span>Google Meet</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href="https://meet.google.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '12px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Video size={13} />
                  Join Google Meet
                </a>
                <button
                  type="button"
                  onClick={() => onNavigateTab('interviews')}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    border: '1px solid #cbd5e1',
                    fontWeight: 600,
                    fontSize: '12px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  View Details &amp; Preparation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Profile Strength (Internshala Style) */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Profile Strength
            </h2>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#16a34a' }}>85% Completed</span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ width: '85%', height: '100%', backgroundColor: '#22c55e', borderRadius: '9999px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#16a34a' }}>
              <CheckCircle2 size={16} />
              <span>Identity &amp; Aadhaar Verified</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#16a34a' }}>
              <CheckCircle2 size={16} />
              <span>Resume / CV Uploaded (432 KB)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#16a34a' }}>
              <CheckCircle2 size={16} />
              <span>Education &amp; Experience Verified</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#f59e0b' }}>
              <Sparkles size={16} />
              <span>Add 2 More Skills for 100% Score</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('profile')}
            style={{
              width: '100%',
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              color: '#0f172a',
              fontWeight: 700,
              fontSize: '13px',
              padding: '10px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            Complete Candidate Profile
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 4. Recommended Jobs Section (Bengaluru Verified Recruiters) */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
              Recommended Jobs For You
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Curated for your profile as an Experienced Software Developer in Bengaluru.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('jobs')}
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#0f172a',
              fontSize: '13px',
              fontWeight: 700,
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            View All Jobs
            <ArrowRight size={14} />
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}
        >
          {recommendedJobs.map((job) => {
            const isApplied = appliedJobs.includes(job.id)
            const isSaved = savedJobIds.includes(job.id)

            return (
              <div
                key={job.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                className="hover-card-shadow"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CompanyLogo name={job.logoName} size={42} />
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                          {job.company}
                        </div>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                          {job.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSaveJob && onSaveJob(job.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isSaved ? '#f59e0b' : '#94a3b8',
                        padding: '4px'
                      }}
                      title={isSaved ? 'Job Saved' : 'Save Job'}
                    >
                      <Bookmark size={18} fill={isSaved ? '#f59e0b' : 'none'} />
                    </button>
                  </div>

                  <div style={{ fontSize: '12px', color: '#475569', marginBottom: '6px' }}>
                    📍 {job.location}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                    {job.salary}
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        backgroundColor: '#ecfdf5',
                        color: '#059669',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {job.matchScore}
                    </span>
                    {job.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                          fontSize: '11px',
                          fontWeight: 500,
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{job.posted}</span>
                  <button
                    type="button"
                    onClick={() => handleApply(job.title, job.id)}
                    disabled={isApplied}
                    style={{
                      backgroundColor: isApplied ? '#f1f5f9' : '#0f172a',
                      color: isApplied ? '#64748b' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '7px 14px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: isApplied ? 'default' : 'pointer'
                    }}
                  >
                    {isApplied ? 'Applied ✓' : 'Easy Apply'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Applied Confirmation Modal */}
      {justAppliedModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
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
              padding: '28px',
              maxWidth: '440px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>
              Application Submitted!
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 20px 0' }}>
              Your verified profile and resume have been submitted for <strong>{justAppliedModal}</strong>. Track status in My Applications.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setJustAppliedModal(null)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setJustAppliedModal(null)
                  onNavigateTab('applications')
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Track Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Inline Styles */}
      <style>{`
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -4px rgba(0,0,0,0.08) !important;
        }
        .hover-card-shadow:hover {
          border-color: #cbd5e1 !important;
          box-shadow: 0 6px 16px -2px rgba(0,0,0,0.06);
        }
        @media (max-width: 900px) {
          .overview-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
