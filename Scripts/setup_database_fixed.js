#!/usr/bin/env node

/**
 * Fixed Database Setup Script for Nexus TechHub
 * Sets up Supabase database with tables, policies, and sample data
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeSQL(sql) {
  try {
    console.log(`Executing SQL...`);
    const { data, error } = await supabase.rpc('exec', { query: sql });

    if (error) {
      console.error('❌ Error executing SQL:', error);
      return false;
    }

    console.log('✅ SQL executed successfully');
    return true;
  } catch (error) {
    console.error('❌ Error executing SQL:', error);
    return false;
  }
}

async function setupDatabase() {
  console.log('🚀 Starting Nexus TechHub Database Setup...');

  try {
    // Execute migration for profiles table and triggers
    console.log('📋 Setting up profiles table and triggers...');
    const migrationPath = path.join(__dirname, '..', 'migrations', '001_create_profiles_trigger.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    await executeSQL(migrationSQL);

    // Execute sample data insertion
    console.log('📦 Inserting sample data...');
    const sampleDataPath = path.join(__dirname, 'insert_sample_data.sql');
    const sampleDataSQL = fs.readFileSync(sampleDataPath, 'utf8');
    await executeSQL(sampleDataSQL);

    console.log('✅ Database setup completed successfully!');
    console.log('🎉 Your Nexus TechHub backend is ready to use.');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
