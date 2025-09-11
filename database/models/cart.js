const { supabase } = require('../../lib/db');

const CartModel = {
  // Get cart by user ID or session ID
  async getCart(userId, sessionId) {
    let cartQuery;

    if (userId) {
      cartQuery = supabase
        .from('carts')
        .select('id, user_id, session_id, created_at, updated_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .limit(1);
    } else if (sessionId) {
      cartQuery = supabase
        .from('carts')
        .select('id, user_id, session_id, created_at, updated_at')
        .eq('session_id', sessionId)
        .order('updated_at', { ascending: false })
        .limit(1);
    } else {
      throw new Error('Either userId or sessionId must be provided');
    }

    const { data: cartData, error: cartError } = await cartQuery;

    if (cartError) {
      console.error('Error fetching cart:', cartError);
      throw cartError;
    }

    if (!cartData || cartData.length === 0) {
      return null;
    }

    const cart = cartData[0];

    // Get cart items with product details
    const { data: itemsData, error: itemsError } = await supabase
      .from('cart_items')
      .select(`
        id,
        product_id,
        variant_id,
        quantity,
        price_at_addition,
        products (
          name,
          image_url,
          price,
          discount_percentage
        ),
        product_variants (
          variant_type,
          variant_value,
          price_adjustment
        )
      `)
      .eq('cart_id', cart.id);

    if (itemsError) {
      console.error('Error fetching cart items:', itemsError);
      throw itemsError;
    }

    // Calculate totals
    let subtotal = 0;
    const items = (itemsData || []).map(item => {
      // Calculate item price with variant adjustment and discount
      let itemPrice = item.price_at_addition;
      if (item.variant_id && item.product_variants?.price_adjustment) {
        itemPrice += item.product_variants.price_adjustment;
      }

      const itemTotal = itemPrice * item.quantity;
      subtotal += itemTotal;

      return {
        id: item.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        price_at_addition: item.price_at_addition,
        product_name: item.products?.name,
        image_url: item.products?.image_url,
        current_price: item.products?.price,
        discount_percentage: item.products?.discount_percentage,
        variant_type: item.product_variants?.variant_type,
        variant_value: item.product_variants?.variant_value,
        price_adjustment: item.product_variants?.price_adjustment,
        total: itemTotal
      };
    });

    return {
      ...cart,
      items,
      subtotal,
      item_count: items.reduce((sum, item) => sum + item.quantity, 0)
    };
  },
  
  // Create a new cart
  async createCart(userId, sessionId) {
    const cartData = {
      user_id: userId || null,
      session_id: sessionId || null
    };

    const { data, error } = await supabase
      .from('carts')
      .insert(cartData)
      .select('id, user_id, session_id, created_at, updated_at')
      .single();

    if (error) {
      console.error('Error creating cart:', error);
      throw error;
    }

    return {
      ...data,
      items: [],
      subtotal: 0,
      item_count: 0
    };
  },
  
  // Get or create cart
  async getOrCreateCart(userId, sessionId) {
    const cart = await this.getCart(userId, sessionId);
    if (cart) {
      return cart;
    }
    
    return this.createCart(userId, sessionId);
  },
  
  // Add item to cart
  async addItemToCart(cartId, productId, quantity, variantId = null) {
    try {
      // Get product information
      let productQuery = supabase
        .from('products')
        .select('price')
        .eq('id', productId);

      if (variantId) {
        productQuery = supabase
          .from('products')
          .select(`
            price,
            product_variants!inner(price_adjustment)
          `)
          .eq('id', productId)
          .eq('product_variants.id', variantId);
      }

      const { data: productData, error: productError } = await productQuery.single();

      if (productError || !productData) {
        throw new Error('Product not found');
      }

      let price = productData.price;

      // Add variant price adjustment if applicable
      if (variantId && productData.product_variants?.price_adjustment) {
        price += productData.product_variants.price_adjustment;
      }

      // Check if item already exists in cart
      const { data: existingItems, error: checkError } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('cart_id', cartId)
        .eq('product_id', productId)
        .eq('variant_id', variantId);

      if (checkError) {
        console.error('Error checking existing cart item:', checkError);
        throw checkError;
      }

      if (existingItems && existingItems.length > 0) {
        // Update existing item
        const existingItem = existingItems[0];
        const newQuantity = existingItem.quantity + quantity;

        const { error: updateError } = await supabase
          .from('cart_items')
          .update({
            quantity: newQuantity,
            price_at_addition: price
          })
          .eq('id', existingItem.id);

        if (updateError) {
          console.error('Error updating cart item:', updateError);
          throw updateError;
        }
      } else {
        // Add new item
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cartId,
            product_id: productId,
            variant_id: variantId,
            quantity: quantity,
            price_at_addition: price
          });

        if (insertError) {
          console.error('Error inserting cart item:', insertError);
          throw insertError;
        }
      }

      // Update cart timestamp
      const { error: cartUpdateError } = await supabase
        .from('carts')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', cartId);

      if (cartUpdateError) {
        console.error('Error updating cart timestamp:', cartUpdateError);
        throw cartUpdateError;
      }

      // Get cart information to return updated cart
      const { data: cartInfo, error: cartInfoError } = await supabase
        .from('carts')
        .select('user_id, session_id')
        .eq('id', cartId)
        .single();

      if (cartInfoError) {
        console.error('Error getting cart info:', cartInfoError);
        throw cartInfoError;
      }

      // Get updated cart
      if (cartInfo.user_id) {
        return this.getCart(cartInfo.user_id, null);
      } else {
        return this.getCart(null, cartInfo.session_id);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },
  
  // Update cart item quantity
  async updateCartItem(cartId, itemId, quantity) {
    try {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const { error: deleteError } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId)
          .eq('cart_id', cartId);

        if (deleteError) {
          console.error('Error deleting cart item:', deleteError);
          throw deleteError;
        }
      } else {
        // Update quantity
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', itemId)
          .eq('cart_id', cartId);

        if (updateError) {
          console.error('Error updating cart item quantity:', updateError);
          throw updateError;
        }
      }

      // Update cart timestamp
      const { error: cartUpdateError } = await supabase
        .from('carts')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', cartId);

      if (cartUpdateError) {
        console.error('Error updating cart timestamp:', cartUpdateError);
        throw cartUpdateError;
      }

      // Get cart information to return
      const { data: cartData, error: cartDataError } = await supabase
        .from('carts')
        .select('user_id, session_id')
        .eq('id', cartId)
        .single();

      if (cartDataError) {
        console.error('Error fetching cart info:', cartDataError);
        throw cartDataError;
      }

      // Get updated cart
      if (cartData.user_id) {
        return this.getCart(cartData.user_id, null);
      } else {
        return this.getCart(null, cartData.session_id);
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },
  
  // Remove item from cart
  async removeCartItem(cartId, itemId) {
    return this.updateCartItem(cartId, itemId, 0);
  },

  // Clear cart
  async clearCart(cartId) {
    try {
      // Delete all items
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId);

      if (deleteError) {
        console.error('Error clearing cart items:', deleteError);
        throw deleteError;
      }

      // Update cart timestamp
      const { error: cartUpdateError } = await supabase
        .from('carts')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', cartId);

      if (cartUpdateError) {
        console.error('Error updating cart timestamp:', cartUpdateError);
        throw cartUpdateError;
      }

      // Get cart information to return
      const { data: cartData, error: cartDataError } = await supabase
        .from('carts')
        .select('user_id, session_id')
        .eq('id', cartId)
        .single();

      if (cartDataError) {
        console.error('Error fetching cart info:', cartDataError);
        throw cartDataError;
      }

      // Get updated cart
      if (cartData.user_id) {
        return this.getCart(cartData.user_id, null);
      } else {
        return this.getCart(null, cartData.session_id);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },
  
  // Transfer guest cart to user cart
  async transferCart(sessionId, userId) {
    try {
      // Get session cart
      const { data: sessionCartData, error: sessionCartError } = await supabase
        .from('carts')
        .select('id')
        .eq('session_id', sessionId)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (sessionCartError) {
        console.error('Error fetching session cart:', sessionCartError);
        throw sessionCartError;
      }

      if (!sessionCartData || sessionCartData.length === 0) {
        // No session cart, nothing to transfer
        return this.getOrCreateCart(userId, null);
      }

      const sessionCartId = sessionCartData[0].id;

      // Get user cart or create one
      const { data: userCartData, error: userCartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (userCartError) {
        console.error('Error fetching user cart:', userCartError);
        throw userCartError;
      }

      let userCartId;

      if (!userCartData || userCartData.length === 0) {
        // Create new user cart
        const { data: newCartData, error: createError } = await supabase
          .from('carts')
          .insert({ user_id: userId })
          .select('id')
          .single();

        if (createError) {
          console.error('Error creating user cart:', createError);
          throw createError;
        }

        userCartId = newCartData.id;
      } else {
        userCartId = userCartData[0].id;
      }

      // Get session cart items
      const { data: sessionItems, error: itemsError } = await supabase
        .from('cart_items')
        .select('product_id, variant_id, quantity, price_at_addition')
        .eq('cart_id', sessionCartId);

      if (itemsError) {
        console.error('Error fetching session cart items:', itemsError);
        throw itemsError;
      }

      // For each session cart item
      for (const item of sessionItems || []) {
        // Check if item already exists in user cart
        const { data: existingItems, error: checkError } = await supabase
          .from('cart_items')
          .select('id, quantity')
          .eq('cart_id', userCartId)
          .eq('product_id', item.product_id)
          .eq('variant_id', item.variant_id);

        if (checkError) {
          console.error('Error checking existing user cart item:', checkError);
          throw checkError;
        }

        if (existingItems && existingItems.length > 0) {
          // Update existing item
          const existingItem = existingItems[0];
          const newQuantity = existingItem.quantity + item.quantity;

          const { error: updateError } = await supabase
            .from('cart_items')
            .update({ quantity: newQuantity })
            .eq('id', existingItem.id);

          if (updateError) {
            console.error('Error updating user cart item:', updateError);
            throw updateError;
          }
        } else {
          // Add new item
          const { error: insertError } = await supabase
            .from('cart_items')
            .insert({
              cart_id: userCartId,
              product_id: item.product_id,
              variant_id: item.variant_id,
              quantity: item.quantity,
              price_at_addition: item.price_at_addition
            });

          if (insertError) {
            console.error('Error inserting user cart item:', insertError);
            throw insertError;
          }
        }
      }

      // Delete session cart
      const { error: deleteError } = await supabase
        .from('carts')
        .delete()
        .eq('id', sessionCartId);

      if (deleteError) {
        console.error('Error deleting session cart:', deleteError);
        throw deleteError;
      }

      // Return updated user cart
      return this.getCart(userId, null);
    } catch (error) {
      console.error('Error transferring cart:', error);
      throw error;
    }
  }
};

module.exports = CartModel;
