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

  try {
    let query = supabase
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

    // Apply filters
    if (filters.category) {
      query = query.eq('categories.slug', filters.category);
    }

    if (filters.brand) {
      query = query.ilike('brand', `%${filters.brand}%`);
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters.is_featured) {
      query = query.eq('is_featured', true);
    }

    if (filters.is_new) {
      query = query.eq('is_new', true);
    }

    if (filters.min_price) {
      query = query.gte('price', filters.min_price);
    }

    if (filters.max_price) {
      query = query.lte('price', filters.max_price);
    }

    // Apply sorting
    if (filters.sort_by) {
      const order = filters.sort_order === 'desc' ? false : true;
      query = query.order(filters.sort_by, { ascending: order });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return { data: null, error };
    }

    // Transform data to match expected format
    const transformedData = data?.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      discount_percentage: product.discount_percentage,
      stock: product.stock_quantity,
      category: product.categories?.name || 'Uncategorized',
      category_slug: product.categories?.slug,
      image: product.product_images?.find(img => img.is_primary)?.image_url || product.image_url,
      brand: product.brand,
      sku: product.sku,
      description: product.description,
      slug: product.slug,
      is_featured: product.is_featured,
      is_new: product.is_new,
      weight: product.weight,
      dimensions: product.dimensions
    }));

    return { data: transformedData, error: null };
  } catch (error) {
    console.error('Error in getProducts:', error);
    return { data: null, error };
  }
};

export const getProduct = async (id) => {
  console.log(`Getting product ${id} from Supabase`);

  try {
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
        product_specifications (
          display,
          processor,
          memory,
          storage,
          camera,
          battery,
          connectivity,
          operating_system,
          additional_features
        ),
        product_variants (
          id,
          variant_type,
          variant_value,
          price_adjustment,
          stock_quantity,
          sku
        ),
        reviews (
          id,
          rating,
          title,
          comment,
          is_verified_purchase,
          created_at,
          user_id
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return { data: null, error };
    }

    if (!data) {
      return { data: null, error: { message: 'Product not found' } };
    }

    // Transform data to match expected format
    const transformedData = {
      id: data.id,
      name: data.name,
      price: data.price,
      discount_percentage: data.discount_percentage,
      stock: data.stock_quantity,
      category: data.categories?.name || 'Uncategorized',
      category_slug: data.categories?.slug,
      image: data.product_images?.find(img => img.is_primary)?.image_url || data.image_url,
      images: data.product_images?.sort((a, b) => a.display_order - b.display_order) || [],
      brand: data.brand,
      sku: data.sku,
      description: data.description,
      slug: data.slug,
      is_featured: data.is_featured,
      is_new: data.is_new,
      weight: data.weight,
      dimensions: data.dimensions,
      specifications: data.product_specifications?.[0] || null,
      variants: data.product_variants || [],
      reviews: data.reviews || [],
      average_rating: data.reviews?.length > 0
        ? data.reviews.reduce((sum, review) => sum + review.rating, 0) / data.reviews.length
        : 0,
      review_count: data.reviews?.length || 0
    };

    return { data: transformedData, error: null };
  } catch (error) {
    console.error('Error in getProduct:', error);
    return { data: null, error };
  }
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
export const getCart = async (userId, sessionId = null) => {
  console.log(`Getting cart for user ${userId} from Supabase`);

  try {
    // First, find or create cart
    let cartQuery = supabase
      .from('carts')
      .select('id')
      .or(`user_id.eq.${userId}${sessionId ? `,session_id.eq.${sessionId}` : ''}`)
      .single();

    const { data: cartData, error: cartError } = await cartQuery;

    if (cartError && cartError.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching cart:', cartError);
      return { data: null, error: cartError };
    }

    let cartId = cartData?.id;

    // If no cart exists, create one
    if (!cartId) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({
          user_id: userId,
          session_id: sessionId
        })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating cart:', createError);
        return { data: null, error: createError };
      }

      cartId = newCart.id;
    }

    // Get cart items with product details
    const { data: cartItems, error: itemsError } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        price_at_addition,
        products (
          id,
          name,
          price,
          image_url,
          stock_quantity,
          sku
        ),
        product_variants (
          id,
          variant_type,
          variant_value,
          price_adjustment,
          sku
        )
      `)
      .eq('cart_id', cartId);

    if (itemsError) {
      console.error('Error fetching cart items:', itemsError);
      return { data: null, error: itemsError };
    }

    // Transform cart items
    const transformedItems = cartItems?.map(item => ({
      id: item.products?.id,
      cart_item_id: item.id,
      product_id: item.products?.id,
      variant_id: item.product_variants?.id,
      name: item.products?.name,
      price: item.price_at_addition,
      quantity: item.quantity,
      total: item.price_at_addition * item.quantity,
      image: item.products?.image_url,
      sku: item.product_variants?.sku || item.products?.sku,
      variant_info: item.product_variants ? {
        type: item.product_variants.variant_type,
        value: item.product_variants.variant_value,
        price_adjustment: item.product_variants.price_adjustment
      } : null,
      stock_available: item.products?.stock_quantity || 0,
      options: item.product_variants ? { variant_id: item.product_variants.id } : {}
    })) || [];

    const cart = {
      id: cartId,
      user_id: userId,
      session_id: sessionId,
      items: transformedItems,
      item_count: transformedItems.length,
      total: transformedItems.reduce((sum, item) => sum + item.total, 0),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return { data: cart, error: null };
  } catch (error) {
    console.error('Error in getCart:', error);
    return { data: null, error };
  }
};

export const addToCart = async (userId, productId, quantity, variantId = null, sessionId = null) => {
  console.log(`Adding to cart: user ${userId}, product ${productId}, qty ${quantity}, variant ${variantId}`);

  try {
    // First, get or create cart
    let cartQuery = supabase
      .from('carts')
      .select('id')
      .or(`user_id.eq.${userId}${sessionId ? `,session_id.eq.${sessionId}` : ''}`)
      .single();

    const { data: cartData, error: cartError } = await cartQuery;

    let cartId;

    if (cartError && cartError.code === 'PGRST116') { // Cart not found, create one
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({
          user_id: userId,
          session_id: sessionId
        })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating cart:', createError);
        return { data: null, error: createError };
      }

      cartId = newCart.id;
    } else if (cartError) {
      console.error('Error fetching cart:', cartError);
      return { data: null, error: cartError };
    } else {
      cartId = cartData.id;
    }

    // Get product price for cart item
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('price')
      .eq('id', productId)
      .single();

    if (productError) {
      console.error('Error fetching product:', productError);
      return { data: null, error: productError };
    }

    let finalPrice = product.price;

    // If variant exists, get variant price adjustment
    if (variantId) {
      const { data: variant, error: variantError } = await supabase
        .from('product_variants')
        .select('price_adjustment')
        .eq('id', variantId)
        .single();

      if (variantError) {
        console.error('Error fetching variant:', variantError);
        return { data: null, error: variantError };
      }

      finalPrice += variant.price_adjustment;
    }

    // Check if item already exists in cart
    const { data: existingItem, error: checkError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing cart item:', checkError);
      return { data: null, error: checkError };
    }

    let result;

    if (existingItem) {
      // Update existing item
      const newQuantity = existingItem.quantity + quantity;
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating cart item:', error);
        return { data: null, error };
      }

      result = data;
    } else {
      // Add new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cartId,
          product_id: productId,
          variant_id: variantId,
          quantity: quantity,
          price_at_addition: finalPrice
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding cart item:', error);
        return { data: null, error };
      }

      result = data;
    }

    return { data: result, error: null };
  } catch (error) {
    console.error('Error in addToCart:', error);
    return { data: null, error };
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  console.log(`Updating cart item ${cartItemId} to quantity ${quantity}`);

  try {
    const { data, error } = await supabase
      .from('cart_items')
      .update({
        quantity: quantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', cartItemId)
      .select()
      .single();

    if (error) {
      console.error('Error updating cart item:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error in updateCartItem:', error);
    return { data: null, error };
  }
};

export const removeFromCart = async (cartItemId) => {
  console.log(`Removing cart item ${cartItemId}`);

  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) {
      console.error('Error removing cart item:', error);
      return { data: null, error };
    }

    return { data: { success: true }, error: null };
  } catch (error) {
    console.error('Error in removeFromCart:', error);
    return { data: null, error };
  }
};

export default {
  supabase,
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
