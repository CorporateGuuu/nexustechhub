// app/parts/google-pixel/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductCard from '../../../components/ProductCard';
import PullToRefresh from '../../../components/PullToRefresh';
import { supabase } from '../../../lib/supabase';

export default function GooglePixelPartsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .or('brand.ilike.Google,brand.ilike.Pixel,brand.ilike.Google Pixel')
      .order('created_at', { ascending: false });

    setProducts(data || []);
    setLoading(false); // ← Only one call, fixed!
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loading) return <div className="p-8 text-center">Loading Google Pixel parts…</div>;

  return (
    <PullToRefresh onRefresh={loadProducts}>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white py-16 px-6 text-center">
          <h1 className="text-4xl font-black">Google Pixel Parts</h1>
          <p className="text-xl mt-2 opacity-90">Original OLED • Camera Modules • Batteries</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                originalPrice={p.original_price}
                image={p.image_url || '/placeholder.jpg'}
                brand="Google"
                inStock={p.in_stock ?? true}
                isNew={p.is_new}
                isSale={p.is_sale}
              />
            ))}
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
}
