import React from 'react';
import Layout from '../components/Layout/Layout';

export default function Motorola() {
  return (
    <Layout title="Motorola Parts" description="Browse our complete selection of Motorola phone parts and accessories">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Motorola Parts & Accessories</h1>
        <p>Discover high-quality Motorola parts and accessories for professional repairs.</p>
        <p>From the latest Moto G series to the iconic Razr flip phones, we have parts for all Motorola devices.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Complete selection of Motorola parts coming soon!</p>
        </div>
      </div>
    </Layout>
  );
}
