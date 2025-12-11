import Link from 'next/link';
import Breadcrumb from '../../../../components/Breadcrumb';
import ProductGrid from '../../../../components/Product/ProductGrid';
import { Product } from 'src/types';

export const metadata = {
  title: 'MacBook Pro Parts - Screens, Batteries, Keyboards, Repairs | Nexus Tech Hub',
  description: 'Premium replacement parts for MacBook Pro models. Screens, batteries, keyboards, logic boards. Fast USA shipping.',
};

export default async function MacBookProPage() {
  // For now, show empty grid with "Coming Soon" message
  const products: Product[] = [];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Apple', href: '/category/apple' },
            { label: 'MacBook Pro' }
          ]} />
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-gray-800 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                MacBook Pro Parts
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-gray-300">
                Professional Grade • M Series Chips • Premium Build
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/category/apple"
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  ← Back to Apple
                </Link>
                <Link
                  href="/parts/macbook-airpods"
                  className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  View MacBook Parts →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Parts</h2>
            <p className="text-gray-600">
              Premium quality replacement parts for MacBook Pro models. All parts are tested and guaranteed to work.
            </p>
          </div>

          <ProductGrid products={products} showFilters={false} />

          {/* Coming Soon Cards */}
          {products.length === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { name: 'Retina Display', price: 'Coming Soon', category: 'Displays' },
                { name: 'Battery', price: 'Coming Soon', category: 'Batteries' },
                { name: 'Keyboard', price: 'Coming Soon', category: 'Keyboards' },
                { name: 'Trackpad', price: 'Coming Soon', category: 'Input' },
                { name: 'Speakers', price: 'Coming Soon', category: 'Audio' },
                { name: 'USB-C Ports', price: 'Coming Soon', category: 'Connectivity' },
                { name: 'SSD Storage', price: 'Coming Soon', category: 'Storage' },
                { name: 'RAM Modules', price: 'Coming Soon', category: 'Memory' },
              ].map((part, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Image Coming Soon</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{part.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{part.category}</p>
                  <div className="text-lg font-bold text-gray-400">{part.price}</div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 bg-white rounded-lg p-8 text-center border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't see what you need?</h3>
            <p className="text-gray-600 mb-6">
              We're constantly adding new parts. Contact us for custom orders or repair quotes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/repair-guides"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Repair Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
