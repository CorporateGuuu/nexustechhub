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

// GET /api/customer - Get all customers
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT id, name, email, phone, address, city, state, postal_code, country, created_at, updated_at
      FROM customers
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    res.json({
      success: true,
      statusCode: 200,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT id, name, email, phone, address, city, state, postal_code, country, created_at, updated_at
      FROM customers
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Customer not found'
      });
    }

    res.json({
      success: true,
      statusCode: 200,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customer'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      postal_code,
      country = 'UAE'
    } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Name is required'
      });
    }

    // Check if customer with this email already exists
    if (email) {
      const existingQuery = 'SELECT id FROM customers WHERE email = $1';
      const existingResult = await pool.query(existingQuery, [email]);

      if (existingResult.rows.length > 0) {
        return res.status(409).json({
          success: false,
          statusCode: 409,
          message: 'Customer with this email already exists'
        });
      }
    }

    const query = `
      INSERT INTO customers (
        name, email, phone, address, city, state, postal_code, country, created_at, updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()
      )
      RETURNING id, name, email, phone, address, city, state, postal_code, country, created_at, updated_at
    `;
    const values = [
      name, email, phone, address, city, state, postal_code, country
    ];
    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Customer added Successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create customer'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      postal_code,
      country
    } = req.body;

    // Check if customer exists
    const existingQuery = 'SELECT id FROM customers WHERE id = $1';
    const existingResult = await pool.query(existingQuery, [id]);

    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Customer not found'
      });
    }

    // Check if email is being changed and if it's already taken
    if (email) {
      const emailCheckQuery = 'SELECT id FROM customers WHERE email = $1 AND id != $2';
      const emailCheckResult = await pool.query(emailCheckQuery, [email, id]);

      if (emailCheckResult.rows.length > 0) {
        return res.status(409).json({
          success: false,
          statusCode: 409,
          message: 'Email is already taken by another customer'
        });
      }
    }

    const query = `
      UPDATE customers
      SET name = COALESCE($1, name),
          email = COALESCE($2, email),
          phone = COALESCE($3, phone),
          address = COALESCE($4, address),
          city = COALESCE($5, city),
          state = COALESCE($6, state),
          postal_code = COALESCE($7, postal_code),
          country = COALESCE($8, country),
          updated_at = NOW()
      WHERE id = $9
      RETURNING id, name, email, phone, address, city, state, postal_code, country, created_at, updated_at
    `;
    const values = [
      name, email, phone, address, city, state, postal_code, country, id
    ];
    const result = await pool.query(query, values);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Customer Updated Successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update customer'
    });
  }
});



module.exports = router;
