import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Email configuration
const emailTransporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Sign in user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error('Auth error:', authError);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Get customer data
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (customerError) {
      console.error('Customer fetch error:', customerError);
      return res.status(500).json({ message: 'Failed to retrieve customer data' });
    }

    // Send login notification email
    try {
      await emailTransporter.sendMail({
        from: `"Nexus Tech Hub" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'New Login to Your Nexus Tech Hub Account',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #3b82f6; text-align: center;">Account Login Notification</h1>
            <p>Dear ${customerData.first_name} ${customerData.last_name},</p>
            <p>We detected a new login to your Nexus Tech Hub account.</p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Login Details:</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>IP Address:</strong> ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}</p>
            </div>

            <p>If this was you, no further action is required. If you didn't log in to your account, please:</p>
            <ol>
              <li>Change your password immediately</li>
              <li>Contact our support team</li>
              <li>Review your account activity</li>
            </ol>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/account"
                 style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                View Account
              </a>
            </div>

            <p>For security reasons, we recommend:</p>
            <ul>
              <li>Using a strong, unique password</li>
              <li>Enabling two-factor authentication when available</li>
              <li>Regularly monitoring your account activity</li>
            </ul>

            <p>If you have any concerns, please contact us immediately:</p>
            <p>
              Email: info@nexustechhub.com<br>
              Phone: +971 58 553 1029<br>
              WhatsApp: +971 58 553 1029
            </p>

            <p>Best regards,<br>The Nexus Tech Hub Security Team</p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; text-align: center;">
              This is an automated security notification for ${email}.
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail login if email fails
    }

    // Create session
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Update last login
    await supabase
      .from('customers')
      .update({ last_login: new Date().toISOString() })
      .eq('id', customerData.id);

    res.status(200).json({
      message: 'Login successful!',
      user: {
        id: customerData.id,
        firstName: customerData.first_name,
        lastName: customerData.last_name,
        email: customerData.email,
        phone: customerData.phone,
        lastLogin: customerData.last_login,
      },
      sessionId,
      session: authData.session,
    });

  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
