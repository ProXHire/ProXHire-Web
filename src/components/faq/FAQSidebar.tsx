import React from 'react'
import { Mail, MessageCircle, MapPin, ArrowRight } from 'lucide-react'

interface FAQSidebarProps {
  onContactClick: () => void
}

export const FAQSidebar: React.FC<FAQSidebarProps> = ({ onContactClick }) => {
  return (
    <aside className="faq-sidebar">
      {/* Card 1: Still Have Questions? (Dark Card) */}
      <div className="faq-still-questions-card">
        <div className="still-q-header">
          <h3 className="still-q-title">Still Have Questions?</h3>
          <div className="still-q-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c0d0e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        </div>

        <p className="still-q-desc">
          Our team is here to help you with any queries about candidate registrations, recruiter registrations, or general information about ProxHire.
        </p>

        <button
          type="button"
          className="btn btn-outline still-q-btn"
          onClick={onContactClick}
        >
          <span>Contact Us</span>
          <ArrowRight size={16} />
        </button>

        {/* Decorative Dotted Grid in Corner */}
        <div className="dots-decoration-grid">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="dot" />
          ))}
        </div>
      </div>

      {/* Card 2: Quick Contact */}
      <div className="faq-info-card">
        <h4 className="faq-info-title">Quick Contact</h4>

        <div className="faq-info-list">
          <div className="faq-info-row">
            <Mail size={18} className="faq-info-icon" />
            <div className="faq-info-text">
              <a href="mailto:info@proxhire.in" className="faq-info-link">info@proxhire.in</a>
              <span className="faq-info-sub">We reply within 24 hours</span>
            </div>
          </div>

          <div className="faq-info-row">
            <MessageCircle size={18} className="faq-info-icon" />
            <div className="faq-info-text">
              <a href="https://wa.me/919100729332" target="_blank" rel="noreferrer" className="faq-info-link">WhatsApp Support</a>
              <span className="faq-info-sub">Mon – Sun 8:00 AM – 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Office Address */}
      <div className="faq-info-card">
        <h4 className="faq-info-title">Office Address</h4>

        <div className="faq-info-row" style={{ alignItems: 'flex-start' }}>
          <MapPin size={20} className="faq-info-icon" style={{ marginTop: '2px' }} />
          <div className="faq-info-text">
            <strong style={{ fontSize: '13px', color: '#0c0d0e', marginBottom: '4px' }}>
              ProxHire Services India Private Limited
            </strong>
            <span className="faq-info-sub" style={{ lineHeight: '1.5' }}>
              No. 224, 3rd Floor, Ranka Junction, 80/3 Vijnapura Village Hobli, Krishnarajapuram R S, Bangalore North, Bengaluru, Karnataka, India - 560016.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .faq-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Dark Card */
        .faq-still-questions-card {
          background-color: #111216;
          border-radius: 20px;
          padding: 32px 28px;
          color: #ffffff;
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
        }

        .still-q-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .still-q-title {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.015em;
        }

        .still-q-icon-box {
          width: 36px;
          height: 36px;
          background: #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .still-q-desc {
          font-size: 13.5px;
          color: #9ca3af;
          line-height: 1.55;
          margin-bottom: 24px;
          max-width: 280px;
        }

        .still-q-btn {
          background-color: #ffffff;
          color: #0c0d0e;
          border-color: #ffffff;
          font-size: 13.5px;
          padding: 9px 22px;
          position: relative;
          z-index: 2;
        }

        .still-q-btn:hover {
          background-color: #f4f4f5;
        }

        .dots-decoration-grid {
          position: absolute;
          bottom: 16px;
          right: 16px;
          display: grid;
          grid-template-columns: repeat(6, 4px);
          gap: 6px;
          opacity: 0.35;
          pointer-events: none;
        }

        .dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: #ffffff;
        }

        /* Light Cards */
        .faq-info-card {
          background-color: #f9f9fb;
          border: 1px solid #ebeef2;
          border-radius: 18px;
          padding: 24px;
        }

        .faq-info-title {
          font-size: 15px;
          font-weight: 700;
          color: #0c0d0e;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .faq-info-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .faq-info-icon {
          color: #0c0d0e;
          flex-shrink: 0;
        }

        .faq-info-text {
          display: flex;
          flex-direction: column;
        }

        .faq-info-link {
          font-size: 14px;
          font-weight: 700;
          color: #0c0d0e;
          transition: color 0.15s ease;
        }

        .faq-info-link:hover {
          color: #3b82f6;
        }

        .faq-info-sub {
          font-size: 12px;
          color: #64748b;
          margin-top: 2px;
        }
      `}</style>
    </aside>
  )
}
