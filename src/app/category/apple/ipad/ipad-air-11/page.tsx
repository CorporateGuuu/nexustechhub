import Link from 'next/link';
import Breadcrumb from '../../../../components/Breadcrumb';
import ProductGrid from '../../../../components/Product/ProductGrid';
import { Product } from 'src/types';

export const metadata = {
  title: 'iPad Air 11" Parts - Screens, Batteries, Repairs | Nexus Tech Hub',
  description: 'Premium replacement parts for iPad Air 11" (M2 Chip). Screens, batteries, cameras, charging ports. Fast USA shipping.',
};

export default async function iPadAir11Page() {
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
            { label: 'iPad', href: '/category/apple/ipad' },
            { label: 'iPad Air 11"' }
          ]} />
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                iPad Air 11" Parts
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-blue-100">
                M2 Chip • Liquid Retina • All-Day Battery
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/category/apple/ipad"
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  ← Back to iPad
                </Link>
                <Link
                  href="/category/apple/ipad"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  View all models →
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
              Premium quality replacement parts for your iPad Air 11". All parts are tested and guaranteed to work.
            </p>
          </div>

          <ProductGrid products={products} showFilters={false} />

          {/* Coming Soon Cards */}
          {products.length === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { name: 'Liquid Retina Display', price: 'Coming Soon', category: 'Displays' },
                { name: 'Battery', price: 'Coming Soon', category: 'Batteries' },
                { name: 'Rear Camera', price: 'Coming Soon', category: 'Cameras' },
                { name: 'Front Camera', price: 'Coming Soon', category: 'Cameras' },
                { name: 'USB-C Port', price: 'Coming Soon', category: 'Charging' },
                { name: 'Speakers', price: 'Coming Soon', category: 'Audio' },
                { name: 'Taptic Engine', price: 'Coming Soon', category: 'Vibration' },
                { name: 'WiFi/Bluetooth Module', price: 'Coming Soon', category: 'Connectivity' },
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
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
