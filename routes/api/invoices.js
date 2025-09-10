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

// GET /api/invoices - Get all invoices with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pagesize) || 10;
    const offset = (page - 1) * pageSize;

    const query = `
      SELECT i.id, i.invoice_number, i.customer_id, c.name as customer_name,
             i.items, i.subtotal, i.tax_amount, i.total_amount, i.status,
             i.due_date, i.notes, i.created_at, i.updated_at
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
      ORDER BY i.created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [pageSize, offset]);

    // Get total count
    const countQuery = 'SELECT COUNT(*) FROM invoices';
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
    console.error('Error fetching invoices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoices'
    });
  }
});

// GET /api/invoices/:id - Get single invoice
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT i.id, i.invoice_number, i.customer_id, c.name as customer_name,
             i.items, i.subtotal, i.tax_amount, i.total_amount, i.status,
             i.due_date, i.notes, i.created_at, i.updated_at
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
      WHERE i.id = $1
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Invoice not found'
      });
    }

    res.json({
      success: true,
      statusCode: 200,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoice'
    });
  }
});

// POST /api/invoices - Create a new invoice
router.post('/', async (req, res) => {
  try {
    const {
      customer_id,
      items,
      subtotal,
      tax_amount = 0,
      total_amount,
      due_date,
      notes
    } = req.body;

    // Validate required fields
    if (!customer_id || !items || !total_amount) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Customer ID, items, and total amount are required'
      });
    }

    // Check if customer exists
    const customerQuery = 'SELECT id FROM customers WHERE id = $1';
    const customerResult = await pool.query(customerQuery, [customer_id]);
    if (customerResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Customer not found'
      });
    }

    // Generate invoice number
    const invoiceNumber = `INV-${Date.now()}`;

    const query = `
      INSERT INTO invoices (
        customer_id, invoice_number, items, subtotal, tax_amount, total_amount,
        due_date, notes, created_at, updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()
      )
      RETURNING id, customer_id, invoice_number, items, subtotal, tax_amount, total_amount,
                status, due_date, notes, created_at, updated_at
    `;
    const values = [
      customer_id, invoiceNumber, JSON.stringify(items), subtotal, tax_amount, total_amount,
      due_date, notes
    ];
    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Invoice created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create invoice'
    });
  }
});

module.exports = router;
