import React from 'react';
import Layout from '../components/Layout/Layout';

export default function GameConsole() {
  return (
    <Layout title="Game Console Parts" description="Browse our complete selection of gaming console parts and accessories">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Game Console Parts & Accessories</h1>
        <p>Discover high-quality gaming console parts and accessories for professional repairs.</p>
        <p>From the latest Xbox Series X to the Nintendo Switch, we have parts for all gaming consoles.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Complete selection of gaming console parts coming soon!</p>
        </div>
      </div>
    </Layout>
  );
}
