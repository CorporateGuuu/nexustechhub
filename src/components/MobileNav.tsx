'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const categories = [
  { name: 'Apple', href: '/parts/apple' },
  { name: 'Samsung', href: '/parts/samsung' },
  { name: 'Motorola', href: '/parts/motorola' },
  { name: 'Google', href: '/parts/google-pixel' },
  { name: 'Other Parts', href: '/parts/other-parts' },
  { name: 'Game Console', href: '/parts/game-console' },
  { name: 'Accessories', href: '/parts/accessories' },
  { name: 'Tools & Supplies', href: '/parts/tools-and-supplies' },
  { name: 'Refurbishing', href: '/parts/refurbishing' },
  { name: 'Board Components', href: '/parts/board-components' },
  { name: 'Pre-Owned Devices', href: '/pre-owned-devices' }
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Open mobile menu"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}
          />

          {/* Side Menu */}
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out">
            <div className="flex flex-col h-full">

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-black text-sky-500 tracking-tight">NEXUS</span>
                  <span className="text-xl font-black text-gray-900 tracking-tight">TECHHUB</span>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Categories */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-6 mb-4">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Categories
                  </h2>
                </div>

                <nav className="px-4">
                  <div className="space-y-1">
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        href={category.href}
                        onClick={closeMenu}
                        className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-all duration-200 font-medium"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Additional Links */}
                <div className="px-6 mt-8 mb-4">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Quick Links
                  </h2>
                </div>

                <nav className="px-4">
                  <div className="space-y-1">
                    <Link
                      href="/"
                      onClick={closeMenu}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-all duration-200"
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      onClick={closeMenu}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-all duration-200"
                    >
                      All Products
                    </Link>
                    <Link
                      href="/cart"
                      onClick={closeMenu}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-all duration-200"
                    >
                      Cart
                    </Link>
                  </div>
                </nav>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-500">
                  © 2025 Nexus TechHub
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
