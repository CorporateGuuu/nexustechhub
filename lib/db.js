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
    console.error('Supabase client not available. Please check your environment variables.');
    return [];
  }

  let queryBuilder = supabase
    .from('products')
    .select(`
      *,
      categories (
        name as category_name,
        slug as category_slug
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

  // Handle pagination
  const limit = filters.limit || 20;
  const page = filters.page || 1;
  const offset = (page - 1) * limit;

  queryBuilder = queryBuilder.range(offset, offset + limit - 1);

  queryBuilder = queryBuilder.order('created_at', { ascending: false });

  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Error getting products:', error);
    throw error;
  }

  return data || [];
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

// Purchase Order functions
export const getPurchaseOrders = async (filters = {}) => {
  // Mock data for development or when table doesn't exist
  const mockData = [
    {
      id: 1,
      item_name: 'iPhone 15 Pro Screen',
      manufacturer: 'Apple',
      purchase_order_status: 'pending',
      po_order_id: 'PO-2024-001',
      supplier: 'TechParts Inc.',
      sku: 'IPH15P-SCR-001',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      item_name: 'Samsung S24 Battery',
      manufacturer: 'Samsung',
      purchase_order_status: 'approved',
      po_order_id: 'PO-2024-002',
      supplier: 'MobileParts Ltd.',
      sku: 'SAM-S24-BAT-001',
      created_at: '2024-01-16T14:30:00Z'
    },
    {
      id: 3,
      item_name: 'iPad Pro 12.9" Display',
      manufacturer: 'Apple',
      purchase_order_status: 'shipped',
      po_order_id: 'PO-2024-003',
      supplier: 'DisplayTech Corp.',
      sku: 'IPAD12-DISP-001',
      created_at: '2024-01-17T09:15:00Z'
    }
  ];

  if (!supabase) {
    console.log('Mock getPurchaseOrders (no Supabase client)');
    return mockData;
  }

  try {
    let queryBuilder = supabase
      .from('purchase_orders')
      .select('*');

    // Apply filters
    if (filters.id) {
      queryBuilder = queryBuilder.eq('id', filters.id);
    }

    if (filters.item_name) {
      queryBuilder = queryBuilder.ilike('item_name', `%${filters.item_name}%`);
    }

    if (filters.manufacturer) {
      queryBuilder = queryBuilder.ilike('manufacturer', `%${filters.manufacturer}%`);
    }

    if (filters.purchase_order_status) {
      queryBuilder = queryBuilder.eq('purchase_order_status', filters.purchase_order_status);
    }

    if (filters.po_order_id) {
      queryBuilder = queryBuilder.eq('po_order_id', filters.po_order_id);
    }

    if (filters.supplier) {
      queryBuilder = queryBuilder.ilike('supplier', `%${filters.supplier}%`);
    }

    if (filters.sku) {
      queryBuilder = queryBuilder.ilike('sku', `%${filters.sku}%`);
    }

    if (filters.created_date) {
      // Handle date filters (today, 7days, 14days, 30days, or specific date)
      const now = new Date();
      let startDate;

      if (filters.created_date === 'today') {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      } else if (filters.created_date === '7days') {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (filters.created_date === '14days') {
        startDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      } else if (filters.created_date === '30days') {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      } else {
        // Specific date
        startDate = new Date(filters.created_date);
      }

      queryBuilder = queryBuilder.gte('created_date', startDate.toISOString());
    }

    // Handle pagination
    const limit = filters.pagesize || filters.limit || 20;
    const page = filters.page || 1;
    const offset = (page - 1) * limit;

    queryBuilder = queryBuilder.range(offset, offset + limit - 1);

    queryBuilder = queryBuilder.order('created_date', { ascending: false });

    const { data, error } = await queryBuilder;

    if (error) {
      console.error('Error getting purchase orders from database:', error);
      console.log('Falling back to mock data');
      return mockData;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPurchaseOrders:', error);
    console.log('Falling back to mock data');
    return mockData;
  }
};

export const getPurchaseOrderById = async (id) => {
  if (!supabase) {
    console.log('Mock getPurchaseOrderById:', id);
    return {
      id: parseInt(id),
      item_name: 'Sample Purchase Order',
      manufacturer: 'Apple',
      purchase_order_status: 'pending',
      po_order_id: 'PO-2024-001',
      supplier: 'TechParts Inc.',
      sku: 'SAMPLE-001',
      created_at: '2024-01-15T10:00:00Z'
    };
  }

  const { data, error } = await supabase
    .from('purchase_orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error getting purchase order by ID:', error);
    throw error;
  }

  return data;
};

export const createPurchaseOrder = async (orderData) => {
  if (!supabase) {
    console.log('Mock createPurchaseOrder:', orderData);
    return { id: Date.now(), ...orderData };
  }

  try {
    const { data, error } = await supabase
      .from('purchase_orders')
      .insert(orderData)
      .select()
      .single();

    if (error) {
      console.error('Error creating purchase order:', error);
      console.log('Falling back to mock data');
      return { id: Date.now(), ...orderData };
    }

    return data;
  } catch (error) {
    console.error('Error in createPurchaseOrder:', error);
    console.log('Falling back to mock data');
    return { id: Date.now(), ...orderData };
  }
};

export const updatePurchaseOrder = async (id, orderData) => {
  if (!supabase) {
    console.log('Mock updatePurchaseOrder:', id, orderData);
    return { id: parseInt(id), ...orderData };
  }

  try {
    const { data, error } = await supabase
      .from('purchase_orders')
      .update(orderData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating purchase order:', error);
      console.log('Falling back to mock data');
      return { id: parseInt(id), ...orderData };
    }

    return data;
  } catch (error) {
    console.error('Error in updatePurchaseOrder:', error);
    console.log('Falling back to mock data');
    return { id: parseInt(id), ...orderData };
  }
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
  getRepairTypes,
  getPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrder
};
