import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';

function Custom404() {
  return (
    <Layout
      title="Page Not Found - 404 Error"
      description="The page you're looking for doesn't exist. Browse our mobile repair parts catalog or contact us for assistance."
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
            color: '#10b981',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            404
          </h1>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            color: '#1f2937'
          }}>
            Oops! Page Not Found
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            marginBottom: '2rem',
            maxWidth: '500px',
            margin: '0 auto 2rem'
          }}>
            The page you're looking for doesn't exist or has been moved.
            Don't worry, let's get you back on track!
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
              <Link href="/search" style={{
                color: '#10b981',
                textDecoration: 'none',
                padding: '8px 16px',
                border: '2px solid #10b981',
                borderRadius: '6px',
                transition: 'all 0.3s'
              }}>
                🔍 Search Parts
              </Link>
            </div>
          </div>

          <div style={{
            marginTop: '3rem',
            padding: '1.5rem',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: '3rem auto 0'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Popular Categories
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '0.5rem'
            }}>
              <Link href="/iphone-parts" style={{ color: '#6b7280', textDecoration: 'none' }}>iPhone Parts</Link>
              <Link href="/samsung-parts" style={{ color: '#6b7280', textDecoration: 'none' }}>Samsung Parts</Link>
              <Link href="/ipad-parts" style={{ color: '#6b7280', textDecoration: 'none' }}>iPad Parts</Link>
              <Link href="/repair-tools" style={{ color: '#6b7280', textDecoration: 'none' }}>Repair Tools</Link>
              <Link href="/genuine-parts-program" style={{ color: '#6b7280', textDecoration: 'none' }}>Genuine Parts</Link>
              <Link href="/wholesale" style={{ color: '#6b7280', textDecoration: 'none' }}>Wholesale</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Custom404;
