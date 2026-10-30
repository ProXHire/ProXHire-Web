import React, { useState, useEffect, useMemo } from 'react'
import { supabase, toJobListing } from '../supabase'
import { INITIAL_BENGALURU_JOBS } from '../constants/bengaluruJobs'
import { JobCard } from '../components/jobs/JobCard'
import { JobFilters, type FilterState } from '../components/jobs/JobFilters'
import { JobDetailsModal } from '../components/jobs/JobDetailsModal'
import { ApplyChecklistModal } from '../components/jobs/ApplyChecklistModal'
import type { JobListing } from '../types/user'
import { ShieldCheck, Briefcase } from 'lucide-react'

interface JobsPageProps {
  onOpenAuth: () => void
  onNavigateDashboard: () => void
  initialCategory?: string
}

export const JobsPage: React.FC<JobsPageProps> = ({
  onOpenAuth,
  onNavigateDashboard,
  initialCategory
}) => {
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_BENGALURU_JOBS)
  const [loading, setLoading] = useState(false)

  // Filters state
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    locality: 'All Bengaluru',
    category: initialCategory || 'All Categories',
    experience: 'All Experience',
    workMode: 'All Work Modes'
  })

  // Selected job for Details Modal & Apply Modal
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)

  // Saved jobs state (persisted to localStorage)
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('proxy_saved_jobs')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (initialCategory) {
      setFilters((prev) => ({ ...prev, category: initialCategory }))
    }
  }, [initialCategory])

  // Fetch published jobs from Supabase and merge with initial seed jobs
  useEffect(() => {
    const fetchLiveJobs = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase.from('jobs').select('*').eq('status', 'PUBLISHED')
        if (error) throw error
        const liveJobs: JobListing[] = (data || []).map(toJobListing)

        if (liveJobs.length > 0) {
          // Combine live jobs + initial seed jobs, avoiding duplicates by id
          const existingIds = new Set(liveJobs.map((j) => j.id))
          const nonDuplicateSeed = INITIAL_BENGALURU_JOBS.filter((j) => !existingIds.has(j.id))
          setJobs([...liveJobs, ...nonDuplicateSeed])
        }
      } catch (err) {
        console.error('Error fetching jobs from Supabase:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLiveJobs()
  }, [])

  const handleToggleSave = (jobId: string) => {
    setSavedJobIds((prev) => {
      const updated = prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
      try {
        localStorage.setItem('proxy_saved_jobs', JSON.stringify(updated))
      } catch {}
      return updated
    })
  }

  const handleResetFilters = () => {
    setFilters({
      keyword: '',
      locality: 'All Bengaluru',
      category: 'All Categories',
      experience: 'All Experience',
      workMode: 'All Work Modes'
    })
  }

  // Filtered Jobs Computation
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Keyword search (title, company, description, skills)
      if (filters.keyword.trim()) {
        const term = filters.keyword.toLowerCase()
        const titleMatch = job.title?.toLowerCase().includes(term)
        const compMatch = job.companyName?.toLowerCase().includes(term)
        const descMatch = job.description?.toLowerCase().includes(term)
        const skillsMatch = job.requiredSkills?.some((s) => s.toLowerCase().includes(term))
        if (!titleMatch && !compMatch && !descMatch && !skillsMatch) return false
      }

      // 2. Bengaluru Locality
      if (filters.locality !== 'All Bengaluru') {
        const locTerm = filters.locality.toLowerCase()
        if (!job.location?.toLowerCase().includes(locTerm)) return false
      }

      // 3. Category
      if (filters.category !== 'All Categories') {
        if (job.category !== filters.category) return false
      }

      // 4. Experience
      if (filters.experience !== 'All Experience') {
        if (!job.experience?.toLowerCase().includes(filters.experience.toLowerCase())) return false
      }

      // 5. Work Mode
      if (filters.workMode !== 'All Work Modes') {
        if (job.workMode !== filters.workMode) return false
      }

      return true
    })
  }, [jobs, filters])

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '90vh', padding: '40px 16px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#dcfce7',
              color: '#166534',
              fontSize: '12px',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '20px',
              marginBottom: '12px'
            }}
          >
            <ShieldCheck size={14} /> 100% Pre-Verified Bengaluru Job Marketplace
          </div>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              marginBottom: '8px'
            }}
          >
            Find Your Next Career Move in Bengaluru
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Direct connections between verified job seekers and authenticated employers. No ghost jobs, no spam.
          </p>
        </div>

        {/* Filters Bar */}
        <JobFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          totalCount={filteredJobs.length}
        />

        {/* Job Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            Loading verified opportunities...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '60px 24px',
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}
          >
            <Briefcase size={40} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              No matching jobs found
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '420px', margin: '0 auto 20px' }}>
              Try broadening your search term or clearing the Bengaluru locality and experience filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '24px'
            }}
          >
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobIds.includes(job.id)}
                onToggleSave={handleToggleSave}
                onSelect={(selected) => {
                  setSelectedJob(selected)
                  setShowDetailsModal(true)
                }}
              />
            ))}
          </div>
        )}

        {/* PRD Page 8: Detailed Job View Modal */}
        <JobDetailsModal
          job={selectedJob}
          isOpen={showDetailsModal}
          isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
          onClose={() => setShowDetailsModal(false)}
          onToggleSave={handleToggleSave}
          onApply={(targetJob) => {
            setShowDetailsModal(false)
            setSelectedJob(targetJob)
            setShowApplyModal(true)
          }}
        />

        {/* PRD Page 9: 1-Click Apply Verification Checklist Modal */}
        <ApplyChecklistModal
          job={selectedJob}
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
          onOpenAuth={onOpenAuth}
          onSuccess={onNavigateDashboard}
        />
      </div>
    </div>
  )
}
