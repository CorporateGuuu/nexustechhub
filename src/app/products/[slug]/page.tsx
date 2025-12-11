// Simple product page - minimal and working
import React from 'react';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Page</h1>
        <p className="text-gray-600 mb-6">Product: {params.slug}</p>
        <div className="space-y-3">
          <Link href="/parts" className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            Browse Parts
          </Link>
          <Link href="/" className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
