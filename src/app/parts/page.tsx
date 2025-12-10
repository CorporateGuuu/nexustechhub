import { supabaseServer } from '../../lib/supabase/server';
import { Product } from '../../types';
import PartsPageClient from './PartsPageClient';

// Category data with icons and links
const categories = [
  {
    id: 'apple',
    name: 'Apple Parts',
    description: 'Genuine OEM iPhone, iPad, Watch & MacBook components',
    image: '/images/categories/apple-parts.jpg',
    color: 'from-gray-900 to-black',
    link: '/parts/apple',
    features: ['Genuine OEM', '180-Day Warranty', 'Fast Shipping']
  },
  {
    id: 'samsung',
    name: 'Samsung Parts',
    description: 'Galaxy S, Note, A-series, and tablet replacement parts',
    image: '/images/categories/samsung-parts.jpg',
    color: 'from-blue-600 to-blue-800',
    link: '/parts/samsung',
    features: ['High Quality', 'Bulk Pricing', 'Expert Support']
  },
  {
    id: 'google',
    name: 'Google Pixel Parts',
    description: 'Pixel phone and tablet screens, batteries, cameras',
    image: '/images/categories/google-pixel-parts.jpg',
    color: 'from-green-500 to-green-700',
    link: '/parts/google',
    features: ['OEM Quality', 'Same-Day Ship', 'Technical Support']
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Cables, chargers, cases, screen protectors, audio',
    image: '/images/categories/accessories.jpg',
    color: 'from-purple-500 to-purple-600',
    link: '/accessories',
    features: ['Premium Brands', 'Bulk Discounts', 'Fast Delivery']
  },
  {
    id: 'tools',
    name: 'Tools & Supplies',
    description: 'Repair tools, adhesives, opening picks, testers',
    image: '/images/categories/tools-supplies.jpg',
    color: 'from-orange-500 to-red-500',
    link: '/parts/tools',
    features: ['Professional Grade', 'Durable', 'Complete Kits']
  },
  {
    id: 'game-console',
    name: 'Game Console Parts',
    description: 'PlayStation, Xbox, Nintendo replacement parts',
    image: '/images/categories/gaming-parts.jpg',
    color: 'from-indigo-500 to-purple-600',
    link: '/parts/game-console',
    features: ['Console Specific', 'Gaming Optimized', 'Quick Repair']
  }
];

// Get featured products from Supabase
async function getFeaturedProducts(limit: number = 12): Promise<Product[]> {
  const { data: products, error } = await supabaseServer
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return (products || []).map((product: any) => ({
    _id: product.id,
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.original_price || undefined,
    image: product.thumbnail_url || product.images?.[0] || '/images/products/placeholder.svg',
    gallery: product.images || [],
    category: product.category_id || 'parts',
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
}

// Get product stats
async function getProductStats() {
  const { data: stats, error } = await supabaseServer
    .from('products')
    .select('id, is_active, stock_quantity')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching product stats:', error);
    return { totalProducts: 0, inStockProducts: 0 };
  }

  const totalProducts = stats?.length || 0;
  const inStockProducts = stats?.filter((p: any) => p.stock_quantity > 0).length || 0;

  return { totalProducts, inStockProducts };
}

export async function generateMetadata() {
  return {
    title: 'Wholesale Phone & Tablet Parts | Nexus Tech Hub',
    description: 'Premium quality phone and tablet replacement parts. Apple, Samsung, Google Pixel, and gaming console parts with fast shipping and expert support.',
    keywords: 'phone parts, tablet parts, iPhone repair, Samsung repair, Google Pixel parts, wholesale electronics, repair parts',
    openGraph: {
      title: 'Wholesale Phone & Tablet Parts | Nexus Tech Hub',
      description: 'Premium quality phone and tablet replacement parts with fast shipping and expert support.',
      type: 'website',
    },
  };
}

export default async function PartsPage() {
  const featuredProducts = await getFeaturedProducts();
  const stats = await getProductStats();

  return <PartsPageClient categories={categories} featuredProducts={featuredProducts} stats={stats} />;
}
