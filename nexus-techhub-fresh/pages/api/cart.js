import { getCart, addToCart } from '../../../lib/supabase';

// In-memory storage for fallback mode (development only)
const fallbackCarts = new Map();

const getFallbackCart = (sessionId) => {
  if (!fallbackCarts.has(sessionId)) {
    fallbackCarts.set(sessionId, {
      id: 1,
      user_id: null,
      session_id: sessionId,
      items: [],
      item_count: 0,
      total: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  return fallbackCarts.get(sessionId);
};

const getFallbackAddToCart = (userId, productId, quantity, variantId, sessionId) => {
  const cart = getFallbackCart(sessionId);

  // Mock product data - in real app this would come from database
  const mockProducts = {
    'ip14-battery': {
      id: 'ip14-battery',
      name: 'iPhone 14 Battery Replacement',
      price: 79.99,
      image: '/images/products/iphone-14-battery.jpg',
      sku: 'NTH-IP14-BAT-001'
    },
    'ip15-pro-max-screen': {
      id: 'ip15-pro-max-screen',
      name: 'iPhone 15 Pro Max Super Retina XDR OLED Display',
      price: 399.99,
      image: '/images/products/iphone-15-pro-max-screen.svg',
      sku: 'NTH-IP15PM-SCREEN-001'
    }
  };

  const product = mockProducts[productId] || {
    id: productId,
    name: `Product ${productId}`,
    price: 99.99,
    image: '/images/products/placeholder.svg',
    sku: productId
  };

  const cartItem = {
    cart_item_id: Date.now(),
    product_id: productId,
    name: product.name,
    price: product.price,
    quantity: quantity,
    image: product.image,
    sku: product.sku,
    total: product.price * quantity,
    created_at: new Date().toISOString()
  };

  // Add item to cart
  cart.items.push(cartItem);
  cart.item_count = cart.items.length;
  cart.total = cart.items.reduce((sum, item) => sum + item.total, 0);
  cart.updated_at = new Date().toISOString();

  return cartItem;
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
