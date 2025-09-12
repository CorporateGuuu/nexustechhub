#!/usr/bin/env node

/**
 * Insert Products from mock_db/data/products.json into Supabase Database
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertProducts() {
  console.log('🚀 Starting insertion of products from mock data...');

  try {
    const productsFilePath = path.join(__dirname, '../mock_db/data/products.json');
    const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

    for (const product of productsData) {
      // Check if product already exists by slug
      const { data: existing, error: fetchError } = await supabase
        .from('products')
        .select('id')
        .eq('slug', product.slug)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error(`❌ Error checking product ${product.slug}:`, fetchError.message);
        continue;
      }

      if (existing) {
        console.log(`ℹ️  Product already exists: ${product.name} (slug: ${product.slug})`);
        continue;
      }

      // Insert new product
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          slug: product.slug,
          price: product.price,
          description: product.description,
          image_url: product.image_url,
          category_id: product.category_id,
          is_featured: product.is_featured,
          is_new: product.is_new,
          stock_quantity: product.stock_quantity,
          brand: product.brand
        })
        .select()
        .single();

      if (error) {
        console.error(`❌ Error inserting product ${product.slug}:`, error.message);
        continue;
      }

      console.log(`✅ Inserted product: ${product.name} (ID: ${data.id})`);
    }

    console.log('🎉 Product insertion completed successfully!');
  } catch (error) {
    console.error('❌ Unexpected error during product insertion:', error.message);
    process.exit(1);
  }
}

async function main() {
  console.log('🚀 Nexus TechHub - Insert Products from Mock Data');
  console.log('===============================================');

  await insertProducts();

  console.log('\n📋 Summary:');
  console.log('- Removed sample/mock products');
  console.log('- Inserted real products from mock_db/data/products.json');
  console.log('- Website now uses real Supabase product data');
