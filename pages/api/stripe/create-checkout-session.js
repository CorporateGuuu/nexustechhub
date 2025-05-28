// Enhanced Stripe Checkout Session API for UAE Market - Nexus TechHub
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// UAE market configuration
const UAE_CONFIG = {
  currency: 'aed',
  country: 'AE',
  vatRate: 0.05,
  freeShippingThreshold: 200,
  businessInfo: {
    name: 'Nexus TechHub',
    address: 'FAMC3062, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates',
    phone: '+971 58 553 1029',
    email: 'info@nexustechhub.ae'
  }
};

// Rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

function checkRateLimit(req) {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  // Clean old entries
  for (const [ip, requests] of rateLimitMap.entries()) {
    rateLimitMap.set(ip, requests.filter(time => time > windowStart));
    if (rateLimitMap.get(ip).length === 0) {
      rateLimitMap.delete(ip);
    }
  }
  
  // Check current IP
  const requests = rateLimitMap.get(clientIP) || [];
  if (requests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  // Add current request
  requests.push(now);
  rateLimitMap.set(clientIP, requests);
  return true;
}

// Calculate UAE taxes and shipping
function calculateUAETotals(items, shippingOption = null) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Determine shipping cost
  let shippingCost = 0;
  if (shippingOption) {
    if (subtotal >= UAE_CONFIG.freeShippingThreshold && shippingOption.id === 'standard') {
      shippingCost = 0;
    } else {
      shippingCost = shippingOption.price || 0;
    }
  }
  
  // Calculate VAT (5% in UAE)
  const vatAmount = (subtotal + shippingCost) * UAE_CONFIG.vatRate;
  const total = subtotal + shippingCost + vatAmount;
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    shippingCost: Math.round(shippingCost * 100) / 100,
    vatAmount: Math.round(vatAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
    freeShipping: subtotal >= UAE_CONFIG.freeShippingThreshold
  };
}

// Create line items for Stripe
function createLineItems(items, totals) {
  const lineItems = items.map(item => ({
    price_data: {
      currency: UAE_CONFIG.currency,
      product_data: {
        name: item.name,
        description: item.description || `${item.name} - Professional mobile repair part`,
        images: item.images || [],
        metadata: {
          sku: item.sku || '',
          category: item.category || 'mobile-parts',
          brand: item.brand || 'nexus-techhub'
        }
      },
      unit_amount: Math.round(item.price * 100), // Convert to fils
    },
    quantity: item.quantity,
  }));

  // Add shipping as line item if applicable
  if (totals.shippingCost > 0) {
    lineItems.push({
      price_data: {
        currency: UAE_CONFIG.currency,
        product_data: {
          name: 'Shipping',
          description: 'Delivery within UAE'
        },
        unit_amount: Math.round(totals.shippingCost * 100),
      },
      quantity: 1,
    });
  }

  // Add VAT as line item
  if (totals.vatAmount > 0) {
    lineItems.push({
      price_data: {
        currency: UAE_CONFIG.currency,
        product_data: {
          name: 'VAT (5%)',
          description: 'UAE Value Added Tax'
        },
        unit_amount: Math.round(totals.vatAmount * 100),
      },
      quantity: 1,
    });
  }

  return lineItems;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check rate limiting
  if (!checkRateLimit(req)) {
    return res.status(429).json({ 
      error: 'Rate limit exceeded',
      message: 'Too many requests. Please try again later.'
    });
  }

  try {
    const { items, customerInfo = {}, options = {} } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid items',
        message: 'Items array is required and must not be empty'
      });
    }

    // Validate items structure
    for (const item of items) {
      if (!item.name || !item.price || !item.quantity) {
        return res.status(400).json({ 
          error: 'Invalid item structure',
          message: 'Each item must have name, price, and quantity'
        });
      }
    }

    // Calculate totals
    const totals = calculateUAETotals(items, options.shippingOption);
    
    // Create line items
    const lineItems = createLineItems(items, totals);

    // Prepare customer data
    const customerData = {
      email: customerInfo.email,
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: {
        line1: customerInfo.address?.line1,
        line2: customerInfo.address?.line2,
        city: customerInfo.address?.city,
        state: customerInfo.address?.state,
        postal_code: customerInfo.address?.postal_code,
        country: UAE_CONFIG.country
      }
    };

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      currency: UAE_CONFIG.currency,
      
      // Success and cancel URLs
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      
      // Customer information
      customer_email: customerData.email,
      
      // Billing and shipping address collection
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['AE']
      },
      
      // Phone number collection
      phone_number_collection: {
        enabled: true
      },
      
      // Custom fields for UAE market
      custom_fields: [
        {
          key: 'emirates_id',
          label: {
            type: 'custom',
            custom: 'Emirates ID (Optional)'
          },
          type: 'text',
          optional: true
        }
      ],
      
      // Metadata
      metadata: {
        business: 'nexus-techhub',
        country: UAE_CONFIG.country,
        currency: UAE_CONFIG.currency,
        subtotal: totals.subtotal.toString(),
        shipping_cost: totals.shippingCost.toString(),
        vat_amount: totals.vatAmount.toString(),
        total: totals.total.toString(),
        customer_id: customerInfo.id || '',
        order_source: 'website',
        market: 'uae'
      },
      
      // Automatic tax calculation (disabled as we handle UAE VAT manually)
      automatic_tax: {
        enabled: false
      },
      
      // Payment intent data
      payment_intent_data: {
        metadata: {
          business: 'nexus-techhub',
          market: 'uae',
          order_type: 'online_purchase'
        },
        description: `Nexus TechHub Order - ${items.length} item(s)`,
        statement_descriptor: 'NEXUS TECHHUB',
        statement_descriptor_suffix: 'UAE'
      },
      
      // Consent collection for UAE regulations
      consent_collection: {
        terms_of_service: 'required'
      },
      
      // Locale for UAE market
      locale: 'en',
      
      // Allow promotion codes
      allow_promotion_codes: true,
      
      // Expires after 24 hours
      expires_at: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    });

    // Log successful session creation
    console.log(`✅ Stripe checkout session created: ${session.id}`);
    console.log(`💰 Total amount: ${totals.total} AED`);
    console.log(`📧 Customer email: ${customerData.email}`);

    // Return session data
    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
      totals,
      metadata: {
        business: UAE_CONFIG.businessInfo.name,
        currency: UAE_CONFIG.currency,
        country: UAE_CONFIG.country,
        vatRate: UAE_CONFIG.vatRate,
        freeShippingThreshold: UAE_CONFIG.freeShippingThreshold
      }
    });

  } catch (error) {
    console.error('❌ Stripe checkout session creation failed:', error);

    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return res.status(400).json({
        error: 'Card error',
        message: error.message
      });
    }

    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({
        error: 'Invalid request',
        message: error.message
      });
    }

    if (error.type === 'StripeAPIError') {
      return res.status(500).json({
        error: 'Stripe API error',
        message: 'Payment service temporarily unavailable'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'Failed to create checkout session. Please try again.'
    });
  }
}
