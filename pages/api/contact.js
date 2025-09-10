// Nexus TechHub Contact Form API
import nodemailer from 'nodemailer';

// Email configuration
const createTransporter = () => {
  // In production, use environment variables for email configuration
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransport({
      service: 'gmail', // or your preferred email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    // For development, use a test account or console logging
    return {
      sendMail: async (mailOptions) => {
        console.log('📧 Email would be sent in production:');
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

// Validate phone number (UAE format)
const isValidPhone = (phone) => {
  // UAE phone number patterns: +971XXXXXXXXX or 05XXXXXXXX
  const phoneRegex = /^(\+971|971|05)[0-9]{8,9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

// Sanitize input to prevent XSS
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Please use POST.'
    });
  }

  try {
    const { name, email, phone, company, subject, message, inquiryType } = req.body;

    // Validate required fields
    const errors = [];

    if (!name || name.trim().length < 2) {
      errors.push('Name is required and must be at least 2 characters long.');
    }

    if (!email || !isValidEmail(email)) {
      errors.push('A valid email address is required.');
    }

    if (phone && !isValidPhone(phone)) {
      errors.push('Please provide a valid UAE phone number (e.g., +971 50 123 4567).');
    }

    if (!message || message.trim().length < 10) {
      errors.push('Message is required and must be at least 10 characters long.');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please correct the following errors:',
        errors: errors
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone || ''),
      company: sanitizeInput(company || ''),
      subject: sanitizeInput(subject || 'General Inquiry'),
      message: sanitizeInput(message),
      inquiryType: sanitizeInput(inquiryType || 'general'),
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || 'Unknown',
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown'
    };

    // Create email content
    const emailSubject = `[Nexus TechHub] ${sanitizedData.subject} - ${sanitizedData.inquiryType}`;

    const emailContent = `
New Contact Form Submission - Nexus TechHub

Contact Information:
- Name: ${sanitizedData.name}
- Email: ${sanitizedData.email}
- Phone: ${sanitizedData.phone}
- Company: ${sanitizedData.company || 'Not provided'}

Inquiry Details:
- Type: ${sanitizedData.inquiryType}
- Subject: ${sanitizedData.subject}
- Message: ${sanitizedData.message}

Technical Information:
- Submitted: ${sanitizedData.timestamp}
- User Agent: ${sanitizedData.userAgent}
- IP Address: ${sanitizedData.ip}

---
This message was sent from the Nexus TechHub contact form.
Please respond to the customer at: ${sanitizedData.email}
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #10b981; }
        .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Contact Form Submission</h1>
        <p>Nexus TechHub - Professional Repair Parts</p>
    </div>

    <div class="content">
        <h2>Contact Information</h2>
        <div class="field"><span class="label">Name:</span> ${sanitizedData.name}</div>
        <div class="field"><span class="label">Email:</span> ${sanitizedData.email}</div>
        <div class="field"><span class="label">Phone:</span> ${sanitizedData.phone}</div>
        <div class="field"><span class="label">Company:</span> ${sanitizedData.company || 'Not provided'}</div>

        <h2>Inquiry Details</h2>
        <div class="field"><span class="label">Type:</span> ${sanitizedData.inquiryType}</div>
        <div class="field"><span class="label">Subject:</span> ${sanitizedData.subject}</div>
        <div class="field"><span class="label">Message:</span><br>${sanitizedData.message.replace(/\n/g, '<br>')}</div>

        <h2>Technical Information</h2>
        <div class="field"><span class="label">Submitted:</span> ${sanitizedData.timestamp}</div>
        <div class="field"><span class="label">IP Address:</span> ${sanitizedData.ip}</div>
    </div>

    <div class="footer">
        <p>This message was sent from the Nexus TechHub contact form.</p>
        <p>Please respond to the customer at: <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
    </div>
</body>
</html>
    `.trim();

    // Send email notification
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@nexustechhub.com',
      to: process.env.EMAIL_TO || 'info@nexustechhub.com',
      subject: emailSubject,
      text: emailContent,
      html: htmlContent,
      replyTo: sanitizedData.email
    };

    const emailResult = await transporter.sendMail(mailOptions);

    // Log successful submission (in production, you might want to save to database)
    console.log('✅ Contact form submission successful:', {
      messageId: emailResult.messageId,
      name: sanitizedData.name,
      email: sanitizedData.email,
      inquiryType: sanitizedData.inquiryType,
      timestamp: sanitizedData.timestamp
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
      data: {
        messageId: emailResult.messageId,
        timestamp: sanitizedData.timestamp
      }
    });

  } catch (error) {
    console.error('❌ Contact form submission error:', error);

    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact us directly at +971 58 553 1029.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Export configuration for API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
