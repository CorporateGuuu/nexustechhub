import ProductDetail from 'src/components/Product/ProductDetail';
import { supabase } from 'src/lib/supabase';
import { Product } from 'src/types';
import { notFound } from 'next/navigation';

// Get product from Supabase
async function getProduct(id: string): Promise<Product | null> {
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) return null;

  // Convert Supabase product to Product format
  return {
    _id: product.id,
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.original_price || undefined,
    image: product.image,
    gallery: product.images || [product.image],
    category: product.category,
    brand: product.brand,
    inStock: product.in_stock,
    description: product.description,
  };
}

export async function generateStaticParams() {
  try {
    // Query Supabase for product IDs
    const { data: products, error } = await supabase
      .from('products')
      .select('id')
      .limit(50); // Limit to prevent too many static pages

    if (error) {
      console.error('Error fetching product IDs for static params:', error);
      return [];
    }

    return products?.map(product => ({
      id: product.id.toString()
    })) || [];
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
