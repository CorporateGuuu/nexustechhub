import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength('');
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) setPasswordStrength('weak');
    else if (strength <= 3) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, redirect to sign in
      router.push('/auth/signin?message=Registration successful! Please sign in.');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Sign Up" description="Create your Nexus Tech Hub account">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Join Nexus Tech Hub</h1>
            <p>Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="name-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
                minLength="8"
              />
              {formData.password && (
                <div className={`password-strength ${passwordStrength}`}>
                  <div className="strength-bars">
                    <span className={passwordStrength === 'weak' || passwordStrength === 'medium' || passwordStrength === 'strong' ? 'active' : ''}></span>
                    <span className={passwordStrength === 'medium' || passwordStrength === 'strong' ? 'active' : ''}></span>
                    <span className={passwordStrength === 'strong' ? 'active' : ''}></span>
                  </div>
                  <span className="strength-text">
                    {passwordStrength === 'weak' && 'Weak'}
                    {passwordStrength === 'medium' && 'Medium'}
                    {passwordStrength === 'strong' && 'Strong'}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                minLength="8"
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <span className="checkmark"></span>
                I agree to the{' '}
                <Link href="/terms" className="terms-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="social-auth">
            <button className="social-button google">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link href="/auth/signin" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-sidebar">
          <div className="sidebar-content">
            <h2>Why Choose Nexus Tech Hub?</h2>
            <p>Join thousands of professionals who trust us for their repair needs.</p>
            <ul className="benefits-list">
              <li>Professional-grade tools & parts</li>
              <li>OEM quality guaranteed</li>
              <li>Fast worldwide shipping</li>
              <li>Competitive pricing</li>
              <li>Secure payment & data protection</li>
              <li>Expert technical support</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem 1rem;
        }

        .auth-card {
          flex: 1;
          max-width: 450px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .auth-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #10b981 0%, #059669 50%, #047857 100%);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .auth-header p {
          color: #64748b;
          font-size: 1rem;
        }

        .auth-form {
          margin-bottom: 2rem;
        }

        .name-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
          outline: none;
        }

        .form-group input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .password-strength {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .strength-bars {
          display: flex;
          gap: 2px;
        }

        .strength-bars span {
          width: 20px;
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          transition: background-color 0.2s ease;
        }

        .strength-bars span.active {
          background: #10b981;
        }

        .password-strength.weak .strength-bars span.active {
          background: #ef4444;
        }

        .password-strength.medium .strength-bars span.active {
          background: #f59e0b;
        }

        .password-strength.strong .strength-bars span.active {
          background: #10b981;
        }

        .strength-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
        }

        .password-strength.weak .strength-text {
          color: #ef4444;
        }

        .password-strength.medium .strength-text {
          color: #f59e0b;
        }

        .password-strength.strong .strength-text {
          color: #10b981;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: #64748b;
          cursor: pointer;
          line-height: 1.5;
        }

        .checkbox-label input[type="checkbox"] {
          display: none;
          margin-top: 2px;
        }

        .checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          position: relative;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark {
          background: #10b981;
          border-color: #10b981;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .terms-link {
          color: #10b981;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .terms-link:hover {
          color: #059669;
        }

        .auth-button {
          width: 100%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .auth-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .auth-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .auth-button:hover:not(:disabled)::before {
          left: 100%;
        }

        .auth-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .auth-divider {
          position: relative;
          text-align: center;
          margin: 2rem 0;
        }

        .auth-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e2e8f0;
        }

        .auth-divider span {
          background: white;
          padding: 0 1rem;
          color: #64748b;
          font-size: 0.875rem;
          position: relative;
          z-index: 1;
        }

        .social-auth {
          margin-bottom: 2rem;
        }

        .social-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          color: #374151;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .social-button:hover {
          border-color: #d1d5db;
          background: #f9fafb;
        }

        .auth-footer {
          text-align: center;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .auth-footer p {
          color: #64748b;
          font-size: 0.875rem;
          margin: 0;
        }

        .auth-link {
          color: #10b981;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .auth-link:hover {
          color: #059669;
        }

        .error-message {
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border: 1px solid #fca5a5;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          color: #dc2626;
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
        }

        .auth-sidebar {
          display: none;
        }

        @media (min-width: 1024px) {
          .auth-container {
            align-items: center;
            justify-content: center;
            gap: 4rem;
            padding: 4rem 2rem;
          }

          .auth-card {
            margin: 0;
          }

          .auth-sidebar {
            display: block;
            flex: 1;
            max-width: 400px;
          }

          .sidebar-content {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          }

          .sidebar-content h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }

          .sidebar-content p {
            font-size: 1.125rem;
            opacity: 0.9;
            margin-bottom: 2rem;
          }

          .benefits-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .benefits-list li {
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 1rem;
          }

          .benefits-list li:last-child {
            border-bottom: none;
          }
        }

        @media (max-width: 640px) {
          .auth-card {
            padding: 2rem 1.5rem;
          }

          .auth-header h1 {
            font-size: 1.75rem;
          }

          .name-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .checkbox-label {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </Layout>
  );
}
