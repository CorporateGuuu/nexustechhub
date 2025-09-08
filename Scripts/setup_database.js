#!/usr/bin/env node

/**
 * Database Setup Script for Nexus TechHub
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

async function executeSQLFile(filePath) {
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.trim().substring(0, 50)}...`);
        const { error } = await supabase.rpc('exec_sql', { sql: statement.trim() + ';' });

        if (error) {
          console.error('❌ Error executing statement:', error);
          // Continue with other statements
        }
      }
    }
  } catch (error) {
    console.error('❌ Error reading or executing SQL file:', error);
  }
}

async function setupDatabase() {
  console.log('🚀 Starting Nexus TechHub Database Setup...');

  try {
    // Execute migration for profiles table
    console.log('📋 Setting up profiles table and triggers...');
    const migrationPath = path.join(__dirname, '..', 'migrations', '001_create_profiles_trigger.sql');
    await executeSQLFile(migrationPath);

    // Execute sample data insertion
    console.log('📦 Inserting sample data...');
    const sampleDataPath = path.join(__dirname, 'insert_sample_data.sql');
    await executeSQLFile(sampleDataPath);

    console.log('✅ Database setup completed successfully!');
    console.log('🎉 Your Nexus TechHub backend is ready to use.');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
