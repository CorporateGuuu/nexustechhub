import React from 'react';
import Layout from '../../components/Layout/Layout';

export default function ShopByBrand() {
  return (
    <Layout title="Shop by Brand - Tools & Supplies" description="Browse our collection of professional repair tools and supplies by brand">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Shop by Brand</h1>
        <p>Discover premium repair tools and supplies from trusted brands like iFixit, Wiha, and more.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Coming soon: Complete selection of branded tools and supplies.</p>
        </div>
      </div>
    </Layout>
  );
}
