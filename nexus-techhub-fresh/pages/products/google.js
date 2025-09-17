import React from 'react';
import Layout from '../components/Layout/Layout';

export default function Google() {
  return (
    <Layout title="Google Parts" description="Browse our complete selection of Google Pixel, Pixelbook, and Pixel Tablet parts and accessories">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Google Parts & Accessories</h1>
        <p>Discover high-quality Google Pixel, Pixelbook, and Pixel Tablet parts and accessories for professional repairs.</p>
        <p>From the latest Pixel 10 Pro XL to the versatile Pixelbook Go, we have parts for all Google devices.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Complete selection of Google parts coming soon!</p>
        </div>
      </div>
    </Layout>
  );
}
