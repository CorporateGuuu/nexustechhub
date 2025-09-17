import React from 'react';
import Layout from '../../components/Layout/Layout';

export default function Samsung() {
  return (
    <Layout title="Samsung Products" description="Browse our selection of Samsung device parts and accessories">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Samsung Products</h1>
        <p>Discover high-quality Samsung device parts and accessories for professional repairs.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Coming soon: Product listings for Galaxy phones, tablets, and Samsung accessories.</p>
        </div>
      </div>
    </Layout>
  );
}
