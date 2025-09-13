// SendGrid Email Service for Nexus TechHub UAE
// Handles all email communications for the business

const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Email templates for Nexus TechHub
const EMAIL_TEMPLATES = {
  // Customer order confirmation
  ORDER_CONFIRMATION: {
    subject: 'Order Confirmation - Nexus TechHub UAE',
    template: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #14b8a6); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Nexus TechHub</h1>
          <p style="color: white; margin: 5px 0;">Premium Mobile Repair Parts - UAE</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333;">Order Confirmation</h2>
          <p>Dear ${data.customerName},</p>
          <p>Thank you for your order! We've received your payment and are preparing your items.</p>
          
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10b981;">Order Details</h3>
            <p><strong>Order ID:</strong> ${data.orderId}</p>
            <p><strong>Amount:</strong> ${data.amount} AED (including 5% UAE VAT)</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
            <p><strong>Order Date:</strong> ${data.orderDate}</p>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10b981;">Items Ordered</h3>
            ${data.items.map(item => `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p><strong>${item.name}</strong></p>
                <p>Quantity: ${item.quantity} | Price: ${item.price} AED</p>
              </div>
            `).join('')}
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10b981;">Delivery Information</h3>
            <p><strong>Delivery Address:</strong><br>${data.deliveryAddress}</p>
            <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery}</p>
            <p><strong>Tracking:</strong> We'll send tracking details once shipped</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p>Need help? Contact us:</p>
            <p><strong>Phone:</strong> +971 58 553 1029</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/971585531029">Chat with us</a></p>
            <p><strong>Email:</strong> ${process.env.BUSINESS_EMAIL || 'admin@nexustechhub.ae'}</p>
          </div>
          
          <div style="background: #10b981; color: white; padding: 15px; text-align: center; border-radius: 8px;">
            <p style="margin: 0;">Thank you for choosing Nexus TechHub!</p>
            <p style="margin: 5px 0;">Your trusted mobile repair parts supplier in UAE</p>
          </div>
        </div>
      </div>
    `
  },

  // Quote request confirmation
  QUOTE_REQUEST: {
    subject: 'Quote Request Received - Nexus TechHub UAE',
    template: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #14b8a6); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Nexus TechHub</h1>
          <p style="color: white; margin: 5px 0;">Premium Mobile Repair Parts - UAE</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333;">Quote Request Received</h2>
          <p>Dear ${data.customerName},</p>
          <p>We've received your quote request and our team is preparing a detailed quotation for you.</p>
          
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10b981;">Request Details</h3>
            <p><strong>Request ID:</strong> ${data.requestId}</p>
            <p><strong>Device:</strong> ${data.device}</p>
            <p><strong>Parts Needed:</strong> ${data.partsNeeded}</p>
            <p><strong>Quantity:</strong> ${data.quantity}</p>
            <p><strong>Request Date:</strong> ${data.requestDate}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10b981;">What's Next?</h3>
            <p>✅ Our team will review your requirements</p>
            <p>✅ We'll prepare a detailed quotation with UAE VAT</p>
            <p>✅ You'll receive the quote within 2-4 hours</p>
            <p>✅ Free consultation on part compatibility</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p>Need immediate assistance?</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/971585531029" style="background: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Chat Now</a></p>
            <p><strong>Phone:</strong> +971 58 553 1029</p>
          </div>
        </div>
      </div>
    `
  },

  // Contact form submission
  CONTACT_FORM: {
    subject: 'New Contact Form Submission - Nexus TechHub',
    template: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">New Contact Form Submission</h2>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 5px;">
            ${data.message}
          </div>
          <p><strong>Submitted:</strong> ${data.submittedAt}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px;">
          <p><strong>Recommended Response Time:</strong> Within 2 hours</p>
          <p><strong>Follow-up Actions:</strong></p>
          <ul>
            <li>Send personalized response</li>
            <li>Provide relevant product information</li>
            <li>Offer WhatsApp consultation if needed</li>
          </ul>
        </div>
      </div>
    `
  }
};

// SendGrid email service class
class SendGridService {
  constructor() {
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL || process.env.BUSINESS_EMAIL || 'noreply@nexustechhub.ae';
    this.fromName = 'Nexus TechHub UAE';
    this.adminEmail = process.env.ADMIN_EMAIL || process.env.BUSINESS_EMAIL || process.env.BUSINESS_EMAIL;
  }

  // Send order confirmation email
  async sendOrderConfirmation(orderData) {
    try {
      const msg = {
        to: orderData.customerEmail,
        from: {
          email: this.fromEmail,
          name: this.fromName
        },
        subject: EMAIL_TEMPLATES.ORDER_CONFIRMATION.subject,
        html: EMAIL_TEMPLATES.ORDER_CONFIRMATION.template(orderData)
      };

      const result = await sgMail.send(msg);
      console.log('Order confirmation email sent:', result[0].statusCode);
      return { success: true, messageId: result[0].headers['x-message-id'] };
    } catch (error) {
      console.error('Error sending order confirmation:', error);
      return { success: false, error: error.message };
    }
  }

  // Send quote request confirmation
  async sendQuoteRequest(quoteData) {
    try {
      // Send confirmation to customer
      const customerMsg = {
        to: quoteData.customerEmail,
        from: {
          email: this.fromEmail,
          name: this.fromName
        },
        subject: EMAIL_TEMPLATES.QUOTE_REQUEST.subject,
        html: EMAIL_TEMPLATES.QUOTE_REQUEST.template(quoteData)
      };

      // Send notification to admin
      const adminMsg = {
        to: this.adminEmail,
        from: {
          email: this.fromEmail,
          name: this.fromName
        },
        subject: `New Quote Request - ${quoteData.device}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Customer:</strong> ${quoteData.customerName}</p>
          <p><strong>Email:</strong> ${quoteData.customerEmail}</p>
          <p><strong>Phone:</strong> ${quoteData.phone}</p>
          <p><strong>Device:</strong> ${quoteData.device}</p>
          <p><strong>Parts:</strong> ${quoteData.partsNeeded}</p>
          <p><strong>Quantity:</strong> ${quoteData.quantity}</p>
          <p><strong>Message:</strong> ${quoteData.message}</p>
        `
      };

      const results = await Promise.all([
        sgMail.send(customerMsg),
        sgMail.send(adminMsg)
      ]);

      console.log('Quote request emails sent');
      return { success: true, results };
    } catch (error) {
      console.error('Error sending quote request:', error);
      return { success: false, error: error.message };
    }
  }

  // Send contact form submission
  async sendContactForm(contactData) {
    try {
      const msg = {
        to: this.adminEmail,
        from: {
          email: this.fromEmail,
          name: this.fromName
        },
        subject: EMAIL_TEMPLATES.CONTACT_FORM.subject,
        html: EMAIL_TEMPLATES.CONTACT_FORM.template(contactData),
        replyTo: contactData.email
      };

      const result = await sgMail.send(msg);
      console.log('Contact form email sent:', result[0].statusCode);
      return { success: true, messageId: result[0].headers['x-message-id'] };
    } catch (error) {
      console.error('Error sending contact form:', error);
      return { success: false, error: error.message };
    }
  }

  // Send custom email
  async sendCustomEmail(to, subject, htmlContent, textContent = null) {
    try {
      const msg = {
        to,
        from: {
          email: this.fromEmail,
          name: this.fromName
        },
        subject,
        html: htmlContent,
        text: textContent
      };

      const result = await sgMail.send(msg);
      console.log('Custom email sent:', result[0].statusCode);
      return { success: true, messageId: result[0].headers['x-message-id'] };
    } catch (error) {
      console.error('Error sending custom email:', error);
      return { success: false, error: error.message };
    }
  }

  // Test email configuration
  async testConfiguration() {
    try {
      const testMsg = {
        to: this.adminEmail,
        from: {
          email: this.fromEmail,
          name: this.fromName
        },
        subject: 'SendGrid Test - Nexus TechHub Configuration',
        html: `
          <h2>SendGrid Configuration Test</h2>
          <p>This is a test email to verify SendGrid integration for Nexus TechHub.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>From:</strong> ${this.fromEmail}</p>
          <p><strong>Business:</strong> Nexus TechHub UAE</p>
          <p>If you receive this email, SendGrid is configured correctly!</p>
        `
      };

      const result = await sgMail.send(testMsg);
      return { 
        success: true, 
        statusCode: result[0].statusCode,
        messageId: result[0].headers['x-message-id']
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Export the service
module.exports = new SendGridService();
