// Enhanced Email Service Integration for Nexus TechHub - Phase 8
import nodemailer from 'nodemailer';

// Email service configuration
const EMAIL_CONFIG = {
  host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  from: process.env.EMAIL_FROM || 'noreply@nexustechhub.ae',
  replyTo: 'support@nexustechhub.ae'
};

// Business information for UAE market
const BUSINESS_INFO = {
  name: 'Nexus TechHub',
  address: 'FAMC3062, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates',
  phone: '+971 58 553 1029',
  email: 'info@nexustechhub.ae',
  website: 'https://nexustechhub.netlify.app',
  whatsapp: 'https://wa.me/971585531029',
  logo: 'https://nexustechhub.netlify.app/images/nexus-logo.svg'
};

// Email templates for UAE market
const EMAIL_TEMPLATES = {
  // NextAuth.js sign-in email template
  signIn: (url, host) => {
    const brandColor = '#10b981';
    return {
      subject: `Sign in to ${BUSINESS_INFO.name} - UAE's Premier Mobile Parts Store`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sign in to ${BUSINESS_INFO.name}</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, ${brandColor} 0%, #14b8a6 100%); padding: 40px 30px; text-align: center;">
                      <img src="${BUSINESS_INFO.logo}" alt="${BUSINESS_INFO.name}" style="height: 60px; margin-bottom: 20px;">
                      <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        Welcome to ${BUSINESS_INFO.name}
                      </h1>
                      <p style="color: #f0fdf4; font-size: 16px; margin: 10px 0 0 0; opacity: 0.9;">
                        🇦🇪 UAE's Premier Mobile Device Parts Store
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 20px 0; text-align: center;">
                        Sign in to Your Account
                      </h2>
                      
                      <p style="color: #6b7280; font-size: 16px; line-height: 24px; margin: 0 0 30px 0; text-align: center;">
                        Click the button below to securely sign in to your ${BUSINESS_INFO.name} account and access premium mobile device parts.
                      </p>
                      
                      <!-- Sign In Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, ${brandColor} 0%, #14b8a6 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 18px; font-weight: 600; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); transition: all 0.3s ease;">
                              🔐 Sign in to Your Account
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Features Box -->
                      <div style="background: #f0fdf4; border: 1px solid #d1fae5; border-radius: 8px; padding: 24px; margin: 30px 0;">
                        <h3 style="color: #065f46; font-size: 18px; font-weight: 600; margin: 0 0 15px 0; text-align: center;">
                          🇦🇪 Why Choose ${BUSINESS_INFO.name}?
                        </h3>
                        <ul style="color: #047857; font-size: 14px; line-height: 22px; margin: 0; padding-left: 20px;">
                          <li>✅ Premium iPhone, Samsung & iPad parts</li>
                          <li>✅ Professional repair tools & equipment</li>
                          <li>✅ Fast shipping across UAE</li>
                          <li>✅ Expert technical support</li>
                          <li>✅ Quality guarantee & warranty</li>
                          <li>✅ Competitive pricing in AED</li>
                        </ul>
                      </div>
                      
                      <!-- Security Notice -->
                      <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 16px; margin: 20px 0;">
                        <p style="color: #92400e; font-size: 14px; margin: 0; text-align: center;">
                          🔒 <strong>Security Notice:</strong> This link will expire in 24 hours for your security.
                        </p>
                      </div>
                      
                      <p style="color: #9ca3af; font-size: 12px; line-height: 18px; margin: 20px 0 0 0; text-align: center;">
                        If you did not request this email, you can safely ignore it.<br>
                        This sign-in link is valid for 24 hours and can only be used once.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="text-align: center;">
                            <h4 style="color: #374151; font-size: 16px; font-weight: 600; margin: 0 0 15px 0;">
                              ${BUSINESS_INFO.name}
                            </h4>
                            <p style="color: #6b7280; font-size: 12px; line-height: 18px; margin: 0;">
                              ${BUSINESS_INFO.address}
                            </p>
                            <div style="margin: 15px 0;">
                              <a href="tel:${BUSINESS_INFO.phone}" style="color: ${brandColor}; text-decoration: none; font-size: 14px; font-weight: 500;">
                                📞 ${BUSINESS_INFO.phone}
                              </a>
                              <span style="color: #d1d5db; margin: 0 10px;">|</span>
                              <a href="${BUSINESS_INFO.whatsapp}" style="color: ${brandColor}; text-decoration: none; font-size: 14px; font-weight: 500;">
                                💬 WhatsApp
                              </a>
                            </div>
                            <p style="color: #9ca3af; font-size: 11px; margin: 10px 0 0 0;">
                              © ${new Date().getFullYear()} ${BUSINESS_INFO.name}. All rights reserved.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
        Sign in to ${BUSINESS_INFO.name}
        
        Welcome to UAE's Premier Mobile Device Parts Store!
        
        Click here to sign in: ${url}
        
        Why Choose ${BUSINESS_INFO.name}?
        ✅ Premium iPhone, Samsung & iPad parts
        ✅ Professional repair tools & equipment  
        ✅ Fast shipping across UAE
        ✅ Expert technical support
        ✅ Quality guarantee & warranty
        ✅ Competitive pricing in AED
        
        Security Notice: This link will expire in 24 hours for your security.
        
        If you did not request this email, you can safely ignore it.
        
        ${BUSINESS_INFO.name}
        ${BUSINESS_INFO.address}
        Phone: ${BUSINESS_INFO.phone}
        WhatsApp: ${BUSINESS_INFO.whatsapp}
        Website: ${BUSINESS_INFO.website}
      `
    };
  },

  // Order confirmation email template
  orderConfirmation: (orderData) => {
    const brandColor = '#10b981';
    return {
      subject: `Order Confirmation #${orderData.orderNumber} - ${BUSINESS_INFO.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation - ${BUSINESS_INFO.name}</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, ${brandColor} 0%, #14b8a6 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                      <img src="${BUSINESS_INFO.logo}" alt="${BUSINESS_INFO.name}" style="height: 50px; margin-bottom: 15px;">
                      <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0;">
                        Order Confirmed! 🎉
                      </h1>
                      <p style="color: #f0fdf4; font-size: 16px; margin: 10px 0 0 0;">
                        Thank you for your order, ${orderData.customerName}!
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Order Details -->
                  <tr>
                    <td style="padding: 30px;">
                      <div style="background: #f0fdf4; border: 1px solid #d1fae5; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                        <h2 style="color: #065f46; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">
                          📦 Order Details
                        </h2>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="color: #047857; font-size: 14px; padding: 5px 0;"><strong>Order Number:</strong></td>
                            <td style="color: #047857; font-size: 14px; padding: 5px 0; text-align: right;">#${orderData.orderNumber}</td>
                          </tr>
                          <tr>
                            <td style="color: #047857; font-size: 14px; padding: 5px 0;"><strong>Total Amount:</strong></td>
                            <td style="color: #047857; font-size: 14px; padding: 5px 0; text-align: right; font-weight: 600;">${orderData.amount} ${orderData.currency}</td>
                          </tr>
                          <tr>
                            <td style="color: #047857; font-size: 14px; padding: 5px 0;"><strong>Payment Method:</strong></td>
                            <td style="color: #047857; font-size: 14px; padding: 5px 0; text-align: right;">${orderData.paymentMethod}</td>
                          </tr>
                        </table>
                      </div>
                      
                      <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                        Your order has been successfully processed and will be prepared for shipping. You'll receive a tracking number once your order ships.
                      </p>
                      
                      <!-- Next Steps -->
                      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <h3 style="color: #1e40af; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                          📋 What's Next?
                        </h3>
                        <ul style="color: #1e40af; font-size: 14px; line-height: 20px; margin: 0; padding-left: 20px;">
                          <li>We'll prepare your order within 1-2 business days</li>
                          <li>You'll receive tracking information via email</li>
                          <li>Delivery within UAE typically takes 2-5 business days</li>
                          <li>Contact us if you have any questions</li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Contact Information -->
                  <tr>
                    <td style="background: #f9fafb; padding: 25px; border-radius: 0 0 12px 12px;">
                      <h3 style="color: #374151; font-size: 16px; font-weight: 600; margin: 0 0 15px 0; text-align: center;">
                        Need Help? We're Here for You!
                      </h3>
                      <div style="text-align: center;">
                        <a href="tel:${BUSINESS_INFO.phone}" style="display: inline-block; background: ${brandColor}; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 5px;">
                          📞 Call Us
                        </a>
                        <a href="${BUSINESS_INFO.whatsapp}" style="display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 5px;">
                          💬 WhatsApp
                        </a>
                      </div>
                      <p style="color: #6b7280; font-size: 12px; text-align: center; margin: 15px 0 0 0;">
                        ${BUSINESS_INFO.name} | ${BUSINESS_INFO.phone} | ${BUSINESS_INFO.email}
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
        Order Confirmation - ${BUSINESS_INFO.name}
        
        Thank you for your order, ${orderData.customerName}!
        
        Order Details:
        Order Number: #${orderData.orderNumber}
        Total Amount: ${orderData.amount} ${orderData.currency}
        Payment Method: ${orderData.paymentMethod}
        
        What's Next?
        - We'll prepare your order within 1-2 business days
        - You'll receive tracking information via email
        - Delivery within UAE typically takes 2-5 business days
        
        Need Help?
        Phone: ${BUSINESS_INFO.phone}
        WhatsApp: ${BUSINESS_INFO.whatsapp}
        Email: ${BUSINESS_INFO.email}
        
        ${BUSINESS_INFO.name}
        ${BUSINESS_INFO.address}
      `
    };
  }
};

// Email service class
class EmailService {
  constructor() {
    this.transporter = null;
    this.initialized = false;
  }

  // Initialize email service
  async initialize() {
    if (this.initialized) return;

    try {
      this.transporter = nodemailer.createTransporter(EMAIL_CONFIG);
      
      // Verify connection
      await this.transporter.verify();
      
      this.initialized = true;
      console.log('✅ Email service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error);
      throw error;
    }
  }

  // Send NextAuth.js sign-in email
  async sendSignInEmail(identifier, url, provider) {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      const { host } = new URL(url);
      const template = EMAIL_TEMPLATES.signIn(url, host);

      const result = await this.transporter.sendMail({
        from: `"${BUSINESS_INFO.name}" <${EMAIL_CONFIG.from}>`,
        to: identifier,
        replyTo: EMAIL_CONFIG.replyTo,
        subject: template.subject,
        text: template.text,
        html: template.html,
        headers: {
          'X-Business': BUSINESS_INFO.name,
          'X-Country': 'AE',
          'X-Service': 'authentication'
        }
      });

      console.log(`📧 Sign-in email sent to: ${identifier}`);
      return result;

    } catch (error) {
      console.error('❌ Failed to send sign-in email:', error);
      throw error;
    }
  }

  // Send order confirmation email
  async sendOrderConfirmationEmail(orderData) {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      const template = EMAIL_TEMPLATES.orderConfirmation(orderData);

      const result = await this.transporter.sendMail({
        from: `"${BUSINESS_INFO.name}" <${EMAIL_CONFIG.from}>`,
        to: orderData.customerEmail,
        replyTo: EMAIL_CONFIG.replyTo,
        subject: template.subject,
        text: template.text,
        html: template.html,
        headers: {
          'X-Business': BUSINESS_INFO.name,
          'X-Country': 'AE',
          'X-Service': 'order-confirmation',
          'X-Order-Number': orderData.orderNumber
        }
      });

      console.log(`📧 Order confirmation sent to: ${orderData.customerEmail}`);
      return result;

    } catch (error) {
      console.error('❌ Failed to send order confirmation email:', error);
      throw error;
    }
  }

  // Send custom email
  async sendEmail(to, subject, content, options = {}) {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      const result = await this.transporter.sendMail({
        from: `"${BUSINESS_INFO.name}" <${EMAIL_CONFIG.from}>`,
        to,
        replyTo: EMAIL_CONFIG.replyTo,
        subject,
        text: content.text || content,
        html: content.html || content,
        ...options
      });

      console.log(`📧 Email sent to: ${to}`);
      return result;

    } catch (error) {
      console.error('❌ Failed to send email:', error);
      throw error;
    }
  }

  // Get service status
  getStatus() {
    return {
      initialized: this.initialized,
      config: {
        host: EMAIL_CONFIG.host,
        port: EMAIL_CONFIG.port,
        from: EMAIL_CONFIG.from,
        secure: EMAIL_CONFIG.secure
      },
      business: BUSINESS_INFO
    };
  }
}

// Create singleton instance
const emailService = new EmailService();

export default emailService;
export { EMAIL_CONFIG, BUSINESS_INFO, EMAIL_TEMPLATES, EmailService };
