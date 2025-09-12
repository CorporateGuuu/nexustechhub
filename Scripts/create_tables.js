#!/usr/bin/env node

/**
 * Create Tables in Supabase
 * This script creates the categories, subcategories, and sub_subcategories tables in Supabase.
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZ2Jvc2J0d2F5emVqZnh5eGFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzUyMTM5MywiZXhwIjoyMDczMDk3MzkzfQ.1a05ZG4fGeWaHBjC60ItZpnS5pWZqMwV3UYjWMwHBgQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTables() {
  console.log('🔧 Creating tables...');

  try {
    // Execute the SQL from the file
    const fs = require('fs');
    const path = require('path');
    const sqlFilePath = path.join(__dirname, 'create_categories_tables.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    // Split SQL into individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

    for (const statement of statements) {
      if (statement.trim()) {
        const { error } = await supabase.rpc('exec', { query: statement.trim() });
        if (error) {
          console.error('❌ Error executing SQL:', error.message);
          console.error('Statement:', statement.trim());
          return false;
        }
      }
    }

    console.log('✅ Tables created successfully.');
    return true;
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting table creation...');

  try {
    const success = await createTables();
    if (success) {
      console.log('🎉 Tables created successfully.');
    } else {
      console.error('❌ Failed to create tables.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Table creation failed:', error);
    process.exit(1);
  }
}

main();
