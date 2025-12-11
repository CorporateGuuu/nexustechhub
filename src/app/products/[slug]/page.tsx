import { Suspense } from 'react';
import ProductDetail from 'src/components/Product/ProductDetail';
import { supabaseServer } from '../../../lib/supabase/server';
import { Product } from 'src/types';

// Beautiful, professional loading skeleton component
function ProductLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb skeleton */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>

      {/* Main product section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image gallery skeleton */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
              {/* Zoom indicator */}
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs opacity-50">
                <div className="w-8 h-3 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Thumbnail gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse ${
                    i === 0 ? 'ring-2 ring-blue-300 shadow-md' : ''
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Product details skeleton */}
          <div className="space-y-6">
            {/* Header section */}
            <div className="space-y-3">
              <div className="h-9 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse"></div>
              <div className="flex items-center gap-4">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Pricing section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-24 animate-pulse"></div>
                <div className="h-7 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-6 bg-red-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>

            {/* Stock status & rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-yellow-200 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="h-4 bg-gray-300 rounded w-12 animate-pulse ml-1"></div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-24 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>

            {/* Add to cart section */}
            <div className="space-y-4">
              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <div className="px-3 py-2 bg-gray-100 animate-pulse">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-16 text-center border-x border-gray-200 py-2">
                    <div className="h-4 bg-gray-300 rounded w-6 mx-auto animate-pulse"></div>
                  </div>
                  <div className="px-3 py-2 bg-gray-100 animate-pulse">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Add to cart button */}
              <div className="w-full bg-gradient-to-r from-blue-400 to-blue-300 rounded-lg py-4 px-6 animate-pulse">
                <div className="h-6 bg-white/50 rounded w-32 mx-auto animate-pulse"></div>
              </div>
            </div>

            {/* Reviews section */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-yellow-200 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="h-6 bg-gray-200 rounded w-8 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Specifications skeleton */}
        <div className="mt-16">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-32 animate-pulse"></div>
            </div>
            <div className="divide-y divide-gray-100">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`p-4 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products skeleton */}
        <div className="mt-16">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-48 animate-pulse mb-8"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile sticky cart skeleton */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-1">
            <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-16 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-200 rounded">
              <div className="px-3 py-2 bg-gray-100 animate-pulse">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="px-3 py-2 border-x border-gray-200">
                <div className="h-4 bg-gray-300 rounded w-3 animate-pulse"></div>
              </div>
              <div className="px-3 py-2 bg-gray-100 animate-pulse">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-300 rounded-lg px-6 py-3 animate-pulse">
              <div className="h-5 bg-white/50 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product not found component
function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            The product you're looking for doesn't exist or may have been removed.
          </p>
        </div>
        <div className="space-y-3">
          <a
            href="/parts"
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Browse All Parts
          </a>
          <a
            href="/"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

// Error component - never shows "Something went wrong"
function ProductError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Temporarily Unavailable</h1>
          <p className="text-gray-600 mb-6">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            We're experiencing technical difficulties. Please try again later.
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Try Again
          </button>
          <a
            href="/parts"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Browse All Parts
          </a>
        </div>
      </div>
    </div>
  );
}

// Get product from Supabase by slug - bulletproof version
async function getProductBySlug(slug: string): Promise<{ product: Product | null; error: string | null }> {
  try {
    // Validate slug
    if (!slug || typeof slug !== 'string' || slug.length === 0) {
      return { product: null, error: 'Invalid product slug' };
    }

    // Query Supabase with timeout protection
    const { data: product, error } = await Promise.race([
      supabaseServer
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database timeout')), 10000)
      )
    ]) as any;

    if (error) {
      console.error('Supabase error:', error);
      return { product: null, error: 'Database error' };
    }

    if (!product) {
      return { product: null, error: 'Product not found' };
    }

    const prod = product as any;

    // Validate required fields
    if (!prod.name || typeof prod.price !== 'number') {
      console.error('Invalid product data:', prod);
      return { product: null, error: 'Invalid product data' };
    }

    // Convert Supabase product to Product format with safe defaults
    const safeProduct: Product = {
      _id: prod.id?.toString() || '',
      id: prod.id?.toString() || '',
      name: prod.name || 'Unknown Product',
      price: Math.max(0, prod.price || 0),
      originalPrice: typeof prod.original_price === 'number' && prod.original_price > 0 ? prod.original_price : undefined,
      image: prod.thumbnail_url || prod.images?.[0] || '/images/products/placeholder.svg',
      gallery: Array.isArray(prod.images) ? prod.images.filter(Boolean) : [prod.thumbnail_url].filter(Boolean),
      category: prod.category_id || 'parts',
      brand: prod.brand_id || 'Generic',
      inStock: (prod.stock_quantity || 0) > 0,
      description: prod.description || prod.short_description || 'No description available',
      sku: prod.sku || '',
      specs: prod.specifications || {},
      discountPercentage: prod.discount_percentage || 0,
      slug: prod.slug || slug,
    };

    return { product: safeProduct, error: null };

  } catch (error) {
    console.error('Critical error fetching product:', error);
    return { product: null, error: 'Critical error' };
  }
}

// Generate static params - safe version
export async function generateStaticParams() {
  try {
    const { data: products, error } = await supabaseServer
      .from('products')
      .select('slug')
      .not('slug', 'is', null)
      .limit(100);

    if (error) {
      console.error('Error in generateStaticParams:', error);
      return [];
    }

    return (products || [])
      .filter((product: any) => product.slug && typeof product.slug === 'string')
      .map((product: any) => ({ slug: product.slug }));

  } catch (error) {
    console.error('Critical error in generateStaticParams:', error);
    return [];
  }
}

// Main page component - bulletproof version
export default async function ProductPage({
  params
}: {
  params: { slug: string }
}) {
  try {
    // Validate params
    if (!params?.slug) {
      return <ProductNotFound />;
    }

    // Get product with error handling
    const { product, error } = await getProductBySlug(params.slug);

    // Handle different error states
    if (error === 'Product not found') {
      return <ProductNotFound />;
    }

    if (error || !product) {
      return <ProductError />;
    }

    // Success - render product
    return (
      <Suspense fallback={<ProductLoadingSkeleton />}>
        <ProductDetail product={product} />
      </Suspense>
    );

  } catch (error) {
    console.error('Critical error in ProductPage:', error);
    return <ProductError />;
  }
}
