import React, { useState } from 'react'
import {
  Award,
  ShieldCheck,
  Clock,
  Play,
  X
} from 'lucide-react'

export const CandidateSkillsTab: React.FC = () => {
  const [assessmentModal, setAssessmentModal] = useState<any | null>(null)
  const [testScore, setTestScore] = useState<number | null>(null)
  const [isSubmittingTest, setIsSubmittingTest] = useState(false)

  const completedSkills = [
    {
      id: 'skill-react',
      title: 'React 19 & Architecture',
      score: 92,
      percentile: 'Top 5%',
      level: 'Advanced Specialist',
      date: '04 Oct 2026',
      badgeBg: '#ecfdf5',
      badgeColor: '#059669',
      verified: true
    },
    {
      id: 'skill-ts',
      title: 'TypeScript & Type Safety',
      score: 95,
      percentile: 'Top 3%',
      level: 'Expert',
      date: '02 Oct 2026',
      badgeBg: '#ecfdf5',
      badgeColor: '#059669',
      verified: true
    },
    {
      id: 'skill-node',
      title: 'Node.js & Backend APIs',
      score: 88,
      percentile: 'Top 10%',
      level: 'Proficient',
      date: '28 Sep 2026',
      badgeBg: '#eff6ff',
      badgeColor: '#2563eb',
      verified: true
    }
  ]

  const availableAssessments = [
    {
      id: 'test-dsa',
      title: 'Data Structures & Algorithms in JS/TS',
      duration: '45 Mins',
      questions: 25,
      category: 'Computer Science Core',
      difficulty: 'Medium - Hard'
    },
    {
      id: 'test-sql',
      title: 'PostgreSQL & Database Design',
      duration: '30 Mins',
      questions: 20,
      category: 'Databases',
      difficulty: 'Intermediate'
    },
    {
      id: 'test-css',
      title: 'Modern CSS & Responsive Systems',
      duration: '25 Mins',
      questions: 18,
      category: 'Frontend Styling',
      difficulty: 'Intermediate'
    }
  ]

  const handleStartTest = (test: any) => {
    setAssessmentModal(test)
    setTestScore(null)
  }

  const handleSubmitTest = () => {
    setIsSubmittingTest(true)
    setTimeout(() => {
      setIsSubmittingTest(false)
      setTestScore(94)
    }, 1200)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                Skill Assessments &amp; Badges
              </h1>
              <span style={{ backgroundColor: '#ecfdf5', color: '#059669', fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={13} /> Verified Badges
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Standardized assessments verified by Proxy. Verified skill badges highlight your profile directly to tech recruiters.
            </p>
          </div>
        </div>
      </div>

      {/* Completed Badges Grid */}
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
          Your Verified Badges (3)
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}
        >
          {completedSkills.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      Completed on {item.date}
                    </div>
                  </div>
                </div>
                <span style={{ backgroundColor: item.badgeBg, color: item.badgeColor, fontSize: '12px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>
                  {item.score}%
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f1f5f9', fontSize: '12px' }}>
                <span style={{ color: '#059669', fontWeight: 700 }}>
                  ✓ {item.percentile} ({item.level})
                </span>
                <span style={{ color: '#2563eb', fontWeight: 600 }}>
                  Show on Resume
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Assessments */}
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
          Available Assessments to Take
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}
        >
          {availableAssessments.map((test) => (
            <div
              key={test.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px' }}>
                  {test.category}
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '8px 0 6px 0' }}>
                  {test.title}
                </h3>
                <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {test.duration}
                  </div>
                  <div>{test.questions} Questions</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleStartTest(test)}
                style={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 16px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Play size={13} /> Take Assessment
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment Interactive Simulation Modal */}
      {assessmentModal && (
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
              padding: '28px',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}
          >
            <button
              type="button"
              onClick={() => setAssessmentModal(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            {testScore ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Award size={32} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                  Assessment Passed! Score: {testScore}%
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
                  Congratulations! You've successfully earned the verified badge for <strong>{assessmentModal.title}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setAssessmentModal(null)}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#0f172a', color: '#fff', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                >
                  Add Badge to Profile
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                  {assessmentModal.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
                  Duration: {assessmentModal.duration} • {assessmentModal.questions} Multiple Choice &amp; Logic Questions
                </p>

                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', fontSize: '13px', color: '#334155' }}>
                  <div><strong>Sample Question 1:</strong> Which of the following data structures offers optimal average time complexity O(1) for key lookups?</div>
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="radio" name="sample_q" defaultChecked />
                      <span>Hash Table / Map</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="radio" name="sample_q" />
                      <span>Binary Search Tree</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="radio" name="sample_q" />
                      <span>Linked List</span>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setAssessmentModal(null)}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitTest}
                    disabled={isSubmittingTest}
                    style={{ flex: 2, padding: '10px', borderRadius: '8px', border: 'none', background: '#0f172a', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                  >
                    {isSubmittingTest ? 'Grading Answers...' : 'Submit & Grade Test'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
