import React from 'react';
import Layout from '../components/Layout/Layout';

export default function BoardComponents() {
  return (
    <Layout title="Board Components" description="Browse our complete collection of board components and replacement parts">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Board Components</h1>
        <p>Discover high-quality board components for all your repair needs.</p>
        <p>From iPhone to Samsung Galaxy, we have replacement parts for all devices.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Coming soon: Complete selection of board components.</p>
        </div>
      </div>
    </Layout>
  );
}
