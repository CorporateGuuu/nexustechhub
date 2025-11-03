import Link from 'next/link';
import Hero from '../components/Hero';
import CategoriesGrid from '../components/CategoriesGrid';
import FeaturedProductsCarousel from '../components/FeaturedProductsCarousel';
import PromotionsBanners from '../components/PromotionsBanners';
import NewsletterFooter from '../components/NewsletterFooter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CategoriesGrid />
      <FeaturedProductsCarousel />
      <PromotionsBanners />
      <NewsletterFooter />
      <div className="max-w-4xl mx-auto p-8">
        <header className="border-b border-gray-300 pb-4 mb-8">
          <h1 className="text-2xl font-normal">Nexus Tech Hub</h1>
          <nav className="mt-4 space-x-6">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <Link href="/products" className="text-blue-600 hover:underline">Products</Link>
            <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
            <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
            <Link href="/admin" className="text-blue-600 hover:underline">Admin</Link>
          </nav>
        </header>

        <main>
          <div className="border border-gray-300 p-8 mb-8">
            <h2 className="text-xl mb-4">Welcome to Nexus Tech Hub</h2>
            <p className="mb-4">UAE's #1 Wholesale Parts Supplier</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 p-4">
                <h3 className="font-medium mb-2">Exclusive Pricing</h3>
                <p className="text-sm">Wholesale prices for retailers and businesses</p>
              </div>
              <div className="border border-gray-200 p-4">
                <h3 className="font-medium mb-2">Fast Delivery</h3>
                <p className="text-sm">UAE & GCC shipping available</p>
              </div>
              <div className="border border-gray-200 p-4">
                <h3 className="font-medium mb-2">Quality Parts</h3>
                <p className="text-sm">Genuine parts for all devices</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 p-8">
            <h2 className="text-xl mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link href="/products" className="block text-blue-600 hover:underline">Browse Products</Link>
              <Link href="/login" className="block text-blue-600 hover:underline">Login to Account</Link>
              <Link href="/register" className="block text-blue-600 hover:underline">Create Account</Link>
              <Link href="/admin" className="block text-blue-600 hover:underline">Admin Panel</Link>
            </div>
          </div>
        </main>

        <footer className="border-t border-gray-300 pt-4 mt-8 text-center text-sm">
          <p>&copy; 2025 Nexus Tech Hub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
