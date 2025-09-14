#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co';
const supabaseServiceKey = 'REMOVED_COMPROMISED_CREDENTIAL';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertProducts() {
  console.log('📱 Inserting iPhone 16e products...');

  const products = [
    {
      name: 'LCD Assembly Compatible For iPhone 16e (Aftermarket: AQ7 / Incell)',
      slug: 'lcd-assembly-iphone-16e-aftermarket-aq7-incell',
      sku: 'IP16E-LCD-AQ7',
      description: 'High-quality LCD assembly replacement for iPhone 16e with AQ7 aftermarket technology and Incell display.',
      price: 23.48,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.08,
      dimensions: '6.06 x 2.74 x 0.31 inch',
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

async function main() {
  console.log('🚀 Starting iPhone 16e Products Data Insertion...');

  try {
    await insertProducts();
    console.log('✅ iPhone 16e products data insertion completed successfully!');
  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
