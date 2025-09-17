import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { category, limit = 20 } = req.query;

  try {
    let query = supabase
      .from('products')
      .select('*')
      .limit(parseInt(limit));

    if (category) {
      query = query.ilike('name', `%${category}%`);
    }

    const { data: products, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      // Return sample data if database query fails
      return res.status(200).json({
        products: getSampleProducts(category),
        total: getSampleProducts(category).length
      });
    }

    res.status(200).json({
      products: products || [],
      total: products?.length || 0
    });

  } catch (error) {
    console.error('Products API error:', error);
    // Return sample data as fallback
    res.status(200).json({
      products: getSampleProducts(category),
      total: getSampleProducts(category).length
    });
  }
}

function getSampleProducts(category) {
  const allProducts = [
    // iPhone products
    {
      id: 1,
      name: 'iPhone 15 Pro Max Screen',
      price: 299.99,
      image: '/images/products/iphone-15-pro-max-screen.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'iphone'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Battery',
      price: 89.99,
      image: '/images/products/iphone-15-pro-battery.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'iphone'
    },
    {
      id: 3,
      name: 'iPhone 15 Charging Port',
      price: 49.99,
      image: '/images/products/iphone-15-charging-port.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'iphone'
    },
    {
      id: 4,
      name: 'iPhone 14 Pro Max Screen',
      price: 249.99,
      image: '/images/products/iphone-14-pro-max-screen.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'iphone'
    },
    {
      id: 5,
      name: 'iPhone 14 Battery',
      price: 79.99,
      image: '/images/products/iphone-14-battery.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'iphone'
    },
    {
      id: 6,
      name: 'iPhone 13 Pro Screen',
      price: 199.99,
      image: '/images/products/iphone-13-pro-screen.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'iphone'
    },

    // Samsung products
    {
      id: 7,
      name: 'Samsung S24 Ultra Screen',
      price: 349.99,
      image: '/images/products/samsung-s24-ultra-screen.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'samsung'
    },
    {
      id: 8,
      name: 'Samsung S24 Battery',
      price: 79.99,
      image: '/images/products/samsung-s24-battery.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'samsung'
    },
    {
      id: 9,
      name: 'Samsung S24 Charging Port',
      price: 39.99,
      image: '/images/products/samsung-s24-charging-port.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'samsung'
    },
    {
      id: 10,
      name: 'Samsung S23 Ultra Screen',
      price: 299.99,
      image: '/images/products/samsung-s23-ultra-screen.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'samsung'
    },
    {
      id: 11,
      name: 'Samsung A54 Screen',
      price: 149.99,
      image: '/images/products/samsung-a54-screen.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'samsung'
    },
    {
      id: 12,
      name: 'Samsung Tab S9 Screen',
      price: 199.99,
      image: '/images/products/samsung-tab-s9-screen.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'samsung'
    },

    // iPad products
    {
      id: 13,
      name: 'iPad Pro 12.9" Screen',
      price: 399.99,
      image: '/images/products/ipad-pro-12-9-screen.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'ipad'
    },
    {
      id: 14,
      name: 'iPad Pro Battery',
      price: 89.99,
      image: '/images/products/ipad-pro-battery.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'ipad'
    },
    {
      id: 15,
      name: 'iPad Air 5 Screen',
      price: 249.99,
      image: '/images/products/ipad-air-5-screen.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'ipad'
    },
    {
      id: 16,
      name: 'iPad Mini 6 Screen',
      price: 199.99,
      image: '/images/products/ipad-mini-6-screen.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'ipad'
    },
    {
      id: 17,
      name: 'iPad Charging Port',
      price: 49.99,
      image: '/images/products/ipad-charging-port.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'ipad'
    },
    {
      id: 18,
      name: 'iPad Home Button',
      price: 39.99,
      image: '/images/products/ipad-home-button.jpg',
      condition: 'New',
      warranty: '6 months',
      category: 'ipad'
    }
  ];

  if (category) {
    return allProducts.filter(product =>
      product.category.toLowerCase().includes(category.toLowerCase()) ||
      product.name.toLowerCase().includes(category.toLowerCase())
    );
  }

  return allProducts;
}
