import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import ProductList from '../../components/ProductList/ProductList';
import { supabase } from '../../lib/db';

function IPadParts() {
  const [ipadParts, setIpadParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIPadParts();
  }, []);

  const fetchIPadParts = async () => {
    try {
      setLoading(true);

      // Get iPad parts category first
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', 'ipad-parts')
        .single();

      if (categoryError) throw categoryError;

      // Fetch products for iPad parts category
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          slug,
          price,
          discount_percentage,
          stock_quantity,
          is_featured,
          is_new,
          image_url,
          categories (
            name
          )
        `)
        .eq('category_id', categoryData.id)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // Transform data for ProductList component
      const transformedProducts = productsData.map(product => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.categories?.name || 'iPad Parts',
        price: product.price,
        discount_percentage: product.discount_percentage,
        imageUrl: product.image_url || '/images/placeholder.svg',
        badge: product.discount_percentage > 0 ? `${product.discount_percentage}% OFF` :
               product.is_new ? 'New' :
               product.is_featured ? 'Featured' : null,
        stock_quantity: product.stock_quantity,
        is_featured: product.is_featured,
        is_new: product.is_new
      }));

      setIpadParts(transformedProducts);
    } catch (error) {
      console.error('Error fetching iPad parts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout
        title="iPad Parts - Nexus TechHub"
        description="High-quality iPad replacement parts for all models."
      >
        <div className="container" style={{ padding: '40px 20px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>iPad Parts</h1>
          <p style={{ marginBottom: '2rem' }}>
            Loading iPad parts...
          </p>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div>Loading...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout
        title="iPad Parts - Nexus TechHub"
        description="High-quality iPad replacement parts for all models."
      >
        <div className="container" style={{ padding: '40px 20px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>iPad Parts</h1>
          <p style={{ marginBottom: '2rem' }}>
            Error loading iPad parts: {error}
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="iPad Parts - Nexus TechHub"
      description="High-quality iPad replacement parts for all models. Screens, digitizers, batteries, charging ports, and more."
    >
      <div className="container" style={{ padding: '40px 20px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>iPad Parts</h1>
        <p style={{ marginBottom: '2rem' }}>
          Find high-quality replacement parts for all iPad models. We offer screens, digitizers, batteries,
          charging ports, and more to help you repair your iPad. ({ipadParts.length} products available)
        </p>

        <ProductList products={ipadParts} title="iPad Replacement Parts" />
      </div>
    </Layout>
  );
}

export default React.memo(IPadParts);
