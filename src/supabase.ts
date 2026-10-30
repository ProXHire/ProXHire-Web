import { createClient } from '@supabase/supabase-js'
import type { JobListing, JobApplication } from './types/user'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export const isSupabaseConfigured = (): boolean => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return !(!url || url.includes('placeholder') || !key || key.includes('placeholder'))
}

/**
 * Submit contact inquiry to Supabase 'contact_messages' and 'candidates' tables
 */
export async function submitContactMessageToSupabase(message: {
  name: string
  email: string
  phone?: string
  role?: string
  subject?: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: true }
  }

  try {
    const cleanEmail = message.email.trim().toLowerCase()

    // 1. Insert into contact_messages
    await supabase.from('contact_messages').insert({
      name: message.name.trim(),
      email: cleanEmail,
      phone: message.phone || null,
      role: message.role || 'General Inquiry',
      subject: message.subject || null,
      message: message.message.trim(),
      status: 'new',
    })

    // 2. Also insert tagged row into candidates table for unified Admin viewing
    try {
      await supabase.from('candidates').insert({
        full_name: message.name.trim(),
        email: cleanEmail,
        mobile_number: message.phone || null,
        preferred_role: message.role || 'General Inquiry',
        profile_summary: message.message.trim(),
        is_contact_message: true,
        status: 'new',
      })
    } catch {
      // secondary candidates tag note
    }

    return { success: true }
  } catch (err: any) {
    console.warn('Supabase contact message submit note:', err.message)
    return { success: false, error: err.message }
  }
}

/**
 * Map a Supabase 'jobs' row to the Web JobListing shape
 */
export function toJobListing(r: any): JobListing {
  return {
    id: r.id,
    companyId: r.company_id || '',
    companyName: r.company_name,
    recruiterId: r.recruiter_id || '',
    recruiterName: r.recruiter_name || '',
    title: r.title,
    category: r.category || 'Engineering',
    vacancies: r.vacancies ?? 1,
    description: r.description || '',
    responsibilities: r.responsibilities || undefined,
    requiredSkills: Array.isArray(r.required_skills) ? r.required_skills : [],
    experience: r.experience || '',
    salary: r.salary || '',
    location: r.location || 'Bengaluru',
    workMode: r.work_mode,
    jobType: r.job_type,
    status: r.status,
    isFeatured: r.is_featured,
    isPremium: r.is_premium,
    postedAt: r.posted_at,
    applicantCount: r.applicant_count ?? 0,
  }
}

/**
 * Map a Supabase 'applications' row to the Web JobApplication shape
 */
export function toJobApplication(r: any): JobApplication {
  return {
    id: r.id,
    jobId: r.job_id,
    jobTitle: r.job_title,
    companyName: r.company_name,
    location: r.candidate_location || '',
    salary: '',
    candidateId: r.candidate_id || '',
    candidateName: r.candidate_name,
    candidateEmail: r.candidate_email,
    candidateMobile: r.candidate_mobile || '',
    candidateExperience: r.candidate_experience || '',
    candidateLocation: r.candidate_location || '',
    candidateSkills: [],
    resumeUrl: r.resume_url || undefined,
    resumeFileName: r.resume_file_name || undefined,
    bgvStatus: r.bgv_status || 'BASIC_VERIFIED',
    status: r.status,
    appliedAt: r.applied_at,
    updatedAt: r.updated_at,
    feedbackNotes: r.review_notes || undefined,
  }
}
