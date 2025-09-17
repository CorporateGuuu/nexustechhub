import React from 'react';
import Layout from '../../components/Layout/Layout';

export default function GameConsole() {
  return (
    <Layout title="Game Console Parts" description="Browse our selection of gaming console parts and accessories">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Game Console Parts</h1>
        <p>Discover high-quality gaming console parts and accessories for professional repairs.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Coming soon: Product listings for PlayStation, Xbox, Nintendo, and other console parts.</p>
        </div>
      </div>
    </Layout>
  );
}
