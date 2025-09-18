import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getCart, addToCart, updateCartItem, removeFromCart } from '../lib/supabase';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Initialize cart on mount and when user changes
  useEffect(() => {
    const initializeCart = async () => {
      try {
        setLoading(true);

        // Get current user
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);

        // Get cart for user or guest session
        const userId = currentUser?.id;
        const sessionId = !currentUser ? getSessionId() : null;

        const { data, error } = await getCart(userId, sessionId);

        if (error) {
          console.error('Error loading cart:', error);
          setCart({
            id: null,
            user_id: userId,
            session_id: sessionId,
            items: [],
            item_count: 0,
            total: 0
          });
        } else {
          setCart(data);
        }
      } catch (error) {
        console.error('Error initializing cart:', error);
        setCart({
          id: null,
          user_id: null,
          session_id: getSessionId(),
          items: [],
          item_count: 0,
          total: 0
        });
      } finally {
        setLoading(false);
      }
    };

    initializeCart();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const newUser = session?.user;
      setUser(newUser);

      // Reload cart when user changes
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        initializeCart();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Generate or get session ID for guest users
  const getSessionId = () => {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  };

  // Add item to cart
  const addItem = async (productId, quantity = 1, variantId = null) => {
    try {
      const userId = user?.id;
      const sessionId = !user ? getSessionId() : null;

      const { data, error } = await addToCart(userId, productId, quantity, variantId, sessionId);

      if (error) {
        console.error('Error adding item to cart:', error);
        return { success: false, error };
      }

      // Reload cart to get updated data
      const { data: updatedCart, error: cartError } = await getCart(userId, sessionId);

      if (cartError) {
        console.error('Error reloading cart:', cartError);
      } else {
        setCart(updatedCart);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error in addItem:', error);
      return { success: false, error };
    }
  };

  // Update item quantity
  const updateItem = async (cartItemId, quantity) => {
    try {
      const { data, error } = await updateCartItem(cartItemId, quantity);

      if (error) {
        console.error('Error updating cart item:', error);
        return { success: false, error };
      }

      // Update local cart state
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.map(item =>
          item.cart_item_id === cartItemId
            ? { ...item, quantity, total: item.price * quantity }
            : item
        )
      }));

      return { success: true, data };
    } catch (error) {
      console.error('Error in updateItem:', error);
      return { success: false, error };
    }
  };

  // Remove item from cart
  const removeItem = async (cartItemId) => {
    try {
      const { error } = await removeFromCart(cartItemId);

      if (error) {
        console.error('Error removing cart item:', error);
        return { success: false, error };
      }

      // Update local cart state
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.filter(item => item.cart_item_id !== cartItemId)
      }));

      return { success: true };
    } catch (error) {
      console.error('Error in removeItem:', error);
      return { success: false, error };
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart({
      id: cart?.id,
      user_id: cart?.user_id,
      session_id: cart?.session_id,
      items: [],
      item_count: 0,
      total: 0
    });
  };

  // Get cart total
  const getTotal = () => {
    return cart?.total || 0;
  };

  // Get item count
  const getItemCount = () => {
    return cart?.item_count || 0;
  };

  // Check if item is in cart
  const isInCart = (productId, variantId = null) => {
    return cart?.items?.some(item =>
      item.product_id === productId &&
      (!variantId || item.variant_id === variantId)
    ) || false;
  };

  // Get item quantity in cart
  const getItemQuantity = (productId, variantId = null) => {
    const item = cart?.items?.find(item =>
      item.product_id === productId &&
      (!variantId || item.variant_id === variantId)
    );
    return item?.quantity || 0;
  };

  const value = {
    cart,
    loading,
    user,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    getTotal,
    getItemCount,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
