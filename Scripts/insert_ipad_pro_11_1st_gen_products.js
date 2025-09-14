#!/usr/bin/env node

/**
 * Insert iPad Pro 11" 1st Gen (2018) Products Data into Supabase
 * This script inserts comprehensive iPad Pro 11" 1st Gen repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 11" 1st Gen products...');

  const products = [
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 11" 1st Gen (2018) / iPad Pro 11" 2nd Gen (2020) (Aftermarket Plus) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-11-1st-gen-2018-2nd-gen-2020-aftermarket-plus-all-colors',
      sku: 'IPAD11G1-LCD-AP-ALL',
      description: 'Aftermarket Plus LCD assembly with digitizer for iPad Pro 11" 1st Gen (2018) / 2nd Gen (2020). Compatible with all colors.',
      price: 128.03,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.3,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'Replacement Battery Compatible For iPad Pro 11" 1st Gen (2018) (AmpSentrix Pro)',
      slug: 'replacement-battery-ipad-pro-11-1st-gen-2018-ampsentrix-pro',
      sku: 'IPAD11G1-BATTERY-AMP-PRO',
      description: 'High-quality replacement battery for iPad Pro 11" 1st Gen (2018) from AmpSentrix Pro.',
      price: 28.58,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.1,
      dimensions: '9 x 7 x 0.2 inch',
      category_id: 3,
      brand: 'AmpSentrix'
    },
    {
      name: 'Front Camera Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) / iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020)',
      slug: 'front-camera-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-11-1st-gen-2018-2nd-gen-2020',
      sku: 'IPAD11G1-FRONT-CAMERA',
      description: 'Front camera compatible with iPad Pro 12.9" 3rd/4th Gen and 11" 1st/2nd Gen.',
      price: 14.73,
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
      name: 'Back Camera Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad Pro 11" 1st Gen (2018) / iPad Air 4 / iPad Air 5 / iPad Mini 6 / iPad 10 (2022)',
      slug: 'back-camera-ipad-pro-12-9-3rd-gen-2018-11-1st-gen-2018-air-4-air-5-mini-6-ipad-10-2022',
      sku: 'IPAD11G1-BACK-CAMERA',
      description: 'Back camera compatible with iPad Pro 12.9" 3rd Gen / 11" 1st Gen and various iPad Air/Mini models.',
      price: 9.95,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },
    {
      name: 'Loudspeaker Compatible For iPad Pro 11" 1st Gen (2018) (4 Piece Set)',
      slug: 'loudspeaker-ipad-pro-11-1st-gen-2018-4-piece-set',
      sku: 'IPAD11G1-SPEAKER-4PC',
      description: 'Loudspeaker 4-piece set for iPad Pro 11" 1st Gen (2018).',
      price: 19.53,
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
    const { data, error } = await supabase
      .from('products')
      .upsert(products, { onConflict: 'sku' })
      .select();

    if (error) {
      console.error('❌ Error upserting products:', error);
      process.exit(1);
    }

    console.log(`✅ Successfully upserted ${data.length} iPad Pro 11" 1st Gen products into Supabase!`);
    console.log('📊 Products processed:', data.map(p => `${p.name} (${p.sku})`));
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }
}

insertProducts();
