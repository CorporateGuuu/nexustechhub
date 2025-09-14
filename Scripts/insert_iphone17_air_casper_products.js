#!/usr/bin/env node

/**
 * Insert iPhone 17 Air Casper Products Data into Supabase
 * This script inserts Casper screen protectors and accessories for iPhone 17 Air
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

async function insertProducts() {
  console.log('📱 Inserting iPhone 17 Air Casper products...');

  const products = [
    // Camera Lens Protectors
    {
      name: 'Casper Camera Lens Protector Compatible For iPhone Air (Black) (Clear)',
      slug: 'casper-camera-lens-protector-iphone-air-black-clear',
      sku: 'CASPER-CLP-17AIR-BLK-CLR',
      description: 'Premium camera lens protector for iPhone 17 Air in black with clear finish. Provides ultimate protection for your camera lens from scratches and damage.',
      price: 8.99,
      discount_percentage: 0,
      stock_quantity: 150,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '0.5 x 0.5 x 0.1 inch',
      category_id: 2, // Accessories category
      brand: 'Casper'
    },
    {
      name: 'Casper Camera Lens Protector Compatible For iPhone Air (Crystal Full Cover)',
      slug: 'casper-camera-lens-protector-iphone-air-crystal-full-cover',
      sku: 'CASPER-CLP-17AIR-CRYSTAL-FC',
      description: 'Crystal clear full cover camera lens protector for iPhone 17 Air. Complete protection with crystal clarity for optimal camera performance.',
      price: 12.99,
      discount_percentage: 0,
      stock_quantity: 120,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=300&fit=crop',
      weight: 0.01,
      dimensions: '0.6 x 0.6 x 0.1 inch',
      category_id: 2,
      brand: 'Casper'
    },

    // Tempered Glass - Retail Pack
    {
      name: 'Casper Pro Tempered Glass Compatible For iPhone Air (Retail Pack) (Clear)',
      slug: 'casper-pro-tempered-glass-iphone-air-retail-pack-clear',
      sku: 'CASPER-TG-17AIR-RP-CLR',
      description: 'Professional tempered glass screen protector for iPhone 17 Air. Retail pack with clear finish, 9H hardness for maximum scratch resistance.',
      price: 15.99,
      discount_percentage: 0,
      stock_quantity: 200,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '6.1 x 2.8 x 0.1 inch',
      category_id: 2,
      brand: 'Casper'
    },
    {
      name: 'Casper Pro Tempered Glass Compatible For iPhone Air (Retail Pack) (Matte)',
      slug: 'casper-pro-tempered-glass-iphone-air-retail-pack-matte',
      sku: 'CASPER-TG-17AIR-RP-MATTE',
      description: 'Professional tempered glass screen protector for iPhone 17 Air. Retail pack with matte finish, anti-glare surface with 9H hardness protection.',
      price: 17.99,
      discount_percentage: 0,
      stock_quantity: 180,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '6.1 x 2.8 x 0.1 inch',
      category_id: 2,
      brand: 'Casper'
    },
    {
      name: 'Casper Pro Tempered Glass Compatible For iPhone Air (Retail Pack) (Privacy)',
      slug: 'casper-pro-tempered-glass-iphone-air-retail-pack-privacy',
      sku: 'CASPER-TG-17AIR-RP-PRIVACY',
      description: 'Professional tempered glass screen protector for iPhone 17 Air. Retail pack with privacy filter, blocks side viewing angles for enhanced security.',
      price: 19.99,
      discount_percentage: 0,
      stock_quantity: 160,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '6.1 x 2.8 x 0.1 inch',
      category_id: 2,
      brand: 'Casper'
    },

    // Silicone Tempered Glass - Retail Pack
    {
      name: 'Casper Pro Silicone Tempered Glass Compatible For iPhone Air (Retail Pack) (Clear)',
      slug: 'casper-pro-silicone-tempered-glass-iphone-air-retail-pack-clear',
      sku: 'CASPER-STG-17AIR-RP-CLR',
      description: 'Professional silicone tempered glass screen protector for iPhone 17 Air. Retail pack with clear finish, flexible silicone frame for perfect fit.',
      price: 22.99,
      discount_percentage: 0,
      stock_quantity: 140,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '6.2 x 2.9 x 0.2 inch',
      category_id: 2,
      brand: 'Casper'
    },

    // Tempered Glass - 10 Pack
    {
      name: 'Casper Pro Tempered Glass Compatible For iPhone Air (10 Pack) (Clear)',
      slug: 'casper-pro-tempered-glass-iphone-air-10-pack-clear',
      sku: 'CASPER-TG-17AIR-10P-CLR',
      description: 'Professional tempered glass screen protector for iPhone 17 Air. Bulk 10-pack with clear finish, perfect for retailers and repair shops.',
      price: 89.99,
      discount_percentage: 15,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.20,
      dimensions: '8 x 6 x 1 inch',
      category_id: 2,
      brand: 'Casper'
    },
    {
      name: 'Casper Pro Tempered Glass Compatible For iPhone Air (10 Pack) (Matte)',
      slug: 'casper-pro-tempered-glass-iphone-air-10-pack-matte',
      sku: 'CASPER-TG-17AIR-10P-MATTE',
      description: 'Professional tempered glass screen protector for iPhone 17 Air. Bulk 10-pack with matte finish, anti-glare surface for bulk purchasing.',
      price: 94.99,
      discount_percentage: 15,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.20,
      dimensions: '8 x 6 x 1 inch',
      category_id: 2,
      brand: 'Casper'
    },
    {
      name: 'Casper Pro Tempered Glass Compatible For iPhone Air (10 Pack) (Privacy)',
      slug: 'casper-pro-tempered-glass-iphone-air-10-pack-privacy',
      sku: 'CASPER-TG-17AIR-10P-PRIVACY',
      description: 'Professional tempered glass screen protector for iPhone 17 Air. Bulk 10-pack with privacy filter, blocks side viewing for bulk security needs.',
      price: 109.99,
      discount_percentage: 15,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.20,
      dimensions: '8 x 6 x 1 inch',
      category_id: 2,
      brand: 'Casper'
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

async function main() {
  console.log('🚀 Starting iPhone 17 Air Casper Products Data Insertion...');

  try {
    await insertProducts();

    console.log('✅ iPhone 17 Air Casper products data insertion completed successfully!');
    console.log('📱 Your Supabase database now contains Casper screen protectors and accessories for iPhone 17 Air.');
    console.log('🎉 You can now view and manage these products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
