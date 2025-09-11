#!/usr/bin/env node

/**
 * Check Repair Jobs Tables
 * Verifies if repair_jobs tables exist and shows their structure
 */

const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store';

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function checkTables() {
  console.log('🔍 Checking Repair Jobs Tables...');

  try {
    // Check if repair_jobs table exists
    const { rows: tables } = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('repair_jobs', 'repair_job_parts', 'repair_job_history')
    `);

    console.log('📋 Found tables:', tables.map(t => t.table_name));

    if (tables.length === 0) {
      console.log('❌ No repair jobs tables found. Running migration...');

      // Run migration
      const fs = require('fs');
      const path = require('path');
      const sqlPath = path.join(__dirname, '..', 'database', 'repair_jobs_tables.sql');
      const sql = fs.readFileSync(sqlPath, 'utf8');

      await pool.query(sql);
      console.log('✅ Migration completed successfully!');
    } else {
      console.log('✅ Repair jobs tables already exist.');

      // Check sample data
      const { rows: count } = await pool.query('SELECT COUNT(*) FROM repair_jobs');
      console.log(`📊 Found ${count[0].count} repair jobs in database.`);
    }

  } catch (error) {
    console.error('❌ Error checking tables:', error);
  } finally {
    await pool.end();
  }
}

// Run the check
checkTables();
