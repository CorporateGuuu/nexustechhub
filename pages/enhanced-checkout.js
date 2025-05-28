// Enhanced Checkout Page for Nexus TechHub - UAE Market
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Layout from '../components/Layout/Layout';
import EnhancedCheckout from '../components/Checkout/EnhancedCheckout';

export default function EnhancedCheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart items from localStorage or state management
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const savedCart = localStorage.getItem('nexus-cart');
        if (savedCart) {
          const items = JSON.parse(savedCart);
          setCartItems(items);
        } else {
          // Demo cart items for testing
          const demoItems = [
            {
              id: 1,
              name: 'iPhone 14 Pro Max LCD Screen',
              sku: 'NTH-IPHONE-LCD-001',
              price: 299.99,
              quantity: 1,
              category: 'iPhone Parts',
              description: 'High-quality LCD screen replacement for iPhone 14 Pro Max',
              images: ['/images/products/iphone-14-pro-max-lcd.jpg']
            },
            {
              id: 2,
              name: 'Samsung Galaxy S23 Ultra Battery',
              sku: 'NTH-SAMSUNG-BAT-002',
              price: 89.99,
              quantity: 2,
              category: 'Samsung Parts',
              description: 'Original capacity battery for Samsung Galaxy S23 Ultra',
              images: ['/images/products/samsung-s23-battery.jpg']
            }
          ];
          setCartItems(demoItems);
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
        toast.error('Failed to load cart items');
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  // Handle successful checkout
  const handleCheckoutSuccess = (session) => {
    console.log('Checkout successful:', session);
    
    // Clear cart
    localStorage.removeItem('nexus-cart');
    
    // Show success message
    toast.success('Order placed successfully! Redirecting to confirmation...');
    
    // Redirect to success page
    setTimeout(() => {
      router.push(`/checkout/success?session_id=${session.sessionId}`);
    }, 2000);
  };

  // Handle checkout error
  const handleCheckoutError = (error) => {
    console.error('Checkout error:', error);
    toast.error(error || 'Checkout failed. Please try again.');
  };

  const seoProps = {
    title: 'Enhanced Secure Checkout - Complete Your Order',
    description: 'Complete your purchase securely with Nexus TechHub enhanced checkout. Stripe integration with AED currency, UAE tax calculations, and multiple payment methods.',
    keywords: 'enhanced checkout, Stripe payment, AED currency, UAE VAT, secure payment, mobile parts purchase, Nexus TechHub',
    ogType: 'website',
    noindex: true, // Don't index checkout pages
    breadcrumbs: [
      { name: 'Home', url: 'https://nexustechhub.netlify.app/' },
      { name: 'Cart', url: 'https://nexustechhub.netlify.app/cart' },
      { name: 'Enhanced Checkout', url: 'https://nexustechhub.netlify.app/enhanced-checkout' }
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CheckoutPage',
      name: 'Nexus TechHub Enhanced Checkout',
      description: 'Secure checkout for mobile repair parts with Stripe integration',
      provider: {
        '@type': 'Organization',
        name: 'Nexus TechHub',
        url: 'https://nexustechhub.netlify.app'
      },
      paymentAccepted: ['Credit Card', 'Debit Card', 'Apple Pay', 'Google Pay', 'Alipay'],
      currenciesAccepted: 'AED',
      areaServed: {
        '@type': 'Country',
        name: 'United Arab Emirates'
      }
    }
  };

  if (loading) {
    return (
      <Layout 
        title="Loading Enhanced Checkout..."
        description="Loading your secure enhanced checkout"
        seoProps={seoProps}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #f3f4f6',
            borderTop: '3px solid #10b981',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: '#6b7280' }}>Loading enhanced checkout...</p>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout 
        title="Empty Cart"
        description="Your cart is empty"
        seoProps={seoProps}
      >
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Your Cart is Empty
          </h1>
          <p style={{ 
            color: '#6b7280', 
            marginBottom: '2rem',
            fontSize: '1.125rem'
          }}>
            Add some products to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => router.push('/products')}
            style={{
              background: 'linear-gradient(135deg, #10b981, #14b8a6)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #059669, #0d9488)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #10b981, #14b8a6)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Browse Products
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Enhanced Secure Checkout"
      description="Complete your purchase securely with Nexus TechHub enhanced checkout"
      seoProps={seoProps}
    >
      {/* Page Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #10b981, #14b8a6)',
        color: 'white',
        padding: '2rem 0',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            margin: '0 0 0.5rem 0' 
          }}>
            Enhanced Secure Checkout
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            opacity: '0.9',
            margin: '0'
          }}>
            Complete your purchase with our advanced Stripe-powered checkout system
          </p>
        </div>
      </div>

      {/* Features Banner */}
      <div style={{ 
        background: '#f0fdf4',
        border: '1px solid #d1fae5',
        borderRadius: '8px',
        padding: '1.5rem',
        margin: '0 2rem 2rem 2rem',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
            <strong style={{ color: '#065f46' }}>SSL Secured</strong>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#047857' }}>
              256-bit encryption
            </p>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💳</div>
            <strong style={{ color: '#065f46' }}>Multiple Payment Methods</strong>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#047857' }}>
              Cards, Apple Pay, Google Pay
            </p>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🇦🇪</div>
            <strong style={{ color: '#065f46' }}>UAE Optimized</strong>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#047857' }}>
              AED currency, VAT included
            </p>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚚</div>
            <strong style={{ color: '#065f46' }}>Free Shipping</strong>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#047857' }}>
              Across UAE
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Checkout Component */}
      <div style={{ padding: '0 2rem 2rem 2rem' }}>
        <EnhancedCheckout
          cartItems={cartItems}
          onSuccess={handleCheckoutSuccess}
          onError={handleCheckoutError}
        />
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
}

// Server-side props for enhanced checkout page
export async function getServerSideProps(context) {
  return {
    props: {
      // Add any server-side props if needed
    },
  };
}
