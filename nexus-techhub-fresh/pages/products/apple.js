import React from 'react';
import Layout from '../../components/Layout/Layout';

export default function Apple() {
  return (
    <Layout title="Apple Products" description="Browse our selection of Apple device parts and accessories">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Apple Products</h1>
        <p>Discover high-quality Apple device parts and accessories for professional repairs.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Coming soon: Product listings for iPhone, iPad, Mac, and Apple Watch parts.</p>
        </div>
      </div>
    </Layout>
  );
}
