// Test SendGrid Integration for Nexus TechHub
// This script tests the SendGrid email service integration

import dotenv from 'dotenv';
import emailService from './lib/email-service.js';

// Load environment variables
dotenv.config();

async function testSendGrid() {
  try {
    console.log('🚀 Testing SendGrid Integration...');

    // Test email data
    const testEmail = {
      to: 'admin@nexustechhub.ae', // Replace with your test email
      subject: '🎉 SendGrid Integration Test - Nexus TechHub',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>SendGrid Test Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #10b981; text-align: center;">🎉 SendGrid Integration Successful!</h1>

            <div style="background: #f0fdf4; border: 1px solid #d1fae5; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h2 style="color: #065f46; margin-top: 0;">✅ Email Service Working</h2>
              <p><strong>Status:</strong> SendGrid has been successfully integrated with Nexus TechHub</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Service:</strong> SendGrid API v3</p>
            </div>

            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">📋 What's Next?</h3>
              <ul style="color: #1e40af;">
                <li>✅ Environment variables configured</li>
                <li>✅ SendGrid SDK installed</li>
                <li>✅ Email service updated</li>
                <li>🔄 Ready for production deployment</li>
              </ul>
            </div>

            <p style="text-align: center; color: #6b7280; font-size: 14px;">
              This is a test email from Nexus TechHub's SendGrid integration.<br>
              If you received this, the integration is working perfectly! 🎯
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

            <div style="text-align: center; color: #9ca3af; font-size: 12px;">
              <p><strong>Nexus TechHub</strong></p>
              <p>UAE's Premier Mobile Device Parts Store</p>
              <p>📞 +971 58 553 1029 | 💬 WhatsApp | 🌐 nexustechhub.netlify.app</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        SendGrid Integration Test - Nexus TechHub

        ✅ Email Service Working
        Status: SendGrid has been successfully integrated with Nexus TechHub
        Time: ${new Date().toLocaleString()}
        Service: SendGrid API v3

        What's Next?
        ✅ Environment variables configured
        ✅ SendGrid SDK installed
        ✅ Email service updated
        🔄 Ready for production deployment

        This is a test email from Nexus TechHub's SendGrid integration.
        If you received this, the integration is working perfectly!

        ---
        Nexus TechHub
        UAE's Premier Mobile Device Parts Store
        Phone: +971 58 553 1029
        WhatsApp: Available
        Website: nexustechhub.netlify.app
      `
    };

    // Send the test email
    const result = await emailService.sendEmail(
      testEmail.to,
      testEmail.subject,
      {
        html: testEmail.html,
        text: testEmail.text
      }
    );

    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', result[0]?.headers?.['x-message-id'] || 'N/A');
    console.log('📧 Response:', result[0]?.statusCode || 'N/A');

    // Get service status
    const status = emailService.getStatus();
    console.log('🔧 Service Status:', status);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('🔍 Error details:', error);

    if (error.message.includes('SENDGRID_API_KEY')) {
      console.log('💡 Make sure your SENDGRID_API_KEY environment variable is set correctly');
    }
  }
}

// Run the test
testSendGrid();
