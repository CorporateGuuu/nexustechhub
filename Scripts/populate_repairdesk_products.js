#!/usr/bin/env node

/**
 * Script to fetch all products from RepairDesk API and populate into Supabase
 */

const { createClient } = require('@supabase/supabase-js');
const { getPurchaseOrders } = require('../utils/purchaseOrderUtils');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const repairdeskApiKey = process.env.API_KEY; // RepairDesk API key

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

if (!repairdeskApiKey) {
  console.error('❌ Missing RepairDesk API key in environment variables (API_KEY)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fetchAllPurchaseOrders() {
  let allOrders = [];
  let page = 1;
  const pageSize = 50;
  let totalPages = 1;

  console.log('🚀 Fetching all purchase orders from RepairDesk API...');

  do {
    try {
      const { purchaseOrderListData, pagination } = await getPurchaseOrders({
        api_key: repairdeskApiKey,
        page,
        pagesize: pageSize
      });

      allOrders = allOrders.concat(purchaseOrderListData);
      totalPages = pagination.total_pages || 1;

      console.log(`Fetched page ${page} of ${totalPages}, ${purchaseOrderListData.length} orders`);

      page++;
    } catch (error) {
      console.error('❌ Error fetching purchase orders:', error.message);
      process.exit(1);
    }
  } while (page <= totalPages);

  console.log(`✅ Total purchase orders fetched: ${allOrders.length}`);
  return allOrders;
}

async function upsertProductsToSupabase(products) {
  console.log('📦 Upserting products into Supabase...');

  for (const product of products) {
    // Map RepairDesk product fields to Supabase products table schema
    const supabaseProduct = {
      name: product.item_name || '',
      slug: product.sku ? product.sku.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '',
      sku: product.sku || '',
      description: product.description || '',
      price: product.price || 0,
      discount_percentage: product.discount_percentage || 0,
      stock_quantity: product.stock_quantity || 0,
      is_featured: false,
      is_new: false,
      image_url: product.image_url || '',
      brand: product.manufacturer || '',
      category_id: null // Could be set if category mapping is available
    };

    const { error } = await supabase
      .from('products')
      .upsert(supabaseProduct, { onConflict: 'sku' });

    if (error) {
      console.error(`❌ Error upserting product SKU ${product.sku}:`, error);
    } else {
      console.log(`✅ Upserted product SKU ${product.sku}`);
    }
  }

  console.log('🎉 Finished upserting products!');
}

async function main() {
  console.log('🚀 Starting RepairDesk products population...');

  const products = await fetchAllPurchaseOrders();

  await upsertProductsToSupabase(products);

  console.log('✅ RepairDesk products population completed successfully!');
}

main();
