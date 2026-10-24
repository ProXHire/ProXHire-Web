import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { type FAQCategory } from './FAQCategoriesFilter'

interface FAQItem {
  id: string
  category: FAQCategory
  question: string
  answer: string
}

interface FAQAccordionListProps {
  activeCategory: FAQCategory
  searchQuery: string
}

export const FAQAccordionList: React.FC<FAQAccordionListProps> = ({
  activeCategory,
  searchQuery
}) => {
  // First item open by default matching screenshot
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'gen-1': true
  })

  const allFaqs: FAQItem[] = [
    // General
    {
      id: 'gen-1',
      category: 'general',
      question: 'What is ProxHire?',
      answer:
        'ProxHire is a recruitment platform designed to connect candidates and employers through a simple, trusted, and technology-driven hiring experience. We aim to make recruitment more efficient by connecting job seekers with genuine opportunities and helping employers discover relevant talent.'
    },
    {
      id: 'gen-2',
      category: 'general',
      question: 'What is the meaning behind the name "ProxHire"?',
      answer:
        'The name "ProxHire" represents standing in as a trusted proxy on behalf of our candidates and recruiters — acting as a reliable bridge that simplifies every step of hiring, verification, and career advancement.'
    },
    {
      id: 'gen-3',
      category: 'general',
      question: 'Where is ProxHire currently focused?',
      answer:
        'ProxHire is currently launched and focused on the Bengaluru tech and commercial ecosystem, with a long-term vision to expand nationwide across India.'
    },
    {
      id: 'gen-4',
      category: 'general',
      question: 'What industries and job categories does ProxHire cover?',
      answer:
        'ProxHire connects talent across a diverse range of industries including IT & Software, Data & Analytics, Engineering, BPO & Support, Sales & Marketing, Finance & Banking, Healthcare, Education, Manufacturing, Retail & Ecommerce, and Hospitality & Travel.'
    },
    {
      id: 'gen-5',
      category: 'general',
      question: 'Is ProxHire a job consultancy or a job portal?',
      answer:
        'ProxHire combines the speed and accessibility of a modern digital portal with the personalized curation, rigorous verification, and advisory support of an expert recruitment partner.'
    },
    {
      id: 'gen-6',
      category: 'general',
      question: 'Is there any registration fee for candidates or recruiters?',
      answer:
        'Candidate registration, profile creation, and job discovery are 100% free of charge. For recruiters, we offer transparent, flexible hiring solutions designed for startups, SMEs, and enterprises.'
    },
    {
      id: 'gen-7',
      category: 'general',
      question: 'Does ProxHire guarantee a job?',
      answer:
        'While no ethical platform can guarantee job placement, ProxHire guarantees that all posted job openings and employer connections are genuine and verified, dramatically increasing your chances of landing the right role.'
    },

    // Candidates
    {
      id: 'cand-1',
      category: 'candidates',
      question: 'How do I register as a candidate on ProxHire?',
      answer:
        'Click the "Join as Candidate" button, enter your basic contact details and professional skills, and submit your profile. Our team will verify your details and connect you with matching employers.'
    },
    {
      id: 'cand-2',
      category: 'candidates',
      question: 'Can freshers and recent college graduates apply?',
      answer:
        'Yes! ProxHire has dedicated opportunities tailored for freshers, entry-level candidates, internships, and experienced professionals alike.'
    },
    {
      id: 'cand-3',
      category: 'candidates',
      question: 'How will employers and recruiters reach out to me?',
      answer:
        'Once your profile is matched to an active requirement, employers or our talent coordinators will reach out via verified email, phone, or WhatsApp.'
    },

    // Recruiters
    {
      id: 'rec-1',
      category: 'recruiters',
      question: 'How does ProxHire verify candidates before matching?',
      answer:
        'Our team reviews candidate credentials, work history, and contact details to ensure genuine profiles and reduce recruiter screening time.'
    },
    {
      id: 'rec-2',
      category: 'recruiters',
      question: 'How quickly can I find relevant candidates for open roles?',
      answer:
        'Most employers in Bengaluru receive initial verified candidate recommendations within 24 to 48 hours of submitting their hiring requirements.'
    },

    // Registration
    {
      id: 'reg-1',
      category: 'registration',
      question: 'How long does the verification process take?',
      answer:
        'Verification typically takes between 12 to 24 hours. Our operations team works Monday through Sunday from 8:00 AM to 9:00 PM.'
    },
    {
      id: 'reg-2',
      category: 'registration',
      question: 'Can I update my profile and experience after registration?',
      answer:
        'Yes, you can update your contact information, resume, and preferred job locations at any time by contacting our support team.'
    },

    // Data & Privacy
    {
      id: 'priv-1',
      category: 'privacy',
      question: 'Is my personal and contact information secure?',
      answer:
        'Yes. ProxHire adheres strictly to data security and privacy best practices. Your information is never sold to third parties and is shared only with verified employers for legitimate hiring purposes.'
    },

    // Support
    {
      id: 'sup-1',
      category: 'support',
      question: 'What are the working hours of the ProxHire support desk?',
      answer:
        'Our customer support team is available every day (Monday to Sunday) from 8:00 AM to 9:00 PM via email at info@proxhire.in.'
    }
  ]

  // Filter based on search query or active category
  const filteredFaqs = allFaqs.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    }
    return item.category === activeCategory
  })

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const categoryTitles: Record<FAQCategory, string> = {
    general: 'General Questions',
    candidates: 'Candidate Questions',
    recruiters: 'Recruiter Questions',
    registration: 'Registration Questions',
    privacy: 'Data & Privacy Questions',
    support: 'Support Questions'
  }

  return (
    <div className="faq-list-container">
      {/* Category Subheading */}
      <div className="faq-list-header">
        <h2 className="faq-list-title">
          {searchQuery.trim() ? `Search Results for "${searchQuery}"` : categoryTitles[activeCategory]}
        </h2>
        <p className="faq-list-subtitle">
          {searchQuery.trim()
            ? `Found ${filteredFaqs.length} matching questions.`
            : 'Learn more about ProxHire and how our platform works.'}
        </p>
      </div>

      {/* Accordion Items */}
      <div className="faq-accordion-wrap">
        {filteredFaqs.length === 0 ? (
          <div className="faq-empty-state">
            <p>No questions matched your search. Try another query or contact our team directly.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id]
            return (
              <div
                key={faq.id}
                className={`faq-accordion-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-toggle-icon">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer-block">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      <style>{`
        .faq-list-container {
          display: flex;
          flex-direction: column;
        }

        .faq-list-header {
          margin-bottom: 24px;
        }

        .faq-list-title {
          font-size: 26px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .faq-list-subtitle {
          font-size: 14px;
          color: #64748b;
        }

        .faq-accordion-wrap {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-accordion-card {
          background-color: #ffffff;
          border: 1px solid #ebeef2;
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .faq-accordion-card.is-open {
          border-color: #d4d4d8;
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.05);
        }

        .faq-question-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          text-align: left;
          background: transparent;
          gap: 16px;
          cursor: pointer;
        }

        .faq-question-text {
          font-size: 15.5px;
          font-weight: 700;
          color: #0c0d0e;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }

        .faq-toggle-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: #f4f4f7;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0c0d0e;
          flex-shrink: 0;
          transition: background-color 0.2s ease;
        }

        .faq-accordion-card:hover .faq-toggle-icon {
          background-color: #e4e4e7;
        }

        .faq-answer-block {
          padding: 0 24px 22px;
          animation: fadeIn 0.2s ease-out;
        }

        .faq-answer-block p {
          font-size: 14.5px;
          color: #475467;
          line-height: 1.65;
          background-color: #f9f9fb;
          padding: 16px 20px;
          border-radius: 12px;
        }

        .faq-empty-state {
          padding: 32px 20px;
          text-align: center;
          color: #64748b;
          font-size: 14.5px;
          background-color: #f9f9fb;
          border-radius: 16px;
        }
      `}</style>
    </div>
  )
}
