import { supabase } from '../supabase';
import { Product } from '../../types';

interface ProductRow {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  category_id?: string;
  brand?: string;
  stock_quantity: number;
  description?: string;
  created_at: string;
}

export async function getProductsBySubcategory(subcategory: string): Promise<Product[]> {
  try {
    // Search by product name since brand field is null in database
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${subcategory}%`)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    // Transform Supabase data to Product type
    return (data || []).map((product: ProductRow) => ({
      _id: product.id,
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: undefined, // Not in current table
      image: product.image_url || '/placeholder.png',
      gallery: [], // Not in current table
      category: product.category_id || 'parts',
      brand: product.brand || 'Samsung',
      inStock: product.stock_quantity > 0,
      description: product.description || '',
      specs: {}, // Could be expanded if specs are stored elsewhere
    }));
  } catch (error) {
    console.error('Error in getProductsBySubcategory:', error);
    return [];
  }
}

export async function getProductsByModel(model: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${model}%`)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching products by model:', error);
      return [];
    }

    // Transform Supabase data to Product type
    return (data || []).map(product => ({
      _id: product.id,
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: undefined,
      image: product.image_url || '/placeholder.png',
      gallery: [],
      category: product.category_id || 'parts',
      brand: product.brand || 'Apple',
      inStock: product.stock_quantity > 0,
      description: product.description || '',
      specs: {},
    }));
  } catch (error) {
    console.error('Error in getProductsByModel:', error);
    return [];
  }
}

export async function getRecentProducts(limit: number = 48): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent products:', error);
      return [];
    }

    return (data || []).map(product => ({
      _id: product.id,
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: undefined,
      image: product.image_url || '/placeholder.png',
      gallery: [],
      category: product.category_id || 'parts',
      brand: product.brand || 'Various',
      inStock: product.stock_quantity > 0,
      description: product.description || '',
      specs: {},
    }));
  } catch (error) {
    console.error('Error in getRecentProducts:', error);
    return [];
  }
}
