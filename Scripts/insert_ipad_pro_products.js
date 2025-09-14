#!/usr/bin/env node

/**
 * Consolidated iPad Pro Products Data Insertion Script
 * This script inserts comprehensive iPad Pro repair parts and accessories for all generations
 * Combines data from multiple separate scripts for better organization and maintainability
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Consolidated product data for all iPad Pro generations
const getAllIpadProProducts = () => {
  return [
    // iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022) - Core Products
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (OEM Pull: Grade A) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-oem-pull-grade-a-all-colors',
      sku: 'IPAD129G5-LCD-OEM-A-ALL',
      description: 'Grade A OEM Pull LCD assembly with digitizer for iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022). Compatible with all colors.',
      price: 237.56,
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
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Aftermarket Plus) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-aftermarket-plus-all-colors',
      sku: 'IPAD129G5-LCD-AP-ALL',
      description: 'Aftermarket Plus LCD assembly with digitizer for iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022). Compatible with all colors.',
      price: 210.24,
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
      name: 'Replacement Battery Compatible For iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022) (AmpSentrix Pro)',
      slug: 'replacement-battery-ipad-pro-12-9-5th-gen-2021-6th-gen-2022-ampsentrix-pro',
      sku: 'IPAD129G5-BATTERY-AMP-PRO',
      description: 'High-quality replacement battery for iPad Pro 12.9" 5th Gen (2021) / 6th Gen (2022) from AmpSentrix Pro.',
      price: 34.68,
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

    // iPad Pro 11" Series - Core Products
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) (OEM Pull: Grade A) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-11-3rd-gen-2021-4th-gen-2022-oem-pull-grade-a-all-colors',
      sku: 'IPAD11G3-LCD-OEM-A-ALL',
      description: 'Grade A OEM Pull LCD assembly with digitizer for iPad Pro 11" 3rd Gen (2021) / 4th Gen (2022). Compatible with all colors.',
      price: 189.45,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.28,
      dimensions: '11 x 8 x 0.4 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'Replacement Battery Compatible For iPad Pro 11" 3rd Gen (2021) / 4th Gen (2022) (AmpSentrix Pro)',
      slug: 'replacement-battery-ipad-pro-11-3rd-gen-2021-4th-gen-2022-ampsentrix-pro',
      sku: 'IPAD11G3-BATTERY-AMP-PRO',
      description: 'High-quality replacement battery for iPad Pro 11" 3rd Gen (2021) / 4th Gen (2022) from AmpSentrix Pro.',
      price: 28.95,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      weight: 0.10,
      dimensions: '9 x 7 x 0.25 inch',
      category_id: 3,
      brand: 'AmpSentrix'
    },

    // iPad Pro 10.5" - Core Products
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 10.5" (2017) (OEM Pull: Grade A) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-10-5-2017-oem-pull-grade-a-all-colors',
      sku: 'IPAD105-LCD-OEM-A-ALL',
      description: 'Grade A OEM Pull LCD assembly with digitizer for iPad Pro 10.5" (2017). Compatible with all colors.',
      price: 145.67,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.25,
      dimensions: '10.5 x 8 x 0.35 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // iPad Pro 9.7" - Core Products
    {
      name: 'LCD Assembly With Digitizer Compatible For iPad Pro 9.7" (2016) (OEM Pull: Grade A) (All Colors)',
      slug: 'lcd-assembly-with-digitizer-ipad-pro-9-7-2016-oem-pull-grade-a-all-colors',
      sku: 'IPAD97-LCD-OEM-A-ALL',
      description: 'Grade A OEM Pull LCD assembly with digitizer for iPad Pro 9.7" (2016). Compatible with all colors.',
      price: 123.89,
      discount_percentage: 0,
      stock_quantity: 10,
      is_featured: true,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      weight: 0.22,
      dimensions: '9.7 x 7.5 x 0.3 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // Common Components (shared across generations)
    {
      name: 'Charging Port Flex Cable Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022) (Space Gray) (Aftermarket Plus)',
      slug: 'charging-port-flex-cable-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-5th-gen-2021-12-9-6th-gen-2022-space-gray-aftermarket-plus',
      sku: 'IPAD-CHARGING-FLEX-AP-GRAY',
      description: 'Aftermarket Plus charging port flex cable for iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen. Space Gray color.',
      price: 3.92,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '4 x 2 x 0.1 inch',
      category_id: 4,
      brand: 'Apple'
    },
    {
      name: 'Front Camera Compatible For iPad Pro 11" 3rd Gen (2021) / Pro 11" 4th Gen (2022) / iPad Pro 12.9" 5th Gen (2021) / Pro 12.9" 6th Gen (2022)',
      slug: 'front-camera-ipad-pro-11-3rd-gen-2021-11-4th-gen-2022-12-9-5th-gen-2021-12-9-6th-gen-2022',
      sku: 'IPAD-FRONT-CAM-11-12-9-GEN',
      description: 'Front camera compatible with iPad Pro 11" 3rd/4th Gen and 12.9" 5th/6th Gen.',
      price: 19.57,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      weight: 0.02,
      dimensions: '2 x 2 x 0.5 inch',
      category_id: 5,
      brand: 'Apple'
    }
  ];
};

async function insertProducts(products) {
  console.log(`📱 Inserting ${products.length} iPad Pro products...`);

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
  console.log('🚀 Starting Consolidated iPad Pro Products Data Insertion...');

  try {
    const allProducts = getAllIpadProProducts();
    await insertProducts(allProducts);

    console.log('✅ iPad Pro products data insertion completed successfully!');
    console.log(`📱 Your Supabase database now contains ${allProducts.length} comprehensive iPad Pro repair parts.`);
    console.log('🎉 You can now view and manage these products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
