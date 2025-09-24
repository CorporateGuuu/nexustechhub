import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear any previous errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        setError(error.message || 'Sign in failed. Please try again.');
      } else {
        setSuccess('Login successful! Redirecting...');
        // Redirect to account page after successful login
        setTimeout(() => {
          router.push('/account');
        }, 1500);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check for success message from registration
    if (router.query.message) {
      setSuccess(router.query.message);
    }
  }, [router.query]);

  return (
    <Layout
      title="Sign In - Nexus Tech Hub"
      description="Sign in to your Nexus Tech Hub account to access exclusive features and manage your orders."
    >
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Welcome Back
            </h1>
            <p style={{ color: '#6b7280' }}>
              Sign in to your Nexus Tech Hub account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter your email"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter your password"
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  style={{ marginRight: '0.5rem' }}
                />
                Remember me
              </label>
              <Link
                href="/auth/forgot-password"
                style={{
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontSize: '0.875rem'
                }}
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                color: '#dc2626',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '6px',
                color: '#166534',
                fontSize: '0.875rem'
              }}>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              Don't have an account?
            </p>
            <Link
              href="/auth/register"
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Create an account
            </Link>
          </div>

          <div style={{
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <Link
              href="/"
              style={{
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '0.875rem'
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
