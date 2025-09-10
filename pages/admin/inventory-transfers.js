// Admin Inventory Transfers Page for Nexus TechHub
import React from 'react';
import { getSession } from 'next-auth/react';
import Layout from '../../components/Layout/Layout';
import InventoryTransferList from '../../components/Admin/InventoryTransferList';
import StoreLocationsList from '../../components/Admin/StoreLocationsList';

export default function AdminInventoryTransfersPage() {
  const seoProps = {
    title: 'Admin - Inventory Transfers',
    description: 'Manage and view inventory transfers between stores and locations. Track transfer status, items, and history.',
    keywords: 'admin, inventory transfers, stock transfers, store management, Nexus TechHub',
    noindex: true, // Don't index admin pages
    nofollow: true,
    ogType: 'website'
  };

  return (
    <Layout
      title="Admin - Inventory Transfers"
      description="Manage inventory transfers between stores"
      seoProps={seoProps}
      showAdvancedSEO={false} // Use basic SEO for admin pages
    >
      <div style={{ padding: '2rem 0' }}>
        <InventoryTransferList />
      </div>
    </Layout>
  );
}

// Protect admin routes
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // In production, check for admin role
  if (!session && process.env.NODE_ENV === 'production') {
    return {
      redirect: {
        destination: '/auth/signin?callbackUrl=/admin/inventory-transfers',
        permanent: false,
      },
    };
  }

  // In development, allow access for demo purposes
  return {
    props: {
      session,
    },
  };
}
