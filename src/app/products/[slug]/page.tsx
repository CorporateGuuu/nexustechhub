import { Suspense } from 'react';
import ProductDetail from 'src/components/Product/ProductDetail';
import { supabaseServer } from '../../../lib/supabase/server';
import { Product } from 'src/types';

// Loading skeleton component
function ProductLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>

            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>

            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>

            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
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
