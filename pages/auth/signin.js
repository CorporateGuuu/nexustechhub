import { useState, useEffect } from 'react';
import { signIn, getCsrfToken, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorBoundary from '../../components/ErrorBoundary';
import styles from '../../styles/AuthPages.module.css';

export default function SignIn({ csrfToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const { callbackUrl, error: errorParam } = router.query;

  useEffect(() => {
    // Check if user is already signed in
    async function checkSession() {
      const session = await getSession();
      if (session) {
        router.replace(callbackUrl || '/');
      } else {
        setInitialLoading(false);
      }
    }

    checkSession();

    // Set error message from URL parameter
    if (errorParam) {
      if (errorParam === 'CredentialsSignin') {
        setError('Invalid email or password');
      } else {
        setError(errorParam);
      }
    }
  }, [router, callbackUrl, errorParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Proceed with sign in
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: callbackUrl || '/'
      });

      if (result.error) {
        setError('Invalid email or password. Please check your credentials and try again.');
        setLoading(false);
      } else if (result.url && result.url.includes('requiresTwoFactor=true')) {
        // Redirect to 2FA page
        router.push(`/auth/2fa${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`);
      } else {
        // Successful login - redirect to appropriate page
        if (callbackUrl && callbackUrl.includes('/dashboard')) {
          router.push('/dashboard');
        } else if (callbackUrl && callbackUrl.includes('/admin')) {
          router.push('/admin/dashboard');
        } else {
          router.push(callbackUrl || '/dashboard');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An error occurred during sign in. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: callbackUrl || '/' });
  };

  if (initialLoading) {
    return (
      <ErrorBoundary componentName="SignIn">
        <Head>
          <title>Loading - Nexus TechHub</title>
        </Head>
        <Header />
        <main className={styles.authMain}>
          <div className={styles.authContainer}>
            <div className={styles.authCard}>
              <div className={styles.authHeader}>
                <div className={styles.loadingSpinner}></div>
                <h1 className={styles.authTitle}>Loading...</h1>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary componentName="SignIn">
      <Head>
        <title>Sign In - Nexus TechHub | Customer Login</title>
        <meta name="description" content="Sign in to your Nexus TechHub account to access your orders, quotes, and manage your profile." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />

      <main className={styles.authMain}>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <div className={styles.authHeader}>
              <h1 className={styles.authTitle}>Welcome Back</h1>
              <p className={styles.authSubtitle}>
                Sign in to your Nexus TechHub account
              </p>
            </div>

            {error && (
              <div className={styles.formError}>
                {error}
              </div>
            )}

            {successMessage && (
              <div className={styles.successMessage}>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.authForm}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email Address</label>
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
                <label htmlFor="password" className={styles.formLabel}>Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles.formInput} ${error ? styles.error : ''}`}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className={`${styles.primaryBtn} ${loading ? styles.loading : ''}`}
                disabled={loading}
              >
                {loading && <span className={styles.loadingSpinner}></span>}
                {loading ? 'Signing in...' : 'Sign In'}
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
                <Link href="/auth/forgot-password">Forgot your password?</Link>
              </p>
              <p className={styles.authLink}>
                Don't have an account? <Link href="/auth/register">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </ErrorBoundary>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      csrfToken: csrfToken || null,
    },
  };
}
