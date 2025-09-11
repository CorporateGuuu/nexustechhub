#!/usr/bin/env node

/**
 * Insert Product Specifications Only
 * Inserts specifications for iPhone parts without altering schema
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

async function insertProductSpecifications() {
  console.log('📋 Inserting product specifications...');

  const specifications = [
    // iPhone 15 Series Specs
    {
      product_id: 30,
      display: 'Super Retina XDR OLED',
      processor: 'A16 Bionic',
      memory: '6GB RAM',
      storage: '128GB-512GB',
      camera: '48MP Main + 12MP Ultra Wide',
      battery: '3349mAh',
      operating_system: 'iOS 17',
      additional_features: 'Ceramic Shield, Dynamic Island, USB-C'
    },
    {
      product_id: 31,
      display: 'Super Retina XDR OLED',
      processor: 'A17 Pro',
      memory: '8GB RAM',
      storage: '128GB-1TB',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '3274mAh',
      operating_system: 'iOS 17',
      additional_features: 'ProMotion 120Hz, Titanium design, Action Button'
    },
    {
      product_id: 32,
      display: 'Super Retina XDR OLED',
      processor: 'A17 Pro',
      memory: '8GB RAM',
      storage: '256GB-1TB',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '4441mAh',
      operating_system: 'iOS 17',
      additional_features: 'ProMotion 120Hz, Titanium design, Action Button'
    },
    {
      product_id: 33,
      display: 'Battery Replacement',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '3349mAh',
      operating_system: 'N/A',
      additional_features: 'USB-C charging, MagSafe compatible'
    },
    {
      product_id: 34,
      display: 'Charging Port Assembly',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: 'N/A',
      operating_system: 'N/A',
      additional_features: 'USB-C, Lightning compatible, Fast charging'
    },
    {
      product_id: 35,
      display: 'Camera Module',
      processor: 'N/A',
      memory: 'N/A',
      storage: 'N/A',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: 'N/A',
      operating_system: 'N/A',
      additional_features: 'Pro camera system, Cinematic mode'
    },

    // iPhone 14 Series Specs
    {
      product_id: 40,
      display: 'Super Retina XDR OLED',
      processor: 'A15 Bionic',
      memory: '6GB RAM',
      storage: '128GB-512GB',
      camera: '12MP Main + 12MP Ultra Wide',
      battery: '3279mAh',
      operating_system: 'iOS 16',
      additional_features: 'Ceramic Shield, Always-On display'
    },
    {
      product_id: 41,
      display: 'Super Retina XDR OLED',
      processor: 'A16 Bionic',
      memory: '6GB RAM',
      storage: '128GB-1TB',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '3200mAh',
      operating_system: 'iOS 16',
      additional_features: 'ProMotion 120Hz, Always-On display'
    },
    {
      product_id: 42,
      display: 'Super Retina XDR OLED',
      processor: 'A16 Bionic',
      memory: '6GB RAM',
      storage: '128GB-1TB',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '4325mAh',
      operating_system: 'iOS 16',
      additional_features: 'ProMotion 120Hz, Always-On display'
    },

    // iPhone 13 Series Specs
    {
      product_id: 46,
      display: 'Super Retina XDR OLED',
      processor: 'A15 Bionic',
      memory: '4GB RAM',
      storage: '128GB-512GB',
      camera: '12MP Main + 12MP Ultra Wide',
      battery: '3240mAh',
      operating_system: 'iOS 15',
      additional_features: 'Ceramic Shield, Cinematic mode'
    },
    {
      product_id: 47,
      display: 'Super Retina XDR OLED',
      processor: 'A15 Bionic',
      memory: '6GB RAM',
      storage: '128GB-1TB',
      camera: '12MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '3095mAh',
      operating_system: 'iOS 15',
      additional_features: 'ProMotion 120Hz, Macro photography'
    },
    {
      product_id: 48,
      display: 'Super Retina XDR OLED',
      processor: 'A15 Bionic',
      memory: '6GB RAM',
      storage: '128GB-1TB',
      camera: '12MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '4352mAh',
      operating_system: 'iOS 15',
      additional_features: 'ProMotion 120Hz, Macro photography'
    },

    // iPhone 12 Series Specs
    {
      product_id: 52,
      display: 'Super Retina XDR LCD',
      processor: 'A14 Bionic',
      memory: '4GB RAM',
      storage: '64GB-256GB',
      camera: '12MP Main + 12MP Ultra Wide',
      battery: '2815mAh',
      operating_system: 'iOS 14',
      additional_features: 'Ceramic Shield, Night mode'
    },
    {
      product_id: 53,
      display: 'Super Retina XDR OLED',
      processor: 'A14 Bionic',
      memory: '6GB RAM',
      storage: '128GB-512GB',
      camera: '12MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '2815mAh',
      operating_system: 'iOS 14',
      additional_features: 'Night mode, Deep Fusion'
    },
    {
      product_id: 54,
      display: 'Super Retina XDR OLED',
      processor: 'A14 Bionic',
      memory: '6GB RAM',
      storage: '128GB-512GB',
      camera: '12MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '3687mAh',
      operating_system: 'iOS 14',
      additional_features: 'Night mode, Deep Fusion'
    }
  ];

  for (const spec of specifications) {
    try {
      const { error } = await supabase
        .from('product_specifications')
        .insert(spec);

      if (error) {
        console.error(`❌ Error inserting specifications for product ${spec.product_id}:`, error.message);
      } else {
        console.log(`✅ Inserted specifications for product ID: ${spec.product_id}`);
      }
    } catch (error) {
      console.error(`❌ Failed to insert specifications for product ${spec.product_id}:`, error.message);
    }
  }
}

async function main() {
  console.log('🚀 Starting specifications insertion...');

  try {
    await insertProductSpecifications();

    console.log('✅ Specifications insertion completed successfully!');
    console.log('📱 All iPhone parts now have complete specifications.');
    console.log('🎉 Ready for professional mobile repair services in UAE.');

  } catch (error) {
    console.error('❌ Process failed:', error);
    process.exit(1);
  }
}

main();
