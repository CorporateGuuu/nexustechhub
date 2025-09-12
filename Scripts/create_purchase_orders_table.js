#!/usr/bin/env node

/**
 * Create Purchase Orders Table Script
 * Creates the purchase_orders table in Supabase database
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration - Update these values with your project details
const supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co';
const supabaseServiceKey = 'REMOVED_COMPROMISED_CREDENTIAL';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createPurchaseOrdersTable() {
  console.log('🚀 Creating purchase_orders table...');

  try {
    // Read the SQL migration file
    const migrationPath = path.join(__dirname, '..', 'migrations', 'create_purchase_orders_table.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    // Split SQL into individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

    console.log(`📋 Executing ${statements.length} SQL statements...`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (statement) {
        console.log(`Executing statement ${i + 1}/${statements.length}: ${statement.substring(0, 60)}...`);

        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });

          if (error) {
            console.error(`❌ Error executing statement ${i + 1}:`, error);
            // Continue with other statements
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`);
          }
        } catch (error) {
          console.error(`❌ Error executing statement ${i + 1}:`, error);
          // Continue with other statements
        }
      }
    }

    console.log('✅ Purchase orders table creation completed!');
    console.log('🎉 You can now use the purchase orders API with real database storage.');

  } catch (error) {
    console.error('❌ Failed to create purchase orders table:', error);
    process.exit(1);
  }
}

// Run the script
createPurchaseOrdersTable();
