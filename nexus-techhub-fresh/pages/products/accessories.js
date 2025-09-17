import React from 'react';
import Layout from '../../components/Layout/Layout';

export default function Accessories() {
  return (
    <Layout title="Accessories" description="Browse our selection of device accessories and peripherals">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Accessories</h1>
        <p>Discover high-quality device accessories and peripherals for professional repairs.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Coming soon: Product listings for cases, cables, chargers, and other accessories.</p>
        </div>
      </div>
    </Layout>
  );
}
