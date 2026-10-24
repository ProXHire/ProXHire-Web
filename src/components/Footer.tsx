import React from 'react'
import { Logo } from './Logo'
import {
  Mail,
  MapPin,
  ShieldCheck,
  Info
} from 'lucide-react'

interface FooterProps {
  variant?: 'light' | 'dark'
}

export const Footer: React.FC<FooterProps> = ({ variant = 'dark' }) => {
  const isDark = variant === 'dark'

  return (
    <footer
      id="contact"
      className="site-footer"
      style={{
        backgroundColor: isDark ? '#0c0d0e' : '#ffffff',
        borderTop: isDark ? '1px solid #1f2024' : '1px solid #ebeef2',
        color: isDark ? '#d4d4d8' : '#64748b'
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-brand-col">
            <div style={{ marginBottom: '20px' }}>
              <Logo variant={isDark ? 'light' : 'dark'} height={54} />
            </div>
            <p className="footer-brand-desc" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
              A recruitment platform designed to connect candidates and employers through a simple, trusted and technology-driven experience.
            </p>
            <div className="footer-socials">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-circle"
                style={{
                  borderColor: isDark ? '#27272a' : '#e2e8f0',
                  color: isDark ? '#ffffff' : '#0c0d0e',
                  backgroundColor: isDark ? '#18181b' : '#ffffff'
                }}
                aria-label="ProxHire LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-circle"
                style={{
                  borderColor: isDark ? '#27272a' : '#e2e8f0',
                  color: isDark ? '#ffffff' : '#0c0d0e',
                  backgroundColor: isDark ? '#18181b' : '#ffffff'
                }}
                aria-label="ProxHire Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title" style={{ color: isDark ? '#ffffff' : '#0c0d0e' }}>Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#home" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>Home</a></li>
              <li><a href="#about" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>About</a></li>
              <li><a href="#recruiters" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>Recruiters</a></li>
              <li><a href="#candidates" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>Candidates</a></li>
              <li><a href="#contact" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>Contact</a></li>
              <li><a href="#faq" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>FAQs</a></li>
            </ul>
          </div>

          {/* Column 3: Job Categories */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title" style={{ color: isDark ? '#ffffff' : '#0c0d0e' }}>Job Categories</h4>
            <ul className="footer-links-list">
              <li><a href="#categories" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>IT & Software</a></li>
              <li><a href="#categories" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>Sales & Marketing</a></li>
              <li><a href="#categories" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>Healthcare</a></li>
              <li><a href="#categories" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>Manufacturing</a></li>
              <li><a href="#categories" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>Hospitality & Travel</a></li>
              <li><a href="#categories" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>View All</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title" style={{ color: isDark ? '#ffffff' : '#0c0d0e' }}>Contact Us</h4>
            <div className="contact-items">
              <div className="contact-row">
                <Mail size={16} className="contact-icon" color={isDark ? '#9ca3af' : '#0c0d0e'} />
                <a href="mailto:info@proxhire.in" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>info@proxhire.in</a>
              </div>
              <div className="contact-row" style={{ alignItems: 'flex-start' }}>
                <MapPin size={18} className="contact-icon" color={isDark ? '#9ca3af' : '#0c0d0e'} style={{ marginTop: '3px' }} />
                <span className="address-text" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
                  No. 224, 3rd Floor, Ranka Junction, 80/3 Vijnapura Village Hobli, Krishnarajapuram R S, Bengaluru, Karnataka, India - 560016.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance & Disclaimers Strip (2-Column Compact Layout) */}
        <div
          className="footer-disclaimers-strip"
          style={{
            borderTop: isDark ? '1px solid #1a1b1e' : '1px solid #edf0f4',
            paddingTop: '18px',
            paddingBottom: '18px',
            marginTop: '28px'
          }}
        >
          <div className="footer-disclaimers-grid">
            <div className="disclaimer-col">
              <div className="disclaimer-header">
                <ShieldCheck size={14} color={isDark ? '#a1a1aa' : '#475569'} style={{ flexShrink: 0 }} />
                <span className="disclaimer-title" style={{ color: isDark ? '#e4e4e7' : '#1e293b' }}>
                  Privacy &amp; Verification
                </span>
                <span
                  className="disclaimer-tag"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#f1f5f9',
                    color: isDark ? '#a1a1aa' : '#64748b'
                  }}
                >
                  DPDP Act, 2023
                </span>
              </div>
              <p className="disclaimer-text" style={{ color: isDark ? '#71717a' : '#64748b' }}>
                Candidate verification and background checks are initiated only with the candidate’s explicit consent. ProxHire uses authorized verification and API-based workflows, where applicable, for identity, employment and background verification. Our data-handling practices are designed in alignment with applicable requirements under India’s Digital Personal Data Protection Act, 2023.
              </p>
            </div>

            <div className="disclaimer-col">
              <div className="disclaimer-header">
                <Info size={14} color={isDark ? '#a1a1aa' : '#475569'} style={{ flexShrink: 0 }} />
                <span className="disclaimer-title" style={{ color: isDark ? '#e4e4e7' : '#1e293b' }}>
                  Platform &amp; Third-Party Services
                </span>
                <span
                  className="disclaimer-tag"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#f1f5f9',
                    color: isDark ? '#a1a1aa' : '#64748b'
                  }}
                >
                  Independent Platform
                </span>
              </div>
              <p className="disclaimer-text" style={{ color: isDark ? '#71717a' : '#64748b' }}>
                ProxHire is an independent recruitment technology platform. References to DigiLocker, EPFO/UAN, e-Courts or other third-party services indicate supported or applicable verification integrations and do not imply ownership, endorsement or affiliation. All respective names and trademarks belong to their respective owners.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div
          className="footer-bottom-bar"
          style={{
            borderTopColor: isDark ? '#1a1b1e' : '#edf0f4',
            color: isDark ? '#71717a' : '#64748b'
          }}
        >
          <p className="copyright-text">
            © 2026 ProxHire India Private Limited. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="#privacy" style={{ color: isDark ? '#71717a' : '#64748b' }}>Privacy Policy</a>
            <span className="divider" style={{ color: isDark ? '#3f3f46' : '#cbd5e1' }}>|</span>
            <a href="#terms" style={{ color: isDark ? '#71717a' : '#64748b' }}>Terms & Conditions</a>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          padding-top: 50px;
          padding-bottom: 24px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2.3fr 1.1fr 1.3fr 2.3fr;
          gap: 36px;
          margin-bottom: 12px;
        }

        .footer-brand-desc {
          font-size: 13.5px;
          line-height: 1.6;
          max-width: 280px;
          margin-bottom: 20px;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .social-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .social-circle:hover {
          transform: translateY(-2px);
          opacity: 0.85;
        }

        .footer-col-title {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 18px;
          letter-spacing: -0.01em;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links-list a {
          font-size: 13px;
          transition: color 0.15s ease;
        }

        .footer-links-list a:hover {
          color: #ffffff !important;
        }

        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
        }

        .contact-row a {
          transition: color 0.15s ease;
        }

        .contact-row a:hover {
          color: #ffffff !important;
        }

        .contact-icon {
          flex-shrink: 0;
        }

        .address-text {
          font-size: 12.5px;
          line-height: 1.5;
        }

        .footer-disclaimers-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .disclaimer-header {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 6px;
        }

        .disclaimer-title {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .disclaimer-tag {
          font-size: 9.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 1.5px 6px;
          border-radius: 9999px;
        }

        .disclaimer-text {
          font-size: 11.5px;
          line-height: 1.6;
          margin: 0;
        }

        .footer-bottom-bar {
          border-top: 1px solid;
          padding-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12.5px;
        }

        .legal-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .legal-links a {
          transition: color 0.15s ease;
        }

        .legal-links a:hover {
          color: #ffffff !important;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .footer-disclaimers-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            margin-bottom: 20px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .site-footer {
            padding-top: 36px;
            padding-bottom: 20px;
          }
          .footer-grid {
            gap: 24px;
          }
          .footer-brand-desc {
            max-width: 100%;
            font-size: 13px;
          }
          .address-text {
            font-size: 12px;
          }
          .disclaimer-text {
            font-size: 11px;
          }
        }
      `}</style>
    </footer>
  )
}
