import React, { useState, useMemo } from 'react'
import {
  Search,
  MapPin,
  Bookmark,
  CheckCircle2,
  X,
  ShieldCheck,
  Send
} from 'lucide-react'
import { CompanyLogo } from '../common/CompanyLogo'

interface CandidateJobsTabProps {
  onSaveJob?: (jobId: string) => void
  savedJobIds?: string[]
  onApplicationSubmit?: (job: any) => void
}

export const CandidateJobsTab: React.FC<CandidateJobsTabProps> = ({
  onSaveJob,
  savedJobIds = [],
  onApplicationSubmit
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocality, setSelectedLocality] = useState('All Bengaluru')
  const [selectedWorkMode, setSelectedWorkMode] = useState('ALL')
  const [selectedExp, setSelectedExp] = useState('ALL')
  const selectedCategory = 'ALL'

  // Selected job for Details Modal
  const [selectedDetailJob, setSelectedDetailJob] = useState<any | null>(null)
  // Selected job for Apply Modal
  const [applyModalJob, setApplyModalJob] = useState<any | null>(null)
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([])
  const [applySuccessMessage, setApplySuccessMessage] = useState<string | null>(null)

  // Full set of authentic Bengaluru Jobs matching PRD & client specs
  const allJobs = [
    {
      id: 'job-swiggy-fe',
      title: 'Senior Frontend Developer (React)',
      company: 'Swiggy',
      logoName: 'swiggy',
      category: 'IT & Software',
      locality: 'Koramangala',
      location: 'Koramangala, Bengaluru',
      workMode: 'Hybrid',
      jobType: 'Full-time',
      experience: '2 - 5 Years',
      expCategory: 'MID',
      salary: '₹22,00,000 - ₹28,00,000 / yr',
      vacancies: 4,
      isFeatured: true,
      posted: '1 day ago',
      description: 'Own user-facing components, state architecture, and micro-frontend integrations for millions of food orders daily.',
      responsibilities: [
        'Build reactive and high performance client web interfaces in React 19 & TypeScript.',
        'Collaborate with UX designers and backend service teams.',
        'Maintain >99.9% crash-free uptime and sub-second page rendering.'
      ],
      skills: ['React', 'TypeScript', 'Redux / Zustand', 'Web Vitals']
    },
    {
      id: 'job-google-swe',
      title: 'Software Engineer - Cloud Systems',
      company: 'Google',
      logoName: 'google',
      category: 'IT & Software',
      locality: 'Manyata Tech Park',
      location: 'Manyata Tech Park, Bengaluru',
      workMode: 'In-Office',
      jobType: 'Full-time',
      experience: '1 - 4 Years',
      expCategory: 'MID',
      salary: '₹28,00,000 - ₹38,00,000 / yr',
      vacancies: 6,
      isFeatured: true,
      posted: '2 days ago',
      description: 'Build robust distributed backends and reliable APIs serving millions of concurrent enterprise queries across cloud networks.',
      responsibilities: [
        'Design scalable distributed data pipelines and gRPC services.',
        'Optimize low-latency database queries in Spanner and BigQuery.',
        'Write unit tests, automated CI/CD pipelines, and observability monitors.'
      ],
      skills: ['Node.js', 'Go / Python', 'Distributed Systems', 'GCP']
    },
    {
      id: 'job-adobe-pe',
      title: 'Product Engineer - Design Cloud',
      company: 'Adobe',
      logoName: 'adobe',
      category: 'IT & Software',
      locality: 'Whitefield',
      location: 'Whitefield, Bengaluru',
      workMode: 'Hybrid',
      jobType: 'Full-time',
      experience: '2 - 6 Years',
      expCategory: 'MID',
      salary: '₹24,00,000 - ₹32,00,000 / yr',
      vacancies: 3,
      isFeatured: true,
      posted: '3 days ago',
      description: 'Develop next-generation web creation tools and Canvas performance layers for Adobe Creative Cloud applications.',
      responsibilities: [
        'Implement complex WebAssembly and WebGL canvas renderers.',
        'Ensure rigorous cross-browser compatibility and accessibility compliance.',
        'Participate in agile sprint ceremonies and code quality reviews.'
      ],
      skills: ['JavaScript / TS', 'WebGL / Canvas', 'React', 'CSS Architecture']
    },
    {
      id: 'job-zoho-be',
      title: 'Backend Developer (Java & PostgreSQL)',
      company: 'Zoho',
      logoName: 'zoho',
      category: 'IT & Software',
      locality: 'HSR Layout',
      location: 'HSR Layout, Bengaluru',
      workMode: 'In-Office',
      jobType: 'Full-time',
      experience: '1 - 3 Years',
      expCategory: 'ENTRY',
      salary: '₹14,00,000 - ₹18,00,000 / yr',
      vacancies: 5,
      isFeatured: false,
      posted: '4 days ago',
      description: 'Architect scalable web services and database schemas powering Zoho business suite for 100M+ global users.',
      responsibilities: [
        'Develop secure RESTful API endpoints for multi-tenant applications.',
        'Perform database index tuning and query query plan optimizations.',
        'Ensure PCI-DSS and SOC2 compliance across storage layers.'
      ],
      skills: ['Java', 'PostgreSQL', 'RESTful APIs', 'Redis']
    },
    {
      id: 'job-zepto-cs',
      title: 'Customer Support Executive (Voice & Chat)',
      company: 'Zepto',
      logoName: 'zepto',
      category: 'Customer Support',
      locality: 'Koramangala',
      location: 'Koramangala, Bengaluru',
      workMode: 'In-Office',
      jobType: 'Full-time',
      experience: 'Fresher / 0 - 2 Years',
      expCategory: 'FRESHER',
      salary: '₹18,000 – ₹25,000 / mo',
      vacancies: 10,
      isFeatured: false,
      posted: 'Just now',
      description: 'Provide quick, helpful resolutions for customer delivery queries and maintain top-notch satisfaction scores.',
      responsibilities: [
        'Answer live chat queries and dispatch coordination calls.',
        'Handle refund authorizations according to operational policies.',
        'Log feedback in Zendesk CRM to identify recurring order hiccups.'
      ],
      skills: ['English & Hindi', 'Active Listening', 'CRM Ticketing', 'Chat Support']
    },
    {
      id: 'job-fingrow-sales',
      title: 'Sales & Business Development Associate',
      company: 'FinGrow',
      logoName: 'fingrow',
      category: 'Sales & BD',
      locality: 'Electronic City',
      location: 'Electronic City, Bengaluru',
      workMode: 'In-Office',
      jobType: 'Full-time',
      experience: '1 - 3 Years',
      expCategory: 'ENTRY',
      salary: '₹22,00,000 - ₹32,000 / mo + Incentives',
      vacancies: 6,
      isFeatured: false,
      posted: '5 days ago',
      description: 'Engage local merchants and tech park establishments to onboard fintech payment services and SME growth loans.',
      responsibilities: [
        'Conduct field visits and merchant relationship meetings.',
        'Assist business owners with KYC and compliance submission.',
        'Achieve quarterly disbursement and merchant retention targets.'
      ],
      skills: ['B2B Sales', 'Negotiation', 'Kannada & English', 'Merchant Onboarding']
    },
    {
      id: 'job-cloudops-it',
      title: 'IT Helpdesk & Systems Administrator',
      company: 'CloudOps',
      logoName: 'cloudops',
      category: 'IT Support',
      locality: 'Indiranagar',
      location: 'Indiranagar, Bengaluru',
      workMode: 'In-Office',
      jobType: 'Full-time',
      experience: '1 - 4 Years',
      expCategory: 'ENTRY',
      salary: '₹25,000 - ₹35,000 / mo',
      vacancies: 3,
      isFeatured: false,
      posted: '6 days ago',
      description: 'Support internal engineering teams with hardware provisioning, Azure AD access management, and VPN connectivity.',
      responsibilities: [
        'Deploy macOS and Windows developer workstations with MDM profiles.',
        'Troubleshoot Cisco networking hardware and firewall permissions.',
        'Maintain internal asset registers and software license compliance.'
      ],
      skills: ['Azure AD', 'Windows / macOS', 'Networking / VPN', 'ITSM']
    },
    {
      id: 'job-amazon-hr',
      title: 'Talent Acquisition Coordinator',
      company: 'Amazon',
      logoName: 'amazon',
      category: 'HR & Admin',
      locality: 'Whitefield',
      location: 'Whitefield, Bengaluru',
      workMode: 'Hybrid',
      jobType: 'Full-time',
      experience: '1 - 3 Years',
      expCategory: 'ENTRY',
      salary: '₹6,50,000 - ₹9,00,000 / yr',
      vacancies: 2,
      isFeatured: true,
      posted: '3 days ago',
      description: 'Coordinate candidate interview loops and ensure an exemplary onboarding journey for Bengaluru tech campus recruits.',
      responsibilities: [
        'Schedule technical interview panels across global timezones.',
        'Audit Background Verification (BGV) checks for incoming hires.',
        'Partner with HR business partners on offer generation and day-1 orientation.'
      ],
      skills: ['Candidate Coordination', 'ATS Workflows', 'Background Verification', 'HR Operations']
    }
  ]

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // Locality filter
      if (selectedLocality !== 'All Bengaluru' && !job.locality.includes(selectedLocality)) {
        return false
      }
      // Work mode
      if (selectedWorkMode !== 'ALL' && job.workMode.toLowerCase() !== selectedWorkMode.toLowerCase()) {
        return false
      }
      // Experience
      if (selectedExp !== 'ALL' && job.expCategory !== selectedExp) {
        return false
      }
      // Category
      if (selectedCategory !== 'ALL' && job.category !== selectedCategory) {
        return false
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesTitle = job.title.toLowerCase().includes(q)
        const matchesComp = job.company.toLowerCase().includes(q)
        const matchesLoc = job.location.toLowerCase().includes(q)
        const matchesSkills = job.skills.some(s => s.toLowerCase().includes(q))
        if (!matchesTitle && !matchesComp && !matchesLoc && !matchesSkills) return false
      }
      return true
    })
  }, [allJobs, selectedLocality, selectedWorkMode, selectedExp, selectedCategory, searchQuery])

  const handleApplyClick = (job: any) => {
    setApplyModalJob(job)
  }

  const handleConfirmApplication = () => {
    if (applyModalJob) {
      setAppliedJobIds(prev => [...prev, applyModalJob.id])
      setApplySuccessMessage(`Application submitted for ${applyModalJob.title} at ${applyModalJob.company}!`)
      if (onApplicationSubmit) {
        onApplicationSubmit(applyModalJob)
      }
      setTimeout(() => {
        setApplyModalJob(null)
      }, 1200)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header with Search Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Find Verified Jobs in Bengaluru
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Every company and job posting is 100% verified by Proxy Services to prevent spam and ghost listings.
          </p>
        </div>

        {/* Search input bar */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }}
            />
            <input
              type="text"
              placeholder="Search by job title, skill (e.g. React, Node.js, B2B Sales), or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: '12px',
                border: '1.5px solid #e2e8f0',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#f8fafc',
                color: '#0f172a'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1.5px solid #e2e8f0',
                backgroundColor: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Work Modes</option>
              <option value="In-Office">In-Office</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1.5px solid #e2e8f0',
                backgroundColor: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Experience</option>
              <option value="FRESHER">Fresher (0 - 1 yr)</option>
              <option value="ENTRY">Entry (1 - 3 yrs)</option>
              <option value="MID">Mid (3 - 6 yrs)</option>
            </select>
          </div>
        </div>

        {/* Bengaluru Locality Filter Pills */}
        <div style={{ marginTop: '18px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Bengaluru Tech Hubs &amp; Localities:
          </div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {['All Bengaluru', 'Koramangala', 'HSR Layout', 'Whitefield', 'Indiranagar', 'Manyata Tech Park', 'Electronic City'].map((loc) => {
              const active = selectedLocality === loc
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setSelectedLocality(loc)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: active ? 700 : 500,
                    backgroundColor: active ? '#0f172a' : '#f1f5f9',
                    color: active ? '#ffffff' : '#475569',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {loc}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 2. Job Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
          Showing <span style={{ color: '#2563eb' }}>{filteredJobs.length}</span> verified vacancies
        </div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          Direct Recruiter Access • Free for Candidates
        </div>
      </div>

      {/* 3. Job Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px'
        }}
      >
        {filteredJobs.map((job) => {
          const isApplied = appliedJobIds.includes(job.id)
          const isSaved = savedJobIds.includes(job.id)

          return (
            <div
              key={job.id}
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
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              className="job-card-hover"
            >
              <div>
                {/* Header: Logo, Company, Title, Bookmark */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CompanyLogo name={job.logoName} size={46} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                          {job.company}
                        </span>
                        <span
                          style={{
                            fontSize: '10px',
                            backgroundColor: '#ecfdf5',
                            color: '#059669',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          <ShieldCheck size={11} /> Verified
                        </span>
                      </div>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
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
                    <Bookmark size={19} fill={isSaved ? '#f59e0b' : 'none'} />
                  </button>
                </div>

                {/* Details Pills: Location, Work Mode, Experience, Salary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569' }}>
                    <MapPin size={14} color="#64748b" />
                    <span>{job.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px', color: '#475569', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{job.salary}</span>
                    <span>•</span>
                    <span>{job.experience}</span>
                    <span>•</span>
                    <span style={{ backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                      {job.workMode}
                    </span>
                  </div>
                </div>

                {/* Description Snippet */}
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                  {job.description}
                </p>

                {/* Skills tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#334155',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Posted date & CTA buttons */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '14px',
                  borderTop: '1px solid #f1f5f9'
                }}
              >
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {job.posted}
                </span>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedDetailJob(job)}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#475569',
                      fontWeight: 600,
                      fontSize: '12px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyClick(job)}
                    disabled={isApplied}
                    style={{
                      backgroundColor: isApplied ? '#f1f5f9' : '#0f172a',
                      color: isApplied ? '#64748b' : '#ffffff',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '12px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: isApplied ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 size={13} color="#16a34a" /> Applied
                      </>
                    ) : (
                      'Easy Apply'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 4. Job Details Modal */}
      {selectedDetailJob && (
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
              maxWidth: '620px',
              width: '100%',
              padding: '30px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedDetailJob(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
              <CompanyLogo name={selectedDetailJob.logoName} size={54} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>{selectedDetailJob.company}</span>
                  <span style={{ fontSize: '11px', backgroundColor: '#ecfdf5', color: '#059669', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                    Verified Employer ✓
                  </span>
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                  {selectedDetailJob.title}
                </h2>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Salary Package</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{selectedDetailJob.salary}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Location</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{selectedDetailJob.location}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Work Mode</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{selectedDetailJob.workMode}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Vacancies</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{selectedDetailJob.vacancies} Openings</div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Job Overview</h4>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                {selectedDetailJob.description}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Key Responsibilities</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                {selectedDetailJob.responsibilities.map((r: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>{r}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Skills &amp; Qualifications</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedDetailJob.skills.map((s: string, idx: number) => (
                  <span key={idx} style={{ backgroundColor: '#eff6ff', color: '#2563eb', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setSelectedDetailJob(null)}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const j = selectedDetailJob
                  setSelectedDetailJob(null)
                  handleApplyClick(j)
                }}
                style={{ flex: 2, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Proceed to Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Easy Apply Confirmation Modal */}
      {applyModalJob && (
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
              maxWidth: '500px',
              width: '100%',
              padding: '28px',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}
          >
            <button
              type="button"
              onClick={() => setApplyModalJob(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Send size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                Apply to {applyModalJob.company}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Role: <strong>{applyModalJob.title}</strong>
              </p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                Application Checklist (Auto-Filled from Profile):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>Verified Profile: <strong>Sree Nandini</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>Resume Attached: <strong>Resume_CV.pdf (432 KB)</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>100% Background Verification (BGV) Stamp Included</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>Contact: <strong>+91 98765 43210 (Verified)</strong></span>
                </div>
              </div>
            </div>

            {applySuccessMessage ? (
              <div style={{ padding: '12px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '10px', fontSize: '13px', fontWeight: 700, textAlign: 'center', marginBottom: '16px' }}>
                {applySuccessMessage}
              </div>
            ) : null}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setApplyModalJob(null)}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmApplication}
                disabled={Boolean(applySuccessMessage)}
                style={{ flex: 2, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Confirm &amp; Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hover animations */}
      <style>{`
        .job-card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -4px rgba(0,0,0,0.08) !important;
          border-color: #cbd5e1 !important;
        }
      `}</style>
    </div>
  )
}
