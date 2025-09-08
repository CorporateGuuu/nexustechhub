import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export default async function handler(req, res) {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify API key
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

    if (req.method === 'GET') {
      // Get query parameters
      const { page = 1, pagesize = 10, department, keyword } = req.query;
      const offset = (parseInt(page) - 1) * parseInt(pagesize);
      const limit = parseInt(pagesize);

      // Build WHERE clause for filters
      let whereClause = '';
      let params = [];
      let paramIndex = 1;

      if (department) {
        whereClause += ` AND department ILIKE $${paramIndex}`;
        params.push(`%${department}%`);
        paramIndex++;
      }

      if (keyword) {
        whereClause += ` AND (
          first_name ILIKE $${paramIndex} OR
          last_name ILIKE $${paramIndex} OR
          email ILIKE $${paramIndex} OR
          role ILIKE $${paramIndex}
        )`;
        params.push(`%${keyword}%`);
        paramIndex++;
      }

      // Query employees with pagination and filters
      const query = `
        SELECT
          id,
          first_name,
          last_name,
          email,
          phone,
          mobile,
          address,
          city,
          state,
          postal_code,
          country,
          role,
          department,
          hire_date,
          salary,
          is_active,
          created_at
        FROM employees
        WHERE 1=1 ${whereClause}
        ORDER BY created_at DESC
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `;

      params.push(limit, offset);

      const result = await pool.query(query, params);

      // Transform data
      const employees = result.rows.map(employee => ({
        id: employee.id,
        fullName: `${employee.first_name} ${employee.last_name}`,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone || '',
        mobile: employee.mobile || '',
        address: employee.address || '',
        city: employee.city || '',
        state: employee.state || '',
        postal_code: employee.postal_code || '',
        country: employee.country || '',
        role: employee.role || '',
        department: employee.department || '',
        hire_date: employee.hire_date,
        salary: employee.salary,
        is_active: employee.is_active,
        created_at: employee.created_at
      }));

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "OK",
        data: employees
      });

    } else if (req.method === 'POST') {
      // Create new employee
      const {
        first_name,
        last_name,
        email,
        phone,
        mobile,
        address,
        city,
        state,
        postal_code,
        country,
        role,
        department,
        hire_date,
        salary
      } = req.body;

      if (!first_name || !last_name || !email) {
        return res.status(400).json({
          success: false,
          message: 'First name, last name, and email are required'
        });
      }

      const insertQuery = `
        INSERT INTO employees (first_name, last_name, email, phone, mobile, address, city, state, postal_code, country, role, department, hire_date, salary)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *
      `;

      const values = [first_name, last_name, email, phone, mobile, address, city, state, postal_code, country, role, department, hire_date, salary];
      const result = await pool.query(insertQuery, values);

      res.status(201).json({
        success: true,
        message: 'Employee created successfully',
        data: result.rows[0]
      });

    } else if (req.method === 'PUT') {
      // Update employee
      const { id } = req.query;
      const updates = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Employee ID is required'
        });
      }

      const fields = Object.keys(updates);
      const values = Object.values(updates);
      const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

      const updateQuery = `
        UPDATE employees
        SET ${setClause}, updated_at = NOW()
        WHERE id = $${fields.length + 1}
        RETURNING *
      `;

      values.push(id);
      const result = await pool.query(updateQuery, values);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Employee updated successfully',
        data: result.rows[0]
      });

    } else if (req.method === 'DELETE') {
      // Delete employee
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Employee ID is required'
        });
      }

      const deleteQuery = 'DELETE FROM employees WHERE id = $1 RETURNING *';
      const result = await pool.query(deleteQuery, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Employee deleted successfully'
      });
    }

  } catch (error) {
    console.error('Error handling employees:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      data: "string"
    });
  }
}
