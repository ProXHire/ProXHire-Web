import React, { useState } from 'react'
import {
  Bookmark,
  MapPin,
  Clock,
  CheckCircle2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react'
import { CompanyLogo } from '../common/CompanyLogo'

interface CandidateSavedJobsTabProps {
  onNavigateTab: (tab: any) => void
  savedJobIds?: string[]
  onRemoveSavedJob: (jobId: string) => void
}

export const CandidateSavedJobsTab: React.FC<CandidateSavedJobsTabProps> = ({
  onNavigateTab,
  onRemoveSavedJob
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])
  const [justAppliedTitle, setJustAppliedTitle] = useState<string | null>(null)

  // Default initial saved jobs
  const initialSavedJobs = [
    {
      id: 'saved-1',
      jobId: 'job-swiggy-fe',
      title: 'Frontend Developer (React & Next.js)',
      company: 'Swiggy',
      logoName: 'swiggy',
      location: 'Koramangala, Bengaluru',
      type: 'Full-time • Hybrid',
      experience: '2 - 5 Years',
      salary: '₹22,00,000 - ₹28,00,000 / yr',
      matchScore: '98% Match',
      deadline: 'Closing in 3 days',
      savedDate: 'Saved on 07 Oct 2026',
      skills: ['React', 'TypeScript', 'Redux', 'CSS Architecture']
    },
    {
      id: 'saved-2',
      jobId: 'job-google-swe',
      title: 'Software Engineer - Cloud Systems',
      company: 'Google',
      logoName: 'google',
      location: 'Manyata Tech Park, Bengaluru',
      type: 'Full-time • In-Office',
      experience: '1 - 4 Years',
      salary: '₹28,00,000 - ₹38,00,000 / yr',
      matchScore: '95% Match',
      deadline: 'Closing in 5 days',
      savedDate: 'Saved on 06 Oct 2026',
      skills: ['Node.js', 'Go', 'Distributed Systems', 'GCP']
    },
    {
      id: 'saved-3',
      jobId: 'job-adobe-pe',
      title: 'Product Engineer - Design Cloud',
      company: 'Adobe',
      logoName: 'adobe',
      location: 'Whitefield, Bengaluru',
      type: 'Full-time • Hybrid',
      experience: '2 - 6 Years',
      salary: '₹24,00,000 - ₹32,00,000 / yr',
      matchScore: '94% Match',
      deadline: 'Closing in 7 days',
      savedDate: 'Saved on 04 Oct 2026',
      skills: ['WebGL', 'JavaScript', 'Canvas', 'React']
    },
    {
      id: 'saved-4',
      jobId: 'job-amazon-hr',
      title: 'Talent Acquisition Coordinator',
      company: 'Amazon',
      logoName: 'amazon',
      location: 'Whitefield, Bengaluru',
      type: 'Full-time • Hybrid',
      experience: '1 - 3 Years',
      salary: '₹6,50,000 - ₹9,00,000 / yr',
      matchScore: '90% Match',
      deadline: 'Closing in 4 days',
      savedDate: 'Saved on 02 Oct 2026',
      skills: ['ATS Workflows', 'Background Verification', 'HR Operations']
    }
  ]

  const [savedList, setSavedList] = useState(initialSavedJobs)

  const handleRemove = (id: string, jobId: string) => {
    setSavedList(prev => prev.filter(item => item.id !== id))
    onRemoveSavedJob(jobId)
  }

  const handleApply = (title: string, id: string) => {
    setAppliedJobs(prev => [...prev, id])
    setJustAppliedTitle(title)
  }

  const filteredSaved = savedList.filter((item) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return item.title.toLowerCase().includes(q) || item.company.toLowerCase().includes(q)
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
              Saved Jobs
            </h1>
            <span
              style={{
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                fontSize: '12px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '9999px'
              }}
            >
              {filteredSaved.length} Saved
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Opportunities you bookmarked for later. Review details and apply before application windows close.
          </p>
        </div>

        {/* Search in Saved */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8'
            }}
          />
          <input
            type="text"
            placeholder="Search saved jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: '10px',
              border: '1.5px solid #e2e8f0',
              fontSize: '13px',
              outline: 'none',
              backgroundColor: '#f8fafc'
            }}
          />
        </div>
      </div>

      {/* Saved Jobs List */}
      {filteredSaved.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredSaved.map((item) => {
            const isApplied = appliedJobs.includes(item.id)

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease'
                }}
                className="saved-job-card"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <CompanyLogo name={item.logoName} size={46} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{item.company}</span>
                          <span style={{ fontSize: '10px', backgroundColor: '#ecfdf5', color: '#059669', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <ShieldCheck size={11} /> Verified
                          </span>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id, item.jobId)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#94a3b8',
                        padding: '4px'
                      }}
                      title="Remove from saved"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569' }}>
                      <MapPin size={14} color="#64748b" />
                      <span>{item.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#475569', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{item.salary}</span>
                      <span>•</span>
                      <span>{item.experience}</span>
                      <span>•</span>
                      <span style={{ backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: '#ecfdf5', color: '#059669', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                      {item.matchScore}
                    </span>
                    <span style={{ backgroundColor: '#fef2f2', color: '#dc2626', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {item.deadline}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {item.skills.map((s, idx) => (
                      <span key={idx} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '6px' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                    {item.savedDate}
                  </span>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleApply(item.title, item.id)}
                      disabled={isApplied}
                      style={{
                        backgroundColor: isApplied ? '#f1f5f9' : '#0f172a',
                        color: isApplied ? '#64748b' : '#ffffff',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '12px',
                        padding: '8px 18px',
                        borderRadius: '8px',
                        cursor: isApplied ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle2 size={13} color="#16a34a" /> Applied
                        </>
                      ) : (
                        'Apply Now'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            padding: '60px 24px',
            textAlign: 'center',
            border: '1px solid #e2e8f0',
            maxWidth: '540px',
            margin: '20px auto'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <Bookmark size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
            No Saved Jobs Right Now
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', lineHeight: 1.5 }}>
            Bookmark exciting job openings in Bengaluru while browsing to save them here for easy review and application.
          </p>
          <button
            type="button"
            onClick={() => onNavigateTab('jobs')}
            style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '13px',
              padding: '10px 22px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Browse Verified Jobs
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Just Applied Toast */}
      {justAppliedTitle && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}
        >
          <CheckCircle2 size={20} color="#22c55e" />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>
            Applied for <strong>{justAppliedTitle}</strong>!
          </span>
          <button
            type="button"
            onClick={() => {
              setJustAppliedTitle(null)
              onNavigateTab('applications')
            }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              marginLeft: '8px'
            }}
          >
            Track Status
          </button>
        </div>
      )}

      <style>{`
        .saved-job-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -4px rgba(0,0,0,0.06) !important;
          border-color: #cbd5e1 !important;
        }
      `}</style>
    </div>
  )
}
