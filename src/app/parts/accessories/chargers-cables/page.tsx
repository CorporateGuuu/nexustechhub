'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../../../lib/supabase';
import { Product } from '../../../../types';
import AddToCartButton from '../../../../components/AddToCartButton';
import Breadcrumb from '../../../../components/Breadcrumb';
import {
  X,
  Grid,
  List,
  Search,
  SlidersHorizontal,
  Check,
  ArrowRight,
  Battery
} from 'lucide-react';

const filterSchema = z.object({
  search: z.string().optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

// Subcategories for Chargers & Cables
const subcategories = [
  {
    name: 'USB-C Cables',
    slug: 'usb-c-cables',
    description: 'Fast charging USB-C to USB-C cables',
    icon: '🔌',
    count: 0
  },
  {
    name: 'Lightning Cables',
    slug: 'lightning-cables',
    description: 'Apple Lightning to USB cables',
    icon: '⚡',
    count: 0
  },
  {
    name: 'Wall Chargers',
    slug: 'wall-chargers',
    description: 'Wall adapters and fast chargers',
    icon: '🔋',
    count: 0
  },
  {
    name: 'Wireless Chargers',
    slug: 'wireless-chargers',
    description: 'Qi wireless charging pads',
    icon: '📡',
    count: 0
  },
  {
    name: 'Car Chargers',
    slug: 'car-chargers',
    description: 'Car adapters and dash mounts',
    icon: '🚗',
    count: 0
  },
  {
    name: 'Power Banks',
    slug: 'power-banks',
    description: 'Portable battery packs',
    icon: '🔋',
    count: 0
  }
];

// Brand options
const brands = [
  { id: 'anker', name: 'Anker', count: 0 },
  { id: 'belkin', name: 'Belkin', count: 0 },
  { id: 'apple', name: 'Apple', count: 0 },
  { id: 'samsung', name: 'Samsung', count: 0 },
  { id: 'oem', name: 'OEM', count: 0 },
];

// Compatibility options
const compatibilities = [
  { id: 'iphone', name: 'iPhone', count: 0 },
  { id: 'ipad', name: 'iPad', count: 0 },
  { id: 'android', name: 'Android', count: 0 },
  { id: 'universal', name: 'Universal', count: 0 },
];

// Sort options
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
];

export default function ChargersCablesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filters state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCompatibilities, setSelectedCompatibilities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const { register, watch } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
  });

  const searchTerm = watch('search') || '';

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
          .or('name.ilike.%charger%,name.ilike.%cable%,name.ilike.%adapter%,name.ilike.%power%')
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
            condition: 'New',
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

  // Calculate subcategory counts
  const subcategoryCounts = useMemo(() => {
    return subcategories.map(sub => ({
      ...sub,
      count: products.filter(p =>
        p.name.toLowerCase().includes(sub.name.toLowerCase().replace(' Cables', '').replace(' Chargers', ''))
      ).length
    }));
  }, [products]);

  // Filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0) {
        const brandMatch = selectedBrands.some(brand =>
          product.brand?.toLowerCase().includes(brand.toLowerCase()) ||
          product.name.toLowerCase().includes(brand.toLowerCase())
        );
        if (!brandMatch) return false;
      }

      // Compatibility filter
      if (selectedCompatibilities.length > 0) {
        const compatibilityMatch = selectedCompatibilities.some(comp =>
          product.name.toLowerCase().includes(comp.toLowerCase()) ||
          product.description.toLowerCase().includes(comp.toLowerCase())
        );
        if (!compatibilityMatch) return false;
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
    });

    return filtered;
  }, [products, searchTerm, selectedBrands, selectedCompatibilities, priceRange, sortBy]);

  // Calculate filter counts
  const filterCounts = useMemo(() => {
    const counts = {
      brands: brands.map(brand => ({
        ...brand,
        count: products.filter(p =>
          p.brand?.toLowerCase().includes(brand.id.toLowerCase()) ||
          p.name.toLowerCase().includes(brand.id.toLowerCase())
        ).length
      })),
      compatibilities: compatibilities.map(comp => ({
        ...comp,
        count: products.filter(p =>
          p.name.toLowerCase().includes(comp.id.toLowerCase()) ||
          p.description.toLowerCase().includes(comp.id.toLowerCase())
        ).length
      }))
    };
    return counts;
  }, [products]);

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleCompatibilityToggle = (compId: string) => {
    setSelectedCompatibilities(prev =>
      prev.includes(compId)
        ? prev.filter(id => id !== compId)
        : [...prev, compId]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCompatibilities([]);
    setPriceRange([0, 200]);
  };

  const activeFiltersCount =
    selectedBrands.length +
    selectedCompatibilities.length +
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chargers & cables...</p>
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
          { label: 'Parts', href: '/parts' },
          { label: 'Accessories', href: '/parts/accessories' },
          { label: 'Chargers & Cables' }
        ]} />
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Chargers & Cables
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-blue-100">
              Wall Chargers • USB-C Cables • Lightning Cables • Power Banks
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Check className="w-4 h-4" />
                <span>Fast Charging</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Check className="w-4 h-4" />
                <span>MFi Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Check className="w-4 h-4" />
                <span>Premium Brands</span>
              </div>
            </div>

            {/* View all link */}
            <div className="mt-8">
              <Link
                href="/parts/accessories"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                ← Back to Accessories
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear all ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...register('search')}
                    type="text"
                    placeholder="Search cables..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Brand</h3>
                <div className="space-y-2">
                  {filterCounts.brands.map(brand => (
                    <label key={brand.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => handleBrandToggle(brand.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex-1">{brand.name}</span>
                      <span className="text-xs text-gray-500">({brand.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Compatibility Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Compatibility</h3>
                <div className="space-y-2">
                  {filterCounts.compatibilities.map(comp => (
                    <label key={comp.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCompatibilities.includes(comp.id)}
                        onChange={() => handleCompatibilityToggle(comp.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex-1">{comp.name}</span>
                      <span className="text-xs text-gray-500">({comp.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="px-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Subcategory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {subcategoryCounts.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/parts/accessories/chargers-cables/${sub.slug}`}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all group"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{sub.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      {sub.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{sub.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{sub.count} products</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Filter Toggle & Sort */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredAndSortedProducts.length} charger{filteredAndSortedProducts.length !== 1 ? 's' : ''} & cable{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
                {activeFiltersCount > 0 && (
                  <span className="ml-2">
                    ({activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied)
                  </span>
                )}
              </p>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms.</p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Clear all filters
                </button>
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
                        <Link href={`/products/${product.id}`} className="hover:text-blue-600">
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
          </div>
        </div>
      </div>

      {/* Mobile Filters Bottom Sheet */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filters Content */}
              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Products
                  </label>
                  <input
                    {...register('search')}
                    type="text"
                    placeholder="Search cables..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Brand Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Brand</h3>
                  <div className="space-y-2">
                    {filterCounts.brands.map(brand => (
                      <label key={brand.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => handleBrandToggle(brand.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 flex-1">{brand.name}</span>
                        <span className="text-xs text-gray-500">({brand.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Compatibility Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Compatibility</h3>
                  <div className="space-y-2">
                    {filterCounts.compatibilities.map(comp => (
                      <label key={comp.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCompatibilities.includes(comp.id)}
                          onChange={() => handleCompatibilityToggle(comp.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 flex-1">{comp.name}</span>
                        <span className="text-xs text-gray-500">({comp.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="px-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
