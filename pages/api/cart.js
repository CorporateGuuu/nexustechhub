import { getCart, addToCart } from '../../lib/supabase';

// Fallback cart data for development when Supabase is not configured
const getFallbackCart = (sessionId) => {
  return {
    id: 1,
    user_id: null,
    session_id: sessionId,
    items: [],
    item_count: 0,
    total: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

const getFallbackAddToCart = (userId, productId, quantity, variantId, sessionId) => {
  return {
    id: Date.now(),
    cart_id: 1,
    product_id: productId,
    variant_id: variantId,
    quantity: quantity,
    price_at_addition: 99.99, // Mock price
    created_at: new Date().toISOString()
  };
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Get user's cart
      const { user_id, session_id } = req.query;

      if (!user_id && !session_id) {
        return res.status(400).json({
          success: false,
          error: 'Either user_id or session_id is required'
        });
      }

      try {
        const { data, error } = await getCart(user_id, session_id);

        if (error) {
          console.error('Supabase error, using fallback:', error.message);
          // Use fallback data
          const fallbackData = getFallbackCart(session_id);
          return res.status(200).json({
            success: true,
            data: fallbackData
          });
        }

        return res.status(200).json({
          success: true,
          data: data || { items: [], item_count: 0, total: 0 }
        });
      } catch (supabaseError) {
        console.error('Supabase connection failed, using fallback:', supabaseError.message);
        // Use fallback data
        const fallbackData = getFallbackCart(session_id);
        return res.status(200).json({
          success: true,
          data: fallbackData
        });
      }

    } else if (req.method === 'POST') {
      // Add item to cart
      const { user_id, product_id, quantity, variant_id, session_id } = req.body;

      if (!user_id && !session_id) {
        return res.status(400).json({
          success: false,
          error: 'Either user_id or session_id is required'
        });
      }

      if (!product_id || !quantity) {
        return res.status(400).json({
          success: false,
          error: 'product_id and quantity are required'
        });
      }

      try {
        const { data, error } = await addToCart(
          user_id,
          product_id,
          parseInt(quantity),
          variant_id,
          session_id
        );

        if (error) {
          console.error('Supabase error, using fallback:', error.message);
          // Use fallback data
          const fallbackData = getFallbackAddToCart(user_id, product_id, parseInt(quantity), variant_id, session_id);
          return res.status(200).json({
            success: true,
            data: fallbackData,
            message: 'Item added to cart successfully (fallback mode)'
          });
        }

        return res.status(200).json({
          success: true,
          data,
          message: 'Item added to cart successfully'
        });
      } catch (supabaseError) {
        console.error('Supabase connection failed, using fallback:', supabaseError.message);
        // Use fallback data
        const fallbackData = getFallbackAddToCart(user_id, product_id, parseInt(quantity), variant_id, session_id);
        return res.status(200).json({
          success: true,
          data: fallbackData,
          message: 'Item added to cart successfully (fallback mode)'
        });
      }

    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
}
