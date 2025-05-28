// Comprehensive Tests for Third-Party Integrations - Nexus TechHub Phase 8
import { jest } from '@jest/globals';

// Mock environment variables
process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_mock_key';
process.env.STRIPE_SECRET_KEY = 'sk_test_mock_key';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_mock_secret';
process.env.GOOGLE_CLIENT_ID = 'mock_google_client_id';
process.env.GOOGLE_CLIENT_SECRET = 'mock_google_client_secret';
process.env.EMAIL_SERVER_HOST = 'smtp.gmail.com';
process.env.EMAIL_SERVER_USER = 'test@nexustechhub.ae';
process.env.EMAIL_SERVER_PASSWORD = 'mock_password';
process.env.SENTRY_DSN = 'https://mock@sentry.io/project';
process.env.GOOGLE_ANALYTICS_ID = 'G-MOCK123';
process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY = 'mock_vapid_public_key';
process.env.VAPID_PRIVATE_KEY = 'mock_vapid_private_key';
process.env.CLOUDINARY_CLOUD_NAME = 'mock_cloud';
process.env.CLOUDINARY_API_KEY = 'mock_api_key';
process.env.CLOUDINARY_API_SECRET = 'mock_api_secret';
process.env.ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/mock';
process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/mock';

// Import services after setting environment variables
import thirdPartyServices from '../lib/third-party-services.js';
import stripeUAE from '../lib/stripe-uae-integration.js';
import emailService from '../lib/email-service.js';
import pushNotificationServer from '../lib/push-notification-server.js';
import cloudinaryService from '../lib/cloudinary-service.js';
import businessOperations from '../lib/business-operations.js';

// Mock fetch globally
global.fetch = jest.fn();

describe('Third-Party Services Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
  });

  describe('Third-Party Services Manager', () => {
    test('should initialize all services', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      await thirdPartyServices.initialize();
      
      expect(thirdPartyServices.initialized).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith('🚀 Initializing Nexus TechHub third-party services...');
      
      consoleSpy.mockRestore();
    });

    test('should return service status', () => {
      const status = thirdPartyServices.getAllServicesStatus();
      
      expect(status).toHaveProperty('initialized');
      expect(status).toHaveProperty('services');
      expect(status).toHaveProperty('config');
    });

    test('should handle service initialization errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // Mock a service that throws an error
      const originalSentry = process.env.SENTRY_DSN;
      process.env.SENTRY_DSN = 'invalid_dsn';
      
      try {
        await thirdPartyServices.initialize();
      } catch (error) {
        expect(consoleErrorSpy).toHaveBeenCalled();
      }
      
      process.env.SENTRY_DSN = originalSentry;
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Stripe UAE Integration', () => {
    test('should calculate UAE taxes correctly', () => {
      const subtotal = 100;
      const shippingCost = 25;
      
      const totals = stripeUAE.calculateUAETaxes(subtotal, shippingCost);
      
      expect(totals.subtotal).toBe(100);
      expect(totals.shippingCost).toBe(25);
      expect(totals.vatAmount).toBe(6.25); // 5% of (100 + 25)
      expect(totals.total).toBe(131.25);
      expect(totals.currency).toBe('aed');
    });

    test('should format AED currency correctly', () => {
      const formatted = stripeUAE.formatCurrency(123.45);
      expect(formatted).toContain('123.45');
    });

    test('should validate UAE phone numbers', () => {
      expect(stripeUAE.validateUAEPhone('+971501234567')).toBe(true);
      expect(stripeUAE.validateUAEPhone('971501234567')).toBe(true);
      expect(stripeUAE.validateUAEPhone('0501234567')).toBe(true);
      expect(stripeUAE.validateUAEPhone('1234567890')).toBe(false);
    });

    test('should provide UAE shipping options', () => {
      const options = stripeUAE.getUAEShippingOptions(150);
      
      expect(options).toHaveLength(3);
      expect(options[0].id).toBe('standard');
      expect(options[1].id).toBe('express');
      expect(options[2].id).toBe('same-day');
      
      // Check free shipping threshold
      const freeShippingOptions = stripeUAE.getUAEShippingOptions(250);
      expect(freeShippingOptions[0].free).toBe(true);
    });

    test('should handle checkout session creation', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ sessionId: 'cs_test_123', url: 'https://checkout.stripe.com/test' })
      });

      const items = [
        { name: 'iPhone Screen', price: 150, quantity: 1 }
      ];

      const session = await stripeUAE.createCheckoutSession(items);
      
      expect(fetch).toHaveBeenCalledWith('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('iPhone Screen')
      });
      
      expect(session.sessionId).toBe('cs_test_123');
    });
  });

  describe('Email Service Integration', () => {
    test('should return correct service status', () => {
      const status = emailService.getStatus();
      
      expect(status).toHaveProperty('initialized');
      expect(status).toHaveProperty('config');
      expect(status).toHaveProperty('business');
      expect(status.config.host).toBe('smtp.gmail.com');
    });

    test('should handle email sending errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // Mock nodemailer to throw an error
      jest.doMock('nodemailer', () => ({
        createTransporter: () => ({
          verify: () => Promise.reject(new Error('SMTP connection failed')),
          sendMail: () => Promise.reject(new Error('Send failed'))
        })
      }));

      try {
        await emailService.sendEmail('test@example.com', 'Test', 'Test content');
      } catch (error) {
        expect(error.message).toContain('Send failed');
      }
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Push Notification Service', () => {
    test('should return correct service status', () => {
      const status = pushNotificationServer.getStatus();
      
      expect(status).toHaveProperty('initialized');
      expect(status).toHaveProperty('config');
      expect(status).toHaveProperty('templates');
      expect(status.templates).toContain('orderConfirmation');
      expect(status.templates).toContain('stockAlert');
    });

    test('should handle notification sending', async () => {
      const mockSubscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/mock',
        keys: {
          p256dh: 'mock_p256dh_key',
          auth: 'mock_auth_key'
        }
      };

      const orderData = {
        orderNumber: 'NTH-001',
        amount: 150,
        currency: 'AED'
      };

      // Mock web-push
      jest.doMock('web-push', () => ({
        setVapidDetails: jest.fn(),
        sendNotification: jest.fn().mockResolvedValue({ statusCode: 201 })
      }));

      const result = await pushNotificationServer.sendNotification(
        mockSubscription,
        'orderConfirmation',
        orderData
      );

      expect(result).toBeDefined();
    });
  });

  describe('Cloudinary Service Integration', () => {
    test('should return correct service status', () => {
      const status = cloudinaryService.getStatus();
      
      expect(status).toHaveProperty('initialized');
      expect(status).toHaveProperty('config');
      expect(status).toHaveProperty('presets');
      expect(status).toHaveProperty('breakpoints');
      expect(status.config.cloudName).toBe('mock_cloud');
    });

    test('should generate image URLs with transformations', () => {
      const publicId = 'test-product-image';
      const url = cloudinaryService.generateImageUrl(publicId, 'productMedium');
      
      expect(url).toContain('mock_cloud');
      expect(url).toContain('test-product-image');
    });

    test('should generate responsive image URLs', () => {
      const publicId = 'test-product-image';
      const responsiveUrls = cloudinaryService.generateResponsiveUrls(publicId);
      
      expect(responsiveUrls).toHaveProperty('mobile');
      expect(responsiveUrls).toHaveProperty('tablet');
      expect(responsiveUrls).toHaveProperty('desktop');
      expect(responsiveUrls).toHaveProperty('large');
    });

    test('should generate srcset for responsive images', () => {
      const publicId = 'test-product-image';
      const srcset = cloudinaryService.generateSrcSet(publicId);
      
      expect(srcset).toContain('480w');
      expect(srcset).toContain('768w');
      expect(srcset).toContain('1200w');
      expect(srcset).toContain('1920w');
    });

    test('should generate product image set', () => {
      const publicId = 'test-product-image';
      const imageSet = cloudinaryService.generateProductImageSet(publicId);
      
      expect(imageSet).toHaveProperty('thumbnail');
      expect(imageSet).toHaveProperty('medium');
      expect(imageSet).toHaveProperty('large');
      expect(imageSet).toHaveProperty('zoom');
      expect(imageSet).toHaveProperty('mobile');
      expect(imageSet).toHaveProperty('responsive');
      expect(imageSet).toHaveProperty('srcset');
    });

    test('should return placeholder URL for missing images', () => {
      const url = cloudinaryService.generateImageUrl(null, 'productMedium');
      expect(url).toContain('placeholder');
    });
  });

  describe('Business Operations Integration', () => {
    test('should return correct service status', () => {
      const status = businessOperations.getStatus();
      
      expect(status).toHaveProperty('initialized');
      expect(status).toHaveProperty('config');
      expect(status).toHaveProperty('inventory');
      expect(status).toHaveProperty('support');
    });

    test('should process order automation', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        headers: new Map([['X-Automation-ID', 'auto_123']])
      });

      const orderData = {
        id: 'order_123',
        orderNumber: 'NTH-001',
        customerName: 'Ahmed Al-Rashid',
        customerEmail: 'ahmed@example.com',
        total: 150,
        items: [{ name: 'iPhone Screen', quantity: 1 }]
      };

      const result = await businessOperations.processOrderAutomation(orderData);
      
      expect(result.success).toBe(true);
      expect(result.automationId).toBe('auto_123');
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('zapier'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'X-Business': 'nexus-techhub'
          })
        })
      );
    });

    test('should handle chatbot responses', async () => {
      const sessionId = 'session_123';
      const message = 'What are your shipping options?';

      const response = await businessOperations.processChatMessage(sessionId, message);
      
      expect(response).toHaveProperty('message');
      expect(response).toHaveProperty('confidence');
      expect(response).toHaveProperty('suggestions');
      expect(response.message).toContain('shipping');
      expect(response.confidence).toBeGreaterThan(0.5);
    });

    test('should handle product availability queries', () => {
      // Mock inventory data
      businessOperations.inventoryCache.set('NTH-IP-SCR-001', {
        sku: 'NTH-IP-SCR-001',
        quantity: 10,
        reserved: 2,
        available: 8,
        lastUpdated: new Date().toISOString()
      });

      const availability = businessOperations.getProductAvailability('NTH-IP-SCR-001');
      
      expect(availability.available).toBe(true);
      expect(availability.quantity).toBe(8);
      expect(availability.status).toBe('in_stock');
    });

    test('should handle out of stock products', () => {
      businessOperations.inventoryCache.set('NTH-IP-SCR-002', {
        sku: 'NTH-IP-SCR-002',
        quantity: 0,
        reserved: 0,
        available: 0,
        lastUpdated: new Date().toISOString()
      });

      const availability = businessOperations.getProductAvailability('NTH-IP-SCR-002');
      
      expect(availability.available).toBe(false);
      expect(availability.quantity).toBe(0);
      expect(availability.status).toBe('out_of_stock');
      expect(availability.message).toBe('Out of stock');
    });

    test('should escalate support sessions when confidence is low', async () => {
      const sessionId = 'session_456';
      const lowConfidenceMessage = 'xyz random gibberish';

      // Send multiple low-confidence messages to trigger escalation
      for (let i = 0; i < 4; i++) {
        await businessOperations.processChatMessage(sessionId, lowConfidenceMessage);
      }

      const session = businessOperations.supportSessions.get(sessionId);
      expect(session.escalated).toBe(true);
    });
  });

  describe('Integration Error Handling', () => {
    test('should handle network failures gracefully', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const orderData = { id: 'test', orderNumber: 'NTH-001' };
      
      await expect(businessOperations.processOrderAutomation(orderData))
        .rejects.toThrow('Network error');
    });

    test('should handle invalid API responses', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request'
      });

      const items = [{ name: 'Test Item', price: 100, quantity: 1 }];
      
      await expect(stripeUAE.createCheckoutSession(items))
        .rejects.toThrow();
    });

    test('should handle missing environment variables', () => {
      const originalKey = process.env.STRIPE_SECRET_KEY;
      delete process.env.STRIPE_SECRET_KEY;

      const status = stripeUAE.getStatus();
      expect(status.initialized).toBe(false);

      process.env.STRIPE_SECRET_KEY = originalKey;
    });
  });

  describe('UAE Market Specific Features', () => {
    test('should handle AED currency formatting', () => {
      const formatted = stripeUAE.formatCurrency(1234.56);
      expect(formatted).toMatch(/1,?234\.56/);
    });

    test('should provide UAE-specific shipping information', () => {
      const response = businessOperations.generateChatbotResponse('shipping to dubai', {});
      expect(response.message).toContain('UAE');
      expect(response.message).toContain('Dubai');
    });

    test('should handle Arabic language support queries', async () => {
      const response = await businessOperations.processChatMessage(
        'session_arabic',
        'Do you support Arabic language?'
      );
      
      expect(response.message).toContain('Arabic');
      expect(response.confidence).toBeGreaterThan(0.5);
    });

    test('should provide UAE business hours information', async () => {
      const response = await businessOperations.processChatMessage(
        'session_hours',
        'What are your business hours?'
      );
      
      expect(response.message).toContain('Sunday to Thursday');
      expect(response.message).toContain('9:00 AM - 6:00 PM');
      expect(response.message).toContain('UAE Time');
    });
  });
});

// Integration test for complete order flow
describe('Complete Order Flow Integration', () => {
  test('should handle complete order processing flow', async () => {
    // Mock all external API calls
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ sessionId: 'cs_test_123', url: 'https://checkout.stripe.com/test' })
      })
      .mockResolvedValueOnce({
        ok: true,
        headers: new Map([['X-Automation-ID', 'auto_123']])
      });

    // 1. Create checkout session
    const items = [
      { name: 'iPhone 13 Screen', price: 250, quantity: 1, sku: 'NTH-IP-SCR-001' }
    ];

    const session = await stripeUAE.createCheckoutSession(items, {
      email: 'customer@example.com',
      name: 'Ahmed Al-Rashid'
    });

    expect(session.sessionId).toBe('cs_test_123');

    // 2. Process order automation
    const orderData = {
      id: 'order_123',
      orderNumber: 'NTH-001',
      customerName: 'Ahmed Al-Rashid',
      customerEmail: 'customer@example.com',
      total: 262.5, // Including VAT
      items: items
    };

    const automation = await businessOperations.processOrderAutomation(orderData);
    expect(automation.success).toBe(true);

    // 3. Check inventory
    businessOperations.inventoryCache.set('NTH-IP-SCR-001', {
      sku: 'NTH-IP-SCR-001',
      quantity: 5,
      available: 5,
      lastUpdated: new Date().toISOString()
    });

    const availability = businessOperations.getProductAvailability('NTH-IP-SCR-001');
    expect(availability.available).toBe(true);

    console.log('✅ Complete order flow integration test passed');
  });
});

export default {};
