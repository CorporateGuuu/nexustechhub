import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/Layout';

export default function Logout() {
  const { signOut, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut();
        // Redirect to home page after successful logout
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } catch (error) {
        console.error('Logout error:', error);
        // Even if logout fails, redirect to home
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    };

    if (!loading) {
      handleLogout();
    }
  }, [signOut, router, loading]);

  return (
    <Layout
      title="Logging Out - Nexus Tech Hub"
      description="Logging out of your Nexus Tech Hub account."
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
          padding: '3rem',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 2rem'
          }} />

          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Logging Out...
          </h1>

          <p style={{
            color: '#6b7280',
            marginBottom: '2rem'
          }}>
            Please wait while we securely log you out of your account.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              animation: 'bounce 1.4s ease-in-out infinite both'
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              animation: 'bounce 1.4s ease-in-out 0.2s infinite both'
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              animation: 'bounce 1.4s ease-in-out 0.4s infinite both'
            }} />
          </div>

          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            @keyframes bounce {
              0%, 80%, 100% {
                transform: scale(0);
              }
              40% {
                transform: scale(1);
              }
            }
          `}</style>
        </div>
      </div>
    </Layout>
  );
}
