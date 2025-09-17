import React from 'react';
import Link from 'next/link';

const PreOwnedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  };

  const contentStyle = {
    background: 'white',
    borderRadius: '12px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    animation: 'modalFadeIn 0.3s ease-out'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 32px',
    borderBottom: '1px solid #e5e7eb',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '12px 12px 0 0'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '28px',
    color: 'white',
    cursor: 'pointer',
    padding: '0',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%'
  };

  const bodyStyle = {
    padding: '32px'
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>Pre-Owned Devices</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            ×
          </button>
        </div>

        <div style={bodyStyle}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ color: '#1f2937', fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
              Quality Pre-Owned Devices
            </h3>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.6' }}>
              Discover our carefully inspected and refurbished pre-owned devices at competitive prices.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <div style={{
              background: '#f9fafb',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h4 style={{
                color: '#1f2937',
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '12px',
                borderBottom: '2px solid #667eea',
                paddingBottom: '8px'
              }}>iPhone Series</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>iPhone 15 Pro Max</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>iPhone 15 Pro</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>iPhone 15 Plus</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>iPhone 15</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0' }}>iPhone 14 Pro Max</li>
              </ul>
            </div>

            <div style={{
              background: '#f9fafb',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h4 style={{
                color: '#1f2937',
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '12px',
                borderBottom: '2px solid #667eea',
                paddingBottom: '8px'
              }}>Samsung Galaxy</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>Galaxy S24 Ultra</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>Galaxy S24 Plus</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>Galaxy S24</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>Galaxy S23 Ultra</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0' }}>Galaxy S23 Plus</li>
              </ul>
            </div>

            <div style={{
              background: '#f9fafb',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h4 style={{
                color: '#1f2937',
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '12px',
                borderBottom: '2px solid #667eea',
                paddingBottom: '8px'
              }}>iPad Series</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>iPad Pro 12.9"</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>iPad Pro 11"</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>iPad Air</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>iPad</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0' }}>iPad Mini</li>
              </ul>
            </div>

            <div style={{
              background: '#f9fafb',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h4 style={{
                color: '#1f2937',
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '12px',
                borderBottom: '2px solid #667eea',
                paddingBottom: '8px'
              }}>Other Devices</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>Apple Watch Series</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>Google Pixel</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>Motorola Phones</li>
                <li style={{ color: '#4b5563', fontSize: '14px', padding: '4px 0' }}>Game Consoles</li>
              </ul>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '20px',
              background: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #e0f2fe'
            }}>
              <h5 style={{ color: '#0369a1', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                ✓ Quality Assured
              </h5>
              <p style={{ color: '#0c4a6e', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                All devices undergo thorough testing and inspection
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '20px',
              background: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #e0f2fe'
            }}>
              <h5 style={{ color: '#0369a1', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                ✓ Warranty Included
              </h5>
              <p style={{ color: '#0c4a6e', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                30-day warranty on all pre-owned devices
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '20px',
              background: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #e0f2fe'
            }}>
              <h5 style={{ color: '#0369a1', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                ✓ Competitive Pricing
              </h5>
              <p style={{ color: '#0c4a6e', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                Significant savings compared to new devices
              </p>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <Link
              href="/auth/login"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                padding: '12px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '16px',
                display: 'inline-block'
              }}
            >
              View All Pre-Owned Devices
            </Link>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
              Contact us for specific device availability and pricing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOwnedModal;
