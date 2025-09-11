#!/usr/bin/env node

/**
 * Insert iPhone Products Data into Supabase
 * This script inserts sample iPhone products and parts data
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertCategories() {
  console.log('📂 Inserting product categories...');

  const categories = [
    { name: 'iPhone Parts', slug: 'iphone-parts', description: 'High-quality replacement parts for iPhone devices' },
    { name: 'Samsung Parts', slug: 'samsung-parts', description: 'Genuine Samsung replacement components' },
    { name: 'iPad Parts', slug: 'ipad-parts', description: 'iPad screens, batteries, and accessories' },
    { name: 'Tools', slug: 'tools', description: 'Professional repair tools and equipment' },
    { name: 'MacBook Parts', slug: 'macbook-parts', description: 'MacBook repair parts and components' }
  ];

  for (const category of categories) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .upsert(category, { onConflict: 'slug' })
        .select();

      if (error) {
        console.error(`❌ Error inserting category ${category.name}:`, error.message);
      } else {
        console.log(`✅ Inserted category: ${category.name} (ID: ${data[0]?.id})`);
      }
    } catch (error) {
      console.error(`❌ Failed to insert category ${category.name}:`, error.message);
    }
  }
}

async function insertProducts() {
  console.log('📱 Inserting iPhone products and parts...');

  const products = [
    {
      name: 'iPhone 15 Pro Screen',
      slug: 'iphone-15-pro-screen',
      sku: 'IP15P-SCR-001',
      description: 'High-quality OLED screen replacement for iPhone 15 Pro with premium glass. Features Super Retina XDR display with ProMotion technology.',
      price: 299.99,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Pro Max Screen',
      slug: 'iphone-15-pro-max-screen',
      sku: 'IP15PM-SCR-001',
      description: 'Premium OLED screen for iPhone 15 Pro Max with advanced touch technology and Ceramic Shield protection.',
      price: 349.99,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.12,
      dimensions: '6.7 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 14 Screen',
      slug: 'iphone-14-screen',
      sku: 'IP14-SCR-001',
      description: 'High-quality LCD screen replacement for iPhone 14 with Super Retina XDR display.',
      price: 249.99,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.09,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 13 Screen',
      slug: 'iphone-13-screen',
      sku: 'IP13-SCR-001',
      description: 'Super Retina XDR display replacement for iPhone 13 with Ceramic Shield.',
      price: 199.99,
      discount_percentage: 10,
      stock_quantity: 75,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Battery',
      slug: 'iphone-15-battery',
      sku: 'IP15-BAT-001',
      description: 'Original Apple battery replacement for iPhone 15 series with optimized power management.',
      price: 89.99,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '3.5 x 2.5 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone Charging Port',
      slug: 'iphone-charging-port',
      sku: 'IP-CHP-001',
      description: 'Lightning charging port assembly for all iPhone models with USB-C compatibility.',
      price: 29.99,
      discount_percentage: 0,
      stock_quantity: 200,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1 x 0.5 x 0.2 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Pro Camera Module',
      slug: 'iphone-15-pro-camera-module',
      sku: 'IP15P-CAM-001',
      description: 'Rear camera module replacement for iPhone 15 Pro with 48MP main sensor.',
      price: 149.99,
      discount_percentage: 5,
      stock_quantity: 30,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 1.5 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 14 Battery',
      slug: 'iphone-14-battery',
      sku: 'IP14-BAT-001',
      description: 'Replacement battery for iPhone 14 with improved energy efficiency.',
      price: 79.99,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.045,
      dimensions: '3.4 x 2.4 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 13 Battery',
      slug: 'iphone-13-battery',
      sku: 'IP13-BAT-001',
      description: 'High-capacity battery replacement for iPhone 13 series.',
      price: 69.99,
      discount_percentage: 0,
      stock_quantity: 90,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.04,
      dimensions: '3.3 x 2.3 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone Home Button Assembly',
      slug: 'iphone-home-button-assembly',
      sku: 'IP-HBA-001',
      description: 'Touch ID home button assembly for iPhone 8 and earlier models.',
      price: 39.99,
      discount_percentage: 0,
      stock_quantity: 150,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      weight: 0.015,
      dimensions: '1.2 x 1.2 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    }
  ];

  for (const product of products) {
    try {
      const { data, error } = await supabase
        .from('products')
        .upsert(product, { onConflict: 'slug' })
        .select();

      if (error) {
        console.error(`❌ Error inserting product ${product.name}:`, error.message);
      } else {
        console.log(`✅ Inserted product: ${product.name} (ID: ${data[0]?.id})`);
      }
    } catch (error) {
      console.error(`❌ Failed to insert product ${product.name}:`, error.message);
    }
  }
}

async function insertProductSpecifications() {
  console.log('📋 Inserting product specifications...');

  const specifications = [
    {
      product_id: 1,
      display: '6.1" Super Retina XDR OLED',
      processor: 'A17 Pro chip',
      memory: '8GB RAM',
      storage: '128GB-1TB',
      camera: '48MP Triple Camera',
      battery: '3274mAh',
      operating_system: 'iOS 17'
    },
    {
      product_id: 2,
      display: '6.7" Super Retina XDR OLED',
      processor: 'A17 Pro chip',
      memory: '8GB RAM',
      storage: '256GB-1TB',
      camera: '48MP Triple Camera',
      battery: '4441mAh',
      operating_system: 'iOS 17'
    },
    {
      product_id: 3,
      display: '6.1" Super Retina XDR OLED',
      processor: 'A15 Bionic chip',
      memory: '6GB RAM',
      storage: '128GB-512GB',
      camera: '12MP Dual Camera',
      battery: '3279mAh',
      operating_system: 'iOS 16'
    },
    {
      product_id: 4,
      display: '6.1" Super Retina XDR OLED',
      processor: 'A15 Bionic chip',
      memory: '4GB RAM',
      storage: '128GB-512GB',
      camera: '12MP Dual Camera',
      battery: '3240mAh',
      operating_system: 'iOS 15'
    }
  ];

  for (const spec of specifications) {
    try {
      const { error } = await supabase
        .from('product_specifications')
        .upsert(spec, { onConflict: 'product_id' });

      if (error) {
        console.error(`❌ Error inserting specifications for product ${spec.product_id}:`, error.message);
      } else {
        console.log(`✅ Inserted specifications for product ID: ${spec.product_id}`);
      }
    } catch (error) {
      console.error(`❌ Failed to insert specifications for product ${spec.product_id}:`, error.message);
    }
  }
}

async function insertSampleReviews() {
  console.log('⭐ Inserting sample reviews...');

  const reviews = [
    {
      product_id: 1,
      rating: 5,
      title: 'Excellent quality screen',
      comment: 'Perfect replacement screen for my iPhone 15 Pro. Installation was easy and the display quality is outstanding.'
    },
    {
      product_id: 2,
      rating: 5,
      title: 'Great Pro Max screen',
      comment: 'High quality display replacement. The colors are vibrant and touch response is perfect.'
    },
    {
      product_id: 5,
      rating: 4,
      title: 'Good battery performance',
      comment: 'Battery performs well and holds charge longer than expected. Good value for money.'
    },
    {
      product_id: 7,
      rating: 5,
      title: 'Perfect camera module',
      comment: 'Camera replacement works flawlessly. Photo quality is back to original iPhone standards.'
    }
  ];

  for (const review of reviews) {
    try {
      const { error } = await supabase
        .from('reviews')
        .insert(review);

      if (error) {
        console.error(`❌ Error inserting review for product ${review.product_id}:`, error.message);
      } else {
        console.log(`✅ Inserted review for product ID: ${review.product_id}`);
      }
    } catch (error) {
      console.error(`❌ Failed to insert review for product ${review.product_id}:`, error.message);
    }
  }
}

async function main() {
  console.log('🚀 Starting iPhone Products Data Insertion...');

  try {
    await insertCategories();
    await insertProducts();
    await insertProductSpecifications();
    await insertSampleReviews();

    console.log('✅ iPhone products data insertion completed successfully!');
    console.log('📱 Your Supabase database now contains iPhone products and parts ready for display.');
    console.log('🎉 You can now view and manage iPhone products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
