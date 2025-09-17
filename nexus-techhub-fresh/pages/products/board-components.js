import React from 'react';
import Layout from '../../components/Layout/Layout';

export default function BoardComponents() {
  return (
    <Layout title="Board Components" description="Browse our selection of circuit board components and parts">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Board Components</h1>
        <p>Discover high-quality circuit board components and replacement parts.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Coming soon: Product listings for motherboards, processors, memory, and other components.</p>
        </div>
      </div>
    </Layout>
  );
}
