import { getProducts, getCategoryBySlug, supabase } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    // Get query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const categorySlug = req.query.category || null;

    let categoryId = null;
    if (categorySlug) {
      try {
        const category = await getCategoryBySlug(categorySlug);
        categoryId = category?.id || null;
      } catch (error) {
        console.error('Error getting category:', error);
        // In development, ignore and proceed without category filter
        if (process.env.NODE_ENV !== 'development') {
          throw error;
        }
      }
    }

    // Build filters object
    const filters = {
      category: categoryId,
      limit,
      page
    };

    // Fetch products from database
    const products = await getProducts(filters);

    // Map products to expected format
    products = products.map(product => ({
      ...product,
      image_url: product.image_url || product.product_images?.find(img => img.is_primary)?.image_url || product.product_images?.[0]?.image_url || null
    }));

    // Get total count for pagination
    let total = 0;
    if (!supabase) {
      // Mock mode
      total = products.length;
    } else {
      try {
        if (categoryId) {
          const { count, error } = await supabase
            .from('products')
            .select('id', { count: 'exact', head: true })
            .eq('category_id', categoryId);

          if (error) {
            throw error;
          }
          total = count || 0;
        } else {
          const { count, error } = await supabase
            .from('products')
            .select('id', { count: 'exact', head: true });

          if (error) {
            throw error;
          }
          total = count || 0;
        }
      } catch (error) {
        console.error('Error getting total product count:', error);
        // Fallback to products length
        total = products.length;
      }
    }

    const totalPages = Math.ceil(total / limit) || 1;

    // Return products as JSON
    res.status(200).json({
      success: true,
      products,
      total,
      totalPages
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
