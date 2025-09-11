#!/usr/bin/env node

/**
 * Simplified Supabase Database Setup Script for Nexus TechHub
 * Inserts iPhone products data using direct Supabase client methods
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
      name: 'iPhone 15 Screen LCD Assembly',
      slug: 'iphone-15-screen-lcd-assembly',
      sku: 'IP15-SCR-LCD-001',
      description: 'Complete OLED screen assembly for iPhone 15 with Super Retina XDR display, Ceramic Shield protection, and Dynamic Island.',
      price: 279.99,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Pro Screen LCD Assembly',
      slug: 'iphone-15-pro-screen-lcd-assembly',
      sku: 'IP15P-SCR-LCD-001',
      description: 'Premium OLED screen assembly for iPhone 15 Pro with ProMotion technology, 120Hz refresh rate, and Titanium design compatibility.',
      price: 329.99,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.09,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Pro Max Screen LCD Assembly',
      slug: 'iphone-15-pro-max-screen-lcd-assembly',
      sku: 'IP15PM-SCR-LCD-001',
      description: 'Large OLED screen assembly for iPhone 15 Pro Max with 6.7-inch Super Retina XDR display and advanced haptic feedback.',
      price: 379.99,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.11,
      dimensions: '6.7 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Battery Replacement',
      slug: 'iphone-15-battery-replacement',
      sku: 'IP15-BAT-001',
      description: 'Original Apple battery for iPhone 15 with optimized power management and fast charging capability.',
      price: 79.99,
      discount_percentage: 0,
      stock_quantity: 80,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.04,
      dimensions: '3.4 x 2.4 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Charging Port Assembly',
      slug: 'iphone-15-charging-port-assembly',
      sku: 'IP15-CHP-001',
      description: 'USB-C charging port assembly for iPhone 15 with Lightning compatibility and fast charging support.',
      price: 34.99,
      discount_percentage: 0,
      stock_quantity: 120,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1.2 x 0.8 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Pro Camera Module',
      slug: 'iphone-15-pro-camera-module',
      sku: 'IP15P-CAM-001',
      description: 'Rear camera module for iPhone 15 Pro with 48MP main sensor, ultra-wide, and telephoto lenses.',
      price: 149.99,
      discount_percentage: 5,
      stock_quantity: 40,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2.5 x 2 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Front Camera Assembly',
      slug: 'iphone-15-front-camera-assembly',
      sku: 'IP15-FCAM-001',
      description: 'TrueDepth front camera assembly for iPhone 15 with Face ID and 12MP sensor.',
      price: 89.99,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '1.5 x 1 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Speaker Assembly',
      slug: 'iphone-15-speaker-assembly',
      sku: 'IP15-SPK-001',
      description: 'Bottom speaker assembly for iPhone 15 with Taptic Engine and microphone.',
      price: 24.99,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      weight: 0.015,
      dimensions: '2 x 0.5 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Power Button',
      slug: 'iphone-15-power-button',
      sku: 'IP15-PWR-BTN-001',
      description: 'Side power button assembly for iPhone 15 with integrated Action Button functionality.',
      price: 19.99,
      discount_percentage: 0,
      stock_quantity: 150,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      weight: 0.005,
      dimensions: '1 x 0.3 x 0.2 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 15 Back Glass Panel',
      slug: 'iphone-15-back-glass-panel',
      sku: 'IP15-BACK-GLASS-001',
      description: 'Rear glass panel for iPhone 15 with Ceramic Shield protection and color-matched finish.',
      price: 69.99,
      discount_percentage: 0,
      stock_quantity: 70,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.06,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // ===== iPhone 14 Series =====
    {
      name: 'iPhone 14 Screen LCD Assembly',
      slug: 'iphone-14-screen-lcd-assembly',
      sku: 'IP14-SCR-LCD-001',
      description: 'Complete OLED screen assembly for iPhone 14 with Super Retina XDR display and Ceramic Shield.',
      price: 249.99,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 14 Pro Screen LCD Assembly',
      slug: 'iphone-14-pro-screen-lcd-assembly',
      sku: 'IP14P-SCR-LCD-001',
      description: 'Premium OLED screen for iPhone 14 Pro with Always-On display and ProMotion technology.',
      price: 299.99,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.09,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 14 Pro Max Screen LCD Assembly',
      slug: 'iphone-14-pro-max-screen-lcd-assembly',
      sku: 'IP14PM-SCR-LCD-001',
      description: 'Large OLED screen assembly for iPhone 14 Pro Max with 6.7-inch display and advanced features.',
      price: 349.99,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.11,
      dimensions: '6.7 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 14 Battery Replacement',
      slug: 'iphone-14-battery-replacement',
      sku: 'IP14-BAT-001',
      description: 'Replacement battery for iPhone 14 with improved energy efficiency and MagSafe compatibility.',
      price: 69.99,
      discount_percentage: 0,
      stock_quantity: 90,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.04,
      dimensions: '3.4 x 2.4 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 14 Charging Port Assembly',
      slug: 'iphone-14-charging-port-assembly',
      sku: 'IP14-CHP-001',
      description: 'Lightning charging port assembly for iPhone 14 with MagSafe wireless charging support.',
      price: 29.99,
      discount_percentage: 0,
      stock_quantity: 130,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1.2 x 0.8 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 14 Pro Camera Module',
      slug: 'iphone-14-pro-camera-module',
      sku: 'IP14P-CAM-001',
      description: 'Rear camera module for iPhone 14 Pro with 48MP main sensor and advanced photography features.',
      price: 129.99,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2.5 x 2 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // ===== iPhone 13 Series =====
    {
      name: 'iPhone 13 Screen LCD Assembly',
      slug: 'iphone-13-screen-lcd-assembly',
      sku: 'IP13-SCR-LCD-001',
      description: 'Super Retina XDR OLED screen assembly for iPhone 13 with Ceramic Shield protection.',
      price: 199.99,
      discount_percentage: 10,
      stock_quantity: 65,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 13 Pro Screen LCD Assembly',
      slug: 'iphone-13-pro-screen-lcd-assembly',
      sku: 'IP13P-SCR-LCD-001',
      description: 'Premium OLED screen for iPhone 13 Pro with ProMotion 120Hz display and Super Retina XDR.',
      price: 249.99,
      discount_percentage: 10,
      stock_quantity: 50,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.09,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 13 Pro Max Screen LCD Assembly',
      slug: 'iphone-13-pro-max-screen-lcd-assembly',
      sku: 'IP13PM-SCR-LCD-001',
      description: 'Large OLED screen assembly for iPhone 13 Pro Max with 6.7-inch display and advanced features.',
      price: 299.99,
      discount_percentage: 10,
      stock_quantity: 40,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.11,
      dimensions: '6.7 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 13 Battery Replacement',
      slug: 'iphone-13-battery-replacement',
      sku: 'IP13-BAT-001',
      description: 'High-capacity battery replacement for iPhone 13 with optimized performance.',
      price: 59.99,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.04,
      dimensions: '3.3 x 2.3 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 13 Charging Port Assembly',
      slug: 'iphone-13-charging-port-assembly',
      sku: 'IP13-CHP-001',
      description: 'Lightning charging port assembly for iPhone 13 with fast charging capability.',
      price: 24.99,
      discount_percentage: 0,
      stock_quantity: 140,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1.2 x 0.8 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 13 Camera Module',
      slug: 'iphone-13-camera-module',
      sku: 'IP13-CAM-001',
      description: 'Rear camera module for iPhone 13 with dual 12MP sensors and advanced photography.',
      price: 99.99,
      discount_percentage: 0,
      stock_quantity: 55,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2.5 x 2 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // ===== iPhone 12 Series =====
    {
      name: 'iPhone 12 Screen LCD Assembly',
      slug: 'iphone-12-screen-lcd-assembly',
      sku: 'IP12-SCR-LCD-001',
      description: 'Super Retina XDR LCD screen assembly for iPhone 12 with Ceramic Shield protection.',
      price: 179.99,
      discount_percentage: 15,
      stock_quantity: 70,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 12 Pro Screen LCD Assembly',
      slug: 'iphone-12-pro-screen-lcd-assembly',
      sku: 'IP12P-SCR-LCD-001',
      description: 'Premium OLED screen for iPhone 12 Pro with Super Retina XDR display.',
      price: 229.99,
      discount_percentage: 15,
      stock_quantity: 45,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.09,
      dimensions: '6.1 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 12 Pro Max Screen LCD Assembly',
      slug: 'iphone-12-pro-max-screen-lcd-assembly',
      sku: 'IP12PM-SCR-LCD-001',
      description: 'Large OLED screen assembly for iPhone 12 Pro Max with 6.7-inch Super Retina XDR display.',
      price: 279.99,
      discount_percentage: 15,
      stock_quantity: 35,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.11,
      dimensions: '6.7 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 12 Battery Replacement',
      slug: 'iphone-12-battery-replacement',
      sku: 'IP12-BAT-001',
      description: 'Replacement battery for iPhone 12 with improved capacity and MagSafe compatibility.',
      price: 49.99,
      discount_percentage: 0,
      stock_quantity: 110,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
      weight: 0.04,
      dimensions: '3.2 x 2.2 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 12 Charging Port Assembly',
      slug: 'iphone-12-charging-port-assembly',
      sku: 'IP12-CHP-001',
      description: 'Lightning charging port assembly for iPhone 12 with MagSafe wireless charging support.',
      price: 19.99,
      discount_percentage: 0,
      stock_quantity: 150,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '1.2 x 0.8 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 12 Camera Module',
      slug: 'iphone-12-camera-module',
      sku: 'IP12-CAM-001',
      description: 'Rear camera module for iPhone 12 with dual 12MP sensors and Night mode capability.',
      price: 89.99,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2.5 x 2 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'iPhone 12 Back Glass Panel',
      slug: 'iphone-12-back-glass-panel',
      sku: 'IP12-BACK-GLASS-001',
      description: 'Rear glass panel for iPhone 12 with Ceramic Shield protection and wireless charging compatibility.',
      price: 59.99,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.06,
      dimensions: '6.1 inch',
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
    // iPhone 15 Series Specs
    {
      product_id: 1,
      display_type: 'Super Retina XDR OLED',
      resolution: '2556 x 1179 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 15',
      warranty: '6 months'
    },
    {
      product_id: 2,
      display_type: 'Super Retina XDR OLED',
      resolution: '2556 x 1179 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 15 Pro',
      warranty: '6 months'
    },
    {
      product_id: 3,
      display_type: 'Super Retina XDR OLED',
      resolution: '2796 x 1290 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 15 Pro Max',
      warranty: '6 months'
    },
    {
      product_id: 4,
      capacity: '3349mAh',
      voltage: '3.85V',
      compatibility: 'iPhone 15',
      charging_type: 'USB-C, MagSafe',
      warranty: '3 months'
    },
    {
      product_id: 5,
      connector_type: 'USB-C',
      compatibility: 'iPhone 15',
      features: 'Fast charging, Lightning compatible',
      warranty: '3 months'
    },
    {
      product_id: 6,
      sensor_type: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      compatibility: 'iPhone 15 Pro',
      features: 'Pro camera system',
      warranty: '6 months'
    },

    // iPhone 14 Series Specs
    {
      product_id: 11,
      display_type: 'Super Retina XDR OLED',
      resolution: '2532 x 1170 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 14',
      warranty: '6 months'
    },
    {
      product_id: 12,
      display_type: 'Super Retina XDR OLED',
      resolution: '2556 x 1179 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 14 Pro',
      warranty: '6 months'
    },
    {
      product_id: 13,
      display_type: 'Super Retina XDR OLED',
      resolution: '2796 x 1290 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 14 Pro Max',
      warranty: '6 months'
    },

    // iPhone 13 Series Specs
    {
      product_id: 17,
      display_type: 'Super Retina XDR OLED',
      resolution: '2532 x 1170 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 13',
      warranty: '6 months'
    },
    {
      product_id: 18,
      display_type: 'Super Retina XDR OLED',
      resolution: '2532 x 1170 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 13 Pro',
      warranty: '6 months'
    },
    {
      product_id: 19,
      display_type: 'Super Retina XDR OLED',
      resolution: '2778 x 1284 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 13 Pro Max',
      warranty: '6 months'
    },

    // iPhone 12 Series Specs
    {
      product_id: 23,
      display_type: 'Super Retina XDR LCD',
      resolution: '2532 x 1170 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 12',
      warranty: '6 months'
    },
    {
      product_id: 24,
      display_type: 'Super Retina XDR OLED',
      resolution: '2532 x 1170 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 12 Pro',
      warranty: '6 months'
    },
    {
      product_id: 25,
      display_type: 'Super Retina XDR OLED',
      resolution: '2778 x 1284 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 12 Pro Max',
      warranty: '6 months'
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

async function main() {
  console.log('🚀 Starting Simplified Supabase Database Setup for iPhone Products...');

  try {
    await insertCategories();
    await insertProducts();
    await insertProductSpecifications();

    console.log('✅ Simplified database setup completed successfully!');
    console.log('📱 Your Supabase database now contains comprehensive iPhone parts for 15, 14, 13, and 12 series.');
    console.log('🎉 Products include screens, batteries, charging ports, cameras, and more!');
    console.log('🔧 Ready for professional mobile repair services in UAE.');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

main();
