'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../lib/supabase';
import { Product, FilterState, FilterOption } from '../../types';
import AddToCartButton from '../../components/AddToCartButton';
import Breadcrumb from '../../components/Breadcrumb';
import FilterSidebar from '../../components/Product/FilterSidebar';
import { filterAndSortProducts, calculateFilterCounts } from '../../utils/productFilters';
import {
  Grid,
  List,
  Search,
  SlidersHorizontal,
  Check,
  ArrowRight,
  Smartphone,
  Battery,
  Headphones,
  Car,
  Gamepad2
} from 'lucide-react';

// Accessory categories with beautiful images and descriptions
const categories = [
  {
    id: 'chargers-cables',
    name: 'Chargers & Cables',
    description: 'Wall chargers, USB-C cables, Lightning cables, wireless chargers, power banks',
    image: '/images/categories/chargers-cables.jpg',
    icon: Battery,
    color: 'from-blue-500 to-blue-600',
    link: '/parts/accessories/chargers-cables',
    features: ['Fast Charging', 'MFi Certified', 'Bulk Pricing']
  },
  {
    id: 'cases-protection',
    name: 'Cases & Protection',
    description: 'Phone cases, screen protectors, tempered glass, privacy glass',
    image: '/images/categories/cases-protection.jpg',
    icon: Smartphone,
    color: 'from-green-500 to-green-600',
    link: '/parts/accessories/cases-protection',
    features: ['Shock Absorption', 'Screen Protection', 'Slim Design']
  },
  {
    id: 'audio',
    name: 'Audio',
    description: 'Bluetooth earbuds, headphones, speakers, adapters, DACs',
    image: '/images/categories/audio.jpg',
    icon: Headphones,
    color: 'from-purple-500 to-purple-600',
    link: '/parts/accessories/audio',
    features: ['High Fidelity', 'Noise Cancellation', 'Long Battery']
  },
  {
    id: 'mounts-holders',
    name: 'Mounts & Holders',
    description: 'Car mounts, desk stands, PopSockets, phone grips, ring lights',
    image: '/images/categories/mounts-holders.jpg',
    icon: Car,
    color: 'from-orange-500 to-orange-600',
    link: '/parts/accessories/mounts-holders',
    features: ['Secure Grip', '360° Rotation', 'Easy Installation']
  },
  {
    id: 'gaming-others',
    name: 'Gaming & Others',
    description: 'Console controllers, gaming headsets, smartwatch bands, stylus pens',
    image: '/images/categories/gaming-others.jpg',
    icon: Gamepad2,
    color: 'from-red-500 to-red-600',
    link: '/parts/accessories/gaming-others',
    features: ['Pro Performance', 'Comfort Design', 'Universal Fit']
  }
];

export default function AccessoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    brands: [],
    priceRange: [0, 5000],
    devices: [],
    partTypes: [],
    conditions: [],
    sort: 'newest'
  });

  // Load products from Supabase
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .eq('category_id', 'accessories')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading products:', error);
          setProducts([]);
        } else {
          // Transform Supabase data to Product type
          const transformedProducts: Product[] = (data || []).map(product => ({
            _id: product.id,
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.original_price || undefined,
            image: product.thumbnail_url || product.images?.[0] || '/images/products/placeholder.svg',
            gallery: product.images || [],
            category: product.category_id || 'accessories',
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
            weight: product.weight || undefined,
            dimensions: product.dimensions || undefined,
            tags: product.tags || undefined,
            isFeatured: product.is_featured || false,
            isNew: product.is_new || false,
            discountPercentage: product.discount_percentage || 0,
            lowStockThreshold: product.low_stock_threshold || 0,
            metaTitle: product.meta_title || undefined,
            metaDescription: product.meta_description || undefined,
            createdAt: product.created_at,
            updatedAt: product.updated_at,
          }));

          setProducts(transformedProducts);
        }
      } catch (error) {
        console.error('Error in loadProducts:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Calculate filter options with counts
  const filterOptions = useMemo(() => calculateFilterCounts(products), [products]);

  // Filtered and sorted products using utility function
  const filteredAndSortedProducts = useMemo(() =>
    filterAndSortProducts(products, filters), [products, filters]
  );

  // Handle filter changes
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading accessories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Accessories' }
        ]} />
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Phone & Tablet Accessories
              <span className="block text-2xl md:text-4xl font-normal mt-2 text-purple-100">
                Wholesale
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Premium Quality • Competitive Pricing • Fast USA Shipping
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Check className="w-5 h-5" />
                <span>180-Day Warranty</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Check className="w-5 h-5" />
                <span>Bulk Discounts</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Check className="w-5 h-5" />
                <span>Expert Support</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Check className="w-5 h-5" />
                <span>Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={category.link}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/categories/placeholder.jpg';
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className="absolute top-4 left-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {category.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                    Shop {category.name} →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Products Section with Filters */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              brands={filterOptions.brands}
              devices={filterOptions.devices}
              partTypes={filterOptions.partTypes}
              conditions={filterOptions.conditions}
              onFiltersChange={handleFiltersChange}
              className="sticky top-6"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-md ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Product Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
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
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
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

                      {viewMode === 'list' && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}

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

                        <AddToCartButton
                          product={product}
                          variant="compact"
                          className="ml-4"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredAndSortedProducts.length > 20 && (
              <div className="text-center mt-8">
                <Link
                  href="/parts/accessories"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Accessories <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Bottom Sheet */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
              <FilterSidebar
                brands={filterOptions.brands}
                devices={filterOptions.devices}
                partTypes={filterOptions.partTypes}
                conditions={filterOptions.conditions}
                onFiltersChange={handleFiltersChange}
                isMobile={true}
                onClose={() => setShowMobileFilters(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
