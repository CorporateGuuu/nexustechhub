import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductGrid from '../components/ProductGrid';
import CategoryHero from '../components/CategoryHero';

// Mock data for Samsung parts - in production, this would come from a database/API
const samsungPartsData = [
  {
    id: 'sg-s24-screen-oled',
    name: 'Samsung Galaxy S24 OLED Screen Assembly',
    category: 'Samsung Parts',
    model: 'Galaxy S24',
    price: 249.99,
    originalPrice: 279.99,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'High-quality OLED replacement screen for Samsung Galaxy S24',
    specifications: ['OLED Display', 'Touch Digitizer Included', '6-Month Warranty'],
    compatibility: ['Samsung Galaxy S24'],
    sku: 'NTH-SGS24-SCREEN-001'
  },
  {
    id: 'sg-s23-battery',
    name: 'Samsung Galaxy S23 Battery Replacement',
    category: 'Samsung Parts',
    model: 'Galaxy S23',
    price: 79.99,
    originalPrice: null,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'Original capacity battery replacement for Samsung Galaxy S23',
    specifications: ['3900mAh Capacity', 'Li-ion Technology', '1-Year Warranty'],
    compatibility: ['Samsung Galaxy S23'],
    sku: 'NTH-SGS23-BAT-001'
  },
  {
    id: 'sg-s22-charging-port',
    name: 'Samsung Galaxy S22 Charging Port Assembly',
    category: 'Samsung Parts',
    model: 'Galaxy S22',
    price: 49.99,
    originalPrice: null,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'USB-C charging port and flex cable assembly for Galaxy S22',
    specifications: ['USB-C Connector', 'Microphone Included', '6-Month Warranty'],
    compatibility: ['Samsung Galaxy S22', 'Samsung Galaxy S22+'],
    sku: 'NTH-SGS22-CHARGE-001'
  },
  {
    id: 'sg-note20-camera',
    name: 'Samsung Galaxy Note 20 Camera Module',
    category: 'Samsung Parts',
    model: 'Galaxy Note 20',
    price: 189.99,
    originalPrice: 219.99,
    inStock: false,
    image: '/images/products/placeholder.svg',
    description: 'Triple camera system replacement for Samsung Galaxy Note 20',
    specifications: ['64MP Triple System', 'Ultra Wide + Telephoto', '90-Day Warranty'],
    compatibility: ['Samsung Galaxy Note 20'],
    sku: 'NTH-SGNOTE20-CAM-001'
  },
  {
    id: 'sg-a54-display',
    name: 'Samsung Galaxy A54 LCD Display',
    category: 'Samsung Parts',
    model: 'Galaxy A54',
    price: 129.99,
    originalPrice: null,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'High-quality LCD replacement display for Samsung Galaxy A54',
    specifications: ['LCD Display', 'Touch Digitizer Included', '6-Month Warranty'],
    compatibility: ['Samsung Galaxy A54 5G'],
    sku: 'NTH-SGA54-DISPLAY-001'
  },
  {
    id: 'sg-s21-back-cover',
    name: 'Samsung Galaxy S21 Back Cover Glass',
    category: 'Samsung Parts',
    model: 'Galaxy S21',
    price: 39.99,
    originalPrice: 49.99,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'Replacement back cover glass for Samsung Galaxy S21',
    specifications: ['Tempered Glass', 'Camera Cutout Included', '3-Month Warranty'],
    compatibility: ['Samsung Galaxy S21'],
    sku: 'NTH-SGS21-BACK-001'
  }
];

const categoryInfo = {
  title: 'Samsung Parts',
  description: 'Professional-grade Samsung replacement parts for all Galaxy models. High-quality components with warranty coverage.',
  heroImage: '/images/categories/samsung-parts-hero.svg',
  totalProducts: samsungPartsData.length,
  models: ['Galaxy S24 Series', 'Galaxy S23 Series', 'Galaxy S22 Series', 'Galaxy Note Series', 'Galaxy A Series']
};

export default function SamsungParts() {
  return (
    <>
      <Head>
        <title>Samsung Parts - Professional Galaxy Replacement Components | Nexus TechHub</title>
        <meta name="description" content="High-quality Samsung Galaxy replacement parts including screens, batteries, cameras, and charging ports. Professional-grade components with warranty coverage for all Galaxy models." />
        <meta name="keywords" content="Samsung parts, Galaxy screen replacement, Samsung battery, Galaxy repair parts, UAE, Samsung Galaxy S24, S23, Note" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://nexustechhub.ae/samsung-parts" />
      </Head>
      
      <Header />
      <CategoryHero categoryInfo={categoryInfo} />
      <ProductGrid products={samsungPartsData} categoryTitle="Samsung Parts" />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
