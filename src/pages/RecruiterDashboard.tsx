import React, { useState, useEffect } from 'react'
import {
  Building2,
  Briefcase,
  Users,
  PlusCircle,
  MapPin,
  ShieldCheck,
  X,
  Loader2
} from 'lucide-react'
import { supabase, toJobListing, toJobApplication } from '../supabase'
import { useAuth } from '../context/AuthContext'
import type { JobListing, JobApplication, ApplicationStage } from '../types/user'

export const RecruiterDashboard: React.FC = () => {
  const { user, recruiterProfile, logout } = useAuth()

  const [activeTab, setActiveTab] = useState<'jobs' | 'applicants' | 'company'>('jobs')
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [applicants, setApplicants] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)

  // Post Job Modal State
  const [showPostJobModal, setShowPostJobModal] = useState(false)
  const [postingJob, setPostingJob] = useState(false)
  const [jobForm, setJobForm] = useState({
    title: '',
    category: 'Customer Support',
    vacancies: 1,
    description: '',
    responsibilities: '',
    requiredSkills: '',
    experience: '1 - 3 Years',
    salary: '₹20,000 – ₹30,000 / month',
    location: 'Koramangala, Bengaluru',
    workMode: 'In-Office' as const,
    jobType: 'Full-time' as const
  })

  // Selected candidate detail modal
  const [selectedApplicant, setSelectedApplicant] = useState<JobApplication | null>(null)

  // Fetch recruiter's jobs and applicants
  const fetchData = async () => {
    if (!user) return
    setLoading(true)
    try {
      // 1. Fetch Jobs
      const { data: jobRows, error: jobsError } = await supabase.from('jobs').select('*').eq('recruiter_id', user.uid)
      if (jobsError) throw jobsError
      setJobs((jobRows || []).map(toJobListing))

      // 2. Fetch Applicants
      const { data: appRows, error: appsError } = await supabase
        .from('applications')
        .select('*')
        .eq('company_name', recruiterProfile?.companyName || '')
      if (appsError) throw appsError
      const fetchedApps: JobApplication[] = (appRows || []).map(toJobApplication)
      setApplicants(fetchedApps)
    } catch (err) {
      console.error('Error fetching recruiter data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user, recruiterProfile])

  // Post Job Handler
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setPostingJob(true)

    try {
      const skillsArray = jobForm.requiredSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      // PRD Page 13: Job created goes to PENDING_APPROVAL for admin review
      const { error: insertError } = await supabase.from('jobs').insert({
        title: jobForm.title,
        category: jobForm.category,
        vacancies: jobForm.vacancies,
        description: jobForm.description,
        responsibilities: jobForm.responsibilities,
        required_skills: skillsArray,
        experience: jobForm.experience,
        salary: jobForm.salary,
        location: jobForm.location,
        work_mode: jobForm.workMode,
        job_type: jobForm.jobType,
        recruiter_id: user.uid,
        recruiter_name: recruiterProfile?.fullName || 'Recruiter',
        recruiter_email: user.email,
        company_id: recruiterProfile?.id || user.uid,
        company_name: recruiterProfile?.companyName || 'Verified Enterprise',
        status: 'PENDING_APPROVAL',
        applicant_count: 0,
      })
      if (insertError) throw insertError

      setShowPostJobModal(false)
      setJobForm({
        title: '',
        category: 'Customer Support',
        vacancies: 1,
        description: '',
        responsibilities: '',
        requiredSkills: '',
        experience: '1 - 3 Years',
        salary: '₹20,000 – ₹30,000 / month',
        location: 'Koramangala, Bengaluru',
        workMode: 'In-Office',
        jobType: 'Full-time'
      })

      await fetchData()
    } catch (err) {
      console.error('Error creating job:', err)
      alert('Failed to post job. Please try again.')
    } finally {
      setPostingJob(false)
    }
  }

  // Update Applicant Status
  const handleUpdateApplicantStatus = async (appId: string, newStatus: ApplicationStage) => {
    try {
      const { error: updateError } = await supabase.from('applications').update({ status: newStatus }).eq('id', appId)
      if (updateError) throw updateError

      setApplicants((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      )
      if (selectedApplicant && selectedApplicant.id === appId) {
        setSelectedApplicant((prev) => (prev ? { ...prev, status: newStatus } : null))
      }
    } catch (err) {
      console.error('Error updating applicant status:', err)
    }
  }

  // PRD Page 12 Metrics
  const activeJobsCount = jobs.filter((j) => j.status === 'PUBLISHED').length
  const totalAppsCount = applicants.length
  const shortlistedCount = applicants.filter((a) => a.status === 'SHORTLISTED').length
  const interviewsCount = applicants.filter((a) => a.status === 'INTERVIEW').length
  const hiredCount = applicants.filter((a) => a.status === 'HIRED').length

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '90vh', padding: '40px 16px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Bar */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px 28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            marginBottom: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '22px'
              }}
            >
              <Building2 size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {recruiterProfile?.companyName || 'Employer Dashboard'}
                </h1>
                <span
                  style={{
                    backgroundColor: recruiterProfile?.verificationStatus === 'VERIFIED' ? '#dcfce7' : '#fef3c7',
                    color: recruiterProfile?.verificationStatus === 'VERIFIED' ? '#166534' : '#92400e',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ShieldCheck size={13} />
                  {recruiterProfile?.verificationStatus === 'VERIFIED' ? 'Verified Employer ✓' : 'Pending Admin Verification'}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                {recruiterProfile?.fullName || 'Recruiter'} • {recruiterProfile?.jobRole || 'Talent Acquisition'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setShowPostJobModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '11px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <PlusCircle size={16} /> Post New Job
            </button>
            <button
              type="button"
              onClick={logout}
              style={{
                padding: '11px 18px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '14px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* PRD Page 12 Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '28px'
          }}
        >
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>ACTIVE JOBS</span>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>{activeJobsCount}</div>
          </div>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>APPLICATIONS</span>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#2563eb', marginTop: '6px' }}>{totalAppsCount}</div>
          </div>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>SHORTLISTED</span>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#059669', marginTop: '6px' }}>{shortlistedCount}</div>
          </div>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>INTERVIEWS</span>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#7c3aed', marginTop: '6px' }}>{interviewsCount}</div>
          </div>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>HIRED CANDIDATES</span>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#16a34a', marginTop: '6px' }}>{hiredCount}</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('jobs')}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              fontSize: '15px',
              fontWeight: activeTab === 'jobs' ? 700 : 500,
              color: activeTab === 'jobs' ? '#0f172a' : '#64748b',
              borderBottom: activeTab === 'jobs' ? '2px solid #0f172a' : '2px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px'
            }}
          >
            My Job Postings ({jobs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('applicants')}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              fontSize: '15px',
              fontWeight: activeTab === 'applicants' ? 700 : 500,
              color: activeTab === 'applicants' ? '#0f172a' : '#64748b',
              borderBottom: activeTab === 'applicants' ? '2px solid #0f172a' : '2px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px'
            }}
          >
            Applicant Tracking ({applicants.length})
          </button>
        </div>

        {/* TAB 1: MY JOBS */}
        {activeTab === 'jobs' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
                <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 8px', display: 'block' }} />
                Loading your job postings...
              </div>
            ) : jobs.length === 0 ? (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '48px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <Briefcase size={36} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>No jobs posted yet</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0 20px' }}>
                  Post your first vacancy in Bengaluru to start receiving pre-verified candidates.
                </p>
                <button
                  type="button"
                  onClick={() => setShowPostJobModal(true)}
                  style={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Create Job Posting
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {jobs.map((j) => (
                  <div
                    key={j.id}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      padding: '20px 24px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '4px',
                            backgroundColor: j.status === 'PUBLISHED' ? '#dcfce7' : '#fef3c7',
                            color: j.status === 'PUBLISHED' ? '#166534' : '#92400e'
                          }}
                        >
                          {j.status === 'PUBLISHED' ? 'LIVE / PUBLISHED' : 'PENDING ADMIN APPROVAL'}
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{j.category}</span>
                      </div>
                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>{j.title}</h3>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                        <MapPin size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> {j.location} • {j.salary} • {j.vacancies} Vacancies
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setActiveTab('applicants')}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#f1f5f9',
                          borderRadius: '8px',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: 'pointer',
                          color: '#0f172a'
                        }}
                      >
                        View Applicants ({applicants.filter((a) => a.jobId === j.id).length})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: APPLICANTS ATS */}
        {activeTab === 'applicants' && (
          <div>
            {applicants.length === 0 ? (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '48px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <Users size={36} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>No applications yet</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0 0' }}>
                  Applicants will appear here once candidates apply to your approved listings.
                </p>
              </div>
            ) : (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>CANDIDATE</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>JOB ROLE</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>BGV STATUS</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>STATUS</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, color: '#475569' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map((app) => (
                      <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 18px' }}>
                          <strong style={{ color: '#0f172a', display: 'block' }}>{app.candidateName}</strong>
                          <span style={{ fontSize: '12px', color: '#64748b' }}>{app.candidateLocation} • {app.candidateExperience}</span>
                        </td>
                        <td style={{ padding: '14px 18px', color: '#334155' }}>{app.jobTitle}</td>
                        <td style={{ padding: '14px 18px' }}>
                          <span
                            style={{
                              backgroundColor: '#dcfce7',
                              color: '#166534',
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: '12px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <ShieldCheck size={12} /> BGV Verified
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{ fontWeight: 700, color: '#2563eb' }}>{app.status}</span>
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={() => setSelectedApplicant(app)}
                              style={{
                                padding: '6px 10px',
                                backgroundColor: '#0f172a',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              Review Dossier
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateApplicantStatus(app.id, 'SHORTLISTED')}
                              style={{
                                padding: '6px 10px',
                                backgroundColor: '#ecfdf5',
                                color: '#047857',
                                border: '1px solid #a7f3d0',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              Shortlist
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
        )}

        {/* MODAL: POST A JOB */}
        {showPostJobModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '640px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '28px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Post a New Job</h2>
                  <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                    Job listing will be reviewed and approved by Proxy Admin before publication.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPostJobModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Customer Support Executive"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Job Category</label>
                    <select
                      value={jobForm.category}
                      onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }}
                    >
                      <option value="Customer Support">Customer Support</option>
                      <option value="BPO / Telecalling">BPO / Telecalling</option>
                      <option value="Sales & BD">Sales & BD</option>
                      <option value="IT Support">IT Support</option>
                      <option value="Finance & Accounts">Finance & Accounts</option>
                      <option value="HR & Admin">HR & Admin</option>
                      <option value="Logistics & Delivery">Logistics & Delivery</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Vacancies</label>
                    <input
                      type="number"
                      min={1}
                      required
                      value={jobForm.vacancies}
                      onChange={(e) => setJobForm({ ...jobForm, vacancies: Number(e.target.value) })}
                      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Salary Range</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹20,000 – ₹30,000 / month"
                      value={jobForm.salary}
                      onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Bengaluru Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Koramangala / Electronic City"
                      value={jobForm.location}
                      onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Required Skills (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Communication, CRM, Hindi, English"
                    value={jobForm.requiredSkills}
                    onChange={(e) => setJobForm({ ...jobForm, requiredSkills: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Job Description</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Key responsibilities and daily expectations..."
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={postingJob}
                  style={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '14px',
                    border: 'none',
                    cursor: postingJob ? 'not-allowed' : 'pointer',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {postingJob ? <Loader2 size={16} className="animate-spin" /> : 'Submit for Admin Review'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CANDIDATE DOSSIER (PRD Page 14) */}
        {selectedApplicant && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '560px',
                padding: '28px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {selectedApplicant.candidateName}
                    </h2>
                    <span
                      style={{
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ShieldCheck size={12} /> BGV Verified
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                    Applied for: {selectedApplicant.jobTitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedApplicant(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Dossier details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b' }}>Location</span>
                  <strong style={{ color: '#0f172a' }}>{selectedApplicant.candidateLocation}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b' }}>Work Experience</span>
                  <strong style={{ color: '#0f172a' }}>{selectedApplicant.candidateExperience}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b' }}>Contact</span>
                  <span style={{ color: '#0f172a', fontWeight: 600 }}>
                    {selectedApplicant.candidateMobile} • {selectedApplicant.candidateEmail}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b' }}>Application Status</span>
                  <strong style={{ color: '#2563eb' }}>{selectedApplicant.status}</strong>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleUpdateApplicantStatus(selectedApplicant.id, 'SHORTLISTED')}
                  style={{
                    padding: '9px 4px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    backgroundColor: '#ecfdf5',
                    color: '#047857'
                  }}
                >
                  Shortlist
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateApplicantStatus(selectedApplicant.id, 'INTERVIEW')}
                  style={{
                    padding: '9px 4px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    backgroundColor: '#f5f3ff',
                    color: '#6d28d9'
                  }}
                >
                  Interview
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateApplicantStatus(selectedApplicant.id, 'HIRED')}
                  style={{
                    padding: '9px 4px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    backgroundColor: '#dcfce7',
                    color: '#15803d'
                  }}
                >
                  Hire
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateApplicantStatus(selectedApplicant.id, 'REJECTED')}
                  style={{
                    padding: '9px 4px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    backgroundColor: '#fef2f2',
                    color: '#b91c1c'
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
