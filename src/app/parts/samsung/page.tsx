import { supabaseServer } from '../../../lib/supabase/server';
import { Product, FilterState } from '../../../types';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '../../../components/Breadcrumb';
import FilterSidebar from '../../../components/Product/FilterSidebar';
import { filterAndSortProducts, calculateFilterCounts } from '../../../utils/productFilters';
import { Grid, List, SlidersHorizontal, ArrowRight, Smartphone, Battery, Headphones, Gamepad2, Wrench, Zap } from 'lucide-react';

// Device options for Samsung
const devices = [
  { id: 'galaxy-s', name: 'Galaxy S Series', count: 0 },
  { id: 'galaxy-note', name: 'Galaxy Note', count: 0 },
  { id: 'galaxy-a', name: 'Galaxy A Series', count: 0 },
  { id: 'galaxy-z', name: 'Galaxy Z Fold/Flip', count: 0 },
  { id: 'galaxy-tab', name: 'Galaxy Tab', count: 0 },
];

// Part type options for Samsung
const partTypes = [
  { id: 'screen', name: 'Screen/Display', count: 0 },
  { id: 'battery', name: 'Battery', count: 0 },
  { id: 'camera', name: 'Camera', count: 0 },
  { id: 'charging', name: 'Charging Port', count: 0 },
  { id: 'back-glass', name: 'Back Glass', count: 0 },
  { id: 'motherboard', name: 'Motherboard', count: 0 },
];

// Condition options
const conditions = [
  { id: 'oem', name: 'OEM (Original)', count: 0 },
  { id: 'high-quality', name: 'High Quality', count: 0 },
  { id: 'refurbished', name: 'Refurbished', count: 0 },
];

// Get Samsung products from Supabase
async function getSamsungProducts(): Promise<Product[]> {
  const { data: products, error } = await supabaseServer
    .from('products')
    .select('*')
    .eq('is_active', true)
    .ilike('brand_id', 'Samsung')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching Samsung products:', error);
    return [];
  }

  return (products || []).map(product => ({
    _id: product.id,
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.original_price || undefined,
    image: product.thumbnail_url || product.images?.[0] || '/images/products/placeholder.svg',
    gallery: product.images || [],
    category: product.category_id || 'samsung-parts',
    brand: product.brand_id || 'Samsung',
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
    title: 'Samsung Parts | Galaxy Phone & Tablet Replacement Parts | Nexus Tech Hub',
    description: 'Premium Samsung Galaxy S, Note, A, Z series replacement parts. Screens, batteries, cameras, and more with fast shipping and expert support.',
    keywords: 'Samsung parts, Galaxy S parts, Galaxy Note parts, Samsung repair parts, Galaxy screen replacement',
    openGraph: {
      title: 'Samsung Parts | Galaxy Phone & Tablet Replacement Parts | Nexus Tech Hub',
      description: 'Premium Samsung Galaxy replacement parts with fast shipping and expert support.',
      type: 'website',
    },
  };
}

export default async function SamsungPartsPage() {
  const products = await getSamsungProducts();
  const filterOptions = calculateFilterCounts(products);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Parts', href: '/parts' },
          { label: 'Samsung' }
        ]} />
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Samsung Galaxy Parts
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Premium Quality • Competitive Pricing • Fast USA Shipping • Expert Support
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Smartphone className="w-5 h-5" />
                <span>Galaxy S, Note, A, Z Series</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Battery className="w-5 h-5" />
                <span>Genuine OEM Parts</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Zap className="w-5 h-5" />
                <span>Same-Day Shipping</span>
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
              devices={filterOptions.devices}
              partTypes={filterOptions.partTypes}
              conditions={filterOptions.conditions}
              onFiltersChange={() => {}} // Will be handled by URL state
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
                {products.length} Samsung part{products.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Samsung parts found</h3>
                <p className="text-gray-600 mb-6">We're currently updating our Samsung parts inventory.</p>
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
