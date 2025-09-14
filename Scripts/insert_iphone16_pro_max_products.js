import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertIphone16ProMaxProducts() {
  console.log('📦 Inserting iPhone 16 Pro Max replacement parts...');

  // Fetch category ID dynamically
  const { data: categories, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('name', 'iPhone Parts')
    .limit(1);

  if (categoryError || !categories || categories.length === 0) {
    console.error('❌ Category "iPhone Parts" not found in database.', categoryError);
    process.exit(1);
  }

  const categoryId = categories[0].id;

  const products = [
    {
      name: 'OLED Assembly Compatible For iPhone 16 Pro Max (Genuine OEM)',
      slug: 'oled-assembly-iphone-16-pro-max',
      sku: 'IPH16PM-OLED-001',
      description: 'Quality - Apple Genuine OLED Assembly Compatible For iPhone 16 Pro Max (Genuine OEM)',
      price: 380.28,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: true,
      is_new: true,
      image_url: '/images/iphone16promax/oled-assembly.jpg',
      weight: null,
      dimensions: null,
      category_id: categoryId,
      brand: 'Apple'
    },
    {
      name: 'Replacement Battery Compatible For iPhone 16 Pro Max (Genuine OEM)',
      slug: 'replacement-battery-iphone-16-pro-max',
      sku: 'IPH16PM-BAT-001',
      description: 'Quality - Apple Genuine Replacement Battery Compatible For iPhone 16 Pro Max (Genuine OEM)',
      price: 64.31,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: true,
      is_new: true,
      image_url: '/images/iphone16promax/battery.jpg',
      weight: null,
      dimensions: null,
      category_id: categoryId,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Flex Cable With Board Compatible For iPhone 16 Pro Max (Genuine OEM) (White Titanium)',
      slug: 'charging-port-flex-cable-white-titanium-iphone-16-pro-max',
      sku: 'IPH16PM-CHG-WT-001',
      description: 'Quality - Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 16 Pro Max (Genuine OEM) (White Titanium)',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: '/images/iphone16promax/charging-port-white.jpg',
      weight: null,
      dimensions: null,
      category_id: categoryId,
      brand: 'Apple'
    },
    {
      name: 'Charging Port Flex Cable With Board Compatible For iPhone 16 Pro Max (Genuine OEM) (Black Titanium)',
      slug: 'charging-port-flex-cable-black-titanium-iphone-16-pro-max',
      sku: 'IPH16PM-CHG-BT-001',
      description: 'Quality - Apple Genuine Charging Port Flex Cable With Board Compatible For iPhone 16 Pro Max (Genuine OEM) (Black Titanium)',
      price: 70.09,
      discount_percentage: 0,
      stock_quantity: 50,
      is_featured: false,
      is_new: true,
      image_url: '/images/iphone16promax/charging-port-black.jpg',
      weight: null,
      dimensions: null,
      category_id: categoryId,
      brand: 'Apple'
    },
    {
      name: 'Back Camera Cover Shield Compatible for iPhone 16 Pro / Pro Max (Genuine OEM)',
      slug: 'back-camera-cover-shield-iphone-16-pro-max',
      sku: 'IPH16PM-BACKCAM-001',
      description: 'Quality - Apple Genuine Back Camera Cover Shield Compatible for iPhone 16 Pro / Pro Max (Genuine OEM)',
      price: 8.00,
      discount_percentage: 0,
      stock_quantity: 100,
      is_featured: false,
      is_new: false,
      image_url: '/images/iphone16promax/back-camera-cover.jpg',
      weight: null,
      dimensions: null,
      category_id: categoryId,
      brand: 'Apple'
    },
    {
      name: 'Front Camera Compatible For iPhone 16 Pro Max (Genuine OEM)',
      slug: 'front-camera-iphone-16-pro-max',
      sku: 'IPH16PM-FRONTCAM-001',
      description: 'Quality - Apple Genuine Front Camera Compatible For iPhone 16 Pro Max (Genuine OEM)',
      price: 154.52,
      discount_percentage: 0,
      stock_quantity: 75,
      is_featured: false,
      is_new: true,
      image_url: '/images/iphone16promax/front-camera.jpg',
      weight: null,
      dimensions: null,
      category_id: categoryId,
      brand: 'Apple'
    }
    // Add more products as needed
  ];

  for (const product of products) {
    const { error } = await supabase
      .from('products')
      .upsert(product, { onConflict: 'slug' });

    if (error) {
      console.error('❌ Error inserting product:', product.name, error);
    } else {
      console.log(`✅ Upserted product: ${product.name}`);
    }
  }

  console.log('🎉 iPhone 16 Pro Max products insertion completed!');
}

if (require.main === module) {
  insertIphone16ProMaxProducts().catch(console.error);
}

export { insertIphone16ProMaxProducts };
