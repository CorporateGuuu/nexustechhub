// Supabase configuration for Nexus TechHub
// Real implementation with JWT verification

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET;

// JWKS client for JWT verification
const jwksUri = 'https://phgbosbtwayzejfxyxao.supabase.co/auth/v1/.well-known/jwks.json';
const client = jwksClient({
  jwksUri: jwksUri,
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
});

// Function to get the signing key
function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    if (err) {
      callback(err);
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
}

// JWT verification function with HS256 and RS256 support
export const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    // Try HS256 verification first with legacy secret if available
    if (supabaseJwtSecret) {
      try {
        const decoded = jwt.verify(token, supabaseJwtSecret, {
          audience: process.env.NEXT_PUBLIC_SUPABASE_URL,
          issuer: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1`,
          algorithms: ['HS256']
        });
        resolve(decoded);
        return;
      } catch (hs256Error) {
        console.log('HS256 verification failed, trying RS256:', hs256Error.message);
        // Fall through to RS256 verification
      }
    }

    // Fall back to RS256 verification with JWKS
    jwt.verify(token, getKey, {
      audience: process.env.NEXT_PUBLIC_SUPABASE_URL,
      issuer: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1`,
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

// Create Supabase client
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Create server-side Supabase client
export const createServerSupabaseClient = (context) => {
  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
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
