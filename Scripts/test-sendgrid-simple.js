#!/usr/bin/env node

// Simple SendGrid Test for Nexus TechHub
// Tests basic SendGrid functionality

const sgMail = require('@sendgrid/mail');

async function testSendGridSimple() {
  console.log('🧪 Testing SendGrid API Key for Nexus TechHub');
  console.log('==============================================');
  
  // Check if API key is provided
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error('❌ SENDGRID_API_KEY environment variable not set');
    console.log('Usage: SENDGRID_API_KEY=SG.xxx node Scripts/test-sendgrid-simple.js');
    process.exit(1);
  }
  
  console.log(`✅ API Key found: ${apiKey.substring(0, 15)}...`);
  
  try {
    // Set API key
    sgMail.setApiKey(apiKey);
    
    // Test email configuration
    const testEmail = {
      to: 'admin@nexustechhub.ae',
      from: {
        email: 'noreply@nexustechhub.ae',
        name: 'Nexus TechHub UAE'
      },
      subject: 'SendGrid Test - Nexus TechHub Configuration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #14b8a6); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Nexus TechHub</h1>
            <p style="color: white; margin: 5px 0;">SendGrid Integration Test</p>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #333;">SendGrid Configuration Successful!</h2>
            <p>This email confirms that SendGrid is properly configured for your Nexus TechHub website.</p>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #10b981;">Business Information</h3>
              <p><strong>Business:</strong> Nexus TechHub UAE</p>
              <p><strong>Location:</strong> Ras Al Khaimah, UAE</p>
              <p><strong>Phone:</strong> +971 58 553 1029</p>
              <p><strong>WhatsApp:</strong> https://wa.me/971585531029</p>
              <p><strong>Test Time:</strong> ${new Date().toISOString()}</p>
            </div>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px;">
              <h3 style="color: #10b981;">Email Features Ready</h3>
              <p>✅ Order confirmations with UAE VAT</p>
              <p>✅ Quote request notifications</p>
              <p>✅ Contact form submissions</p>
              <p>✅ Professional business emails</p>
              <p>✅ Mobile-optimized templates</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #666;">This is an automated test email from your Nexus TechHub website.</p>
              <p style="color: #666;">If you receive this, SendGrid integration is working correctly!</p>
            </div>
          </div>
        </div>
      `,
      text: `
        Nexus TechHub - SendGrid Integration Test
        
        This email confirms that SendGrid is properly configured for your website.
        
        Business: Nexus TechHub UAE
        Location: Ras Al Khaimah, UAE
        Phone: +971 58 553 1029
        WhatsApp: https://wa.me/971585531029
        Test Time: ${new Date().toISOString()}
        
        Email features ready:
        - Order confirmations with UAE VAT
        - Quote request notifications
        - Contact form submissions
        - Professional business emails
        - Mobile-optimized templates
      `
    };
    
    console.log('\n📧 Sending test email...');
    console.log(`To: ${testEmail.to}`);
    console.log(`From: ${testEmail.from.email}`);
    console.log(`Subject: ${testEmail.subject}`);
    
    const result = await sgMail.send(testEmail);
    
    console.log('\n🎉 SendGrid test successful!');
    console.log(`✅ Status Code: ${result[0].statusCode}`);
    console.log(`✅ Message ID: ${result[0].headers['x-message-id']}`);
    console.log(`✅ Email sent to: ${testEmail.to}`);
    
    console.log('\n📋 Next Steps:');
    console.log('1. Check your email inbox for the test message');
    console.log('2. Add SendGrid environment variables to Netlify');
    console.log('3. Deploy the updated website');
    console.log('4. Test email functionality on live site');
    
    console.log('\n🔧 Environment Variables for Netlify:');
    console.log(`SENDGRID_API_KEY=${apiKey}`);
    console.log('SENDGRID_FROM_EMAIL=noreply@nexustechhub.ae');
    console.log('ADMIN_EMAIL=admin@nexustechhub.ae');
    
    return { success: true, result };
    
  } catch (error) {
    console.error('\n❌ SendGrid test failed:', error.message);
    
    if (error.code === 401) {
      console.log('\n💡 Solution: Invalid API key');
      console.log('1. Check your SendGrid API key is correct');
      console.log('2. Ensure the API key has "Mail Send" permissions');
      console.log('3. Verify your SendGrid account is active');
    } else if (error.code === 403) {
      console.log('\n💡 Solution: Sender authentication required');
      console.log('1. Go to SendGrid Dashboard > Settings > Sender Authentication');
      console.log('2. Verify your domain or single sender email');
      console.log('3. Use a verified sender email address');
    } else if (error.message.includes('The from address does not match a verified Sender Identity')) {
      console.log('\n💡 Solution: Sender email not verified');
      console.log('1. Go to SendGrid Dashboard > Settings > Sender Authentication');
      console.log('2. Add and verify noreply@nexustechhub.ae');
      console.log('3. Or use a verified email address temporarily');
    } else {
      console.log('\n💡 General troubleshooting:');
      console.log('1. Check your internet connection');
      console.log('2. Verify SendGrid service status');
      console.log('3. Check SendGrid dashboard for account issues');
    }
    
    return { success: false, error: error.message };
  }
}

// Run the test
if (require.main === module) {
  testSendGridSimple().catch(console.error);
}

module.exports = { testSendGridSimple };
