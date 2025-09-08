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

// GET /api/repaircategories - Get all repair categories with nested data
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT
        rc.id,
        rc.name,
        rc.image,
        rc.created_at,
        rc.updated_at,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', m.id,
              'name', m.name,
              'image', m.image,
              'created_at', m.created_at,
              'updated_at', m.updated_at,
              'devices', COALESCE((
                SELECT JSON_AGG(
                  JSON_BUILD_OBJECT(
                    'id', d.id,
                    'name', d.name,
                    'on_site_price', d.on_site_price,
                    'pickup_price', d.pickup_price,
                    'image', d.image,
                    'created_at', d.created_at,
                    'updated_at', d.updated_at,
                    'colors', COALESCE((
                      SELECT JSON_AGG(
                        JSON_BUILD_OBJECT(
                          'id', dc.id,
                          'name', dc.name,
                          'code', dc.code,
                          'created_at', dc.created_at
                        )
                      ) FROM device_colors dc WHERE dc.device_id = d.id
                    ), '[]'::json),
                    'problems', COALESCE((
                      SELECT JSON_AGG(
                        JSON_BUILD_OBJECT(
                          'id', dp.id,
                          'name', dp.name,
                          'retail_price', dp.retail_price,
                          'sale_price', dp.sale_price,
                          'image', dp.image,
                          'created_at', dp.created_at,
                          'updated_at', dp.updated_at
                        )
                      ) FROM device_problems dp WHERE dp.device_id = d.id
                    ), '[]'::json)
                  )
                ) FROM devices d WHERE d.manufacturer_id = m.id
              ), '[]'::json)
            )
          ) FILTER (WHERE m.id IS NOT NULL), '[]'::json
        ) as manufacturers
      FROM repair_categories rc
      LEFT JOIN manufacturers m ON rc.id = m.category_id
      GROUP BY rc.id, rc.name, rc.image, rc.created_at, rc.updated_at
      ORDER BY rc.created_at DESC
    `;

    const result = await pool.query(query);
    res.json({
      success: true,
      statusCode: 200,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching repair categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch repair categories'
    });
  }
});

// GET /api/repaircategories/:id - Get single repair category with nested data
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT
        rc.id,
        rc.name,
        rc.image,
        rc.created_at,
        rc.updated_at,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', m.id,
              'name', m.name,
              'image', m.image,
              'created_at', m.created_at,
              'updated_at', m.updated_at,
              'devices', COALESCE((
                SELECT JSON_AGG(
                  JSON_BUILD_OBJECT(
                    'id', d.id,
                    'name', d.name,
                    'on_site_price', d.on_site_price,
                    'pickup_price', d.pickup_price,
                    'image', d.image,
                    'created_at', d.created_at,
                    'updated_at', d.updated_at,
                    'colors', COALESCE((
                      SELECT JSON_AGG(
                        JSON_BUILD_OBJECT(
                          'id', dc.id,
                          'name', dc.name,
                          'code', dc.code,
                          'created_at', dc.created_at
                        )
                      ) FROM device_colors dc WHERE dc.device_id = d.id
                    ), '[]'::json),
                    'problems', COALESCE((
                      SELECT JSON_AGG(
                        JSON_BUILD_OBJECT(
                          'id', dp.id,
                          'name', dp.name,
                          'retail_price', dp.retail_price,
                          'sale_price', dp.sale_price,
                          'image', dp.image,
                          'created_at', dp.created_at,
                          'updated_at', dp.updated_at
                        )
                      ) FROM device_problems dp WHERE dp.device_id = d.id
                    ), '[]'::json)
                  )
                ) FROM devices d WHERE d.manufacturer_id = m.id
              ), '[]'::json)
            )
          ) FILTER (WHERE m.id IS NOT NULL), '[]'::json
        ) as manufacturers
      FROM repair_categories rc
      LEFT JOIN manufacturers m ON rc.id = m.category_id
      WHERE rc.id = $1
      GROUP BY rc.id, rc.name, rc.image, rc.created_at, rc.updated_at
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Repair category not found'
      });
    }

    res.json({
      success: true,
      statusCode: 200,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching repair category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch repair category'
    });
  }
});

// POST /api/repaircategories - Create new repair category
router.post('/', async (req, res) => {
  try {
    const { name, image } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Name is required'
      });
    }

    // Check if category with this name already exists
    const existingQuery = 'SELECT id FROM repair_categories WHERE name = $1';
    const existingResult = await pool.query(existingQuery, [name]);

    if (existingResult.rows.length > 0) {
      return res.status(409).json({
        success: false,
        statusCode: 409,
        message: 'Repair category with this name already exists'
      });
    }

    const query = `
      INSERT INTO repair_categories (name, image, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING id, name, image, created_at, updated_at
    `;
    const values = [name, image];
    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Repair category created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating repair category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create repair category'
    });
  }
});

// PUT /api/repaircategories/:id - Update repair category
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    // Check if category exists
    const existingQuery = 'SELECT id FROM repair_categories WHERE id = $1';
    const existingResult = await pool.query(existingQuery, [id]);

    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Repair category not found'
      });
    }

    // Check if name is being changed and if it's already taken
    if (name) {
      const nameCheckQuery = 'SELECT id FROM repair_categories WHERE name = $1 AND id != $2';
      const nameCheckResult = await pool.query(nameCheckQuery, [name, id]);

      if (nameCheckResult.rows.length > 0) {
        return res.status(409).json({
          success: false,
          statusCode: 409,
          message: 'Name is already taken by another repair category'
        });
      }
    }

    const query = `
      UPDATE repair_categories
      SET name = COALESCE($1, name),
          image = COALESCE($2, image),
          updated_at = NOW()
      WHERE id = $3
      RETURNING id, name, image, created_at, updated_at
    `;
    const values = [name, image, id];
    const result = await pool.query(query, values);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Repair category updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating repair category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update repair category'
    });
  }
});

// DELETE /api/repaircategories/:id - Delete repair category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const existingQuery = 'SELECT id FROM repair_categories WHERE id = $1';
    const existingResult = await pool.query(existingQuery, [id]);

    if (existingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Repair category not found'
      });
    }

    // Delete the category (cascade will handle related records)
    const deleteQuery = 'DELETE FROM repair_categories WHERE id = $1';
    await pool.query(deleteQuery, [id]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Repair category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting repair category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete repair category'
    });
  }
});

module.exports = router;
