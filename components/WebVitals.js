// Core Web Vitals monitoring for Nexus TechHub
import { useEffect } from 'react';
import { analytics } from './Analytics';

export default function WebVitals() {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Import web-vitals library dynamically
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Cumulative Layout Shift
      getCLS((metric) => {
        analytics.trackWebVitals(metric);
        
        // Track specific CLS issues for UAE market optimization
        if (metric.value > 0.1) {
          analytics.trackUAEMetrics('layout_shift_issue', {
            cls_value: metric.value,
            page: window.location.pathname,
            device_type: getDeviceType()
          });
        }
      });

      // First Input Delay
      getFID((metric) => {
        analytics.trackWebVitals(metric);
        
        // Track interaction delays for mobile users (important for UAE market)
        if (metric.value > 100) {
          analytics.trackUAEMetrics('interaction_delay', {
            fid_value: metric.value,
            page: window.location.pathname,
            device_type: getDeviceType()
          });
        }
      });

      // First Contentful Paint
      getFCP((metric) => {
        analytics.trackWebVitals(metric);
        
        // Track loading performance for UAE users
        analytics.trackUAEMetrics('content_paint', {
          fcp_value: metric.value,
          page: window.location.pathname,
          connection_type: getConnectionType()
        });
      });

      // Largest Contentful Paint
      getLCP((metric) => {
        analytics.trackWebVitals(metric);
        
        // Critical for e-commerce - track loading performance
        if (metric.value > 2500) {
          analytics.trackUAEMetrics('slow_loading', {
            lcp_value: metric.value,
            page: window.location.pathname,
            device_type: getDeviceType(),
            connection_type: getConnectionType()
          });
        }
      });

      // Time to First Byte
      getTTFB((metric) => {
        analytics.trackWebVitals(metric);
        
        // Track server response times for UAE hosting optimization
        analytics.trackUAEMetrics('server_response', {
          ttfb_value: metric.value,
          page: window.location.pathname
        });
      });
    }).catch((error) => {
      console.warn('Web Vitals library not available:', error);
    });

    // Track additional performance metrics
    trackAdditionalMetrics();
  }, []);

  return null; // This is a monitoring component with no UI
}

// Helper function to detect device type
function getDeviceType() {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
}

// Helper function to detect connection type
function getConnectionType() {
  if (typeof window === 'undefined' || !navigator.connection) return 'unknown';
  
  return navigator.connection.effectiveType || 'unknown';
}

// Track additional performance metrics specific to Nexus TechHub
function trackAdditionalMetrics() {
  if (typeof window === 'undefined') return;

  // Track page load complete
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    analytics.trackPerformance('page_load_complete', loadTime);
    
    // Track specific metrics for UAE market
    analytics.trackUAEMetrics('page_loaded', {
      load_time: loadTime,
      page: window.location.pathname,
      device_type: getDeviceType()
    });
  });

  // Track DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const domTime = performance.now();
      analytics.trackPerformance('dom_content_loaded', domTime);
    });
  }

  // Track resource loading performance
  window.addEventListener('load', () => {
    setTimeout(() => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(resource => resource.duration > 1000);
      
      if (slowResources.length > 0) {
        analytics.trackUAEMetrics('slow_resources', {
          slow_resource_count: slowResources.length,
          page: window.location.pathname
        });
      }
    }, 1000);
  });

  // Track scroll depth for engagement
  let maxScrollDepth = 0;
  const trackScrollDepth = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;
      
      // Track significant scroll milestones
      if (scrollPercent >= 25 && scrollPercent < 50 && maxScrollDepth < 25) {
        analytics.trackEngagement('scroll_25_percent');
      } else if (scrollPercent >= 50 && scrollPercent < 75 && maxScrollDepth < 50) {
        analytics.trackEngagement('scroll_50_percent');
      } else if (scrollPercent >= 75 && scrollPercent < 90 && maxScrollDepth < 75) {
        analytics.trackEngagement('scroll_75_percent');
      } else if (scrollPercent >= 90 && maxScrollDepth < 90) {
        analytics.trackEngagement('scroll_90_percent');
      }
    }
  };

  // Throttled scroll tracking
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(trackScrollDepth, 100);
  });

  // Track time on page
  const startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Date.now() - startTime;
    analytics.trackEngagement('time_on_page', { duration: timeOnPage });
  });
}

// Export utility functions for manual tracking
export const webVitalsUtils = {
  trackCustomMetric: (name, value, details = {}) => {
    analytics.trackPerformance(name, value);
    analytics.trackUAEMetrics('custom_metric', {
      metric_name: name,
      metric_value: value,
      ...details
    });
  },
  
  trackUserAction: (action, details = {}) => {
    analytics.trackEngagement(action, details);
    analytics.trackUAEMetrics('user_action', {
      action_type: action,
      ...details
    });
  }
};
