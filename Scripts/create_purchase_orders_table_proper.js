#!/usr/bin/env node

/**
 * Create Purchase Orders Table Script - Proper Implementation
 * Creates the purchase_orders table in Supabase database using proper client methods
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration - Update these values with your project details
const supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZ2Jvc2J0d2F5emVqZnh5eGFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzUyMTM5MywiZXhwIjoyMDczMDk3MzkzfQ.1a05ZG4fGeWaHBjC60ItZpnS5pWZqMwV3UYjWMwHBgQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createPurchaseOrdersTable() {
  console.log('🚀 Creating purchase_orders table using proper Supabase client methods...');

  try {
    // First, let's check if the table already exists by trying to select from it
    const { data: existingData, error: selectError } = await supabase
      .from('purchase_orders')
      .select('id')
      .limit(1);

    if (!selectError) {
      console.log('✅ Table purchase_orders already exists!');
      return;
    }

    console.log('📋 Table does not exist, will create it when first record is inserted...');

    // Since we can't create tables directly via Supabase client in production,
    // we'll insert a dummy record to create the table structure
    // This will fail initially, but the error will tell us if the table exists

    console.log('🔄 Attempting to insert sample data to create table structure...');

    const sampleData = [
      {
        item_name: 'iPhone 15 Pro Screen',
        manufacturer: 'Apple',
        purchase_order_status: 'pending',
        po_order_id: 'PO-2024-001',
        supplier: 'TechParts Inc.',
        sku: 'IPH15P-SCR-001',
        quantity: 10,
        unit_price: 250.00,
        total_amount: 2500.00,
        created_date: new Date().toISOString(),
        createdd_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        item_name: 'Samsung S24 Battery',
        manufacturer: 'Samsung',
        purchase_order_status: 'approved',
        po_order_id: 'PO-2024-002',
        supplier: 'MobileParts Ltd.',
        sku: 'SAM-S24-BAT-001',
        quantity: 25,
        unit_price: 45.00,
        total_amount: 1125.00,
        created_date: new Date().toISOString(),
        createdd_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        item_name: 'iPad Pro 12.9" Display',
        manufacturer: 'Apple',
        purchase_order_status: 'shipped',
        po_order_id: 'PO-2024-003',
        supplier: 'DisplayTech Corp.',
        sku: 'IPAD12-DISP-001',
        quantity: 5,
        unit_price: 350.00,
        total_amount: 1750.00,
        created_date: new Date().toISOString(),
        createdd_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // Try to insert the sample data
    const { data, error } = await supabase
      .from('purchase_orders')
      .insert(sampleData)
      .select();

    if (error) {
      console.error('❌ Error inserting sample data:', error);
      console.log('💡 This likely means the table doesn\'t exist yet.');
      console.log('📋 Please create the purchase_orders table manually in your Supabase dashboard using this SQL:');
      console.log('');
      console.log(`-- Create purchase_orders table for inventory management
CREATE TABLE IF NOT EXISTS purchase_orders (
  id SERIAL PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  manufacturer VARCHAR(255),
  purchase_order_status VARCHAR(50) DEFAULT 'pending',
  po_order_id VARCHAR(100) UNIQUE,
  supplier VARCHAR(255),
  sku VARCHAR(100),
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10, 2),
  total_amount DECIMAL(10, 2),
  created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  createdd_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_purchase_orders_status ON purchase_orders(purchase_order_status);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_supplier ON purchase_orders(supplier);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_manufacturer ON purchase_orders(manufacturer);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_created_date ON purchase_orders(created_date);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_po_order_id ON purchase_orders(po_order_id);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_sku ON purchase_orders(sku);`);
      console.log('');
      console.log('🔄 After creating the table, run this script again to insert sample data.');
    } else {
      console.log('✅ Successfully inserted sample data!');
      console.log('📊 Inserted records:', data);
      console.log('🎉 Purchase orders table is ready with sample data.');
    }

  } catch (error) {
    console.error('❌ Failed to create purchase orders table:', error);
    process.exit(1);
  }
}

// Run the script
createPurchaseOrdersTable();
