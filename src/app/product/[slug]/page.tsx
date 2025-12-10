import ProductDetail from '../../../components/Product/ProductDetail';
import { supabaseServer } from '../../../lib/supabase/server';
import { Product } from '../../../types';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Get product by slug
async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data: product, error } = await supabaseServer
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !product) return null;

  // Convert Supabase product to Product type
  return {
    _id: product.id,
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.original_price || undefined,
    image: product.thumbnail_url || product.images?.[0] || '/placeholder.png',
    gallery: product.images || [product.thumbnail_url],
    category: product.category_id || 'parts',
    brand: product.brand_id || 'Apple',
    inStock: product.stock_quantity > 0,
    description: product.description || product.short_description || '',
    specs: product.specs || {}, // Parse specs if stored as JSON
    sku: product.sku || undefined,
    condition: product.condition || 'New',
    carrier: product.carrier || 'Universal',
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
  };
}

// Get related products
async function getRelatedProducts(categoryId: string, currentProductId: string, limit: number = 4): Promise<Product[]> {
  const { data: products, error } = await supabaseServer
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .neq('id', currentProductId)
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return [];

  return (products || []).map(product => ({
    _id: product.id,
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.original_price || undefined,
    image: product.thumbnail_url || product.images?.[0] || '/placeholder.png',
    gallery: product.images || [],
    category: product.category_id || 'parts',
    brand: product.brand_id || 'Apple',
    inStock: product.stock_quantity > 0,
    description: product.description || product.short_description || '',
    specs: product.specs || {},
    sku: product.sku || undefined,
    condition: product.condition || 'New',
    carrier: product.carrier || 'Universal',
    stockStatus: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock',
    slug: product.slug || undefined,
    shortDescription: product.short_description || undefined,
    isFeatured: product.is_featured || false,
    isNew: product.is_new || false,
    discountPercentage: product.discount_percentage || 0,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.metaTitle || `${product.name} - Nexus Tech Hub`,
    description: product.metaDescription || product.description.substring(0, 160),
    keywords: product.tags?.join(', ') || `${product.brand}, ${product.category}, parts`,
    openGraph: {
      title: product.metaTitle || `${product.name} - Nexus Tech Hub`,
      description: product.metaDescription || product.description.substring(0, 160),
      images: product.gallery?.length > 0 ? product.gallery : [product.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.metaTitle || `${product.name} - Nexus Tech Hub`,
      description: product.metaDescription || product.description.substring(0, 160),
      images: product.gallery?.length > 0 ? product.gallery[0] : product.image,
    },
  };
}

export async function generateStaticParams() {
  try {
    const { data: products, error } = await supabaseServer
      .from('products')
      .select('slug')
      .not('slug', 'is', null)
      .eq('is_active', true)
      .limit(100); // Limit for build performance

    if (error) {
      console.error('Error fetching product slugs for static params:', error);
      return [];
    }

    return products?.map((product: any) => ({
      slug: product.slug
    })) || [];
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
