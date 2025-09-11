#!/usr/bin/env node

/**
 * Run Repair Jobs Database Migration
 * Executes the repair_jobs_tables.sql file against PostgreSQL
 */

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store';

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function runMigration() {
  console.log('🚀 Running Repair Jobs Database Migration...');

  try {
    const sqlPath = path.join(__dirname, '..', 'database', 'repair_jobs_tables.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📋 Executing migration...');
    await pool.query(sql);

    console.log('✅ Repair Jobs migration completed successfully!');
    console.log('📊 Sample data has been inserted.');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the migration
runMigration();
