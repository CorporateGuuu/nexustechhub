// Admin Inventory Management Page for Nexus TechHub
import React from 'react';
import { getSession } from 'next-auth/react';
import Layout from '../../components/Layout/Layout';
import RealTimeInventory from '../../components/Admin/RealTimeInventory';

export default function AdminInventoryPage() {
  const seoProps = {
    title: 'Admin - Real-Time Inventory Management',
    description: 'Advanced inventory management system for Nexus TechHub. Real-time stock tracking, low stock alerts, and automated reorder notifications.',
    keywords: 'admin, inventory management, stock tracking, real-time updates, Nexus TechHub',
    noindex: true, // Don't index admin pages
    nofollow: true,
    ogType: 'website'
  };

  return (
    <Layout 
      title="Admin - Inventory Management"
      description="Real-time inventory management system"
      seoProps={seoProps}
      showAdvancedSEO={false} // Use basic SEO for admin pages
    >
      <div style={{ padding: '2rem 0' }}>
        <RealTimeInventory />
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
        destination: '/auth/signin?callbackUrl=/admin/inventory',
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
