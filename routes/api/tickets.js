const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Middleware to check API key
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized",
      data: {
        name: "Unauthorized",
        message: "Your request was made with invalid credentials.",
        code: 0,
        status: 401
      }
    });
  }

  // For now, accept any API key. In production, validate against stored keys
  next();
};

router.use(authenticateApiKey);

// GET /api/tickets - Get all tickets with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pagesize) || 10;
    const offset = (page - 1) * pageSize;

    const query = `
      SELECT id, device_brand, device_model, device_imei, issue_description, status, priority,
             customer_name, customer_email, customer_phone, assigned_to, created_at, updated_at
      FROM tickets
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [pageSize, offset]);

    // Get total count
    const countQuery = 'SELECT COUNT(*) FROM tickets';
    const countResult = await pool.query(countQuery);
    const totalCount = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      statusCode: 200,
      data: result.rows,
      pagination: {
        page: page,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / pageSize)
      }
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tickets'
    });
  }
});

// POST /api/tickets - Create a new ticket
router.post('/', async (req, res) => {
  try {
    const {
      device_brand,
      device_model,
      device_imei,
      issue_description,
      priority = 'medium',
      customer_name,
      customer_email,
      customer_phone
    } = req.body;

    // Validate required fields
    if (!device_brand || !device_model || !issue_description) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Device brand, model, and issue description are required'
      });
    }

    const query = `
      INSERT INTO tickets (
        device_brand, device_model, device_imei, issue_description, priority,
        customer_name, customer_email, customer_phone, created_at, updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()
      )
      RETURNING id, device_brand, device_model, device_imei, issue_description, status, priority,
                customer_name, customer_email, customer_phone, assigned_to, created_at, updated_at
    `;
    const values = [
      device_brand, device_model, device_imei, issue_description, priority,
      customer_name, customer_email, customer_phone
    ];
    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Ticket created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create ticket'
    });
  }
});

module.exports = router;
