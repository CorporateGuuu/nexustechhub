// SendGrid Email API Endpoint for Nexus TechHub
// Handles email sending requests

import sendGridService from '../../../lib/sendgrid';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are supported'
    });
  }

  try {
    const { type, data } = req.body;

    // Validate request
    if (!type || !data) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Both type and data are required'
      });
    }

    let result;

    // Handle different email types
    switch (type) {
      case 'order_confirmation':
        // Validate order confirmation data
        const requiredOrderFields = ['customerEmail', 'customerName', 'orderId', 'amount', 'items'];
        const missingOrderFields = requiredOrderFields.filter(field => !data[field]);
        
        if (missingOrderFields.length > 0) {
          return res.status(400).json({
            error: 'Missing order data',
            missingFields: missingOrderFields
          });
        }

        result = await sendGridService.sendOrderConfirmation(data);
        break;

      case 'quote_request':
        // Validate quote request data
        const requiredQuoteFields = ['customerEmail', 'customerName', 'device', 'partsNeeded'];
        const missingQuoteFields = requiredQuoteFields.filter(field => !data[field]);
        
        if (missingQuoteFields.length > 0) {
          return res.status(400).json({
            error: 'Missing quote data',
            missingFields: missingQuoteFields
          });
        }

        result = await sendGridService.sendQuoteRequest(data);
        break;

      case 'contact_form':
        // Validate contact form data
        const requiredContactFields = ['name', 'email', 'message'];
        const missingContactFields = requiredContactFields.filter(field => !data[field]);
        
        if (missingContactFields.length > 0) {
          return res.status(400).json({
            error: 'Missing contact data',
            missingFields: missingContactFields
          });
        }

        result = await sendGridService.sendContactForm({
          ...data,
          submittedAt: new Date().toISOString()
        });
        break;

      case 'custom':
        // Validate custom email data
        if (!data.to || !data.subject || !data.html) {
          return res.status(400).json({
            error: 'Missing custom email data',
            required: ['to', 'subject', 'html']
          });
        }

        result = await sendGridService.sendCustomEmail(
          data.to,
          data.subject,
          data.html,
          data.text
        );
        break;

      case 'test':
        // Test configuration
        result = await sendGridService.testConfiguration();
        break;

      default:
        return res.status(400).json({
          error: 'Invalid email type',
          supportedTypes: ['order_confirmation', 'quote_request', 'contact_form', 'custom', 'test']
        });
    }

    // Return result
    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        data: result
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send email',
        details: result.error
      });
    }

  } catch (error) {
    console.error('SendGrid API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
}
