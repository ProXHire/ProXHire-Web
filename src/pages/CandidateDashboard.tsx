import React, { useState, useMemo } from 'react'
import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  Calendar,
  User,
  BarChart2,
  Bell,
  Settings,
  Crown,
  ArrowRight,
  MapPin,
  ChevronDown,
  MoreHorizontal,
  ChevronRight,
  Check,
  CheckCircle2,
  XCircle,
  Briefcase,
  MessageSquare,
  Star,
  Lightbulb,
  Mail,
  Zap,
  Sliders,
  MailCheck,
  HelpCircle,
  Sparkles,
  Megaphone,
  X,
  Target,
  LogOut,
  Palette,
  Lock,
  Eye,
  EyeOff,
  Download,
  Trash2,
  Shield,
  Phone,
  Laptop,
  Smartphone,
  GraduationCap,
  Camera,
  Pencil,
  Upload,
  ExternalLink
} from 'lucide-react'
import { CompanyLogo } from '../components/common/CompanyLogo'
import { useAuth } from '../context/AuthContext'

interface CandidateDashboardProps {
  onBrowseJobs?: () => void
  initialTab?: DashboardSidebarTab
}

type DashboardSidebarTab =
  | 'dashboard'
  | 'jobs'
  | 'applications'
  | 'saved'
  | 'interviews'
  | 'profile'
  | 'skills'
  | 'notifications'
  | 'settings'

type ApplicationFilter = 'ALL' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW' | 'OFFERED' | 'REJECTED'
type NotificationFilter = 'ALL' | 'UPDATES' | 'INTERVIEWS' | 'ALERTS' | 'MESSAGES' | 'PROFILE'
type SavedJobFilter = 'ALL' | 'FULL_TIME' | 'REMOTE' | 'HYBRID' | 'ON_SITE'

export const CandidateDashboard: React.FC<CandidateDashboardProps> = ({ onBrowseJobs, initialTab }) => {
  const { user, candidateProfile, logout } = useAuth()

  // Sidebar navigation state: syncs with hash or initialTab
  const [activeSidebarTab, setActiveSidebarTab] = useState<DashboardSidebarTab>(() => {
    const hash = window.location.hash.toLowerCase()
    if (hash === '#settings' || hash === '#candidate-settings') return 'settings'
    if (hash === '#applications' || hash === '#my-applications') return 'applications'
    if (hash === '#saved-jobs' || hash === '#saved') return 'saved'
    if (hash === '#notifications') return 'notifications'
    if (hash === '#profile' || hash === '#candidate-profile') return 'profile'
    return initialTab || 'dashboard'
  })

  // Sync with window.location.hash changes
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#settings' || hash === '#candidate-settings') {
        setActiveSidebarTab('settings')
      } else if (hash === '#applications' || hash === '#my-applications') {
        setActiveSidebarTab('applications')
      } else if (hash === '#saved-jobs' || hash === '#saved') {
        setActiveSidebarTab('saved')
      } else if (hash === '#notifications') {
        setActiveSidebarTab('notifications')
      } else if (hash === '#profile' || hash === '#candidate-profile') {
        setActiveSidebarTab('profile')
      } else if (hash === '#candidate-dashboard') {
        setActiveSidebarTab('dashboard')
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Top header search query
  const [topSearchQuery, setTopSearchQuery] = useState('')

  // User profile dropdown toggle
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  // ================= SETTINGS VIEW DATA =================
  const [settingsSubTab, setSettingsSubTab] = useState<'account' | 'notifications' | 'preferences' | 'privacy' | 'appearance'>('account')
  const [settingsForm, setSettingsForm] = useState({
    fullName: 'Sree Nandini',
    email: 'sreenandini@example.com',
    mobileNumber: '98765 43210',
    altMobileNumber: '',
    countryCode: '+91',
    isMobileVerified: true
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Settings Interactive Modals & Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false)
  const [newEmailInput, setNewEmailInput] = useState('')
  const [emailPasswordInput, setEmailPasswordInput] = useState('')

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [downloadIncludeResume, setDownloadIncludeResume] = useState(true)
  const [downloadIncludeApplications, setDownloadIncludeApplications] = useState(true)
  const [downloadIncludeSavedJobs, setDownloadIncludeSavedJobs] = useState(true)

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
  const [deactivateReason, setDeactivateReason] = useState('Taking a break from job hunting')

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false)
  const [supportCategory, setSupportCategory] = useState('Account & Login')
  const [supportSubject, setSupportSubject] = useState('')
  const [supportMessage, setSupportMessage] = useState('')

  const [isCompleteProfileModalOpen, setIsCompleteProfileModalOpen] = useState(false)
  const [profileCompletionScore, setProfileCompletionScore] = useState(80)

  // Sub-tabs specific data
  const [jobPrefForm, setJobPrefForm] = useState({
    roles: ['Frontend Developer', 'React Developer', 'Full Stack Engineer'],
    newRoleInput: '',
    locations: ['Bangalore, Karnataka', 'Hyderabad, Telangana', 'Remote'],
    newLocationInput: '',
    workMode: 'Hybrid' as 'On-site' | 'Hybrid' | 'Remote',
    minSalary: '12',
    maxSalary: '25',
    noticePeriod: '30 Days'
  })

  const [privacySettings, setPrivacySettings] = useState({
    visibility: 'public' as 'public' | 'anonymous' | 'private',
    twoFactor: true,
    searchEngineIndexing: false
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light' as 'light' | 'dark' | 'system',
    density: 'comfortable' as 'comfortable' | 'compact',
    highContrast: false
  })

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev))
    }, 3500)
  }

  // ================= PROFILE VIEW DATA & MODAL STATES =================
  const [profileSubTab, setProfileSubTab] = useState<'personal' | 'professional' | 'skills' | 'documents' | 'account'>('personal')
  const [isEditHeroModalOpen, setIsEditHeroModalOpen] = useState(false)
  const [isEditPersonalModalOpen, setIsEditPersonalModalOpen] = useState(false)
  const [isEditEducationModalOpen, setIsEditEducationModalOpen] = useState(false)
  const [isEditExperienceModalOpen, setIsEditExperienceModalOpen] = useState(false)
  const [isViewPublicProfileModalOpen, setIsViewPublicProfileModalOpen] = useState(false)
  const [isUploadDocModalOpen, setIsUploadDocModalOpen] = useState(false)
  const [isSkillAssessmentModalOpen, setIsSkillAssessmentModalOpen] = useState(false)

  // Candidate Profile Data
  const [candidateProfileData, setCandidateProfileData] = useState({
    fullName: 'Sree Nandini',
    role: 'Software Developer',
    gender: 'Female',
    email: 'sreenandini@example.com',
    currentLocation: 'Bangalore, Karnataka',
    mobileNumber: '+91 98765 43210',
    isMobileVerified: true,
    alternateContact: '-',
    dateOfBirth: '12 Mar 1998',
    nationality: 'Indian',
    avatarUrl: '/images/sree_nandini_avatar_hd.png',
    bio: 'Software Developer with 3+ years of experience specializing in building responsive web applications, modern React architecture, and performant user interfaces.',
    education: [
      {
        id: 'edu-1',
        qualification: 'B.Tech',
        course: 'Computer Science',
        university: 'RV College of Engineering',
        year: '2020',
        percentage: '8.6 CGPA'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        company: 'ABC Technologies',
        jobTitle: 'Software Developer',
        duration: 'Jan 2021 – Present',
        durationSub: '(3 Years)',
        workType: 'Full-time',
        location: 'Bangalore, Karnataka'
      }
    ]
  })

  // Staged edit forms
  const [editingHeroForm, setEditingHeroForm] = useState({
    fullName: 'Sree Nandini',
    role: 'Software Developer',
    currentLocation: 'Bangalore, Karnataka',
    email: 'sreenandini@example.com',
    mobileNumber: '+91 98765 43210'
  })

  const [editingPersonalForm, setEditingPersonalForm] = useState({
    fullName: 'Sree Nandini',
    gender: 'Female',
    email: 'sreenandini@example.com',
    currentLocation: 'Bangalore, Karnataka',
    mobileNumber: '+91 98765 43210',
    alternateContact: '-',
    dateOfBirth: '12 Mar 1998',
    nationality: 'Indian'
  })

  const [editingEducationForm, setEditingEducationForm] = useState({
    qualification: 'B.Tech',
    course: 'Computer Science',
    university: 'RV College of Engineering',
    year: '2020',
    percentage: '8.6 CGPA'
  })

  const [editingExperienceForm, setEditingExperienceForm] = useState({
    company: 'ABC Technologies',
    jobTitle: 'Software Developer',
    duration: 'Jan 2021 – Present',
    durationSub: '(3 Years)',
    workType: 'Full-time',
    location: 'Bangalore, Karnataka'
  })

  // ================= 1. DASHBOARD OVERVIEW DATA =================
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Record<string, boolean>>({
    'rec-amazon': false,
    'rec-google': true,
    'rec-microsoft': false,
    'rec-zoho': false
  })

  const toggleBookmark = (id: string) => {
    setBookmarkedJobs(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Recommended Jobs on Dashboard View
  const recommendedJobs = [
    {
      id: 'rec-amazon',
      role: 'Frontend Developer',
      company: 'Amazon',
      location: 'Bangalore, Karnataka',
      experience: '2-5 Years',
      type: 'Full-time',
      workMode: 'On-site',
      salary: '₹ 12 – 18 LPA',
      matchScore: '92%',
      logoName: 'amazon'
    },
    {
      id: 'rec-google',
      role: 'Software Engineer',
      company: 'Google',
      location: 'Hyderabad, Telangana',
      experience: '1-4 Years',
      type: 'Full-time',
      workMode: 'Hybrid',
      salary: '₹ 15 – 28 LPA',
      matchScore: '89%',
      logoName: 'google'
    },
    {
      id: 'rec-microsoft',
      role: 'Full Stack Developer',
      company: 'Microsoft',
      location: 'Bengaluru, Karnataka',
      experience: '2-6 Years',
      type: 'Full-time',
      workMode: 'Hybrid',
      salary: '₹ 14 – 25 LPA',
      matchScore: '86%',
      logoName: 'microsoft'
    },
    {
      id: 'rec-zoho',
      role: 'Software Developer',
      company: 'Zoho',
      location: 'Chennai, Tamil Nadu',
      experience: '1-3 Years',
      type: 'Full-time',
      workMode: 'On-site',
      salary: '₹ 8 – 14 LPA',
      matchScore: '82%',
      logoName: 'zoho'
    }
  ]

  // Recent Applications on Dashboard View
  const recentApplicationsSummary = [
    {
      id: 'recent-1',
      role: 'Product Engineer',
      company: 'Adobe',
      logoName: 'adobe',
      status: 'Under Review',
      statusBg: '#e0f2fe',
      statusText: '#0284c7',
      date: '08 Oct 2026'
    },
    {
      id: 'recent-2',
      role: 'Frontend Developer',
      company: 'Swiggy',
      logoName: 'swiggy',
      status: 'Shortlisted',
      statusBg: '#dcfce7',
      statusText: '#16a34a',
      date: '05 Oct 2026'
    },
    {
      id: 'recent-3',
      role: 'Software Developer',
      company: 'Zoho',
      logoName: 'zoho',
      status: 'Applied',
      statusBg: '#f1f5f9',
      statusText: '#475569',
      date: '02 Oct 2026'
    },
    {
      id: 'recent-4',
      role: 'Backend Developer',
      company: 'PhonePe',
      logoName: 'phonepe',
      status: 'Rejected',
      statusBg: '#fee2e2',
      statusText: '#dc2626',
      date: '28 Sep 2026'
    }
  ]

  // ================= 2. APPLICATIONS VIEW DATA =================
  const [appFilter, setAppFilter] = useState<ApplicationFilter>('ALL')
  const [appSearchQuery, setAppSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [sortBy, setSortBy] = useState('Latest Applied')

  // Modal detail states
  const [activeModalApp, setActiveModalApp] = useState<any | null>(null)
  const [activeModalType, setActiveModalType] = useState<'details' | 'feedback' | 'offer' | null>(null)

  const applications = [
    {
      id: 'app-adobe',
      role: 'Product Engineer',
      company: 'Adobe',
      logoName: 'adobe',
      location: 'Bangalore, Karnataka',
      type: 'Full-time',
      experience: '2 - 5 Years',
      appliedDate: '08 Oct 2026',
      status: 'UNDER_REVIEW' as const,
      statusLabel: 'Under Review',
      statusTheme: { bg: '#e0f2fe', text: '#0284c7' },
      currentStage: 2,
      details: {
        salary: '₹24,00,000 - ₹32,00,000 / year',
        department: 'Creative Cloud Core Engineering',
        jobId: 'ADB-99412',
        notes: 'Resume successfully passed initial automated screening. Under technical hiring manager review.'
      }
    },
    {
      id: 'app-google',
      role: 'Software Engineer',
      company: 'Google',
      logoName: 'google',
      location: 'Hyderabad, Telangana',
      type: 'Full-time',
      experience: '1 - 4 Years',
      appliedDate: '05 Oct 2026',
      status: 'SHORTLISTED' as const,
      statusLabel: 'Shortlisted',
      statusTheme: { bg: '#dcfce7', text: '#16a34a' },
      details: {
        salary: '₹28,00,000 - ₹38,00,000 / year',
        department: 'Search & Assistant Platform',
        jobId: 'GOOG-88410',
        notes: 'Profile shortlisted for technical coding interview round. Recruiter will coordinate slots.'
      }
    },
    {
      id: 'app-swiggy',
      role: 'Frontend Developer',
      company: 'Swiggy',
      logoName: 'swiggy',
      location: 'Bangalore, Karnataka',
      type: 'Full-time',
      experience: '2 - 6 Years',
      appliedDate: '28 Sep 2026',
      status: 'INTERVIEW' as const,
      statusLabel: 'Interview Scheduled',
      statusTheme: { bg: '#f3e8ff', text: '#7e22ce' },
      interviewInfo: 'Interview on 12 Oct 2026 • 10:00 AM',
      details: {
        salary: '₹20,00,000 - ₹26,00,000 / year',
        department: 'Consumer Apps Experience Team',
        jobId: 'SWIG-54219',
        notes: 'Google Meet link sent to your registered email. Topic: Advanced React & Web Performance.'
      }
    },
    {
      id: 'app-microsoft',
      role: 'Product Designer',
      company: 'Microsoft',
      logoName: 'microsoft',
      location: 'Bangalore, Karnataka',
      type: 'Full-time',
      experience: '3 - 6 Years',
      appliedDate: '24 Sep 2026',
      status: 'REJECTED' as const,
      statusLabel: 'Rejected',
      statusTheme: { bg: '#fee2e2', text: '#dc2626' },
      feedbackNotice: 'Not a match at this time. Keep exploring!',
      details: {
        feedback: 'We were impressed with your portfolio, but opted for candidates with specialized Fluent 2 enterprise design systems experience. We encourage you to apply for future design openings.'
      }
    },
    {
      id: 'app-zoho',
      role: 'Backend Developer',
      company: 'Zoho',
      logoName: 'zoho',
      location: 'Chennai, Tamil Nadu',
      type: 'Full-time',
      experience: '1 - 3 Years',
      appliedDate: '18 Sep 2026',
      status: 'OFFERED' as const,
      statusLabel: 'Offered',
      statusTheme: { bg: '#d1fae5', text: '#059669' },
      offerNotice: 'Congratulations! Offer letter will be shared soon.',
      details: {
        salary: '₹14,50,000 / year CTC + Annual Bonus',
        joiningDate: '01 Nov 2026',
        location: 'Zoho Estancia Campus, Chennai',
        notes: 'Official digital offer document is prepared. Click View Offer to preview details.'
      }
    }
  ]

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (appFilter !== 'ALL' && app.status !== appFilter) return false
      if (selectedLocation !== 'All Locations' && !app.location.includes(selectedLocation)) return false
      if (appSearchQuery.trim()) {
        const q = appSearchQuery.toLowerCase()
        const matchesRole = app.role.toLowerCase().includes(q)
        const matchesCompany = app.company.toLowerCase().includes(q)
        const matchesLoc = app.location.toLowerCase().includes(q)
        if (!matchesRole && !matchesCompany && !matchesLoc) return false
      }
      return true
    })
  }, [applications, appFilter, selectedLocation, appSearchQuery])

  // ================= 3. SAVED JOBS VIEW DATA =================
  const [savedJobFilter, setSavedJobFilter] = useState<SavedJobFilter>('ALL')
  const [jobAlertsEnabled, setJobAlertsEnabled] = useState(true)

  const savedJobsList = [
    {
      id: 'saved-1',
      role: 'Frontend Developer',
      company: 'Amazon',
      location: 'Bangalore, Karnataka',
      experience: '2 – 5 Years',
      type: 'FULL_TIME' as const,
      typeLabel: 'Full-time',
      workMode: 'On-site',
      tags: ['React', 'TypeScript', 'Next.js', 'HTML', 'CSS'],
      salary: '₹ 12 – 18 LPA',
      matchScore: '95%',
      savedDate: 'Saved on 10 Oct 2026',
      logoName: 'amazon'
    },
    {
      id: 'saved-2',
      role: 'Software Engineer',
      company: 'Google',
      location: 'Hyderabad, Telangana',
      experience: '1 – 4 Years',
      type: 'HYBRID' as const,
      typeLabel: 'Full-time',
      workMode: 'Hybrid',
      tags: ['Java', 'Spring Boot', 'Microservices', 'System Design'],
      salary: '₹ 15 – 28 LPA',
      matchScore: '89%',
      savedDate: 'Saved on 08 Oct 2026',
      logoName: 'google'
    },
    {
      id: 'saved-3',
      role: 'Product Designer',
      company: 'Microsoft',
      location: 'Bangalore, Karnataka',
      experience: '3 – 6 Years',
      type: 'HYBRID' as const,
      typeLabel: 'Full-time',
      workMode: 'Hybrid',
      tags: ['UI/UX', 'Figma', 'User Research', 'Product Design'],
      salary: '₹ 18 – 32 LPA',
      matchScore: '87%',
      savedDate: 'Saved on 06 Oct 2026',
      logoName: 'microsoft'
    },
    {
      id: 'saved-4',
      role: 'Backend Developer',
      company: 'Zoho',
      location: 'Chennai, Tamil Nadu',
      experience: '1 – 3 Years',
      type: 'FULL_TIME' as const,
      typeLabel: 'Full-time',
      workMode: 'On-site',
      tags: ['Node.js', 'Express.js', 'PostgreSQL', 'AWS'],
      salary: '₹ 8 – 14 LPA',
      matchScore: '82%',
      savedDate: 'Saved on 05 Oct 2026',
      logoName: 'zoho'
    },
    {
      id: 'saved-5',
      role: 'Software Engineer',
      company: 'Swiggy',
      location: 'Bangalore, Karnataka',
      experience: '2 – 6 Years',
      type: 'HYBRID' as const,
      typeLabel: 'Full-time',
      workMode: 'Hybrid',
      tags: ['Python', 'Django', 'REST APIs', 'MySQL'],
      salary: '₹ 14 – 24 LPA',
      matchScore: '78%',
      savedDate: 'Saved on 28 Sep 2026',
      logoName: 'swiggy'
    }
  ]

  const filteredSavedJobs = useMemo(() => {
    if (savedJobFilter === 'ALL') return savedJobsList
    return savedJobsList.filter(job => {
      if (savedJobFilter === 'FULL_TIME') return job.typeLabel === 'Full-time'
      if (savedJobFilter === 'REMOTE') return job.workMode === 'Remote'
      if (savedJobFilter === 'HYBRID') return job.workMode === 'Hybrid'
      if (savedJobFilter === 'ON_SITE') return job.workMode === 'On-site'
      return true
    })
  }, [savedJobsList, savedJobFilter])

  // Similar jobs recommendation in Saved Jobs view
  const similarJobs = [
    { id: 'sim-1', role: 'iOS Developer', company: 'Apple', location: 'Bangalore, Karnataka', salary: '₹ 18 – 30 LPA', logoName: 'apple' },
    { id: 'sim-2', role: 'Full Stack Developer', company: 'InMobi', location: 'Hyderabad, Telangana', salary: '₹ 12 – 22 LPA', logoName: 'inmobi' },
    { id: 'sim-3', role: 'Software Engineer', company: 'Flipkart', location: 'Bangalore, Karnataka', salary: '₹ 14 – 26 LPA', logoName: 'flipkart' }
  ]

  // ================= 4. NOTIFICATIONS VIEW DATA =================
  const [notifFilter, setNotifFilter] = useState<NotificationFilter>('ALL')
  const [unreadCount, setUnreadCount] = useState(3)

  const [notificationsList, setNotificationsList] = useState([
    {
      id: 'notif-1',
      title: 'Application Shortlisted',
      desc: 'Your application for Software Engineer has been shortlisted.',
      company: 'Google',
      role: 'Software Engineer',
      badge: 'Shortlisted',
      badgeBg: '#dcfce7',
      badgeText: '#16a34a',
      time: '10 Oct 2026, 11:30 AM',
      isUnread: true,
      category: 'UPDATES' as const,
      iconType: 'check'
    },
    {
      id: 'notif-2',
      title: 'Interview Scheduled',
      desc: 'You have been scheduled for an interview for Frontend Developer.',
      company: 'Amazon',
      role: 'Frontend Developer',
      badge: 'Interview',
      badgeBg: '#f3e8ff',
      badgeText: '#7e22ce',
      time: '09 Oct 2026, 05:45 PM',
      isUnread: true,
      category: 'INTERVIEWS' as const,
      iconType: 'calendar'
    },
    {
      id: 'notif-3',
      title: 'Application Not Selected',
      desc: 'Thank you for applying. We have decided to move forward with other candidates.',
      company: 'Microsoft',
      role: 'Product Designer',
      badge: 'Not Selected',
      badgeBg: '#fee2e2',
      badgeText: '#dc2626',
      time: '06 Oct 2026, 02:20 PM',
      isUnread: true,
      category: 'UPDATES' as const,
      iconType: 'cross'
    },
    {
      id: 'notif-4',
      title: 'New Job Alert',
      desc: 'A new job matching your preferences has been posted.',
      company: 'Swiggy',
      role: 'Backend Developer',
      badge: 'New',
      badgeBg: '#fef3c7',
      badgeText: '#b45309',
      time: '05 Oct 2026, 10:15 AM',
      isUnread: false,
      category: 'ALERTS' as const,
      iconType: 'briefcase'
    },
    {
      id: 'notif-5',
      title: 'Message from Recruiter',
      desc: 'You have received a message from the hiring team.',
      company: 'Zoho',
      role: 'Software Engineer',
      badge: 'Message',
      badgeBg: '#e0f2fe',
      badgeText: '#0284c7',
      time: '04 Oct 2026, 07:40 PM',
      isUnread: false,
      category: 'MESSAGES' as const,
      iconType: 'message'
    },
    {
      id: 'notif-6',
      title: 'Application Viewed',
      desc: 'Your application has been viewed by the recruiter.',
      company: 'Flipkart',
      role: 'Full Stack Developer',
      badge: 'Viewed',
      badgeBg: '#e0f2fe',
      badgeText: '#0284c7',
      time: '03 Oct 2026, 12:10 PM',
      isUnread: false,
      category: 'UPDATES' as const,
      iconType: 'star'
    },
    {
      id: 'notif-7',
      title: 'Profile Suggestion',
      desc: 'Complete your skills section to get 3x more relevant job recommendations.',
      company: '',
      role: '',
      badge: '',
      badgeBg: '',
      badgeText: '',
      time: '02 Oct 2026, 09:00 AM',
      isUnread: false,
      category: 'PROFILE' as const,
      iconType: 'bulb'
    }
  ])

  const [notifSettings, setNotifSettings] = useState({
    appUpdates: true,
    interviews: true,
    jobAlerts: true,
    messages: true,
    profileUpdates: true,
    marketingUpdates: false
  })

  const handleMarkAllNotificationsAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, isUnread: false })))
    setUnreadCount(0)
  }

  const filteredNotifications = useMemo(() => {
    if (notifFilter === 'ALL') return notificationsList
    return notificationsList.filter(n => n.category === notifFilter)
  }, [notificationsList, notifFilter])

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
      className="candidate-dashboard-layout"
    >
      {/* ================= 1. DARK LEFT SIDEBAR ================= */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#090d16',
          color: '#ffffff',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 16px',
          borderRight: '1px solid #1e2433',
          minHeight: '100vh'
        }}
        className="dashboard-dark-sidebar"
      >
        <div>
          {/* Logo */}
          <div
            style={{
              padding: '0 8px 28px',
              cursor: 'pointer'
            }}
            onClick={() => {
              window.location.hash = '#home'
            }}
          >
            <img
              src="/logo-white.png"
              alt="proXHire"
              style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* Dashboard */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'dashboard' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeSidebarTab === 'dashboard' ? '#ffffff' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'dashboard' ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            {/* Find Jobs */}
            <button
              type="button"
              onClick={() => {
                if (onBrowseJobs) onBrowseJobs()
                else window.location.hash = '#jobs'
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'jobs' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeSidebarTab === 'jobs' ? '#ffffff' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'jobs' ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <Search size={18} />
              <span>Find Jobs</span>
            </button>

            {/* My Applications */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('applications')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'applications' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeSidebarTab === 'applications' ? '#ffffff' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'applications' ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <FileText size={18} />
              <span>My Applications</span>
            </button>

            {/* Saved Jobs */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('saved')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'saved' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeSidebarTab === 'saved' ? '#ffffff' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'saved' ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <Bookmark size={18} />
              <span>Saved Jobs</span>
            </button>

            {/* Interview Calls */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('interviews')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'interviews' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeSidebarTab === 'interviews' ? '#ffffff' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'interviews' ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <Calendar size={18} />
              <span>Interview Calls</span>
            </button>

            {/* Profile */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'profile' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeSidebarTab === 'profile' ? '#ffffff' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'profile' ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <User size={18} />
              <span>Profile</span>
            </button>

            {/* Skill Assessment */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('skills')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'skills' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeSidebarTab === 'skills' ? '#ffffff' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'skills' ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <BarChart2 size={18} />
              <span>Skill Assessment</span>
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('notifications')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'notifications' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeSidebarTab === 'notifications' ? '#ffffff' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'notifications' ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Bell size={18} />
                <span>Notifications</span>
              </div>
              {unreadCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'settings' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: activeSidebarTab === 'settings' ? '#ffffff' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'settings' ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom "Upgrade Your Profile" Card */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '18px 16px',
            marginTop: '24px'
          }}
        >
          <div style={{ color: '#f59e0b', marginBottom: '8px' }}>
            <Crown size={22} fill="#f59e0b" />
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
            Upgrade Your Profile
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.4, marginBottom: '14px' }}>
            Increase your chances of getting noticed by top companies.
          </div>
          <button
            type="button"
            onClick={() => setActiveSidebarTab('profile')}
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              color: '#090d16',
              padding: '9px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            Complete Profile
            <ArrowRight size={13} />
          </button>
        </div>
      </aside>

      {/* ================= 2. MAIN CONTENT AREA ================= */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Bar */}
        <header
          style={{
            height: '70px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 40
          }}
        >
          {/* Top Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
            <Search
              size={17}
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
              placeholder="Search for jobs, companies or skills..."
              value={topSearchQuery}
              onChange={(e) => setTopSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 40px',
                borderRadius: '9999px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '13px',
                color: '#0f172a',
                outline: 'none'
              }}
            />
          </div>

          {/* Right User Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Bell with red count */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('notifications')}
              style={{
                position: 'relative',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Notifications"
            >
              <Bell size={21} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #ffffff'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1.5px solid #e2e8f0',
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
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {candidateProfile?.fullName || user?.displayName || 'Sree Nandini'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Candidate
                  </div>
                </div>
                <ChevronDown size={15} color="#64748b" />
              </div>

              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '48px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    width: '180px',
                    padding: '6px',
                    zIndex: 50
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarTab('profile')
                      setProfileDropdownOpen(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#0f172a',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <User size={14} /> View Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarTab('dashboard')
                      setProfileDropdownOpen(false)
                      setTimeout(() => {
                        const el = document.getElementById('recommended-jobs-section') || document.querySelector('[data-section="recommended"]')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }, 50)
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#0f172a',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Sparkles size={14} color="#6366f1" /> Recommended Jobs
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarTab('saved')
                      setProfileDropdownOpen(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#0f172a',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Bookmark size={14} /> Saved Jobs
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarTab('applications')
                      setProfileDropdownOpen(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#0f172a',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Briefcase size={14} /> Applied Jobs
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarTab('settings')
                      setProfileDropdownOpen(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#0f172a',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Settings size={14} /> Account Settings
                  </button>
                  <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '4px 0' }} />
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false)
                      if (logout) logout()
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#dc2626',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Body Content based on Active Tab */}
        <main style={{ padding: '32px', flex: 1 }}>
          {/* ================= VIEW 1: DASHBOARD OVERVIEW (ProXHire Candidate Dashboard.png) ================= */}
          {activeSidebarTab === 'dashboard' && (
            <div>
              {/* Row 1: Greeting + Profile Completion Ring */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 340px',
                  gap: '28px',
                  alignItems: 'center',
                  marginBottom: '28px'
                }}
                className="dashboard-overview-top-grid"
              >
                {/* Greeting Header */}
                <div>
                  <h1
                    style={{
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#0f172a',
                      letterSpacing: '-0.02em',
                      margin: '0 0 6px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    Good Morning, Sree Nandini 👋
                  </h1>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                    Explore new opportunities and take the next step in your career.
                  </p>

                  {/* 4 Metric Summary Cards */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '14px',
                      marginTop: '20px'
                    }}
                    className="metric-summary-cards"
                  >
                    {/* Card 1: 124 Total Jobs */}
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px'
                      }}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          backgroundColor: '#eff6ff',
                          color: '#2563eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                          124
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                          Total Jobs
                        </div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                          Matching Your Profile
                        </div>
                      </div>
                    </div>

                    {/* Card 2: 18 Applications */}
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        cursor: 'pointer'
                      }}
                      onClick={() => setActiveSidebarTab('applications')}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          backgroundColor: '#f0fdf4',
                          color: '#16a34a',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <FileText size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                          18
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                          Applications
                        </div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                          Submitted
                        </div>
                      </div>
                    </div>

                    {/* Card 3: 7 Saved Jobs */}
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        cursor: 'pointer'
                      }}
                      onClick={() => setActiveSidebarTab('saved')}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          backgroundColor: '#faf5ff',
                          color: '#7e22ce',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Bookmark size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                          7
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                          Saved Jobs
                        </div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                          For Later
                        </div>
                      </div>
                    </div>

                    {/* Card 4: 3 Interview Calls */}
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px'
                      }}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          backgroundColor: '#fffbeb',
                          color: '#b45309',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Calendar size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                          3
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                          Interview Calls
                        </div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                          Upcoming
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Profile Completion Card */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                >
                  {/* Circular Radial Ring 80% */}
                  <div style={{ position: 'relative', width: '84px', height: '84px', flexShrink: 0 }}>
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="3.8"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="3.8"
                        strokeDasharray="80, 100"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 800,
                        color: '#0f172a'
                      }}
                    >
                      80%
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                      Complete Your Profile
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                      A complete profile gets 3x more interview calls.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveSidebarTab('profile')}
                      style={{
                        backgroundColor: '#0c0d12',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      Complete Now
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Recommended Jobs (Left) & Recent Applications + Interviews (Right) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 340px',
                  gap: '28px',
                  alignItems: 'start'
                }}
                className="dashboard-two-column-grid"
              >
                {/* Left: Recommended Jobs For You */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    padding: '24px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px'
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                        Recommended Jobs For You
                      </h3>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>
                        Based on your skills, experience and preferences.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (onBrowseJobs) onBrowseJobs()
                        else window.location.hash = '#jobs'
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0f172a',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      View All Jobs <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* 4 Job Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {recommendedJobs.map((job) => (
                      <div
                        key={job.id}
                        style={{
                          borderRadius: '16px',
                          border: '1px solid #f1f5f9',
                          padding: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          backgroundColor: '#ffffff',
                          transition: 'border-color 0.15s ease'
                        }}
                      >
                        {/* Company Logo & Job Title */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <CompanyLogo name={job.logoName} size={46} />
                          <div>
                            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                              {job.role}
                            </h4>
                            <div style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                              {job.company} • {job.location}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                              <span>{job.experience}</span>
                              <span>•</span>
                              <span>{job.type}</span>
                              <span>•</span>
                              <span>{job.workMode}</span>
                            </div>
                          </div>
                        </div>

                        {/* Salary, Match Badge, Bookmark, Apply Now */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                              {job.salary}
                            </div>
                            <span
                              style={{
                                display: 'inline-block',
                                backgroundColor: '#dcfce7',
                                color: '#16a34a',
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '6px',
                                marginTop: '4px'
                              }}
                            >
                              Matched {job.matchScore}
                            </span>
                          </div>

                          {/* Bookmark Button */}
                          <button
                            type="button"
                            onClick={() => toggleBookmark(job.id)}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0',
                              backgroundColor: '#ffffff',
                              color: bookmarkedJobs[job.id] ? '#0f172a' : '#94a3b8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <Bookmark size={17} fill={bookmarkedJobs[job.id] ? '#0f172a' : 'none'} />
                          </button>

                          {/* Apply Now Button */}
                          <button
                            type="button"
                            onClick={() => {
                              alert(`Application started for ${job.role} at ${job.company}!`)
                            }}
                            style={{
                              padding: '9px 18px',
                              borderRadius: '10px',
                              backgroundColor: '#0c0d12',
                              color: '#ffffff',
                              fontSize: '13px',
                              fontWeight: 700,
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Recent Applications + Upcoming Interviews */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Your Recent Applications */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '20px',
                      border: '1px solid #e2e8f0',
                      padding: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        Your Recent Applications
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveSidebarTab('applications')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0f172a',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        View All <ArrowRight size={13} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {recentApplicationsSummary.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingBottom: '12px',
                            borderBottom: '1px solid #f1f5f9'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <CompanyLogo name={item.logoName} size={36} />
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                                {item.role}
                              </div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>
                                {item.company}
                              </div>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <span
                              style={{
                                backgroundColor: item.statusBg,
                                color: item.statusText,
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: '9999px',
                                display: 'inline-block'
                              }}
                            >
                              {item.status}
                            </span>
                            <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '3px' }}>
                              {item.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Interviews */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '20px',
                      border: '1px solid #e2e8f0',
                      padding: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        Upcoming Interviews
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveSidebarTab('interviews')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0f172a',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        View All <ArrowRight size={13} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <CompanyLogo name="google" size={40} />
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                            Software Engineer
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>
                            Google
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#2563eb', fontWeight: 600, marginTop: '4px' }}>
                            <Calendar size={13} />
                            12 Oct 2026 • 10:00 AM
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveModalApp(applications[1])
                          setActiveModalType('details')
                        }}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#eff6ff',
                          color: '#2563eb',
                          fontSize: '12px',
                          fontWeight: 700,
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: 3 Bottom Action Cards (Horizontal) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  marginTop: '28px'
                }}
                className="bottom-action-cards"
              >
                {/* Action Card 1: Improve Your Profile */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveSidebarTab('profile')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#f1f5f9', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                        Improve Your Profile
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        Add skills, certifications and experience.
                      </div>
                    </div>
                  </div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight size={14} color="#0f172a" />
                  </div>
                </div>

                {/* Action Card 2: Take Skill Assessment */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveSidebarTab('skills')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#f1f5f9', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BarChart2 size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                        Take Skill Assessment
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        Showcase your skills and get noticed.
                      </div>
                    </div>
                  </div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight size={14} color="#0f172a" />
                  </div>
                </div>

                {/* Action Card 3: Career Resources */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    window.location.hash = '#about'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#f1f5f9', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lightbulb size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                        Career Resources
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        Explore career guides and interview tips.
                      </div>
                    </div>
                  </div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight size={14} color="#0f172a" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: SAVED JOBS (Saved Jobs Dashboard Interface.png) ================= */}
          {activeSidebarTab === 'saved' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 340px',
                gap: '28px',
                alignItems: 'start'
              }}
              className="dashboard-two-column-grid"
            >
              {/* Left Column: Saved Jobs List */}
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                      Saved Jobs
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                      Your shortlisted opportunities. Access and apply anytime.
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Total Saved</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>7 Jobs</div>
                  </div>
                </div>

                {/* Filter Pills + Sort */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '22px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {[
                      { label: 'All (7)', value: 'ALL' },
                      { label: 'Full-time (5)', value: 'FULL_TIME' },
                      { label: 'Remote (1)', value: 'REMOTE' },
                      { label: 'Hybrid (1)', value: 'HYBRID' },
                      { label: 'On-site (0)', value: 'ON_SITE' }
                    ].map((pill) => {
                      const isActive = savedJobFilter === pill.value
                      return (
                        <button
                          key={pill.value}
                          type="button"
                          onClick={() => setSavedJobFilter(pill.value as SavedJobFilter)}
                          style={{
                            padding: '8px 18px',
                            borderRadius: '9999px',
                            fontSize: '13px',
                            fontWeight: isActive ? 700 : 500,
                            backgroundColor: isActive ? '#0f172a' : '#ffffff',
                            color: isActive ? '#ffffff' : '#475569',
                            border: isActive ? '1px solid #0f172a' : '1px solid #e2e8f0',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {pill.label}
                        </button>
                      )
                    })}
                  </div>

                  {/* Sort */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                    <span>Sort by</span>
                    <select
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 600,
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option>Recently Saved</option>
                      <option>Highest Match</option>
                      <option>Salary: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* 5 Saved Job Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredSavedJobs.map((job) => (
                    <div
                      key={job.id}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        padding: '24px',
                        transition: 'box-shadow 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                        {/* Company Logo + Titles */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                          <CompanyLogo name={job.logoName} size={46} />
                          <div>
                            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                              {job.role}
                            </h3>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                              {job.company}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#64748b', marginTop: '6px', flexWrap: 'wrap' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={13} /> {job.location}
                              </span>
                              <span>•</span>
                              <span>{job.experience}</span>
                              <span>•</span>
                              <span>{job.typeLabel}</span>
                              <span>•</span>
                              <span>{job.workMode}</span>
                            </div>

                            {/* Tags */}
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                              {job.tags.map((tag) => (
                                <span
                                  key={tag}
                                  style={{
                                    backgroundColor: '#f1f5f9',
                                    color: '#475569',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    padding: '3px 10px',
                                    borderRadius: '6px'
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right: Salary, Match, Date, Actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                              {job.salary}
                            </div>
                            <span
                              style={{
                                backgroundColor: '#dcfce7',
                                color: '#16a34a',
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '6px',
                                display: 'inline-block',
                                marginTop: '4px'
                              }}
                            >
                              {job.matchScore} Match
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                              {job.savedDate}
                            </span>
                            <button type="button" style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                              <MoreHorizontal size={16} />
                            </button>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                            <button
                              type="button"
                              style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                border: '1px solid #e2e8f0',
                                backgroundColor: '#ffffff',
                                color: '#0f172a',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <Bookmark size={18} fill="#0f172a" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                alert(`Applying for saved role: ${job.role} at ${job.company}`)
                              }}
                              style={{
                                padding: '10px 22px',
                                borderRadius: '10px',
                                backgroundColor: '#0c0d12',
                                color: '#ffffff',
                                fontSize: '13px',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              Apply Now
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Saved Jobs Summary & Similar Jobs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* 1. 7 Saved Jobs Card */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: '#dcfce7',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Bookmark size={22} fill="#16a34a" />
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                      7
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                      Saved Jobs
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      Keep track of the jobs you're interested in.
                    </div>
                  </div>
                </div>

                {/* 2. Job Alerts Switch */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: '#eff6ff',
                        color: '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Bell size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                        Job Alerts
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        Get notified when similar jobs are posted.
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={jobAlertsEnabled}
                    onChange={(e) => setJobAlertsEnabled(e.target.checked)}
                    style={{ width: '40px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                  />
                </div>

                {/* 3. Find Better Matches */}
                <div
                  style={{
                    backgroundColor: '#fffbeb',
                    borderRadius: '16px',
                    border: '1px solid #fef3c7',
                    padding: '22px'
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#fef3c7',
                      color: '#b45309',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px'
                    }}
                  >
                    <Target size={22} />
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                    Find Better Matches
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                    Complete your profile and get more relevant job recommendations.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveSidebarTab('profile')}
                    style={{
                      width: '100%',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      padding: '9px 14px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: '1px solid #0f172a',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    Complete Profile
                    <ArrowRight size={13} />
                  </button>
                </div>

                {/* 4. Similar Jobs You May Like */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '22px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Similar Jobs You May Like
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        if (onBrowseJobs) onBrowseJobs()
                        else window.location.hash = '#jobs'
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0f172a',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      View All <ArrowRight size={13} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {similarJobs.map((sim) => (
                      <div
                        key={sim.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingBottom: '12px',
                          borderBottom: '1px solid #f1f5f9'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <CompanyLogo name={sim.logoName} size={36} />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                              {sim.role}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>
                              {sim.company} • {sim.location}
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                              {sim.salary}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            color: '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Bookmark size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 3: MY APPLICATIONS (Job Applications Dashboard.png) ================= */}
          {activeSidebarTab === 'applications' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 340px',
                gap: '28px',
                alignItems: 'start'
              }}
              className="dashboard-two-column-grid"
            >
              {/* Left Column: Applications List */}
              <div>
                {/* Header Title */}
                <div style={{ marginBottom: '24px' }}>
                  <h1
                    style={{
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#0f172a',
                      letterSpacing: '-0.02em',
                      margin: '0 0 6px 0'
                    }}
                  >
                    My Applications
                  </h1>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                    Track the status of your job applications and stay updated.
                  </p>
                </div>

                {/* Filter Pills */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: '22px'
                  }}
                >
                  {[
                    { label: 'All (18)', value: 'ALL' },
                    { label: 'Under Review (5)', value: 'UNDER_REVIEW' },
                    { label: 'Shortlisted (4)', value: 'SHORTLISTED' },
                    { label: 'Interview Scheduled (3)', value: 'INTERVIEW' },
                    { label: 'Offered (1)', value: 'OFFERED' },
                    { label: 'Rejected (5)', value: 'REJECTED' }
                  ].map((filterItem) => {
                    const isActive = appFilter === filterItem.value
                    return (
                      <button
                        key={filterItem.value}
                        type="button"
                        onClick={() => setAppFilter(filterItem.value as ApplicationFilter)}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '9999px',
                          fontSize: '13px',
                          fontWeight: isActive ? 700 : 500,
                          backgroundColor: isActive ? '#0f172a' : '#ffffff',
                          color: isActive ? '#ffffff' : '#475569',
                          border: isActive ? '1px solid #0f172a' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {filterItem.label}
                      </button>
                    )
                  })}
                </div>

                {/* Search & Location Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px',
                    flexWrap: 'wrap'
                  }}
                >
                  {/* Search input */}
                  <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                    <Search
                      size={16}
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
                      placeholder="Search by job title, company or location..."
                      value={appSearchQuery}
                      onChange={(e) => setAppSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 38px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        fontSize: '13px',
                        color: '#0f172a',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Location Filter Dropdown */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '9px 14px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 500
                      }}
                    >
                      <MapPin size={15} color="#64748b" />
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          fontSize: '13px',
                          color: '#0f172a',
                          outline: 'none',
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        <option value="All Locations">All Locations</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                      </select>
                    </div>
                  </div>

                  {/* Sort By Dropdown */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#64748b'
                    }}
                  >
                    <span>Sort by</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{
                        padding: '9px 14px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 600,
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Latest Applied">Latest Applied</option>
                      <option value="Company">Company</option>
                      <option value="Status">Status</option>
                    </select>
                  </div>
                </div>

                {/* Applications List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        padding: '24px',
                        transition: 'box-shadow 0.15s ease'
                      }}
                    >
                      {/* Top Header of Card */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <CompanyLogo name={app.logoName} size={46} />
                          <div>
                            <h3
                              style={{
                                fontSize: '17px',
                                fontWeight: 800,
                                color: '#0f172a',
                                margin: '0 0 2px 0'
                              }}
                            >
                              {app.role}
                            </h3>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                              {app.company}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '12px',
                                color: '#64748b',
                                marginTop: '6px',
                                flexWrap: 'wrap'
                              }}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={13} /> {app.location}
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Calendar size={13} /> {app.type}
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Briefcase size={13} /> {app.experience}
                              </span>
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                              Applied on {app.appliedDate}
                            </div>
                          </div>
                        </div>

                        {/* Status Badge + More Options */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <span
                            style={{
                              backgroundColor: app.statusTheme.bg,
                              color: app.statusTheme.text,
                              fontSize: '12px',
                              fontWeight: 700,
                              padding: '5px 14px',
                              borderRadius: '9999px'
                            }}
                          >
                            {app.statusLabel}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveModalApp(app)
                              setActiveModalType('details')
                            }}
                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                          >
                            <MoreHorizontal size={18} />
                          </button>
                          <ChevronRight size={18} color="#94a3b8" />
                        </div>
                      </div>

                      {/* Adobe: Progress Stepper */}
                      {app.id === 'app-adobe' && (
                        <div
                          style={{
                            marginTop: '20px',
                            paddingTop: '16px',
                            borderTop: '1px solid #f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            maxWidth: '420px',
                            margin: '20px auto 0'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div
                                style={{
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '50%',
                                  backgroundColor: '#2563eb',
                                  color: '#fff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <Check size={13} strokeWidth={3} />
                              </div>
                              <span style={{ fontSize: '11px', color: '#0f172a', fontWeight: 600, marginTop: '4px' }}>
                                Applied
                              </span>
                            </div>

                            <div style={{ flex: 1, height: '2px', backgroundColor: '#2563eb', margin: '0 4px 16px' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div
                                style={{
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '50%',
                                  backgroundColor: '#2563eb',
                                  color: '#fff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
                              </div>
                              <span style={{ fontSize: '11px', color: '#0f172a', fontWeight: 700, marginTop: '4px' }}>
                                Screening
                              </span>
                            </div>

                            <div style={{ flex: 1, height: '2px', backgroundColor: '#cbd5e1', margin: '0 4px 16px' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                              <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                                Interview
                              </span>
                            </div>

                            <div style={{ flex: 1, height: '2px', backgroundColor: '#cbd5e1', margin: '0 4px 16px' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                              <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                                Offer
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Google: Shortlisted View Details */}
                      {app.id === 'app-google' && (
                        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModalApp(app)
                              setActiveModalType('details')
                            }}
                            style={{
                              padding: '8px 20px',
                              borderRadius: '10px',
                              border: '1.5px solid #0f172a',
                              backgroundColor: '#ffffff',
                              color: '#0f172a',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      )}

                      {/* Swiggy: Interview Box */}
                      {app.id === 'app-swiggy' && (
                        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                          <div
                            style={{
                              backgroundColor: '#eff6ff',
                              border: '1px solid #dbeafe',
                              borderRadius: '8px',
                              padding: '8px 14px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '13px',
                              fontWeight: 600,
                              color: '#1e40af'
                            }}
                          >
                            <Calendar size={15} color="#2563eb" />
                            {app.interviewInfo}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModalApp(app)
                              setActiveModalType('details')
                            }}
                            style={{
                              padding: '8px 20px',
                              borderRadius: '10px',
                              border: '1.5px solid #0f172a',
                              backgroundColor: '#ffffff',
                              color: '#0f172a',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      )}

                      {/* Microsoft: Rejected */}
                      {app.id === 'app-microsoft' && (
                        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                          <div style={{ fontSize: '13px', color: '#64748b' }}>
                            {app.feedbackNotice}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModalApp(app)
                              setActiveModalType('feedback')
                            }}
                            style={{
                              padding: '8px 20px',
                              borderRadius: '10px',
                              border: '1.5px solid #0f172a',
                              backgroundColor: '#ffffff',
                              color: '#0f172a',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            View Feedback
                          </button>
                        </div>
                      )}

                      {/* Zoho: Offered */}
                      {app.id === 'app-zoho' && (
                        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                          <div style={{ fontSize: '13px', color: '#64748b' }}>
                            {app.offerNotice}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModalApp(app)
                              setActiveModalType('offer')
                            }}
                            style={{
                              padding: '8px 20px',
                              borderRadius: '10px',
                              border: '1.5px solid #0f172a',
                              backgroundColor: '#ffffff',
                              color: '#0f172a',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            View Offer
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Statistics & Activities */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* 1. Application Overview (Donut Chart) */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px'
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 20px 0' }}>
                    Application Overview
                  </h3>

                  <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 24px' }}>
                    <svg viewBox="0 0 100 100" width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#2563eb" strokeWidth="12" strokeDasharray="66 238" strokeDashoffset="0" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#16a34a" strokeWidth="12" strokeDasharray="53 238" strokeDashoffset="-66" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#7e22ce" strokeWidth="12" strokeDasharray="40 238" strokeDashoffset="-119" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#059669" strokeWidth="12" strokeDasharray="14 238" strokeDashoffset="-159" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="65 238" strokeDashoffset="-173" />
                    </svg>

                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                      }}
                    >
                      <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                        18
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                        Applications
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
                        Under Review
                      </span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>5</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                        Shortlisted
                      </span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>4</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#7e22ce' }} />
                        Interview Scheduled
                      </span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>3</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#059669' }} />
                        Offered
                      </span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>1</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                        Rejected
                      </span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>5</span>
                    </div>
                  </div>
                </div>

                {/* 2. Recent Activity Timeline */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Recent Activity
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveSidebarTab('notifications')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0f172a',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      View All <ArrowRight size={13} />
                    </button>
                  </div>

                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '6px',
                        top: '8px',
                        bottom: '8px',
                        width: '2px',
                        backgroundColor: '#e2e8f0',
                        zIndex: 0
                      }}
                    />

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#2563eb', border: '3px solid #ffffff', boxShadow: '0 0 0 1px #2563eb', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Application Submitted</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Product Engineer at Adobe</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>08 Oct 2026, 11:20 AM</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#16a34a', border: '3px solid #ffffff', boxShadow: '0 0 0 1px #16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Shortlisted</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Software Engineer at Google</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>05 Oct 2026, 04:15 PM</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#7e22ce', border: '3px solid #ffffff', boxShadow: '0 0 0 1px #7e22ce', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Interview Scheduled</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Frontend Developer at Swiggy</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>28 Sep 2026, 10:30 AM</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ef4444', border: '3px solid #ffffff', boxShadow: '0 0 0 1px #ef4444', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Application Rejected</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Product Designer at Microsoft</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>24 Sep 2026, 02:10 PM</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Keep Applying! Card */}
                <div style={{ backgroundColor: '#f0f7ff', borderRadius: '16px', border: '1px solid #dbeafe', padding: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ffffff', boxShadow: '0 2px 6px rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', marginBottom: '14px' }}>
                    <Lightbulb size={22} />
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                    Keep Applying!
                  </h4>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '0 0 18px 0' }}>
                    You've applied to <strong>18</strong> jobs. Complete your profile and take skill assessments to get more interviews.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveSidebarTab('profile')}
                    style={{
                      width: '100%',
                      backgroundColor: '#0c0d12',
                      color: '#ffffff',
                      padding: '10px 16px',
                      borderRadius: '9999px',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    Improve Profile
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 4: NOTIFICATIONS (Modern Job Portal Notifications Dashboard.png) ================= */}
          {activeSidebarTab === 'notifications' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 340px',
                gap: '28px',
                alignItems: 'start'
              }}
              className="dashboard-two-column-grid"
            >
              {/* Left Column: Notifications List */}
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                    Notifications
                  </h1>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                    Stay updated with important updates about your job applications and opportunities.
                  </p>
                </div>

                {/* Filter Pills + Mark All as Read */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {[
                      { label: 'All (12)', value: 'ALL' },
                      { label: 'Application Updates (5)', value: 'UPDATES' },
                      { label: 'Interview Calls (2)', value: 'INTERVIEWS' },
                      { label: 'Job Alerts (3)', value: 'ALERTS' },
                      { label: 'Messages (1)', value: 'MESSAGES' },
                      { label: 'Profile (1)', value: 'PROFILE' }
                    ].map((pill) => {
                      const isActive = notifFilter === pill.value
                      return (
                        <button
                          key={pill.value}
                          type="button"
                          onClick={() => setNotifFilter(pill.value as NotificationFilter)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '9999px',
                            fontSize: '13px',
                            fontWeight: isActive ? 700 : 500,
                            backgroundColor: isActive ? '#0f172a' : '#ffffff',
                            color: isActive ? '#ffffff' : '#475569',
                            border: isActive ? '1px solid #0f172a' : '1px solid #e2e8f0',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {pill.label}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleMarkAllNotificationsAsRead}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'none',
                      border: 'none',
                      color: '#0f172a',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      padding: '4px 8px'
                    }}
                  >
                    <Mail size={15} />
                    <span>Mark All as Read</span>
                  </button>
                </div>

                {/* Notifications List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {filteredNotifications.map((notif) => {
                    const renderIcon = () => {
                      switch (notif.iconType) {
                        case 'check':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <CheckCircle2 size={20} strokeWidth={2.5} />
                            </div>
                          )
                        case 'calendar':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Calendar size={20} strokeWidth={2.2} />
                            </div>
                          )
                        case 'cross':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <XCircle size={20} strokeWidth={2.2} />
                            </div>
                          )
                        case 'briefcase':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Briefcase size={20} strokeWidth={2.2} />
                            </div>
                          )
                        case 'message':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#7e22ce', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <MessageSquare size={20} strokeWidth={2.2} />
                            </div>
                          )
                        case 'star':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#ccfbf1', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Star size={20} strokeWidth={2.2} />
                            </div>
                          )
                        case 'bulb':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Lightbulb size={20} strokeWidth={2.2} />
                            </div>
                          )
                        default:
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Bell size={20} />
                            </div>
                          )
                      }
                    }

                    return (
                      <div
                        key={notif.id}
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '1px solid #e2e8f0',
                          padding: '18px 22px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1, minWidth: 0 }}>
                          {renderIcon()}

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                                {notif.title}
                              </span>
                              {notif.badge && (
                                <span
                                  style={{
                                    backgroundColor: notif.badgeBg,
                                    color: notif.badgeText,
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    padding: '2px 8px',
                                    borderRadius: '9999px'
                                  }}
                                >
                                  {notif.badge}
                                </span>
                              )}
                            </div>

                            <div style={{ fontSize: '13px', color: '#475569', marginTop: '3px', lineHeight: 1.4 }}>
                              {notif.desc}
                            </div>

                            {notif.company && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                                <CompanyLogo name={notif.company} size={18} />
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                                  {notif.role} • {notif.company}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                            {notif.time}
                          </span>

                          <div
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: notif.isUnread ? '#2563eb' : '#cbd5e1'
                            }}
                          />

                          <button
                            type="button"
                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                          >
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right Column: Settings & Quick Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* 1. Notification Settings Toggles */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <Settings size={18} color="#0f172a" />
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Notification Settings
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FileText size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Application Updates</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Status changes on your applications</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.appUpdates}
                        onChange={(e) => setNotifSettings({ ...notifSettings, appUpdates: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Calendar size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Interview Calls</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Interview schedules and updates</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.interviews}
                        onChange={(e) => setNotifSettings({ ...notifSettings, interviews: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Bell size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Job Alerts</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>New jobs matching your preferences</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.jobAlerts}
                        onChange={(e) => setNotifSettings({ ...notifSettings, jobAlerts: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MessageSquare size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Messages</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Messages from recruiters</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.messages}
                        onChange={(e) => setNotifSettings({ ...notifSettings, messages: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <User size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Profile Updates</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Tips and recommendations</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.profileUpdates}
                        onChange={(e) => setNotifSettings({ ...notifSettings, profileUpdates: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Megaphone size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Marketing Updates</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Career tips and platform updates</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.marketingUpdates}
                        onChange={(e) => setNotifSettings({ ...notifSettings, marketingUpdates: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Quick Actions */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                    <Zap size={18} color="#2563eb" />
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Quick Actions
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={handleMarkAllNotificationsAsRead}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 600,
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Mail size={16} color="#64748b" />
                        Mark All as Read
                      </div>
                      <ChevronRight size={16} color="#94a3b8" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveSidebarTab('settings')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 600,
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Sliders size={16} color="#64748b" />
                        Notification Preferences
                      </div>
                      <ChevronRight size={16} color="#94a3b8" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveSidebarTab('settings')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 600,
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MailCheck size={16} color="#64748b" />
                        Manage Email Preferences
                      </div>
                      <ChevronRight size={16} color="#94a3b8" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        window.location.hash = '#contact'
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 600,
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <HelpCircle size={16} color="#64748b" />
                        Help &amp; Support
                      </div>
                      <ChevronRight size={16} color="#94a3b8" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 5: SETTINGS (proXHire Settings Dashboard.png) ================= */}
          {activeSidebarTab === 'settings' && (
            <div>
              {/* Header Title */}
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                  Settings
                </h1>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  Manage your account, preferences and privacy settings.
                </p>
              </div>

              {/* Sub-tab Pills Navigation */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <button
                  type="button"
                  onClick={() => setSettingsSubTab('account')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: settingsSubTab === 'account' ? 700 : 500,
                    backgroundColor: settingsSubTab === 'account' ? '#0f172a' : '#ffffff',
                    color: settingsSubTab === 'account' ? '#ffffff' : '#475569',
                    border: settingsSubTab === 'account' ? '1px solid #0f172a' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <User size={15} />
                  <span>Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSettingsSubTab('notifications')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: settingsSubTab === 'notifications' ? 700 : 500,
                    backgroundColor: settingsSubTab === 'notifications' ? '#0f172a' : '#ffffff',
                    color: settingsSubTab === 'notifications' ? '#ffffff' : '#475569',
                    border: settingsSubTab === 'notifications' ? '1px solid #0f172a' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Bell size={15} />
                  <span>Notifications</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSettingsSubTab('preferences')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: settingsSubTab === 'preferences' ? 700 : 500,
                    backgroundColor: settingsSubTab === 'preferences' ? '#0f172a' : '#ffffff',
                    color: settingsSubTab === 'preferences' ? '#ffffff' : '#475569',
                    border: settingsSubTab === 'preferences' ? '1px solid #0f172a' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Briefcase size={15} />
                  <span>Job Preferences</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSettingsSubTab('privacy')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: settingsSubTab === 'privacy' ? 700 : 500,
                    backgroundColor: settingsSubTab === 'privacy' ? '#0f172a' : '#ffffff',
                    color: settingsSubTab === 'privacy' ? '#ffffff' : '#475569',
                    border: settingsSubTab === 'privacy' ? '1px solid #0f172a' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Shield size={15} />
                  <span>Privacy &amp; Security</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSettingsSubTab('appearance')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: settingsSubTab === 'appearance' ? 700 : 500,
                    backgroundColor: settingsSubTab === 'appearance' ? '#0f172a' : '#ffffff',
                    color: settingsSubTab === 'appearance' ? '#ffffff' : '#475569',
                    border: settingsSubTab === 'appearance' ? '1px solid #0f172a' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Palette size={15} />
                  <span>Appearance</span>
                </button>
              </div>

              {/* Settings Main Content Layout */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 340px',
                  gap: '28px',
                  alignItems: 'start'
                }}
                className="dashboard-two-column-grid"
              >
                {/* Left: Main Settings Card */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    padding: '32px'
                  }}
                >
                  {/* SUBTAB 1: ACCOUNT (Exact Match: proXHire Settings Dashboard.png) */}
                  {settingsSubTab === 'account' && (
                    <div>
                      {/* Section 1: Account Information */}
                      <div style={{ marginBottom: '36px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                          Account Information
                        </h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
                          Manage your basic account details.
                        </p>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '20px'
                          }}
                          className="settings-form-grid"
                        >
                          {/* Full Name */}
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                              Full Name
                            </label>
                            <div style={{ position: 'relative' }}>
                              <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                              <input
                                type="text"
                                value={settingsForm.fullName}
                                onChange={(e) => setSettingsForm({ ...settingsForm, fullName: e.target.value })}
                                style={{
                                  width: '100%',
                                  padding: '11px 14px 11px 40px',
                                  borderRadius: '10px',
                                  border: '1px solid #cbd5e1',
                                  fontSize: '14px',
                                  color: '#0f172a',
                                  outline: 'none'
                                }}
                              />
                            </div>
                          </div>

                          {/* Email Address with Change button */}
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                              Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                              <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                              <input
                                type="email"
                                value={settingsForm.email}
                                onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                                style={{
                                  width: '100%',
                                  padding: '11px 86px 11px 40px',
                                  borderRadius: '10px',
                                  border: '1px solid #cbd5e1',
                                  fontSize: '14px',
                                  color: '#0f172a',
                                  outline: 'none'
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setNewEmailInput(settingsForm.email)
                                  setEmailPasswordInput('')
                                  setIsChangeEmailOpen(true)
                                }}
                                style={{
                                  position: 'absolute',
                                  right: '8px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  padding: '5px 12px',
                                  borderRadius: '8px',
                                  backgroundColor: '#eff6ff',
                                  color: '#2563eb',
                                  border: 'none',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                Change
                              </button>
                            </div>
                          </div>

                          {/* Mobile Number with country code and verified badge */}
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                              Mobile Number
                            </label>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                padding: '4px 10px',
                                backgroundColor: '#ffffff'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '8px', borderRight: '1px solid #e2e8f0' }}>
                                <Phone size={15} color="#94a3b8" />
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>+91</span>
                                <ChevronDown size={14} color="#64748b" />
                              </div>
                              <input
                                type="text"
                                value={settingsForm.mobileNumber}
                                onChange={(e) => setSettingsForm({ ...settingsForm, mobileNumber: e.target.value })}
                                style={{
                                  flex: 1,
                                  border: 'none',
                                  outline: 'none',
                                  padding: '7px 10px',
                                  fontSize: '14px',
                                  color: '#0f172a'
                                }}
                              />
                              {settingsForm.isMobileVerified && (
                                <button
                                  type="button"
                                  onClick={() => showToast(`Phone number +91 ${settingsForm.mobileNumber} is verified via Aadhaar & OTP.`)}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    color: '#16a34a',
                                    backgroundColor: '#dcfce7',
                                    padding: '3px 8px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    flexShrink: 0
                                  }}
                                >
                                  <Check size={12} strokeWidth={3} />
                                  Verified
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Alternate Contact Number */}
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                              Alternate Contact Number (Optional)
                            </label>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                padding: '4px 10px',
                                backgroundColor: '#ffffff'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '8px', borderRight: '1px solid #e2e8f0' }}>
                                <Phone size={15} color="#94a3b8" />
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>+91</span>
                                <ChevronDown size={14} color="#64748b" />
                              </div>
                              <input
                                type="text"
                                placeholder="Enter alternate number"
                                value={settingsForm.altMobileNumber}
                                onChange={(e) => setSettingsForm({ ...settingsForm, altMobileNumber: e.target.value })}
                                style={{
                                  flex: 1,
                                  border: 'none',
                                  outline: 'none',
                                  padding: '7px 10px',
                                  fontSize: '14px',
                                  color: '#0f172a'
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Change Password */}
                      <div style={{ marginBottom: '36px', marginTop: '36px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                          Change Password
                        </h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
                          Keep your account secure with a strong password.
                        </p>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '16px',
                            marginBottom: '18px'
                          }}
                          className="password-form-grid"
                        >
                          {/* Current Password */}
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                              Current Password
                            </label>
                            <div style={{ position: 'relative' }}>
                              <Lock size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                              <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                placeholder="Enter current password"
                                value={passwordForm.currentPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                style={{
                                  width: '100%',
                                  padding: '10px 36px 10px 36px',
                                  borderRadius: '10px',
                                  border: '1px solid #cbd5e1',
                                  fontSize: '13px',
                                  color: '#0f172a',
                                  outline: 'none'
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                              >
                                {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                          </div>

                          {/* New Password */}
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                              New Password
                            </label>
                            <div style={{ position: 'relative' }}>
                              <Lock size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                              <input
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Enter new password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                style={{
                                  width: '100%',
                                  padding: '10px 36px 10px 36px',
                                  borderRadius: '10px',
                                  border: '1px solid #cbd5e1',
                                  fontSize: '13px',
                                  color: '#0f172a',
                                  outline: 'none'
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                              >
                                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                          </div>

                          {/* Confirm New Password */}
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                              Confirm New Password
                            </label>
                            <div style={{ position: 'relative' }}>
                              <Lock size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm new password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                style={{
                                  width: '100%',
                                  padding: '10px 36px 10px 36px',
                                  borderRadius: '10px',
                                  border: '1px solid #cbd5e1',
                                  fontSize: '13px',
                                  color: '#0f172a',
                                  outline: 'none'
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                              >
                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => {
                              if (!passwordForm.currentPassword) {
                                showToast('Please enter your current password.')
                                return
                              }
                              if (!passwordForm.newPassword) {
                                showToast('Please enter a new password.')
                                return
                              }
                              if (passwordForm.newPassword.length < 6) {
                                showToast('New password must be at least 6 characters.')
                                return
                              }
                              if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                                showToast('New password and confirm password do not match.')
                                return
                              }
                              setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
                              showToast('Password updated successfully!')
                            }}
                            style={{
                              backgroundColor: '#0c0d12',
                              color: '#ffffff',
                              border: 'none',
                              padding: '10px 24px',
                              borderRadius: '10px',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Update Password
                          </button>
                        </div>
                      </div>

                      {/* Section 3: Account Actions */}
                      <div style={{ marginTop: '36px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                          Account Actions
                        </h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
                          Manage your account data and other settings.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          {/* Download My Data */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 4px',
                              backgroundColor: '#ffffff'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <div
                                style={{
                                  width: '44px',
                                  height: '44px',
                                  borderRadius: '50%',
                                  backgroundColor: '#eff6ff',
                                  color: '#2563eb',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}
                              >
                                <Download size={20} />
                              </div>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                                  Download My Data
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>
                                  Get a copy of your profile, applications and activity data.
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setIsDownloadModalOpen(true)}
                              style={{
                                padding: '8px 24px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                backgroundColor: '#ffffff',
                                color: '#0f172a',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              Download
                            </button>
                          </div>

                          {/* Deactivate Account */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 4px',
                              backgroundColor: '#ffffff'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <div
                                style={{
                                  width: '44px',
                                  height: '44px',
                                  borderRadius: '50%',
                                  backgroundColor: '#fee2e2',
                                  color: '#dc2626',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}
                              >
                                <Trash2 size={20} />
                              </div>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                                  Deactivate Account
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>
                                  Temporarily deactivate your account. You can reactivate it anytime.
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setIsDeactivateModalOpen(true)}
                              style={{
                                padding: '8px 24px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                backgroundColor: '#ffffff',
                                color: '#0f172a',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              Deactivate
                            </button>
                          </div>

                          {/* Delete Account */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 4px',
                              backgroundColor: '#ffffff'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <div
                                style={{
                                  width: '44px',
                                  height: '44px',
                                  borderRadius: '50%',
                                  backgroundColor: '#fee2e2',
                                  color: '#dc2626',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}
                              >
                                <Trash2 size={20} />
                              </div>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                                  Delete Account
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>
                                  Permanently delete your account and all associated data.
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setDeleteConfirmText('')
                                setIsDeleteModalOpen(true)
                              }}
                              style={{
                                padding: '8px 20px',
                                borderRadius: '10px',
                                border: '1px solid #ef4444',
                                backgroundColor: '#ffffff',
                                color: '#ef4444',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              Delete Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 2: NOTIFICATIONS PREFERENCES */}
                  {settingsSubTab === 'notifications' && (
                    <div>
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                          Notification Preferences
                        </h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                          Control which alerts and emails you receive from ProXHire.
                        </p>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        {[
                          { title: 'Job Application Updates', desc: 'Alerts when your application status changes or recruiters review your profile.', key: 'appUpdates' },
                          { title: 'Interview Invitations', desc: 'Direct alerts for upcoming interview schedules, links and reminders.', key: 'interviews' },
                          { title: 'Personalized Job Alerts', desc: 'Daily matching recommendations based on your desired skills and salary.', key: 'jobAlerts' },
                          { title: 'Recruiter Direct Messages', desc: 'Instant notifications when verified recruiters send message requests.', key: 'messages' },
                          { title: 'Profile Completeness & Assessment Tips', desc: 'Helpful reminders to improve your skill badge scores.', key: 'profileUpdates' },
                          { title: 'Career Guidance & Insights Digest', desc: 'Weekly newsletter with hiring trends, interview guides and salary reports.', key: 'marketingUpdates' }
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '14px 18px',
                              borderRadius: '12px',
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e2e8f0'
                            }}
                          >
                            <div style={{ maxWidth: '80%' }}>
                              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{item.title}</div>
                              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{item.desc}</div>
                            </div>
                            <input
                              type="checkbox"
                              checked={(notifSettings as any)[item.key]}
                              onChange={(e) => setNotifSettings({ ...notifSettings, [item.key]: e.target.checked })}
                              style={{ width: '18px', height: '18px', accentColor: '#0f172a', cursor: 'pointer' }}
                            />
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px' }}>
                        <button
                          type="button"
                          onClick={() => showToast('Notification preferences saved successfully!')}
                          style={{
                            backgroundColor: '#0c0d12',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Save Notification Preferences
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 3: JOB PREFERENCES */}
                  {settingsSubTab === 'preferences' && (
                    <div>
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                          Job Search Preferences
                        </h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                          Help companies and AI matching accurately find roles that fit your criteria.
                        </p>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                        {/* Target Roles */}
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                            Target Job Titles
                          </label>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                            {jobPrefForm.roles.map((r, i) => (
                              <span
                                key={i}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  backgroundColor: '#eff6ff',
                                  color: '#2563eb',
                                  padding: '5px 12px',
                                  borderRadius: '9999px',
                                  fontSize: '12px',
                                  fontWeight: 600
                                }}
                              >
                                {r}
                                <button
                                  type="button"
                                  onClick={() => setJobPrefForm(prev => ({ ...prev, roles: prev.roles.filter((_, idx) => idx !== i) }))}
                                  style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', padding: 0 }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                              type="text"
                              placeholder="Add another title (e.g. Lead Frontend Engineer)"
                              value={jobPrefForm.newRoleInput}
                              onChange={(e) => setJobPrefForm({ ...jobPrefForm, newRoleInput: e.target.value })}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && jobPrefForm.newRoleInput.trim()) {
                                  e.preventDefault()
                                  setJobPrefForm(prev => ({
                                    ...prev,
                                    roles: [...prev.roles, prev.newRoleInput.trim()],
                                    newRoleInput: ''
                                  }))
                                }
                              }}
                              style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (jobPrefForm.newRoleInput.trim()) {
                                  setJobPrefForm(prev => ({
                                    ...prev,
                                    roles: [...prev.roles, prev.newRoleInput.trim()],
                                    newRoleInput: ''
                                  }))
                                }
                              }}
                              style={{ padding: '9px 16px', borderRadius: '8px', backgroundColor: '#0f172a', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Preferred Locations */}
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                            Preferred Locations
                          </label>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                            {jobPrefForm.locations.map((loc, i) => (
                              <span
                                key={i}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  backgroundColor: '#f1f5f9',
                                  color: '#334155',
                                  padding: '5px 12px',
                                  borderRadius: '9999px',
                                  fontSize: '12px',
                                  fontWeight: 600
                                }}
                              >
                                {loc}
                                <button
                                  type="button"
                                  onClick={() => setJobPrefForm(prev => ({ ...prev, locations: prev.locations.filter((_, idx) => idx !== i) }))}
                                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0 }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                              type="text"
                              placeholder="Add city (e.g. Pune, Maharashtra)"
                              value={jobPrefForm.newLocationInput}
                              onChange={(e) => setJobPrefForm({ ...jobPrefForm, newLocationInput: e.target.value })}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && jobPrefForm.newLocationInput.trim()) {
                                  e.preventDefault()
                                  setJobPrefForm(prev => ({
                                    ...prev,
                                    locations: [...prev.locations, prev.newLocationInput.trim()],
                                    newLocationInput: ''
                                  }))
                                }
                              }}
                              style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (jobPrefForm.newLocationInput.trim()) {
                                  setJobPrefForm(prev => ({
                                    ...prev,
                                    locations: [...prev.locations, prev.newLocationInput.trim()],
                                    newLocationInput: ''
                                  }))
                                }
                              }}
                              style={{ padding: '9px 16px', borderRadius: '8px', backgroundColor: '#0f172a', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Work Mode & Notice Period */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="settings-form-grid">
                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                              Preferred Work Mode
                            </label>
                            <select
                              value={jobPrefForm.workMode}
                              onChange={(e) => setJobPrefForm({ ...jobPrefForm, workMode: e.target.value as any })}
                              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#0f172a' }}
                            >
                              <option value="Hybrid">Hybrid (2-3 days office)</option>
                              <option value="Remote">100% Remote</option>
                              <option value="On-site">On-site Only</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                              Notice Period
                            </label>
                            <select
                              value={jobPrefForm.noticePeriod}
                              onChange={(e) => setJobPrefForm({ ...jobPrefForm, noticePeriod: e.target.value })}
                              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#0f172a' }}
                            >
                              <option value="Immediate">Immediate Joiner (0-7 days)</option>
                              <option value="15 Days">15 Days</option>
                              <option value="30 Days">30 Days (Serving Notice)</option>
                              <option value="60 Days">60 Days</option>
                              <option value="90 Days">90 Days</option>
                            </select>
                          </div>
                        </div>

                        {/* Salary Expectation */}
                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                            Expected CTC Range (₹ Lakhs Per Annum)
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ flex: 1 }}>
                              <span style={{ fontSize: '11px', color: '#64748b' }}>Minimum LPA</span>
                              <input
                                type="number"
                                value={jobPrefForm.minSalary}
                                onChange={(e) => setJobPrefForm({ ...jobPrefForm, minSalary: e.target.value })}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                              />
                            </div>
                            <span style={{ marginTop: '16px', fontWeight: 700, color: '#64748b' }}>—</span>
                            <div style={{ flex: 1 }}>
                              <span style={{ fontSize: '11px', color: '#64748b' }}>Maximum LPA</span>
                              <input
                                type="number"
                                value={jobPrefForm.maxSalary}
                                onChange={(e) => setJobPrefForm({ ...jobPrefForm, maxSalary: e.target.value })}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px' }}>
                        <button
                          type="button"
                          onClick={() => showToast('Job search preferences saved successfully!')}
                          style={{
                            backgroundColor: '#0c0d12',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Save Job Preferences
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 4: PRIVACY & SECURITY */}
                  {settingsSubTab === 'privacy' && (
                    <div>
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                          Privacy &amp; Security Controls
                        </h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                          Control who can see your profile and safeguard your credentials.
                        </p>
                      </div>

                      {/* Profile Visibility Cards */}
                      <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                          Profile Visibility
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {[
                            { id: 'public', title: 'Public (Recommended)', desc: 'Verified hiring managers and corporate recruiters can discover and message you directly.' },
                            { id: 'anonymous', title: 'Anonymous Mode', desc: 'Recruiters can inspect your skill badge, experience, and match score, but your identity is revealed only upon your interview approval.' },
                            { id: 'private', title: 'Private', desc: 'Only companies where you explicitly submit a job application can view your profile.' }
                          ].map(mode => (
                            <label
                              key={mode.id}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                padding: '14px 16px',
                                borderRadius: '12px',
                                border: privacySettings.visibility === mode.id ? '2px solid #0f172a' : '1px solid #e2e8f0',
                                backgroundColor: privacySettings.visibility === mode.id ? '#f8fafc' : '#ffffff',
                                cursor: 'pointer'
                              }}
                            >
                              <input
                                type="radio"
                                name="visibility"
                                checked={privacySettings.visibility === mode.id}
                                onChange={() => setPrivacySettings({ ...privacySettings, visibility: mode.id as any })}
                                style={{ marginTop: '3px', accentColor: '#0f172a' }}
                              />
                              <div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{mode.title}</div>
                                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{mode.desc}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Security Options */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Two-Factor Authentication (2FA)</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Protect sign-in with mandatory SMS or Authenticator OTP verification.</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacySettings.twoFactor}
                            onChange={(e) => setPrivacySettings({ ...privacySettings, twoFactor: e.target.checked })}
                            style={{ width: '18px', height: '18px', accentColor: '#0f172a', cursor: 'pointer' }}
                          />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Search Engine Indexing</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Allow search engines like Google to index your public career summary URL.</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={privacySettings.searchEngineIndexing}
                            onChange={(e) => setPrivacySettings({ ...privacySettings, searchEngineIndexing: e.target.checked })}
                            style={{ width: '18px', height: '18px', accentColor: '#0f172a', cursor: 'pointer' }}
                          />
                        </div>
                      </div>

                      {/* Active Sessions */}
                      <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Active Login Sessions</span>
                          <button
                            type="button"
                            onClick={() => showToast('All other device sessions have been revoked.')}
                            style={{ fontSize: '12px', color: '#2563eb', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Log Out Other Devices
                          </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#334155' }}>
                            <Laptop size={16} color="#16a34a" />
                            <span><strong>Mac OS (Chrome 128)</strong> — Bangalore, India <span style={{ color: '#16a34a', fontWeight: 700 }}>(Active Now)</span></span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#64748b' }}>
                            <Smartphone size={16} color="#94a3b8" />
                            <span><strong>iPhone 15 Pro (ProXHire App)</strong> — Bangalore, India • Last active 2 hours ago</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px' }}>
                        <button
                          type="button"
                          onClick={() => showToast('Privacy settings saved successfully!')}
                          style={{
                            backgroundColor: '#0c0d12',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Save Privacy Settings
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 5: APPEARANCE */}
                  {settingsSubTab === 'appearance' && (
                    <div>
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                          Appearance &amp; Display Settings
                        </h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                          Personalize your dashboard interface theme and readability.
                        </p>
                      </div>

                      {/* Theme selection cards */}
                      <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                          Color Theme
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                          {[
                            { id: 'light', name: 'Light Mode', bg: '#ffffff', border: '#e2e8f0', preview: '#f8fafc', text: '#0f172a' },
                            { id: 'dark', name: 'Dark Mode', bg: '#0f172a', border: '#334155', preview: '#1e293b', text: '#ffffff' },
                            { id: 'system', name: 'System Default', bg: '#f1f5f9', border: '#cbd5e1', preview: '#e2e8f0', text: '#0f172a' }
                          ].map(t => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: t.id as any })}
                              style={{
                                padding: '16px',
                                borderRadius: '12px',
                                border: appearanceSettings.theme === t.id ? '2px solid #0f172a' : '1px solid #cbd5e1',
                                backgroundColor: '#ffffff',
                                cursor: 'pointer',
                                textAlign: 'center'
                              }}
                            >
                              <div
                                style={{
                                  height: '48px',
                                  borderRadius: '8px',
                                  backgroundColor: t.bg,
                                  border: `1px solid ${t.border}`,
                                  marginBottom: '10px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: t.text,
                                  fontWeight: 700,
                                  fontSize: '12px'
                                }}
                              >
                                {t.name}
                              </div>
                              <div style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>
                                {t.name}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Density & Contrast */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Layout Density</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Choose between spacious comfortable mode or dense compact view.</div>
                          </div>
                          <select
                            value={appearanceSettings.density}
                            onChange={(e) => setAppearanceSettings({ ...appearanceSettings, density: e.target.value as any })}
                            style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                          >
                            <option value="comfortable">Comfortable</option>
                            <option value="compact">Compact</option>
                          </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>High Contrast Text</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Increase visual contrast for labels, buttons and muted subtext.</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={appearanceSettings.highContrast}
                            onChange={(e) => setAppearanceSettings({ ...appearanceSettings, highContrast: e.target.checked })}
                            style={{ width: '18px', height: '18px', accentColor: '#0f172a', cursor: 'pointer' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px' }}>
                        <button
                          type="button"
                          onClick={() => showToast('Appearance settings saved successfully!')}
                          style={{
                            backgroundColor: '#0c0d12',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Save Appearance Settings
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Profile Completeness + Quick Settings + Need Help */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* 1. Profile Completeness */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '24px'
                    }}
                  >
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0' }}>
                      Profile Completeness
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '18px' }}>
                      {/* 80% Ring */}
                      <div style={{ position: 'relative', width: '72px', height: '72px', flexShrink: 0 }}>
                        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="3.8"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#16a34a"
                            strokeWidth="3.8"
                            strokeDasharray={`${profileCompletionScore}, 100`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '15px',
                            fontWeight: 800,
                            color: '#0f172a'
                          }}
                        >
                          {profileCompletionScore}%
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '3px' }}>
                          Your profile is almost complete!
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
                          Add more details to get 3x more relevant job opportunities.
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCompleteProfileModalOpen(true)}
                      style={{
                        width: '100%',
                        backgroundColor: '#0c0d12',
                        color: '#ffffff',
                        border: 'none',
                        padding: '11px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      Complete Profile
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* 2. Quick Settings */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '24px'
                    }}
                  >
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0' }}>
                      Quick Settings
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => setSettingsSubTab('notifications')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              backgroundColor: '#f1f5f9',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#64748b',
                              flexShrink: 0
                            }}
                          >
                            <Bell size={17} />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                              Notification Settings
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                              Manage what updates you receive
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={16} color="#94a3b8" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSettingsSubTab('preferences')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              backgroundColor: '#f1f5f9',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#64748b',
                              flexShrink: 0
                            }}
                          >
                            <Calendar size={17} />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                              Job Preferences
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                              Update your job search preferences
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={16} color="#94a3b8" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSettingsSubTab('privacy')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              backgroundColor: '#f1f5f9',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#64748b',
                              flexShrink: 0
                            }}
                          >
                            <Shield size={17} />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                              Privacy &amp; Security
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                              Control your data and privacy
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={16} color="#94a3b8" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSettingsSubTab('appearance')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              backgroundColor: '#f1f5f9',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#64748b',
                              flexShrink: 0
                            }}
                          >
                            <Palette size={17} />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                              Appearance
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                              Choose theme and display settings
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={16} color="#94a3b8" />
                      </button>
                    </div>
                  </div>

                  {/* 3. Need Help? */}
                  <div
                    style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0f172a'
                        }}
                      >
                        <HelpCircle size={18} />
                      </div>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        Need Help?
                      </h4>
                    </div>

                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 18px 0' }}>
                      If you have any issues or questions, we're here to help.
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsSupportModalOpen(true)}
                      style={{
                        width: '100%',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        border: '1.5px solid #0f172a',
                        padding: '10px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 6. PROFILE VIEW ================= */}
          {activeSidebarTab === 'profile' && (
            <div>
              {/* Profile Page Header */}
              <div>
                <h1
                  style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    color: '#0f172a',
                    margin: '0 0 6px 0',
                    letterSpacing: '-0.02em'
                  }}
                >
                  My Profile
                </h1>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px 0' }}>
                  Manage your profile information and keep it updated to get better job opportunities.
                </p>
              </div>

              {/* 5-Tab Underline Navigation Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '32px',
                  borderBottom: '1px solid #e2e8f0',
                  marginBottom: '28px',
                  overflowX: 'auto'
                }}
              >
                {[
                  { id: 'personal', label: 'Personal Information', icon: User },
                  { id: 'professional', label: 'Professional Details', icon: Briefcase },
                  { id: 'skills', label: 'Skills & Preferences', icon: BarChart2 },
                  { id: 'documents', label: 'Documents', icon: FileText },
                  { id: 'account', label: 'Account Settings', icon: Settings }
                ].map(tab => {
                  const Icon = tab.icon
                  const isActive = profileSubTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        if (tab.id === 'account') {
                          setActiveSidebarTab('settings')
                        } else {
                          setProfileSubTab(tab.id as any)
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '0 0 14px 0',
                        background: 'none',
                        border: 'none',
                        borderBottom: isActive ? '2px solid #0f172a' : '2px solid transparent',
                        marginBottom: '-1px',
                        color: isActive ? '#0f172a' : '#64748b',
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '14px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Icon size={16} color={isActive ? '#0f172a' : '#64748b'} />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* TAB 1: Personal Information (Matches ProXHire Profile Dashboard.png) */}
              {profileSubTab === 'personal' && (
                <>
                  {/* Top 2-Column Section */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 1fr) 340px',
                      gap: '24px',
                      marginBottom: '24px'
                    }}
                    className="dashboard-two-column-grid"
                  >
                    {/* LEFT COLUMN: Hero Card & Personal Information Card */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {/* Hero Card */}
                      <div
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '1px solid #e2e8f0',
                          padding: '24px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          {/* Avatar with Camera Badge */}
                          <div style={{ position: 'relative', width: '92px', height: '92px', flexShrink: 0 }}>
                            <img
                              src={candidateProfileData.avatarUrl}
                              alt={candidateProfileData.fullName}
                              style={{
                                width: '92px',
                                height: '92px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                display: 'block'
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setEditingHeroForm({
                                  fullName: candidateProfileData.fullName,
                                  role: candidateProfileData.role,
                                  currentLocation: candidateProfileData.currentLocation,
                                  email: candidateProfileData.email,
                                  mobileNumber: candidateProfileData.mobileNumber
                                })
                                setIsEditHeroModalOpen(true)
                              }}
                              title="Update profile avatar"
                              style={{
                                position: 'absolute',
                                bottom: '2px',
                                right: '2px',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#0f172a',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid #ffffff',
                                cursor: 'pointer',
                                padding: 0
                              }}
                            >
                              <Camera size={13} />
                            </button>
                          </div>

                          {/* Profile Metadata */}
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <h2
                                style={{
                                  fontSize: '22px',
                                  fontWeight: 800,
                                  color: '#0f172a',
                                  margin: 0,
                                  letterSpacing: '-0.01em'
                                }}
                              >
                                {candidateProfileData.fullName}
                              </h2>
                              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CheckCircle2 size={18} fill="#10b981" color="#ffffff" />
                              </div>
                            </div>

                            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, marginTop: '4px' }}>
                              {candidateProfileData.role}
                            </div>

                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '18px',
                                marginTop: '12px',
                                fontSize: '13px',
                                color: '#64748b'
                              }}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <MapPin size={14} color="#64748b" />
                                <span>{candidateProfileData.currentLocation}</span>
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Mail size={14} color="#64748b" />
                                <span>{candidateProfileData.email}</span>
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Phone size={14} color="#64748b" />
                                <span>{candidateProfileData.mobileNumber}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Edit Profile Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingHeroForm({
                              fullName: candidateProfileData.fullName,
                              role: candidateProfileData.role,
                              currentLocation: candidateProfileData.currentLocation,
                              email: candidateProfileData.email,
                              mobileNumber: candidateProfileData.mobileNumber
                            })
                            setIsEditHeroModalOpen(true)
                          }}
                          style={{
                            backgroundColor: '#ffffff',
                            color: '#0f172a',
                            border: '1.5px solid #0f172a',
                            borderRadius: '10px',
                            padding: '9px 18px',
                            fontSize: '13px',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <Pencil size={14} />
                          <span>Edit Profile</span>
                        </button>
                      </div>

                      {/* Personal Information Card */}
                      <div
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '1px solid #e2e8f0',
                          padding: '24px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                        }}
                      >
                        {/* Card Header */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            marginBottom: '24px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <div style={{ marginTop: '2px', color: '#0f172a' }}>
                              <User size={22} />
                            </div>
                            <div>
                              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                Personal Information
                              </h3>
                              <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                                Your basic and contact details.
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingPersonalForm({
                                fullName: candidateProfileData.fullName,
                                gender: candidateProfileData.gender,
                                email: candidateProfileData.email,
                                currentLocation: candidateProfileData.currentLocation,
                                mobileNumber: candidateProfileData.mobileNumber,
                                alternateContact: candidateProfileData.alternateContact,
                                dateOfBirth: candidateProfileData.dateOfBirth,
                                nationality: candidateProfileData.nationality
                              })
                              setIsEditPersonalModalOpen(true)
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#0f172a',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '13px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              padding: 0
                            }}
                          >
                            <Pencil size={14} />
                            <span style={{ textDecoration: 'underline' }}>Edit</span>
                          </button>
                        </div>

                        {/* 2-Column Key-Value Grid */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                            rowGap: '22px',
                            columnGap: '32px'
                          }}
                        >
                          {/* Row 1 */}
                          <div>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '5px' }}>
                              Full Name
                            </div>
                            <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>
                              {candidateProfileData.fullName}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '5px' }}>
                              Gender
                            </div>
                            <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>
                              {candidateProfileData.gender}
                            </div>
                          </div>

                          {/* Row 2 */}
                          <div>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '5px' }}>
                              Email Address
                            </div>
                            <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>
                              {candidateProfileData.email}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '5px' }}>
                              Current Location
                            </div>
                            <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>
                              {candidateProfileData.currentLocation}
                            </div>
                          </div>

                          {/* Row 3 */}
                          <div>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '5px' }}>
                              Mobile Number
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>
                                {candidateProfileData.mobileNumber}
                              </span>
                              <span style={{ color: '#94a3b8', fontSize: '14px' }}>›</span>
                              {candidateProfileData.isMobileVerified && (
                                <span
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    backgroundColor: '#ecfdf5',
                                    color: '#059669',
                                    border: '1px solid #a7f3d0',
                                    padding: '2px 8px',
                                    borderRadius: '9999px',
                                    fontSize: '11px',
                                    fontWeight: 600
                                  }}
                                >
                                  <Check size={12} strokeWidth={3} />
                                  Verified
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '5px' }}>
                              Alternate Contact (Optional)
                            </div>
                            <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>
                              {candidateProfileData.alternateContact}
                            </div>
                          </div>

                          {/* Row 4 */}
                          <div>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '5px' }}>
                              Date of Birth
                            </div>
                            <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>
                              {candidateProfileData.dateOfBirth}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '5px' }}>
                              Nationality
                            </div>
                            <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>
                              {candidateProfileData.nationality}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Profile Completeness & Quick Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {/* Profile Completeness Card */}
                      <div
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '1px solid #e2e8f0',
                          padding: '22px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                        }}
                      >
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0' }}>
                          Profile Completeness
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                          {/* Circular Progress Ring */}
                          <div style={{ position: 'relative', width: '84px', height: '84px', flexShrink: 0 }}>
                            <svg width="84" height="84" viewBox="0 0 84 84">
                              <circle
                                cx="42"
                                cy="42"
                                r="34"
                                fill="none"
                                stroke="#e2e8f0"
                                strokeWidth="8"
                              />
                              <circle
                                cx="42"
                                cy="42"
                                r="34"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="8"
                                strokeDasharray="213.63"
                                strokeDashoffset={213.63 * (1 - profileCompletionScore / 100)}
                                strokeLinecap="round"
                                transform="rotate(-90 42 42)"
                                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                              />
                            </svg>
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '17px',
                                fontWeight: 800,
                                color: '#0f172a'
                              }}
                            >
                              {profileCompletionScore}%
                            </div>
                          </div>

                          <div>
                            <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.4, margin: '0 0 12px 0', fontWeight: 500 }}>
                              Complete your profile to get 3x more interview calls.
                            </p>
                            <button
                              type="button"
                              onClick={() => setIsCompleteProfileModalOpen(true)}
                              style={{
                                backgroundColor: '#0f172a',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span>Complete Profile</span>
                              <ArrowRight size={13} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions Card */}
                      <div
                        style={{
                          backgroundColor: '#eff6ff',
                          borderRadius: '16px',
                          border: '1px solid #dbeafe',
                          padding: '22px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                          <Zap size={18} fill="#2563eb" color="#2563eb" />
                          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                            Quick Actions
                          </h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {/* Action 1: Edit Profile */}
                          <div
                            onClick={() => {
                              setEditingHeroForm({
                                fullName: candidateProfileData.fullName,
                                role: candidateProfileData.role,
                                currentLocation: candidateProfileData.currentLocation,
                                email: candidateProfileData.email,
                                mobileNumber: candidateProfileData.mobileNumber
                              })
                              setIsEditHeroModalOpen(true)
                            }}
                            style={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px',
                              padding: '12px 14px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = '#94a3b8')}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '8px',
                                  backgroundColor: '#f1f5f9',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#0f172a'
                                }}
                              >
                                <Pencil size={16} />
                              </div>
                              <div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                                  Edit Profile
                                </div>
                                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                  Update your information
                                </div>
                              </div>
                            </div>
                            <ChevronRight size={16} color="#94a3b8" />
                          </div>

                          {/* Action 2: Upload / Manage Documents */}
                          <div
                            onClick={() => setIsUploadDocModalOpen(true)}
                            style={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px',
                              padding: '12px 14px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = '#94a3b8')}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '8px',
                                  backgroundColor: '#f1f5f9',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#0f172a'
                                }}
                              >
                                <FileText size={16} />
                              </div>
                              <div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                                  Upload / Manage Documents
                                </div>
                                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                  Add or update your documents
                                </div>
                              </div>
                            </div>
                            <ChevronRight size={16} color="#94a3b8" />
                          </div>

                          {/* Action 3: Take Skill Assessment */}
                          <div
                            onClick={() => setIsSkillAssessmentModalOpen(true)}
                            style={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px',
                              padding: '12px 14px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = '#94a3b8')}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '8px',
                                  backgroundColor: '#f1f5f9',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#0f172a'
                                }}
                              >
                                <BarChart2 size={16} />
                              </div>
                              <div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                                  Take Skill Assessment
                                </div>
                                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                  Showcase your skills
                                </div>
                              </div>
                            </div>
                            <ChevronRight size={16} color="#94a3b8" />
                          </div>

                          {/* Action 4: View Public Profile */}
                          <div
                            onClick={() => setIsViewPublicProfileModalOpen(true)}
                            style={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderRadius: '12px',
                              padding: '12px 14px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = '#94a3b8')}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '8px',
                                  backgroundColor: '#f1f5f9',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#0f172a'
                                }}
                              >
                                <Eye size={16} />
                              </div>
                              <div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                                  View Public Profile
                                </div>
                                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                  See how recruiters view your profile
                                </div>
                              </div>
                            </div>
                            <ChevronRight size={16} color="#94a3b8" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Full-Width Cards Stack */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Education Details Card */}
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          marginBottom: '20px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          <div style={{ marginTop: '2px', color: '#0f172a' }}>
                            <GraduationCap size={22} />
                          </div>
                          <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                              Education Details
                            </h3>
                            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                              Your academic background.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const edu = candidateProfileData.education[0] || {
                              qualification: 'B.Tech',
                              course: 'Computer Science',
                              university: 'RV College of Engineering',
                              year: '2020',
                              percentage: '8.6 CGPA'
                            }
                            setEditingEducationForm({
                              qualification: edu.qualification,
                              course: edu.course,
                              university: edu.university,
                              year: edu.year,
                              percentage: edu.percentage
                            })
                            setIsEditEducationModalOpen(true)
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#0f172a',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          <Pencil size={14} />
                          <span style={{ textDecoration: 'underline' }}>Edit</span>
                        </button>
                      </div>

                      <div style={{ width: '100%', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
                          <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                              <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Qualification</th>
                              <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Course / Degree</th>
                              <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>University / College</th>
                              <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Year of Passing</th>
                              <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Percentage / CGPA</th>
                            </tr>
                          </thead>
                          <tbody>
                            {candidateProfileData.education.map((edu, idx) => (
                              <tr key={edu.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{edu.qualification}</td>
                                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{edu.course}</td>
                                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{edu.university}</td>
                                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{edu.year}</td>
                                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{edu.percentage}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Work Experience Card */}
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          marginBottom: '20px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          <div style={{ marginTop: '2px', color: '#0f172a' }}>
                            <Briefcase size={22} />
                          </div>
                          <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                              Work Experience
                            </h3>
                            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                              Your professional experience.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const exp = candidateProfileData.experience[0] || {
                              company: 'ABC Technologies',
                              jobTitle: 'Software Developer',
                              duration: 'Jan 2021 – Present',
                              durationSub: '(3 Years)',
                              workType: 'Full-time',
                              location: 'Bangalore, Karnataka'
                            }
                            setEditingExperienceForm({
                              company: exp.company,
                              jobTitle: exp.jobTitle,
                              duration: exp.duration,
                              durationSub: exp.durationSub || '(3 Years)',
                              workType: exp.workType,
                              location: exp.location
                            })
                            setIsEditExperienceModalOpen(true)
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#0f172a',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          <Pencil size={14} />
                          <span style={{ textDecoration: 'underline' }}>Edit</span>
                        </button>
                      </div>

                      <div style={{ width: '100%', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
                          <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                              <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Company</th>
                              <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Job Title</th>
                              <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Duration</th>
                              <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Work Type</th>
                              <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Location</th>
                            </tr>
                          </thead>
                          <tbody>
                            {candidateProfileData.experience.map((exp, idx) => (
                              <tr key={exp.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{exp.company}</td>
                                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{exp.jobTitle}</td>
                                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>
                                  {exp.duration}{' '}
                                  {exp.durationSub && (
                                    <span style={{ color: '#64748b', marginLeft: '4px' }}>{exp.durationSub}</span>
                                  )}
                                </td>
                                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{exp.workType}</td>
                                <td style={{ padding: '16px', fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{exp.location}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: Professional Details */}
              {profileSubTab === 'professional' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Professional Summary */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '24px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        Professional Summary
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsEditHeroModalOpen(true)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0f172a',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <Pencil size={14} />
                        <span style={{ textDecoration: 'underline' }}>Edit</span>
                      </button>
                    </div>
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                      {candidateProfileData.bio}
                    </p>
                  </div>

                  {/* Work Experience Full Timeline */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '24px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                          Experience & Projects
                        </h3>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                          Detailed career trajectory and key software engineering accomplishments.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsEditExperienceModalOpen(true)}
                        style={{
                          backgroundColor: '#0f172a',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        + Add Experience
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {candidateProfileData.experience.map((exp, idx) => (
                        <div
                          key={exp.id || idx}
                          style={{
                            padding: '18px',
                            borderRadius: '12px',
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{exp.jobTitle}</div>
                              <div style={{ fontSize: '14px', color: '#2563eb', fontWeight: 600, marginTop: '2px' }}>{exp.company}</div>
                            </div>
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                              {exp.duration} {exp.durationSub}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '12px', color: '#64748b' }}>
                            <span>📍 {exp.location}</span>
                            <span>💼 {exp.workType}</span>
                          </div>
                          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginTop: '12px', marginBottom: 0 }}>
                            Led frontend architecture using React, TypeScript, and modern state management. Optimized core web vitals resulting in 40% faster initial page load. Collaborated with cross-functional design and product teams.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Skills & Preferences */}
              {profileSubTab === 'skills' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Skills Grid */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '24px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                          Technical Skills
                        </h3>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                          Verified competencies evaluated across your profile and previous assessments.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsSkillAssessmentModalOpen(true)}
                        style={{
                          backgroundColor: '#eff6ff',
                          color: '#2563eb',
                          border: '1px solid #bfdbfe',
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Take Assessment
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {[
                        'React.js',
                        'TypeScript',
                        'JavaScript (ES6+)',
                        'Next.js',
                        'Tailwind CSS',
                        'Redux Toolkit',
                        'Zustand',
                        'HTML5 / CSS3',
                        'RESTful APIs',
                        'GraphQL',
                        'Git & GitHub',
                        'Vite & Webpack',
                        'Jest / Testing Library',
                        'Node.js Basics'
                      ].map(skill => (
                        <span
                          key={skill}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '9999px',
                            backgroundColor: '#f1f5f9',
                            color: '#0f172a',
                            fontSize: '12px',
                            fontWeight: 600,
                            border: '1px solid #e2e8f0',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <CheckCircle2 size={12} color="#10b981" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Job Preferences Card */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '24px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        Job Preferences
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSidebarTab('settings')
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#2563eb',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Edit in Settings →
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', rowGap: '20px', columnGap: '32px' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Desired Role</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Frontend Developer / Software Developer</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Preferred Work Mode</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Hybrid / Remote</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Preferred Locations</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Bangalore, Hyderabad, Remote</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Expected CTC</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>₹ 18,00,000 – ₹ 24,00,000 / year</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Notice Period</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>15 Days / Immediate Joiner</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Employment Type</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Full-time Permanent</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Documents */}
              {profileSubTab === 'documents' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '24px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                          Uploaded Documents
                        </h3>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                          Verified credentials, resumes, and certificates visible to prospective recruiters.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsUploadDocModalOpen(true)}
                        style={{
                          backgroundColor: '#0f172a',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Upload size={13} />
                        <span>Upload Document</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { name: 'Sree_Nandini_Software_Developer_Resume.pdf', type: 'Resume / CV', size: '2.4 MB', date: '04 Oct 2026', isPrimary: true },
                        { name: 'BTech_Degree_RV_College.pdf', type: 'Degree Certificate', size: '1.8 MB', date: '15 Sep 2026', isPrimary: false },
                        { name: 'AWS_Certified_Cloud_Practitioner.pdf', type: 'Professional Certificate', size: '940 KB', date: '22 Aug 2026', isPrimary: false }
                      ].map((doc, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px',
                            borderRadius: '12px',
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                backgroundColor: '#eff6ff',
                                color: '#2563eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <FileText size={20} />
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{doc.name}</span>
                                {doc.isPrimary && (
                                  <span style={{ fontSize: '10px', fontWeight: 700, backgroundColor: '#dcfce7', color: '#16a34a', padding: '1px 6px', borderRadius: '4px' }}>
                                    Primary
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                {doc.type} • {doc.size} • Uploaded {doc.date}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => showToast(`Downloading ${doc.name}...`)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                backgroundColor: '#ffffff',
                                color: '#0f172a',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Download size={13} /> Download
                            </button>
                            <button
                              type="button"
                              onClick={() => showToast(`${doc.name} preview opened.`)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: '#0f172a',
                                color: '#ffffff',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Fallback for other sidebar views */}
          {activeSidebarTab !== 'dashboard' &&
            activeSidebarTab !== 'saved' &&
            activeSidebarTab !== 'applications' &&
            activeSidebarTab !== 'notifications' &&
            activeSidebarTab !== 'settings' &&
            activeSidebarTab !== 'profile' && (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '40px',
                  textAlign: 'center',
                  maxWidth: '680px',
                  margin: '40px auto'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    backgroundColor: '#f1f5f9',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <Sparkles size={26} />
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textTransform: 'capitalize' }}>
                  {activeSidebarTab.replace('-', ' ')}
                </h2>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
                  Manage your candidate preferences, view verified recruiter matches, and track your ongoing career journey.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setActiveSidebarTab('dashboard')}
                    style={{
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 22px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Go to Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSidebarTab('applications')}
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      border: '1.5px solid #0f172a',
                      padding: '10px 22px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    View My Applications
                  </button>
                </div>
              </div>
            )}
        </main>
      </div>

      {/* ================= INTERACTIVE MODALS ================= */}
      {/* 1. Job Details Modal */}
      {activeModalType === 'details' && activeModalApp && (
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
              padding: '30px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveModalApp(null)
                setActiveModalType(null)
              }}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <CompanyLogo name={activeModalApp.logoName} size={48} />
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                  {activeModalApp.role}
                </h3>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
                  {activeModalApp.company} • {activeModalApp.location}
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Application Status:</span>
                <span style={{ fontWeight: 700, color: activeModalApp.statusTheme?.text || '#2563eb' }}>{activeModalApp.statusLabel || 'In Progress'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Expected Salary:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{activeModalApp.details?.salary || 'Competitive'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Department:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{activeModalApp.details?.department || 'Engineering'}</span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeModalApp.details?.notes}
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveModalApp(null)
                setActiveModalType(null)
              }}
              style={{
                width: '100%',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 2. Feedback Modal */}
      {activeModalType === 'feedback' && activeModalApp && (
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
              padding: '30px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveModalApp(null)
                setActiveModalType(null)
              }}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              Application Feedback
            </h3>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
              {activeModalApp.role} at {activeModalApp.company}
            </div>

            <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px', padding: '16px', color: '#9f1239', fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeModalApp.details?.feedback}
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveModalApp(null)
                setActiveModalType(null)
              }}
              style={{
                width: '100%',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* 3. Offer Modal */}
      {activeModalType === 'offer' && activeModalApp && (
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
              padding: '30px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveModalApp(null)
                setActiveModalType(null)
              }}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                Job Offer from {activeModalApp.company}!
              </h3>
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                Position: {activeModalApp.role}
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Compensation:</span>
                <span style={{ fontWeight: 800, color: '#16a34a' }}>{activeModalApp.details?.salary}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Joining Date:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{activeModalApp.details?.joiningDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Location:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{activeModalApp.details?.location}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  setActiveModalApp(null)
                  setActiveModalType(null)
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Offer accepted! The onboarding coordinator will reach out via email.')
                  setActiveModalApp(null)
                  setActiveModalType(null)
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Accept Offer Letter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. CHANGE EMAIL MODAL ================= */}
      {isChangeEmailOpen && (
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
              maxWidth: '460px',
              width: '100%',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <button
              type="button"
              onClick={() => setIsChangeEmailOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Change Email Address
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
              Enter your new email address. A verification link will be sent to confirm ownership.
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Current Email
              </label>
              <input
                type="text"
                disabled
                value={settingsForm.email}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', color: '#64748b', fontSize: '13px' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                New Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={newEmailInput}
                onChange={(e) => setNewEmailInput(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#0f172a', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Confirm Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password to verify"
                value={emailPasswordInput}
                onChange={(e) => setEmailPasswordInput(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#0f172a', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsChangeEmailOpen(false)}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newEmailInput || !newEmailInput.includes('@')) {
                    showToast('Please enter a valid email address.')
                    return
                  }
                  if (!emailPasswordInput) {
                    showToast('Please enter your current password to confirm.')
                    return
                  }
                  setSettingsForm({ ...settingsForm, email: newEmailInput })
                  setIsChangeEmailOpen(false)
                  showToast(`Verification sent! Email updated to ${newEmailInput}`)
                }}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Save New Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. DOWNLOAD DATA MODAL ================= */}
      {isDownloadModalOpen && (
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
              maxWidth: '480px',
              width: '100%',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Download size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Download My Data
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                  Export all your candidate profile data, applications and documents.
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                Included Datasets:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={downloadIncludeResume}
                    onChange={(e) => setDownloadIncludeResume(e.target.checked)}
                    style={{ accentColor: '#0f172a' }}
                  />
                  <span>Personal Profile, Aadhaar Verification &amp; Resume Info</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={downloadIncludeApplications}
                    onChange={(e) => setDownloadIncludeApplications(e.target.checked)}
                    style={{ accentColor: '#0f172a' }}
                  />
                  <span>Job Applications History (5 records, interviews &amp; feedback)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={downloadIncludeSavedJobs}
                    onChange={(e) => setDownloadIncludeSavedJobs(e.target.checked)}
                    style={{ accentColor: '#0f172a' }}
                  />
                  <span>Saved Jobs &amp; Bookmarked Openings (5 items)</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsDownloadModalOpen(false)}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const exportData = {
                    candidateName: settingsForm.fullName,
                    email: settingsForm.email,
                    mobileNumber: `+91 ${settingsForm.mobileNumber}`,
                    profileCompleteness: `${profileCompletionScore}%`,
                    exportTimestamp: new Date().toISOString(),
                    applications: downloadIncludeApplications ? applications.map(a => ({
                      id: a.id,
                      role: a.role,
                      company: a.company,
                      status: a.statusLabel,
                      appliedDate: a.appliedDate
                    })) : [],
                    savedJobs: downloadIncludeSavedJobs ? savedJobsList.map(j => ({
                      id: j.id,
                      role: j.role,
                      company: j.company,
                      salary: j.salary
                    })) : []
                  }
                  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const link = document.createElement('a')
                  link.href = url
                  link.download = `proxhire_candidate_data_${settingsForm.fullName.toLowerCase().replace(/\s+/g, '_')}.json`
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                  URL.revokeObjectURL(url)
                  setIsDownloadModalOpen(false)
                  showToast('Data archive downloaded successfully (.json)!')
                }}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Download size={15} />
                Download JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6. DEACTIVATE ACCOUNT MODAL ================= */}
      {isDeactivateModalOpen && (
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
              maxWidth: '460px',
              width: '100%',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <button
              type="button"
              onClick={() => setIsDeactivateModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Trash2 size={24} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Deactivate Candidate Account?
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 20px 0' }}>
              Your profile will be temporarily hidden from recruiters. Any pending applications will be paused. You can reactivate anytime simply by logging back in.
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Why are you deactivating?
              </label>
              <select
                value={deactivateReason}
                onChange={(e) => setDeactivateReason(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#0f172a' }}
              >
                <option value="Taking a break from job hunting">Taking a break from job hunting</option>
                <option value="Found a new position elsewhere">Found a new position elsewhere</option>
                <option value="Too many notifications or messages">Too many notifications or messages</option>
                <option value="Temporary leave">Temporary leave</option>
                <option value="Other">Other reason</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsDeactivateModalOpen(false)}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Keep Account Active
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsDeactivateModalOpen(false)
                  showToast('Your candidate account has been paused. Safe travels!')
                }}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: 'none', backgroundColor: '#dc2626', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 7. DELETE ACCOUNT MODAL ================= */}
      {isDeleteModalOpen && (
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
              maxWidth: '460px',
              width: '100%',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Trash2 size={24} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626', margin: '0 0 6px 0' }}>
              Permanently Delete Account
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              Warning: This action is permanent and cannot be undone. All your applications, Aadhaar documents, and profile verification records will be permanently erased.
            </p>

            <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fecdd3', padding: '12px 14px', borderRadius: '10px', marginBottom: '18px', fontSize: '12px', color: '#be123c' }}>
              Please type <strong>DELETE</strong> below to confirm permanent deletion.
            </div>

            <div style={{ marginBottom: '22px' }}>
              <input
                type="text"
                placeholder="Type DELETE to confirm"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#0f172a', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmText.trim() !== 'DELETE'}
                onClick={() => {
                  setIsDeleteModalOpen(false)
                  showToast('Your account has been scheduled for permanent erasure.')
                }}
                style={{
                  flex: 1,
                  padding: '11px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: deleteConfirmText.trim() === 'DELETE' ? '#dc2626' : '#fca5a5',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: deleteConfirmText.trim() === 'DELETE' ? 'pointer' : 'not-allowed'
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 8. CONTACT SUPPORT MODAL ================= */}
      {isSupportModalOpen && (
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
              padding: '30px',
              position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <button
              type="button"
              onClick={() => setIsSupportModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}>
                <HelpCircle size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Contact Support
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                  We are here to assist with any platform issues or questions.
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Category
              </label>
              <select
                value={supportCategory}
                onChange={(e) => setSupportCategory(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#0f172a' }}
              >
                <option value="Account & Login">Account &amp; Login</option>
                <option value="Application Tracking">Application Tracking</option>
                <option value="Document & Aadhaar Verification">Document &amp; Aadhaar Verification</option>
                <option value="Interview Scheduling">Interview Scheduling</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Subject
              </label>
              <input
                type="text"
                placeholder="Brief summary of your question"
                value={supportSubject}
                onChange={(e) => setSupportSubject(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#0f172a', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Describe your issue or question in detail..."
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#0f172a', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(false)}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!supportSubject.trim() || !supportMessage.trim()) {
                    showToast('Please provide a subject and message.')
                    return
                  }
                  setIsSupportModalOpen(false)
                  setSupportSubject('')
                  setSupportMessage('')
                  showToast('Support ticket #PXH-89421 created! Our team will respond within 2 hours.')
                }}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 9. COMPLETE PROFILE MODAL ================= */}
      {isCompleteProfileModalOpen && (
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
              maxWidth: '480px',
              width: '100%',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <button
              type="button"
              onClick={() => setIsCompleteProfileModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Complete Your Candidate Profile
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
              Your profile is currently at <strong>{profileCompletionScore}%</strong>. Add the items below to reach 100%!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Add GitHub / Portfolio Link</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>+10% profile strength boost</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setProfileCompletionScore(prev => Math.min(100, prev + 10))
                    showToast('Portfolio link added! Profile +10%')
                  }}
                  style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Add Link
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Upload Certifications</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>+10% profile strength boost</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setProfileCompletionScore(100)
                    showToast('Certifications uploaded! Your profile is now 100% complete!')
                  }}
                  style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Upload
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCompleteProfileModalOpen(false)}
              style={{ width: '100%', padding: '11px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ================= PROFILE INTERACTIVE MODALS ================= */}
      {/* 1. Edit Profile Hero Modal */}
      {isEditHeroModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button
              type="button"
              onClick={() => setIsEditHeroModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Edit Profile Header
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
              Update your primary display name, role headline, and contact details.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={editingHeroForm.fullName}
                  onChange={e => setEditingHeroForm(prev => ({ ...prev, fullName: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Headline / Role Title
                </label>
                <input
                  type="text"
                  value={editingHeroForm.role}
                  onChange={e => setEditingHeroForm(prev => ({ ...prev, role: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Current Location
                </label>
                <input
                  type="text"
                  value={editingHeroForm.currentLocation}
                  onChange={e => setEditingHeroForm(prev => ({ ...prev, currentLocation: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={editingHeroForm.email}
                  onChange={e => setEditingHeroForm(prev => ({ ...prev, email: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={editingHeroForm.mobileNumber}
                  onChange={e => setEditingHeroForm(prev => ({ ...prev, mobileNumber: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setIsEditHeroModalOpen(false)}
                style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#64748b', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setCandidateProfileData(prev => ({
                    ...prev,
                    fullName: editingHeroForm.fullName,
                    role: editingHeroForm.role,
                    currentLocation: editingHeroForm.currentLocation,
                    email: editingHeroForm.email,
                    mobileNumber: editingHeroForm.mobileNumber
                  }))
                  setIsEditHeroModalOpen(false)
                  showToast('Profile header updated successfully!')
                }}
                style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Edit Personal Information Modal */}
      {isEditPersonalModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
              padding: '28px',
              position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button
              type="button"
              onClick={() => setIsEditPersonalModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Edit Personal Information
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
              Update your basic details, date of birth, contact number, and nationality.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={editingPersonalForm.fullName}
                  onChange={e => setEditingPersonalForm(prev => ({ ...prev, fullName: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Gender
                </label>
                <select
                  value={editingPersonalForm.gender}
                  onChange={e => setEditingPersonalForm(prev => ({ ...prev, gender: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={editingPersonalForm.email}
                  onChange={e => setEditingPersonalForm(prev => ({ ...prev, email: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Current Location
                </label>
                <input
                  type="text"
                  value={editingPersonalForm.currentLocation}
                  onChange={e => setEditingPersonalForm(prev => ({ ...prev, currentLocation: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={editingPersonalForm.mobileNumber}
                  onChange={e => setEditingPersonalForm(prev => ({ ...prev, mobileNumber: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Alternate Contact
                </label>
                <input
                  type="text"
                  value={editingPersonalForm.alternateContact}
                  onChange={e => setEditingPersonalForm(prev => ({ ...prev, alternateContact: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Date of Birth
                </label>
                <input
                  type="text"
                  value={editingPersonalForm.dateOfBirth}
                  onChange={e => setEditingPersonalForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Nationality
                </label>
                <input
                  type="text"
                  value={editingPersonalForm.nationality}
                  onChange={e => setEditingPersonalForm(prev => ({ ...prev, nationality: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setIsEditPersonalModalOpen(false)}
                style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#64748b', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setCandidateProfileData(prev => ({
                    ...prev,
                    fullName: editingPersonalForm.fullName,
                    gender: editingPersonalForm.gender,
                    email: editingPersonalForm.email,
                    currentLocation: editingPersonalForm.currentLocation,
                    mobileNumber: editingPersonalForm.mobileNumber,
                    alternateContact: editingPersonalForm.alternateContact,
                    dateOfBirth: editingPersonalForm.dateOfBirth,
                    nationality: editingPersonalForm.nationality
                  }))
                  setIsEditPersonalModalOpen(false)
                  showToast('Personal information updated successfully!')
                }}
                style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Edit Education Modal */}
      {isEditEducationModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button
              type="button"
              onClick={() => setIsEditEducationModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Edit Education Details
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
              Update your degree, field of study, college name, graduation year, and CGPA.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Qualification
                </label>
                <input
                  type="text"
                  value={editingEducationForm.qualification}
                  onChange={e => setEditingEducationForm(prev => ({ ...prev, qualification: e.target.value }))}
                  placeholder="e.g. B.Tech, M.S., BCA"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Course / Degree
                </label>
                <input
                  type="text"
                  value={editingEducationForm.course}
                  onChange={e => setEditingEducationForm(prev => ({ ...prev, course: e.target.value }))}
                  placeholder="e.g. Computer Science"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  University / College
                </label>
                <input
                  type="text"
                  value={editingEducationForm.university}
                  onChange={e => setEditingEducationForm(prev => ({ ...prev, university: e.target.value }))}
                  placeholder="e.g. RV College of Engineering"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                    Year of Passing
                  </label>
                  <input
                    type="text"
                    value={editingEducationForm.year}
                    onChange={e => setEditingEducationForm(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="2020"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                    Percentage / CGPA
                  </label>
                  <input
                    type="text"
                    value={editingEducationForm.percentage}
                    onChange={e => setEditingEducationForm(prev => ({ ...prev, percentage: e.target.value }))}
                    placeholder="8.6 CGPA"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setIsEditEducationModalOpen(false)}
                style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#64748b', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setCandidateProfileData(prev => ({
                    ...prev,
                    education: [
                      {
                        id: prev.education[0]?.id || 'edu-1',
                        qualification: editingEducationForm.qualification,
                        course: editingEducationForm.course,
                        university: editingEducationForm.university,
                        year: editingEducationForm.year,
                        percentage: editingEducationForm.percentage
                      }
                    ]
                  }))
                  setIsEditEducationModalOpen(false)
                  showToast('Education details updated successfully!')
                }}
                style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Edit Work Experience Modal */}
      {isEditExperienceModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button
              type="button"
              onClick={() => setIsEditExperienceModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Edit Work Experience
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
              Update company name, job designation, tenure duration, and work type.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Company Name
                </label>
                <input
                  type="text"
                  value={editingExperienceForm.company}
                  onChange={e => setEditingExperienceForm(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="e.g. ABC Technologies"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Job Title
                </label>
                <input
                  type="text"
                  value={editingExperienceForm.jobTitle}
                  onChange={e => setEditingExperienceForm(prev => ({ ...prev, jobTitle: e.target.value }))}
                  placeholder="e.g. Software Developer"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editingExperienceForm.duration}
                    onChange={e => setEditingExperienceForm(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="Jan 2021 – Present"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                    Duration Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingExperienceForm.durationSub}
                    onChange={e => setEditingExperienceForm(prev => ({ ...prev, durationSub: e.target.value }))}
                    placeholder="(3 Years)"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                    Work Type
                  </label>
                  <select
                    value={editingExperienceForm.workType}
                    onChange={e => setEditingExperienceForm(prev => ({ ...prev, workType: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingExperienceForm.location}
                    onChange={e => setEditingExperienceForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Bangalore, Karnataka"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setIsEditExperienceModalOpen(false)}
                style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#64748b', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setCandidateProfileData(prev => ({
                    ...prev,
                    experience: [
                      {
                        id: prev.experience[0]?.id || 'exp-1',
                        company: editingExperienceForm.company,
                        jobTitle: editingExperienceForm.jobTitle,
                        duration: editingExperienceForm.duration,
                        durationSub: editingExperienceForm.durationSub,
                        workType: editingExperienceForm.workType,
                        location: editingExperienceForm.location
                      }
                    ]
                  }))
                  setIsEditExperienceModalOpen(false)
                  showToast('Work experience updated successfully!')
                }}
                style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. View Public Profile Modal (Recruiter View) */}
      {isViewPublicProfileModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
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
              maxWidth: '680px',
              width: '100%',
              padding: '32px',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button
              type="button"
              onClick={() => setIsViewPublicProfileModalOpen(false)}
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={22} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#059669', backgroundColor: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
                Recruiter View Preview
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>• Live Public Candidate Page</span>
            </div>

            {/* Profile Header Card */}
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                backgroundColor: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '20px'
              }}
            >
              <img
                src={candidateProfileData.avatarUrl}
                alt={candidateProfileData.fullName}
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {candidateProfileData.fullName}
                  </h3>
                  <CheckCircle2 size={18} fill="#10b981" color="#ffffff" />
                  <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
                    ProX Verified Talent
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#475569', fontWeight: 600, marginTop: '2px' }}>
                  {candidateProfileData.role}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', display: 'flex', gap: '14px' }}>
                  <span>📍 {candidateProfileData.currentLocation}</span>
                  <span>🎓 {candidateProfileData.education[0]?.qualification || 'B.Tech'}</span>
                  <span>💼 3+ Years Exp</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>About Candidate</h4>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                {candidateProfileData.bio}
              </p>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Verified Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux', 'Next.js', 'REST APIs', 'Git'].map(s => (
                  <span key={s} style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText?.('https://proxhire.com/candidate/sree-nandini')
                  showToast('Public profile link copied to clipboard!')
                }}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid #0f172a',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ExternalLink size={14} />
                <span>Copy Public Link</span>
              </button>
              <button
                type="button"
                onClick={() => setIsViewPublicProfileModalOpen(false)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Upload / Manage Documents Modal */}
      {isUploadDocModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <button
              type="button"
              onClick={() => setIsUploadDocModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Upload / Manage Documents
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
              Upload your updated resume, degree certificates, or portfolio documents.
            </p>

            {/* Dropzone */}
            <div
              style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '14px',
                padding: '30px 20px',
                textAlign: 'center',
                backgroundColor: '#f8fafc',
                marginBottom: '20px',
                cursor: 'pointer'
              }}
              onClick={() => {
                showToast('Document uploaded successfully!')
                setIsUploadDocModalOpen(false)
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}
              >
                <Upload size={22} />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                Click to browse or drag and drop files
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                PDF, DOCX up to 10MB
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setIsUploadDocModalOpen(false)}
                style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#64748b', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast('Document uploaded successfully!')
                  setIsUploadDocModalOpen(false)
                }}
                style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Skill Assessment Modal */}
      {isSkillAssessmentModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
              position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button
              type="button"
              onClick={() => setIsSkillAssessmentModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              ProXHire Skill Assessments
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
              Earn verified skill badges to boost your profile ranking with enterprise tech recruiters.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { title: 'React.js Core & Advanced', duration: '40 mins', score: '94% (Top 5%)', status: 'Passed', verified: true },
                { title: 'TypeScript & Type Systems', duration: '35 mins', score: '88% (Top 10%)', status: 'Passed', verified: true },
                { title: 'Web Performance & Architecture', duration: '45 mins', score: 'Not Taken', status: 'Available', verified: false }
              ].map((test, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{test.title}</span>
                      {test.verified && <CheckCircle2 size={14} color="#10b981" />}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                      {test.duration} • {test.score}
                    </div>
                  </div>

                  {test.verified ? (
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', backgroundColor: '#ecfdf5', padding: '4px 10px', borderRadius: '6px' }}>
                      Badge Earned
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setIsSkillAssessmentModalOpen(false)
                        showToast('Assessment session scheduled! Invitation sent to your email.')
                      }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Start Test
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsSkillAssessmentModalOpen(false)}
              style={{ width: '100%', padding: '11px', borderRadius: '10px', border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ================= 10. FLOATING TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '14px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            fontWeight: 600,
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={14} color="#ffffff" strokeWidth={3} />
          </div>
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, marginLeft: '8px' }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Responsive Layout Styles */}
      <style>{`
        @media (max-width: 1080px) {
          .dashboard-overview-top-grid,
          .dashboard-two-column-grid,
          .metric-summary-cards,
          .bottom-action-cards {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .candidate-dashboard-layout {
            flex-direction: column !important;
          }
          .dashboard-dark-sidebar {
            width: 100% !important;
            min-height: auto !important;
            padding: 16px !important;
          }
          .settings-form-grid,
          .password-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
