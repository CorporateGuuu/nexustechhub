import { supabaseServer } from '../../../../lib/supabase/server';
import { Product, FilterState } from '../../../../types';
import Link from 'next/link';
import Image from 'next/image';
import FilterSidebar from '../../../../components/Product/FilterSidebar';
import { parseURLToFilters, calculateFilterCounts, getPaginationInfo } from '../../../../utils/productFilters';
import { Grid, List, SlidersHorizontal, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { notFound } from 'next/navigation';

interface SubCategoryPageProps {
  params: { main: string; sub: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Subcategory configuration
const subcategoryConfig: Record<string, Record<string, {
  title: string;
  description: string;
  keywords: string[];
}>> = {
  'chargers-cables': {
    'usb-c-cables': {
      title: 'USB-C Cables',
      description: 'High-speed USB-C charging and data cables for modern devices',
      keywords: ['USB-C cables', 'Type-C cables', 'fast charging cables', 'USB-C data cables']
    },
    'lightning-cables': {
      title: 'Lightning Cables',
      description: 'Original Apple Lightning cables for iPhone and iPad charging',
      keywords: ['Lightning cables', 'iPhone cables', 'Apple Lightning', 'iPad cables']
    },
    'wall-chargers': {
      title: 'Wall Chargers',
      description: 'Fast wall chargers and adapters for all your devices',
      keywords: ['wall chargers', 'fast chargers', 'USB chargers', 'power adapters']
    },
    'wireless-chargers': {
      title: 'Wireless Chargers',
      description: 'Qi wireless charging pads and stands',
      keywords: ['wireless chargers', 'Qi charging', 'wireless charging pads', 'wireless stands']
    },
    'car-chargers': {
      title: 'Car Chargers',
      description: 'USB car chargers and adapters for on-the-go charging',
      keywords: ['car chargers', 'USB car adapters', 'auto chargers', 'car USB']
    }
  },
  'cases-protection': {
    'iphone-cases': {
      title: 'iPhone Cases',
      description: 'Protective cases for all iPhone models',
      keywords: ['iPhone cases', 'iPhone protection', 'iPhone covers', 'phone cases']
    },
    'screen-protectors': {
      title: 'Screen Protectors',
      description: 'Tempered glass and film screen protectors',
      keywords: ['screen protectors', 'tempered glass', 'screen protectors', 'phone screen protection']
    },
    'samsung-cases': {
      title: 'Samsung Cases',
      description: 'Protective cases for Samsung Galaxy devices',
      keywords: ['Samsung cases', 'Galaxy cases', 'Samsung protection', 'Galaxy covers']
    },
    'pop-sockets': {
      title: 'PopSockets',
      description: 'Grip stands and phone accessories',
      keywords: ['PopSockets', 'phone grips', 'phone stands', 'PopSocket accessories']
    }
  },
  'audio': {
    'bluetooth-earbuds': {
      title: 'Bluetooth Earbuds',
      description: 'Wireless earbuds and true wireless earphones',
      keywords: ['Bluetooth earbuds', 'wireless earbuds', 'true wireless', 'TWS earbuds']
    },
    'wired-earbuds': {
      title: 'Wired Earbuds',
      description: 'High-quality wired earphones and headphones',
      keywords: ['wired earbuds', 'wired headphones', 'earphones', 'headphones']
    },
    'bluetooth-speakers': {
      title: 'Bluetooth Speakers',
      description: 'Portable wireless Bluetooth speakers',
      keywords: ['Bluetooth speakers', 'wireless speakers', 'portable speakers', 'Bluetooth audio']
    }
  },
  'mounts-holders': {
    'phone-mounts': {
      title: 'Phone Mounts',
      description: 'Car mounts, desk stands, and phone holders',
      keywords: ['phone mounts', 'car mounts', 'phone stands', 'phone holders']
    },
    'tablet-mounts': {
      title: 'Tablet Mounts',
      description: 'Tablet stands and mounts for home and travel',
      keywords: ['tablet mounts', 'tablet stands', 'iPad mounts', 'tablet holders']
    }
  },
  'gaming-others': {
    'gaming-controllers': {
      title: 'Gaming Controllers',
      description: 'Game controllers and gaming accessories',
      keywords: ['gaming controllers', 'game controllers', 'gaming accessories', 'console controllers']
    },
    'styluses': {
      title: 'Styluses',
      description: 'Digital styluses for tablets and touchscreens',
      keywords: ['styluses', 'digital pens', 'tablet pens', 'stylus pens']
    },
    'memory-cards': {
      title: 'Memory Cards',
      description: 'MicroSD and SD memory cards for storage expansion',
      keywords: ['memory cards', 'microSD', 'SD cards', 'storage cards']
    }
  }
};

// Get products for a subcategory with filters applied
async function getSubCategoryProducts(mainCategory: string, subCategory: string, filters: FilterState, page: number = 1, limit: number = 24) {
  let query = supabaseServer
    .from('products')
    .select('*', { count: 'exact' });

  // Base filters
  query = query.eq('is_active', true);

  // Filter by main category (accessories)
  query = query.ilike('category_id', '%accessor%');

  // Filter by subcategory based on main/sub combination
  switch (`${mainCategory}/${subCategory}`) {
    case 'chargers-cables/usb-c-cables':
      query = query.or('name.ilike.%usb-c%,name.ilike.%type-c%,name.ilike.%usb c%');
      break;
    case 'chargers-cables/lightning-cables':
      query = query.ilike('name', '%lightning%');
      break;
    case 'chargers-cables/wall-chargers':
      query = query.or('name.ilike.%charger%,name.ilike.%adapter%,name.ilike.%wall%');
      break;
    case 'chargers-cables/wireless-chargers':
      query = query.or('name.ilike.%wireless%,name.ilike.%qi%');
      break;
    case 'chargers-cables/car-chargers':
      query = query.or('name.ilike.%car%,name.ilike.%auto%');
      break;
    case 'cases-protection/iphone-cases':
      query = query.or('name.ilike.%iphone case%,name.ilike.%iPhone case%');
      break;
    case 'cases-protection/screen-protectors':
      query = query.or('name.ilike.%screen protector%,name.ilike.%tempered glass%');
      break;
    case 'cases-protection/samsung-cases':
      query = query.or('name.ilike.%samsung case%,name.ilike.%galaxy case%');
      break;
    case 'cases-protection/pop-sockets':
      query = query.ilike('name', '%popsocket%');
      break;
    case 'audio/bluetooth-earbuds':
      query = query.or('name.ilike.%earbud%,name.ilike.%ear bud%');
      break;
    case 'audio/wired-earbuds':
      query = query.or('name.ilike.%wired%,name.ilike.%headphone%');
      break;
    case 'audio/bluetooth-speakers':
      query = query.ilike('name', '%speaker%');
      break;
    case 'mounts-holders/phone-mounts':
      query = query.or('name.ilike.%mount%,name.ilike.%holder%,name.ilike.%stand%');
      break;
    case 'mounts-holders/tablet-mounts':
      query = query.or('name.ilike.%tablet mount%,name.ilike.%tablet stand%');
      break;
    case 'gaming-others/gaming-controllers':
      query = query.ilike('name', '%controller%');
      break;
    case 'gaming-others/styluses':
      query = query.ilike('name', '%stylus%');
      break;
    case 'gaming-others/memory-cards':
      query = query.or('name.ilike.%memory card%,name.ilike.%microSD%,name.ilike.%SD card%');
      break;
    default:
      // If no specific mapping, try to match by name
      query = query.ilike('name', `%${subCategory.replace('-', ' ')}%`);
  }

  // Apply additional filters
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
    console.error(`Error fetching ${mainCategory}/${subCategory} products:`, error);
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
    category: product.category_id || subCategory,
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

export async function generateStaticParams() {
  const params: { main: string; sub: string }[] = [];

  Object.entries(subcategoryConfig).forEach(([main, subs]) => {
    Object.keys(subs).forEach(sub => {
      params.push({ main, sub });
    });
  });

  return params;
}

export async function generateMetadata({ params }: SubCategoryPageProps) {
  const subConfig = subcategoryConfig[params.main]?.[params.sub];

  if (!subConfig) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${subConfig.title} | Nexus Tech Hub`,
    description: subConfig.description,
    keywords: subConfig.keywords.join(', '),
    openGraph: {
      title: `${subConfig.title} | Nexus Tech Hub`,
      description: subConfig.description,
      type: 'website',
    },
  };
}

export default async function SubCategoryPage({ params, searchParams }: SubCategoryPageProps) {
  const subConfig = subcategoryConfig[params.main]?.[params.sub];

  if (!subConfig) {
    notFound();
  }

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
  const { products, totalCount } = await getSubCategoryProducts(params.main, params.sub, currentFilters, currentPage);

  // Calculate filter options
  let allProducts: Product[] = [];
  try {
    const result = await getSubCategoryProducts(params.main, params.sub, currentFilters, 1, 1000);
    allProducts = result.products;
  } catch (error) {
    console.error('Error getting all products for filter counts:', error);
    allProducts = products;
  }
  const filterOptions = calculateFilterCounts(allProducts);

  // Pagination info
  const paginationInfo = getPaginationInfo(totalCount, currentPage, 24);

  // Create base URL for filters
  const baseUrl = `/accessories/${params.main}/${params.sub}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/parts/accessories" className="hover:text-blue-600">Accessories</Link>
          <span className="mx-2">/</span>
          <Link href={`/accessories/${params.main}`} className="hover:text-blue-600">
            {params.main.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{subConfig.title}</span>
        </nav>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {subConfig.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              {subConfig.description}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>180-Day Warranty</span>
              </div>
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
                  placeholder={`Search ${subConfig.title.toLowerCase()}...`}
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
                {totalCount} {subConfig.title.toLowerCase()} found
              </div>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Grid className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">We're currently updating our {subConfig.title.toLowerCase()} inventory.</p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href={`/accessories/${params.main}`}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse All {params.main.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                  <Link
                    href="/parts"
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View All Parts
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
}
