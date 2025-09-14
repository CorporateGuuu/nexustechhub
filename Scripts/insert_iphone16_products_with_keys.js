#!/usr/bin/env node

/**
 * Insert iPhone 16 Series Products Data into Supabase
 * This script inserts iPhone 16 series products and parts data
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZ2Jvc2J0d2F5emVqZnh5eGFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzUyMTM5MywiZXhwIjoyMDczMDk3MzkzfQ.1a05ZG4fGeWaHBjC60ItZpnS5pWZqMwV3UYjWMwHBgQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertProducts() {
  console.log('📱 Inserting iPhone 16 series products and parts...');

  const products = [
    // iPhone 16e Products
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
    },
    {
      name: 'OLED Assembly Compatible For iPhone 16e (Aftermarket Plus: Soft)',
      slug: 'oled-assembly-iphone-16e-aftermarket-plus-soft',
      description: 'Premium OLED assembly for iPhone 16e with soft aftermarket technology for enhanced display quality.',
      price: 47.15,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.09,
      dimensions: '6.06 x 2.74 x 0.31 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly Compatible For iPhone 16e (Aftermarket Pro: XO7 Soft)',
      slug: 'oled-assembly-iphone-16e-aftermarket-pro-xo7-soft',
      description: 'Professional OLED assembly for iPhone 16e with XO7 soft technology for superior display performance.',
      price: 53.80,
      discount_percentage: 0,
      stock_quantity: 60,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.09,
      dimensions: '6.06 x 2.74 x 0.31 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // iPhone 16 Pro Max Products
    {
      name: 'OLED Assembly Compatible For iPhone 16 Pro Max (Genuine OEM)',
      slug: 'oled-assembly-iphone-16-pro-max-genuine-oem',
      description: 'Genuine Apple OEM OLED assembly for iPhone 16 Pro Max with original quality and warranty.',
      price: 380.28,
      discount_percentage: 5,
      stock_quantity: 25,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '6.86 x 3.27 x 0.32 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly Compatible For iPhone 16 Pro Max (Used OEM Pull Grade : A)',
      slug: 'oled-assembly-iphone-16-pro-max-used-oem-pull-grade-a',
      description: 'Grade A used OEM OLED assembly for iPhone 16 Pro Max, pulled from working devices.',
      price: 385.04,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '6.86 x 3.27 x 0.32 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly Compatible For iPhone 16 Pro Max (Aftermarket: AQ7 / Incell)',
      slug: 'lcd-assembly-iphone-16-pro-max-aftermarket-aq7-incell',
      description: 'High-quality LCD assembly for iPhone 16 Pro Max with AQ7 aftermarket technology.',
      price: 130.03,
      discount_percentage: 0,
      stock_quantity: 40,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.14,
      dimensions: '6.86 x 3.27 x 0.32 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly Compatible For iPhone 16 Pro Max (Aftermarket Pro: XO7 Soft) (120HZ)',
      slug: 'oled-assembly-iphone-16-pro-max-aftermarket-pro-xo7-soft-120hz',
      description: 'Professional OLED assembly with 120Hz refresh rate for iPhone 16 Pro Max using XO7 soft technology.',
      price: 289.90,
      discount_percentage: 0,
      stock_quantity: 30,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '6.86 x 3.27 x 0.32 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly Compatible For iPhone 16 Pro Max (Refurbished)',
      slug: 'oled-assembly-iphone-16-pro-max-refurbished',
      description: 'Refurbished OLED assembly for iPhone 16 Pro Max, tested and guaranteed to work.',
      price: 385.43,
      discount_percentage: 0,
      stock_quantity: 15,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.15,
      dimensions: '6.86 x 3.27 x 0.32 inch',
      category_id: 1,
      brand: 'Apple'
    },

    // iPhone 16 Pro Products
    {
      name: 'OLED Assembly Compatible For iPhone 16 Pro (Genuine OEM)',
      slug: 'oled-assembly-iphone-16-pro-genuine-oem',
      description: 'Genuine Apple OEM OLED assembly for iPhone 16 Pro with original quality and warranty.',
      price: 326.65,
      discount_percentage: 5,
      stock_quantity: 30,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.12,
      dimensions: '6.30 x 2.98 x 0.32 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly Compatible For iPhone 16 Pro (Aftermarket: AQ7 / Incell) (120HZ)',
      slug: 'lcd-assembly-iphone-16-pro-aftermarket-aq7-incell-120hz',
      description: 'High-quality LCD assembly with 120Hz refresh rate for iPhone 16 Pro using AQ7 technology.',
      price: 89.88,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.11,
      dimensions: '6.30 x 2.98 x 0.32 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'LCD Assembly Compatible For iPhone 16 Pro (Aftermarket: AQ7 / Incell)',
      slug: 'lcd-assembly-iphone-16-pro-aftermarket-aq7-incell',
      description: 'Standard LCD assembly for iPhone 16 Pro with AQ7 aftermarket technology.',
      price: 91.90,
      discount_percentage: 0,
      stock_quantity: 45,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.11,
      dimensions: '6.30 x 2.98 x 0.32 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly Compatible For iPhone 16 Pro (Aftermarket Pro: XO7 Soft) (120HZ)',
      slug: 'oled-assembly-iphone-16-pro-aftermarket-pro-xo7-soft-120hz',
      description: 'Professional OLED assembly with 120Hz refresh rate for iPhone 16 Pro using XO7 soft technology.',
      price: 234.90,
      discount_percentage: 0,
      stock_quantity: 35,
      is_featured: true,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.12,
      dimensions: '6.30 x 2.98 x 0.32 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly Compatible For iPhone 16 Pro (Refurbished)',
      slug: 'oled-assembly-iphone-16-pro-refurbished',
      description: 'Refurbished OLED assembly for iPhone 16 Pro, tested and guaranteed to work.',
      price: 220.53,
      discount_percentage: 0,
      stock_quantity: 20,
      is_featured: false,
      is_new: false,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.12,
      dimensions: '6.30 x 2.98 x 0.32 inch',
      category_id: 1,
      brand: 'Apple'
    },
    {
      name: 'OLED Assembly Compatible For iPhone 16 Pro (Service Pack)',
      slug: 'oled-assembly-iphone-16-pro-service-pack',
      description: 'Service pack OLED assembly for iPhone 16 Pro with professional installation support.',
      price: 259.09,
      discount_percentage: 0,
      stock_quantity: 12,
      is_featured: false,
      is_new: true,
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      weight: 0.12,
      dimensions: '6.30 x 2.98 x 0.32 inch',
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
  console.log('🚀 Starting iPhone 16 Series Products Data Insertion...');

  try {
    await insertProducts();

    console.log('✅ iPhone 16 series products data insertion completed successfully!');
    console.log('📱 Your Supabase database now contains iPhone 16 series products and parts ready for display.');
    console.log('🎉 You can now view and manage iPhone 16 series products in your application.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
</create_file>
