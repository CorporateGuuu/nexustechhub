import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductGrid from '../components/ProductGrid';
import CategoryHero from '../components/CategoryHero';

// Mock data for iPad parts - in production, this would come from a database/API
const ipadPartsData = [
  {
    id: 'ipad-pro12-lcd',
    name: 'iPad Pro 12.9" LCD Assembly',
    category: 'iPad Parts',
    model: 'iPad Pro 12.9"',
    price: 299.99,
    originalPrice: 349.99,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'High-resolution LCD assembly for iPad Pro 12.9" with touch digitizer',
    specifications: ['12.9" LCD Display', 'Touch Digitizer Included', '6-Month Warranty'],
    compatibility: ['iPad Pro 12.9" (6th Gen)', 'iPad Pro 12.9" (5th Gen)'],
    sku: 'NTH-IPPRO12-LCD-001'
  },
  {
    id: 'ipad-air5-digitizer',
    name: 'iPad Air 5th Gen Digitizer',
    category: 'iPad Parts',
    model: 'iPad Air 5th Gen',
    price: 159.99,
    originalPrice: null,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'Touch digitizer replacement for iPad Air 5th Generation',
    specifications: ['10.9" Touch Digitizer', 'Oleophobic Coating', '6-Month Warranty'],
    compatibility: ['iPad Air 5th Generation (2022)'],
    sku: 'NTH-IPAIR5-DIGIT-001'
  },
  {
    id: 'ipad-pro11-battery',
    name: 'iPad Pro 11" Battery Replacement',
    category: 'iPad Parts',
    model: 'iPad Pro 11"',
    price: 129.99,
    originalPrice: null,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'High-capacity battery replacement for iPad Pro 11"',
    specifications: ['7538mAh Capacity', 'Li-Polymer Technology', '1-Year Warranty'],
    compatibility: ['iPad Pro 11" (4th Gen)', 'iPad Pro 11" (3rd Gen)'],
    sku: 'NTH-IPPRO11-BAT-001'
  },
  {
    id: 'ipad-mini6-charging',
    name: 'iPad Mini 6 Charging Port',
    category: 'iPad Parts',
    model: 'iPad Mini 6',
    price: 69.99,
    originalPrice: null,
    inStock: false,
    image: '/images/products/placeholder.svg',
    description: 'USB-C charging port assembly for iPad Mini 6th Generation',
    specifications: ['USB-C Connector', 'Flex Cable Included', '6-Month Warranty'],
    compatibility: ['iPad Mini 6th Generation (2021)'],
    sku: 'NTH-IPMINI6-CHARGE-001'
  },
  {
    id: 'ipad-10gen-screen',
    name: 'iPad 10th Gen Screen Assembly',
    category: 'iPad Parts',
    model: 'iPad 10th Gen',
    price: 189.99,
    originalPrice: 219.99,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'Complete screen assembly for iPad 10th Generation',
    specifications: ['10.9" LCD Display', 'Touch Digitizer Included', '6-Month Warranty'],
    compatibility: ['iPad 10th Generation (2022)'],
    sku: 'NTH-IP10GEN-SCREEN-001'
  },
  {
    id: 'ipad-air4-home-button',
    name: 'iPad Air 4 Home Button Assembly',
    category: 'iPad Parts',
    model: 'iPad Air 4',
    price: 89.99,
    originalPrice: null,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'Touch ID home button assembly for iPad Air 4th Generation',
    specifications: ['Touch ID Sensor', 'Flex Cable Included', '90-Day Warranty'],
    compatibility: ['iPad Air 4th Generation (2020)'],
    sku: 'NTH-IPAIR4-HOME-001'
  }
];

const categoryInfo = {
  title: 'iPad Parts',
  description: 'Professional iPad replacement components for all models. Precision-engineered parts for Pro, Air, and standard iPad repairs.',
  heroImage: '/images/categories/ipad-parts-hero.svg',
  totalProducts: ipadPartsData.length,
  models: ['iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad 10th Gen', 'iPad Mini']
};

export default function iPadParts() {
  return (
    <>
      <Head>
        <title>iPad Parts - Professional Replacement Components | Nexus TechHub</title>
        <meta name="description" content="High-quality iPad replacement parts including screens, digitizers, batteries, and charging ports. Professional-grade components for iPad Pro, Air, and standard models with warranty coverage." />
        <meta name="keywords" content="iPad parts, iPad screen replacement, iPad digitizer, iPad battery, iPad repair parts, UAE, iPad Pro, iPad Air, iPad Mini" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://nexustechhub.ae/ipad-parts" />
      </Head>
      
      <Header />
      <CategoryHero categoryInfo={categoryInfo} />
      <ProductGrid products={ipadPartsData} categoryTitle="iPad Parts" />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
