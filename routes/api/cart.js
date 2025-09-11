const express = require('express');
const router = express.Router();
const { supabase } = require('../../lib/db');
const { isAuthenticated } = require('../../middleware/auth');

// Helper function to get or create cart ID
async function getOrCreateCartId(userId, session) {
  if (userId) {
    // Try to get existing cart for user
    let { data: cart, error } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (!cart) {
      // Create new cart for user
      const { data: newCart, error: insertError } = await supabase
        .from('carts')
        .insert({ user_id: userId })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }
      return newCart.id;
    }
    return cart.id;
  } else {
    // Guest user: use session cart ID or create new
    if (session.cartId) {
      return session.cartId;
    } else {
      const { data: newCart, error } = await supabase
        .from('carts')
        .insert({ user_id: null })
        .select()
        .single();

      if (error) {
        throw error;
      }
      session.cartId = newCart.id;
      return newCart.id;
    }
  }
}

// Get cart items
router.get('/', async (req, res) => {
  try {
    const cartId = await getOrCreateCartId(req.session.userId, req.session);

    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        product_id,
        products (
          name,
          slug,
          price,
          discount_percentage,
          image_url
        )
      `)
      .eq('cart_id', cartId);

    if (error) {
      throw error;
    }

    let subtotal = 0;
    const items = cartItems.map(item => {
      const price = parseFloat(item.products.price);
      const discount = parseFloat(item.products.discount_percentage || 0);
      const discountedPrice = price * (1 - discount / 100);
      const itemTotal = discountedPrice * item.quantity;
      subtotal += itemTotal;

      return {
        id: item.id,
        quantity: item.quantity,
        product_id: item.product_id,
        name: item.products.name,
        slug: item.products.slug,
        price: price,
        discount_percentage: discount,
        discounted_price: parseFloat(discountedPrice.toFixed(2)),
        item_total: parseFloat(itemTotal.toFixed(2)),
        image_url: item.products.image_url
      };
    });

    res.json({
      success: true,
      cart_id: cartId,
      items,
      item_count: items.length,
      subtotal: parseFloat(subtotal.toFixed(2))
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cart'
    });
  }
});

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    // Check if product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, price')
      .eq('id', product_id)
      .single();

    if (productError) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const cartId = await getOrCreateCartId(req.session.userId, req.session);

    // Check if item already exists in cart
    const { data: existingItems, error: existingError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cartId)
      .eq('product_id', product_id);

    if (existingError) {
      throw existingError;
    }

    if (existingItems.length > 0) {
      // Update quantity of existing item
      const existingItem = existingItems[0];
      const newQuantity = existingItem.quantity + parseInt(quantity);

      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id);

      if (updateError) {
        throw updateError;
      }
    } else {
      // Add new item to cart
      const { error: insertError } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cartId,
          product_id,
          quantity
        });

      if (insertError) {
        throw insertError;
      }
    }

    res.json({
      success: true,
      message: 'Item added to cart'
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart'
    });
  }
});

// Update cart item quantity
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cartId = await getOrCreateCartId(req.session.userId, req.session);

    // Update cart item
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', id)
      .eq('cart_id', cartId)
      .select();

    if (error || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    res.json({
      success: true,
      message: 'Cart item updated'
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating cart item'
    });
  }
});

// Remove item from cart
router.delete('/remove/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const cartId = await getOrCreateCartId(req.session.userId, req.session);

    // Remove cart item
    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', id)
      .eq('cart_id', cartId)
      .select();

    if (error || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing cart item'
    });
  }
});

// Clear cart
router.delete('/clear', async (req, res) => {
  try {
    const cartId = await getOrCreateCartId(req.session.userId, req.session);

    // Clear cart items
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing cart'
    });
  }
});

module.exports = router;
