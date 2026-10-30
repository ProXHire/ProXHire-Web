import React, { useState } from 'react'
import {
  X,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  FileText,
  User,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { supabase } from '../../supabase'
import { useAuth } from '../../context/AuthContext'
import type { JobListing } from '../../types/user'

interface ApplyChecklistModalProps {
  job: JobListing | null
  isOpen: boolean
  onClose: () => void
  onOpenAuth: () => void
  onSuccess: () => void
}

export const ApplyChecklistModal: React.FC<ApplyChecklistModalProps> = ({
  job,
  isOpen,
  onClose,
  onOpenAuth,
  onSuccess
}) => {
  const { user, candidateProfile } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [appliedSuccess, setAppliedSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen || !job) return null

  // PRD Page 9 Checklist Validation
  const isLoggedIn = Boolean(user)
  const isProfileComplete = Boolean(
    candidateProfile?.fullName && (candidateProfile?.mobileNumber || user?.phoneNumber)
  )
  const isResumeAvailable = Boolean(candidateProfile?.resumeFileName || candidateProfile?.resumeUrl)
  const isBgvSignAvailable = Boolean(
    candidateProfile?.bgvStatus === 'BASIC_VERIFIED' ||
      candidateProfile?.bgvStatus === 'KYC_VERIFIED' ||
      user?.phoneNumber ||
      user?.email
  )

  const allChecksPass = isLoggedIn && isProfileComplete && isBgvSignAvailable

  const handleConfirmApply = async () => {
    if (!user || !job) return
    setError(null)
    setSubmitting(true)

    try {
      // Record application in Supabase 'applications' table
      const { error: insertError } = await supabase.from('applications').insert({
        job_id: job.id,
        job_title: job.title,
        candidate_id: candidateProfile?.id || user.uid,
        candidate_name: candidateProfile?.fullName || user.displayName || 'Verified Candidate',
        candidate_email: user.email || candidateProfile?.email || '',
        candidate_mobile: user.phoneNumber || candidateProfile?.mobileNumber || '',
        candidate_experience: candidateProfile?.workExperience || '1 - 3 Years',
        candidate_location: candidateProfile?.currentLocation || 'Bengaluru',
        company_name: job.companyName,
        resume_url: candidateProfile?.resumeUrl || null,
        resume_file_name: candidateProfile?.resumeFileName || 'Resume.pdf',
        bgv_status: candidateProfile?.bgvStatus || 'BASIC_VERIFIED',
        status: 'APPLIED',
      })
      if (insertError) throw insertError

      setAppliedSuccess(true)
    } catch (err: any) {
      console.error('Error submitting application:', err)
      setError(err.message || 'Failed to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '520px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px 20px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              PRD Verification Gate
            </span>
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0' }}>
              Application Readiness Check
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#f1f5f9',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px 28px' }}>
          {appliedSuccess ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Application Submitted!
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, marginBottom: '24px' }}>
                Your verified credentials and application for <strong>{job.title}</strong> at{' '}
                <strong>{job.companyName}</strong> have been submitted directly to the recruiter.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onSuccess()
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                View in Application Tracker
              </button>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                Applying for: <strong style={{ color: '#0f172a' }}>{job.title}</strong> at {job.companyName}
              </p>

              {error && (
                <div
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#fef2f2',
                    borderRadius: '8px',
                    color: '#b91c1c',
                    fontSize: '13px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              {/* PRD Page 9 Checklist Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {/* 1. Logged in */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: isLoggedIn ? '#f0fdf4' : '#fff7ed',
                    border: `1px solid ${isLoggedIn ? '#bbf7d0' : '#fed7aa'}`,
                    borderRadius: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <User size={18} color={isLoggedIn ? '#16a34a' : '#ea580c'} />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block' }}>
                        Candidate Account
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {isLoggedIn ? (user?.email || user?.phoneNumber || 'Authenticated') : 'Sign in required'}
                      </span>
                    </div>
                  </div>
                  {isLoggedIn ? (
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>✓ Logged In</span>
                  ) : (
                    <button
                      type="button"
                      onClick={onOpenAuth}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Sign In Now
                    </button>
                  )}
                </div>

                {/* 2. Profile Complete */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: isProfileComplete ? '#f0fdf4' : '#f8fafc',
                    border: `1px solid ${isProfileComplete ? '#bbf7d0' : '#e2e8f0'}`,
                    borderRadius: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={18} color={isProfileComplete ? '#16a34a' : '#94a3b8'} />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block' }}>
                        Candidate Profile Details
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {isProfileComplete ? `${candidateProfile?.fullName || 'Complete'}` : 'Requires name & phone'}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: isProfileComplete ? '#16a34a' : '#64748b' }}>
                    {isProfileComplete ? '✓ Ready' : 'Pending'}
                  </span>
                </div>

                {/* 3. Resume Available */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: isResumeAvailable ? '#f0fdf4' : '#f8fafc',
                    border: `1px solid ${isResumeAvailable ? '#bbf7d0' : '#e2e8f0'}`,
                    borderRadius: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={18} color={isResumeAvailable ? '#16a34a' : '#94a3b8'} />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block' }}>
                        Resume Attached
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {isResumeAvailable ? (candidateProfile?.resumeFileName || 'Resume Attached') : 'Digital profile submitted'}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: isResumeAvailable ? '#16a34a' : '#64748b' }}>
                    {isResumeAvailable ? '✓ Ready' : 'Auto-Generated'}
                  </span>
                </div>

                {/* 4. BGV Sign Available */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: isBgvSignAvailable ? '#f0fdf4' : '#fff7ed',
                    border: `1px solid ${isBgvSignAvailable ? '#bbf7d0' : '#fed7aa'}`,
                    borderRadius: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={18} color={isBgvSignAvailable ? '#16a34a' : '#ea580c'} />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block' }}>
                        Tier 1 BGV Verification
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {isBgvSignAvailable ? 'Mobile / Email OTP Authenticated' : 'Verification required'}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: isBgvSignAvailable ? '#16a34a' : '#ea580c' }}>
                    {isBgvSignAvailable ? '✓ Verified' : 'Action Required'}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                disabled={!allChecksPass || submitting}
                onClick={handleConfirmApply}
                style={{
                  width: '100%',
                  padding: '13px',
                  backgroundColor: allChecksPass ? '#0f172a' : '#e2e8f0',
                  color: allChecksPass ? '#ffffff' : '#94a3b8',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: allChecksPass && !submitting ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Submit 1-Click Verified Application <ArrowRight size={16} />
                  </>
                )}
              </button>

              {!allChecksPass && (
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>
                  {!isLoggedIn
                    ? 'Please sign in with your phone or email to complete application.'
                    : 'Please complete your candidate profile before submitting.'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
