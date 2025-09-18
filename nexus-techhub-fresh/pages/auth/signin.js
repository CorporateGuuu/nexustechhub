import React, { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import styles from '../../styles/Auth.module.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('supabase', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else if (result?.ok) {
        // Redirect to the page they were trying to access or home
        const callbackUrl = router.query.callbackUrl || '/';
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Sign In - Nexus Tech Hub">
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h1>Welcome Back</h1>
            <p>Sign in to your Nexus Tech Hub account</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className={styles.authButton}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className={styles.authLinks}>
            <Link href="/auth/forgot-password">
              Forgot your password?
            </Link>
            <p>
              Don't have an account?{' '}
              <Link href="/auth/signup">Sign up</Link>
            </p>
          </div>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <div className={styles.guestCheckout}>
            <Link href="/products" className={styles.guestButton}>
              Continue as Guest
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .authContainer {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .authCard {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 3rem;
          width: 100%;
          max-width: 400px;
        }

        .authHeader {
          text-align: center;
          margin-bottom: 2rem;
        }

        .authHeader h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .authHeader p {
          color: #64748b;
          font-size: 1rem;
        }

        .authForm {
          margin-bottom: 2rem;
        }

        .errorMessage {
          background: #fee2e2;
          color: #dc2626;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          text-align: center;
        }

        .formGroup {
          margin-bottom: 1.5rem;
        }

        .formGroup label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .formGroup input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }

        .formGroup input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .authButton {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          padding: 0.875rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .authButton:hover:not(:disabled) {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-1px);
        }

        .authButton:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .authLinks {
          text-align: center;
          margin-bottom: 2rem;
        }

        .authLinks a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .authLinks a:hover {
          text-decoration: underline;
        }

        .authLinks p {
          margin: 1rem 0 0 0;
          color: #64748b;
          font-size: 0.875rem;
        }

        .divider {
          position: relative;
          text-align: center;
          margin: 2rem 0;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e5e7eb;
        }

        .divider span {
          background: white;
          padding: 0 1rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .guestCheckout {
          text-align: center;
        }

        .guestButton {
          display: inline-block;
          background: #f3f4f6;
          color: #374151;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .guestButton:hover {
          background: #e5e7eb;
        }

        @media (max-width: 640px) {
          .authContainer {
            padding: 1rem;
          }

          .authCard {
            padding: 2rem;
          }

          .authHeader h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Redirect if already authenticated
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
