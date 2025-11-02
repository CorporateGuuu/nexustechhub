'use client';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { CartProvider } from '../../contexts/CartContext';
import { AuthProvider } from '../../contexts/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Hero />
          <Categories />
          <FeaturedProducts />
          <CTA />
          <Footer />
          <WhatsAppButton />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
