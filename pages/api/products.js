import { getProducts } from '../../lib/supabase';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Get products with optional filters
      const {
        category,
        brand,
        search,
        is_featured,
        is_new,
        min_price,
        max_price,
        sort_by,
        sort_order,
        limit,
        offset
      } = req.query;

      const filters = {
        category,
        brand,
        search,
        is_featured: is_featured === 'true',
        is_new: is_new === 'true',
        min_price: min_price ? parseFloat(min_price) : undefined,
        max_price: max_price ? parseFloat(max_price) : undefined,
        sort_by,
        sort_order,
        limit: limit ? parseInt(limit) : undefined,
        offset: offset ? parseInt(offset) : undefined
      };

      const { data, error } = await getProducts(filters);

      if (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch products',
          details: error.message
        });
      }

      return res.status(200).json({
        success: true,
        data: data || [],
        count: data?.length || 0
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
