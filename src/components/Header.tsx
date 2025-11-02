'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import CartDrawer from './CartDrawer';

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { itemCount } = useCart();
  const { user, login } = useAuth();

  const categories = [
    { name: 'iPhone Parts', sub: ['Screens', 'Batteries', 'Cameras'] },
    { name: 'Samsung Parts', sub: ['Displays', 'Back Glass', 'Charging Ports'] },
    { name: 'iPad Parts', sub: ['LCDs', 'Digitizers', 'Home Buttons'] },
    { name: 'Repair Tools', sub: ['Screwdrivers', 'Opening Tools', 'Adhesives'] },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-red-600">Nexus Tech Hub</span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search iPhone 15, Samsung S24..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-red-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-red-600 transition">
                  Categories <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {categories.map((cat) => (
                    <div key={cat.name} className="border-b last:border-0">
                      <Link href={`/products/${cat.name.toLowerCase().replace(' ', '-')}`} className="block px-4 py-3 hover:bg-gray-50">
                        {cat.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="hidden md:block text-sm">AED</button>
              {user ? (
                <Link href="/account" className="flex items-center gap-1">
                  <User className="h-5 w-5" />
                  <span className="hidden md:block">Account</span>
                </Link>
              ) : (
                <button onClick={login} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition">
                  Wholesale Login
                </button>
              )}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('open-cart'));
                }}
                className="relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenu(true)}
                className="lg:hidden"
                aria-label="Open mobile menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMobileMenu(false)}>
            <div className="bg-white w-full h-full p-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold">Menu</span>
                <button
                  onClick={() => setMobileMenu(false)}
                  aria-label="Close mobile menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-4">
                {categories.map((cat) => (
                  <Link key={cat.name} href={`/products/${cat.name.toLowerCase().replace(' ', '-')}`} className="block text-lg">
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Cart Drawer */}
        <CartDrawer />
      </header>
    </>
  );
}
