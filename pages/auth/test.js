import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';

function AuthTestContent() {
  const { user, session, isAuthenticated, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#1f2937', marginBottom: '2rem' }}>
        Authentication Test Page
      </h1>

      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#374151', marginBottom: '1rem' }}>
          Authentication Status
        </h2>

        <div style={{ marginBottom: '1rem' }}>
          <strong>Is Authenticated:</strong>
          <span style={{
            color: isAuthenticated ? '#166534' : '#dc2626',
            marginLeft: '0.5rem',
            fontWeight: 'bold'
          }}>
            {isAuthenticated ? 'Yes' : 'No'}
          </span>
        </div>

        {user && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>User Email:</strong>
            <span style={{ marginLeft: '0.5rem' }}>{user.email}</span>
          </div>
        )}

        {user && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>User ID:</strong>
            <span style={{ marginLeft: '0.5rem', fontFamily: 'monospace' }}>
              {user.id}
            </span>
          </div>
        )}

        {session && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>Session Expires:</strong>
            <span style={{ marginLeft: '0.5rem' }}>
              {new Date(session.expires_at * 1000).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {isAuthenticated && (
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#92400e', marginBottom: '1rem' }}>
            User Actions
          </h3>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            style={{
              backgroundColor: isLoggingOut ? '#9ca3af' : '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              cursor: isLoggingOut ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            {isLoggingOut ? 'Logging Out...' : 'Logout'}
          </button>
        </div>
      )}

      <div style={{
        backgroundColor: '#f0f9ff',
        border: '1px solid #0ea5e9',
        borderRadius: '8px',
        padding: '1rem'
      }}>
        <h3 style={{ color: '#0c4a6e', marginBottom: '1rem' }}>
          Test Navigation
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="/auth/signin"
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Go to Sign In
          </a>
          <a
            href="/auth/register"
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Go to Register
          </a>
          <a
            href="/auth/logout"
            style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Go to Logout
          </a>
          <a
            href="/account"
            style={{
              backgroundColor: '#8b5cf6',
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Go to Account (Protected)
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AuthTest() {
  return (
    <Layout
      title="Authentication Test - Nexus Tech Hub"
      description="Test page for authentication flow."
    >
      <ProtectedRoute>
        <AuthTestContent />
      </ProtectedRoute>
    </Layout>
  );
}
