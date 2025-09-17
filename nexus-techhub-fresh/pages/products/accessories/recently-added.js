import React from 'react';
import Layout from '../../components/Layout/Layout';

export default function RecentlyAdded() {
  return (
    <Layout title="Recently Added Accessories" description="Browse our latest collection of recently added accessories">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Recently Added Accessories</h1>
        <p>Discover our newest collection of premium accessories for all your devices.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Coming soon: Complete selection of recently added accessories.</p>
        </div>
      </div>
    </Layout>
  );
}
