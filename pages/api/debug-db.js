export default async function handler(req, res) {
  console.log('=== DEBUG DATABASE CONNECTION ===');
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('All env vars with DB:', Object.keys(process.env).filter(key => key.includes('DB') || key.includes('DATABASE')));

  // Try to connect to database
  try {
    const db = require('../../database/config');
    const isConnected = await db.testConnection();
    console.log('Database connection test:', isConnected);

    if (isConnected) {
      const result = await db.query('SELECT current_database(), current_user');
      console.log('Current database and user:', result.rows[0]);
    }
  } catch (error) {
    console.log('Database connection error:', error.message);
  }

  res.status(200).json({
    message: 'Check server logs for debug info',
    timestamp: new Date().toISOString()
  });
}
