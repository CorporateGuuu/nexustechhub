#!/usr/bin/env node

/**
 * Insert iPad Pro 10.5" Products Data into Supabase
 * This script inserts comprehensive iPad Pro 10.5" repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 10.5" products...');

  const products = [
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 10.5" (Aftermarket Plus) (White)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-10-5-aftermarket-plus-white',
      sku: 'IPAD10P5-LCD-AP-WHITE',
      description: 'Aftermarket Plus LCD assembly with digitizer for iPad Pro 10.5". White color.',
      price: 82.88,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '10.5 x 7.5 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 10.5" (Aftermarket Plus) (Black)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-10-5-aftermarket-plus-black',
      sku: 'IPAD10P5-LCD-AP-BLACK',
      description: 'Aftermarket Plus LCD assembly with digitizer for iPad Pro 10.5". Black color.',
      price: 83.44,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '10.5 x 7.5 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'Replacement Battery Compatible For iPad Pro 10.5" (AmpSentrix Pro)',
      slug: 'replacement-battery-ipad-pro-10-5-ampsentrix-pro',
      sku: 'IPAD10P5-BATTERY-AMP-PRO',
      description: 'High-quality replacement battery for iPad Pro 10.5" from AmpSentrix Pro.',
      price: 24.58,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '8 x 6 x 0.2 inch',
      category_id: 3,
      brand: 'AmpSentrix'
    },
    {
      name: 'Front Camera With Flex Cable Compatible For iPad Pro 10.5" / Air 3 / Mini 5 / 12.9" 2nd Gen (2017)',
      slug: 'front-camera-with-flex-cable-ipad-pro-10-5-air-3-mini-5-12-9-2nd-gen-2017',
      sku: 'IPAD10P5-FRONT-CAMERA',
      description: 'Front camera with flex cable compatible with iPad Pro 10.5", Air 3, Mini 5, and 12.9" 2nd Gen.',
      price: 3.75,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Compatible For iPad Pro 10.5" / iPad Pro 12.9" (2nd Gen: 2017)',
      slug: 'back-camera-ipad-pro-10-5-ipad-pro-12-9-2nd-gen-2017',
      sku: 'IPAD10P5-BACK-CAMERA',
      description: 'Back camera compatible with iPad Pro 10.5" and 12.9" 2nd Gen (2017).',
      price: 21.15,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Loud Speaker Compatible For iPad Pro 10.5 / Air 3 (4 Pieces)',
      slug: 'loud-speaker-ipad-pro-10-5-air-3-4-pieces',
      sku: 'IPAD10P5-SPEAKER-4PC',
      description: 'Loud speaker 4-piece set for iPad Pro 10.5" and Air 3.',
      price: 8.15,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop',
      weight: 0.04,
      dimensions: '4 x 3 x 0.5 inch',
      category_id: 6,
      brand: 'Apple'
    }
  ];

  try {
    let totalInserted = 0;
    const insertedProducts = [];

    for (const product of products) {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert(product)
          .select();

        if (error) {
          // Skip if product already exists
          if (error.code === '23505') {
            console.log(`⚠️  Skipping duplicate product: ${product.name}`);
            continue;
          }
          console.error(`❌ Error inserting product ${product.name}:`, error);
          continue;
        }

        totalInserted++;
        insertedProducts.push(data[0]);
        console.log(`✅ Inserted: ${product.name}`);
      } catch (productError) {
        console.error(`❌ Unexpected error for ${product.name}:`, productError);
        continue;
      }
    }

    console.log(`✅ Successfully processed ${totalInserted} iPad Pro 10.5" products into Supabase!`);
    console.log('📊 Products inserted:', insertedProducts.map(p => `${p.name} (${p.sku})`));
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }
}

insertProducts();
