import { Suspense } from 'react';
import { Product } from '../../../types';
import { getCategoryProducts } from '../../../utils/supabaseQueries';
import Link from 'next/link';
import Image from 'next/image';
import FilterSidebar from '../../../components/Product/FilterSidebar';
import { parseURLToFilters, calculateFilterCounts, getPaginationInfo } from '../../../utils/productFilters';
import { Grid, List, SlidersHorizontal, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

// Professional category loading skeleton
function CategoryLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="h-12 bg-gray-500 rounded w-64 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-500 rounded w-96 mx-auto mb-8 animate-pulse"></div>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="h-8 bg-gray-500 rounded w-32 animate-pulse"></div>
              <div className="h-8 bg-gray-500 rounded w-28 animate-pulse"></div>
              <div className="h-8 bg-gray-500 rounded w-36 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex gap-4">
              <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block w-80">
            <div className="bg-white border border-gray-200 p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>

            {/* Products grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200">
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoryPageProps {
  params: { category: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

// CONFIGURATION - Define all constants first
const SLUG_MAPPING: Record<string, string> = {
  'tools-supplies': 'tools',
  'tools---supplies': 'tools',
  'tools-26-supplies': 'tools',
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

const CATEGORY_CONFIG: Record<string, { title: string; desc: string; gradient: string; features: string[] }> = {
  apple: { title: 'Apple Parts', desc: 'Genuine Apple replacement parts', gradient: 'from-blue-600 to-indigo-800', features: ['Genuine OEM', '180-Day Warranty', 'Fast Shipping'] },
  samsung: { title: 'Samsung Parts', desc: 'Premium Samsung Galaxy parts', gradient: 'from-purple-600 to-pink-800', features: ['Galaxy Compatible', 'Premium Quality', 'Same-Day Shipping'] },
  'google-pixel': { title: 'Google Pixel Parts', desc: 'Original Google Pixel parts', gradient: 'from-green-600 to-teal-800', features: ['Pixel Certified', 'Pure Android', 'Expert Support'] },
  motorola: { title: 'Motorola Parts', desc: 'High-quality Motorola parts', gradient: 'from-red-600 to-orange-800', features: ['Motorola Approved', 'Durable Parts', 'Competitive Pricing'] },
  tools: { title: 'Tools & Supplies', desc: 'Professional repair tools', gradient: 'from-gray-600 to-slate-800', features: ['Professional Grade', 'Durable Tools', 'Complete Kits'] },
  'other-parts': { title: 'Other Parts', desc: 'Miscellaneous parts', gradient: 'from-yellow-600 to-orange-800', features: ['Wide Selection', 'Quality Assured', 'Competitive Prices'] },
  'board-components': { title: 'Board Components', desc: 'Circuit board parts', gradient: 'from-indigo-600 to-purple-800', features: ['High Quality', 'Precise Fit', 'Technical Support'] },
  'game-console': { title: 'Game Console Parts', desc: 'Gaming console parts', gradient: 'from-emerald-600 to-teal-800', features: ['Gaming Optimized', 'Console Compatible', 'Fast Repairs'] },
  accessories: { title: 'Accessories', desc: 'Phone accessories', gradient: 'from-cyan-600 to-blue-800', features: ['Premium Accessories', 'Universal Fit', 'Style & Protection'] },
  refurbishing: { title: 'Refurbishing Services', desc: 'Professional refurbishing', gradient: 'from-violet-600 to-purple-800', features: ['Expert Refurbishing', 'Quality Assurance', 'Warranty Included'] }
};

// UTILITIES - Define helper functions
const sanitizeSlug = (slugArray: string[]) =>
  decodeURIComponent(slugArray.join('/'))
    .replace(/[^\w-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'unknown';

const getNormalizedSlug = (slug: string) => SLUG_MAPPING[slug] || slug;

// STATIC GENERATION
export async function generateStaticParams() {
  const baseSlugs = Object.keys(SLUG_MAPPING);
  return baseSlugs.map((slug) => ({
    category: [slug],
  }));
}

// PERFECT SEO METADATA - Dynamic titles with part counts for #1 rankings
export async function generateMetadata({ params, searchParams }: CategoryPageProps) {
  try {
    const sanitizedSlug = sanitizeSlug(params.category);
    const normalizedSlug = getNormalizedSlug(sanitizedSlug);
    const categoryConfig = CATEGORY_CONFIG[normalizedSlug];

    // Get actual product count for this category
    const urlSearchParams = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) {
          urlSearchParams.set(key, Array.isArray(value) ? value[0] : value);
        }
      });
    }

    const currentFilters = parseURLToFilters(urlSearchParams);
    const { totalCount } = await getCategoryProducts(sanitizedSlug, currentFilters, 1, 1000);

    // Build dynamic SEO-optimized title with part count
    const baseTitle = categoryConfig?.title || sanitizedSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const title = `${baseTitle} Parts - ${totalCount} Available | Nexus Tech Hub`;

    // Dynamic meta description with part count and keywords
    const description = `Browse ${totalCount}+ ${baseTitle.toLowerCase()} parts at Nexus Tech Hub. ${categoryConfig?.desc || 'High-quality replacement parts with 180-day warranty and fast shipping.'} Wholesale pricing available for bulk orders.`;

    // Category-specific keywords
    const categoryKeywords = [
      baseTitle.toLowerCase(),
      `${baseTitle.toLowerCase()} parts`,
      `${baseTitle.toLowerCase()} replacement parts`,
      `${baseTitle.toLowerCase()} repair parts`,
      'OEM parts',
      'genuine parts',
      'wholesale parts',
      'phone parts',
      'tablet parts',
      'repair supplies'
    ].join(', ');

    // Canonical URL construction
    const canonicalUrl = `https://nexus-tech-hub.netlify.app/parts/${params.category.join('/')}`;

    // Category-specific Open Graph image
    const categoryImages = {
      apple: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=1200&h=630&fit=crop',
      samsung: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=1200&h=630&fit=crop',
      'google-pixel': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&h=630&fit=crop',
      motorola: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=1200&h=630&fit=crop',
      tools: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=630&fit=crop',
      accessories: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=630&fit=crop',
      refurbishing: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=630&fit=crop',
      'game-console': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=630&fit=crop',
      'board-components': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&h=630&fit=crop',
      'other-parts': 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&h=630&fit=crop'
    };

    const ogImage = categoryImages[normalizedSlug as keyof typeof categoryImages] || 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=1200&h=630&fit=crop';

    return {
      title,
      description,
      keywords: categoryKeywords,
      authors: [{ name: 'Nexus Tech Hub' }],
      creator: 'Nexus Tech Hub',
      publisher: 'Nexus Tech Hub',
      metadataBase: new URL('https://nexus-tech-hub.netlify.app'),
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: 'Nexus Tech Hub',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${baseTitle} Parts - Nexus Tech Hub`,
            type: 'image/jpeg',
          }
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
        creator: '@nexustechhub',
        site: '@nexustechhub',
      },
      other: {
        'category:part-count': totalCount.toString(),
        'category:name': baseTitle,
        'category:type': 'replacement-parts',
      },
    };
  } catch (error) {
    console.error('Category SEO metadata error:', error);
    // Fallback metadata - never fail
    return {
      title: 'Premium Phone & Tablet Parts | Nexus Tech Hub',
      description: 'Browse our extensive collection of genuine OEM replacement parts for iPhone, Samsung, Google Pixel, and more. 180-day warranty, fast shipping.',
      keywords: 'phone parts, tablet parts, replacement parts, OEM parts, repair parts, wholesale parts',
    };
  }
}

// BULLETPROOF PAGE COMPONENT - Never crashes
async function CategoryPageContent({ params, searchParams }: CategoryPageProps) {
  try {
    // Safely sanitize the slug array
    const sanitizedSlug = sanitizeSlug(params.category);
    const normalizedSlug = getNormalizedSlug(sanitizedSlug);
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
    const currentPage = Math.max(1, parseInt(urlSearchParams.get('page') || '1'));

    // Get products safely - never crashes
    const { products, totalCount } = await getCategoryProducts(sanitizedSlug, currentFilters, currentPage);

    // Calculate filter options safely
    let allProducts: Product[] = [];
    try {
      const result = await getCategoryProducts(sanitizedSlug, currentFilters, 1, 1000);
      allProducts = result.products;
    } catch (error) {
      console.error('Safe filter calculation error:', error);
      allProducts = products;
    }
    const filterOptions = calculateFilterCounts(allProducts);

    // Pagination info
    const paginationInfo = getPaginationInfo(totalCount, currentPage, 24);

    // Create base URL for filters - safe construction
    const baseUrl = `/parts/${params.category.join('/')}`;

    // Category-specific HowTo guides
    const getCategoryHowTo = () => {
      if (normalizedSlug === 'apple') {
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Replace iPhone Screen - Complete Guide",
          "description": "Step-by-step guide to replace any iPhone screen with genuine Apple parts. Includes tools, techniques, and professional tips for successful screen replacement.",
          "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=1200&h=630&fit=crop",
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": "150.00"
          },
          "estimatedTime": {
            "@type": "Duration",
            "description": "45-60 minutes"
          },
          "difficulty": "Intermediate",
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "iPhone Screen Assembly",
              "identifier": "apple-screen-oem"
            },
            {
              "@type": "HowToSupply",
              "name": "Precision Screwdriver Set",
              "identifier": "repair-tools-screwdrivers"
            }
          ],
          "tool": [
            {
              "@type": "HowToTool",
              "name": "iSclack Suction Cup",
              "identifier": "tool-suction-cup"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Power off and remove SIM",
              "text": "Power off your iPhone and remove the SIM card tray.",
              "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop"
            },
            {
              "@type": "HowToStep",
              "name": "Heat the screen edges",
              "text": "Use a heat gun to warm the screen edges for 2-3 minutes to soften adhesive.",
              "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop"
            }
          ]
        };
      }

      if (normalizedSlug === 'samsung') {
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Replace Samsung Galaxy Battery - Complete Guide",
          "description": "Professional guide to replace Samsung Galaxy battery with OEM components. Includes safety precautions and testing procedures.",
          "image": "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=1200&h=630&fit=crop",
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": "80.00"
          },
          "estimatedTime": {
            "@type": "Duration",
            "description": "30-45 minutes"
          },
          "difficulty": "Beginner",
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "Samsung Galaxy Battery",
              "identifier": "samsung-battery-oem"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Power off device",
              "text": "Ensure your Samsung Galaxy is completely powered off before beginning.",
              "image": "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=800&h=600&fit=crop"
            }
          ]
        };
      }

      if (normalizedSlug === 'tools') {
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Use Phone Repair Tools - Complete Guide",
          "description": "Master the essential tools and techniques for professional phone repairs. Learn proper tool usage, safety procedures, and repair best practices.",
          "image": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=630&fit=crop",
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": "200.00"
          },
          "estimatedTime": {
            "@type": "Duration",
            "description": "30 minutes"
          },
          "difficulty": "Beginner",
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "Professional Repair Kit",
              "identifier": "repair-toolkit-pro"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Gather your tools",
              "text": "Assemble all necessary tools: screwdrivers, suction cups, plastic picks, and adhesives.",
              "image": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop"
            },
            {
              "@type": "HowToStep",
              "name": "Learn proper techniques",
              "text": "Study correct tool usage to avoid damaging components or injuring yourself.",
              "image": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop"
            }
          ]
        };
      }

      return null;
    };

    // Generate dynamic BreadcrumbList schema
    const generateBreadcrumbSchema = () => {
      const baseUrl = 'https://nexus-tech-hub.netlify.app';
      const breadcrumbs = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        }
      ];

      // Add Parts as second level
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Parts",
        "item": `${baseUrl}/parts`
      });

      // Handle nested categories
      const categoryPath = params.category;
      if (categoryPath && categoryPath.length > 0) {
        let currentPath = '/parts';
        categoryPath.forEach((segment, index) => {
          currentPath += `/${segment}`;
          const position = 3 + index;

          // Convert slug to readable name
          let displayName = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());

          breadcrumbs.push({
            "@type": "ListItem",
            "position": position,
            "name": displayName,
            "item": `${baseUrl}${currentPath}`
          });
        });
      }

      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs
      };
    };

    const howToSchema = getCategoryHowTo();
    const breadcrumbSchema = generateBreadcrumbSchema();

    return (
      <>
        {/* BreadcrumbList JSON-LD Schema for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />

        {/* HowTo Schema for Category Repair Guides */}
        {howToSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(howToSchema)
            }}
          />
        )}

        <div className="min-h-screen bg-gray-50">
          {/* BULLETPROOF BREADCRUMBS */}
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/parts" className="hover:text-blue-600">Parts</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">
                {categoryConfig?.title || sanitizedSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </nav>
          </div>

          {/* BULLETPROOF HERO BANNER */}
          <div className={`bg-gradient-to-r ${categoryConfig?.gradient || 'from-gray-600 via-gray-700 to-slate-800'} text-white`}>
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  {categoryConfig?.title || sanitizedSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
                  {categoryConfig?.desc || 'High-quality replacement parts for your device'}
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
    console.error('Critical safe page error:', error);

    // BULLETPROOF FALLBACK - Never show blank page or "Something went wrong"
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Parts Category</h1>
            <p className="text-gray-600 mb-8">
              Browse our collection of high-quality replacement parts for phones and tablets.
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

// Export with Suspense wrapper
export default function CategoryPage(props: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryLoadingSkeleton />}>
      <CategoryPageContent {...props} />
    </Suspense>
  );
}
