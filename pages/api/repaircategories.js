import { getRepairCategories } from '../../lib/db';

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

    // Fetch repair categories from database
    const data = await getRepairCategories();

    // Return data as JSON
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "OK",
      data
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
