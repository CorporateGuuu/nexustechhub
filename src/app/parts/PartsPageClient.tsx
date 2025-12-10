'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
  link: string;
  features: string[];
}

interface PartsPageClientProps {
  categories: Category[];
  featuredProducts: any[];
  stats: {
    totalProducts: number;
    inStockProducts: number;
  };
}

export default function PartsPageClient({ categories, stats }: PartsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Wholesale Phone & Tablet Parts
            </h1>
            <div className="mb-8">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                Over 50,000+ Parts in Stock
              </div>
              <div className="text-xl md:text-2xl text-blue-200">
                Same-Day Shipping • 180-Day Warranty • Wholesale Pricing
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white font-medium">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white font-medium">Trusted by 10,000+ Shops</span>
              </div>
            </div>
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for parts, brands, or models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 text-lg rounded-xl border-0 focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 shadow-2xl"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg">
                <div className="text-3xl font-bold text-white">{stats.totalProducts.toLocaleString()}+</div>
                <div className="text-blue-200">Parts Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg">
                <div className="text-3xl font-bold text-white">{stats.inStockProducts.toLocaleString()}+</div>
                <div className="text-blue-200">In Stock Now</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg">
                <div className="text-3xl font-bold text-white">180</div>
                <div className="text-blue-200">Day Warranty</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-200">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect replacement parts for your device. From screens to batteries, we have everything you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="absolute top-6 left-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}>
                    <div className="w-7 h-7 bg-white rounded"></div>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {category.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                    Shop {category.name.split(' ')[0]} Parts →
                  </span>
                  <div className="flex items-center text-yellow-400">
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full ml-1"></div>
                    <div className="w-1 h-1 bg-current rounded-full ml-1"></div>
                    <div className="w-1 h-1 bg-current rounded-full ml-1"></div>
                    <div className="w-1 h-1 bg-current rounded-full ml-1"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Why Choose Nexus Tech Hub?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-300 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <h4 className="text-lg font-semibold mb-2">Genuine Quality</h4>
              <p className="text-blue-100">OEM and premium replacement parts you can trust</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-300 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <h4 className="text-lg font-semibold mb-2">Fast Shipping</h4>
              <p className="text-blue-100">Same-day shipping on in-stock items</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-300 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <h4 className="text-lg font-semibold mb-2">Expert Support</h4>
              <p className="text-blue-100">24/7 technical support from certified technicians</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
