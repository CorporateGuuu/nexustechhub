import { supabaseServer } from '../../../lib/supabase/server';
import { Product } from '../../../types';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '../../../components/Breadcrumb';
import FilterSidebar from '../../../components/Product/FilterSidebar';
import { calculateFilterCounts } from '../../../utils/productFilters';
import { SlidersHorizontal, ArrowRight, Wrench, Battery, Smartphone, Zap } from 'lucide-react';

// Tool categories
const toolCategories = [
  { id: 'repair-tools', name: 'Repair Tools', count: 0 },
  { id: 'opening-tools', name: 'Opening Tools', count: 0 },
  { id: 'adhesives', name: 'Adhesives', count: 0 },
  { id: 'testers', name: 'Testers', count: 0 },
  { id: 'cleaning', name: 'Cleaning Supplies', count: 0 },
];

// Brand options for tools
const brands = [
  { id: 'ifixit', name: 'iFixit', count: 0 },
  { id: 'protech', name: 'Pro Tech', count: 0 },
  { id: 'generic', name: 'Generic', count: 0 },
];

// Condition options
const conditions = [
  { id: 'new', name: 'New', count: 0 },
  { id: 'refurbished', name: 'Refurbished', count: 0 },
];

// Get tools and supplies from Supabase
async function getToolsProducts(): Promise<Product[]> {
  const { data: products, error } = await supabaseServer
    .from('products')
    .select('*')
    .eq('is_active', true)
    .ilike('category_id', '%tool%')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tools products:', error);
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
    category: product.category_id || 'tools',
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
    title: 'Phone Repair Tools & Supplies | Professional Repair Equipment | Nexus Tech Hub',
    description: 'Professional phone and tablet repair tools. Opening picks, adhesives, testers, screwdrivers, and repair supplies with fast shipping.',
    keywords: 'phone repair tools, opening tools, adhesives, repair supplies, screwdrivers, phone repair equipment',
    openGraph: {
      title: 'Phone Repair Tools & Supplies | Professional Repair Equipment | Nexus Tech Hub',
      description: 'Professional phone and tablet repair tools and supplies with fast shipping.',
      type: 'website',
    },
  };
}

export default async function ToolsPage() {
  const products = await getToolsProducts();
  const filterOptions = calculateFilterCounts(products);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Parts', href: '/parts' },
          { label: 'Tools & Supplies' }
        ]} />
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Repair Tools & Supplies
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
              Professional Grade • Quality Equipment • Fast USA Shipping • Expert Support
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Wrench className="w-5 h-5" />
                <span>Professional Tools</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Battery className="w-5 h-5" />
                <span>Durable Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Zap className="w-5 h-5" />
                <span>Complete Kits</span>
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
                {products.length} tool{products.length !== 1 ? 's' : ''} & suppl{products.length !== 1 ? 'ies' : 'y'} available
              </p>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
                <p className="text-gray-600 mb-6">We're currently updating our tools and supplies inventory.</p>
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
