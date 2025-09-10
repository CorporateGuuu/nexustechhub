import { getRepairTypes } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      statusCode: 405,
      message: 'Method Not Allowed',
      data: {
        name: 'MethodNotAllowed',
        message: 'Only GET method is allowed.',
        code: 0,
        status: 405
      }
    });
  }

  const { api_key } = req.query;

  // Simple authentication check - in production, use proper validation logic
  const validApiKey = 'dummy-api-key'; // Replace with actual validation logic

  if (!api_key || api_key !== validApiKey) {
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

  // Fetch repair types dynamically from database
  try {
    const repairTypes = await getRepairTypes();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'OK',
      data: [repairTypes]
    });
  } catch (error) {
    console.error('Error fetching repair types:', error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to fetch repair types',
      data: []
    });
  }
}
