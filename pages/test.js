import React from 'react';
import SentryTestButton from '../components/SentryTestButton';

export default function TestPage() {
  const envStatus = {
    nodeEnv: process.env.NODE_ENV,
    sentryConfigured: !!process.env.SENTRY_DSN,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    appEnv: process.env.NEXT_PUBLIC_APP_ENV
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>🎉 Nexus TechHub Development Test Page</h1>
        <p>If you can see this, the Next.js server is working!</p>
      </div>

      {/* System Status */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h2>📊 System Status</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <div>✅ React is working</div>
          <div>✅ Next.js is working</div>
          <div>✅ Server is running</div>
          <div>{envStatus.sentryConfigured ? '✅' : '❌'} Sentry {envStatus.sentryConfigured ? 'configured' : 'not configured'}</div>
        </div>
      </div>

      {/* Environment Variables Status */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h2>🔧 Environment Status</h2>
        <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
          <div>NODE_ENV: {envStatus.nodeEnv || 'not set'}</div>
          <div>APP_ENV: {envStatus.appEnv || 'not set'}</div>
          <div>NEXTAUTH_URL: {envStatus.nextAuthUrl || 'not set'}</div>
          <div>SENTRY_DSN: {envStatus.sentryConfigured ? 'configured' : 'not configured'}</div>
        </div>
      </div>

      {/* Sentry Test Component */}
      {envStatus.sentryConfigured && (
        <div style={{ marginBottom: '30px' }}>
          <SentryTestButton />
        </div>
      )}

      {/* Setup Instructions */}
      {!envStatus.sentryConfigured && (
        <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
          <h3>⚠️ Sentry Not Configured</h3>
          <p>To test Sentry integration:</p>
          <ol style={{ textAlign: 'left', paddingLeft: '20px' }}>
            <li>Run: <code>node scripts/setup-local-env.js</code></li>
            <li>Enter your Sentry DSN when prompted</li>
            <li>Restart the development server</li>
            <li>Refresh this page to see Sentry tests</li>
          </ol>
        </div>
      )}

      {/* Development Tools */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
        <h3>🛠️ Development Tools</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/" style={{ padding: '8px 16px', backgroundColor: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Home Page
          </a>
          <a href="/admin" style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Admin Panel
          </a>
          <a href="/products" style={{ padding: '8px 16px', backgroundColor: '#8b5cf6', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Products
          </a>
          <a href="/contact" style={{ padding: '8px 16px', backgroundColor: '#f59e0b', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
