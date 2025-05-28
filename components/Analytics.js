import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

// Google Analytics configuration
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

// Google Analytics component
export function GoogleAnalytics() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
          page_path: url,
          custom_map: {
            'custom_parameter_1': 'uae_market',
            'custom_parameter_2': 'mobile_repair_parts'
          }
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (!GA_TRACKING_ID || GA_TRACKING_ID === 'G-XXXXXXXXXX') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              custom_map: {
                'custom_parameter_1': 'uae_market',
                'custom_parameter_2': 'mobile_repair_parts'
              },
              // UAE-specific configuration
              country: 'AE',
              currency: 'AED',
              language: 'en-ae',
              // Enhanced ecommerce settings
              send_page_view: true,
              anonymize_ip: true,
              allow_google_signals: true,
              allow_ad_personalization_signals: false
            });

            // Custom events for Nexus TechHub
            gtag('event', 'page_view', {
              event_category: 'engagement',
              event_label: 'nexus_techhub_uae',
              custom_parameter_1: 'uae_market',
              custom_parameter_2: 'mobile_repair_parts'
            });
          `,
        }}
      />
    </>
  );
}

// Google Tag Manager component
export function GoogleTagManager() {
  if (!GTM_ID || GTM_ID === 'GTM-XXXXXXX') {
    return null;
  }

  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

// Analytics utility functions
export const analytics = {
  // Track page views
  pageview: (url) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    }
  },

  // Track events
  event: ({ action, category, label, value, custom_parameters = {} }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        custom_parameter_1: 'uae_market',
        custom_parameter_2: 'mobile_repair_parts',
        ...custom_parameters
      });
    }
  },

  // Track product views
  trackProductView: (product) => {
    analytics.event({
      action: 'view_item',
      category: 'ecommerce',
      label: product.name,
      custom_parameters: {
        item_id: product.sku,
        item_name: product.name,
        item_category: product.category,
        item_brand: product.brand || 'Nexus TechHub',
        price: product.price,
        currency: 'AED'
      }
    });
  },

  // Track quote requests
  trackQuoteRequest: (product, contactInfo) => {
    analytics.event({
      action: 'generate_lead',
      category: 'engagement',
      label: 'quote_request',
      custom_parameters: {
        item_id: product?.sku || 'general',
        item_name: product?.name || 'General Inquiry',
        contact_method: contactInfo.preferredContact || 'form',
        lead_source: 'website'
      }
    });
  },

  // Track search queries
  trackSearch: (searchTerm, resultsCount) => {
    analytics.event({
      action: 'search',
      category: 'engagement',
      label: searchTerm,
      custom_parameters: {
        search_term: searchTerm,
        results_count: resultsCount,
        search_location: 'main_search'
      }
    });
  },

  // Track contact form submissions
  trackContactForm: (formType, contactMethod) => {
    analytics.event({
      action: 'form_submit',
      category: 'engagement',
      label: formType,
      custom_parameters: {
        form_type: formType,
        contact_method: contactMethod,
        form_location: 'contact_page'
      }
    });
  },

  // Track WhatsApp clicks
  trackWhatsAppClick: (source) => {
    analytics.event({
      action: 'click',
      category: 'engagement',
      label: 'whatsapp_contact',
      custom_parameters: {
        click_source: source,
        contact_method: 'whatsapp',
        phone_number: '+971585531029'
      }
    });
  },

  // Track phone calls
  trackPhoneCall: (source) => {
    analytics.event({
      action: 'click',
      category: 'engagement',
      label: 'phone_call',
      custom_parameters: {
        click_source: source,
        contact_method: 'phone',
        phone_number: '+971585531029'
      }
    });
  },

  // Track category browsing
  trackCategoryView: (category, productsCount) => {
    analytics.event({
      action: 'view_item_list',
      category: 'ecommerce',
      label: category,
      custom_parameters: {
        item_list_name: category,
        items_count: productsCount,
        list_type: 'category'
      }
    });
  },

  // Track user engagement
  trackEngagement: (action, details = {}) => {
    analytics.event({
      action: action,
      category: 'engagement',
      label: 'user_interaction',
      custom_parameters: {
        engagement_type: action,
        ...details
      }
    });
  },

  // Track performance metrics
  trackPerformance: (metric, value) => {
    analytics.event({
      action: 'timing_complete',
      category: 'performance',
      label: metric,
      value: Math.round(value),
      custom_parameters: {
        metric_name: metric,
        metric_value: value
      }
    });
  },

  // Track Core Web Vitals
  trackWebVitals: (metric) => {
    analytics.event({
      action: 'web_vitals',
      category: 'performance',
      label: metric.name,
      value: Math.round(metric.value),
      custom_parameters: {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_rating: metric.rating,
        metric_delta: metric.delta,
        page_url: window.location.pathname
      }
    });
  },

  // Track business conversions
  trackConversion: (type, value = 0, details = {}) => {
    analytics.event({
      action: 'conversion',
      category: 'business',
      label: type,
      value: value,
      custom_parameters: {
        conversion_type: type,
        conversion_value: value,
        currency: 'AED',
        ...details
      }
    });
  },

  // Track UAE-specific metrics
  trackUAEMetrics: (action, details = {}) => {
    analytics.event({
      action: action,
      category: 'uae_market',
      label: 'regional_tracking',
      custom_parameters: {
        market: 'UAE',
        region: 'Middle_East',
        business_type: 'mobile_repair_parts',
        ...details
      }
    });
  }
};

// Enhanced ecommerce tracking
export const ecommerce = {
  // Track purchase (for future implementation)
  trackPurchase: (transactionId, items, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: 'AED',
        items: items.map(item => ({
          item_id: item.sku,
          item_name: item.name,
          item_category: item.category,
          item_brand: item.brand || 'Nexus TechHub',
          price: item.price,
          quantity: item.quantity || 1
        }))
      });
    }
  },

  // Track add to cart (for future implementation)
  trackAddToCart: (item) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'AED',
        value: item.price,
        items: [{
          item_id: item.sku,
          item_name: item.name,
          item_category: item.category,
          item_brand: item.brand || 'Nexus TechHub',
          price: item.price,
          quantity: 1
        }]
      });
    }
  }
};

// Privacy-compliant analytics
export function PrivacyCompliantAnalytics({ children }) {
  useEffect(() => {
    // Check for user consent (implement based on your privacy policy)
    const hasConsent = localStorage.getItem('analytics_consent') === 'true';

    if (hasConsent && typeof window !== 'undefined' && window.gtag) {
      // Enable analytics
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    } else {
      // Disable analytics
      window.gtag('consent', 'default', {
        analytics_storage: 'denied'
      });
    }
  }, []);

  return children;
}
