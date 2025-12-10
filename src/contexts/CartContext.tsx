'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCart as useCartStore } from '../stores/cartStore';
import { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartStore = useCartStore();

  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    cartStore.addItem(item);
  };

  const removeFromCart = (id: string) => {
    cartStore.removeItem(id);
  };

  const updateQuantity = (id: string, qty: number) => {
    cartStore.updateQuantity(id, qty);
  };

  const clearCart = () => {
    cartStore.clearCart();
  };

  const value: CartContextType = {
    items: cartStore.items,
    itemCount: cartStore.itemCount,
    subtotal: cartStore.subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
