import { supabaseServer } from '../../lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Package, AlertCircle, RefreshCw } from 'lucide-react';

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// BULLETPROOF SEARCH QUERY - Never crashes
async function searchProducts(query: string, page: number = 1) {
  try {
    const offset = (page - 1) * 24;

    const { data, error, count } = await supabaseServer
      .from('products')
      .select(`
        *,
        brand:brand_id(name, slug),
        category:category_id(name, slug)
      `, { count: 'exact' })
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,sku.ilike.%${query}%,brand.name.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .range(offset, offset + 23);

    if (error) {
      console.error('Supabase search error:', error);
      return {
        products: [],
        total: 0,
        hasMore: false,
        error: 'Database temporarily unavailable'
      };
    }

    const products = data?.map((p: any) => ({
      _id: p.id,
      id: p.id,
      name: p.name || 'Unknown Product',
      price: typeof p.price === 'number' ? p.price : 0,
      image: p.thumbnail_url || p.images?.[0] || '/images/products/placeholder.svg',
      brand: p.brand?.name || 'Generic',
      category: p.category?.name || 'Parts',
      inStock: (p.stock_quantity || 0) > 0,
      slug: p.slug
    })) || [];

    return {
      products,
      total: count || 0,
      hasMore: count ? offset + 24 < count : false,
      error: undefined
    };

  } catch (criticalError) {
    console.error('Critical search error:', criticalError);
    return {
      products: [],
      total: 0,
      hasMore: false,
      error: 'Search service temporarily unavailable'
    };
  }
}

// BULLETPROOF PAGE COMPONENT - Never crashes
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = typeof searchParams.q === 'string' ? searchParams.q.trim() : '';
  const page = parseInt(typeof searchParams.page === 'string' ? searchParams.page : '1') || 1;

  // No search query - show search form
  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Parts</h1>
          <p className="text-gray-600 mb-8">Enter a search term to find parts</p>
          <form action="/search" className="max-w-md mx-auto">
            <div className="relative">
              <input
                name="q"
                placeholder="Search for parts..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2" aria-label="Search">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // BULLETPROOF SEARCH EXECUTION - Never crashes
  let searchResult;
  try {
    searchResult = await searchProducts(query, page);
  } catch (error) {
    console.error('Search page error:', error);
    searchResult = {
      products: [],
      total: 0,
      hasMore: false,
      error: 'Search temporarily unavailable'
    };
  }

  const { products, total, hasMore, error: searchError } = searchResult;

  // Generate BreadcrumbList schema for search results
  const generateBreadcrumbSchema = (query: string) => {
    const baseUrl = 'https://nexus-tech-hub.netlify.app';
    const breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Search Results",
        "item": query ? `${baseUrl}/search?q=${encodeURIComponent(query)}` : `${baseUrl}/search`
      }
    ];

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    };
  };

  return (
    <>
      {/* BreadcrumbList JSON-LD Schema for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(query))
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Search</span>
            </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results for &ldquo;{query}&rdquo;
          </h1>
          <p className="text-gray-600">{total} parts found</p>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ERROR STATE - Professional error handling */}
        {searchError ? (
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Search Temporarily Unavailable</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We&#39;re experiencing technical difficulties. Our search service will be back online shortly.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/parts"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Browse All Parts
              </Link>
            </div>
          </div>
        ) : products.length === 0 ? (
          /* NO RESULTS STATE */
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No parts found for &ldquo;{query}&rdquo;</h2>
            <p className="text-gray-600 mb-8">Try different keywords, check spelling, or browse our categories</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/parts"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Browse All Parts
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* SUCCESS STATE - Show results */
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product: any) => (
                <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
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
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-600">{product.brand}</span>
                      <span className={`text-xs px-2 py-1 rounded ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link href={product.slug ? `/product/${product.slug}` : `/products/${product.id}`} className="hover:text-blue-600">
                        {product.name}
                      </Link>
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">{product.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Load More Results
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
}

// Metadata
export async function generateMetadata({ searchParams }: SearchPageProps) {
  const query = typeof searchParams.q === 'string' ? searchParams.q.trim() : '';
  return {
    title: query ? `Search: ${query} | Nexus Tech Hub` : 'Search Parts | Nexus Tech Hub',
    description: query ? `Find ${query} parts and accessories` : 'Search for parts and accessories',
  };
}
