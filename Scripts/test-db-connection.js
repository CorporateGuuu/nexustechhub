const db = require('./database/config');

async function testConnection() {
  try {
    console.log('Testing database connection...');

    // Test basic connection
    const isConnected = await db.testConnection();
    console.log('Connection test result:', isConnected);

    if (isConnected) {
      // Test a simple query
      const result = await db.query('SELECT COUNT(*) FROM inventory_transfers');
      console.log('Query result:', result.rows[0]);
    }

    process.exit(0);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

testConnection();
