import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'
import type { UserRole, CandidateAccount, RecruiterAccount } from '../types/user'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://api.proxhire.in/api'
)
const TOKEN_KEY = 'proxhire_web_token'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  phoneNumber: string | null
}

interface AuthContextType {
  user: AuthUser | null
  userRole: UserRole | null
  candidateProfile: CandidateAccount | null
  recruiterProfile: RecruiterAccount | null
  loading: boolean
  loginWithEmail: (email: string, pass: string) => Promise<void>
  registerWithEmail: (
    email: string,
    pass: string,
    role: UserRole,
    extraData: { fullName: string; mobileNumber: string; companyName?: string; location?: string }
  ) => Promise<void>
  logout: () => Promise<void>
  refreshProfiles: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const toCandidate = (r: any): CandidateAccount => ({
  id: r.id,
  uid: r.user_id || r.id,
  fullName: r.full_name,
  email: r.email,
  mobileNumber: r.mobile_number || '',
  currentLocation: r.city || 'Bengaluru',
  highestEducation: r.highest_education || 'Graduate',
  workExperience: r.work_experience || '',
  preferredRole: r.preferred_role || '',
  expectedSalary: r.expected_ctc || undefined,
  skills: Array.isArray(r.skills) ? r.skills : [],
  resumeFileName: r.resume_file_name || undefined,
  resumeUrl: r.resume_url || undefined,
  resumeFileType: r.resume_file_type || undefined,
  bgvStatus: r.bgv_status || 'BASIC_VERIFIED',
  registeredAt: r.registered_at,
})

const toRecruiter = (r: any): RecruiterAccount => ({
  id: r.id,
  uid: r.user_id || r.id,
  fullName: r.full_name,
  email: r.email,
  mobileNumber: r.mobile_number || '',
  companyName: r.company_name,
  industry: r.industry || '',
  companySize: r.company_size || '',
  jobRole: r.job_role || 'HR Manager',
  companyWebsite: r.company_website || undefined,
  verificationStatus: r.verification_status || 'PENDING',
  registeredAt: r.registered_at,
})

const apiPost = async (path: string, body: unknown) => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const result = await res.json()
  if (!res.ok || result.success === false) {
    throw new Error(result.message || 'Request failed. Please try again.')
  }
  return result
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [candidateProfile, setCandidateProfile] = useState<CandidateAccount | null>(null)
  const [recruiterProfile, setRecruiterProfile] = useState<RecruiterAccount | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchUserProfile = async (currentUser: AuthUser, role: UserRole) => {
    if (!currentUser.email) return
    try {
      const table = role === 'recruiter' ? 'recruiters' : 'candidates'
      const { data, error } = await supabase.from(table).select('*').eq('email', currentUser.email).maybeSingle()
      if (error) throw error
      if (role === 'recruiter') setRecruiterProfile(data ? toRecruiter(data) : null)
      else setCandidateProfile(data ? toCandidate(data) : null)
    } catch (err) {
      console.error('Error fetching user profile from Supabase:', err)
    }
  }

  const applySession = async (backendUser: any) => {
    const role: UserRole = backendUser.role === 'EMPLOYER' ? 'recruiter' : backendUser.role === 'ADMIN' ? 'admin' : 'candidate'
    const authUser: AuthUser = {
      uid: backendUser.id,
      email: backendUser.email || null,
      displayName: backendUser.fullName || backendUser.candidateProfile?.fullName || backendUser.employerProfile?.recruiterName || null,
      phoneNumber: backendUser.mobile || null,
    }
    setUser(authUser)
    setUserRole(role)
    await fetchUserProfile(authUser, role)
  }

  // Restore session from stored backend JWT
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setLoading(false)
      return
    }
    fetch(`${API_BASE_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(async result => {
        if (result.success && result.user) await applySession(result.user)
        else localStorage.removeItem(TOKEN_KEY)
      })
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false))
  }, [])

  const refreshProfiles = async () => {
    if (user && userRole) {
      await fetchUserProfile(user, userRole)
    }
  }

  // Email Login
  const loginWithEmail = async (email: string, pass: string): Promise<void> => {
    const result = await apiPost('/auth/login', { identifier: email.trim(), password: pass })
    localStorage.setItem(TOKEN_KEY, result.token)
    await applySession(result.user)
  }

  // Email Registration: create the account on the backend, mirror the profile to Supabase, then sign in
  const registerWithEmail = async (
    email: string,
    pass: string,
    role: UserRole,
    extraData: { fullName: string; mobileNumber: string; companyName?: string; location?: string }
  ): Promise<void> => {
    const cleanEmail = email.toLowerCase().trim()
    const mobile = extraData.mobileNumber.replace(/\D/g, '').slice(-10)

    if (role === 'recruiter') {
      const companyName = extraData.companyName || 'Hiring Enterprise'
      await apiPost('/auth/register/employer', {
        companyName,
        recruiterName: extraData.fullName,
        officialEmail: cleanEmail,
        mobile,
        password: pass,
      })
      await supabase.from('recruiters').upsert({
        full_name: extraData.fullName,
        email: cleanEmail,
        mobile_number: mobile,
        normalized_mobile: mobile,
        company_name: companyName,
        job_role: 'Talent Acquisition',
        verification_status: 'PENDING',
      }, { onConflict: 'email' })
    } else {
      await apiPost('/auth/register/candidate', {
        fullName: extraData.fullName,
        email: cleanEmail,
        mobile,
        password: pass,
        currentLocation: extraData.location || 'Bengaluru',
      })
      await supabase.from('candidates').upsert({
        full_name: extraData.fullName,
        email: cleanEmail,
        mobile_number: mobile,
        normalized_mobile: mobile,
        city: extraData.location || 'Bengaluru',
        bgv_status: 'BASIC_VERIFIED',
      }, { onConflict: 'email' })
    }

    await loginWithEmail(cleanEmail, pass)
  }

  // Logout
  const logout = async (): Promise<void> => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
    setUserRole(null)
    setCandidateProfile(null)
    setRecruiterProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        candidateProfile,
        recruiterProfile,
        loading,
        loginWithEmail,
        registerWithEmail,
        logout,
        refreshProfiles
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
