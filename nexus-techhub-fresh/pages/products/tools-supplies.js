import React from 'react';
import Layout from '../../components/Layout/Layout';

export default function ToolsSupplies() {
  return (
    <Layout title="Tools & Supplies" description="Browse our selection of repair tools and supplies">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Tools & Supplies</h1>
        <p>Discover high-quality repair tools and supplies for professional technicians.</p>
        <div style={{ marginTop: '2rem' }}>
          <p>Coming soon: Product listings for screwdrivers, opening tools, adhesives, and more.</p>
        </div>
      </div>
    </Layout>
  );
}
