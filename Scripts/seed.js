// scripts/seed.js
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
config();
config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Add MONGODB_URI to .env.local');
  process.exit(1);
}

const products = [
  {
    id: 'ip15-pro-max-screen',
    name: 'iPhone 15 Pro Max OLED Screen - Aftermarket Pro',
    price: 89.99,
    originalPrice: 129.99,
    image: '/images/products/iphone-15-pro-max-screen.jpg',
    gallery: [
      '/images/products/iphone-15-pro-max-screen.jpg',
      '/images/products/iphone-15-pro-screen.jpg',
      '/images/products/iphone-15-plus-screen.jpg'
    ],
    category: 'iPhone Parts',
    brand: 'Apple',
    badge: 'Bulk Discount',
    description: 'Premium aftermarket OLED with 120Hz ProMotion.',
    inStock: true
  },
  {
    id: 'ip14-screen',
    name: 'iPhone 14 OLED Screen Assembly',
    price: 69.99,
    originalPrice: 99.99,
    image: '/images/products/iphone-14-screen.jpg',
    gallery: ['/images/products/iphone-14-screen.jpg'],
    category: 'iPhone Parts',
    brand: 'Apple',
    badge: 'Best Seller',
    description: 'High-quality OLED display for iPhone 14.',
    inStock: true
  },
  {
    id: 'sg-s24-ultra-screen',
    name: 'Samsung Galaxy S24 Ultra Screen Assembly',
    price: 79.99,
    originalPrice: 109.99,
    image: '/images/products/samsung-s24-ultra-screen.jpg',
    gallery: [
      '/images/products/samsung-s24-ultra-screen.jpg',
      '/images/products/samsung-s24-plus-screen.jpg',
      '/images/products/samsung-s24-screen.jpg'
    ],
    category: 'Samsung Parts',
    brand: 'Samsung',
    badge: 'OEM Quality',
    description: 'Original-quality AMOLED with pre-installed frame.',
    inStock: true
  },
  {
    id: 'sg-s23-screen',
    name: 'Samsung Galaxy S23 Screen Replacement',
    price: 59.99,
    originalPrice: 89.99,
    image: '/images/products/samsung-s23-screen.jpg',
    gallery: ['/images/products/samsung-s23-screen.jpg'],
    category: 'Samsung Parts',
    brand: 'Samsung',
    badge: 'New',
    description: 'AMOLED display for Samsung Galaxy S23.',
    inStock: true
  },
  {
    id: 'ipad-pro-12-9-screen',
    name: 'iPad Pro 12.9" Liquid Retina XDR Display',
    price: 149.99,
    originalPrice: 199.99,
    image: '/images/products/ipad-pro-12-9-screen.jpg',
    gallery: [
      '/images/products/ipad-pro-12-9-screen.jpg',
      '/images/products/ipad-pro-11-screen.jpg',
      '/images/products/ipad-air-5-screen.jpg'
    ],
    category: 'iPad Parts',
    brand: 'Apple',
    badge: 'Premium Grade',
    description: 'Mini-LED backlit display, 120Hz.',
    inStock: true
  },
  {
    id: 'ipad-air-screen',
    name: 'iPad Air 5th Gen Screen Assembly',
    price: 99.99,
    originalPrice: 139.99,
    image: '/images/products/ipad-air-5-screen.jpg',
    gallery: ['/images/products/ipad-air-5-screen.jpg'],
    category: 'iPad Parts',
    brand: 'Apple',
    badge: 'Popular',
    description: 'Liquid Retina display for iPad Air 5.',
    inStock: true
  },
  {
    id: 'toolkit-pro',
    name: 'Professional Repair Toolkit - Complete Set',
    price: 149.99,
    originalPrice: 199.99,
    image: '/images/products/professional-toolkit.jpg',
    gallery: [
      '/images/products/professional-toolkit.jpg',
      '/images/products/precision-screwdrivers.jpg',
      '/images/products/digital-multimeter.jpg'
    ],
    category: 'Repair Tools',
    brand: 'Generic',
    badge: 'Essential Kit',
    description: 'Everything a pro technician needs.',
    inStock: true
  },
  {
    id: 'screwdriver-set',
    name: 'Precision Screwdriver Set - 32 Piece',
    price: 39.99,
    originalPrice: 59.99,
    image: '/images/products/precision-screwdrivers.jpg',
    gallery: ['/images/products/precision-screwdrivers.jpg'],
    category: 'Repair Tools',
    brand: 'Generic',
    badge: 'Value Pack',
    description: 'Complete set of precision screwdrivers.',
    inStock: true
  },
  {
    id: 'pixel-8-screen',
    name: 'Google Pixel 8 Screen Replacement',
    price: 49.99,
    originalPrice: 79.99,
    image: '/images/products/pixel-8-screen.jpg',
    gallery: ['/images/products/pixel-8-screen.jpg'],
    category: 'Google Parts',
    brand: 'Google',
    badge: 'Affordable',
    description: 'OLED display for Google Pixel 8.',
    inStock: true
  },
  {
    id: 'oneplus-11-screen',
    name: 'OnePlus 11 Screen Assembly',
    price: 54.99,
    originalPrice: 84.99,
    image: '/images/products/oneplus-11-screen.jpg',
    gallery: ['/images/products/oneplus-11-screen.jpg'],
    category: 'OnePlus Parts',
    brand: 'OnePlus',
    badge: 'Quality',
    description: 'AMOLED display for OnePlus 11.',
    inStock: true
  }
];

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('nexus');
    await db.collection('products').deleteMany({});
    await db.collection('products').insertMany(products);
    console.log('Seeded', products.length, 'products');
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
