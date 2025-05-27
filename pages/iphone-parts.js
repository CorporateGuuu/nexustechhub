import { CategorySEOHead } from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductGrid from '../components/ProductGrid';
import CategoryHero from '../components/CategoryHero';

// Mock data for iPhone parts - in production, this would come from a database/API
const iphonePartsData = [
  {
    id: 'ip15-screen-oled',
    name: 'iPhone 15 Pro OLED Screen Assembly',
    category: 'iPhone Parts',
    model: 'iPhone 15 Pro',
    price: 299.99,
    originalPrice: 349.99,
    inStock: true,
    image: '/images/products/iphone-15-pro-screen.jpg',
    description: 'High-quality OLED replacement screen for iPhone 15 Pro',
    specifications: ['OLED Display', 'Touch Digitizer Included', '6-Month Warranty'],
    compatibility: ['iPhone 15 Pro'],
    sku: 'NTH-IP15P-SCREEN-001'
  },
  {
    id: 'ip14-battery',
    name: 'iPhone 14 Battery Replacement',
    category: 'iPhone Parts',
    model: 'iPhone 14',
    price: 89.99,
    originalPrice: null,
    inStock: true,
    image: '/images/products/iphone-14-battery.jpg',
    description: 'Original capacity battery replacement for iPhone 14',
    specifications: ['3279mAh Capacity', 'Li-ion Technology', '1-Year Warranty'],
    compatibility: ['iPhone 14'],
    sku: 'NTH-IP14-BAT-001'
  },
  {
    id: 'ip13-camera',
    name: 'iPhone 13 Pro Rear Camera Module',
    category: 'iPhone Parts',
    model: 'iPhone 13 Pro',
    price: 199.99,
    originalPrice: 229.99,
    inStock: false,
    image: '/images/products/iphone-13-camera.jpg',
    description: 'Triple camera system replacement for iPhone 13 Pro',
    specifications: ['12MP Triple System', 'Ultra Wide + Telephoto', '90-Day Warranty'],
    compatibility: ['iPhone 13 Pro'],
    sku: 'NTH-IP13P-CAM-001'
  },
  {
    id: 'ip12-charging-port',
    name: 'iPhone 12 Lightning Charging Port',
    category: 'iPhone Parts',
    model: 'iPhone 12',
    price: 59.99,
    originalPrice: null,
    inStock: true,
    image: '/images/products/iphone-12-charging-port.jpg',
    description: 'Lightning connector and flex cable assembly',
    specifications: ['Lightning Connector', 'Microphone Included', '6-Month Warranty'],
    compatibility: ['iPhone 12', 'iPhone 12 Mini'],
    sku: 'NTH-IP12-CHARGE-001'
  }
];

const categoryInfo = {
  title: 'iPhone Parts',
  description: 'Professional-grade iPhone replacement parts for all models. High-quality components with warranty coverage.',
  heroImage: '/images/categories/iphone-parts-hero.jpg',
  totalProducts: iphonePartsData.length,
  models: ['iPhone 15 Series', 'iPhone 14 Series', 'iPhone 13 Series', 'iPhone 12 Series', 'iPhone 11 Series']
};

export default function iPhoneParts() {
  return (
    <>
      <CategorySEOHead
        category="iPhone Parts"
        description="Professional-grade iPhone replacement parts for all models. High-quality screens, batteries, cameras, and charging ports with warranty coverage."
        products={iphonePartsData}
      />

      <Header />
      <CategoryHero categoryInfo={categoryInfo} />
      <ProductGrid products={iphonePartsData} categoryTitle="iPhone Parts" />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
