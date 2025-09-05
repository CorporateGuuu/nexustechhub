const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const { isAuthenticated } = require('../../middleware/auth');

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// GET /problems/:deviceId - Get list of problems for a specific device
router.get('/:deviceId', isAuthenticated, async (req, res) => {
  const { deviceId } = req.params;

  try {
    // Check if device exists
    const deviceResult = await pool.query(
      'SELECT id FROM devices WHERE id = $1',
      [deviceId]
    );

    if (deviceResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    // Fetch problems for the device
    const problemsResult = await pool.query(
      'SELECT id, name, description, retail_price, sale_price, image FROM problems WHERE device_id = $1',
      [deviceId]
    );

    return res.status(200).json({
      success: true,
      device_id: deviceId,
      problems: problemsResult.rows
    });
  } catch (error) {
    console.error('Error fetching problems:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
