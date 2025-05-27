import React from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import WhatsAppButton from '../components/WhatsApp/WhatsAppButton';

export default function Home() {
  return (
    <Layout 
      title="Professional Repair Parts & Tools"
      description="Your trusted partner for professional repair parts & tools in UAE. Find everything you need for phone, tablet, and laptop repairs."
    >
      <Header />
      <Hero />
      <FeaturedProducts />
      <WhatsAppButton />
    </Layout>
  );
}
