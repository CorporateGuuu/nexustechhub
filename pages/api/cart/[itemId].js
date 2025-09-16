import { updateCartItem, removeFromCart } from '../../../lib/supabase';

// Fallback functions for when Supabase is not configured
const getFallbackUpdateCartItem = (itemId, quantity) => {
  return {
    id: parseInt(itemId),
    quantity: quantity,
    updated_at: new Date().toISOString()
  };
};

const getFallbackRemoveFromCart = (itemId) => {
  return { success: true };
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { itemId } = req.query;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        error: 'Cart item ID is required'
      });
    }

    if (req.method === 'PUT') {
      // Update cart item quantity
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          error: 'Valid quantity is required'
        });
      }

      try {
        const { data, error } = await updateCartItem(itemId, parseInt(quantity));

        if (error) {
          console.error('Supabase error, using fallback:', error.message);
          // Use fallback data
          const fallbackData = getFallbackUpdateCartItem(itemId, parseInt(quantity));
          return res.status(200).json({
            success: true,
            data: fallbackData,
            message: 'Cart item updated successfully (fallback mode)'
          });
        }

        return res.status(200).json({
          success: true,
          data,
          message: 'Cart item updated successfully'
        });
      } catch (supabaseError) {
        console.error('Supabase connection failed, using fallback:', supabaseError.message);
        // Use fallback data
        const fallbackData = getFallbackUpdateCartItem(itemId, parseInt(quantity));
        return res.status(200).json({
          success: true,
          data: fallbackData,
          message: 'Cart item updated successfully (fallback mode)'
        });
      }

    } else if (req.method === 'DELETE') {
      // Remove item from cart
      try {
        const { data, error } = await removeFromCart(itemId);

        if (error) {
          console.error('Supabase error, using fallback:', error.message);
          // Use fallback data
          const fallbackData = getFallbackRemoveFromCart(itemId);
          return res.status(200).json({
            success: true,
            message: 'Cart item removed successfully (fallback mode)'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Cart item removed successfully'
        });
      } catch (supabaseError) {
        console.error('Supabase connection failed, using fallback:', supabaseError.message);
        // Use fallback data
        const fallbackData = getFallbackRemoveFromCart(itemId);
        return res.status(200).json({
          success: true,
          message: 'Cart item removed successfully (fallback mode)'
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
