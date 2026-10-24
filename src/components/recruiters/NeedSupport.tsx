import React from 'react'
import { Mail } from 'lucide-react'

export const NeedSupport: React.FC = () => {
  return (
    <section className="need-support-section">
      <div className="container">
        <div className="need-support-card">
          {/* Left Text */}
          <div className="support-col-left">
            <h3 className="support-title">Need Support?</h3>
            <p className="support-desc">
              Have questions or need assistance with recruiter registration?<br className="desk-br" />
              Our team is here to help.
            </p>
          </div>


          {/* Right: Email */}
          <div className="support-col-item">
            <div className="support-icon-wrap">
              <Mail size={20} color="#0c0d0e" />
            </div>
            <div className="support-item-info">
              <a href="mailto:info@proxhire.in" className="support-contact-link">
                info@proxhire.in
              </a>
              <span className="support-item-sub">We reply within 24 hours</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .need-support-section {
          padding: 20px 0 80px;
          background-color: #ffffff;
        }

        .need-support-card {
          background-color: #f9f9fb;
          border: 1px solid #ebeef2;
          border-radius: 20px;
          padding: 36px 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .support-col-left {
          flex: 1.2;
        }

        .support-title {
          font-size: 20px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.015em;
          margin-bottom: 6px;
        }

        .support-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.5;
        }

        .support-col-item {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 0.9;
        }

        .support-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .support-item-info {
          display: flex;
          flex-direction: column;
        }

        .support-contact-link {
          font-size: 15px;
          font-weight: 700;
          color: #0c0d0e;
          transition: color 0.15s ease;
        }

        .support-contact-link:hover {
          color: #3b82f6;
        }

        .support-item-sub {
          font-size: 12.5px;
          color: #64748b;
          margin-top: 2px;
        }

        @media (max-width: 900px) {
          .need-support-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 28px 24px;
            gap: 24px;
          }
          .desk-br {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
