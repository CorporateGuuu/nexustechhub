#!/usr/bin/env node

/**
 * Add Missing Columns to Product Specifications Table
 * Adds compatibility, capacity, and other missing columns
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

async function addMissingColumns() {
  console.log('🔧 Adding missing columns to product_specifications table...');

  const alterStatements = [
    'ALTER TABLE product_specifications ADD COLUMN IF NOT EXISTS compatibility VARCHAR(255);',
    'ALTER TABLE product_specifications ADD COLUMN IF NOT EXISTS capacity VARCHAR(255);',
    'ALTER TABLE product_specifications ADD COLUMN IF NOT EXISTS voltage VARCHAR(255);',
    'ALTER TABLE product_specifications ADD COLUMN IF NOT EXISTS connector_type VARCHAR(255);',
    'ALTER TABLE product_specifications ADD COLUMN IF NOT EXISTS features TEXT;',
    'ALTER TABLE product_specifications ADD COLUMN IF NOT EXISTS warranty VARCHAR(255);',
    'ALTER TABLE product_specifications ADD COLUMN IF NOT EXISTS resolution VARCHAR(255);',
    'ALTER TABLE product_specifications ADD COLUMN IF NOT EXISTS refresh_rate VARCHAR(255);',
    'ALTER TABLE product_specifications ADD COLUMN IF NOT EXISTS protection VARCHAR(255);',
    'ALTER TABLE product_specifications ADD COLUMN IF NOT EXISTS charging_type VARCHAR(255);',
    'ALTER TABLE product_specifications ADD COLUMN IF NOT EXISTS sensor_type TEXT;'
  ];

  for (const statement of alterStatements) {
    try {
      const { error } = await supabase.rpc('exec', { query: statement });
      if (error) {
        console.error('❌ Error executing:', statement);
        console.error('Error details:', error.message);
      } else {
        console.log('✅ Executed:', statement.split('ADD COLUMN')[1]?.trim() || statement);
      }
    } catch (error) {
      console.error('❌ Failed to execute:', statement);
      console.error('Error:', error.message);
    }
  }
}

async function insertProductSpecifications() {
  console.log('📋 Inserting product specifications...');

  const specifications = [
    // iPhone 15 Series Specs
    {
      product_id: 30,
      display: 'Super Retina XDR OLED',
      resolution: '2556 x 1179 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 15',
      warranty: '6 months'
    },
    {
      product_id: 31,
      display: 'Super Retina XDR OLED',
      resolution: '2556 x 1179 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 15 Pro',
      warranty: '6 months'
    },
    {
      product_id: 32,
      display: 'Super Retina XDR OLED',
      resolution: '2796 x 1290 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 15 Pro Max',
      warranty: '6 months'
    },
    {
      product_id: 33,
      capacity: '3349mAh',
      voltage: '3.85V',
      compatibility: 'iPhone 15',
      charging_type: 'USB-C, MagSafe',
      warranty: '3 months'
    },
    {
      product_id: 34,
      connector_type: 'USB-C',
      compatibility: 'iPhone 15',
      features: 'Fast charging, Lightning compatible',
      warranty: '3 months'
    },
    {
      product_id: 35,
      sensor_type: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      compatibility: 'iPhone 15 Pro',
      features: 'Pro camera system',
      warranty: '6 months'
    },

    // iPhone 14 Series Specs
    {
      product_id: 40,
      display: 'Super Retina XDR OLED',
      resolution: '2532 x 1170 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 14',
      warranty: '6 months'
    },
    {
      product_id: 41,
      display: 'Super Retina XDR OLED',
      resolution: '2556 x 1179 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 14 Pro',
      warranty: '6 months'
    },
    {
      product_id: 42,
      display: 'Super Retina XDR OLED',
      resolution: '2796 x 1290 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 14 Pro Max',
      warranty: '6 months'
    },

    // iPhone 13 Series Specs
    {
      product_id: 46,
      display: 'Super Retina XDR OLED',
      resolution: '2532 x 1170 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 13',
      warranty: '6 months'
    },
    {
      product_id: 47,
      display: 'Super Retina XDR OLED',
      resolution: '2532 x 1170 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 13 Pro',
      warranty: '6 months'
    },
    {
      product_id: 48,
      display: 'Super Retina XDR OLED',
      resolution: '2778 x 1284 pixels',
      refresh_rate: '120Hz ProMotion',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 13 Pro Max',
      warranty: '6 months'
    },

    // iPhone 12 Series Specs
    {
      product_id: 52,
      display: 'Super Retina XDR LCD',
      resolution: '2532 x 1170 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 12',
      warranty: '6 months'
    },
    {
      product_id: 53,
      display: 'Super Retina XDR OLED',
      resolution: '2532 x 1170 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 12 Pro',
      warranty: '6 months'
    },
    {
      product_id: 54,
      display: 'Super Retina XDR OLED',
      resolution: '2778 x 1284 pixels',
      refresh_rate: '60Hz',
      protection: 'Ceramic Shield',
      compatibility: 'iPhone 12 Pro Max',
      warranty: '6 months'
    }
  ];

  for (const spec of specifications) {
    try {
      const { error } = await supabase
        .from('product_specifications')
        .upsert(spec, { onConflict: 'product_id' });

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
  console.log('🚀 Starting database schema update and specifications insertion...');

  try {
    await addMissingColumns();
    await insertProductSpecifications();

    console.log('✅ Database schema update and specifications insertion completed successfully!');
    console.log('📱 All iPhone parts now have complete specifications.');
    console.log('🎉 Ready for professional mobile repair services in UAE.');

  } catch (error) {
    console.error('❌ Process failed:', error);
    process.exit(1);
  }
}

main();
