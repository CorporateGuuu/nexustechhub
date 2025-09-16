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
    const { firstName, lastName, email, password, confirmPassword, phone, agreeToTerms } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    if (!agreeToTerms) {
      return res.status(400).json({ message: 'You must agree to the terms and conditions' });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        }
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      return res.status(400).json({ message: authError.message });
    }

    // Create customer record
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .insert([
        {
          id: authData.user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (customerError) {
      console.error('Customer creation error:', customerError);
      // Clean up auth user if customer creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({ message: 'Failed to create customer profile' });
    }

    // Send welcome email
    try {
      await emailTransporter.sendMail({
        from: `"Nexus Tech Hub" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Welcome to Nexus Tech Hub!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #3b82f6; text-align: center;">Welcome to Nexus Tech Hub!</h1>
            <p>Dear ${firstName} ${lastName},</p>
            <p>Thank you for creating an account with Nexus Tech Hub! We're excited to have you join our community of professional repair technicians.</p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your Account Details:</h3>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              <p><strong>Member Since:</strong> ${new Date().toLocaleDateString()}</p>
            </div>

            <p>You can now:</p>
            <ul>
              <li>Browse our extensive catalog of premium repair parts</li>
              <li>Track your orders and order history</li>
              <li>Access exclusive deals and promotions</li>
              <li>Receive personalized recommendations</li>
              <li>Contact our expert support team</li>
            </ul>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/products"
                 style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Start Shopping
              </a>
            </div>

            <p>If you have any questions, please don't hesitate to contact us:</p>
            <p>
              Email: info@nexustechhub.com<br>
              Phone: +971 58 553 1029<br>
              WhatsApp: +971 58 553 1029
            </p>

            <p>Best regards,<br>The Nexus Tech Hub Team</p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; text-align: center;">
              This email was sent to ${email}. If you didn't create this account, please ignore this email.
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail registration if email fails
    }

    // Create session
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.status(201).json({
      message: 'Account created successfully! Please check your email for confirmation.',
      user: {
        id: customerData.id,
        firstName: customerData.first_name,
        lastName: customerData.last_name,
        email: customerData.email,
        phone: customerData.phone,
      },
      sessionId,
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
