#!/usr/bin/env node

/**
 * Insert iPad Pro 11" 3rd Gen (2021) Products Data into Supabase
 * This script inserts comprehensive iPad Pro 11" 3rd Gen repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 11" 3rd Gen products...');

  const products = [
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (Blemish: Grade A) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-11-3rd-gen-2021-4th-gen-2022-blemish-grade-a-all-colors',
      sku: 'IPAD11G3-LCD-BLEMISH-A-ALL',
      description: 'Blemish Grade A LCD assembly with digitizer for iPad Pro 11" 3rd Gen (2021) / 4th Gen (2022). Compatible with all colors.',
      price: 141.67,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.3,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 11" 3rd Gen (2021) / iPad Pro 11" 4th Gen (2022) (Aftermarket Plus) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-11-3rd-gen-2021-4th-gen-2022-aftermarket-plus-all-colors',
      sku: 'IPAD11G3-LCD-AP-ALL',
      description: 'Aftermarket Plus LCD assembly with digitizer for iPad Pro 11" 3rd Gen (2021) / 4th Gen (2022). Compatible with all colors.',
      price: 120.50,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.3,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'Replacement Battery Compatible For iPad Pro 11" 3rd Gen (2021) (AmpSentrix Pro)',
      slug: 'replacement-battery-ipad-pro-11-3rd-gen-2021-ampsentrix-pro',
      sku: 'IPAD11G3-BATTERY-AMP-PRO',
      description: 'High-quality replacement battery for iPad Pro 11" 3rd Gen (2021) from AmpSentrix Pro.',
      price: 30.35,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '9 x 7 x 0.2 inch',
      category_id: 3,
      brand: 'AmpSentrix'
    },
    {
      name: 'Front Camera Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022)',
      slug: 'front-camera-ipad-pro-11-3rd-gen-2021-4th-gen-2022-12-9-5th-gen-2021-6th-gen-2022',
      sku: 'IPAD11G3-FRONT-CAMERA',
      description: 'Front camera compatible with iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen.',
      price: 19.57,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Compatible For iPad Pro 11" 2nd Gen (2020) / 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 4th Gen (2020) / Pro 5th Gen (2021) / Pro 12.9" 6th Gen (2022)',
      slug: 'back-camera-ipad-pro-11-2nd-gen-2020-3rd-gen-2021-4th-gen-2022-12-9-4th-gen-2020-5th-gen-2021-6th-gen-2022',
      sku: 'IPAD11G3-BACK-CAMERA',
      description: 'Back camera compatible with iPad Pro 11" 2nd/3rd/4th Gen and 12.9" 4th/5th/6th Gen.',
      price: 33.11,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
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

    console.log(`✅ Successfully processed ${totalInserted} iPad Pro 11" 3rd Gen products into Supabase!`);
    console.log('📊 Products inserted:', insertedProducts.map(p => `${p.name} (${p.sku})`));
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }
}

insertProducts();
