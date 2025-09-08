import { getDevices } from '../../lib/db';

export default async function handler(req, res) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({
        success: false,
        statusCode: 405,
        message: 'Method not allowed',
        data: null
      });
    }

    // Simple authentication check (placeholder for actual auth)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Unauthorized',
        data: {
          name: 'Unauthorized',
          message: 'Your request was made with invalid credentials.',
          code: 0,
          status: 401
        }
      });
    }

    // Fetch devices from database
    const devices = await getDevices();

    if (!devices || devices.length === 0) {
      return res.status(404).json({
        message: 'No devices found'
      });
    }

    // Return data as JSON
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'OK',
      data: devices
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      data: null
    });
  }
}
