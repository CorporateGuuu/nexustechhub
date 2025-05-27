// Supabase configuration for Nexus TechHub
// Mock implementation for demo purposes

export const supabase = {
  auth: {
    signUp: async (credentials) => {
      console.log('Supabase signUp:', credentials);
      return {
        data: { user: { id: 'mock-user-id', email: credentials.email } },
        error: null
      };
    },
    signInWithPassword: async (credentials) => {
      console.log('Supabase signIn:', credentials);
      return {
        data: { user: { id: 'mock-user-id', email: credentials.email } },
        error: null
      };
    },
    signOut: async () => {
      console.log('Supabase signOut');
      return { error: null };
    },
    getUser: async () => {
      console.log('Supabase getUser');
      return {
        data: { user: { id: 'mock-user-id', email: 'demo@example.com' } },
        error: null
      };
    }
  },
  from: (table) => ({
    select: (columns = '*') => ({
      eq: (column, value) => ({
        data: [],
        error: null
      }),
      order: (column, options) => ({
        data: [],
        error: null
      }),
      limit: (count) => ({
        data: [],
        error: null
      }),
      data: [],
      error: null
    }),
    insert: (data) => ({
      data: Array.isArray(data) ? data : [data],
      error: null
    }),
    update: (data) => ({
      eq: (column, value) => ({
        data: [data],
        error: null
      })
    }),
    delete: () => ({
      eq: (column, value) => ({
        data: [],
        error: null
      })
    })
  })
};

export const createClient = (url, key) => {
  console.log('Creating Supabase client');
  return supabase;
};

// Additional Supabase functions
export const createServerSupabaseClient = (req, res) => {
  console.log('Creating server Supabase client');
  return supabase;
};

// Product functions
export const getProducts = async (filters = {}) => {
  console.log('Getting products from Supabase:', filters);
  
  return {
    data: [
      {
        id: 1,
        name: 'iPhone 15 Pro Screen Assembly',
        price: 299.99,
        stock: 25,
        category: 'iPhone Parts',
        image: '/images/products/iphone-15-pro-screen.jpg'
      },
      {
        id: 2,
        name: 'Samsung Galaxy S24 Battery',
        price: 89.99,
        stock: 50,
        category: 'Samsung Parts',
        image: '/images/products/samsung-s24-battery.jpg'
      }
    ],
    error: null
  };
};

export const getProduct = async (id) => {
  console.log(`Getting product ${id} from Supabase`);
  
  return {
    data: {
      id,
      name: 'iPhone 15 Pro Screen Assembly',
      price: 299.99,
      stock: 25,
      category: 'iPhone Parts',
      description: 'High-quality OLED screen assembly for iPhone 15 Pro',
      image: '/images/products/iphone-15-pro-screen.jpg'
    },
    error: null
  };
};

export const createProduct = async (productData) => {
  console.log('Creating product in Supabase:', productData);
  
  return {
    data: {
      id: Date.now(),
      ...productData,
      created_at: new Date().toISOString()
    },
    error: null
  };
};

export const updateProduct = async (id, updates) => {
  console.log(`Updating product ${id} in Supabase:`, updates);
  
  return {
    data: {
      id,
      ...updates,
      updated_at: new Date().toISOString()
    },
    error: null
  };
};

// Cart functions
export const getCart = async (userId) => {
  console.log(`Getting cart for user ${userId} from Supabase`);
  
  return {
    data: [],
    error: null
  };
};

export const addToCart = async (userId, productId, quantity) => {
  console.log(`Adding to cart: user ${userId}, product ${productId}, qty ${quantity}`);
  
  return {
    data: {
      id: Date.now(),
      user_id: userId,
      product_id: productId,
      quantity,
      created_at: new Date().toISOString()
    },
    error: null
  };
};

export const updateCartItem = async (cartItemId, quantity) => {
  console.log(`Updating cart item ${cartItemId} to quantity ${quantity}`);
  
  return {
    data: {
      id: cartItemId,
      quantity,
      updated_at: new Date().toISOString()
    },
    error: null
  };
};

export const removeFromCart = async (cartItemId) => {
  console.log(`Removing cart item ${cartItemId}`);
  
  return {
    data: null,
    error: null
  };
};

export default {
  supabase,
  createClient,
  createServerSupabaseClient,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
};
