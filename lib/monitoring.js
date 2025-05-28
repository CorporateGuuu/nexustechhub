// Production Monitoring and Error Logging for Nexus TechHub
import { toast } from 'react-toastify';

// Environment configuration
const isProduction = process.env.NODE_ENV === 'production';
const enableAnalytics = process.env.ENABLE_ANALYTICS === 'true';
const enableMonitoring = process.env.ENABLE_MONITORING === 'true';
const enableErrorReporting = process.env.ENABLE_ERROR_REPORTING === 'true';

// Monitoring service class
class MonitoringService {
  constructor() {
    this.initialized = false;
    this.sessionId = this.generateSessionId();
    this.userId = null;
    this.errorQueue = [];
    this.performanceQueue = [];
    this.analyticsQueue = [];
  }

  // Initialize monitoring services
  async initialize() {
    if (this.initialized || typeof window === 'undefined') return;

    try {
      // Initialize Sentry for error reporting
      if (enableErrorReporting && process.env.SENTRY_DSN) {
        await this.initializeSentry();
      }

      // Initialize Google Analytics
      if (enableAnalytics && process.env.GOOGLE_ANALYTICS_ID) {
        await this.initializeGoogleAnalytics();
      }

      // Initialize performance monitoring
      if (enableMonitoring) {
        this.initializePerformanceMonitoring();
      }

      // Initialize error handlers
      this.initializeErrorHandlers();

      // Initialize user session tracking
      this.initializeSessionTracking();

      this.initialized = true;
      console.log('Nexus TechHub monitoring initialized');
    } catch (error) {
      console.error('Failed to initialize monitoring:', error);
    }
  }

  // Generate unique session ID
  generateSessionId() {
    return `nth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Initialize Sentry error reporting
  async initializeSentry() {
    try {
      const Sentry = await import('@sentry/nextjs');
      
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        tracesSampleRate: isProduction ? 0.1 : 1.0,
        beforeSend: (event) => {
          // Filter out development errors in production
          if (isProduction && event.environment === 'development') {
            return null;
          }
          return event;
        },
        integrations: [
          new Sentry.BrowserTracing({
            tracingOrigins: ['nexustechhub.netlify.app', 'localhost'],
          }),
        ],
        tags: {
          component: 'nexus-techhub',
          market: 'uae',
          business: 'mobile-repair-parts'
        }
      });

      console.log('Sentry error reporting initialized');
    } catch (error) {
      console.error('Failed to initialize Sentry:', error);
    }
  }

  // Initialize Google Analytics
  async initializeGoogleAnalytics() {
    try {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', process.env.GOOGLE_ANALYTICS_ID, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          custom_dimension_1: 'user_type',
          custom_dimension_2: 'market_segment'
        }
      });

      // Track UAE market specifics
      gtag('config', process.env.GOOGLE_ANALYTICS_ID, {
        country: 'AE',
        currency: 'AED',
        language: 'en-AE'
      });

      console.log('Google Analytics initialized');
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }

  // Initialize performance monitoring
  initializePerformanceMonitoring() {
    try {
      // Core Web Vitals monitoring
      if ('web-vitals' in window || typeof window !== 'undefined') {
        this.monitorWebVitals();
      }

      // Custom performance metrics
      this.monitorCustomMetrics();

      // API response time monitoring
      this.monitorAPIPerformance();

      console.log('Performance monitoring initialized');
    } catch (error) {
      console.error('Failed to initialize performance monitoring:', error);
    }
  }

  // Monitor Core Web Vitals
  async monitorWebVitals() {
    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

      const sendToAnalytics = (metric) => {
        const { name, value, id } = metric;
        
        // Send to Google Analytics
        if (window.gtag) {
          window.gtag('event', name, {
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(name === 'CLS' ? value * 1000 : value),
            non_interaction: true,
          });
        }

        // Log for debugging
        console.log(`Core Web Vital - ${name}:`, value);

        // Store for batch reporting
        this.performanceQueue.push({
          metric: name,
          value,
          id,
          timestamp: Date.now(),
          url: window.location.href
        });
      };

      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    } catch (error) {
      console.error('Failed to monitor Web Vitals:', error);
    }
  }

  // Monitor custom performance metrics
  monitorCustomMetrics() {
    // Page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.trackEvent('page_load_time', {
        load_time: Math.round(loadTime),
        page: window.location.pathname
      });
    });

    // Time to interactive
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            this.trackEvent('navigation_timing', {
              dns_lookup: entry.domainLookupEnd - entry.domainLookupStart,
              tcp_connect: entry.connectEnd - entry.connectStart,
              request_response: entry.responseEnd - entry.requestStart,
              dom_processing: entry.domContentLoadedEventEnd - entry.responseEnd
            });
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
  }

  // Monitor API performance
  monitorAPIPerformance() {
    // Intercept fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0];
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Track API performance
        this.trackEvent('api_request', {
          url: typeof url === 'string' ? url : url.url,
          method: args[1]?.method || 'GET',
          status: response.status,
          duration: Math.round(duration),
          success: response.ok
        });

        return response;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Track API errors
        this.trackError('api_error', error, {
          url: typeof url === 'string' ? url : url.url,
          method: args[1]?.method || 'GET',
          duration: Math.round(duration)
        });

        throw error;
      }
    };
  }

  // Initialize error handlers
  initializeErrorHandlers() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.trackError('javascript_error', event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        message: event.message
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError('unhandled_promise_rejection', event.reason, {
        promise: event.promise
      });
    });

    // React error boundary integration
    window.addEventListener('react-error', (event) => {
      this.trackError('react_error', event.detail.error, {
        component: event.detail.componentStack,
        errorBoundary: event.detail.errorBoundary
      });
    });
  }

  // Initialize session tracking
  initializeSessionTracking() {
    // Track session start
    this.trackEvent('session_start', {
      session_id: this.sessionId,
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    });

    // Track page views
    this.trackPageView();

    // Track session end on page unload
    window.addEventListener('beforeunload', () => {
      this.trackEvent('session_end', {
        session_id: this.sessionId,
        duration: Date.now() - this.sessionStartTime
      });
      this.flushQueues();
    });
  }

  // Set user ID for tracking
  setUserId(userId) {
    this.userId = userId;
    
    if (window.gtag) {
      window.gtag('config', process.env.GOOGLE_ANALYTICS_ID, {
        user_id: userId
      });
    }
  }

  // Track custom events
  trackEvent(eventName, parameters = {}) {
    try {
      const eventData = {
        event: eventName,
        session_id: this.sessionId,
        user_id: this.userId,
        timestamp: Date.now(),
        url: window.location.href,
        ...parameters
      };

      // Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', eventName, parameters);
      }

      // Add to analytics queue
      this.analyticsQueue.push(eventData);

      // Log in development
      if (!isProduction) {
        console.log('Event tracked:', eventName, parameters);
      }
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  // Track page views
  trackPageView(page = window.location.pathname) {
    this.trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: page
    });
  }

  // Track errors
  trackError(errorType, error, context = {}) {
    try {
      const errorData = {
        type: errorType,
        message: error?.message || String(error),
        stack: error?.stack,
        session_id: this.sessionId,
        user_id: this.userId,
        timestamp: Date.now(),
        url: window.location.href,
        user_agent: navigator.userAgent,
        ...context
      };

      // Add to error queue
      this.errorQueue.push(errorData);

      // Send to Sentry if available
      if (window.Sentry) {
        window.Sentry.captureException(error, {
          tags: { error_type: errorType },
          extra: context
        });
      }

      // Show user-friendly error message
      if (isProduction) {
        toast.error('Something went wrong. Our team has been notified.');
      }

      // Log in development
      if (!isProduction) {
        console.error('Error tracked:', errorType, error, context);
      }
    } catch (trackingError) {
      console.error('Failed to track error:', trackingError);
    }
  }

  // Flush queues to server
  async flushQueues() {
    try {
      if (this.errorQueue.length > 0 || this.performanceQueue.length > 0 || this.analyticsQueue.length > 0) {
        await fetch('/api/monitoring/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            errors: this.errorQueue,
            performance: this.performanceQueue,
            analytics: this.analyticsQueue,
            session_id: this.sessionId
          })
        });

        // Clear queues
        this.errorQueue = [];
        this.performanceQueue = [];
        this.analyticsQueue = [];
      }
    } catch (error) {
      console.error('Failed to flush monitoring queues:', error);
    }
  }

  // Get monitoring status
  getStatus() {
    return {
      initialized: this.initialized,
      sessionId: this.sessionId,
      userId: this.userId,
      queueSizes: {
        errors: this.errorQueue.length,
        performance: this.performanceQueue.length,
        analytics: this.analyticsQueue.length
      }
    };
  }
}

// Create singleton instance
const monitoring = new MonitoringService();

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  monitoring.initialize();
}

export default monitoring;
