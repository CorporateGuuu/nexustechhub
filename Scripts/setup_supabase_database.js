#!/usr/bin/env node

/**
 * Supabase Database Setup Script for Nexus TechHub
 * Creates tables, policies, and inserts sample iPhone products data
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

async function executeSQL(sql) {
  try {
    const { data, error } = await supabase.rpc('exec', { query: sql });
    if (error) {
      console.error('❌ SQL Error:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('❌ Execution Error:', error);
    return false;
  }
}

async function createTables() {
  console.log('📋 Creating database tables...');

  // Create categories table
  const categoriesSQL = `
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) NOT NULL UNIQUE,
      description TEXT,
      image_url VARCHAR(255),
      parent_id INTEGER REFERENCES categories(id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Create products table
  const productsSQL = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      sku VARCHAR(50) UNIQUE,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      discount_percentage DECIMAL(5, 2),
      stock_quantity INTEGER NOT NULL DEFAULT 0,
      is_featured BOOLEAN DEFAULT FALSE,
      is_new BOOLEAN DEFAULT FALSE,
      image_url VARCHAR(255),
      weight DECIMAL(8, 2),
      dimensions VARCHAR(50),
      category_id INTEGER REFERENCES categories(id),
      brand VARCHAR(100),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Create product_images table
  const productImagesSQL = `
    CREATE TABLE IF NOT EXISTS product_images (
      id SERIAL PRIMARY KEY,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      image_url VARCHAR(255) NOT NULL,
      is_primary BOOLEAN DEFAULT FALSE,
      display_order INTEGER DEFAULT 0
    );
  `;

  // Create product_specifications table
  const productSpecsSQL = `
    CREATE TABLE IF NOT EXISTS product_specifications (
      id SERIAL PRIMARY KEY,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      display VARCHAR(255),
      processor VARCHAR(255),
      memory VARCHAR(255),
      storage VARCHAR(255),
      camera VARCHAR(255),
      battery VARCHAR(255),
      operating_system VARCHAR(255),
      additional_features TEXT
    );
  `;

  // Create reviews table
  const reviewsSQL = `
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
      rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      title VARCHAR(255),
      comment TEXT,
      is_verified_purchase BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Execute table creation
  const tables = [
    { name: 'categories', sql: categoriesSQL },
    { name: 'products', sql: productsSQL },
    { name: 'product_images', sql: productImagesSQL },
    { name: 'product_specifications', sql: productSpecsSQL },
    { name: 'reviews', sql: reviewsSQL }
  ];

  for (const table of tables) {
    console.log(`Creating ${table.name} table...`);
    const success = await executeSQL(table.sql);
    if (!success) {
      console.log(`⚠️  Failed to create ${table.name} table, it might already exist`);
    }
  }
}

async function insertSampleData() {
  console.log('📦 Inserting sample iPhone products data...');

  // Insert categories
  const categoriesData = [
    { name: 'iPhone Parts', slug: 'iphone-parts', description: 'High-quality replacement parts for iPhone devices' },
    { name: 'Samsung Parts', slug: 'samsung-parts', description: 'Genuine Samsung replacement components' },
    { name: 'iPad Parts', slug: 'ipad-parts', description: 'iPad screens, batteries, and accessories' },
    { name: 'Tools', slug: 'tools', description: 'Professional repair tools and equipment' },
    { name: 'MacBook Parts', slug: 'macbook-parts', description: 'MacBook repair parts and components' }
  ];

  for (const category of categoriesData) {
    const { error } = await supabase
      .from('categories')
      .upsert(category, { onConflict: 'slug' });

    if (error) {
      console.error(`❌ Error inserting category ${category.name}:`, error);
    } else {
      console.log(`✅ Inserted category: ${category.name}`);
    }
  }

  // Insert iPhone products
  const iphoneProducts = [
    {
      name: 'iPhone 15 Pro Screen',
      slug: 'iphone-15-pro-screen',
      sku: 'IP15P-SCR-001',
      description: 'High-quality OLED screen replacement for iPhone 15 Pro with premium glass',
      price: 299.99,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: true,
      is_new: true,
      image_url: '/images/iphone15pro-screen.jpg',
      brand: 'Apple',
      category_id: 1
    },
    {
      name: 'iPhone 15 Pro Max Screen',
      slug: 'iphone-15-pro-max-screen',
      sku: 'IP15PM-SCR-001',
      description: 'Premium OLED screen for iPhone 15 Pro Max with advanced touch technology',
      price: 349.99,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: '/images/iphone15pm-screen.jpg',
      brand: 'Apple',
      category_id: 1
    },
    {
      name: 'iPhone 14 Screen',
      slug: 'iphone-14-screen',
      sku: 'IP14-SCR-001',
      description: 'High-quality LCD screen replacement for iPhone 14',
      price: 249.99,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: false,
      image_url: '/images/iphone14-screen.jpg',
      brand: 'Apple',
      category_id: 1
    },
    {
      name: 'iPhone 13 Screen',
      slug: 'iphone-13-screen',
      sku: 'IP13-SCR-001',
      description: 'Super Retina XDR display replacement for iPhone 13',
      price: 199.99,
      discount_percentage: 10,
      stock_quantity: 75,
      is_featured: false,
      is_new: false,
      image_url: '/images/iphone13-screen.jpg',
      brand: 'Apple',
      category_id: 1
    },
    {
      name: 'iPhone 15 Battery',
      slug: 'iphone-15-battery',
      sku: 'IP15-BAT-001',
      description: 'Original Apple battery replacement for iPhone 15 series',
      price: 89.99,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: true,
      is_new: true,
      image_url: '/images/iphone15-battery.jpg',
      brand: 'Apple',
      category_id: 1
    },
    {
      name: 'iPhone Charging Port',
      slug: 'iphone-charging-port',
      sku: 'IP-CHP-001',
      description: 'Lightning charging port assembly for all iPhone models',
      price: 29.99,
      discount_percentage: 0,
      stock_quantity: 200,
      is_featured: false,
      is_new: false,
      image_url: '/images/iphone-charging-port.jpg',
      brand: 'Apple',
      category_id: 1
    },
    {
      name: 'iPhone Camera Module',
      slug: 'iphone-camera-module',
      sku: 'IP-CAM-001',
      description: 'Rear camera module replacement for iPhone 15 Pro',
      price: 149.99,
      discount_percentage: 5,
      stock_quantity: 30,
      is_featured: true,
      is_new: true,
      image_url: '/images/iphone-camera.jpg',
      brand: 'Apple',
      category_id: 1
    }
  ];

  for (const product of iphoneProducts) {
    const { error } = await supabase
      .from('products')
      .upsert(product, { onConflict: 'slug' });

    if (error) {
      console.error(`❌ Error inserting product ${product.name}:`, error);
    } else {
      console.log(`✅ Inserted product: ${product.name}`);
    }
  }

  // Insert product images
  const productImages = [
    { product_id: 1, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', is_primary: true, display_order: 1 },
    { product_id: 2, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', is_primary: true, display_order: 1 },
    { product_id: 3, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', is_primary: true, display_order: 1 },
    { product_id: 4, image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', is_primary: true, display_order: 1 },
    { product_id: 5, image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop', is_primary: true, display_order: 1 },
    { product_id: 6, image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop', is_primary: true, display_order: 1 },
    { product_id: 7, image_url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=300&fit=crop', is_primary: true, display_order: 1 }
  ];

  for (const image of productImages) {
    const { error } = await supabase
      .from('product_images')
      .upsert(image, { onConflict: 'product_id,image_url' });

    if (error) {
      console.error(`❌ Error inserting product image:`, error);
    }
  }

  // Insert product specifications
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
    }
  ];

  for (const spec of specifications) {
    const { error } = await supabase
      .from('product_specifications')
      .upsert(spec, { onConflict: 'product_id' });

    if (error) {
      console.error(`❌ Error inserting specifications:`, error);
    }
  }

  // Insert sample reviews
  const reviews = [
    { product_id: 1, rating: 5, title: 'Excellent quality', comment: 'Perfect replacement screen, works flawlessly' },
    { product_id: 2, rating: 5, title: 'Great screen', comment: 'High quality display, easy installation' },
    { product_id: 5, rating: 4, title: 'Good battery life', comment: 'Battery performs well, good value for money' }
  ];

  for (const review of reviews) {
    const { error } = await supabase
      .from('reviews')
      .insert(review);

    if (error) {
      console.error(`❌ Error inserting review:`, error);
    }
  }
}

async function setupRLS() {
  console.log('🔒 Setting up Row Level Security...');

  const rlsPolicies = [
    'ALTER TABLE categories ENABLE ROW LEVEL SECURITY;',
    'ALTER TABLE products ENABLE ROW LEVEL SECURITY;',
    'ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;',
    'ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;',
    'ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;',
    'CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);',
    'CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);',
    'CREATE POLICY "Product images are viewable by everyone" ON product_images FOR SELECT USING (true);',
    'CREATE POLICY "Product specifications are viewable by everyone" ON product_specifications FOR SELECT USING (true);',
    'CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);'
  ];

  for (const policy of rlsPolicies) {
    await executeSQL(policy);
  }
}

async function main() {
  console.log('🚀 Starting Supabase Database Setup for iPhone Products...');

  try {
    await createTables();
    await insertSampleData();
    await setupRLS();

    console.log('✅ Database setup completed successfully!');
    console.log('📱 iPhone products database is ready for display.');
    console.log('🎉 You can now view iPhone parts and products in your application.');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

main();
