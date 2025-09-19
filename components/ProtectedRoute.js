import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, redirectTo = '/auth/signin', requireAdmin = false }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // User is not authenticated, redirect to sign in
        router.push(`${redirectTo}?redirect=${encodeURIComponent(router.asPath)}`);
        return;
      }

      if (requireAdmin && user?.user_metadata?.is_admin !== true) {
        // User is not an admin, redirect to home or show unauthorized
        router.push('/?error=unauthorized');
        return;
      }
    }
  }, [loading, isAuthenticated, user, requireAdmin, router, redirectTo]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }} />
        <p style={{ color: '#6b7280' }}>Loading...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Don't render children if not authenticated or not authorized
  if (!isAuthenticated || (requireAdmin && user?.user_metadata?.is_admin !== true)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
