import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/mdtstech_store',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export default async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) {
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
      // Get attendance records for date range
      const { start_date, end_date, employee_id } = req.query;

      if (!start_date || !end_date) {
        return res.status(400).json({
          success: false,
          message: 'Start date and end date are required'
        });
      }

      let whereClause = 'WHERE ea.check_in >= $1 AND ea.check_in <= $2';
      let params = [start_date, end_date];
      let paramIndex = 3;

      if (employee_id) {
        whereClause += ` AND ea.employee_id = $${paramIndex}`;
        params.push(employee_id);
        paramIndex++;
      }

      // Query attendance with employee details
      const query = `
        SELECT
          ea.id,
          ea.employee_id,
          e.first_name,
          e.last_name,
          e.email,
          e.role,
          e.department,
          ea.check_in,
          ea.check_out,
          ea.total_hours,
          ea.status,
          ea.notes,
          ea.created_at
        FROM employee_attendance ea
        JOIN employees e ON ea.employee_id = e.id
        ${whereClause}
        ORDER BY ea.check_in DESC
      `;

      const result = await pool.query(query, params);

      // Group by employee and calculate totals
      const attendanceMap = new Map();

      result.rows.forEach(record => {
        const employeeKey = record.employee_id;
        if (!attendanceMap.has(employeeKey)) {
          attendanceMap.set(employeeKey, {
            employee_name: `${record.first_name} ${record.last_name}`,
            email: record.email,
            role: record.role,
            department: record.department,
            total_hours: 0,
            total_shifts: 0,
            missed_shifts: 0,
            records: []
          });
        }

        const employeeData = attendanceMap.get(employeeKey);
        employeeData.total_hours += parseFloat(record.total_hours || 0);
        employeeData.total_shifts += 1;
        if (record.status === 'absent') {
          employeeData.missed_shifts += 1;
        }
        employeeData.records.push({
          id: record.id,
          check_in: record.check_in,
          check_out: record.check_out,
          total_hours: record.total_hours,
          status: record.status,
          notes: record.notes
        });
      });

      const attendanceSummary = Array.from(attendanceMap.values());

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "OK",
        data: attendanceSummary
      });

    } else if (req.method === 'POST') {
      // Record attendance
      const { employee_id, check_in, check_out, status, notes } = req.body;

      if (!employee_id || !check_in) {
        return res.status(400).json({
          success: false,
          message: 'Employee ID and check-in time are required'
        });
      }

      // Calculate total hours if check_out is provided
      let total_hours = null;
      if (check_out) {
        const checkInTime = new Date(check_in);
        const checkOutTime = new Date(check_out);
        const diffMs = checkOutTime - checkInTime;
        total_hours = (diffMs / (1000 * 60 * 60)).toFixed(2); // hours
      }

      const insertQuery = `
        INSERT INTO employee_attendance (employee_id, check_in, check_out, total_hours, status, notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;

      const values = [employee_id, check_in, check_out, total_hours, status || 'present', notes];
      const result = await pool.query(insertQuery, values);

      res.status(201).json({
        success: true,
        message: 'Attendance recorded successfully',
        data: result.rows[0]
      });
    }

  } catch (error) {
    console.error('Error handling employee attendance:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      data: "string"
    });
  }
}
