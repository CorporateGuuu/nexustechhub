// Nexus TechHub Quote Request API
import nodemailer from 'nodemailer';

// Email configuration (same as contact form)
const createTransporter = () => {
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    return {
      sendMail: async (mailOptions) => {
        console.log('📧 Quote Request Email would be sent in production:');
        console.log('To:', mailOptions.to);
        console.log('Subject:', mailOptions.subject);
        console.log('Content:', mailOptions.text);
        return { messageId: 'quote-dev-test-' + Date.now() };
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
  const phoneRegex = /^(\+971|971|05)[0-9]{8,9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

// Sanitize input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 1000);
};

// Calculate bulk pricing
const calculateBulkPricing = (basePrice, quantity) => {
  let unitPrice = basePrice;
  let discount = 0;

  if (quantity >= 10) {
    discount = 15; // 15% discount for 10+
    unitPrice = basePrice * 0.85;
  } else if (quantity >= 5) {
    discount = 10; // 10% discount for 5-9
    unitPrice = basePrice * 0.90;
  } else if (quantity >= 2) {
    discount = 5; // 5% discount for 2-4
    unitPrice = basePrice * 0.95;
  }

  return {
    quantity,
    unitPrice: Math.round(unitPrice * 100) / 100,
    totalPrice: Math.round(unitPrice * quantity * 100) / 100,
    discount,
    savings: Math.round((basePrice - unitPrice) * quantity * 100) / 100
  };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Please use POST.' 
    });
  }

  try {
    const { 
      name, 
      email, 
      phone, 
      company, 
      products, 
      specialRequirements, 
      urgency,
      businessType 
    } = req.body;

    // Validate required fields
    const errors = [];

    if (!name || name.trim().length < 2) {
      errors.push('Name is required and must be at least 2 characters long.');
    }

    if (!email || !isValidEmail(email)) {
      errors.push('A valid email address is required.');
    }

    if (!phone || !isValidPhone(phone)) {
      errors.push('A valid UAE phone number is required (e.g., +971 50 123 4567).');
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      errors.push('At least one product must be selected for quote request.');
    }

    // Validate each product
    if (products && Array.isArray(products)) {
      products.forEach((product, index) => {
        if (!product.name || !product.sku) {
          errors.push(`Product ${index + 1}: Name and SKU are required.`);
        }
        if (!product.quantity || product.quantity < 1) {
          errors.push(`Product ${index + 1}: Quantity must be at least 1.`);
        }
        if (!product.basePrice || product.basePrice <= 0) {
          errors.push(`Product ${index + 1}: Valid base price is required.`);
        }
      });
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
      phone: sanitizeInput(phone),
      company: sanitizeInput(company || ''),
      specialRequirements: sanitizeInput(specialRequirements || ''),
      urgency: sanitizeInput(urgency || 'standard'),
      businessType: sanitizeInput(businessType || 'retail'),
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || 'Unknown',
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown'
    };

    // Process products and calculate pricing
    const processedProducts = products.map(product => {
      const pricing = calculateBulkPricing(product.basePrice, product.quantity);
      return {
        name: sanitizeInput(product.name),
        sku: sanitizeInput(product.sku),
        category: sanitizeInput(product.category || ''),
        ...pricing
      };
    });

    // Calculate totals
    const totals = processedProducts.reduce((acc, product) => {
      acc.totalItems += product.quantity;
      acc.subtotal += product.totalPrice;
      acc.totalSavings += product.savings;
      return acc;
    }, { totalItems: 0, subtotal: 0, totalSavings: 0 });

    // Generate quote ID
    const quoteId = `NTH-Q-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Create email content
    const emailSubject = `[Nexus TechHub] Quote Request #${quoteId} - ${sanitizedData.name}`;
    
    const productList = processedProducts.map(product => `
- ${product.name} (${product.sku})
  Quantity: ${product.quantity}
  Unit Price: AED ${product.unitPrice} ${product.discount > 0 ? `(${product.discount}% discount)` : ''}
  Total: AED ${product.totalPrice}
  ${product.savings > 0 ? `Savings: AED ${product.savings}` : ''}
    `).join('\n');

    const emailContent = `
New Quote Request - Nexus TechHub
Quote ID: ${quoteId}

Customer Information:
- Name: ${sanitizedData.name}
- Email: ${sanitizedData.email}
- Phone: ${sanitizedData.phone}
- Company: ${sanitizedData.company || 'Not provided'}
- Business Type: ${sanitizedData.businessType}

Quote Details:
${productList}

Summary:
- Total Items: ${totals.totalItems}
- Subtotal: AED ${totals.subtotal.toFixed(2)}
- Total Savings: AED ${totals.totalSavings.toFixed(2)}
- Urgency: ${sanitizedData.urgency}

Special Requirements:
${sanitizedData.specialRequirements || 'None specified'}

Technical Information:
- Submitted: ${sanitizedData.timestamp}
- User Agent: ${sanitizedData.userAgent}
- IP Address: ${sanitizedData.ip}

---
This quote request was submitted through the Nexus TechHub website.
Please respond to the customer at: ${sanitizedData.email}
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Quote Request #${quoteId}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .quote-id { background: #f0f9ff; padding: 10px; border-left: 4px solid #10b981; margin: 20px 0; }
        .product { background: #f9fafb; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .product-name { font-weight: bold; color: #10b981; }
        .pricing { display: flex; justify-content: space-between; margin: 5px 0; }
        .summary { background: #ecfdf5; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .field { margin-bottom: 10px; }
        .label { font-weight: bold; color: #10b981; }
        .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Quote Request</h1>
        <p>Nexus TechHub - Professional Repair Parts</p>
    </div>
    
    <div class="content">
        <div class="quote-id">
            <strong>Quote ID: ${quoteId}</strong>
        </div>
        
        <h2>Customer Information</h2>
        <div class="field"><span class="label">Name:</span> ${sanitizedData.name}</div>
        <div class="field"><span class="label">Email:</span> ${sanitizedData.email}</div>
        <div class="field"><span class="label">Phone:</span> ${sanitizedData.phone}</div>
        <div class="field"><span class="label">Company:</span> ${sanitizedData.company || 'Not provided'}</div>
        <div class="field"><span class="label">Business Type:</span> ${sanitizedData.businessType}</div>
        
        <h2>Requested Products</h2>
        ${processedProducts.map(product => `
        <div class="product">
            <div class="product-name">${product.name} (${product.sku})</div>
            <div class="pricing">
                <span>Quantity: ${product.quantity}</span>
                <span>Unit Price: AED ${product.unitPrice}</span>
            </div>
            ${product.discount > 0 ? `<div class="pricing"><span>Discount: ${product.discount}%</span><span>Savings: AED ${product.savings}</span></div>` : ''}
            <div class="pricing"><strong>Total: AED ${product.totalPrice}</strong></div>
        </div>
        `).join('')}
        
        <div class="summary">
            <h3>Quote Summary</h3>
            <div class="pricing"><span>Total Items:</span><span>${totals.totalItems}</span></div>
            <div class="pricing"><span>Subtotal:</span><span>AED ${totals.subtotal.toFixed(2)}</span></div>
            <div class="pricing"><span>Total Savings:</span><span>AED ${totals.totalSavings.toFixed(2)}</span></div>
            <div class="pricing"><span>Urgency:</span><span>${sanitizedData.urgency}</span></div>
        </div>
        
        <h2>Special Requirements</h2>
        <p>${sanitizedData.specialRequirements || 'None specified'}</p>
        
        <h2>Technical Information</h2>
        <div class="field"><span class="label">Submitted:</span> ${sanitizedData.timestamp}</div>
        <div class="field"><span class="label">IP Address:</span> ${sanitizedData.ip}</div>
    </div>
    
    <div class="footer">
        <p>This quote request was submitted through the Nexus TechHub website.</p>
        <p>Please respond to the customer at: <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
    </div>
</body>
</html>
    `.trim();

    // Send email notification
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@nexustechhub.com',
      to: process.env.EMAIL_TO || 'quotes@nexustechhub.com',
      subject: emailSubject,
      text: emailContent,
      html: htmlContent,
      replyTo: sanitizedData.email
    };

    const emailResult = await transporter.sendMail(mailOptions);

    // Log successful submission
    console.log('✅ Quote request submission successful:', {
      quoteId,
      messageId: emailResult.messageId,
      name: sanitizedData.name,
      email: sanitizedData.email,
      totalItems: totals.totalItems,
      subtotal: totals.subtotal,
      timestamp: sanitizedData.timestamp
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully! We will send you a detailed quote within 24 hours.',
      data: {
        quoteId,
        messageId: emailResult.messageId,
        timestamp: sanitizedData.timestamp,
        products: processedProducts,
        totals
      }
    });

  } catch (error) {
    console.error('❌ Quote request submission error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error processing your quote request. Please try again or contact us directly at +971 58 553 1029.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Export configuration for API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
}
