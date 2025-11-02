'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-red-500 mb-4">Nexus Tech Hub</h3>
            <p className="text-gray-300 mb-4">
              Your trusted source for high-quality iPhone, Samsung, and iPad replacement parts.
              Wholesale pricing with guaranteed quality and fast delivery across UAE.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-white transition">Products</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white transition">Shipping</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white transition">Returns</Link></li>
              <li><Link href="/warranty" className="text-gray-400 hover:text-white transition">Warranty</Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-white transition">Technical Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Nexus Tech Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
