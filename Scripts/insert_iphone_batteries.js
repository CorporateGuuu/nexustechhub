#!/usr/bin/env node

/**
 * Insert iPhone Batteries Data into Supabase
 * This script inserts sample iPhone battery products and parts data
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
  console.log('📂 Inserting iPhone batteries category...');

  const categories = [
    { name: 'iPhone Batteries', slug: 'iphone-batteries', description: 'High-quality replacement batteries for iPhone devices' }
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
  console.log('🔋 Inserting iPhone battery products...');

  const products = [
    {
      name: 'iPhone 15 Pro Max Battery',
      slug: 'iphone-15-pro-max-battery',
      sku: 'IP15PM-BAT-001',
      description: 'Original Apple battery replacement for iPhone 15 Pro Max with optimized power management and MagSafe compatibility.',
      price: 99.99,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.055,
      dimensions: '3.8 x 2.8 x 0.3 inch',
      category_id: 1, // iPhone Parts category
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Battery Replacement',
      slug: 'iphone-15-battery-replacement',
      sku: 'IP15-BAT-RPL-001',
      description: 'High-capacity replacement battery for iPhone 15 with improved energy efficiency and fast charging support.',
      price: 89.99,
      discount_percentage: 5,
      stock_quantity: 60,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '3.7 x 2.7 x 0.3 inch',
      category_id: 8,
      brand: 'Apple'
    },
    {
      name: 'iPhone 14 Battery Replacement',
      slug: 'iphone-14-battery-replacement',
      sku: 'IP14-BAT-RPL-001',
      description: 'OEM quality replacement battery for iPhone 14 with Ceramic Shield protection and optimized performance.',
      price: 79.99,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.048,
      dimensions: '3.6 x 2.6 x 0.3 inch',
      category_id: 8,
      brand: 'Apple'
    },
    {
      name: 'iPhone 13 Battery Replacement',
      slug: 'iphone-13-battery-replacement',
      sku: 'IP13-BAT-RPL-001',
      description: 'Replacement battery for iPhone 13 series with enhanced battery management and longer battery life.',
      price: 69.99,
      discount_percentage: 10,
      stock_quantity: 90,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.045,
      dimensions: '3.5 x 2.5 x 0.3 inch',
      category_id: 8,
      brand: 'Apple'
    },
    {
      name: 'iPhone 12 Battery Replacement',
      slug: 'iphone-12-battery-replacement',
      sku: 'IP12-BAT-RPL-001',
      description: 'Compatible replacement battery for iPhone 12 series with reliable power delivery and safety features.',
      price: 59.99,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.042,
      dimensions: '3.4 x 2.4 x 0.3 inch',
      category_id: 8,
      brand: 'Apple'
    },
    {
      name: 'iPhone 11 Battery',
      slug: 'iphone-11-battery',
      sku: 'IP11-BAT-001',
      description: 'Affordable replacement battery for iPhone 11 with improved charging speed and battery health monitoring.',
      price: 49.99,
      discount_percentage: 5,
      stock_quantity: 120,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.04,
      dimensions: '3.3 x 2.3 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone SE (3rd Gen) Battery',
      slug: 'iphone-se-3rd-gen-battery',
      sku: 'IPSE3-BAT-001',
      description: 'Compact replacement battery for iPhone SE (3rd generation) with optimized power management.',
      price: 44.99,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.035,
      dimensions: '3.1 x 2.1 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone XR Battery',
      slug: 'iphone-xr-battery',
      sku: 'IPXR-BAT-001',
      description: 'Reliable replacement battery for iPhone XR with long-lasting performance and safety features.',
      price: 39.99,
      discount_percentage: 0,
      stock_quantity: 85,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.038,
      dimensions: '3.2 x 2.2 x 0.3 inch',
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
  console.log('📋 Inserting iPhone battery specifications...');

  // First, get the actual product IDs by querying the database
  const productSlugs = [
    'iphone-15-battery-replacement',
    'iphone-14-battery-replacement',
    'iphone-13-battery-replacement'
  ];

  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('id, slug')
    .in('slug', productSlugs);

  if (fetchError) {
    console.error('❌ Error fetching product IDs:', fetchError.message);
    return;
  }

  const productIdMap = {};
  products.forEach(product => {
    productIdMap[product.slug] = product.id;
  });

  const specifications = [
    {
      product_id: productIdMap['iphone-15-battery-replacement'],
      display: 'N/A',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '3349mAh Li-ion',
      operating_system: 'iOS 17',
      additional_features: 'Fast charging 27W, MagSafe wireless charging 15W, Qi wireless charging'
    },
    {
      product_id: productIdMap['iphone-14-battery-replacement'],
      display: 'N/A',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '3279mAh Li-ion',
      operating_system: 'iOS 16',
      additional_features: 'Fast charging 20W, MagSafe wireless charging 15W, Qi wireless charging'
    },
    {
      product_id: productIdMap['iphone-13-battery-replacement'],
      display: 'N/A',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '3240mAh Li-ion',
      operating_system: 'iOS 15',
      additional_features: 'Fast charging 20W, MagSafe wireless charging 15W, Qi wireless charging'
    }
  ];

  for (const spec of specifications) {
    if (!spec.product_id) {
      console.error(`❌ Skipping specification insertion - product ID not found`);
      continue;
    }

    try {
      const { error } = await supabase
        .from('product_specifications')
        .insert(spec);

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
  console.log('⭐ Inserting sample reviews for iPhone batteries...');

  // First, get the actual product IDs by querying the database
  const productSlugs = [
    'iphone-15-battery-replacement',
    'iphone-14-battery-replacement',
    'iphone-13-battery-replacement'
  ];

  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('id, slug')
    .in('slug', productSlugs);

  if (fetchError) {
    console.error('❌ Error fetching product IDs for reviews:', fetchError.message);
    return;
  }

  const productIdMap = {};
  products.forEach(product => {
    productIdMap[product.slug] = product.id;
  });

  const reviews = [
    {
      product_id: productIdMap['iphone-15-battery-replacement'],
      rating: 5,
      title: 'Perfect iPhone 15 battery replacement',
      comment: 'This battery works flawlessly in my iPhone 15. Fast charging and excellent battery life!'
    },
    {
      product_id: productIdMap['iphone-14-battery-replacement'],
      rating: 4,
      title: 'Great value battery',
      comment: 'Solid replacement for iPhone 14. Charges quickly and holds charge well throughout the day.'
    },
    {
      product_id: productIdMap['iphone-13-battery-replacement'],
      rating: 5,
      title: 'Excellent performance',
      comment: 'OEM quality battery for iPhone 13. Installation was straightforward and performance is outstanding.'
    }
  ];

  for (const review of reviews) {
    if (!review.product_id) {
      console.error(`❌ Skipping review insertion - product ID not found`);
      continue;
    }

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
  console.log('🚀 Starting iPhone Batteries Data Insertion...');

  try {
    await insertCategories();
    await insertProducts();
    await insertProductSpecifications();
    await insertSampleReviews();

    console.log('✅ iPhone batteries data insertion completed successfully!');
    console.log('🔋 Your Supabase database now contains iPhone battery products ready for display.');
    console.log('🎉 You can now view and manage iPhone battery products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
