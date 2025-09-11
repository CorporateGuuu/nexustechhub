#!/usr/bin/env node

/**
 * Verify MacBook Parts Insertion Script
 * Checks if MacBook parts products were successfully inserted
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyMacBookParts() {
  console.log('🔍 Verifying MacBook parts insertion...');

  try {
    // Get MacBook Parts category
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id, name')
      .eq('slug', 'macbook-parts')
      .single();

    if (categoryError) {
      console.error('❌ Error fetching MacBook Parts category:', categoryError);
      return;
    }

    console.log(`📂 Found category: ${category.name} (ID: ${category.id})`);

    // Count MacBook products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, price, stock_quantity')
      .eq('category_id', category.id);

    if (productsError) {
      console.error('❌ Error fetching MacBook products:', productsError);
      return;
    }

    console.log(`📦 Total MacBook parts products found: ${products.length}`);

    if (products.length >= 50) {
      console.log('✅ SUCCESS: All 50 MacBook parts products have been inserted!');

      // Show first 10 products as sample
      console.log('\n📋 Sample of inserted products:');
      products.slice(0, 10).forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - $${product.price} (${product.stock_quantity} in stock)`);
      });

      if (products.length > 10) {
        console.log(`... and ${products.length - 10} more products`);
      }
    } else {
      console.log(`⚠️  WARNING: Only ${products.length} products found. Expected 50.`);
      console.log('Some products may not have been inserted successfully.');
    }

  } catch (error) {
    console.error('❌ Verification failed:', error);
  }
}

verifyMacBookParts();
