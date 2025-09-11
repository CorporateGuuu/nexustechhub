#!/usr/bin/env node

/**
 * Insert Samsung Batteries Data into Supabase
 * This script inserts sample Samsung battery products and parts data
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
  console.log('📂 Inserting Samsung batteries category...');

  const categories = [
    { name: 'Samsung Batteries', slug: 'samsung-batteries', description: 'High-quality replacement batteries for Samsung Galaxy devices' }
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
  console.log('🔋 Inserting Samsung battery products...');

  const products = [
    {
      name: 'Samsung Galaxy S24 Ultra Battery',
      slug: 'samsung-galaxy-s24-ultra-battery',
      sku: 'SGS24U-BAT-001',
      description: 'Original capacity replacement battery for Samsung Galaxy S24 Ultra with optimized power management and fast charging support.',
      price: 89.99,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.06,
      dimensions: '3.8 x 2.8 x 0.4 inch',
      category_id: 2, // Samsung Parts category
      brand: 'Samsung'
    },
    {
      name: 'Samsung Galaxy S23 Battery',
      slug: 'samsung-galaxy-s23-battery',
      sku: 'SGS23-BAT-001',
      description: 'High-capacity replacement battery for Samsung Galaxy S23 series with improved energy efficiency and longer battery life.',
      price: 79.99,
      discount_percentage: 5,
      stock_quantity: 75,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.055,
      dimensions: '3.7 x 2.7 x 0.4 inch',
      category_id: 2,
      brand: 'Samsung'
    },
    {
      name: 'Samsung Galaxy S22 Battery',
      slug: 'samsung-galaxy-s22-battery',
      sku: 'SGS22-BAT-001',
      description: 'OEM quality replacement battery for Samsung Galaxy S22 with fast charging capability and optimized performance.',
      price: 69.99,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.05,
      dimensions: '3.6 x 2.6 x 0.4 inch',
      category_id: 2,
      brand: 'Samsung'
    },
    {
      name: 'Samsung Galaxy Note 20 Battery',
      slug: 'samsung-galaxy-note-20-battery',
      sku: 'SGN20-BAT-001',
      description: 'Replacement battery for Samsung Galaxy Note 20 series with S Pen compatibility and enhanced battery management.',
      price: 59.99,
      discount_percentage: 10,
      stock_quantity: 60,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.045,
      dimensions: '3.5 x 2.5 x 0.4 inch',
      category_id: 2,
      brand: 'Samsung'
    },
    {
      name: 'Samsung Galaxy A54 Battery',
      slug: 'samsung-galaxy-a54-battery',
      sku: 'SGA54-BAT-001',
      description: 'Affordable replacement battery for Samsung Galaxy A54 with reliable performance and long-lasting power.',
      price: 49.99,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.04,
      dimensions: '3.4 x 2.4 x 0.4 inch',
      category_id: 2,
      brand: 'Samsung'
    },
    {
      name: 'Samsung Galaxy Z Fold 5 Battery',
      slug: 'samsung-galaxy-z-fold-5-battery',
      sku: 'SGZF5-BAT-001',
      description: 'Specialized battery replacement for Samsung Galaxy Z Fold 5 with flexible display compatibility and high capacity.',
      price: 99.99,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.07,
      dimensions: '4.0 x 3.0 x 0.4 inch',
      category_id: 2,
      brand: 'Samsung'
    },
    {
      name: 'Samsung Galaxy S21 Battery',
      slug: 'samsung-galaxy-s21-battery',
      sku: 'SGS21-BAT-001',
      description: 'Compatible replacement battery for Samsung Galaxy S21 series with improved charging speed and battery health monitoring.',
      price: 64.99,
      discount_percentage: 0,
      stock_quantity: 90,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.048,
      dimensions: '3.55 x 2.55 x 0.4 inch',
      category_id: 2,
      brand: 'Samsung'
    },
    {
      name: 'Samsung Galaxy A73 Battery',
      slug: 'samsung-galaxy-a73-battery',
      sku: 'SGA73-BAT-001',
      description: 'Budget-friendly replacement battery for Samsung Galaxy A73 with reliable power delivery and safety features.',
      price: 54.99,
      discount_percentage: 5,
      stock_quantity: 70,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.042,
      dimensions: '3.3 x 2.3 x 0.4 inch',
      category_id: 2,
      brand: 'Samsung'
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
  console.log('📋 Inserting Samsung battery specifications...');

  // First, get the actual product IDs by querying the database
  const productSlugs = [
    'samsung-galaxy-s24-ultra-battery',
    'samsung-galaxy-s23-battery',
    'samsung-galaxy-s22-battery',
    'samsung-galaxy-note-20-battery'
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
      product_id: productIdMap['samsung-galaxy-s24-ultra-battery'],
      display: 'N/A',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '5000mAh Li-ion',
      operating_system: 'Android 14',
      additional_features: 'Fast charging 45W, Wireless charging 15W, Reverse wireless charging'
    },
    {
      product_id: productIdMap['samsung-galaxy-s23-battery'],
      display: 'N/A',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '3900mAh Li-ion',
      operating_system: 'Android 13',
      additional_features: 'Fast charging 25W, Wireless charging 15W'
    },
    {
      product_id: productIdMap['samsung-galaxy-s22-battery'],
      display: 'N/A',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '3700mAh Li-ion',
      operating_system: 'Android 12',
      additional_features: 'Fast charging 25W, Wireless charging 15W'
    },
    {
      product_id: productIdMap['samsung-galaxy-note-20-battery'],
      display: 'N/A',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '4300mAh Li-ion',
      operating_system: 'Android 11',
      additional_features: 'Fast charging 25W, S Pen support'
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
  console.log('⭐ Inserting sample reviews for Samsung batteries...');

  // First, get the actual product IDs by querying the database
  const productSlugs = [
    'samsung-galaxy-s24-ultra-battery',
    'samsung-galaxy-s23-battery',
    'samsung-galaxy-s22-battery',
    'samsung-galaxy-note-20-battery'
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
      product_id: productIdMap['samsung-galaxy-s24-ultra-battery'],
      rating: 5,
      title: 'Excellent battery performance',
      comment: 'This replacement battery for my Galaxy S24 Ultra works perfectly. Fast charging and long battery life!'
    },
    {
      product_id: productIdMap['samsung-galaxy-s23-battery'],
      rating: 4,
      title: 'Good value for money',
      comment: 'Solid replacement battery for Galaxy S23. Charges quickly and holds charge well.'
    },
    {
      product_id: productIdMap['samsung-galaxy-s22-battery'],
      rating: 5,
      title: 'Perfect fit and performance',
      comment: 'OEM quality battery for my Galaxy S22. Installation was easy and performance is outstanding.'
    },
    {
      product_id: productIdMap['samsung-galaxy-note-20-battery'],
      rating: 4,
      title: 'Reliable battery replacement',
      comment: 'Good battery for Galaxy Note 20. Works well with S Pen and has decent battery life.'
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
  console.log('🚀 Starting Samsung Batteries Data Insertion...');

  try {
    await insertCategories();
    await insertProducts();
    await insertProductSpecifications();
    await insertSampleReviews();

    console.log('✅ Samsung batteries data insertion completed successfully!');
    console.log('🔋 Your Supabase database now contains Samsung battery products ready for display.');
    console.log('🎉 You can now view and manage Samsung battery products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
