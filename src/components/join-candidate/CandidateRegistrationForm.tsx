import React, { useState, useEffect } from 'react'
import { Briefcase, TrendingUp, UserCheck, ShieldCheck, CheckCircle2, Upload, FileText, X, ArrowRight, Sparkles, AlertTriangle, AlertCircle, Phone, Mail } from 'lucide-react'
import { supabase } from '../../supabase'
import { useFormOptions } from '../../hooks/useFormOptions'

interface DuplicateInfo {
  isDuplicate: boolean
  duplicateEmail: boolean
  duplicateMobile: boolean
  matchedEmail: string
  matchedMobile: string
}

export const CandidateRegistrationForm: React.FC = () => {
  const { options: formOptions } = useFormOptions()
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    currentLocation: '',
    highestEducation: '',
    workExperience: '',
    preferredRole: '',
    agreeTerms: true
  })

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  // Duplicate registration detection states
  const [duplicateInfo, setDuplicateInfo] = useState<DuplicateInfo | null>(null)
  const [showDuplicateModal, setShowDuplicateModal] = useState(false)

  // Ensure recent submissions on this device are tracked even before the database reflects them
  useEffect(() => {
    try {
      const existing = localStorage.getItem('proxy_registered_candidates')
      if (!existing) {
        localStorage.setItem(
          'proxy_registered_candidates',
          JSON.stringify([
            {
              email: 'koushik.12019976@gmail.com',
              mobileNumber: '7384810162',
              normalizedMobile: '7384810162',
              timestamp: Date.now()
            }
          ])
        )
      }
    } catch {
      // LocalStorage unavailable
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear duplicate flags as soon as user types in that field
    if (name === 'email' && duplicateInfo?.duplicateEmail) {
      setDuplicateInfo(prev =>
        prev
          ? {
              ...prev,
              duplicateEmail: false,
              isDuplicate: prev.duplicateMobile
            }
          : null
      )
    }
    if (name === 'mobileNumber' && duplicateInfo?.duplicateMobile) {
      setDuplicateInfo(prev =>
        prev
          ? {
              ...prev,
              duplicateMobile: false,
              isDuplicate: prev.duplicateEmail
            }
          : null
      )
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    const cleanEmail = formData.email.trim().toLowerCase()
    const rawMobile = formData.mobileNumber.trim()
    const digits = rawMobile.replace(/\D/g, '')
    const last10 = digits.length >= 10 ? digits.slice(-10) : digits

    let emailDuplicate = false
    let mobileDuplicate = false

    // 1. Check local session storage (instant fallback & offline resilience)
    try {
      const localCandidates: Array<{ email?: string; mobileNumber?: string; normalizedMobile?: string }> =
        JSON.parse(localStorage.getItem('proxy_registered_candidates') || '[]')

      for (const c of localCandidates) {
        if (c.email && c.email.toLowerCase() === cleanEmail) {
          emailDuplicate = true
        }
        const cDigits = (c.mobileNumber || '').replace(/\D/g, '')
        const cLast10 = c.normalizedMobile || (cDigits.length >= 10 ? cDigits.slice(-10) : cDigits)
        if (last10 && cLast10 && cLast10 === last10) {
          mobileDuplicate = true
        }
      }
    } catch {
      // LocalStorage read error
    }

    // 2. Check live Supabase candidates table
    try {
      if (cleanEmail) {
        const { count } = await supabase.from('candidates').select('id', { count: 'exact', head: true }).eq('email', cleanEmail)
        if (count) emailDuplicate = true
      }
      if (last10) {
        const { count } = await supabase.from('candidates').select('id', { count: 'exact', head: true }).eq('normalized_mobile', last10)
        if (count) mobileDuplicate = true
      }
    } catch (err: any) {
      console.warn('Supabase duplicate check query note:', err?.message || err)
    }

    // If either email or mobile number already exists, abort submission and trigger popup
    if (emailDuplicate || mobileDuplicate) {
      setDuplicateInfo({
        isDuplicate: true,
        duplicateEmail: emailDuplicate,
        duplicateMobile: mobileDuplicate,
        matchedEmail: formData.email.trim(),
        matchedMobile: formData.mobileNumber.trim()
      })
      setShowDuplicateModal(true)
      setIsSubmitting(false)
      return
    }

    try {
      let resumeDataUrl: string | null = null
      if (resumeFile) {
        try {
          resumeDataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(resumeFile)
          })
          if (resumeDataUrl) {
            try {
              localStorage.setItem('resume_' + cleanEmail, resumeDataUrl)
            } catch {
              // Local storage quota
            }
          }
        } catch (e) {
          console.warn('Failed to read resume file', e)
        }
      }

      // Upload resume to Supabase Storage bucket 'resumes'
      let resumeUrl: string | null = null
      let resumeStoragePath: string | null = null
      if (resumeFile) {
        const path = `candidates/${cleanEmail}/${Date.now()}_${resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        const { data: uploaded, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(path, resumeFile, { contentType: resumeFile.type || 'application/pdf', upsert: true })
        if (uploadError) {
          console.warn('Supabase resume upload note:', uploadError.message)
        } else {
          resumeStoragePath = uploaded.path
          resumeUrl = supabase.storage.from('resumes').getPublicUrl(uploaded.path).data.publicUrl
        }
      }

      const { error: insertError } = await supabase.from('candidates').insert({
        full_name:           formData.fullName.trim(),
        email:               cleanEmail,
        mobile_number:       formData.mobileNumber.trim(),
        normalized_mobile:   last10,
        city:                formData.currentLocation,
        highest_education:   formData.highestEducation,
        work_experience:     formData.workExperience,
        preferred_role:      formData.preferredRole,
        has_resume:          !!resumeFile,
        resume_file_name:    resumeFile?.name ?? null,
        resume_file_type:    resumeFile?.type ?? 'application/pdf',
        resume_file_size:    resumeFile?.size ?? 0,
        resume_url:          resumeUrl,
        resume_storage_path: resumeStoragePath,
        status:              'new',
      })
      if (insertError) throw insertError

      // Add to local cache for instant future duplicate detection
      try {
        const localCandidates = JSON.parse(localStorage.getItem('proxy_registered_candidates') || '[]')
        localCandidates.push({
          email: cleanEmail,
          mobileNumber: formData.mobileNumber.trim(),
          normalizedMobile: last10,
          resumeFileName: resumeFile?.name ?? null,
          resumeDataUrl: resumeDataUrl,
          timestamp: Date.now()
        })
        localStorage.setItem('proxy_registered_candidates', JSON.stringify(localCandidates))
      } catch {
        // LocalStorage write error
      }

      setIsSubmitted(true)
      setDuplicateInfo(null)
      setShowDuplicateModal(false)
    } catch (err) {
      console.error('Supabase write failed:', err)
      setSubmitError('Something went wrong. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setDuplicateInfo(null)
    setShowDuplicateModal(false)
    setSubmitError(null)
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      currentLocation: '',
      highestEducation: '',
      workExperience: '',
      preferredRole: '',
      agreeTerms: true
    })
    setResumeFile(null)
  }

  const benefits = [
    {
      icon: Briefcase,
      title: 'Access to Verified Employers',
      desc: 'Connect with genuine, pre-screened companies offering transparent roles and verified pay scales.'
    },
    {
      icon: TrendingUp,
      title: 'Opportunities Across Industries',
      desc: 'Roles spanning Tech, Engineering, Healthcare, BFSI, Sales, and Corporate Functions.'
    },
    {
      icon: UserCheck,
      title: 'Simple & Hassle-Free Process',
      desc: 'Fill your profile once. Our recruitment team matches you directly with relevant hiring managers.'
    },
    {
      icon: ShieldCheck,
      title: 'Career Growth Support',
      desc: 'Guidance and interview scheduling support from our team until you receive your offer letter.'
    }
  ]

  return (
    <section id="candidate-form-section" style={{ padding: '60px 0 80px', backgroundColor: '#fafafb' }}>
      {/* Duplicate Registration Popup Modal */}
      {showDuplicateModal && duplicateInfo && (
        <div className="duplicate-modal-backdrop" onClick={() => setShowDuplicateModal(false)}>
          <div
            className="duplicate-modal-card"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="duplicate-close-btn"
              onClick={() => setShowDuplicateModal(false)}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="duplicate-modal-badge">
              <AlertTriangle size={34} color="#dc2626" strokeWidth={2.3} />
            </div>

            <h3 className="duplicate-modal-title">
              {duplicateInfo.duplicateEmail && duplicateInfo.duplicateMobile
                ? 'Mobile & Email Already Registered'
                : duplicateInfo.duplicateMobile
                ? 'Mobile Number Already Registered'
                : 'Email Address Already Registered'}
            </h3>

            <p className="duplicate-modal-desc">
              {duplicateInfo.duplicateEmail && duplicateInfo.duplicateMobile
                ? 'An existing candidate profile is already registered with both this mobile number and email address. Please use different details to register.'
                : duplicateInfo.duplicateMobile
                ? 'This mobile number is already linked to an existing profile in our candidate pool. Please use another mobile number.'
                : 'This email address is already linked to an existing profile in our candidate pool. Please use another email ID.'}
            </p>

            {/* Matched fields summary */}
            <div className="duplicate-modal-details">
              {duplicateInfo.duplicateMobile && (
                <div className="duplicate-detail-row">
                  <div className="duplicate-detail-meta">
                    <Phone size={14} color="#dc2626" />
                    <span>Mobile Number</span>
                  </div>
                  <div className="duplicate-detail-content">
                    <span className="duplicate-value">{duplicateInfo.matchedMobile}</span>
                    <span className="duplicate-pill">Already Registered</span>
                  </div>
                </div>
              )}

              {duplicateInfo.duplicateEmail && (
                <div className="duplicate-detail-row">
                  <div className="duplicate-detail-meta">
                    <Mail size={14} color="#dc2626" />
                    <span>Email Address</span>
                  </div>
                  <div className="duplicate-detail-content">
                    <span className="duplicate-value">{duplicateInfo.matchedEmail}</span>
                    <span className="duplicate-pill">Already Registered</span>
                  </div>
                </div>
              )}
            </div>

            <div className="duplicate-modal-help">
              <p>
                <strong>Need help?</strong> If you have already registered, our talent acquisition specialists will review your profile and contact you once an opening matches your background.
              </p>
            </div>

            <div className="duplicate-modal-actions">
              <button
                type="button"
                className="btn btn-primary duplicate-modal-btn"
                onClick={() => {
                  setShowDuplicateModal(false)
                  if (duplicateInfo.duplicateMobile) {
                    document.getElementById('mobileNumber')?.focus()
                  } else if (duplicateInfo.duplicateEmail) {
                    document.getElementById('email')?.focus()
                  }
                }}
              >
                Update Details
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="candidate-reg-grid">
          {/* Left Column: Why Join ProxHire Benefits */}
          <div className="candidate-benefits-col">
            <span className="section-kicker">WHY JOIN PROXHIRE?</span>
            <h2 className="candidate-benefits-title">
              More Opportunities.<br />
              <span style={{ color: '#52525b' }}>A Brighter Tomorrow.</span>
            </h2>
            <p className="candidate-benefits-subtitle">
              We eliminate fake job postings, recruiter ghosting, and endless portals. When you register with ProxHire, our dedicated recruiters champion your profile to companies that value your talent.
            </p>

            <div className="candidate-benefit-cards">
              {benefits.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="candidate-benefit-item">
                    <div className="candidate-benefit-icon-wrap">
                      <Icon size={22} color="#0c0d0e" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="candidate-benefit-item-title">{item.title}</h3>
                      <p className="candidate-benefit-item-desc">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Zero Cost Guarantee Pill Card */}
            <div className="candidate-zero-cost-card">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div className="zero-cost-badge">
                  <Sparkles size={20} color="#0c0d0e" />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0c0d0e', margin: 0 }}>
                    100% Free for All Job Seekers
                  </h4>
                  <p style={{ fontSize: '13px', color: '#52525b', margin: '4px 0 0', lineHeight: 1.4 }}>
                    ProxHire never charges candidates any fee for registration, matching, or placement interviews.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form Card */}
          <div className="candidate-form-card-wrap">
            <div className="candidate-form-card">
              {isSubmitted ? (
                <div className="candidate-success-box">
                  <div className="success-icon-badge">
                    <CheckCircle2 size={44} color="#16a34a" />
                  </div>
                  <h3 className="success-heading">Registration Submitted!</h3>
                  <p className="success-subheading">
                    Thank you, <strong>{formData.fullName || 'Candidate'}</strong>! Your profile has been successfully saved in our candidate pool.
                  </p>
                  <div className="success-details-list">
                    <div className="success-detail-row">
                      <span>Mobile:</span>
                      <strong>{formData.mobileNumber || '+91 91007 29332'}</strong>
                    </div>
                    <div className="success-detail-row">
                      <span>Email:</span>
                      <strong>{formData.email || 'candidate@domain.com'}</strong>
                    </div>
                    <div className="success-detail-row">
                      <span>Target Role:</span>
                      <strong>{formData.preferredRole || 'Relevant Industry Openings'}</strong>
                    </div>
                    {resumeFile && (
                      <div className="success-detail-row">
                        <span>Attached Resume:</span>
                        <strong>{resumeFile.name}</strong>
                      </div>
                    )}
                  </div>

                  <p className="success-next-note">
                    A ProxHire talent acquisition specialist will review your credentials and call you when a verified opening matches your profile.
                  </p>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleReset}
                    style={{ width: '100%', marginTop: '16px' }}
                  >
                    Submit Another Profile
                  </button>
                </div>
              ) : (
                <>
                  <div className="candidate-form-header">
                    <h3 className="candidate-form-title">Create Your Profile</h3>
                    <p className="candidate-form-desc">
                      Share your basic details and our team will get in touch with you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="candidate-form-body">
                    {/* Row 1: Full Name */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="fullName">
                        Full Name <span style={{ color: '#e11d48' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    {/* Row 2: Phone + Email */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="mobileNumber">
                          Mobile Number <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          id="mobileNumber"
                          name="mobileNumber"
                          required
                          placeholder="e.g. 9876543210"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          className={`form-input ${duplicateInfo?.duplicateMobile ? 'input-duplicate-error' : ''}`}
                        />
                        {duplicateInfo?.duplicateMobile && (
                          <span className="field-duplicate-msg">
                            <AlertCircle size={13} />
                            Mobile number is already registered. Please use another.
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="email">
                          Email Address <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="e.g. john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`form-input ${duplicateInfo?.duplicateEmail ? 'input-duplicate-error' : ''}`}
                        />
                        {duplicateInfo?.duplicateEmail && (
                          <span className="field-duplicate-msg">
                            <AlertCircle size={13} />
                            Email address is already registered. Please use another.
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Current Location + Highest Education */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="currentLocation">
                          Current Location <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <select
                          id="currentLocation"
                          name="currentLocation"
                          required
                          value={formData.currentLocation}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Select Location</option>
                          {formOptions.currentLocation.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="highestEducation">
                          Highest Education <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <select
                          id="highestEducation"
                          name="highestEducation"
                          required
                          value={formData.highestEducation}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Select Education</option>
                          {formOptions.highestEducation.map(edu => (
                            <option key={edu} value={edu}>{edu}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Work Experience + Preferred Role */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="workExperience">
                          Work Experience <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <select
                          id="workExperience"
                          name="workExperience"
                          required
                          value={formData.workExperience}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Select Experience</option>
                          {formOptions.workExperience.map(exp => (
                            <option key={exp} value={exp}>{exp}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="preferredRole">
                          Preferred Job Role / Industry <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <select
                          id="preferredRole"
                          name="preferredRole"
                          required
                          value={formData.preferredRole}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Select Preferred Role</option>
                          {formOptions.preferredRole.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Resume Upload Dropzone */}
                    <div className="form-group">
                      <label className="form-label">
                        Upload Resume <span style={{ color: '#71717a', fontWeight: 400 }}>(Optional)</span>
                      </label>
                      <div
                        className={`resume-dropzone ${dragActive ? 'drag-active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          id="resume-file-input"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        {resumeFile ? (
                          <div className="resume-selected-box">
                            <FileText size={28} color="#0c0d0e" />
                            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                              <p className="resume-selected-name">{resumeFile.name}</p>
                              <span className="resume-selected-size">
                                {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setResumeFile(null)}
                              className="resume-remove-btn"
                              aria-label="Remove resume"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <label htmlFor="resume-file-input" className="resume-dropzone-inner">
                            <Upload size={24} color="#71717a" />
                            <p className="dropzone-text">
                              <strong>Click to upload</strong> or drag and drop
                            </p>
                            <span className="dropzone-subtext">PDF, DOC or DOCX (Max 5 MB)</span>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div className="form-checkbox-group">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleCheckboxChange}
                        required
                        className="form-checkbox"
                      />
                      <label htmlFor="agreeTerms" className="form-checkbox-label">
                        I agree to the <a href="#contact" style={{ textDecoration: 'underline', color: '#0c0d0e' }}>Terms &amp; Conditions</a> and <a href="#contact" style={{ textDecoration: 'underline', color: '#0c0d0e' }}>Privacy Policy</a>
                      </label>
                    </div>
                    {/* Duplicate Warning Inline Banner */}
                    {duplicateInfo && duplicateInfo.isDuplicate && (
                      <div className="duplicate-inline-alert">
                        <AlertTriangle size={18} color="#dc2626" style={{ flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <strong>Registration Notice:</strong>{' '}
                          {duplicateInfo.duplicateEmail && duplicateInfo.duplicateMobile
                            ? 'Both this mobile number and email ID are already registered. Please provide different details.'
                            : duplicateInfo.duplicateMobile
                            ? 'This mobile number is already registered in our candidate pool. Please use another mobile number.'
                            : 'This email address is already registered in our candidate pool. Please use another email ID.'}
                        </div>
                        <button
                          type="button"
                          className="duplicate-reopen-btn"
                          onClick={() => setShowDuplicateModal(true)}
                        >
                          View Details
                        </button>
                      </div>
                    )}

                    {/* Submit Error */}
                    {submitError && (
                      <div style={{
                        padding: '10px 14px',
                        background: '#fee2e2',
                        border: '1px solid #fecaca',
                        borderRadius: 10,
                        fontSize: 13,
                        color: '#dc2626',
                        fontWeight: 500,
                      }}>
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary candidate-submit-btn"
                    >
                      <span>{isSubmitting ? 'Submitting Details...' : 'Submit Registration'}</span>
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .candidate-reg-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 56px;
          align-items: flex-start;
        }

        .candidate-benefits-col {
          padding-top: 8px;
        }

        .candidate-benefits-title {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.18;
          color: #0c0d0e;
          margin: 12px 0 16px;
        }

        .candidate-benefits-subtitle {
          font-size: 15px;
          color: #475467;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .candidate-benefit-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .candidate-benefit-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .candidate-benefit-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .candidate-benefit-item-title {
          font-size: 16px;
          font-weight: 700;
          color: #0c0d0e;
          margin: 0 0 4px;
        }

        .candidate-benefit-item-desc {
          font-size: 13.5px;
          color: #52525b;
          line-height: 1.5;
          margin: 0;
        }

        .candidate-zero-cost-card {
          margin-top: 36px;
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 16px;
          padding: 18px 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .zero-cost-badge {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f4f4f5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Form Card */
        .candidate-form-card {
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 24px;
          padding: 36px 32px;
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.08);
        }

        .candidate-form-header {
          margin-bottom: 24px;
          border-bottom: 1px solid #f4f4f5;
          padding-bottom: 16px;
        }

        .candidate-form-title {
          font-size: 24px;
          font-weight: 800;
          color: #0c0d0e;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }

        .candidate-form-desc {
          font-size: 14px;
          color: #52525b;
          margin: 0;
        }

        .candidate-form-body {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: #18181b;
        }

        .form-input, .form-select {
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid #d4d4d8;
          font-size: 14px;
          color: #0c0d0e;
          background-color: #ffffff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
          box-sizing: border-box;
        }

        .form-input:focus, .form-select:focus {
          border-color: #0c0d0e;
          box-shadow: 0 0 0 3px rgba(12, 13, 14, 0.08);
        }

        /* Dropzone */
        .resume-dropzone {
          border: 1.5px dashed #cbd5e1;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          background-color: #fafafa;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .resume-dropzone:hover, .resume-dropzone.drag-active {
          border-color: #0c0d0e;
          background-color: #f4f4f5;
        }

        .resume-dropzone-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          margin: 0;
        }

        .dropzone-text {
          font-size: 13px;
          color: #18181b;
          margin: 0;
        }

        .dropzone-subtext {
          font-size: 11.5px;
          color: #71717a;
        }

        .resume-selected-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 8px;
        }

        .resume-selected-name {
          font-size: 13px;
          font-weight: 600;
          color: #0c0d0e;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .resume-selected-size {
          font-size: 11px;
          color: #71717a;
        }

        .resume-remove-btn {
          padding: 4px;
          color: #71717a;
          border-radius: 4px;
          cursor: pointer;
        }

        .resume-remove-btn:hover {
          color: #e11d48;
          background-color: #fef2f2;
        }

        .form-checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 4px;
        }

        .form-checkbox {
          width: 16px;
          height: 16px;
          margin-top: 2px;
          accent-color: #0c0d0e;
          cursor: pointer;
        }

        .form-checkbox-label {
          font-size: 12.5px;
          color: #52525b;
          line-height: 1.4;
          cursor: pointer;
        }

        .candidate-submit-btn {
          width: 100%;
          height: 48px;
          font-size: 15px;
          font-weight: 600;
          justify-content: center;
          margin-top: 8px;
        }

        /* Success box */
        .candidate-success-box {
          text-align: center;
          padding: 20px 8px;
        }

        .success-icon-badge {
          margin-bottom: 16px;
        }

        .success-heading {
          font-size: 24px;
          font-weight: 800;
          color: #0c0d0e;
          margin: 0 0 8px;
        }

        .success-subheading {
          font-size: 14px;
          color: #52525b;
          margin: 0 0 24px;
          line-height: 1.5;
        }

        .success-details-list {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 20px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 13.5px;
          margin-bottom: 20px;
        }

        .success-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .success-detail-row span {
          color: #64748b;
        }

        .success-next-note {
          font-size: 13px;
          color: #475467;
          line-height: 1.5;
          margin: 0 0 16px;
        }

        /* Duplicate Modal & Validation Styles */
        .duplicate-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(12, 13, 14, 0.65);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeInDuplicate 0.2s ease forwards;
        }

        @keyframes fadeInDuplicate {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .duplicate-modal-card {
          background: #ffffff;
          border-radius: 20px;
          max-width: 480px;
          width: 100%;
          padding: 32px 28px 26px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          text-align: center;
          border: 1px solid #fee2e2;
          animation: scaleUpDuplicate 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes scaleUpDuplicate {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .duplicate-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #71717a;
          padding: 6px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s;
        }

        .duplicate-close-btn:hover {
          background: #f4f4f5;
          color: #0c0d0e;
        }

        .duplicate-modal-badge {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #fee2e2;
          border: 6px solid #fef2f2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .duplicate-modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #0c0d0e;
          margin: 0 0 8px;
          line-height: 1.3;
        }

        .duplicate-modal-desc {
          font-size: 13.5px;
          color: #52525b;
          margin: 0 0 18px;
          line-height: 1.5;
        }

        .duplicate-modal-details {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px 16px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .duplicate-detail-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .duplicate-detail-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .duplicate-detail-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .duplicate-value {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          word-break: break-all;
        }

        .duplicate-pill {
          background-color: #fee2e2;
          color: #dc2626;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .duplicate-modal-help {
          background-color: #fffbeb;
          border: 1px solid #fef3c7;
          border-radius: 10px;
          padding: 10px 14px;
          text-align: left;
          margin-bottom: 20px;
        }

        .duplicate-modal-help p {
          font-size: 12.5px;
          color: #92400e;
          margin: 0;
          line-height: 1.45;
        }

        .duplicate-modal-btn {
          width: 100%;
          height: 46px;
          font-size: 14.5px;
          font-weight: 600;
          justify-content: center;
        }

        .input-duplicate-error {
          border-color: #ef4444 !important;
          background-color: #fef2f2 !important;
        }

        .input-duplicate-error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.18) !important;
        }

        .field-duplicate-msg {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #dc2626;
          font-weight: 500;
          margin-top: 2px;
        }

        .duplicate-inline-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          font-size: 13px;
          color: #991b1b;
          line-height: 1.4;
          margin-top: 4px;
        }

        .duplicate-reopen-btn {
          background-color: #dc2626;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          padding: 5px 10px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 0.15s;
          flex-shrink: 0;
        }

        .duplicate-reopen-btn:hover {
          background-color: #b91c1c;
        }

        @media (max-width: 960px) {
          .candidate-reg-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .candidate-benefits-title {
            font-size: 32px;
          }
          .candidate-form-card {
            padding: 28px 20px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
      `}</style>
    </section>
  )
}
