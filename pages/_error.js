import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <Layout
        title={`Error ${statusCode} - Something went wrong`}
        description="An error occurred while processing your request. Please try again or contact our support team."
      >
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '6rem',
              fontWeight: 'bold',
              color: '#ef4444',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              {statusCode}
            </h1>
            <h2 style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              {statusCode === 404 ? 'Page Not Found' : 'Something went wrong'}
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem'
            }}>
              {statusCode === 404
                ? "The page you're looking for doesn't exist."
                : "We're experiencing technical difficulties. Our team has been notified and is working to fix the issue."
              }
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <Link href="/" style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'background-color 0.3s',
                display: 'inline-block'
              }}>
                🏠 Go to Homepage
              </Link>

              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <Link href="/products" style={{
                  color: '#10b981',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  border: '2px solid #10b981',
                  borderRadius: '6px',
                  transition: 'all 0.3s'
                }}>
                  📱 Browse Products
                </Link>
                <Link href="/contact" style={{
                  color: '#10b981',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  border: '2px solid #10b981',
                  borderRadius: '6px',
                  transition: 'all 0.3s'
                }}>
                  📞 Contact Support
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    color: '#10b981',
                    background: 'none',
                    border: '2px solid #10b981',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    transition: 'all 0.3s'
                  }}
                >
                  🔄 Try Again
                </button>
              </div>
            </div>

            {statusCode !== 404 && (
              <div style={{
                marginTop: '3rem',
                padding: '1.5rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                maxWidth: '600px',
                margin: '3rem auto 0'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  color: '#dc2626'
                }}>
                  Error Details
                </h3>
                <p style={{
                  color: '#7f1d1d',
                  marginBottom: '1rem'
                }}>
                  If this problem persists, please contact our support team with the following information:
                </p>
                <ul style={{
                  textAlign: 'left',
                  color: '#7f1d1d',
                  marginLeft: '1rem'
                }}>
                  <li>Error Code: {statusCode}</li>
                  <li>Time: {new Date().toLocaleString()}</li>
                  <li>Page: {typeof window !== 'undefined' ? window.location.href : 'Unknown'}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Error;
