// app/parts/motorola/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductCard from '../../../components/ProductCard';
import PullToRefresh from '../../../components/PullToRefresh';
import { supabase } from '../../../lib/supabase';

export default function MotorolaPartsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .ilike('brand', 'Motorola')
      .order('created_at', { ascending: false });

    setProducts(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  if (loading) return <div className="p-8 text-center">Loading Motorola parts…</div>;

  return (
    <PullToRefresh onRefresh={loadProducts}>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-gray-700 to-black text-white py-16 px-6 text-center">
          <h1 className="text-4xl font-black">Motorola Parts</h1>
          <p className="text-xl mt-2 opacity-90">LCD • Batteries • Charging Ports</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} brand="Motorola" image={p.image_url || '/placeholder.jpg'} />
            ))}
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
}
