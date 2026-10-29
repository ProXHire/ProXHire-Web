import React from 'react'
import { Mail, MessageCircle, Share2 } from 'lucide-react'

export const ContactChannels: React.FC = () => {
  return (
    <section className="contact-channels-section">
      <div className="container">
        <div className="channels-grid">

          {/* 2. Email Us */}
          <div className="channel-card">
            <div className="channel-icon-circle">
              <Mail size={22} color="#ffffff" />
            </div>
            <div className="channel-content">
              <span className="channel-label">Email Us</span>
              <a href="mailto:info@proxhire.in" className="channel-main-link">
                info@proxhire.in
              </a>
              <div className="channel-subtext">
                <span>We reply within 24 hours</span>
              </div>
            </div>
          </div>

          {/* 3. Chat on WhatsApp */}
          <div className="channel-card">
            <div className="channel-icon-circle">
              <MessageCircle size={22} color="#ffffff" />
            </div>
            <div className="channel-content">
              <span className="channel-label">Chat on WhatsApp</span>
              <a
                href="https://wa.me/919100729332"
                target="_blank"
                rel="noreferrer"
                className="channel-main-link"
              >
                WhatsApp Support
              </a>
              <div className="channel-subtext">
                <span>Mon – Sun</span>
                <span>8:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* 4. Follow Us */}
          <div className="channel-card">
            <div className="channel-icon-circle">
              <Share2 size={20} color="#ffffff" />
            </div>
            <div className="channel-content">
              <span className="channel-label">Follow Us</span>
              <div className="channel-social-links">
                <a
                  href="https://www.linkedin.com/company/proxy-services-india-private-limited/about/?viewAsMember=true"
                  target="_blank"
                  rel="noreferrer"
                  className="channel-social-btn"
                  aria-label="ProxHire LinkedIn"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/proxhire.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="channel-social-btn"
                  aria-label="ProxHire Instagram"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
              </div>
              <div className="channel-subtext">
                <span>Stay updated with our latest updates and insights.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-channels-section {
          padding: 20px 0 60px;
          background-color: #ffffff;
        }

        .channels-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .channel-card {
          background-color: #f9f9fb;
          border: 1px solid #ebeef2;
          border-radius: 20px;
          padding: 28px 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: all 0.25s ease;
        }

        .channel-card:hover {
          transform: translateY(-3px);
          background-color: #ffffff;
          border-color: #d4d4d8;
          box-shadow: 0 14px 28px -6px rgba(0, 0, 0, 0.08);
        }

        .channel-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #0c0d0e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .channel-content {
          display: flex;
          flex-direction: column;
        }

        .channel-label {
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
          margin-bottom: 4px;
        }

        .channel-main-link {
          font-size: 17px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
          transition: color 0.15s ease;
        }

        .channel-main-link:hover {
          color: #3b82f6;
        }

        .channel-subtext {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          color: #64748b;
          line-height: 1.45;
        }

        .channel-social-links {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .channel-social-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #d4d4d8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0c0d0e;
          transition: all 0.2s ease;
        }

        .channel-social-btn:hover {
          background-color: #0c0d0e;
          color: #ffffff;
          border-color: #0c0d0e;
        }

        @media (max-width: 1040px) {
          .channels-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .channels-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
