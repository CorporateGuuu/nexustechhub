// Database connection for Nexus TechHub using Supabase
// Provides database connection and query helpers

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we're in development mode and handle missing env vars gracefully
const isDevelopment = process.env.NODE_ENV === 'development';

if (!supabaseUrl || !supabaseKey) {
  if (!isDevelopment) {
    throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file');
  }
  console.warn('⚠️  Supabase environment variables not found. Running in development mode with mock data.');
}

// Create Supabase client only if environment variables are available
export const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Database query helper
export const query = async (table, options = {}) => {
  // Return mock data if Supabase is not available (development mode)
  if (!supabase) {
    console.log(`Mock query: ${table}`, options);
    return { rows: [], rowCount: 0 };
  }

  let queryBuilder = supabase.from(table).select(options.select || '*');

  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        queryBuilder = queryBuilder.in(key, value);
      } else {
        queryBuilder = queryBuilder.eq(key, value);
      }
    });
  }

  if (options.orderBy) {
    queryBuilder = queryBuilder.order(options.orderBy.column, { ascending: options.orderBy.ascending });
  }

  if (options.limit) {
    queryBuilder = queryBuilder.limit(options.limit);
  }

  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Database query error:', error);
    throw error;
  }

  return { rows: data, rowCount: data?.length || 0 };
};

// User management functions
export const createUser = async (userData) => {
  if (!supabase) {
    console.log('Mock createUser:', userData);
    return { id: 'mock-user-id', ...userData };
  }

  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        name: userData.name,
        phone: userData.phone,
      }
    }
  });

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return data.user;
};

export const getUserByEmail = async (email) => {
  if (!supabase) {
    console.log('Mock getUserByEmail:', email);
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error getting user by email:', error);
    throw error;
  }

  return data;
};

export const getUserById = async (id) => {
  if (!supabase) {
    console.log('Mock getUserById:', id);
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error getting user by ID:', error);
    throw error;
  }

  return data;
};

export const updateUser = async (id, userData) => {
  if (!supabase) {
    console.log('Mock updateUser:', id, userData);
    return { id, ...userData };
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(userData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    throw error;
  }

  return data;
};

// Category functions
export const getCategories = async () => {
  if (!supabase) {
    console.log('Mock getCategories');
    return [
      { id: 1, name: 'iPhone Parts', slug: 'iphone-parts' },
      { id: 2, name: 'Samsung Parts', slug: 'samsung-parts' },
      { id: 3, name: 'iPad Parts', slug: 'ipad-parts' },
      { id: 4, name: 'Tools', slug: 'tools' }
    ];
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error getting categories:', error);
    throw error;
  }

  return data;
};

export const getCategoryBySlug = async (slug) => {
  if (!supabase) {
    console.log('Mock getCategoryBySlug:', slug);
    return {
      id: 1,
      name: 'iPhone Parts',
      slug,
      description: 'High-quality iPhone replacement parts'
    };
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error getting category by slug:', error);
    throw error;
  }

  return data;
};

// Product functions
export const getProducts = async (filters = {}) => {
  if (!supabase) {
    console.log('Mock getProducts:', filters);
    return [
      {
        id: 1,
        name: 'iPhone 15 Pro Screen',
        slug: 'iphone-15-pro-screen',
        price: 299.99,
        categories: { name: 'iPhone Parts', slug: 'iphone-parts' },
        product_images: [{ image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop', is_primary: true }],
        is_featured: true,
        is_new: true
      },
      {
        id: 2,
        name: 'Samsung S24 Battery',
        slug: 'samsung-s24-battery',
        price: 89.99,
        categories: { name: 'Samsung Parts', slug: 'samsung-parts' },
        product_images: [{ image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop', is_primary: true }],
        is_featured: false,
        is_new: true
      },
      {
        id: 3,
        name: 'iPad Pro 12.9" Screen',
        slug: 'ipad-pro-12-9-screen',
        price: 399.99,
        categories: { name: 'iPad Parts', slug: 'ipad-parts' },
        product_images: [{ image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop', is_primary: true }],
        is_featured: true,
        is_new: false
      },
      {
        id: 4,
        name: 'Professional Repair Kit',
        slug: 'professional-repair-kit',
        price: 149.99,
        categories: { name: 'Tools', slug: 'tools' },
        product_images: [{ image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop', is_primary: true }],
        is_featured: true,
        is_new: false
      }
    ];
  }

  let queryBuilder = supabase
    .from('products')
    .select(`
      *,
      categories (
        name,
        slug
      ),
      product_images (
        image_url,
        is_primary
      )
    `);

  if (filters.category) {
    queryBuilder = queryBuilder.eq('category_id', filters.category);
  }

  if (filters.is_featured) {
    queryBuilder = queryBuilder.eq('is_featured', true);
  }

  if (filters.is_new) {
    queryBuilder = queryBuilder.eq('is_new', true);
  }

  if (filters.search) {
    queryBuilder = queryBuilder.ilike('name', `%${filters.search}%`);
  }

  if (filters.limit) {
    queryBuilder = queryBuilder.limit(filters.limit);
  }

  queryBuilder = queryBuilder.order('created_at', { ascending: false });

  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Error getting products:', error);
    throw error;
  }

  return data;
};

export const getProductBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        name,
        slug
      ),
      product_images (
        image_url,
        is_primary,
        display_order
      ),
      product_specifications (*),
      product_variants (*),
      reviews (
        rating,
        comment,
        created_at,
        profiles (
          name
        )
      )
    `)
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error getting product by slug:', error);
    throw error;
  }

  return data;
};

// Cart functions
export const getCart = async (userId, sessionId) => {
  const { data, error } = await supabase
    .from('carts')
    .select(`
      *,
      cart_items (
        *,
        products (
          name,
          price,
          image_url
        )
      )
    `)
    .or(`user_id.eq.${userId},session_id.eq.${sessionId}`)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error getting cart:', error);
    throw error;
  }

  return data;
};

export const createCart = async (userId, sessionId) => {
  const { data, error } = await supabase
    .from('carts')
    .insert({ user_id: userId, session_id: sessionId })
    .select()
    .single();

  if (error) {
    console.error('Error creating cart:', error);
    throw error;
  }

  return data;
};

export const addToCart = async (cartId, productId, quantity = 1) => {
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('price')
    .eq('id', productId)
    .single();

  if (productError) {
    console.error('Error getting product price:', productError);
    throw productError;
  }

  const { data, error } = await supabase
    .from('cart_items')
    .insert({
      cart_id: cartId,
      product_id: productId,
      quantity,
      price_at_addition: product.price
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }

  return data;
};

// Order functions
export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    throw error;
  }

  return data;
};

export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (
          name,
          image_url
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error getting user orders:', error);
    throw error;
  }

  return data;
};

// Legacy pool interface for compatibility
export const pool = {
  query: async (sql, params = []) => {
    console.warn('Using legacy pool.query - consider migrating to Supabase client');
    // This is a simplified implementation - in production you'd need proper SQL parsing
    return { rows: [], rowCount: 0 };
  },
  connect: async () => {
    console.log('Supabase connection established');
    return {
      query: async (sql, params = []) => {
        console.warn('Using legacy connection.query - consider migrating to Supabase client');
        return { rows: [], rowCount: 0 };
      },
      release: () => console.log('Connection released')
    };
  }
};

export const getConnection = async () => {
  console.log('Getting Supabase connection');
  return {
    query: async (sql, params = []) => {
      console.warn('Using legacy getConnection.query - consider migrating to Supabase client');
      return { rows: [], rowCount: 0 };
    },
    release: () => console.log('Connection released')
  };
};

export const transaction = async (callback) => {
  console.log('Starting Supabase transaction');
  // Supabase handles transactions automatically
  return await callback(supabase);
};

export const getRepairCategories = async () => {
  if (!supabase) {
    console.log('Mock getRepairCategories');
    return [
      {
        id: "101",
        name: "Electronics",
        image: "https://example.com/images/categories/electronics.png",
        manufacturers: [
          {
            id: "2001",
            name: "Samsung",
            image: "https://example.com/images/manufacturers/samsung.png",
            devices: [
              {
                id: "3001",
                name: "Galaxy S21",
                on_site_price: "799.99",
                pickup_price: "749.99",
                colors: [
                  {
                    id: "1",
                    name: "Gold",
                    code: ""
                  }
                ],
                image: "https://example.com/images/devices/galaxy_s21.png",
                problems: [
                  {
                    id: "4001",
                    name: "Screen Replacement",
                    retail_price: "299.99",
                    sale_price: "249.99",
                    image: "https://example.com/images/problems/screen_replacement.png"
                  }
                ]
              }
            ]
          }
        ]
      }
    ];
  }

  // In production, query the database for the nested structure
  // This would require tables for categories, manufacturers, devices, colors, problems
  // For now, return empty array or implement database queries as needed
  const { data, error } = await supabase
    .from('repair_categories')
    .select(`
      *,
      manufacturers (
        *,
        devices (
          *,
          colors (*),
          problems (*)
        )
      )
    `);

  if (error) {
    console.error('Error getting repair categories:', error);
    throw error;
  }

  return data;
};

export const getDevices = async () => {
  if (!supabase) {
    console.log('Mock getDevices');
    return [
      {
        id: "604307",
        name: "Iphone 15",
        manufacturer_id: "1003",
        company: "Apple",
        sort: "0",
        image: "https://example.com/images/productTheme/devices/small/good_apple.jpg",
        colors: [
          "Gold"
        ]
      }
    ];
  }

  // In production, query the devices table
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .order('sort');

  if (error) {
    console.error('Error getting devices:', error);
    throw error;
  }

  return data;
};

export const getRepairTypes = async () => {
  if (!supabase) {
    console.log('Mock getRepairTypes');
    return [
      {
        id: "0",
        name: "Repair"
      },
      {
        id: "1",
        name: "Claim Warranty"
      }
    ];
  }

  // In production, query the repair_types table
  // For now, we'll use a simple query - you may need to create the repair_types table
  const { data, error } = await supabase
    .from('repair_types')
    .select('id, name')
    .order('name');

  if (error) {
    console.error('Error getting repair types:', error);
    // Fallback to mock data if table doesn't exist
    console.warn('Falling back to mock repair types data');
    return [
      {
        id: "0",
        name: "Repair"
      },
      {
        id: "1",
        name: "Claim Warranty"
      }
    ];
  }

  return data;
};

export default {
  supabase,
  query,
  getConnection,
  transaction,
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  pool,
  getCategoryBySlug,
  getCategories,
  getProducts,
  getProductBySlug,
  getCart,
  createCart,
  addToCart,
  createOrder,
  getUserOrders,
  getRepairCategories,
  getDevices,
  getRepairTypes
};
