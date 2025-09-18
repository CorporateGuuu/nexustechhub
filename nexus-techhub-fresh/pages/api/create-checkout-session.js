import { getSession } from 'next-auth/react';
import { supabase } from '../../lib/supabase';
import { stripe } from '../../lib/stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    // Get user session
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { items, successUrl, cancelUrl } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    // Validate and get product details
    const lineItems = [];

    for (const item of items) {
      // Get product from database
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', item.product_id)
        .single();

      if (error || !product) {
        return res.status(400).json({ error: `Product ${item.product_id} not found` });
      }

      // Check stock availability
      if (product.stock_quantity < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for ${product.name}. Available: ${product.stock_quantity}`
        });
      }

      // Calculate price (considering discounts)
      let unitPrice = product.price;
      if (product.discount_percentage > 0) {
        unitPrice = product.price * (1 - product.discount_percentage / 100);
      }

      // Convert to cents for Stripe
      const unitAmount = Math.round(unitPrice * 100);

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.sku,
            images: product.image_url ? [product.image_url] : [],
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      });
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: session.user.email,
      metadata: {
        user_id: session.user.id,
        items: JSON.stringify(items),
      },
      success_url: successUrl || `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXTAUTH_URL}/checkout/cancelled`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
      automatic_tax: {
        enabled: true,
      },
    });

    res.status(200).json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
