'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, removeFromCart, updateQuantity, clearCart, itemCount, total } = useCart();

  // Listen to global cart icon clicks (via context or event)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-cart', handler);
    return () => window.removeEventListener('open-cart', handler);
  }, []);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Cart ({itemCount})
          </h2>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Close cart">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">Your cart is empty</p>
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-green-600 font-semibold">${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="ml-auto text-red-600 hover:text-red-700"
                          aria-label="Remove item from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Shipping & taxes calculated at checkout</p>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="block w-full bg-red-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full text-sm text-gray-600 hover:text-red-600"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
