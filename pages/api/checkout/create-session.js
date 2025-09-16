import Stripe from 'stripe';
import { getStripe } from '../../../lib/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      cartId,
      billingInfo,
      shippingInfo,
      paymentMethod,
      sessionId
    } = req.body;

    // Validate required fields
    if (!cartId || !billingInfo || !shippingInfo) {
      return res.status(400).json({
        error: 'Missing required fields: cartId, billingInfo, shippingInfo'
      });
    }

    // Fetch cart details from your database/API
    // For now, we'll create a mock cart based on the cartId
    const mockCartItems = [
      {
        id: 'ip15-pro-max-screen',
        name: 'iPhone 15 Pro Max Super Retina XDR OLED Display',
        price: 399.99,
        quantity: 1,
        image: '/images/products/iphone-15-pro-max-screen.svg'
      }
    ];

    // Calculate totals
    const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15; // Free shipping over AED 100
    const tax = subtotal * 0.05; // 5% VAT
    const total = subtotal + shipping + tax;

    // Create line items for Stripe
    const lineItems = mockCartItems.map(item => ({
      price_data: {
        currency: 'aed',
        product_data: {
          name: item.name,
          images: [item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${item.image}`],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if applicable
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'aed',
          product_data: {
            name: 'Shipping',
            description: 'Standard Shipping',
          },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    // Add tax as a line item
    if (tax > 0) {
      lineItems.push({
        price_data: {
          currency: 'aed',
          product_data: {
            name: 'VAT (5%)',
            description: 'Value Added Tax',
          },
          unit_amount: Math.round(tax * 100),
        },
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: billingInfo.email,

      // Billing address collection
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM'],
      },

      // Metadata for order processing
      metadata: {
        cartId: cartId.toString(),
        sessionId: sessionId || '',
        customerName: `${billingInfo.firstName} ${billingInfo.lastName}`,
        customerEmail: billingInfo.email,
        customerPhone: billingInfo.phone,
        shippingAddress: JSON.stringify(shippingInfo),
        billingAddress: JSON.stringify(billingInfo),
      },

      // Success and cancel URLs
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout?canceled=true`,

      // Automatic tax calculation (if enabled in Stripe)
      automatic_tax: {
        enabled: true,
      },

      // Phone number collection
      phone_number_collection: {
        enabled: true,
      },

      // Custom fields for UAE-specific requirements
      custom_fields: [
        {
          key: 'emirate',
          label: {
            type: 'custom',
            custom: 'Emirate',
          },
          type: 'dropdown',
          dropdown: {
            options: [
              { label: 'Abu Dhabi', value: 'abu-dhabi' },
              { label: 'Dubai', value: 'dubai' },
              { label: 'Sharjah', value: 'sharjah' },
              { label: 'Ajman', value: 'ajman' },
              { label: 'Umm Al Quwain', value: 'umm-al-quwain' },
              { label: 'Ras Al Khaimah', value: 'ras-al-khaimah' },
              { label: 'Fujairah', value: 'fujairah' },
            ],
          },
        },
      ],
    });

    // Return the checkout session URL
    res.status(200).json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('Checkout session creation error:', error);
    res.status(500).json({
      error: 'Failed to create checkout session',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
