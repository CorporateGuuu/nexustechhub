// Nexus TechHub Newsletter Subscription API
import nodemailer from 'nodemailer';

// Email configuration
const createTransporter = () => {
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    return {
      sendMail: async (mailOptions) => {
        console.log('📧 Newsletter subscription email would be sent in production:');
        console.log('To:', mailOptions.to);
        console.log('Subject:', mailOptions.subject);
        console.log('Content:', mailOptions.text);
        return { messageId: 'dev-test-' + Date.now() };
      }
    };
  }
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '').substring(0, 254);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Please use POST.'
    });
  }

  try {
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const sanitizedEmail = sanitizeInput(email);

    // In a real application, you would save this to a database
    // For now, we'll just send a confirmation email

    const emailSubject = 'Welcome to Nexus TechHub Newsletter!';

    const emailContent = `
Welcome to Nexus TechHub Newsletter!

Thank you for subscribing to our newsletter. You'll receive:
- Latest product updates
- Special offers and discounts
- Repair tips and tutorials
- Industry news and insights

Your email: ${sanitizedEmail}
Subscribed on: ${new Date().toISOString()}

If you didn't subscribe to this newsletter, please ignore this email.

---
Nexus TechHub - Professional Mobile Repair Parts UAE
Website: https://nexustechhub.netlify.app
Contact: +971 58 553 1029
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Nexus TechHub Newsletter</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
        .unsubscribe { color: #6b7280; font-size: 11px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Welcome to Nexus TechHub!</h1>
        <p>Your subscription is confirmed</p>
    </div>

    <div class="content">
        <p>Thank you for subscribing to our newsletter. You'll receive:</p>
        <ul>
            <li>Latest product updates</li>
            <li>Special offers and discounts</li>
            <li>Repair tips and tutorials</li>
            <li>Industry news and insights</li>
        </ul>

        <p><strong>Your email:</strong> ${sanitizedEmail}</p>
        <p><strong>Subscribed on:</strong> ${new Date().toLocaleDateString()}</p>

        <p>If you didn't subscribe to this newsletter, please ignore this email.</p>
    </div>

    <div class="footer">
        <p>Nexus TechHub - Professional Mobile Repair Parts UAE</p>
        <p>Website: <a href="https://nexustechhub.netlify.app">nexustechhub.netlify.app</a></p>
        <p>Contact: <a href="tel:+971585531029">+971 58 553 1029</a></p>
        <p class="unsubscribe">To unsubscribe, please contact us at info@nexustechhub.com</p>
    </div>
</body>
</html>
    `.trim();

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@nexustechhub.com',
      to: sanitizedEmail,
      subject: emailSubject,
      text: emailContent,
      html: htmlContent,
      replyTo: process.env.EMAIL_TO || 'info@nexustechhub.com'
    };

    const emailResult = await transporter.sendMail(mailOptions);

    console.log('✅ Newsletter subscription successful:', {
      messageId: emailResult.messageId,
      email: sanitizedEmail,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for subscribing! Please check your email for confirmation.'
    });

  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);

    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error processing your subscription. Please try again.'
    });
  }
}
