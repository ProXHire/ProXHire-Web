import React, { useState } from 'react'
import {
  User,
  Briefcase,
  FileText,
  Edit2,
  ChevronUp,
  ChevronDown,
  Check,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck
} from 'lucide-react'

interface CandidateRegistrationReviewProps {
  onGoToDashboard?: () => void
  onBackToPreviousStep?: () => void
}

export const CandidateRegistrationReview: React.FC<CandidateRegistrationReviewProps> = ({
  onGoToDashboard,
  onBackToPreviousStep
}) => {
  // Accordion open/collapse states
  const [personalOpen, setPersonalOpen] = useState(true)
  const [professionalOpen, setProfessionalOpen] = useState(true)
  const [documentsOpen, setDocumentsOpen] = useState(true)

  // Stepper state
  const [currentStep, setCurrentStep] = useState<number>(4)

  // Terms agreement state
  const [termsAgreed, setTermsAgreed] = useState(true)

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Editing state for sections
  const [editingSection, setEditingSection] = useState<'personal' | 'professional' | 'documents' | null>(null)

  // Data fields matching the exact design
  const [personalData, setPersonalData] = useState({
    fullName: 'Sree Nandini',
    email: 'sreenandini@example.com',
    mobile: '+91 98765 43210',
    isVerified: true,
    dob: '12 Mar 1998',
    gender: 'Female',
    location: 'Bangalore, Karnataka'
  })

  const [professionalData, setProfessionalData] = useState({
    employmentStatus: 'Experienced',
    highestQualification: 'B.Tech',
    fieldOfStudy: 'Computer Science',
    totalExperience: '3 Years',
    currentCompany: 'ABC Technologies',
    preferredRoles: 'Software Developer',
    primarySkills: 'React, Node.js, JavaScript',
    preferredLocations: 'Bangalore, Hyderabad',
    workPreference: 'Hybrid'
  })

  const handleSubmit = () => {
    if (!termsAgreed) {
      alert('Please confirm and agree to the terms to proceed.')
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccessModal(true)
    }, 800)
  }

  return (
    <div
      className="registration-page-wrapper"
      style={{
        backgroundColor: '#edf3fa',
        minHeight: '100vh',
        padding: '36px 20px 60px',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(380px, 460px) 1fr',
          gap: '32px',
          alignItems: 'stretch'
        }}
        className="registration-review-container"
      >
        {/* ================= LEFT DARK HERO CARD (EXACT MOCKUP CARD) ================= */}
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            backgroundColor: '#0c0d12',
            overflow: 'hidden',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            width: '100%'
          }}
          className="left-hero-card"
        >
          <img
            src="/images/candidate_reg_left_card.png"
            alt="proXHire - Create Your Account. Your Next Opportunity Starts Here."
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '24px'
            }}
            className="left-hero-img"
          />
        </div>

        {/* ================= RIGHT WHITE CARD ================= */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            padding: '40px 48px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          className="right-review-card"
        >
          <div>
            {/* 1. STEPPER */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '680px',
                margin: '0 auto 40px'
              }}
              className="stepper-container"
            >
              {/* Step 1 */}
              <div
                onClick={() => setCurrentStep(1)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px'
                  }}
                >
                  <Check size={18} strokeWidth={2.8} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>
                  Basic Details
                </span>
              </div>

              {/* Connecting Line 1-2 */}
              <div
                style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: '#16a34a',
                  margin: '0 10px',
                  marginBottom: '24px'
                }}
              />

              {/* Step 2 */}
              <div
                onClick={() => setCurrentStep(2)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px'
                  }}
                >
                  <Check size={18} strokeWidth={2.8} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>
                  Professional Details
                </span>
              </div>

              {/* Connecting Line 2-3 */}
              <div
                style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: '#16a34a',
                  margin: '0 10px',
                  marginBottom: '24px'
                }}
              />

              {/* Step 3 */}
              <div
                onClick={() => setCurrentStep(3)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px'
                  }}
                >
                  <Check size={18} strokeWidth={2.8} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>
                  Document Verification
                </span>
              </div>

              {/* Connecting Line 3-4 */}
              <div
                style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: '#16a34a',
                  margin: '0 10px',
                  marginBottom: '24px'
                }}
              />

              {/* Step 4: Active */}
              <div
                onClick={() => setCurrentStep(4)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#0c0d12',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}
                >
                  4
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                  Review &amp; Submit
                </span>
              </div>
            </div>

            {/* 2. TITLE SECTION */}
            <div style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  color: '#0c0d12',
                  letterSpacing: '-0.02em',
                  margin: '0 0 6px 0'
                }}
              >
                Candidate Registration
              </h2>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Step {currentStep} of 4 - Review &amp; Submit
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                Please review your details before submitting. You can go back and edit if needed.
              </p>
            </div>

            {/* 3. ACCORDION REVIEW CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '26px' }}>
              {/* ===== SECTION 1: Personal Information ===== */}
              <div
                style={{
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff'
                }}
              >
                {/* Accordion Header */}
                <div
                  style={{
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff'
                  }}
                  onClick={() => setPersonalOpen(!personalOpen)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0f172a'
                      }}
                    >
                      <User size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                        Personal Information
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '1px' }}>
                        Your basic and contact details
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingSection(editingSection === 'personal' ? null : 'personal')
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'transparent',
                        border: 'none',
                        color: '#0f172a',
                        fontWeight: 600,
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '4px 8px'
                      }}
                    >
                      <Edit2 size={15} />
                      <span style={{ textDecoration: 'underline' }}>Edit</span>
                    </button>
                    <div style={{ color: '#0f172a' }}>
                      {personalOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Accordion Content */}
                {personalOpen && (
                  <div
                    style={{
                      padding: '8px 24px 24px',
                      borderTop: '1px solid #f1f5f9'
                    }}
                  >
                    {editingSection === 'personal' ? (
                      /* Inline Quick Edit Mode */
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '16px',
                          paddingTop: '12px'
                        }}
                      >
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Full Name</label>
                          <input
                            type="text"
                            value={personalData.fullName}
                            onChange={(e) => setPersonalData({ ...personalData, fullName: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Email Address</label>
                          <input
                            type="email"
                            value={personalData.email}
                            onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Mobile Number</label>
                          <input
                            type="text"
                            value={personalData.mobile}
                            onChange={(e) => setPersonalData({ ...personalData, mobile: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Date of Birth</label>
                          <input
                            type="text"
                            value={personalData.dob}
                            onChange={(e) => setPersonalData({ ...personalData, dob: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Gender</label>
                          <input
                            type="text"
                            value={personalData.gender}
                            onChange={(e) => setPersonalData({ ...personalData, gender: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Current Location</label>
                          <input
                            type="text"
                            value={personalData.location}
                            onChange={(e) => setPersonalData({ ...personalData, location: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div style={{ gridColumn: 'span 3', display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setEditingSection(null)}
                            style={{ backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Save Details
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display Mode (3 Columns Grid) */
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          columnGap: '28px',
                          rowGap: '20px',
                          paddingTop: '8px'
                        }}
                        className="info-grid-3cols"
                      >
                        {/* Col 1 */}
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Full Name
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {personalData.fullName}
                          </div>
                        </div>

                        {/* Col 2 */}
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Email Address
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {personalData.email}
                          </div>
                        </div>

                        {/* Col 3 */}
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Mobile Number
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                              {personalData.mobile}
                            </span>
                            {personalData.isVerified && (
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  color: '#16a34a',
                                  backgroundColor: '#dcfce7',
                                  padding: '2px 8px',
                                  borderRadius: '12px'
                                }}
                              >
                                <Check size={12} strokeWidth={3} />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Row 2: Col 1 */}
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Date of Birth
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {personalData.dob}
                          </div>
                        </div>

                        {/* Row 2: Col 2 */}
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Gender
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {personalData.gender}
                          </div>
                        </div>

                        {/* Row 2: Col 3 */}
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Current Location
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {personalData.location}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ===== SECTION 2: Professional Information ===== */}
              <div
                style={{
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff'
                }}
              >
                {/* Header */}
                <div
                  style={{
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff'
                  }}
                  onClick={() => setProfessionalOpen(!professionalOpen)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0f172a'
                      }}
                    >
                      <Briefcase size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                        Professional Information
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '1px' }}>
                        Your education, experience and preferences
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingSection(editingSection === 'professional' ? null : 'professional')
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'transparent',
                        border: 'none',
                        color: '#0f172a',
                        fontWeight: 600,
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '4px 8px'
                      }}
                    >
                      <Edit2 size={15} />
                      <span style={{ textDecoration: 'underline' }}>Edit</span>
                    </button>
                    <div style={{ color: '#0f172a' }}>
                      {professionalOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Content */}
                {professionalOpen && (
                  <div
                    style={{
                      padding: '8px 24px 24px',
                      borderTop: '1px solid #f1f5f9'
                    }}
                  >
                    {editingSection === 'professional' ? (
                      /* Inline Quick Edit Mode */
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '16px',
                          paddingTop: '12px'
                        }}
                      >
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Employment Status</label>
                          <input
                            type="text"
                            value={professionalData.employmentStatus}
                            onChange={(e) => setProfessionalData({ ...professionalData, employmentStatus: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Highest Qualification</label>
                          <input
                            type="text"
                            value={professionalData.highestQualification}
                            onChange={(e) => setProfessionalData({ ...professionalData, highestQualification: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Field of Study</label>
                          <input
                            type="text"
                            value={professionalData.fieldOfStudy}
                            onChange={(e) => setProfessionalData({ ...professionalData, fieldOfStudy: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Total Experience</label>
                          <input
                            type="text"
                            value={professionalData.totalExperience}
                            onChange={(e) => setProfessionalData({ ...professionalData, totalExperience: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Current Company</label>
                          <input
                            type="text"
                            value={professionalData.currentCompany}
                            onChange={(e) => setProfessionalData({ ...professionalData, currentCompany: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Preferred Job Roles</label>
                          <input
                            type="text"
                            value={professionalData.preferredRoles}
                            onChange={(e) => setProfessionalData({ ...professionalData, preferredRoles: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Primary Skills</label>
                          <input
                            type="text"
                            value={professionalData.primarySkills}
                            onChange={(e) => setProfessionalData({ ...professionalData, primarySkills: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Preferred Job Locations</label>
                          <input
                            type="text"
                            value={professionalData.preferredLocations}
                            onChange={(e) => setProfessionalData({ ...professionalData, preferredLocations: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Work Preference</label>
                          <input
                            type="text"
                            value={professionalData.workPreference}
                            onChange={(e) => setProfessionalData({ ...professionalData, workPreference: e.target.value })}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                          />
                        </div>
                        <div style={{ gridColumn: 'span 3', display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setEditingSection(null)}
                            style={{ backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Save Details
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display Mode (3x3 Grid) */
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          columnGap: '28px',
                          rowGap: '20px',
                          paddingTop: '8px'
                        }}
                        className="info-grid-3cols"
                      >
                        {/* Row 1 */}
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Employment Status
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {professionalData.employmentStatus}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Highest Qualification
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {professionalData.highestQualification}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Field of Study
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {professionalData.fieldOfStudy}
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Total Experience
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {professionalData.totalExperience}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Current Company
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {professionalData.currentCompany}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Preferred Job Roles
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {professionalData.preferredRoles}
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Primary Skills
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {professionalData.primarySkills}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Preferred Job Locations
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {professionalData.preferredLocations}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                            Work Preference
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {professionalData.workPreference}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ===== SECTION 3: Uploaded Documents ===== */}
              <div
                style={{
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff'
                }}
              >
                {/* Header */}
                <div
                  style={{
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff'
                  }}
                  onClick={() => setDocumentsOpen(!documentsOpen)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0f172a'
                      }}
                    >
                      <FileText size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                        Uploaded Documents
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '1px' }}>
                        Your identity and supporting documents
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentStep(3)
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'transparent',
                        border: 'none',
                        color: '#0f172a',
                        fontWeight: 600,
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '4px 8px'
                      }}
                    >
                      <Edit2 size={15} />
                      <span style={{ textDecoration: 'underline' }}>Edit</span>
                    </button>
                    <div style={{ color: '#0f172a' }}>
                      {documentsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Content: 4 Document cards */}
                {documentsOpen && (
                  <div
                    style={{
                      padding: '12px 24px 24px',
                      borderTop: '1px solid #f1f5f9'
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '14px'
                      }}
                      className="documents-grid-4cols"
                    >
                      {/* Doc 1: Aadhaar - Front */}
                      <div
                        style={{
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <img
                            src="/images/thumb_aadhaar_front.png"
                            alt="Aadhaar Front"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: '13px',
                              fontWeight: 700,
                              color: '#0f172a',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            Aadhaar - Front
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                            JPG • 1.2 MB
                          </div>
                        </div>
                        <div style={{ color: '#16a34a', flexShrink: 0 }}>
                          <CheckCircle2 size={18} fill="#16a34a" color="#ffffff" />
                        </div>
                      </div>

                      {/* Doc 2: Aadhaar - Back */}
                      <div
                        style={{
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <img
                            src="/images/thumb_aadhaar_back.png"
                            alt="Aadhaar Back"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: '13px',
                              fontWeight: 700,
                              color: '#0f172a',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            Aadhaar - Back
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                            JPG • 1.1 MB
                          </div>
                        </div>
                        <div style={{ color: '#16a34a', flexShrink: 0 }}>
                          <CheckCircle2 size={18} fill="#16a34a" color="#ffffff" />
                        </div>
                      </div>

                      {/* Doc 3: Resume / CV */}
                      <div
                        style={{
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <img
                            src="/images/thumb_resume_pdf.png"
                            alt="Resume PDF"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: '13px',
                              fontWeight: 700,
                              color: '#0f172a',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            Resume / CV
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                            PDF • 432 KB
                          </div>
                        </div>
                        <div style={{ color: '#16a34a', flexShrink: 0 }}>
                          <CheckCircle2 size={18} fill="#16a34a" color="#ffffff" />
                        </div>
                      </div>

                      {/* Doc 4: Profile Photo */}
                      <div
                        style={{
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <img
                            src="/images/sree_nandini_avatar_hd.png"
                            alt="Profile Photo"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: '13px',
                              fontWeight: 700,
                              color: '#0f172a',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            Profile Photo
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                            JPG • 320 KB
                          </div>
                        </div>
                        <div style={{ color: '#16a34a', flexShrink: 0 }}>
                          <CheckCircle2 size={18} fill="#16a34a" color="#ffffff" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 4. TERMS CHECKBOX */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '32px'
              }}
            >
              <input
                type="checkbox"
                id="agree-review-terms"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  accentColor: '#0c0d12',
                  marginTop: '3px',
                  cursor: 'pointer'
                }}
              />
              <label
                htmlFor="agree-review-terms"
                style={{
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                I confirm that the information provided is accurate and complete. I agree to the{' '}
                <a href="#terms" style={{ color: '#0f172a', textDecoration: 'underline' }}>
                  Terms &amp; Conditions
                </a>{' '}
                and{' '}
                <a href="#privacy" style={{ color: '#0f172a', textDecoration: 'underline' }}>
                  Privacy Policy
                </a>{' '}
                and authorize ProXHire to verify my details for account approval.
              </label>
            </div>
          </div>

          {/* 5. ACTION BUTTONS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '20px',
              borderTop: '1px solid #f1f5f9'
            }}
          >
            {/* Back Button */}
            <button
              type="button"
              onClick={() => {
                if (onBackToPreviousStep) {
                  onBackToPreviousStep()
                } else {
                  setCurrentStep(3)
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 36px',
                borderRadius: '9999px',
                border: '1.5px solid #0c0d12',
                backgroundColor: '#ffffff',
                color: '#0c0d12',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              className="btn-back"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {/* Submit for Verification Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 36px',
                borderRadius: '9999px',
                backgroundColor: '#0c0d12',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.8 : 1,
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                transition: 'all 0.15s ease'
              }}
              className="btn-submit-verify"
            >
              {isSubmitting ? (
                <>Submitting Details...</>
              ) : (
                <>
                  Submit for Verification
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(5px)',
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
              borderRadius: '24px',
              maxWidth: '520px',
              width: '100%',
              padding: '36px',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              <ShieldCheck size={38} strokeWidth={2.4} />
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Submitted for Verification!
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
              Your profile documents and application details have been safely received. Our verification team will review your credentials within <strong>24-48 hours</strong>.
            </p>

            <div
              style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '28px',
                textAlign: 'left',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Candidate ID:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>PX-CAND-2026-9842</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Submitted On:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>09 Oct 2026, 03:45 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Status:</span>
                <span style={{ fontWeight: 700, color: '#d97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d97706', display: 'inline-block' }}></span>
                  Under Verification
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false)
                  if (onGoToDashboard) {
                    onGoToDashboard()
                  } else {
                    window.location.hash = '#candidate-dashboard'
                  }
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                Go to Dashboard
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1080px) {
          .registration-review-container {
            grid-template-columns: 1fr !important;
          }
          .left-hero-card {
            min-height: auto !important;
            max-height: none !important;
            width: 100% !important;
            max-width: 520px !important;
            margin: 0 auto !important;
          }
          .left-hero-img {
            width: 100% !important;
            height: auto !important;
            display: block !important;
          }
        }
        @media (max-width: 768px) {
          .left-hero-card {
            min-height: auto !important;
            max-height: none !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 18px !important;
          }
          .left-hero-img {
            width: 100% !important;
            height: auto !important;
            display: block !important;
            border-radius: 18px !important;
          }
          .right-review-card {
            padding: 24px 18px !important;
          }
          .info-grid-3cols {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .documents-grid-4cols {
            grid-template-columns: 1fr 1fr !important;
          }
          .stepper-container {
            overflow-x: auto;
            padding-bottom: 8px;
          }
        }
        @media (max-width: 480px) {
          .registration-page-wrapper {
            padding: 16px 12px 40px !important;
          }
          .documents-grid-4cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
