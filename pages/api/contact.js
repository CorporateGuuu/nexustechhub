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
    const { name, email, phone, subject, message, inquiryType } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    // Store contact inquiry in database
    const { data: contactData, error: contactError } = await supabase
      .from('contact_inquiries')
      .insert([
        {
          name: name,
          email: email,
          phone: phone || null,
          subject: subject || 'General Inquiry',
          message: message,
          inquiry_type: inquiryType || 'general',
          status: 'new',
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (contactError) {
      console.error('Contact inquiry creation error:', contactError);
      // Don't fail if database insert fails, still send email
    }

    // Send email notification to admin
    try {
      await emailTransporter.sendMail({
        from: `"Nexus Tech Hub Contact" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: `New Contact Inquiry: ${subject || 'General Inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #3b82f6; text-align: center;">New Contact Inquiry</h1>
            <p>You have received a new contact inquiry from your website.</p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Contact Details:</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
              <p><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</p>
              <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}"
                 style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Reply to Customer
              </a>
            </div>

            <p>Please respond to this inquiry as soon as possible to provide excellent customer service.</p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; text-align: center;">
              This is an automated notification from Nexus Tech Hub contact form.
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Admin email sending error:', emailError);
    }

    // Send confirmation email to customer
    try {
      await emailTransporter.sendMail({
        from: `"Nexus Tech Hub" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Thank you for contacting Nexus Tech Hub',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #3b82f6; text-align: center;">Thank You for Contacting Us!</h1>
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to Nexus Tech Hub! We have received your inquiry and appreciate you taking the time to contact us.</p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your Inquiry Details:</h3>
              <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
              <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Reference ID:</strong> ${contactData?.id || 'N/A'}</p>
            </div>

            <p>Our team will review your message and get back to you within 24 hours. For urgent matters, you can also reach us directly:</p>

            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Contact Information:</h3>
              <p><strong>Email:</strong> info@nexustechhub.com</p>
              <p><strong>Phone:</strong> +971 58 553 1029</p>
              <p><strong>WhatsApp:</strong> +971 58 553 1029</p>
              <p><strong>Address:</strong> Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE</p>
            </div>

            <p>In the meantime, feel free to browse our extensive catalog of premium repair parts:</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/products"
                 style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Browse Our Products
              </a>
            </div>

            <p>We look forward to assisting you with your repair needs!</p>

            <p>Best regards,<br>The Nexus Tech Hub Team</p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; text-align: center;">
              This email was sent to ${email} in response to your inquiry.
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Customer confirmation email error:', emailError);
    }

    res.status(200).json({
      message: 'Thank you for your inquiry! We have received your message and will get back to you within 24 hours.',
      inquiryId: contactData?.id,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
}
