import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorBoundary from '../../components/ErrorBoundary';
import styles from '../../styles/AuthPages.module.css';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(null);
  const router = useRouter();

  // Handle countdown for redirect after successful registration
  useEffect(() => {
    if (redirectCountdown !== null) {
      if (redirectCountdown > 0) {
        const timer = setTimeout(() => {
          setRedirectCountdown(redirectCountdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        router.push('/dashboard');
      }
    }
  }, [redirectCountdown, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate form
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    // Validate UAE phone number format
    if (phone && !phone.match(/^(\+971|971|0)?[0-9]{8,9}$/)) {
      setError('Please enter a valid UAE phone number');
      setLoading(false);
      return;
    }

    try {
      // Register user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone: phone || null,
          businessName: businessName || null
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Sign in the user
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError('Registration successful, but sign-in failed. Please try signing in manually.');
        setLoading(false);
      } else {
        setSuccess(`Account created successfully! Welcome, ${firstName}. You will be redirected to your dashboard in 5 seconds.`);
        setLoading(false);
        setRedirectCountdown(5);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <ErrorBoundary componentName="Register">
      <Head>
        <title>Create Account - Nexus TechHub | Customer Registration</title>
        <meta name="description" content="Create your Nexus TechHub account to access mobile repair parts, quotes, and manage your orders in the UAE." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />

      <main className={styles.authMain}>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <div className={styles.authHeader}>
              <h1 className={styles.authTitle}>Create Your Account</h1>
              <p className={styles.authSubtitle}>
                Join Nexus TechHub and access premium mobile repair parts in the UAE
              </p>
            </div>

            {error && (
              <div className={styles.formError}>
                {error}
              </div>
            )}

            {success && (
              <div className={styles.successMessage}>
                {success}
                {redirectCountdown !== null && (
                  <p>Redirecting in {redirectCountdown} seconds...</p>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.formLabel}>First Name *</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`${styles.formInput} ${error ? styles.error : ''}`}
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.formLabel}>Last Name *</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`${styles.formInput} ${error ? styles.error : ''}`}
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email Address *</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${styles.formInput} ${error ? styles.error : ''}`}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.formLabel}>Phone Number (UAE)</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.formInput}
                  placeholder="+971 50 123 4567"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="businessName" className={styles.formLabel}>Business Name (Optional)</label>
                <input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={styles.formInput}
                  placeholder="Your repair shop or business name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>Password *</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles.formInput} ${error ? styles.error : ''}`}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                />
                <small style={{ color: 'var(--text-gray, #6b7280)', fontSize: '14px' }}>
                  Password must be at least 8 characters long
                </small>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password *</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${styles.formInput} ${error ? styles.error : ''}`}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                className={`${styles.primaryBtn} ${loading ? styles.loading : ''}`}
                disabled={loading}
              >
                {loading && <span className={styles.loadingSpinner}></span>}
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className={styles.divider}>OR</div>

            <button
              onClick={handleGoogleSignIn}
              className={styles.googleBtn}
              type="button"
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className={styles.authLinks}>
              <p className={styles.authLink}>
                Already have an account? <Link href="/auth/signin">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </ErrorBoundary>
  );
}
