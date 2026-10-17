import React, { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { Menu, X, ArrowRight, Sparkles, ShieldCheck, MapPin, Phone, Mail, LogIn, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export type NavPage =
  | 'home'
  | 'jobs'
  | 'about'
  | 'recruiters'
  | 'candidates'
  | 'contact'
  | 'faq'
  | 'join-candidate'
  | 'register-recruiter'
  | 'candidate-dashboard'
  | 'recruiter-dashboard'

interface NavbarProps {
  currentPage: NavPage
  onPageChange: (page: NavPage) => void
  onJoinCandidate: () => void
  onHireTalent: () => void
  onOpenAuth: (role?: 'candidate' | 'recruiter') => void
  onNavigateSection?: (sectionId: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  onJoinCandidate,
  onHireTalent,
  onOpenAuth,
  onNavigateSection
}) => {
  const { user, userRole, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', id: 'home', isPage: true },
    { name: 'Find Jobs', id: 'jobs', isPage: true },
    { name: 'Dashboard', id: 'candidate-dashboard', isPage: true },
    { name: 'About', id: 'about', isPage: true },
    { name: 'Recruiters', id: 'recruiters', isPage: true },
    { name: 'Candidates', id: 'candidates', isPage: true },
    { name: 'Contact', id: 'contact', isPage: true },
    { name: 'FAQs', id: 'faq', isPage: true },
  ]

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false)
    if (link.isPage) {
      onPageChange(link.id as NavPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      if (onNavigateSection) {
        onNavigateSection(link.id)
      }
    }
  }

  const isJoinCandidateActive = currentPage === 'join-candidate'

  return (
    <header
      className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.96)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid #f0f0f3' : '1px solid transparent',
        transition: 'all 0.25s ease'
      }}
    >
      {/* Sleek Top Highlights Bar */}
      <div className="navbar-top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-badge">
              <Sparkles size={11} className="badge-sparkle-icon" />
              <span>ProxHire</span>
            </span>

            <div className="top-bar-highlights">
              <span className="highlight-item">
                <ShieldCheck size={13} className="highlight-icon green-icon" />
                <span>Verified Talent &amp; Direct Matching</span>
              </span>
              <span className="top-bar-dot">•</span>
              <span className="highlight-item">
                <MapPin size={13} className="highlight-icon blue-icon" />
                <span>India's Trusted Career Bridge</span>
              </span>
            </div>
          </div>

          <div className="top-bar-right">
            <a href="mailto:info@proxhire.in" className="top-bar-link" aria-label="Email ProxHire Support">
              <Mail size={12} />
              <span>info@proxhire.in</span>
            </a>
            <span className="top-bar-sep">|</span>
            <a href="tel:9100729332" className="top-bar-link" aria-label="Call ProxHire Support">
              <Phone size={12} />
              <span>9100729332</span>
            </a>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px'
        }}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => {
            onPageChange('home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', textAlign: 'left', background: 'transparent', border: 'none', padding: 0 }}
          aria-label="ProxHire Home"
        >
          <Logo height={54} />
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}
        >
          {navLinks.map((link) => {
            const isActive =
              (link.isPage && currentPage === link.id) ||
              (link.id === 'recruiters' && currentPage === 'register-recruiter')
            return (
              <button
                key={link.name}
                type="button"
                onClick={() => handleLinkClick(link)}
                style={{
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#0c0d0e' : '#475467',
                  position: 'relative',
                  padding: '6px 2px',
                  transition: 'color 0.15s ease',
                  borderBottom: isActive ? '2px solid #0c0d0e' : '2px solid transparent'
                }}
                className="nav-link-item"
              >
                {link.name}
              </button>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div
          className="desktop-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (userRole === 'recruiter') {
                    onPageChange('recruiter-dashboard')
                  } else {
                    onPageChange('candidate-dashboard')
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                style={{
                  fontSize: '13px',
                  padding: '9px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <LayoutDashboard size={15} />
                {userRole === 'recruiter' ? 'Recruiter Dashboard' : 'My Dashboard'}
              </button>
              <button
                type="button"
                onClick={logout}
                style={{
                  fontSize: '13px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e4e4e7',
                  backgroundColor: '#ffffff',
                  color: '#71717a',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onOpenAuth('candidate')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#09090b',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <LogIn size={15} /> Sign In
              </button>
              <button
                type="button"
                className={`btn ${isJoinCandidateActive ? 'btn-primary' : 'btn-outline'}`}
                onClick={onJoinCandidate}
                style={{
                  fontSize: '13px',
                  padding: '9px 18px',
                  borderWidth: isJoinCandidateActive ? '1px' : '1.5px',
                  borderColor: '#0c0d0e'
                }}
              >
                Join as Candidate
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onHireTalent}
                style={{ fontSize: '13px', padding: '9px 18px' }}
              >
                Hire Talent
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            padding: '8px',
            color: '#18181b',
            borderRadius: '6px'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: 'absolute',
            top: '76px',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e4e4e7',
            padding: '24px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {navLinks.map((link) => {
            const isActive = link.isPage && currentPage === link.id
            return (
              <button
                key={link.name}
                type="button"
                onClick={() => handleLinkClick(link)}
                style={{
                  fontSize: '16px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#0c0d0e' : '#18181b',
                  padding: '10px 0',
                  textAlign: 'left',
                  borderBottom: '1px solid #f4f4f5',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{link.name}</span>
                {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0c0d0e' }} />}
              </button>
            )
          })}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setMobileMenuOpen(false)
                onJoinCandidate()
              }}
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>Join as Candidate</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setMobileMenuOpen(false)
                onHireTalent()
              }}
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>Hire Talent</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .navbar-top-bar {
          background-color: #0c0d0e;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 11.5px;
          color: #a1a1aa;
          padding: 6px 0;
          line-height: 1;
        }

        .top-bar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .top-bar-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 2.5px 8px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }

        .badge-sparkle-icon {
          color: #f59e0b;
        }

        .top-bar-highlights {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #d4d4d8;
          font-weight: 500;
          font-size: 11.5px;
        }

        .highlight-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .highlight-icon {
          flex-shrink: 0;
        }

        .green-icon {
          color: #10b981;
        }

        .blue-icon {
          color: #60a5fa;
        }

        .top-bar-dot {
          color: #52525b;
          font-size: 9px;
        }

        .top-bar-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .top-bar-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #a1a1aa;
          text-decoration: none;
          font-size: 11.5px;
          transition: color 0.15s ease;
        }

        .top-bar-link:hover {
          color: #ffffff;
        }

        .top-bar-sep {
          color: #3f3f46;
          font-size: 10px;
        }

        .nav-link-item:hover {
          color: #0c0d0e !important;
        }

        @media (max-width: 990px) {
          .top-bar-right {
            display: none;
          }
          .top-bar-inner {
            justify-content: center;
          }
        }

        @media (max-width: 680px) {
          .top-bar-highlights span:nth-child(n+3) {
            display: none;
          }
          .top-bar-badge {
            display: none;
          }
          .navbar-top-bar {
            padding: 5px 0;
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .top-bar-highlights {
            font-size: 10.5px;
          }
          .highlight-item span {
            display: inline;
          }
          .top-bar-dot {
            display: none;
          }
          .top-bar-highlights .highlight-item:nth-child(n+3) {
            display: none;
          }
        }

        @media (max-width: 360px) {
          .top-bar-highlights {
            display: none;
          }
        }

        @media (max-width: 1080px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  )
}
