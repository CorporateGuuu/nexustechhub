// Stripe Checkout Session API for Nexus TechHub - UAE Market
import Stripe from 'stripe';
import { calculateUAETax, STRIPE_CONFIG } from '../../../lib/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, customerInfo, currency = 'aed', country = 'AE' } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items are required' });
    }

    // Calculate totals with UAE VAT
    let subtotal = 0;
    const lineItems = items.map(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      return {
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: item.name,
            description: item.description || `${item.name} - Professional Mobile Repair Part`,
            images: item.images || [`${process.env.NEXT_PUBLIC_BASE_URL}/images/products/${item.sku?.toLowerCase()}.jpg`],
            metadata: {
              sku: item.sku || '',
              category: item.category || '',
              nexus_product_id: item.id || '',
            },
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Calculate UAE VAT
    const taxCalculation = calculateUAETax(subtotal);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'alipay'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      
      // UAE-specific configuration
      currency: currency.toLowerCase(),
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM'],
      },
      
      // Customer information
      customer_email: customerInfo.email,
      
      // Tax configuration for UAE
      automatic_tax: {
        enabled: false, // We'll handle VAT manually
      },
      
      // Add VAT as a separate line item
      line_items: [
        ...lineItems,
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'VAT (5%)',
              description: 'UAE Value Added Tax',
            },
            unit_amount: Math.round(taxCalculation.vat * 100),
          },
          quantity: 1,
        },
      ],
      
      // Metadata for order tracking
      metadata: {
        customer_phone: customerInfo.phone || '',
        customer_name: customerInfo.name || '',
        order_type: 'online_purchase',
        business_name: 'Nexus TechHub',
        location: 'Ras Al Khaimah, UAE',
        subtotal: subtotal.toString(),
        vat_amount: taxCalculation.vat.toString(),
        total_amount: taxCalculation.total.toString(),
      },
      
      // Payment intent data
      payment_intent_data: {
        metadata: {
          nexus_order: 'true',
          customer_phone: customerInfo.phone || '',
          shipping_emirate: customerInfo.emirate || '',
        },
      },
      
      // Shipping options for UAE
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0, // Free shipping within UAE
              currency: currency.toLowerCase(),
            },
            display_name: 'Free Shipping (UAE)',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 2500, // 25 AED for express shipping
              currency: currency.toLowerCase(),
            },
            display_name: 'Express Shipping (UAE)',
            delivery_estimate: {
              minimum: {
                unit: 'hour',
                value: 4,
              },
              maximum: {
                unit: 'hour',
                value: 24,
              },
            },
          },
        },
      ],
      
      // Locale for UAE market
      locale: 'en',
      
      // Phone number collection
      phone_number_collection: {
        enabled: true,
      },
    });

    // Log successful session creation
    console.log('Stripe session created:', {
      sessionId: session.id,
      amount: taxCalculation.total,
      currency: currency,
      items: items.length,
      customer: customerInfo.email,
    });

    res.status(200).json({
      sessionId: session.id,
      url: session.url,
      subtotal: taxCalculation.subtotal,
      vat: taxCalculation.vat,
      total: taxCalculation.total,
      vatRate: taxCalculation.vatRate,
    });

  } catch (error) {
    console.error('Stripe session creation error:', error);
    
    res.status(500).json({
      error: 'Failed to create checkout session',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
}
