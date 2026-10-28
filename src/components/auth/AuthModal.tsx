import React, { useState, useEffect, useRef } from 'react'
import {
  X,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { RecaptchaVerifier, type ConfirmationResult } from 'firebase/auth'
import { auth } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import type { UserRole } from '../../types/user'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialRole?: UserRole
  onSuccess: (role: UserRole) => void
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'candidate',
  onSuccess
}) => {
  const { loginWithEmail, registerWithEmail, sendPhoneOtp, verifyPhoneOtp } = useAuth()

  const [role, setRole] = useState<UserRole>(initialRole)
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('email')
  const [isRegister, setIsRegister] = useState(false)

  // Form states
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
  const [timer, setTimer] = useState(60)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null)

  useEffect(() => {
    setRole(initialRole)
    setError(null)
  }, [initialRole, isOpen])

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [otpSent, timer])

  // Setup reCAPTCHA
  const setupRecaptcha = (): RecaptchaVerifier => {
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear()
    }
    const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {}
    })
    recaptchaVerifierRef.current = verifier
    return verifier
  }

  if (!isOpen) return null

  // 1. Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const cleanedNumber = phoneNumber.trim().replace(/\D/g, '')
    if (cleanedNumber.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return
    }

    const formattedPhone = `+91${cleanedNumber}`
    setLoading(true)

    try {
      const verifier = setupRecaptcha()
      const confirmation = await sendPhoneOtp(formattedPhone, verifier)
      setConfirmationResult(confirmation)
      setOtpSent(true)
      setTimer(60)
    } catch (err: any) {
      console.error('Phone OTP error:', err)
      setError(err.message || 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // 2. Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirmationResult || !otp || otp.length < 6) {
      setError('Please enter the full 6-digit OTP code.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await verifyPhoneOtp(confirmationResult, otp, role, {
        fullName: fullName || (role === 'candidate' ? 'Candidate' : 'Recruiter'),
        companyName
      })
      onSuccess(role)
      onClose()
    } catch (err: any) {
      console.error('OTP confirmation error:', err)
      setError(err.message || 'Invalid or expired OTP code.')
    } finally {
      setLoading(false)
    }
  }

  // 3. Email Submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isRegister) {
        if (!fullName) {
          setError('Full name is required.')
          setLoading(false)
          return
        }
        if (role === 'recruiter' && !companyName) {
          setError('Company name is required for recruiter registration.')
          setLoading(false)
          return
        }
        await registerWithEmail(email, password, role, {
          fullName,
          mobileNumber: phoneNumber,
          companyName,
          location: 'Bengaluru'
        })
      } else {
        await loginWithEmail(email, password)
      }
      onSuccess(role)
      onClose()
    } catch (err: any) {
      console.error('Email auth error:', err)
      setError(err.message || 'Authentication failed. Please check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      {/* Hidden invisible reCAPTCHA container */}
      <div id="recaptcha-container"></div>

      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '460px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid #e4e4e7'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '20px 24px 16px',
            borderBottom: '1px solid #f4f4f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  backgroundColor: '#0c0d0e',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}
              >
                Proxy {role === 'candidate' ? 'Candidate' : 'Employer'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>
                <ShieldCheck size={14} /> Verified Access
              </span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#09090b', marginTop: '6px' }}>
              {isRegister ? 'Create an Account' : 'Sign in to Proxy'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#f4f4f5',
              cursor: 'pointer',
              color: '#71717a'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div style={{ padding: '16px 24px 0' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              backgroundColor: '#f4f4f5',
              borderRadius: '10px',
              padding: '3px',
              gap: '4px'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setRole('candidate')
                setError(null)
              }}
              style={{
                padding: '9px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                backgroundColor: role === 'candidate' ? '#ffffff' : 'transparent',
                color: role === 'candidate' ? '#09090b' : '#71717a',
                boxShadow: role === 'candidate' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Job Seeker / Candidate
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('recruiter')
                setError(null)
              }}
              style={{
                padding: '9px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                backgroundColor: role === 'recruiter' ? '#ffffff' : 'transparent',
                color: role === 'recruiter' ? '#09090b' : '#71717a',
                boxShadow: role === 'recruiter' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Employer / Recruiter
            </button>
          </div>
        </div>

        {/* Authentication Notice: Email & Password */}
        <div style={{ padding: '12px 24px 0', display: 'flex', gap: '16px', borderBottom: '1px solid #f4f4f5' }}>
          <div
            style={{
              padding: '8px 4px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#09090b',
              borderBottom: '2px solid #09090b',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Mail size={14} /> Email & Password
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: '20px 24px' }}>
          {error && (
            <div
              style={{
                marginBottom: '16px',
                padding: '10px 14px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fee2e2',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '13px',
                color: '#b91c1c'
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{error}</span>
            </div>
          )}

          {/* METHOD 1: PHONE OTP FLOW */}
          {authMethod === 'phone' && (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#27272a', marginBottom: '6px' }}>
                      Mobile Number
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1.5px solid #e4e4e7',
                        borderRadius: '8px',
                        padding: '0 12px',
                        backgroundColor: '#fafafa'
                      }}
                    >
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#52525b', marginRight: '8px' }}>+91</span>
                      <input
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        maxLength={10}
                        required
                        style={{
                          width: '100%',
                          padding: '11px 0',
                          border: 'none',
                          outline: 'none',
                          fontSize: '14px',
                          backgroundColor: 'transparent'
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '11px', color: '#71717a', marginTop: '4px', display: 'block' }}>
                      We'll send an official 6-digit SMS OTP to verify your account (Tier 1 BGV).
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#09090b',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : 'Get Verification Code'}
                    <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#27272a' }}>
                        Enter 6-digit OTP
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        style={{ fontSize: '12px', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Change Number
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="• • • • • •"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      autoFocus
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1.5px solid #e4e4e7',
                        borderRadius: '8px',
                        fontSize: '18px',
                        letterSpacing: '6px',
                        textAlign: 'center',
                        fontWeight: 700,
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '12px', color: '#71717a' }}>
                      <span>Sent to +91 {phoneNumber}</span>
                      {timer > 0 ? (
                        <span>Resend in {timer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          style={{ color: '#09090b', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          Resend Code
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#09090b',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : 'Verify & Enter Dashboard'}
                    <CheckCircle2 size={16} />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* METHOD 2: EMAIL & PASSWORD FLOW */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailSubmit}>
              {isRegister && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#27272a', marginBottom: '4px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your complete name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1.5px solid #e4e4e7',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}

              {isRegister && role === 'recruiter' && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#27272a', marginBottom: '4px' }}>
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Tech Bengaluru"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1.5px solid #e4e4e7',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#27272a', marginBottom: '4px' }}>
                  {role === 'recruiter' ? 'Official Work Email' : 'Email Address'}
                </label>
                <input
                  type="email"
                  placeholder={role === 'recruiter' ? 'name@company.com' : 'you@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1.5px solid #e4e4e7',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#27272a', marginBottom: '4px' }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1.5px solid #e4e4e7',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#09090b',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : isRegister ? 'Register Account' : 'Sign In'}
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(!isRegister)
                    setError(null)
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '13px',
                    color: '#52525b',
                    cursor: 'pointer'
                  }}
                >
                  {isRegister ? (
                    <>
                      Already have an account? <strong style={{ color: '#09090b' }}>Sign In</strong>
                    </>
                  ) : (
                    <>
                      New to Proxy? <strong style={{ color: '#09090b' }}>Create an Account</strong>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Guarantee */}
        <div
          style={{
            padding: '12px 24px',
            backgroundColor: '#fafafa',
            borderTop: '1px solid #f4f4f5',
            fontSize: '11px',
            color: '#71717a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>🔒 100% Encrypted & BGV Verified</span>
          <span>Bengaluru, Karnataka</span>
        </div>
      </div>
    </div>
  )
}
