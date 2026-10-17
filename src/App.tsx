import { useState, useEffect } from 'react'
import { Navbar, type NavPage, Modal, type ModalType } from './components'
import {
  HomePage,
  AboutPage,
  RecruitersPage,
  CandidatesPage,
  ContactPage,
  FAQPage,
  JoinCandidatePage,
  RecruiterRegisterPage,
  CandidateDashboard,
  RecruiterDashboard,
  JobsPage
} from './pages'
import { AuthModal } from './components/auth/AuthModal'
import { useScrollReveal } from './hooks/useScrollReveal'
import type { UserRole } from './types/user'

export function App() {
  // Support hash navigation and state
  const [currentPage, setCurrentPage] = useState<NavPage>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#home') return 'home'
      if (hash === '#jobs' || hash === '#find-jobs') return 'jobs'
      if (hash === '#about') return 'about'
      if (hash === '#recruiters') return 'recruiters'
      if (hash === '#candidates') return 'candidates'
      if (hash === '#contact') return 'contact'
      if (hash === '#faq' || hash === '#faqs') return 'faq'
      if (hash === '#join-candidate' || hash === '#join') return 'join-candidate'
      if (hash === '#register-recruiter' || hash === '#recruiter-registration' || hash === '#hire-talent') return 'register-recruiter'
      if (hash === '#candidate-dashboard' || hash === '#profile' || hash === '#candidate-profile' || hash === '#settings') return 'candidate-dashboard'
      if (hash === '#recruiter-dashboard') return 'recruiter-dashboard'
    }
    return 'home'
  })

  const [modalType, setModalType] = useState<ModalType>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('candidate')

  // Trigger GPU-accelerated scroll animations dynamically on page change
  useScrollReveal(currentPage)

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#home') {
        setCurrentPage('home')
      } else if (hash === '#jobs' || hash === '#find-jobs') {
        setCurrentPage('jobs')
      } else if (hash === '#about' || hash === '#about-us' || hash === '#our-story') {
        setCurrentPage('about')
      } else if (hash === '#recruiters' || hash === '#for-recruiters') {
        setCurrentPage('recruiters')
      } else if (hash === '#candidates' || hash === '#for-candidates') {
        setCurrentPage('candidates')
      } else if (hash === '#contact' || hash === '#contact-us') {
        setCurrentPage('contact')
      } else if (hash === '#faq' || hash === '#faqs') {
        setCurrentPage('faq')
      } else if (hash === '#join-candidate' || hash === '#join') {
        setCurrentPage('join-candidate')
      } else if (hash === '#register-recruiter' || hash === '#recruiter-registration' || hash === '#hire-talent') {
        setCurrentPage('register-recruiter')
      } else if (
        hash === '#candidate-dashboard' ||
        hash === '#settings' ||
        hash === '#candidate-settings' ||
        hash === '#applications' ||
        hash === '#my-applications' ||
        hash === '#saved-jobs' ||
        hash === '#saved' ||
        hash === '#notifications' ||
        hash === '#profile' ||
        hash === '#candidate-profile'
      ) {
        setCurrentPage('candidate-dashboard')
      } else if (hash === '#recruiter-dashboard') {
        setCurrentPage('recruiter-dashboard')
      }
    }

    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handlePageChange = (page: NavPage) => {
    setCurrentPage(page)
    window.location.hash = page
  }

  const handleOpenCandidateModal = () => {
    handlePageChange('join-candidate')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenRecruiterModal = () => {
    const isDev = typeof window !== 'undefined' && window.location.hostname.includes('localhost')
    const employerUrl = isDev ? 'http://localhost:5175' : 'https://employer.proxhire.in'
    window.open(employerUrl, '_blank')
  }

  const handleOpenAuth = (role: UserRole = 'candidate') => {
    setAuthInitialRole(role)
    setAuthModalOpen(true)
  }

  const handleOpenCategoryModal = (catName: string) => {
    setSelectedCategory(catName)
    handlePageChange('jobs')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenInfoModal = () => {
    setModalType('info')
  }

  const handleCloseModal = () => {
    setModalType(null)
    setSelectedCategory('')
  }

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'categories' || sectionId === 'how-it-works' || sectionId === 'for-candidates') {
      if (currentPage !== 'home' && currentPage !== 'candidates') {
        setCurrentPage('candidates')
      }
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="proxy-app-root">
      {/* 1. Header with active tab underline, auth button & instant switching */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onJoinCandidate={handleOpenCandidateModal}
        onHireTalent={handleOpenRecruiterModal}
        onOpenAuth={handleOpenAuth}
        onNavigateSection={handleNavigateSection}
      />

      {/* 2. Main Page Render */}
      <main>
        {currentPage === 'home' && (
          <HomePage
            onJoinCandidate={handleOpenCandidateModal}
            onHireTalent={handleOpenRecruiterModal}
            onSelectCategory={handleOpenCategoryModal}
            onKnowMore={handleOpenInfoModal}
          />
        )}
        {currentPage === 'jobs' && (
          <JobsPage
            onOpenAuth={() => handleOpenAuth('candidate')}
            onNavigateDashboard={() => {
              handlePageChange('candidate-dashboard')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            initialCategory={selectedCategory}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onJoinCandidate={handleOpenCandidateModal}
            onRegisterRecruiter={handleOpenRecruiterModal}
          />
        )}
        {currentPage === 'recruiters' && (
          <RecruitersPage
            onRegisterRecruiter={handleOpenRecruiterModal}
          />
        )}
        {currentPage === 'candidates' && (
          <CandidatesPage
            onJoinCandidate={handleOpenCandidateModal}
            onSelectCategory={handleOpenCategoryModal}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
        {currentPage === 'faq' && (
          <FAQPage
            onContactClick={() => handlePageChange('contact')}
          />
        )}
        {currentPage === 'join-candidate' && (
          <JoinCandidatePage onNavigateDashboard={() => handlePageChange('candidate-dashboard')} />
        )}
        {currentPage === 'register-recruiter' && (
          <RecruiterRegisterPage />
        )}
        {currentPage === 'candidate-dashboard' && (
          <CandidateDashboard onBrowseJobs={() => handlePageChange('jobs')} />
        )}
        {currentPage === 'recruiter-dashboard' && (
          <RecruiterDashboard />
        )}
      </main>

      {/* 3. Interactive Category/Info Modal Dialog */}
      <Modal
        type={modalType}
        categoryName={selectedCategory}
        onClose={handleCloseModal}
      />

      {/* 4. Multi-Role Phone OTP & Email Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authInitialRole}
        onSuccess={(role) => {
          handlePageChange(role === 'recruiter' ? 'recruiter-dashboard' : 'candidate-dashboard')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
    </div>
  )
}

export default App
