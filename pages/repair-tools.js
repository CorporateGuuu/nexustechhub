import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductGrid from '../components/ProductGrid';
import CategoryHero from '../components/CategoryHero';

// Mock data for repair tools - in production, this would come from a database/API
const repairToolsData = [
  {
    id: 'toolkit-pro-50pc',
    name: 'Professional Repair Tool Kit - 50 Pieces',
    category: 'Repair Tools',
    model: 'Universal',
    price: 149.99,
    originalPrice: 179.99,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'Complete professional repair tool kit for mobile device technicians',
    specifications: ['50+ Precision Tools', 'Anti-Static Mat Included', 'Carrying Case'],
    compatibility: ['iPhone', 'Samsung', 'iPad', 'Universal'],
    sku: 'NTH-TOOLS-PRO50-001'
  },
  {
    id: 'screwdriver-precision',
    name: 'Precision Screwdriver Set - iPhone/Samsung',
    category: 'Repair Tools',
    model: 'Universal',
    price: 39.99,
    originalPrice: null,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'High-precision screwdriver set for iPhone and Samsung repairs',
    specifications: ['15 Precision Bits', 'Magnetic Tips', 'Ergonomic Handle'],
    compatibility: ['iPhone', 'Samsung', 'iPad', 'Universal'],
    sku: 'NTH-TOOLS-SCREW-001'
  },
  {
    id: 'antistatic-mat',
    name: 'Anti-Static Work Mat with Wrist Strap',
    category: 'Repair Tools',
    model: 'Universal',
    price: 29.99,
    originalPrice: null,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'Professional anti-static work mat with grounding wrist strap',
    specifications: ['24" x 16" Work Surface', 'Grounding Wrist Strap', 'ESD Safe'],
    compatibility: ['Universal', 'Professional Workstation'],
    sku: 'NTH-TOOLS-MAT-001'
  },
  {
    id: 'multimeter-digital',
    name: 'Digital Multimeter for Mobile Repair',
    category: 'Repair Tools',
    model: 'Universal',
    price: 89.99,
    originalPrice: null,
    inStock: false,
    image: '/images/products/placeholder.svg',
    description: 'Professional digital multimeter for mobile device diagnostics',
    specifications: ['Auto-Ranging', 'True RMS', 'Continuity Testing'],
    compatibility: ['iPhone', 'Samsung', 'iPad', 'Universal'],
    sku: 'NTH-TOOLS-MULTI-001'
  },
  {
    id: 'opening-tools-kit',
    name: 'Mobile Opening Tools Kit - 12 Pieces',
    category: 'Repair Tools',
    model: 'Universal',
    price: 24.99,
    originalPrice: 34.99,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'Essential opening tools for mobile device disassembly',
    specifications: ['12 Opening Tools', 'Plastic & Metal Tools', 'Spudger Set'],
    compatibility: ['iPhone', 'Samsung', 'iPad', 'Universal'],
    sku: 'NTH-TOOLS-OPEN-001'
  },
  {
    id: 'heat-gun-station',
    name: 'Digital Heat Gun Station - 858D',
    category: 'Repair Tools',
    model: 'Professional',
    price: 199.99,
    originalPrice: null,
    inStock: true,
    image: '/images/products/placeholder.svg',
    description: 'Professional digital heat gun station for component removal',
    specifications: ['Digital Temperature Control', '100-500°C Range', 'Multiple Nozzles'],
    compatibility: ['iPhone', 'Samsung', 'iPad', 'Professional Repair'],
    sku: 'NTH-TOOLS-HEAT-001'
  }
];

const categoryInfo = {
  title: 'Repair Tools',
  description: 'Professional-grade repair tools and equipment for mobile device technicians. Complete tool kits and precision instruments.',
  heroImage: '/images/categories/repair-tools-hero.svg',
  totalProducts: repairToolsData.length,
  models: ['iPhone', 'Samsung', 'iPad', 'Universal', 'Professional Kits']
};

export default function RepairTools() {
  return (
    <>
      <Head>
        <title>Repair Tools - Professional Mobile Device Equipment | Nexus TechHub</title>
        <meta name="description" content="Professional-grade repair tools and equipment for mobile device technicians. Complete tool kits, precision instruments, and specialized equipment for iPhone, Samsung, and iPad repairs." />
        <meta name="keywords" content="repair tools, mobile repair equipment, precision screwdrivers, anti-static mat, multimeter, heat gun, UAE, professional tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://nexustechhub.ae/repair-tools" />
      </Head>
      
      <Header />
      <CategoryHero categoryInfo={categoryInfo} />
      <ProductGrid products={repairToolsData} categoryTitle="Repair Tools" />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
