import { supabaseServer } from '../../../lib/supabase/server';
import { Product, FilterState } from '../../../types';
import Link from 'next/link';
import Image from 'next/image';
import FilterSidebar from '../../../components/Product/FilterSidebar';
import { parseURLToFilters, calculateFilterCounts, getPaginationInfo } from '../../../utils/productFilters';
import { Grid, List, SlidersHorizontal, ArrowRight, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

interface CategoryPageProps {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// BULLETPROOF SLUG MAPPING - Handles any URL safely
const SLUG_MAPPING: Record<string, string> = {
  'tools-&-supplies': 'tools',
  'tools-&-supplies': 'tools', // Handle both with and without encoding
  'apple': 'apple',
  'samsung': 'samsung',
  'google-pixel': 'google-pixel',
  'motorola': 'motorola',
  'other-parts': 'other-parts',
  'board-components': 'board-components',
  'game-console': 'game-console',
  'accessories': 'accessories',
  'refurbishing': 'refurbishing',
};

// BULLETPROOF CATEGORY CONFIG - Never fails
const CATEGORY_CONFIG: Record<string, {
  title: string;
  description: string;
  gradient: string;
  features: string[];
}> = {
  'apple': {
    title: 'Apple Parts',
    description: 'Genuine Apple replacement parts for iPhone, iPad, and Mac',
    gradient: 'from-blue-600 via-blue-700 to-indigo-800',
    features: ['Genuine OEM Parts', '180-Day Warranty', 'Fast Shipping']
  },
  'samsung': {
    title: 'Samsung Parts',
    description: 'Premium Samsung Galaxy replacement parts and accessories',
    gradient: 'from-purple-600 via-purple-700 to-pink-800',
    features: ['Galaxy Compatible', 'Premium Quality', 'Same-Day Shipping']
  },
  'google-pixel': {
    title: 'Google Pixel Parts',
    description: 'Original Google Pixel replacement parts and components',
    gradient: 'from-green-600 via-green-700 to-teal-800',
    features: ['Pixel Certified', 'Pure Android', 'Expert Support']
  },
  'motorola': {
    title: 'Motorola Parts',
    description: 'High-quality Motorola replacement parts for all models',
    gradient: 'from-red-600 via-red-700 to-orange-800',
    features: ['Motorola Approved', 'Durable Parts', 'Competitive Pricing']
  },
  'tools': {
    title: 'Tools & Supplies',
    description: 'Professional repair tools and supplies for technicians',
    gradient: 'from-gray-600 via-gray-700 to-slate-800',
    features: ['Professional Grade', 'Durable Tools', 'Complete Kits']
  },
  'other-parts': {
    title: 'Other Parts',
    description: 'Miscellaneous replacement parts and components',
    gradient: 'from-yellow-600 via-yellow-700 to-orange-800',
    features: ['Wide Selection', 'Quality Assured', 'Competitive Prices']
  },
  'board-components': {
    title: 'Board Components',
    description: 'Circuit board components and electronic parts',
    gradient: 'from-indigo-600 via-indigo-700 to-purple-800',
    features: ['High Quality', 'Precise Fit', 'Technical Support']
  },
  'game-console': {
    title: 'Game Console Parts',
    description: 'Replacement parts for gaming consoles and accessories',
    gradient: 'from-emerald-600 via-emerald-700 to-teal-800',
    features: ['Gaming Optimized', 'Console Compatible', 'Fast Repairs']
  },
  'accessories': {
    title: 'Accessories',
    description: 'Phone and tablet accessories for protection and functionality',
    gradient: 'from-cyan-600 via-cyan-700 to-blue-800',
    features: ['Premium Accessories', 'Universal Fit', 'Style & Protection']
  },
  'refurbishing': {
    title: 'Refurbishing Services',
    description: 'Professional phone and tablet refurbishing services',
    gradient: 'from-violet-600 via-violet-700 to-purple-800',
    features: ['Expert Refurbishing', 'Quality Assurance', 'Warranty Included']
  }
};

// Get normalized category slug
function getNormalizedSlug(slug: string): string {
  // Handle URL decoding issues
  try {
    const decoded = decodeURIComponent(slug);
    return SLUG_MAPPING[decoded] || SLUG_MAPPING[slug] || slug;
  } catch {
    return SLUG_MAPPING[slug] || slug;
  }
}

// BULLETPROOF PRODUCT FETCHING - Never fails
async function getCategoryProducts(categorySlug: string, filters: FilterState, page: number = 1, limit: number = 24) {
  try {
    const normalizedSlug = getNormalizedSlug(categorySlug);
    const categoryConfig = CATEGORY_CONFIG[normalizedSlug];

    let query = supabaseServer
      .from('products')
      .select('*', { count: 'exact' });

    // Base filters - always apply these safely
    query = query.eq('is_active', true);

    // Apply category-specific filtering
    switch (normalizedSlug) {
      case 'apple':
        query = query.ilike('brand_id', '%apple%');
        break;
      case 'samsung':
        query = query.ilike('brand_id', '%samsung%');
        break;
      case 'google-pixel':
        query = query.or('brand_id.ilike.%google%,brand_id.ilike.%pixel%');
        break;
      case 'motorola':
        query = query.ilike('brand_id', '%motorola%');
        break;
      case 'tools':
        query = query.or('category_id.ilike.%tool%,name.ilike.%tool%,name.ilike.%repair%');
        break;
      case 'accessories':
        query = query.ilike('category_id', '%accessor%');
        break;
      case 'refurbishing':
        query = query.or('condition.ilike.%refurbished%,name.ilike.%refurbish%');
        break;
      case 'game-console':
        query = query.or('name.ilike.%console%,name.ilike.%gaming%,category_id.ilike.%game%');
        break;
      case 'board-components':
        query = query.or('name.ilike.%board%,name.ilike.%circuit%,name.ilike.%component%');
        break;
      case 'other-parts':
        // Fallback - show some products, but not too many
        break;
      default:
        // For unknown categories, show some products but limit
        query = query.limit(50);
    }

    // Apply additional filters safely
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
    }
    if (filters.brands?.length > 0) {
      query = query.in('brand_id', filters.brands);
    }
    if (filters.priceRange?.[0] > 0) {
      query = query.gte('price', filters.priceRange[0]);
    }
    if (filters.priceRange?.[1] < 5000) {
      query = query.lte('price', filters.priceRange[1]);
    }
    if (filters.conditions?.length > 0) {
      query = query.in('condition', filters.conditions);
    }

    // Apply sorting
    switch (filters.sort) {
      case 'price-low':
        query = query.order('price', { ascending: true });
        break;
      case 'price-high':
        query = query.order('price', { ascending: false });
        break;
      case 'name':
        query = query.order('name', { ascending: true });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    // Get total count first
    const { count } = await query.select('*', { count: 'exact', head: true });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: products, error } = await query;

    if (error) {
      console.error(`Error fetching ${categorySlug} products:`, error);
      // Return empty but don't crash
      return { products: [], totalCount: 0 };
    }

    const transformedProducts: Product[] = (products || []).map((product: any) => ({
      _id: product.id,
      id: product.id,
      name: product.name || 'Unknown Product',
      price: product.price || 0,
      originalPrice: product.original_price || undefined,
      image: product.thumbnail_url || product.images?.[0] || '/images/products/placeholder.svg',
      gallery: product.images || [],
      category: product.category_id || categorySlug,
      brand: product.brand_id || 'Generic',
      inStock: (product.stock_quantity || 0) > 0,
      description: product.description || product.short_description || '',
      specs: {},
      sku: product.sku || undefined,
      condition: product.condition || 'New',
      carrier: 'Universal',
      stockStatus: (product.stock_quantity || 0) > 0 ? 'In Stock' : 'Out of Stock',
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

    return { products: transformedProducts, totalCount: count || 0 };
  } catch (error) {
    console.error(`Critical error fetching ${categorySlug} products:`, error);
    // NEVER crash - return empty results
    return { products: [], totalCount: 0 };
  }
}

// Generate all possible static params
export async function generateStaticParams() {
  const slugs = Object.keys(SLUG_MAPPING);
  return slugs.map((slug) => ({
    category: slug,
  }));
}

// BULLETPROOF METADATA - Never fails
export async function generateMetadata({ params }: CategoryPageProps) {
  try {
    const normalizedSlug = getNormalizedSlug(params.category);
    const categoryConfig = CATEGORY_CONFIG[normalizedSlug];

    if (categoryConfig) {
      return {
        title: `${categoryConfig.title} | Nexus Tech Hub`,
        description: categoryConfig.description,
        keywords: categoryConfig.features.join(', '),
        openGraph: {
          title: `${categoryConfig.title} | Nexus Tech Hub`,
          description: categoryConfig.description,
          type: 'website',
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  // Fallback metadata - never fail
  return {
    title: 'Parts | Nexus Tech Hub',
    description: 'High-quality replacement parts for phones and tablets',
  };
}

// BULLETPROOF PAGE COMPONENT - Never crashes
export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  try {
    // Safely normalize the slug
    const normalizedSlug = getNormalizedSlug(params.category);
    const categoryConfig = CATEGORY_CONFIG[normalizedSlug];

    // Parse URL params safely
    const urlSearchParams = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) {
          urlSearchParams.set(key, Array.isArray(value) ? value[0] : value);
        }
      });
    }

    const currentFilters = parseURLToFilters(urlSearchParams);
    const currentPage = parseInt(urlSearchParams.get('page') || '1');

    // Get products safely
    const { products, totalCount } = await getCategoryProducts(params.category, currentFilters, currentPage);

    // Calculate filter options safely
    let allProducts: Product[] = [];
    try {
      const result = await getCategoryProducts(params.category, currentFilters, 1, 1000);
      allProducts = result.products;
    } catch (error) {
      console.error('Error getting filter counts:', error);
      allProducts = products;
    }
    const filterOptions = calculateFilterCounts(allProducts);

    // Pagination info
    const paginationInfo = getPaginationInfo(totalCount, currentPage, 24);

    // Create base URL for filters
    const baseUrl = `/parts/${params.category}`;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* BULLETPROOF BREADCRUMBS */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/parts" className="hover:text-blue-600">Parts</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">
              {categoryConfig?.title || normalizedSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </nav>
        </div>

        {/* BULLETPROOF HERO BANNER */}
        <div className={`bg-gradient-to-r ${categoryConfig?.gradient || 'from-gray-600 via-gray-700 to-slate-800'} text-white`}>
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {categoryConfig?.title || normalizedSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
                {categoryConfig?.description || 'High-quality replacement parts for your device'}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {(categoryConfig?.features || ['Quality Parts', 'Fast Shipping', 'Expert Support']).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3"
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls Bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <form method="GET" action={baseUrl} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    name="search"
                    placeholder={`Search ${categoryConfig?.title || 'parts'}...`}
                    defaultValue={currentFilters.search || ''}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {currentFilters.search && (
                    <button
                      type="button"
                      onClick={() => {
                        const newParams = new URLSearchParams(urlSearchParams);
                        newParams.delete('search');
                        window.location.href = `${baseUrl}?${newParams.toString()}`;
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {/* Preserve other filters */}
                  {currentFilters.brands?.length > 0 && (
                    <input type="hidden" name="brands" value={currentFilters.brands.join(',')} />
                  )}
                  {currentFilters.devices?.length > 0 && (
                    <input type="hidden" name="devices" value={currentFilters.devices.join(',')} />
                  )}
                  {currentFilters.partTypes?.length > 0 && (
                    <input type="hidden" name="partTypes" value={currentFilters.partTypes.join(',')} />
                  )}
                  {currentFilters.conditions?.length > 0 && (
                    <input type="hidden" name="conditions" value={currentFilters.conditions.join(',')} />
                  )}
                  {currentFilters.priceRange?.[0] > 0 && (
                    <input type="hidden" name="minPrice" value={currentFilters.priceRange[0]} />
                  )}
                  {currentFilters.priceRange?.[1] < 5000 && (
                    <input type="hidden" name="maxPrice" value={currentFilters.priceRange[1]} />
                  )}
                  {currentFilters.sort !== 'newest' && (
                    <input type="hidden" name="sort" value={currentFilters.sort} />
                  )}
                </form>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <select
                    name="sort"
                    defaultValue={currentFilters.sort || 'newest'}
                    onChange={(e) => {
                      const newParams = new URLSearchParams(urlSearchParams);
                      newParams.set('sort', e.target.value);
                      window.location.href = `${baseUrl}?${newParams.toString()}`;
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-md">
                  <Link
                    href={`${baseUrl}?${urlSearchParams.toString().replace('&view=list', '').replace('view=list', '')}${urlSearchParams.toString().includes('?') ? '&' : '?'}view=grid`}
                    className={`p-2 ${!urlSearchParams.get('view') || urlSearchParams.get('view') === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`${baseUrl}?${urlSearchParams.toString()}${urlSearchParams.toString().includes('?') ? '&' : '?'}view=list`}
                    className={`p-2 ${urlSearchParams.get('view') === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </Link>
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
                currentFilters={currentFilters}
                baseUrl={baseUrl}
                className="sticky top-6"
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="flex items-center justify-between mb-6">
                <button
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg"
                  aria-label="Open filters"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                {/* Results Header */}
                <div className="text-sm text-gray-600">
                  {totalCount} {categoryConfig?.title.toLowerCase() || 'parts'} found
                </div>
              </div>

              {/* Products Grid */}
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Grid className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    We're currently updating our {categoryConfig?.title.toLowerCase() || 'parts'} inventory.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link
                      href="/parts"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Browse All Parts
                    </Link>
                    <Link
                      href="/"
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className={`grid gap-6 ${
                    urlSearchParams.get('view') === 'list'
                      ? 'grid-cols-1'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  }`}>
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${
                          urlSearchParams.get('view') === 'list' ? 'flex' : ''
                        }`}
                      >
                        {/* Product Image */}
                        <div className={`relative ${urlSearchParams.get('view') === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
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
                            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-bold">
                              NEW
                            </div>
                          )}
                          {(product.discountPercentage || 0) > 0 && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                              -{product.discountPercentage}%
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className={`p-4 ${urlSearchParams.get('view') === 'list' ? 'flex-1' : ''}`}>
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
                            <Link
                              href={product.slug ? `/product/${product.slug}` : `/products/${product.id}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {product.name}
                            </Link>
                          </h3>

                          {urlSearchParams.get('view') === 'list' && (
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
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {paginationInfo.totalPages > 1 && (
                    <div className="flex items-center justify-center mt-8 space-x-2">
                      {/* Previous */}
                      {paginationInfo.hasPrevPage && (
                        <Link
                          href={`${baseUrl}?${new URLSearchParams({
                            ...Object.fromEntries(urlSearchParams.entries()),
                            page: (currentPage - 1).toString()
                          }).toString()}`}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Link>
                      )}

                      {/* Page Numbers */}
                      {Array.from({ length: Math.min(5, paginationInfo.totalPages) }, (_, i) => {
                        const pageNum = Math.max(1, Math.min(paginationInfo.totalPages - 4, currentPage - 2)) + i;
                        if (pageNum > paginationInfo.totalPages) return null;

                        const isActive = pageNum === currentPage;
                        return (
                          <Link
                            key={pageNum}
                            href={`${baseUrl}?${new URLSearchParams({
                              ...Object.fromEntries(urlSearchParams.entries()),
                              page: pageNum.toString()
                            }).toString()}`}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </Link>
                        );
                      })}

                      {/* Next */}
                      {paginationInfo.hasNextPage && (
                        <Link
                          href={`${baseUrl}?${new URLSearchParams({
                            ...Object.fromEntries(urlSearchParams.entries()),
                            page: (currentPage + 1).toString()
                          }).toString()}`}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Critical page error:', error);

    // BULLETPROOF FALLBACK - Never show blank page
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Temporarily Unavailable</h1>
            <p className="text-gray-600 mb-8">
              We're currently updating this category. Please check back soon or browse our other parts.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/parts"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse All Parts
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
