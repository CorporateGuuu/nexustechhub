'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../../../contexts/CartContext';

export default function Cart() {
  const { items: cartItems, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading cart data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.05; // 5% tax
  const finalTotal = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <h3 className="ml-4 text-lg text-gray-600">Loading your cart...</h3>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Cart</span>
          </div>

          <div className="text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-2">Looks like you haven't added any products to your cart yet.</p>
            <p className="text-gray-600 mb-8">Browse our wide selection of mobile repair parts and tools.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/products" className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                Start Shopping
              </Link>
              <Link href="/products/iphone-parts" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
                Browse iPhone Parts
              </Link>
            </div>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-6">Popular Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/products/iphone-parts" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition border">
                  📱 iPhone Parts
                </Link>
                <Link href="/products/samsung-parts" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition border">
                  📱 Samsung Parts
                </Link>
                <Link href="/products/ipad-parts" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition border">
                  📱 iPad Parts
                </Link>
                <Link href="/products/repair-tools" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition border">
                  🔧 Repair Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Cart</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/products/placeholder.svg';
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          <Link href={`/products/${item.id}`} className="hover:text-red-600">{item.name}</Link>
                        </h3>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded">
                          <button
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="px-3 py-1 border-x">{item.quantity}</span>
                          <button
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>

                        <button
                          className="text-red-600 hover:text-red-800 p-2"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-lg font-semibold pt-3 border-t">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {subtotal < 500 && (
                  <div className="bg-blue-50 text-blue-800 p-3 rounded-lg mb-6 text-sm">
                    Add ${(500 - subtotal).toFixed(2)} more for FREE shipping!
                  </div>
                )}

                <div className="space-y-3">
                  <Link href="/checkout" className="block w-full bg-red-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                    Proceed to Checkout
                  </Link>

                  <Link href="/products" className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-medium hover:bg-gray-50 transition">
                    Continue Shopping
                  </Link>
                </div>

                {/* Promo Code Section */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-3">Have a Promo Code?</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    />
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cross-sell Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Need</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <Image
                  src="/images/products/thermal-paste.jpg"
                  alt="Thermal Paste"
                  width={200}
                  height={200}
                  className="mx-auto mb-4 rounded"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
                <h4 className="font-semibold mb-2">High-Quality Thermal Paste</h4>
                <p className="text-gray-600 mb-3">$9.99</p>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition">
                  Add to Cart
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <Image
                  src="/images/products/suction-cups.jpg"
                  alt="Suction Cups"
                  width={200}
                  height={200}
                  className="mx-auto mb-4 rounded"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
                <h4 className="font-semibold mb-2">Professional Suction Cups</h4>
                <p className="text-gray-600 mb-3">$19.99</p>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition">
                  Add to Cart
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <Image
                  src="/images/products/adhesive-strips.jpg"
                  alt="Adhesive Strips"
                  width={200}
                  height={200}
                  className="mx-auto mb-4 rounded"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
                <h4 className="font-semibold mb-2">Screen Adhesive Strips</h4>
                <p className="text-gray-600 mb-3">$12.99</p>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="mt-12 bg-gray-100 py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl mb-3">🚚</div>
                  <h4 className="font-semibold mb-2">Free Shipping</h4>
                  <p className="text-gray-600">On orders over $500</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-semibold mb-2">Fast Delivery</h4>
                  <p className="text-gray-600">Express options available</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🛡️</div>
                  <h4 className="font-semibold mb-2">Secure Checkout</h4>
                  <p className="text-gray-600">SSL encrypted payment</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">↩️</div>
                  <h4 className="font-semibold mb-2">Easy Returns</h4>
                  <p className="text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
