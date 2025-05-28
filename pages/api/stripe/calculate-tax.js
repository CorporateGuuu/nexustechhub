// Stripe Tax API calculation endpoint for UAE VAT - Nexus TechHub
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// UAE VAT configuration
const UAE_TAX_CONFIG = {
  country: 'AE',
  vatRate: 0.05, // 5% VAT
  currency: 'aed',
  defaultTaxCode: 'txcd_99999999', // General - Tangible Goods
  serviceTaxCode: 'txcd_20030000', // General - Services
  shippingTaxCode: 'txcd_92010001', // Shipping
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, customerLocation, shippingCost = 0, currency = 'aed' } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array is required' });
    }

    // Prepare line items for Stripe Tax calculation
    const lineItems = items.map((item, index) => ({
      amount: item.amount, // Amount in fils (smallest currency unit)
      reference: item.reference || `item-${index}`,
      tax_code: item.tax_code || UAE_TAX_CONFIG.defaultTaxCode,
      quantity: item.quantity || 1,
    }));

    // Add shipping as a line item if applicable
    if (shippingCost > 0) {
      lineItems.push({
        amount: shippingCost,
        reference: 'shipping',
        tax_code: UAE_TAX_CONFIG.shippingTaxCode,
        quantity: 1,
      });
    }

    // Prepare customer address for tax calculation
    const customerAddress = {
      country: customerLocation.country || UAE_TAX_CONFIG.country,
      state: customerLocation.state || customerLocation.emirate,
      postal_code: customerLocation.postal_code || customerLocation.postalCode,
      city: customerLocation.city,
      line1: customerLocation.line1 || customerLocation.address,
    };

    // Create tax calculation using Stripe Tax API
    const taxCalculation = await stripe.tax.calculations.create({
      currency: currency.toLowerCase(),
      line_items: lineItems,
      customer_details: {
        address: customerAddress,
        address_source: 'billing',
      },
      expand: ['line_items'],
    });

    // Calculate totals
    const subtotalAmount = lineItems.reduce((sum, item) => {
      return sum + (item.amount * item.quantity);
    }, 0) - (shippingCost || 0);

    const totalTaxAmount = taxCalculation.tax_amount_exclusive;
    const totalAmount = taxCalculation.amount_total;

    // Format response
    const response = {
      calculationId: taxCalculation.id,
      subtotal: subtotalAmount / 100, // Convert from fils to AED
      shippingCost: (shippingCost || 0) / 100,
      vatAmount: totalTaxAmount / 100,
      vatRate: UAE_TAX_CONFIG.vatRate,
      total: totalAmount / 100,
      currency: currency.toUpperCase(),
      calculationMethod: 'stripe-tax',
      taxBreakdown: taxCalculation.line_items.data.map(item => ({
        reference: item.reference,
        amount: item.amount / 100,
        taxAmount: item.tax_amount / 100,
        taxRate: item.tax_breakdown?.[0]?.tax_rate?.percentage || 0,
        taxCode: item.tax_code,
      })),
      // Store calculation ID for checkout session
      stripeCalculationId: taxCalculation.id,
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Stripe Tax calculation error:', error);

    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ 
        error: 'Tax calculation failed', 
        details: error.message 
      });
    }

    if (error.type === 'StripeRateLimitError') {
      return res.status(429).json({ 
        error: 'Too many requests', 
        details: 'Please try again later' 
      });
    }

    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({ 
        error: 'Invalid tax calculation request', 
        details: error.message 
      });
    }

    if (error.type === 'StripeAPIError') {
      return res.status(500).json({ 
        error: 'Stripe API error', 
        details: 'Tax service temporarily unavailable' 
      });
    }

    if (error.type === 'StripeConnectionError') {
      return res.status(503).json({ 
        error: 'Connection error', 
        details: 'Unable to connect to tax service' 
      });
    }

    // Fallback to manual calculation for UAE
    console.log('Falling back to manual UAE VAT calculation');
    
    const subtotalAmount = items.reduce((sum, item) => {
      return sum + (item.amount * item.quantity);
    }, 0);

    const manualVatAmount = Math.round((subtotalAmount + (shippingCost || 0)) * UAE_TAX_CONFIG.vatRate);
    const manualTotal = subtotalAmount + (shippingCost || 0) + manualVatAmount;

    const fallbackResponse = {
      subtotal: subtotalAmount / 100,
      shippingCost: (shippingCost || 0) / 100,
      vatAmount: manualVatAmount / 100,
      vatRate: UAE_TAX_CONFIG.vatRate,
      total: manualTotal / 100,
      currency: currency.toUpperCase(),
      calculationMethod: 'manual',
      fallbackReason: error.message,
    };

    res.status(200).json(fallbackResponse);
  }
}

// Helper function to get tax code based on product category
export function getTaxCodeForProduct(productCategory, productName = '') {
  const category = productCategory?.toLowerCase() || '';
  const name = productName?.toLowerCase() || '';
  
  // Mobile repair parts and accessories
  if (category.includes('repair') || category.includes('parts') || 
      name.includes('screen') || name.includes('battery') || 
      name.includes('camera') || name.includes('speaker') ||
      name.includes('charger') || name.includes('case')) {
    return UAE_TAX_CONFIG.defaultTaxCode; // Tangible goods
  }
  
  // Repair services
  if (category.includes('service') || name.includes('repair service') ||
      name.includes('installation') || name.includes('diagnostic')) {
    return UAE_TAX_CONFIG.serviceTaxCode; // Services
  }
  
  // Default to tangible goods for mobile parts
  return UAE_TAX_CONFIG.defaultTaxCode;
}
