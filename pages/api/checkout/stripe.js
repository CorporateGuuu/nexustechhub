import { getSession } from 'next-auth/react';
import stripe from '../../../lib/stripe';
import { supabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get user session
    const session = await getSession({ req });
    const userId = session?.user?.id;
    const { sessionId } = req.cookies;

    // Ensure we have either a user ID or a session ID
    if (!userId && !sessionId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Get cart data using Supabase
    let cartData;
    if (userId) {
      const { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (cartError && cartError.code !== 'PGRST116') {
        console.error('Error finding user cart:', cartError);
        return res.status(500).json({
          success: false,
          message: 'Error retrieving cart'
        });
      }

      cartData = cart;
    } else {
      const { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('session_id', sessionId)
        .single();

      if (cartError && cartError.code !== 'PGRST116') {
        console.error('Error finding session cart:', cartError);
        return res.status(500).json({
          success: false,
          message: 'Error retrieving cart'
        });
      }

      cartData = cart;
    }

    if (!cartData) {
      return res.status(400).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const cartId = cartData.id;

    // Get cart items with product details using Supabase
    const { data: cartItems, error: itemsError } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        products (
          id,
          name,
          price,
          discount_percentage,
          image_url,
          slug
        )
      `)
      .eq('cart_id', cartId);

    if (itemsError) {
      console.error('Error fetching cart items:', itemsError);
      return res.status(500).json({
        success: false,
        message: 'Error retrieving cart items'
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Format cart items for Stripe
    const lineItems = cartItems.map(item => {
      const product = item.products;
      const price = parseFloat(product.price);
      const discountPercentage = parseFloat(product.discount_percentage || 0);
      const discountedPrice = discountPercentage > 0
        ? price * (1 - discountPercentage / 100)
        : price;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: product.image_url ? [product.image_url] : [],
          },
          unit_amount: Math.round(discountedPrice * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      };
    });

    // Get shipping information from request body
    const {
      // shipping_address, // Uncomment if needed in the future
      success_url = `${process.env.NEXTAUTH_URL}/checkout/success`,
      cancel_url = `${process.env.NEXTAUTH_URL}/checkout/cancel`
    } = req.body;

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: success_url,
      cancel_url: cancel_url,
      metadata: {
        cart_id: cartId,
        user_id: userId || '',
        session_id: sessionId || '',
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd',
            },
            display_name: 'Express shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 2,
              },
            },
          },
        },
      ],
    });

    // Return the session ID
    return res.status(200).json({
      success: true,
      sessionId: stripeSession.id,
      url: stripeSession.url
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating checkout session'
    });
  }
}
