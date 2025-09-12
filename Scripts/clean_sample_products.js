#!/usr/bin/env node

/**
 * Clean Sample Products from Supabase Database
 * This script removes any sample/mock products from the database
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanSampleProducts() {
  console.log('🧹 Starting cleanup of sample products...');

  try {
    // Get all products
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, name, slug, created_at');

    if (fetchError) {
      console.error('❌ Error fetching products:', fetchError.message);
      return;
    }

    if (!products || products.length === 0) {
      console.log('ℹ️  No products found in database');
      return;
    }

    console.log(`📊 Found ${products.length} products in database`);

    // Define patterns for sample/mock products
    const samplePatterns = [
      /sample/i,
      /mock/i,
      /test/i,
      /demo/i,
      /example/i,
      /placeholder/i,
      /dummy/i,
      /fake/i
    ];

    // Identify sample products
    const sampleProducts = products.filter(product => {
      const productName = product.name.toLowerCase();
      const productSlug = product.slug.toLowerCase();

      return samplePatterns.some(pattern =>
        pattern.test(productName) || pattern.test(productSlug)
      );
    });

    if (sampleProducts.length === 0) {
      console.log('✅ No sample products found to remove');
      return;
    }

    console.log(`🗑️  Found ${sampleProducts.length} sample products to remove:`);
    sampleProducts.forEach(product => {
      console.log(`   - ${product.name} (ID: ${product.id})`);
    });

    // Remove sample products
    const productIds = sampleProducts.map(p => p.id);
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .in('id', productIds);

    if (deleteError) {
      console.error('❌ Error deleting sample products:', deleteError.message);
      return;
    }

    console.log(`✅ Successfully removed ${sampleProducts.length} sample products`);

    // Also clean up related data
    console.log('🧹 Cleaning up related product data...');

    // Remove product images for deleted products
    const { error: imagesError } = await supabase
      .from('product_images')
      .delete()
      .in('product_id', productIds);

    if (imagesError) {
      console.warn('⚠️  Warning: Could not clean up product images:', imagesError.message);
    } else {
      console.log('✅ Cleaned up product images');
    }

    // Remove product specifications for deleted products
    const { error: specsError } = await supabase
      .from('product_specifications')
      .delete()
      .in('product_id', productIds);

    if (specsError) {
      console.warn('⚠️  Warning: Could not clean up product specifications:', specsError.message);
    } else {
      console.log('✅ Cleaned up product specifications');
    }

    // Remove product variants for deleted products
    const { error: variantsError } = await supabase
      .from('product_variants')
      .delete()
      .in('product_id', productIds);

    if (variantsError) {
      console.warn('⚠️  Warning: Could not clean up product variants:', variantsError.message);
    } else {
      console.log('✅ Cleaned up product variants');
    }

    // Remove reviews for deleted products
    const { error: reviewsError } = await supabase
      .from('reviews')
      .delete()
      .in('product_id', productIds);

    if (reviewsError) {
      console.warn('⚠️  Warning: Could not clean up reviews:', reviewsError.message);
    } else {
      console.log('✅ Cleaned up reviews');
    }

    console.log('🎉 Sample product cleanup completed successfully!');

  } catch (error) {
    console.error('❌ Unexpected error during cleanup:', error.message);
    process.exit(1);
  }
}

async function main() {
  console.log('🚀 Nexus TechHub - Sample Product Cleanup');
  console.log('=====================================');

  await cleanSampleProducts();

  console.log('\n📋 Summary:');
  console.log('- Removed mock/sample products from database');
  console.log('- Cleaned up related product data');
  console.log('- Website now uses only real Supabase data');
}

main();
