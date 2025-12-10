'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import CartDrawer from './CartDrawer';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock cart data - replace with real cart context
  const cartItemCount = 3;

  const navigation = [
    { name: 'Parts', href: '/parts' },
    { name: 'Accessories', href: '/parts/accessories' },
    { name: 'Tools', href: '/parts/tools' },
    { name: 'Brands', href: '/parts' },
    { name: 'Support', href: '/support' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="text-sm text-gray-600">
              Free shipping on orders over $99 • 30-day returns
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/support" className="text-gray-600 hover:text-gray-900">
                Support
              </Link>
              <Link href="/account" className="text-gray-600 hover:text-gray-900">
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              NEXUS TECH
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search parts..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </form>
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search Icon */}
            <button
              onClick={() => {
                const searchInput = document.querySelector('input[placeholder="Search parts..."]') as HTMLInputElement;
                if (searchInput) searchInput.focus();
              }}
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-gray-900"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search parts..."
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Account Links */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link
                href="/account"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Account
              </Link>
              <Link
                href="/support"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}
