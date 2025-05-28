// Customer Account Page for Nexus TechHub
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout/Layout';
import CustomerPortal from '../components/Customer/CustomerPortal';

export default function AccountPage() {
  const seoProps = {
    title: 'My Account - Customer Portal',
    description: 'Manage your Nexus TechHub account, track orders, view repair requests, and access your wishlist. Secure customer portal for UAE mobile repair parts.',
    keywords: 'customer account, order tracking, repair requests, wishlist, Nexus TechHub UAE',
    ogType: 'website',
    noindex: false, // Allow indexing for logged-in users
    breadcrumbs: [
      { name: 'Home', url: 'https://nexustechhub.netlify.app/' },
      { name: 'My Account', url: 'https://nexustechhub.netlify.app/account' }
    ],
    faqData: [
      {
        question: 'How do I track my order?',
        answer: 'You can track your order status in the Orders section of your account dashboard. We provide real-time updates via email and SMS.'
      },
      {
        question: 'How do I submit a repair request?',
        answer: 'Go to the Repairs section in your account and click "New Repair Request". Fill out the device details and issue description.'
      },
      {
        question: 'Can I save items for later purchase?',
        answer: 'Yes, use the Wishlist feature to save products you are interested in. You can easily add them to cart when ready to purchase.'
      },
      {
        question: 'How do I update my shipping address?',
        answer: 'Visit the Addresses section to add, edit, or delete shipping addresses. You can set a default address for faster checkout.'
      }
    ]
  };

  return (
    <SessionProvider>
      <Layout 
        title="My Account"
        description="Manage your Nexus TechHub account, track orders, and access customer services"
        seoProps={seoProps}
        showAdvancedSEO={true}
      >
        <CustomerPortal />
      </Layout>
    </SessionProvider>
  );
}

// This page requires authentication, but we handle it in the component
export async function getServerSideProps(context) {
  return {
    props: {
      // Pass any server-side props here if needed
    },
  };
}
