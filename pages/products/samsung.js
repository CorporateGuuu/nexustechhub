import React from 'react';
import Layout from '../../components/Layout/Layout';
import ProductList from '../../components/ProductList/ProductList';

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import ProductList from '../../components/ProductList/ProductList';
import SkeletonProduct from '../../components/skeleton/SkeletonProduct';

function SamsungParts() {
  const [samsungParts, setSamsungParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSamsungParts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products?category=samsung-parts');
        if (!response.ok) {
          throw new Error('Failed to fetch Samsung parts');
        }
        const data = await response.json();
        if (data.success) {
          setSamsungParts(data.products);
        } else {
          setSamsungParts([]);
        }
      } catch (error) {
        console.error('Error fetching Samsung parts:', error);
        setSamsungParts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSamsungParts();
  }, []);

  return (
    <Layout
      title="Samsung Parts - Midas Technical Solutions"
      description="High-quality Samsung replacement parts for all models. Screens, batteries, charging ports, and more."
    >
      <div className="container" style={{ padding: '40px 20px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Samsung Parts</h1>
        <p style={{ marginBottom: '2rem' }}>
          Find high-quality replacement parts for all Samsung Galaxy models. We offer screens, batteries,
          charging ports, cameras, and more to help you repair your Samsung device.
        </p>

        {loading ? (
          <div className="skeleton-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonProduct key={index} />
            ))}
          </div>
        ) : (
          <ProductList products={samsungParts} title="Samsung Replacement Parts" />
        )}
      </div>
    </Layout>
  );
}

export default React.memo(SamsungParts);
