#!/usr/bin/env node

/**
 * Insert iPad Pro 12.9" 4th Gen (2020) Products Data into Supabase
 * This script inserts comprehensive iPad Pro 12.9" 4th Gen repair parts and accessories
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
  console.log('📱 Inserting iPad Pro 12.9" 4th Gen products...');

  const products = [
    // LCD Assemblies
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020) (Blemish: Grade A) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-3rd-gen-2018-ipad-12-9-4th-gen-2020-blemish-grade-a-all-colors',
      sku: 'IPAD129G4-LCD-BLEMISH-A-ALL',
      description: 'Blemish Grade A LCD assembly with digitizer for iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020). Compatible with all colors.',
      price: 120.03,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.35,
      dimensions: '12 x 9 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020) (Aftermarket Plus) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-3rd-gen-2018-ipad-12-9-4th-gen-2020-aftermarket-plus-all-colors',
      sku: 'IPAD129G4-LCD-AP-ALL',
      description: 'Aftermarket Plus LCD assembly with digitizer for iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020). Compatible with all colors.',
      price: 130.56,
      discount_percentage: 0,
      stock_quantity: 25,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.35,
      dimensions: '12 x 9 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020) (XO7) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-3rd-gen-2018-ipad-12-9-4th-gen-2020-xo7-all-colors',
      sku: 'IPAD129G4-LCD-XO7-ALL',
      description: 'XO7 LCD assembly with digitizer for iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020). Compatible with all colors.',
      price: 137.79,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.35,
      dimensions: '12 x 9 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020) (Premium) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-3rd-gen-2018-ipad-12-9-4th-gen-2020-premium-all-colors',
      sku: 'IPAD129G4-LCD-PREM-ALL',
      description: 'Premium LCD assembly with digitizer for iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020). Compatible with all colors.',
      price: 170.97,
      discount_percentage: 0,
      stock_quantity: 18,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.35,
      dimensions: '12 x 9 x 0.5 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // Digitizers
    {
      name: 'Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / 12.9" 4th Gen (2020) (Glass Separation Required) (Aftermarket Plus) (All Colors)',
      slug: 'digitizer-ipad-pro-12-9-3rd-gen-2018-12-9-4th-gen-2020-glass-separation-required-aftermarket-plus-all-colors',
      sku: 'IPAD129G4-DIGITIZER-AP-ALL',
      description: 'Aftermarket Plus digitizer for iPad Pro 12.9" 3rd/4th Gen. Glass separation required. Compatible with all colors.',
      price: 28.22,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.2,
      dimensions: '12 x 9 x 0.3 inch',
      category_id: 2,
      brand: 'Apple'
    },
    {
      name: 'Digitizer Compatible For iPad Pro 12.9" 3rd Gen (2018) / 12.9" 4th Gen (2020) (Glass Separation Required) (Premium) (All Colors)',
      slug: 'digitizer-ipad-pro-12-9-3rd-gen-2018-12-9-4th-gen-2020-glass-separation-required-premium-all-colors',
      sku: 'IPAD129G4-DIGITIZER-PREM-ALL',
      description: 'Premium digitizer for iPad Pro 12.9" 3rd/4th Gen. Glass separation required. Compatible with all colors.',
      price: 45.49,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.2,
      dimensions: '12 x 9 x 0.3 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Front Glass
    {
      name: 'Front Glass Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) (Glass Separation Required) (All Colors)',
      slug: 'front-glass-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-glass-separation-required-all-colors',
      sku: 'IPAD129G4-FRONT-GLASS-ALL',
      description: 'Front glass for iPad Pro 12.9" 3rd/4th Gen. Glass separation required. Compatible with all colors.',
      price: 4.80,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '12 x 9 x 0.1 inch',
      category_id: 2,
      brand: 'Apple'
    },

    // Batteries
    {
      name: 'Replacement Battery Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) (AmpSentrix Pro)',
      slug: 'replacement-battery-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-ampsentrix-pro',
      sku: 'IPAD129G4-BATTERY-AMP-PRO',
      description: 'High-quality replacement battery for iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) from AmpSentrix Pro.',
      price: 35.31,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.12,
      dimensions: '10 x 8 x 0.3 inch',
      category_id: 3,
      brand: 'AmpSentrix'
    },

    // Cameras
    {
      name: 'Front Camera Compatible For iPad Pro 12.9" 3rd Gen (2018) / 4th Gen (2020) / iPad Pro 11" 1st Gen (2018) / Pro 11" 2nd Gen (2020)',
      slug: 'front-camera-ipad-pro-12-9-3rd-gen-2018-4th-gen-2020-ipad-pro-11-1st-gen-2018-pro-11-2nd-gen-2020',
      sku: 'IPAD129G4-FRONT-CAM-GEN',
      description: 'Front camera compatible with iPad Pro 12.9" 3rd/4th Gen and 11" 1st/2nd Gen.',
      price: 14.73,
      discount_percentage: 0,
      stock_quantity: 40,
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
      slug: 'back-camera-ipad-pro-11-2nd-gen-2020-3rd-gen-2021-11-4th-gen-2022-12-9-4th-gen-2020-5th-gen-2021-12-9-6th-gen-2022',
      sku: 'IPAD-BACK-CAM-11-12-9-GEN',
      description: 'Back camera compatible with iPad Pro 11" 2nd/3rd/4th Gen and 12.9" 4th/5th/6th Gen.',
      price: 33.11,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '2 x 2 x 0.6 inch',
      category_id: 5,
      brand: 'Apple'
    },

    // Casper Tempered Glass
    {
      name: 'Casper Pro Tempered Glass Compatible For iPad Pro 12.9" 3rd Gen (2018) / iPad 12.9" 4th Gen (2020) / iPad 12.9" 5th Gen (2021) / iPad 12.9" 6th Gen (2022) (Retail Pack) (Clear)',
      slug: 'casper-pro-tempered-glass-ipad-pro-12-9-3rd-gen-2018-ipad-12-9-4th-gen-2020-ipad-12-9-5th-gen-2021-ipad-12-9-6th-gen-2022-retail-pack-clear',
      sku: 'CASPER-TG-IPAD12-9-GEN-RP-CLEAR',
      description: 'Casper Pro tempered glass screen protector for iPad Pro 12.9" various generations. Retail pack with clear finish.',
      price: 34.99,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      weight: 0.03,
      dimensions: '12 x 9 x 0.1 inch',
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
  console.log('🚀 Starting iPad Pro 12.9" 4th Gen Products Data Insertion...');

  try {
    await insertProducts();

    console.log('✅ iPad Pro 12.9" 4th Gen products data insertion completed successfully!');
    console.log('📱 Your Supabase database now contains comprehensive iPad Pro 12.9" 4th Gen repair parts.');
    console.log('🎉 You can now view and manage these products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
