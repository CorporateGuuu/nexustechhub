import { supabaseServer } from '../../../lib/supabase/server';
import { Product, FilterState } from '../../../types';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '../../../components/Breadcrumb';
import FilterSidebar from '../../../components/Product/FilterSidebar';
import { parseURLToFilters, calculateFilterCounts, getPaginationInfo, getPageItems, buildSupabaseQuery } from '../../../utils/productFilters';
import { Grid, List, SlidersHorizontal, ArrowRight, ChevronLeft, ChevronRight, Cpu } from 'lucide-react';

interface BoardComponentsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// Get Board-Level Components from Supabase
async function getBoardComponentsProducts(filters: FilterState, page: number = 1, limit: number = 24) {
  let query = supabaseServer
    .from('products')
    .select('*', { count: 'exact' });

  // Apply filters
  query = buildSupabaseQuery(query, filters);

  // Filter for board-level components (tags include board, ic, flex, pmic, daughterboard)
  query = query.or('tags.cs.{board},tags.cs.{ic},tags.cs.{flex},tags.cs.{pmic},tags.cs.{daughterboard}');

  // Get total count first
  const { count } = await query.select('*', { count: 'exact', head: true });

  // Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data: products, error } = await query;

  if (error) {
    console.error('Error fetching board components products:', error);
    return { products: [], totalCount: 0 };
  }

  const transformedProducts: Product[] = (products || []).map((product: any) => ({
    _id: product.id,
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.original_price || undefined,
    image: product.thumbnail_url || product.images?.[0] || '/images/products/placeholder.svg',
    gallery: product.images || [],
    category: product.category_id || 'board-components',
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

  return { products: transformedProducts, totalCount: count || 0 };
}

export async function generateMetadata() {
  return {
    title: 'Board-Level Components | IC Chips, Flex Cables, Daughterboards | Nexus Tech Hub',
    description: 'Premium board-level components including IC chips, flex cables, PMICs, and daughterboards. Professional-grade electronics components with fast shipping.',
    keywords: 'board components, IC chips, flex cables, daughterboards, PMIC, electronics components',
    openGraph: {
      title: 'Board-Level Components | IC Chips, Flex Cables, Daughterboards | Nexus Tech Hub',
      description: 'Premium board-level components for professional repairs with fast shipping.',
      type: 'website',
    },
  };
}

export default async function BoardComponentsPage({ searchParams }: BoardComponentsPageProps) {
  // Parse URL params for filters
  const urlSearchParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      urlSearchParams.set(key, Array.isArray(value) ? value[0] : value);
    }
  });

  const currentFilters = parseURLToFilters(urlSearchParams);
  const currentPage = parseInt(urlSearchParams.get('page') || '1');

  // Get filtered products with pagination
  const { products, totalCount } = await getBoardComponentsProducts(currentFilters, currentPage);

  // Calculate filter options
  let allProducts: Product[] = [];
  try {
    const result = await getBoardComponentsProducts(currentFilters, 1, 1000);
    allProducts = result.products;
  } catch (error) {
    console.error('Error getting all products for filter counts:', error);
    allProducts = products;
  }
  const filterOptions = calculateFilterCounts(allProducts);

  // Pagination info
  const paginationInfo = getPaginationInfo(totalCount, currentPage, 24);

  // Create base URL for filters
  const baseUrl = '/parts/board-components';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Parts', href: '/parts' },
          { label: 'Board-Level Components' }
        ]} />
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Board-Level Components
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
              IC Chips • Flex Cables • Daughterboards • Professional Grade • Fast USA Shipping • Expert Support
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Cpu className="w-5 h-5" />
                <span>IC Chips & Processors</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Cpu className="w-5 h-5" />
                <span>Flex Cables</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <Cpu className="w-5 h-5" />
                <span>Daughterboards</span>
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

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {totalCount} board component{totalCount !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No board components found</h3>
                <p className="text-gray-600 mb-6">We're currently updating our board-level components inventory.</p>
                <Link
                  href="/parts"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse All Parts <ArrowRight className="w-4 h-4" />
                </Link>
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
}
