import { supabaseServer } from '../../../lib/supabase/server';
import { Product } from '../../../types';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '../../../components/Breadcrumb';
import FilterSidebar from '../../../components/Product/FilterSidebar';
import { calculateFilterCounts } from '../../../utils/productFilters';
import { SlidersHorizontal, ArrowRight, Gamepad2, Smartphone, Battery, Zap } from 'lucide-react';

// Console options
const consoles = [
  { id: 'playstation', name: 'PlayStation', count: 0 },
  { id: 'xbox', name: 'Xbox', count: 0 },
  { id: 'nintendo', name: 'Nintendo', count: 0 },
  { id: 'other', name: 'Other Consoles', count: 0 },
];

// Part type options for consoles
const partTypes = [
  { id: 'screens', name: 'Screens/Displays', count: 0 },
  { id: 'controllers', name: 'Controllers', count: 0 },
  { id: 'chargers', name: 'Chargers & Cables', count: 0 },
  { id: 'cases', name: 'Cases & Housings', count: 0 },
  { id: 'buttons', name: 'Buttons & Triggers', count: 0 },
  { id: 'motherboards', name: 'Motherboards', count: 0 },
];

// Condition options
const conditions = [
  { id: 'new', name: 'New', count: 0 },
  { id: 'refurbished', name: 'Refurbished', count: 0 },
  { id: 'used', name: 'Used', count: 0 },
];

// Get game console parts from Supabase
async function getGameConsoleProducts(): Promise<Product[]> {
  const { data: products, error } = await supabaseServer
    .from('products')
    .select('*')
    .eq('is_active', true)
    .or('category_id.ilike.%gaming%,category_id.ilike.%console%,category_id.ilike.%playstation%,category_id.ilike.%xbox%,category_id.ilike.%nintendo%')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching game console products:', error);
    return [];
  }

  return (products || []).map((product: any) => ({
    _id: product.id,
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.original_price || undefined,
    image: product.thumbnail_url || product.images?.[0] || '/images/products/placeholder.svg',
    gallery: product.images || [],
    category: product.category_id || 'game-console',
    brand: product.brand_id || 'Generic',
    inStock: product.stock_quantity > 0,
    description: product.description || product.short_description || '',
    specs: {},
    sku: product.sku || undefined,
    condition: product.condition || 'New',
    carrier: 'Universal',
    stockStatus: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock',
    slug: product.slug || undefined,
    shortDescription: product.short_description || undefined,
    isFeatured: product.is_featured || false,
    isNew: product.is_new || false,
    discountPercentage: product.discount_percentage || 0,
    metaTitle: product.meta_title || undefined,
    metaDescription: product.meta_description || undefined,
    createdAt: product.created_at,
    updatedAt: product.updated_at,
  }));
}

export async function generateMetadata() {
  return {
    title: 'Game Console Parts | PlayStation, Xbox, Nintendo Repair Parts | Nexus Tech Hub',
    description: 'Game console replacement parts for PlayStation, Xbox, and Nintendo. Controllers, screens, chargers, and repair parts with fast shipping.',
    keywords: 'game console parts, PlayStation repair, Xbox repair, Nintendo repair, console controllers, gaming parts',
    openGraph: {
      title: 'Game Console Parts | PlayStation, Xbox, Nintendo Repair Parts | Nexus Tech Hub',
      description: 'Game console replacement parts for PlayStation, Xbox, and Nintendo with fast shipping.',
      type: 'website',
    },
  };
}

export default async function GameConsolePage() {
  const products = await getGameConsoleProducts();
  const filterOptions = calculateFilterCounts(products);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Parts', href: '/parts' },
          { label: 'Game Console Parts' }
        ]} />
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Game Console Parts
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              PlayStation • Xbox • Nintendo • Premium Quality • Fast USA Shipping • Expert Support
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Gamepad2 className="w-5 h-5" />
                <span>Console Specific</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Battery className="w-5 h-5" />
                <span>Gaming Optimized</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Zap className="w-5 h-5" />
                <span>Quick Repair</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              brands={filterOptions.brands}
              devices={[]}
              partTypes={[]}
              conditions={filterOptions.conditions}
              onFiltersChange={() => {}}
              className="sticky top-6"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between mb-6">
              <button
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {products.length} game console part{products.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <Gamepad2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No game console parts found</h3>
                <p className="text-gray-600 mb-6">We're currently updating our game console parts inventory.</p>
                <Link
                  href="/parts"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse All Parts <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square bg-white">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/products/placeholder.svg';
                        }}
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          NEW
                        </div>
                      )}
                      {(product.discountPercentage || 0) > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          -{product.discountPercentage}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          product.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stockStatus}
                        </span>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        <Link href={product.slug ? `/product/${product.slug}` : `/products/${product.id}`} className="hover:text-blue-600">
                          {product.name}
                        </Link>
                      </h3>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-gray-900">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {products.length > 20 && (
              <div className="text-center mt-8">
                <Link
                  href="/parts"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Parts <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
