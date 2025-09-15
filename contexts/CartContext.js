import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { analytics } from '../components/Analytics';
import { logger } from '../components/Logger';

// Cart Context
const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  APPLY_DISCOUNT: 'APPLY_DISCOUNT',
  REMOVE_DISCOUNT: 'REMOVE_DISCOUNT',
  SET_SHIPPING: 'SET_SHIPPING',
  SET_CUSTOMER_TYPE: 'SET_CUSTOMER_TYPE'
};

// Initial cart state
const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  discount: null,
  discountAmount: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  customerType: 'retail', // 'retail', 'wholesale', 'technician'
  currency: 'AED',
  lastUpdated: null
};

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1, options = {} } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id && 
        JSON.stringify(item.options) === JSON.stringify(options)
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem = {
          id: product.id,
          sku: product.sku,
          name: product.name,
          price: getCustomerPrice(product, state.customerType),
          originalPrice: product.price,
          image: product.image,
          category: product.category,
          quantity,
          options,
          inStock: product.inStock,
          maxQuantity: product.maxQuantity || 999,
          addedAt: new Date().toISOString()
        };
        newItems = [...state.items, newItem];
      }

      return calculateTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(item => 
        !(item.id === action.payload.id && 
          JSON.stringify(item.options) === JSON.stringify(action.payload.options || {}))
      );
      return calculateTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity, options = {} } = action.payload;
      const newItems = state.items.map(item => {
        if (item.id === id && JSON.stringify(item.options) === JSON.stringify(options)) {
          return { ...item, quantity: Math.max(0, Math.min(quantity, item.maxQuantity)) };
        }
        return item;
      }).filter(item => item.quantity > 0);

      return calculateTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { ...initialState, customerType: state.customerType };
    }

    case CART_ACTIONS.LOAD_CART: {
      return calculateTotals({ ...state, ...action.payload });
    }

    case CART_ACTIONS.APPLY_DISCOUNT: {
      const discount = action.payload;
      return calculateTotals({ ...state, discount });
    }

    case CART_ACTIONS.REMOVE_DISCOUNT: {
      return calculateTotals({ ...state, discount: null });
    }

    case CART_ACTIONS.SET_SHIPPING: {
      return calculateTotals({ ...state, shipping: action.payload });
    }

    case CART_ACTIONS.SET_CUSTOMER_TYPE: {
      const newCustomerType = action.payload;
      const updatedItems = state.items.map(item => ({
        ...item,
        price: getCustomerPrice({ price: item.originalPrice }, newCustomerType)
      }));
      return calculateTotals({ ...state, items: updatedItems, customerType: newCustomerType });
    }

    default:
      return state;
  }
}

// Helper function to get customer-specific pricing
function getCustomerPrice(product, customerType) {
  const basePrice = product.price;
  
  switch (customerType) {
    case 'wholesale':
      return basePrice * 0.85; // 15% wholesale discount
    case 'technician':
      return basePrice * 0.90; // 10% technician discount
    case 'retail':
    default:
      return basePrice;
  }
}

// Helper function to calculate totals
function calculateTotals(state) {
  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate discount
  let discountAmount = 0;
  if (state.discount) {
    if (state.discount.type === 'percentage') {
      discountAmount = subtotal * (state.discount.value / 100);
    } else if (state.discount.type === 'fixed') {
      discountAmount = state.discount.value;
    }
    discountAmount = Math.min(discountAmount, subtotal);
  }

  // Calculate tax (5% VAT for UAE)
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * 0.05;

  // Calculate total
  const total = subtotal - discountAmount + state.shipping + tax;

  return {
    ...state,
    totalItems,
    subtotal,
    discountAmount,
    tax,
    total,
    lastUpdated: new Date().toISOString()
  };
}

// Cart Provider Component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('nexus-cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('nexus-cart', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  }, [state]);

  // Cart actions
  const addToCart = (product, quantity = 1, options = {}) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, options }
    });
  };

  const removeFromCart = (id, options = {}) => {
    const item = state.items.find(item => 
      item.id === id && JSON.stringify(item.options) === JSON.stringify(options)
    );
    
    if (item) {
      dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id, options } });
      
      analytics.trackPurchase('remove_from_cart', {
        item_id: id,
        item_name: item.name,
        value: item.price * item.quantity,
        currency: 'AED'
      });

      logger.info('Item removed from cart', { productId: id });
    }
  };

  const updateQuantity = (id, quantity, options = {}) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { id, quantity, options } 
    });
    
    logger.info('Cart quantity updated', { productId: id, quantity });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    analytics.trackEngagement('cart_cleared');
    logger.info('Cart cleared');
  };

  const applyDiscount = (discount) => {
    dispatch({ type: CART_ACTIONS.APPLY_DISCOUNT, payload: discount });
    analytics.trackEngagement('discount_applied', { code: discount.code });
    logger.info('Discount applied', { code: discount.code, type: discount.type });
  };

  const removeDiscount = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_DISCOUNT });
    analytics.trackEngagement('discount_removed');
    logger.info('Discount removed');
  };

  const setShipping = (amount) => {
    dispatch({ type: CART_ACTIONS.SET_SHIPPING, payload: amount });
    logger.info('Shipping updated', { amount });
  };

  const setCustomerType = (type) => {
    dispatch({ type: CART_ACTIONS.SET_CUSTOMER_TYPE, payload: type });
    analytics.trackEngagement('customer_type_changed', { type });
    logger.info('Customer type changed', { type });
  };

  const getItemCount = (id, options = {}) => {
    const item = state.items.find(item => 
      item.id === id && JSON.stringify(item.options) === JSON.stringify(options)
    );
    return item ? item.quantity : 0;
  };

  const isInCart = (id, options = {}) => {
    return state.items.some(item => 
      item.id === id && JSON.stringify(item.options) === JSON.stringify(options)
    );
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyDiscount,
    removeDiscount,
    setShipping,
    setCustomerType,
    getItemCount,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
