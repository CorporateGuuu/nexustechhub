import React from 'react';
import Layout from '../components/Layout/Layout';

export default function OtherParts() {
  return (
    <Layout title="Other Parts" description="Browse our complete selection of other brand parts and accessories">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Other Parts & Accessories</h1>
        <p>Discover high-quality parts and accessories for various brands and devices.</p>
        <p>From LG and Microsoft to Asus and OnePlus, we have parts for all your repair needs.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Complete selection of other brand parts coming soon!</p>
        </div>
      </div>
    </Layout>
  );
}
