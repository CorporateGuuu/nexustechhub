const db = require('../database/config');
const fs = require('fs');
const path = require('path');

async function setupRepairJobsTables() {
  try {
    console.log('Setting up repair jobs database tables...');

    // Read the SQL file
    const sqlFile = path.join(__dirname, '../database/repair_jobs_tables.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    // Split the SQL into individual statements (basic approach)
    const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await db.query(statement);
          console.log('✅ Executed SQL statement successfully');
        } catch (err) {
          // Skip errors for CREATE TABLE IF NOT EXISTS and similar
          if (!err.message.includes('already exists') && !err.message.includes('does not exist')) {
            console.error('❌ Error executing statement:', err.message);
          } else {
            console.log('⚠️  Statement skipped (table/index already exists)');
          }
        }
      }
    }

    console.log('🎉 Repair jobs database setup completed!');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupRepairJobsTables();
