const express = require('express');
const router = express.Router();
const { supabase } = require('../../lib/db');
const { isAuthenticated } = require('../../middleware/auth');
const { apiLimiter } = require('../../middleware/security');

// Get user's wishlist
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;

    // Get or create user's wishlist using Supabase
    let wishlistId;
    const { data: existingWishlist, error: findError } = await supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      console.error('Error finding wishlist:', findError);
      return res.status(500).json({
        success: false,
        message: 'Error fetching wishlist'
      });
    }

    if (existingWishlist) {
      wishlistId = existingWishlist.id;
    } else {
      // Create a new wishlist
      const { data: newWishlist, error: createError } = await supabase
        .from('wishlists')
        .insert({ user_id: userId })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating wishlist:', createError);
        return res.status(500).json({
          success: false,
          message: 'Error creating wishlist'
        });
      }

      wishlistId = newWishlist.id;
    }

    // Get wishlist items using Supabase
    const { data: wishlistItems, error: itemsError } = await supabase
      .from('wishlist_items')
      .select(`
        id,
        added_at,
        products (
          id,
          name,
          slug,
          price,
          discount_percentage,
          image_url,
          categories (
            name
          )
        )
      `)
      .eq('wishlist_id', wishlistId)
      .order('added_at', { ascending: false });

    if (itemsError) {
      console.error('Error fetching wishlist items:', itemsError);
      return res.status(500).json({
        success: false,
        message: 'Error fetching wishlist items'
      });
    }

    // Format items with discounted price
    const items = wishlistItems.map(item => {
      const product = item.products;
      const discountedPrice = product.price * (1 - (product.discount_percentage / 100));
      return {
        id: item.id,
        added_at: item.added_at,
        product_id: product.id,
        name: product.name,
        slug: product.slug,
        price: parseFloat(product.price),
        discount_percentage: product.discount_percentage,
        discounted_price: parseFloat(discountedPrice.toFixed(2)),
        image_url: product.image_url,
        category_name: product.categories?.name
      };
    });

    res.json({
      success: true,
      wishlist_id: wishlistId,
      items: items
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching wishlist'
    });
  }
});

// Add item to wishlist
router.post('/add', isAuthenticated, apiLimiter, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.session.userId;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    // Check if product exists using Supabase
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get or create user's wishlist using Supabase
    let wishlistId;
    const { data: existingWishlist, error: findError } = await supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      console.error('Error finding wishlist:', findError);
      return res.status(500).json({
        success: false,
        message: 'Error fetching wishlist'
      });
    }

    if (existingWishlist) {
      wishlistId = existingWishlist.id;
    } else {
      const { data: newWishlist, error: createError } = await supabase
        .from('wishlists')
        .insert({ user_id: userId })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating wishlist:', createError);
        return res.status(500).json({
          success: false,
          message: 'Error creating wishlist'
        });
      }

      wishlistId = newWishlist.id;
    }

    // Check if item already exists in wishlist using Supabase
    const { data: existingItem, error: existingError } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('wishlist_id', wishlistId)
      .eq('product_id', productId)
      .single();

    if (existingError && existingError.code !== 'PGRST116') {
      console.error('Error checking wishlist item:', existingError);
      return res.status(500).json({
        success: false,
        message: 'Error checking wishlist'
      });
    }

    if (existingItem) {
      return res.json({
        success: true,
        message: 'Item already in wishlist'
      });
    }

    // Add item to wishlist using Supabase
    const { error: insertError } = await supabase
      .from('wishlist_items')
      .insert({ wishlist_id: wishlistId, product_id: productId });

    if (insertError) {
      console.error('Error adding item to wishlist:', insertError);
      return res.status(500).json({
        success: false,
        message: 'Error adding item to wishlist'
      });
    }

    res.json({
      success: true,
      message: 'Item added to wishlist'
    });
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding item to wishlist'
    });
  }
});

// Remove item from wishlist
router.delete('/remove/:itemId', isAuthenticated, async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.session.userId;

    // Get user's wishlist using Supabase
    const { data: existingWishlist, error: findError } = await supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      console.error('Error finding wishlist:', findError);
      return res.status(500).json({
        success: false,
        message: 'Error removing item from wishlist'
      });
    }

    if (!existingWishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    const wishlistId = existingWishlist.id;

    // Remove item from wishlist using Supabase
    const { data: removedItem, error: removeError } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('id', itemId)
      .eq('wishlist_id', wishlistId)
      .select()
      .single();

    if (removeError || !removedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in wishlist'
      });
    }

    res.json({
      success: true,
      message: 'Item removed from wishlist'
    });
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing item from wishlist'
    });
  }
});

// Check if product is in wishlist
router.get('/check/:productId', isAuthenticated, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.session.userId;

    // Get user's wishlist using Supabase
    const { data: existingWishlist, error: findError } = await supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      console.error('Error finding wishlist:', findError);
      return res.status(500).json({
        success: false,
        message: 'Error checking wishlist'
      });
    }

    if (!existingWishlist) {
      return res.json({
        success: true,
        inWishlist: false
      });
    }

    const wishlistId = existingWishlist.id;

    // Check if product is in wishlist using Supabase
    const { data: wishlistItem, error: checkError } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('wishlist_id', wishlistId)
      .eq('product_id', productId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking wishlist item:', checkError);
      return res.status(500).json({
        success: false,
        message: 'Error checking wishlist'
      });
    }

    res.json({
      success: true,
      inWishlist: !!wishlistItem,
      wishlistItemId: wishlistItem ? wishlistItem.id : null
    });
  } catch (error) {
    console.error('Error checking wishlist:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking wishlist'
    });
  }
});

// Clear wishlist
router.delete('/clear', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;

    // Get user's wishlist using Supabase
    const { data: existingWishlist, error: findError } = await supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      console.error('Error finding wishlist:', findError);
      return res.status(500).json({
        success: false,
        message: 'Error clearing wishlist'
      });
    }

    if (!existingWishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    const wishlistId = existingWishlist.id;

    // Clear wishlist using Supabase
    const { error: clearError } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('wishlist_id', wishlistId);

    if (clearError) {
      console.error('Error clearing wishlist:', clearError);
      return res.status(500).json({
        success: false,
        message: 'Error clearing wishlist'
      });
    }

    res.json({
      success: true,
      message: 'Wishlist cleared'
    });
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing wishlist'
    });
  }
});

module.exports = router;
