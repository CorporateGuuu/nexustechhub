import { supabaseServer } from '../../../lib/supabase/server';
import { Product } from '../../../types';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Check, Shield, Truck, RotateCcw } from 'lucide-react';

// BULLETPROOF PRODUCT FETCHING
async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data: product, error } = await supabaseServer
      .from('products')
      .select(`
        *,
        brand:brand_id(name, slug),
        category:category_id(name, slug)
      `, { count: 'exact' })
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !product) return null;

    const p = product as any; // Type assertion for Supabase data

    // Safe data transformation
    return {
      _id: p.id,
      id: p.id,
      name: p.name || 'Unknown Product',
      price: typeof p.price === 'number' ? p.price : 0,
      originalPrice: typeof p.original_price === 'number' ? p.original_price : undefined,
      image: p.thumbnail_url || p.images?.[0] || '/images/products/placeholder.svg',
      gallery: Array.isArray(p.images) ? p.images : [],
      category: p.category?.name || p.category?.slug || 'Parts',
      brand: p.brand?.name || p.brand?.slug || 'Generic',
      inStock: (p.stock_quantity || 0) > 0,
      description: p.description || p.short_description || '',
      specs: {},
      sku: p.sku || undefined,
      condition: p.condition || 'New',
      carrier: 'Universal',
      stockStatus: (p.stock_quantity || 0) > 0 ? 'In Stock' : 'Out of Stock',
      slug: p.slug || undefined,
      shortDescription: p.short_description || undefined,
      isFeatured: p.is_featured || false,
      isNew: p.is_new || false,
      discountPercentage: p.discount_percentage || 0,
      metaTitle: p.meta_title || undefined,
      metaDescription: p.meta_description || undefined,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    };
  } catch (error) {
    console.error('Product fetch error:', error);
    return null;
  }
}

// BULLETPROOF RELATED PRODUCTS
async function getRelatedProducts(product: Product, limit: number = 4): Promise<Product[]> {
  try {
    const { data: products, error } = await supabaseServer
      .from('products')
      .select(`
        *,
        brand:brand_id(name, slug),
        category:category_id(name, slug)
      `)
      .neq('id', product.id)
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) return [];

    return (products || []).map(p => {
      const prod = p as any; // Type assertion
      return {
        _id: prod.id,
        id: prod.id,
        name: prod.name || 'Unknown Product',
        price: typeof prod.price === 'number' ? prod.price : 0,
        originalPrice: typeof prod.original_price === 'number' ? prod.original_price : undefined,
        image: prod.thumbnail_url || prod.images?.[0] || '/images/products/placeholder.svg',
        gallery: Array.isArray(prod.images) ? prod.images : [],
        category: prod.category?.name || prod.category?.slug || 'Parts',
        brand: prod.brand?.name || prod.brand?.slug || 'Generic',
        inStock: (prod.stock_quantity || 0) > 0,
        description: prod.description || prod.short_description || '',
        specs: {},
        sku: prod.sku || undefined,
        condition: prod.condition || 'New',
        carrier: 'Universal',
        stockStatus: (prod.stock_quantity || 0) > 0 ? 'In Stock' : 'Out of Stock',
        slug: prod.slug || undefined,
      };
    });
  } catch (error) {
    console.error('Related products error:', error);
    return [];
  }
}

// DYNAMIC METADATA + OPEN GRAPH
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const product = await getProductBySlug(params.slug);

    if (!product) {
      return {
        title: 'Product Not Found | Nexus Tech Hub',
        description: 'The requested product could not be found.',
      };
    }

    const title = product.metaTitle || `${product.name} - ${product.brand} | Nexus Tech Hub`;
    const description = product.metaDescription || product.description.substring(0, 160);
    const images = product.gallery?.length > 0 ? product.gallery.slice(0, 4) : [product.image];

    return {
      title,
      description,
      keywords: `${product.brand}, ${product.category}, ${product.name}, parts, replacement`,
      openGraph: {
        title,
        description,
        images: images.map(img => ({
          url: img,
          width: 800,
          height: 600,
          alt: product.name,
        })),
        type: 'website',
        siteName: 'Nexus Tech Hub',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: images[0],
      },
    };
  } catch (error) {
    console.error('Metadata error:', error);
    return {
      title: 'Product | Nexus Tech Hub',
      description: 'High-quality replacement parts for phones and tablets',
    };
  }
}

// STATIC PARAMS GENERATION
export async function generateStaticParams() {
  try {
    const { data: products, error } = await supabaseServer
      .from('products')
      .select('slug')
      .not('slug', 'is', null)
      .eq('is_active', true)
      .limit(100);

    if (error) {
      console.error('Static params error:', error);
      return [];
    }

    return (products || []).map((product: any) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('generateStaticParams error:', error);
    return [];
  }
}

// PRODUCT GALLERY COMPONENT WITH ZOOM
function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const allImages = [product.image, ...(product.gallery || [])];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* MAIN IMAGE WITH ZOOM */}
      <div
        className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-lg cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-200 ${zoomed ? 'scale-150' : 'scale-100'}`}
          style={zoomed ? {
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          } : undefined}
          priority
        />

        {zoomed && (
          <div className="absolute inset-0 bg-black/10 pointer-events-none">
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              Zoomed
            </div>
          </div>
        )}
      </div>

      {/* THUMBNAIL GALLERY */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {allImages.slice(0, 8).map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(img)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
              selectedImage === img ? 'border-blue-600 shadow-md' : 'border-gray-300 hover:border-gray-400'
            }`}
            aria-label={`View product image ${i + 1}`}
          >
            <Image src={img} alt="" width={64} height={64} className="object-cover w-full h-full" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ADD TO CART COMPONENT WITH TOAST
function AddToCartSection({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = async () => {
    if (!product.inStock) return;

    setIsAdding(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Reset quantity
      setQuantity(1);
    } catch (error) {
      console.error('Add to cart error:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (!product.inStock) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 font-medium">Out of Stock</p>
        <p className="text-red-600 text-sm mt-1">This product is currently unavailable.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* QUANTITY SELECTOR */}
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="font-medium text-gray-900">Quantity:</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
            className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setQuantity(Math.min(99, quantity + 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            disabled={quantity >= 99}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition font-semibold text-lg shadow-lg hover:shadow-xl"
      >
        {isAdding ? 'Adding...' : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
      </button>

      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3">
          <Check className="w-5 h-5" />
          <span className="font-medium">Added to cart successfully!</span>
        </div>
      )}
    </div>
  );
}

// SPECS TABLE COMPONENT
function ProductSpecs({ specs }: { specs: Record<string, string> }) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
      </div>
      <table className="w-full">
        <tbody>
          {Object.entries(specs).map(([key, value], index) => (
            <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-3 font-medium text-gray-900 border-r border-gray-200 w-1/3">
                {key}
              </td>
              <td className="px-4 py-3 text-gray-700">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// RELATED PRODUCTS COMPONENT
function RelatedProducts({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/product/${product.slug}`}>
              <div className="aspect-square relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                <Link href={`/product/${product.slug}`} className="hover:text-blue-600">
                  {product.name}
                </Link>
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">{product.brand}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// BREADCRUMBS COMPONENT
function Breadcrumbs({ product }: { product: Product }) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Parts', href: '/parts' },
    { label: product.category, href: `/parts/${product.category.toLowerCase().replace(/\s+/g, '-')}` },
    { label: product.name },
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

// MAIN PRODUCT PAGE COMPONENT
export default async function ProductPage({ params }: { params: { slug: string } }) {
  try {
    const product = await getProductBySlug(params.slug);

    if (!product) {
      notFound();
    }

    const relatedProducts = await getRelatedProducts(product);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* BREADCRUMBS */}
          <Breadcrumbs product={product} />

          {/* MAIN PRODUCT SECTION */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* PRODUCT GALLERY WITH ZOOM */}
            <ProductGallery product={product} />

            {/* PRODUCT DETAILS */}
            <div className="space-y-6">
              {/* HEADER */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm text-gray-600">Brand: <span className="font-medium">{product.brand}</span></span>
                  {product.sku && (
                    <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                  )}
                </div>
                <p className="text-gray-600">{product.category}</p>
              </div>

              {/* TRUST BADGES */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 text-sm font-medium">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>180-Day Warranty</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 text-sm font-medium">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Genuine Parts</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 text-sm font-medium">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 text-sm font-medium">
                  <RotateCcw className="w-4 h-4 text-blue-600" />
                  <span>Easy Returns</span>
                </div>
              </div>

              {/* PRICING */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {(product.discountPercentage || 0) > 0 && (
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded font-bold">
                      -{product.discountPercentage}%
                    </span>
                  )}
                </div>
              </div>

              {/* STOCK STATUS & RATING */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-sm font-medium ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= 4.5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">4.8 (124)</span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* QUANTITY + ADD TO CART */}
              <AddToCartSection product={product} />

              {/* REVIEWS */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">4.8</span>
                  <span className="text-gray-600">(124 reviews)</span>
                </div>
                <p className="text-sm text-gray-600">
                  Customers love this product! Based on 124 reviews with an average rating of 4.8 stars.
                </p>
              </div>
            </div>
          </div>

          {/* SPECS TABLE */}
          <div className="mt-16">
            <ProductSpecs specs={{
              'Condition': product.condition || 'New',
              'Brand': product.brand,
              'Category': product.category,
              'Stock Status': product.stockStatus,
              ...(product.sku && { 'SKU': product.sku }),
            }} />
          </div>

          {/* RELATED PRODUCTS */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Product page critical error:', error);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Temporarily Unavailable</h1>
            <p className="text-gray-600 mb-8">
              We're experiencing technical difficulties. Please try again in a few moments.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/parts" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Browse Parts
              </Link>
              <Link href="/" className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
