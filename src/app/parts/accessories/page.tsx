'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../../lib/supabase';
import { Product } from '../../../types';
import AddToCartButton from '../../../components/AddToCartButton';
import Breadcrumb from '../../../components/Breadcrumb';
import {
  X,
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
  Gamepad2,
  Watch
} from 'lucide-react';

const filterSchema = z.object({
  search: z.string().optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

// Accessory categories with icons
const categories = [
  {
    id: 'chargers-cables',
    name: 'Chargers & Cables',
    description: 'Wall chargers, USB-C cables, Lightning cables, wireless chargers',
    icon: Battery,
    color: 'from-blue-500 to-blue-600',
    subcategories: [
      { name: 'USB-C Cables', slug: 'usb-c-cables', count: 0 },
      { name: 'Lightning Cables', slug: 'lightning-cables', count: 0 },
      { name: 'Wall Chargers', slug: 'wall-chargers', count: 0 },
      { name: 'Wireless Chargers', slug: 'wireless-chargers', count: 0 },
      { name: 'Car Chargers', slug: 'car-chargers', count: 0 },
      { name: 'Power Banks', slug: 'power-banks', count: 0 }
    ]
  },
  {
    id: 'cases-protection',
    name: 'Cases & Protection',
    description: 'Phone cases, screen protectors, tempered glass, privacy glass',
    icon: Smartphone,
    color: 'from-green-500 to-green-600',
    subcategories: [
      { name: 'iPhone Cases', slug: 'iphone-cases', count: 0 },
      { name: 'Samsung Cases', slug: 'samsung-cases', count: 0 },
      { name: 'Screen Protectors', slug: 'screen-protectors', count: 0 },
      { name: 'Tempered Glass', slug: 'tempered-glass', count: 0 }
    ]
  },
  {
    id: 'audio',
    name: 'Audio',
    description: 'Bluetooth earbuds, headphones, speakers, adapters',
    icon: Headphones,
    color: 'from-purple-500 to-purple-600',
    subcategories: [
      { name: 'Bluetooth Earbuds', slug: 'bluetooth-earbuds', count: 0 },
      { name: 'Headphones', slug: 'headphones', count: 0 },
      { name: 'Speakers', slug: 'speakers', count: 0 },
      { name: 'Adapters', slug: 'adapters', count: 0 }
    ]
  },
  {
    id: 'mounts-holders',
    name: 'Mounts & Holders',
    description: 'Car mounts, desk stands, PopSockets, phone grips',
    icon: Car,
    color: 'from-orange-500 to-orange-600',
    subcategories: [
      { name: 'Car Mounts', slug: 'car-mounts', count: 0 },
      { name: 'Desk Stands', slug: 'desk-stands', count: 0 },
      { name: 'PopSockets', slug: 'popsockets', count: 0 }
    ]
  },
  {
    id: 'gaming-others',
    name: 'Gaming & Others',
    description: 'Console controllers, gaming headsets, smartwatch bands',
    icon: Gamepad2,
    color: 'from-red-500 to-red-600',
    subcategories: [
      { name: 'Console Controllers', slug: 'console-controllers', count: 0 },
      { name: 'Gaming Headsets', slug: 'gaming-headsets', count: 0 },
      { name: 'Smartwatch Bands', slug: 'smartwatch-bands', count: 0 },
      { name: 'Stylus Pens', slug: 'stylus-pens', count: 0 }
    ]
  }
];

// Brand options for accessories
const brands = [
  { id: 'anker', name: 'Anker', count: 0 },
  { id: 'belkin', name: 'Belkin', count: 0 },
  { id: 'apple', name: 'Apple', count: 0 },
  { id: 'samsung', name: 'Samsung', count: 0 },
  { id: 'oem', name: 'OEM', count: 0 },
];

// Sort options
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
];

export default function AccessoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filters state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

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

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    return categories.map(category => ({
      ...category,
      count: products.filter(p =>
        category.subcategories.some(sub =>
          p.name.toLowerCase().includes(sub.name.toLowerCase().replace(' Cases', '').replace(' Cables', '').replace(' Chargers', ''))
        )
      ).length,
      subcategories: category.subcategories.map(sub => ({
        ...sub,
        count: products.filter(p =>
          p.name.toLowerCase().includes(sub.name.toLowerCase().replace(' Cases', '').replace(' Cables', '').replace(' Chargers', ''))
        ).length
      }))
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

      // Category filter
      if (selectedCategories.length > 0) {
        const categoryMatch = selectedCategories.some(category =>
          product.name.toLowerCase().includes(category.toLowerCase().replace('-', ' '))
        );
        if (!categoryMatch) return false;
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
  }, [products, searchTerm, selectedBrands, selectedCategories, priceRange, sortBy]);

  // Calculate filter counts
  const filterCounts = useMemo(() => {
    const counts = {
      brands: brands.map(brand => ({
        ...brand,
        count: products.filter(p =>
          p.brand?.toLowerCase().includes(brand.id.toLowerCase()) ||
          p.name.toLowerCase().includes(brand.id.toLowerCase())
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

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 500]);
  };

  const activeFiltersCount =
    selectedBrands.length +
    selectedCategories.length +
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

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
          { label: 'Parts', href: '/parts' },
          { label: 'Accessories' }
        ]} />
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Phone Accessories & Gadgets
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-purple-100">
              Cases • Cables • Audio • Mounts • Gaming Accessories
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Check className="w-4 h-4" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Check className="w-4 h-4" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Check className="w-4 h-4" />
                <span>Best Prices</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoryCounts.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                <div className="space-y-2 mb-4">
                  {category.subcategories.slice(0, 3).map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/parts/accessories/${category.id}/${sub.slug}`}
                      className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-800"
                    >
                      <span>{sub.name}</span>
                      <span className="text-gray-500">({sub.count})</span>
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/parts/accessories/${category.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-blue-600"
                >
                  View all {category.name.toLowerCase()} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Featured Products Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Accessories</h2>
              <p className="text-gray-600 mt-1">Top-selling accessories from trusted brands</p>
            </div>

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

          {/* Products Grid */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}>
              {filteredAndSortedProducts.slice(0, 8).map((product) => (
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
                        <span className="text-xl font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
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

          {filteredAndSortedProducts.length > 8 && (
            <div className="text-center mt-8">
              <Link
                href="/parts/accessories?view=all"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Accessories <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
