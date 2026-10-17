import React, { useState } from 'react'
import {
  User,
  MapPin,
  Briefcase,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Edit2,
  Download,
  X
} from 'lucide-react'

export const CandidateProfileTab: React.FC = () => {
  // Candidate Profile State matching reference design screenshot
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Sree Nandini',
    email: 'sreenandini@example.com',
    mobile: '+91 98765 43210',
    dob: '12 Mar 1998',
    gender: 'Female',
    currentLocation: 'Bangalore, Karnataka',
    preferredLocations: 'Bangalore, Hyderabad'
  })

  const [professionalInfo, setProfessionalInfo] = useState({
    employmentStatus: 'Experienced',
    highestQualification: 'B.Tech',
    fieldOfStudy: 'Computer Science',
    totalExperience: '3 Years',
    currentCompany: 'ABC Technologies',
    preferredJobRoles: 'Software Developer',
    primarySkills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    preferredJobLocations: 'Bangalore, Hyderabad',
    workPreference: 'Hybrid',
    currentSalary: '₹12,00,000 / year',
    expectedSalary: '₹18,00,000 - ₹24,00,000 / year',
    noticePeriod: '30 Days'
  })

  // Edit Modals
  const [editingSection, setEditingSection] = useState<'personal' | 'professional' | 'education' | null>(null)
  const [tempPersonalInfo, setTempPersonalInfo] = useState(personalInfo)
  const [tempProfInfo, setTempProfInfo] = useState(professionalInfo)
  const [newSkillInput, setNewSkillInput] = useState('')
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false)

  const handleSavePersonal = () => {
    setPersonalInfo(tempPersonalInfo)
    setEditingSection(null)
  }

  const handleSaveProf = () => {
    setProfessionalInfo(tempProfInfo)
    setEditingSection(null)
  }

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !tempProfInfo.primarySkills.includes(newSkillInput.trim())) {
      setTempProfInfo(prev => ({
        ...prev,
        primarySkills: [...prev.primarySkills, newSkillInput.trim()]
      }))
      setNewSkillInput('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setTempProfInfo(prev => ({
      ...prev,
      primarySkills: prev.primarySkills.filter(s => s !== skillToRemove)
    }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Profile Hero Banner */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '28px 32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #22c55e',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)',
              flexShrink: 0
            }}
          >
            <img
              src="/images/sree_nandini_avatar_hd.png"
              alt="Sree Nandini"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                {personalInfo.fullName}
              </h1>
              <span
                style={{
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  border: '1px solid #a7f3d0'
                }}
              >
                <ShieldCheck size={13} />
                100% BGV Verified
              </span>
            </div>

            <div style={{ fontSize: '14px', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>
              {professionalInfo.preferredJobRoles} • {professionalInfo.totalExperience} Exp
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="#64748b" />
                <span>{personalInfo.currentLocation}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Briefcase size={14} color="#64748b" />
                <span>{professionalInfo.currentCompany}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={() => setCertificateModalOpen(true)}
            style={{
              backgroundColor: '#ecfdf5',
              border: '1.5px solid #a7f3d0',
              color: '#059669',
              fontSize: '13px',
              fontWeight: 700,
              padding: '10px 18px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShieldCheck size={16} />
            BGV Certificate
          </button>
          <button
            type="button"
            onClick={() => {
              setTempPersonalInfo(personalInfo)
              setEditingSection('personal')
            }}
            style={{
              backgroundColor: '#0f172a',
              border: 'none',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              padding: '10px 18px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Edit2 size={14} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* 2. Personal Information Card (Exact from Step 4 Review Design) */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px 28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f1f5f9', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Personal Information
              </h3>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Your basic identity and contact details
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setTempPersonalInfo(personalInfo)
              setEditingSection('personal')
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Edit2 size={13} />
            Edit
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px'
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Full Name</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{personalInfo.fullName}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Email Address</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{personalInfo.email}</span>
              <span style={{ color: '#16a34a', fontSize: '11px', fontWeight: 700 }}>✓ Verified</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Mobile Number</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{personalInfo.mobile}</span>
              <span style={{ backgroundColor: '#ecfdf5', color: '#059669', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                ✓ Verified
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Date of Birth</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{personalInfo.dob}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Gender</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{personalInfo.gender}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Current Location</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{personalInfo.currentLocation}</div>
          </div>
        </div>
      </div>

      {/* 3. Professional Information Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px 28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f1f5f9', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Professional Information
              </h3>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Your education, experience and preferences
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setTempProfInfo(professionalInfo)
              setEditingSection('professional')
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Edit2 size={13} />
            Edit
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Employment Status</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{professionalInfo.employmentStatus}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Highest Qualification</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{professionalInfo.highestQualification}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Field of Study</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{professionalInfo.fieldOfStudy}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Total Experience</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{professionalInfo.totalExperience}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Current Company</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{professionalInfo.currentCompany}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Preferred Job Roles</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{professionalInfo.preferredJobRoles}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Current Salary</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{professionalInfo.currentSalary}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Expected Salary</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#16a34a' }}>{professionalInfo.expectedSalary}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Notice Period</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{professionalInfo.noticePeriod}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Work Preference</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{professionalInfo.workPreference}</div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Primary Skills</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {professionalInfo.primarySkills.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#1e293b',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '5px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Uploaded & Verified Documents Card (Exact from Reference Image) */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px 28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f1f5f9', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Uploaded Documents
              </h3>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Your identity and verified supporting documents
              </div>
            </div>
          </div>

          <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> 4 of 4 Verified
          </span>
        </div>

        {/* 4 document pills matching screenshot */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}
        >
          {/* Aadhaar Front */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/images/doc_aadhaar_front.png" alt="Aadhaar Front" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Aadhaar - Front</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>JPG • 1.2 MB</div>
            </div>
            <CheckCircle2 size={18} color="#16a34a" />
          </div>

          {/* Aadhaar Back */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/images/doc_aadhaar_back.png" alt="Aadhaar Back" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Aadhaar - Back</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>JPG • 1.1 MB</div>
            </div>
            <CheckCircle2 size={18} color="#16a34a" />
          </div>

          {/* Resume / CV */}
          <div
            onClick={() => setResumePreviewOpen(true)}
            style={{
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}
            title="Click to preview resume"
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', fontWeight: 800, fontSize: '11px' }}>
              PDF
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Resume / CV</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>PDF • 432 KB</div>
            </div>
            <CheckCircle2 size={18} color="#16a34a" />
          </div>

          {/* Profile Photo */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
              <img src="/images/sree_nandini_avatar_hd.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Profile Photo</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>JPG • 320 KB</div>
            </div>
            <CheckCircle2 size={18} color="#16a34a" />
          </div>
        </div>
      </div>

      {/* 5. BGV Certificate Modal */}
      {certificateModalOpen && (
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
              maxWidth: '560px',
              width: '100%',
              padding: '32px',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              border: '2px solid #22c55e'
            }}
          >
            <button
              type="button"
              onClick={() => setCertificateModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <ShieldCheck size={36} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                Proxy Background Verification (BGV) Certificate
              </h2>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                Certificate ID: <strong>BGV-PRX-2026-88194</strong>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Candidate Name:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{personalInfo.fullName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Identity Verification:</span>
                  <span style={{ fontWeight: 700, color: '#16a34a' }}>UIDAI Aadhaar Verified ✓</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Educational Records:</span>
                  <span style={{ fontWeight: 700, color: '#16a34a' }}>VTU Bengaluru Certified ✓</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Prior Employment:</span>
                  <span style={{ fontWeight: 700, color: '#16a34a' }}>ABC Tech HR Verified ✓</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Verified Date:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>02 Oct 2026</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', margin: '0 0 20px 0', lineHeight: 1.5 }}>
              This digitally verified credential enables immediate direct shortlisting across verified employers on ProxHire.
            </p>

            <button
              type="button"
              onClick={() => {
                alert('Certificate downloaded successfully!')
                setCertificateModalOpen(false)
              }}
              style={{
                width: '100%',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Download size={15} />
              Download Official BGV Certificate
            </button>
          </div>
        </div>
      )}

      {/* 6. Resume Preview Modal */}
      {resumePreviewOpen && (
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
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}
          >
            <button
              type="button"
              onClick={() => setResumePreviewOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Candidate Resume / CV Preview
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>
              File: Sree_Nandini_Software_Engineer_CV.pdf (432 KB)
            </p>

            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
              <div><strong>Summary:</strong> Experienced Software Developer with 3 years architecting web applications in React, Node.js, and TypeScript in Bengaluru.</div>
              <div style={{ marginTop: '8px' }}><strong>Status:</strong> Automatically attached to all job applications submitted through ProxHire.</div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setResumePreviewOpen(false)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Resume downloaded!')
                  setResumePreviewOpen(false)
                }}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0f172a', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Personal Info Edit Modal */}
      {editingSection === 'personal' && (
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
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}
          >
            <button
              type="button"
              onClick={() => setEditingSection(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0' }}>
              Edit Personal Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={tempPersonalInfo.fullName}
                  onChange={(e) => setTempPersonalInfo(p => ({ ...p, fullName: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Current Location
                </label>
                <input
                  type="text"
                  value={tempPersonalInfo.currentLocation}
                  onChange={(e) => setTempPersonalInfo(p => ({ ...p, currentLocation: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Preferred Locations
                </label>
                <input
                  type="text"
                  value={tempPersonalInfo.preferredLocations}
                  onChange={(e) => setTempPersonalInfo(p => ({ ...p, preferredLocations: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setEditingSection(null)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePersonal}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0f172a', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Professional Info Edit Modal */}
      {editingSection === 'professional' && (
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
              maxWidth: '540px',
              width: '100%',
              padding: '28px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}
          >
            <button
              type="button"
              onClick={() => setEditingSection(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0' }}>
              Edit Professional Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Preferred Job Roles
                </label>
                <input
                  type="text"
                  value={tempProfInfo.preferredJobRoles}
                  onChange={(e) => setTempProfInfo(p => ({ ...p, preferredJobRoles: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Current Company
                </label>
                <input
                  type="text"
                  value={tempProfInfo.currentCompany}
                  onChange={(e) => setTempProfInfo(p => ({ ...p, currentCompany: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Total Experience
                  </label>
                  <input
                    type="text"
                    value={tempProfInfo.totalExperience}
                    onChange={(e) => setTempProfInfo(p => ({ ...p, totalExperience: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Notice Period
                  </label>
                  <input
                    type="text"
                    value={tempProfInfo.noticePeriod}
                    onChange={(e) => setTempProfInfo(p => ({ ...p, noticePeriod: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Primary Skills
                </label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  {tempProfInfo.primarySkills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: '#eff6ff',
                        color: '#2563eb',
                        fontSize: '12px',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {skill}
                      <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveSkill(skill)} />
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Add a new skill (e.g. Docker, GraphQL)..."
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddSkill()
                      }
                    }}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13px' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    style={{ padding: '8px 14px', borderRadius: '8px', background: '#0f172a', color: '#fff', border: 'none', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setEditingSection(null)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProf}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0f172a', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
