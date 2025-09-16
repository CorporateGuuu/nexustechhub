import { getProduct } from '../../../lib/supabase';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required'
      });
    }

    if (req.method === 'GET') {
      const { data, error } = await getProduct(id);

      if (error) {
        console.error('Error fetching product:', error);
        if (error.message === 'Product not found') {
          return res.status(404).json({
            success: false,
            error: 'Product not found'
          });
        }
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch product',
          details: error.message
        });
      }

      return res.status(200).json({
        success: true,
        data
      });

    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
}
