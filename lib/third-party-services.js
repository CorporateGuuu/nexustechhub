// Third-Party Services Integration for Nexus TechHub - Phase 8
import { toast } from 'react-toastify';

// Environment configuration
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// Service configuration
const SERVICES_CONFIG = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    currency: 'aed',
    country: 'AE',
    enabled: true
  },
  googleOAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    enabled: !!process.env.GOOGLE_CLIENT_ID
  },
  email: {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    user: process.env.EMAIL_SERVER_USER,
    password: process.env.EMAIL_SERVER_PASSWORD,
    from: process.env.EMAIL_FROM || 'noreply@nexustechhub.ae',
    enabled: !!process.env.EMAIL_SERVER_HOST
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    enabled: !!process.env.SENTRY_DSN
  },
  analytics: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    googleTagManagerId: process.env.GOOGLE_TAG_MANAGER_ID,
    enabled: !!process.env.GOOGLE_ANALYTICS_ID
  },
  newRelic: {
    licenseKey: process.env.NEW_RELIC_LICENSE_KEY,
    appName: 'Nexus TechHub',
    enabled: !!process.env.NEW_RELIC_LICENSE_KEY
  },
  pushNotifications: {
    vapidPublicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    vapidPrivateKey: process.env.VAPID_PRIVATE_KEY,
    subject: 'mailto:admin@nexustechhub.ae',
    enabled: !!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    enabled: !!process.env.CLOUDINARY_CLOUD_NAME
  },
  webhooks: {
    slack: process.env.SLACK_WEBHOOK_URL,
    discord: process.env.DISCORD_WEBHOOK_URL,
    zapier: process.env.ZAPIER_WEBHOOK_URL,
    enabled: !!(process.env.SLACK_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL)
  }
};

// Third-party services manager
class ThirdPartyServicesManager {
  constructor() {
    this.initialized = false;
    this.services = {};
    this.healthStatus = {};
  }

  // Initialize all third-party services
  async initialize() {
    if (this.initialized) return;

    try {
      console.log('🚀 Initializing Nexus TechHub third-party services...');

      // Initialize services in parallel
      const initPromises = [
        this.initializeStripe(),
        this.initializeSentry(),
        this.initializeAnalytics(),
        this.initializeNewRelic(),
        this.initializePushNotifications(),
        this.initializeCloudinary(),
        this.initializeWebhooks()
      ];

      await Promise.allSettled(initPromises);

      this.initialized = true;
      console.log('✅ Third-party services initialization completed');

      // Perform health check
      await this.performHealthCheck();

    } catch (error) {
      console.error('❌ Failed to initialize third-party services:', error);
      throw error;
    }
  }

  // Initialize Stripe payment processing
  async initializeStripe() {
    if (!SERVICES_CONFIG.stripe.enabled) {
      console.log('⚠️ Stripe not configured');
      return;
    }

    try {
      // Load Stripe.js
      if (typeof window !== 'undefined') {
        const { loadStripe } = await import('@stripe/stripe-js');
        this.services.stripe = await loadStripe(SERVICES_CONFIG.stripe.publishableKey);
        
        console.log('✅ Stripe initialized for UAE market (AED)');
        this.healthStatus.stripe = 'healthy';
      }
    } catch (error) {
      console.error('❌ Failed to initialize Stripe:', error);
      this.healthStatus.stripe = 'error';
      throw error;
    }
  }

  // Initialize Sentry error monitoring
  async initializeSentry() {
    if (!SERVICES_CONFIG.sentry.enabled) {
      console.log('⚠️ Sentry not configured');
      return;
    }

    try {
      const Sentry = await import('@sentry/nextjs');
      
      Sentry.init({
        dsn: SERVICES_CONFIG.sentry.dsn,
        environment: SERVICES_CONFIG.sentry.environment,
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
          business: 'mobile-repair-parts',
          phase: 'phase-8'
        }
      });

      this.services.sentry = Sentry;
      console.log('✅ Sentry error monitoring initialized');
      this.healthStatus.sentry = 'healthy';
    } catch (error) {
      console.error('❌ Failed to initialize Sentry:', error);
      this.healthStatus.sentry = 'error';
    }
  }

  // Initialize Google Analytics and Tag Manager
  async initializeAnalytics() {
    if (!SERVICES_CONFIG.analytics.enabled) {
      console.log('⚠️ Google Analytics not configured');
      return;
    }

    try {
      if (typeof window !== 'undefined') {
        // Load Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${SERVICES_CONFIG.analytics.googleAnalyticsId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;

        gtag('js', new Date());
        gtag('config', SERVICES_CONFIG.analytics.googleAnalyticsId, {
          page_title: document.title,
          page_location: window.location.href,
          country: 'AE',
          currency: 'AED',
          language: 'en-AE',
          custom_map: {
            custom_dimension_1: 'user_type',
            custom_dimension_2: 'market_segment',
            custom_dimension_3: 'product_category'
          }
        });

        // Load Google Tag Manager if configured
        if (SERVICES_CONFIG.analytics.googleTagManagerId) {
          const gtmScript = document.createElement('script');
          gtmScript.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${SERVICES_CONFIG.analytics.googleTagManagerId}');
          `;
          document.head.appendChild(gtmScript);
        }

        this.services.analytics = { gtag: window.gtag };
        console.log('✅ Google Analytics initialized for UAE market');
        this.healthStatus.analytics = 'healthy';
      }
    } catch (error) {
      console.error('❌ Failed to initialize Google Analytics:', error);
      this.healthStatus.analytics = 'error';
    }
  }

  // Initialize New Relic performance monitoring
  async initializeNewRelic() {
    if (!SERVICES_CONFIG.newRelic.enabled) {
      console.log('⚠️ New Relic not configured');
      return;
    }

    try {
      if (typeof window !== 'undefined') {
        // New Relic browser agent
        window.NREUM = window.NREUM || {};
        window.NREUM.info = {
          beacon: 'bam.nr-data.net',
          errorBeacon: 'bam.nr-data.net',
          licenseKey: SERVICES_CONFIG.newRelic.licenseKey,
          applicationID: 'nexus-techhub',
          sa: 1
        };

        console.log('✅ New Relic performance monitoring initialized');
        this.healthStatus.newRelic = 'healthy';
      }
    } catch (error) {
      console.error('❌ Failed to initialize New Relic:', error);
      this.healthStatus.newRelic = 'error';
    }
  }

  // Initialize push notifications
  async initializePushNotifications() {
    if (!SERVICES_CONFIG.pushNotifications.enabled) {
      console.log('⚠️ Push notifications not configured');
      return;
    }

    try {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
        // Register service worker
        const registration = await navigator.serviceWorker.register('/sw.js');
        
        // Subscribe to push notifications
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(SERVICES_CONFIG.pushNotifications.vapidPublicKey)
        });

        this.services.pushNotifications = { registration, subscription };
        console.log('✅ Push notifications initialized');
        this.healthStatus.pushNotifications = 'healthy';
      }
    } catch (error) {
      console.error('❌ Failed to initialize push notifications:', error);
      this.healthStatus.pushNotifications = 'error';
    }
  }

  // Initialize Cloudinary image optimization
  async initializeCloudinary() {
    if (!SERVICES_CONFIG.cloudinary.enabled) {
      console.log('⚠️ Cloudinary not configured');
      return;
    }

    try {
      // Cloudinary configuration for optimized image delivery
      this.services.cloudinary = {
        cloudName: SERVICES_CONFIG.cloudinary.cloudName,
        generateUrl: (publicId, transformations = {}) => {
          const baseUrl = `https://res.cloudinary.com/${SERVICES_CONFIG.cloudinary.cloudName}/image/upload`;
          const transformString = Object.entries(transformations)
            .map(([key, value]) => `${key}_${value}`)
            .join(',');
          
          return transformString 
            ? `${baseUrl}/${transformString}/${publicId}`
            : `${baseUrl}/${publicId}`;
        }
      };

      console.log('✅ Cloudinary image optimization initialized');
      this.healthStatus.cloudinary = 'healthy';
    } catch (error) {
      console.error('❌ Failed to initialize Cloudinary:', error);
      this.healthStatus.cloudinary = 'error';
    }
  }

  // Initialize webhooks for notifications
  async initializeWebhooks() {
    if (!SERVICES_CONFIG.webhooks.enabled) {
      console.log('⚠️ Webhooks not configured');
      return;
    }

    try {
      this.services.webhooks = {
        slack: SERVICES_CONFIG.webhooks.slack,
        discord: SERVICES_CONFIG.webhooks.discord,
        zapier: SERVICES_CONFIG.webhooks.zapier,
        sendNotification: this.sendWebhookNotification.bind(this)
      };

      console.log('✅ Webhook notifications initialized');
      this.healthStatus.webhooks = 'healthy';
    } catch (error) {
      console.error('❌ Failed to initialize webhooks:', error);
      this.healthStatus.webhooks = 'error';
    }
  }

  // Send webhook notification
  async sendWebhookNotification(type, message, data = {}) {
    try {
      const payload = {
        text: `🚨 Nexus TechHub Alert: ${message}`,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        type,
        data
      };

      const promises = [];

      // Send to Slack
      if (SERVICES_CONFIG.webhooks.slack) {
        promises.push(
          fetch(SERVICES_CONFIG.webhooks.slack, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: payload.text,
              attachments: [{
                color: type === 'error' ? 'danger' : 'good',
                fields: [
                  { title: 'Environment', value: payload.environment, short: true },
                  { title: 'Time', value: payload.timestamp, short: true }
                ]
              }]
            })
          })
        );
      }

      // Send to Discord
      if (SERVICES_CONFIG.webhooks.discord) {
        promises.push(
          fetch(SERVICES_CONFIG.webhooks.discord, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content: payload.text,
              embeds: [{
                title: 'Nexus TechHub Notification',
                description: message,
                color: type === 'error' ? 15158332 : 3066993,
                timestamp: payload.timestamp
              }]
            })
          })
        );
      }

      await Promise.allSettled(promises);
    } catch (error) {
      console.error('Failed to send webhook notification:', error);
    }
  }

  // Utility function for VAPID key conversion
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Perform health check on all services
  async performHealthCheck() {
    console.log('🔍 Performing third-party services health check...');

    const healthReport = {
      timestamp: new Date().toISOString(),
      services: this.healthStatus,
      overall: 'healthy'
    };

    // Check for any unhealthy services
    const unhealthyServices = Object.entries(this.healthStatus)
      .filter(([service, status]) => status === 'error')
      .map(([service]) => service);

    if (unhealthyServices.length > 0) {
      healthReport.overall = 'degraded';
      console.warn('⚠️ Some services are unhealthy:', unhealthyServices);
      
      // Send notification for unhealthy services
      if (this.services.webhooks) {
        await this.services.webhooks.sendNotification(
          'warning',
          `Services health check: ${unhealthyServices.length} service(s) unhealthy`,
          { unhealthyServices }
        );
      }
    } else {
      console.log('✅ All services are healthy');
    }

    return healthReport;
  }

  // Get service status
  getServiceStatus(serviceName) {
    return this.healthStatus[serviceName] || 'unknown';
  }

  // Get all services status
  getAllServicesStatus() {
    return {
      initialized: this.initialized,
      services: this.healthStatus,
      config: Object.keys(SERVICES_CONFIG).reduce((acc, key) => {
        acc[key] = { enabled: SERVICES_CONFIG[key].enabled };
        return acc;
      }, {})
    };
  }
}

// Create singleton instance
const thirdPartyServices = new ThirdPartyServicesManager();

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  thirdPartyServices.initialize().catch(console.error);
}

export default thirdPartyServices;
export { SERVICES_CONFIG, ThirdPartyServicesManager };
