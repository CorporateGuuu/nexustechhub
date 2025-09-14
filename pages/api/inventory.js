import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import { ProductModel } from '../../database/models';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  if (req.method === 'POST') {
    return handlePost(req, res);
  }

  if (req.method === 'PUT') {
    return handlePut(req, res);
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}

// Handle GET requests (list inventory items)
async function handleGet(req, res) {
  try {
    // Check authentication
    const session = await getSession({ req });
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    let isAuthenticated = false;

    if (session?.user?.id) {
      isAuthenticated = true;
    } else if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
        isAuthenticated = true;
      } catch (error) {
        // Token invalid
      }
    }

    if (!isAuthenticated) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
        message: "Authentication required"
      });
    }

    // Extract query parameters
    const {
      page = 1,
      limit = 20,
      category_id,
      search
    } = req.query;

    let products;

    if (search) {
      products = await ProductModel.searchProducts(search, parseInt(page), parseInt(limit));
    } else if (category_id) {
      products = await ProductModel.getProductsByCategory(parseInt(category_id), parseInt(page), parseInt(limit));
    } else {
      products = await ProductModel.getAllProducts(parseInt(page), parseInt(limit));
    }

    return res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}

// Handle POST requests (add new inventory item)
async function handlePost(req, res) {
  try {
    // Check authentication
    const session = await getSession({ req });
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    let isAuthenticated = false;
    let userId = null;

    if (session?.user?.id) {
      isAuthenticated = true;
      userId = session.user.id;
    } else if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        isAuthenticated = true;
        userId = decoded.userId;
      } catch (error) {
        // Token invalid
      }
    }

    if (!isAuthenticated) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
        message: "Authentication required"
      });
    }

    const {
      name,
      sku,
      description,
      price,
      stock_quantity,
      category_id,
      brand,
      image_url,
      weight,
      dimensions,
      specifications,
      images,
      variants
    } = req.body;

    // Validate required fields
    if (!name || !sku || !price || !category_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, sku, price, category_id'
      });
    }

    // Prepare product data
    const productData = {
      name,
      sku,
      description: description || '',
      price: parseFloat(price),
      stock_quantity: parseInt(stock_quantity) || 0,
      category_id: parseInt(category_id),
      brand: brand || null,
      image_url: image_url || null,
      weight: weight || null,
      dimensions: dimensions || null,
      specifications,
      images,
      variants
    };

    // Create the product
    const createdProduct = await ProductModel.createProduct(productData);

    return res.status(201).json({
      success: true,
      message: 'Inventory item added successfully',
      data: createdProduct
    });
  } catch (error) {
    console.error('Error adding inventory item:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add inventory item',
      error: error.message
    });
  }
}

// Handle PUT requests (edit inventory item)
async function handlePut(req, res) {
  try {
    // Check authentication
    const session = await getSession({ req });
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    let isAuthenticated = false;

    if (session?.user?.id) {
      isAuthenticated = true;
    } else if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
        isAuthenticated = true;
      } catch (error) {
        // Token invalid
      }
    }

    if (!isAuthenticated) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
        message: "Authentication required"
      });
    }

    const { id } = req.query;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Missing product ID'
      });
    }

    // Convert numeric fields
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.stock_quantity) updateData.stock_quantity = parseInt(updateData.stock_quantity);
    if (updateData.category_id) updateData.category_id = parseInt(updateData.category_id);

    // Update the product
    const updatedProduct = await ProductModel.updateProduct(parseInt(id), updateData);

    return res.status(200).json({
      success: true,
      message: 'Inventory item updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update inventory item',
      error: error.message
    });
  }
}
