const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const { createClient } = require('@supabase/supabase-js');
const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();

// Database connections
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

// API Key authentication middleware
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'API key is required',
      data: null
    });
  }

  // In production, you should validate the API key against a database or environment variable
  const validApiKey = process.env.REPAIRDESK_API_KEY || 'repairdesk-api-key-123';

  if (apiKey !== validApiKey) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Invalid API key',
      data: null
    });
  }

  next();
};

// Apply authentication to all routes
router.use(authenticateApiKey);

// Helper function to run scripts
const runScript = (scriptName) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../../../Scripts', scriptName);
    exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

// PARTS MANAGEMENT ENDPOINTS

// POST /api/repairdesk/insert-parts - Trigger MacBook parts insertion
router.post('/insert-parts', async (req, res) => {
  try {
    console.log('Starting MacBook parts insertion...');

    const result = await runScript('insert_macbook_parts.js');

    res.json({
      success: true,
      statusCode: 200,
      message: 'MacBook parts insertion completed successfully',
      data: {
        output: result.stdout,
        script: 'insert_macbook_parts.js'
      }
    });
  } catch (error) {
    console.error('Error inserting parts:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to insert MacBook parts',
      data: {
        error: error.stderr || error.message,
        script: 'insert_macbook_parts.js'
      }
    });
  }
});

// GET /api/repairdesk/verify-parts - Verify parts insertion status
router.get('/verify-parts', async (req, res) => {
  try {
    console.log('Verifying MacBook parts insertion...');

    const result = await runScript('verify_macbook_parts.js');

    // Parse the output to extract verification results
    const output = result.stdout;
    const productsFound = output.match(/Total MacBook parts products found: (\d+)/);
    const expectedCount = 50;

    const verificationResult = {
      total_products_found: productsFound ? parseInt(productsFound[1]) : 0,
      expected_count: expectedCount,
      is_complete: productsFound ? parseInt(productsFound[1]) >= expectedCount : false,
      script_output: output
    };

    res.json({
      success: true,
      statusCode: 200,
      message: 'Parts verification completed',
      data: verificationResult
    });
  } catch (error) {
    console.error('Error verifying parts:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to verify MacBook parts',
      data: {
        error: error.stderr || error.message,
        script: 'verify_macbook_parts.js'
      }
    });
  }
});

// GET /api/repairdesk/parts - List available MacBook parts
router.get('/parts', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Supabase connection not available',
        data: null
      });
    }

    const {
      page = 1,
      limit = 20,
      brand,
      is_featured,
      is_new,
      search,
      sort_by = 'created_at',
      sort_order = 'desc'
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Get MacBook Parts category ID
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'macbook-parts')
      .single();

    if (categoryError || !category) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'MacBook Parts category not found',
        data: null
      });
    }

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('category_id', category.id);

    // Apply filters
    if (brand) {
      query = query.ilike('brand', `%${brand}%`);
    }

    if (is_featured === 'true') {
      query = query.eq('is_featured', true);
    }

    if (is_new === 'true') {
      query = query.eq('is_new', true);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
    }

    // Apply sorting
    const validSortFields = ['name', 'price', 'created_at', 'stock_quantity'];
    const sortField = validSortFields.includes(sort_by) ? sort_by : 'created_at';
    const ascending = sort_order === 'asc';

    query = query.order(sortField, { ascending });

    // Apply pagination
    query = query.range(offset, offset + parseInt(limit) - 1);

    const { data: parts, error: partsError, count } = await query;

    if (partsError) {
      throw partsError;
    }

    const totalPages = Math.ceil(count / parseInt(limit));

    res.json({
      success: true,
      statusCode: 200,
      message: 'MacBook parts retrieved successfully',
      data: {
        parts,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_items: count,
          items_per_page: parseInt(limit),
          has_next: parseInt(page) < totalPages,
          has_prev: parseInt(page) > 1
        },
        filters: {
          brand,
          is_featured: is_featured === 'true',
          is_new: is_new === 'true',
          search
        }
      }
    });
  } catch (error) {
    console.error('Error fetching parts:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to fetch MacBook parts',
      data: null
    });
  }
});

// REPAIR JOBS CRUD ENDPOINTS

// POST /api/repairdesk/repair-jobs - Create repair job
router.post('/repair-jobs', async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      device_model,
      device_serial,
      problem_description,
      parts_used = [],
      estimated_cost = 0,
      status = 'pending'
    } = req.body;

    // Validation
    if (!customer_name || !customer_email || !device_model || !problem_description) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Missing required fields: customer_name, customer_email, device_model, problem_description',
        data: null
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer_email)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid email format',
        data: null
      });
    }

    const query = `
      INSERT INTO repair_jobs (
        customer_name, customer_email, customer_phone, device_model,
        device_serial, problem_description, parts_used, estimated_cost, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      customer_name,
      customer_email,
      customer_phone,
      device_model,
      device_serial,
      problem_description,
      JSON.stringify(parts_used),
      parseFloat(estimated_cost),
      status
    ];

    const result = await pool.query(query, values);
    const repairJob = result.rows[0];

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Repair job created successfully',
      data: repairJob
    });
  } catch (error) {
    console.error('Error creating repair job:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to create repair job',
      data: null
    });
  }
});

// GET /api/repairdesk/repair-jobs - List repair jobs
router.get('/repair-jobs', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      customer_email,
      sort_by = 'created_at',
      sort_order = 'desc'
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = `
      SELECT *,
             CASE
               WHEN status = 'completed' THEN 1
               WHEN status = 'in_progress' THEN 2
               WHEN status = 'pending' THEN 3
               ELSE 4
             END as status_priority
      FROM repair_jobs
      WHERE 1=1
    `;
    const values = [];
    let paramCount = 0;

    // Apply filters
    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      values.push(status);
    }

    if (customer_email) {
      paramCount++;
      query += ` AND customer_email ILIKE $${paramCount}`;
      values.push(`%${customer_email}%`);
    }

    // Apply sorting
    const validSortFields = ['created_at', 'updated_at', 'customer_name', 'device_model', 'estimated_cost', 'status_priority'];
    const sortField = validSortFields.includes(sort_by) ? sort_by : 'created_at';
    const order = sort_order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${sortField} ${order}`;

    // Add pagination
    paramCount++;
    query += ` LIMIT $${paramCount}`;
    values.push(parseInt(limit));

    paramCount++;
    query += ` OFFSET $${paramCount}`;
    values.push(offset);

    const result = await pool.query(query, values);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) FROM repair_jobs WHERE 1=1';
    const countValues = [];
    let countParamCount = 0;

    if (status) {
      countParamCount++;
      countQuery += ` AND status = $${countParamCount}`;
      countValues.push(status);
    }

    if (customer_email) {
      countParamCount++;
      countQuery += ` AND customer_email ILIKE $${countParamCount}`;
      countValues.push(`%${customer_email}%`);
    }

    const countResult = await pool.query(countQuery, countValues);
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / parseInt(limit));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Repair jobs retrieved successfully',
      data: {
        repair_jobs: result.rows,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_items: totalItems,
          items_per_page: parseInt(limit),
          has_next: parseInt(page) < totalPages,
          has_prev: parseInt(page) > 1
        },
        filters: {
          status,
          customer_email
        }
      }
    });
  } catch (error) {
    console.error('Error fetching repair jobs:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to fetch repair jobs',
      data: null
    });
  }
});

// GET /api/repairdesk/repair-jobs/:id - Get single repair job
router.get('/repair-jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT r.*,
             COALESCE(json_agg(
               json_build_object(
                 'id', rp.id,
                 'part_name', rp.part_name,
                 'part_sku', rp.part_sku,
                 'quantity', rp.quantity,
                 'unit_cost', rp.unit_cost,
                 'total_cost', rp.total_cost
               )
             ) FILTER (WHERE rp.id IS NOT NULL), '[]') as repair_parts,
             COALESCE(json_agg(
               json_build_object(
                 'id', rh.id,
                 'old_status', rh.old_status,
                 'new_status', rh.new_status,
                 'notes', rh.notes,
                 'changed_at', rh.changed_at
               )
             ) FILTER (WHERE rh.id IS NOT NULL), '[]') as status_history
      FROM repair_jobs r
      LEFT JOIN repair_job_parts rp ON r.id = rp.repair_job_id
      LEFT JOIN repair_job_history rh ON r.id = rh.repair_job_id
      WHERE r.id = $1
      GROUP BY r.id
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Repair job not found',
        data: null
      });
    }

    const repairJob = result.rows[0];

    res.json({
      success: true,
      statusCode: 200,
      message: 'Repair job retrieved successfully',
      data: repairJob
    });
  } catch (error) {
    console.error('Error fetching repair job:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to fetch repair job',
      data: null
    });
  }
});

// PUT /api/repairdesk/repair-jobs/:id - Update repair job
router.put('/repair-jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      customer_name,
      customer_email,
      customer_phone,
      device_model,
      device_serial,
      problem_description,
      parts_used,
      estimated_cost,
      actual_cost,
      status,
      technician_notes
    } = req.body;

    // Check if repair job exists
    const checkQuery = 'SELECT * FROM repair_jobs WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Repair job not found',
        data: null
      });
    }

    const existingJob = checkResult.rows[0];

    // Track status change if status is being updated
    if (status && status !== existingJob.status) {
      const historyQuery = `
        INSERT INTO repair_job_history (repair_job_id, old_status, new_status, notes)
        VALUES ($1, $2, $3, $4)
      `;
      await pool.query(historyQuery, [id, existingJob.status, status, 'Status updated via API']);
    }

    // Build update query dynamically
    const updateFields = [];
    const values = [];
    let paramCount = 0;

    const fieldsToUpdate = {
      customer_name,
      customer_email,
      customer_phone,
      device_model,
      device_serial,
      problem_description,
      parts_used: parts_used ? JSON.stringify(parts_used) : undefined,
      estimated_cost: estimated_cost !== undefined ? parseFloat(estimated_cost) : undefined,
      actual_cost: actual_cost !== undefined ? parseFloat(actual_cost) : undefined,
      status,
      technician_notes
    };

    Object.entries(fieldsToUpdate).forEach(([field, value]) => {
      if (value !== undefined) {
        paramCount++;
        updateFields.push(`${field} = $${paramCount}`);
        values.push(value);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'No fields to update',
        data: null
      });
    }

    paramCount++;
    updateFields.push(`updated_at = NOW()`);

    const updateQuery = `
      UPDATE repair_jobs
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;
    values.push(id);

    const result = await pool.query(updateQuery, values);
    const updatedJob = result.rows[0];

    // If status changed to completed, set completed_at
    if (status === 'completed' && existingJob.status !== 'completed') {
      const completeQuery = 'UPDATE repair_jobs SET completed_at = NOW() WHERE id = $1';
      await pool.query(completeQuery, [id]);
      updatedJob.completed_at = new Date();
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Repair job updated successfully',
      data: updatedJob
    });
  } catch (error) {
    console.error('Error updating repair job:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to update repair job',
      data: null
    });
  }
});

// DELETE /api/repairdesk/repair-jobs/:id - Delete repair job
router.delete('/repair-jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if repair job exists
    const checkQuery = 'SELECT * FROM repair_jobs WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Repair job not found',
        data: null
      });
    }

    // Delete repair job (cascade will handle related records)
    const deleteQuery = 'DELETE FROM repair_jobs WHERE id = $1';
    await pool.query(deleteQuery, [id]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Repair job deleted successfully',
      data: { id: parseInt(id) }
    });
  } catch (error) {
    console.error('Error deleting repair job:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to delete repair job',
      data: null
    });
  }
});

// Simple test route (keeping for compatibility)
router.get('/test', (req, res) => {
  res.json({
    success: true,
    statusCode: 200,
    message: 'Repairdesk API is working',
    data: {
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }
  });
});

module.exports = router;
