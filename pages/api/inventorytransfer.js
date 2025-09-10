import { getSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import { InventoryTransferModel } from '../../database/models';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Main handler function
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
    statusCode: 405,
    message: 'Method not allowed'
  });
}

// Handle GET requests (fetch inventory transfers)
async function handleGet(req, res) {
  try {
    // Authentication check - support both session/JWT and API key authentication
    const session = await getSession({ req });
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const apiKey = req.query.api_key;

    let isAuthenticated = false;

    // Check session authentication
    if (session?.user?.id) {
      isAuthenticated = true;
    }
    // Check JWT token authentication
    else if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
        isAuthenticated = true;
      } catch (error) {
        // Token invalid
      }
    }
    // Check API key authentication (for testing/development)
    else if (apiKey) {
      const validApiKeys = process.env.VALID_API_KEYS?.split(',') || ['test_api_key'];
      if (validApiKeys.includes(apiKey)) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
        data: {
          name: "Unauthorized",
          message: "Your request was made with invalid credentials.",
          code: 0,
          status: 401
        }
      });
    }

    // Extract query parameters
    const {
      api_key,
      id,
      from_store,
      to_store,
      status,
      from_date,
      to_date,
      page = 1,
      per_page = 50
    } = req.query;

    // Build filters object
    const filters = {};
    if (id) filters.id = id;
    if (from_store) filters.from_store = parseInt(from_store);
    if (to_store) filters.to_store = parseInt(to_store);
    if (status) filters.status = status;
    if (from_date) filters.from_date = from_date;
    if (to_date) filters.to_date = to_date;

    // Validate date formats if provided
    if (from_date && !isValidDate(from_date)) {
      return res.status(400).json({
        error: "Invalid from_date format. Use YYYY-MM-DD"
      });
    }

    if (to_date && !isValidDate(to_date)) {
      return res.status(400).json({
        error: "Invalid to_date format. Use YYYY-MM-DD"
      });
    }

    // Validate pagination parameters
    const pageNum = parseInt(page);
    const perPageNum = parseInt(per_page);

    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({
        error: "Invalid page parameter. Must be a positive integer"
      });
    }

    if (isNaN(perPageNum) || perPageNum < 1 || perPageNum > 100) {
      return res.status(400).json({
        error: "Invalid per_page parameter. Must be between 1 and 100"
      });
    }

    // Get inventory transfers
    const result = await InventoryTransferModel.getAllTransfers(filters, pageNum, perPageNum);

    // Return successful response
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "OK",
      data: {
        inventoryTransferListData: result.transfers,
        pagination: result.pagination
      }
    });

  } catch (error) {
    console.error('Error fetching inventory transfers:', error);

    // Handle specific database errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Database connection error'
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server error'
    });
  }
}

// Handle POST requests (create transfer with stock validation)
async function handlePost(req, res) {
  try {
    // Authentication check
    const session = await getSession({ req });
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const apiKey = req.body.api_key;

    let isAuthenticated = false;
    let userId = null;

    // Check session authentication
    if (session?.user?.id) {
      isAuthenticated = true;
      userId = session.user.id;
    }
    // Check JWT token authentication
    else if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        isAuthenticated = true;
        userId = decoded.userId;
      } catch (error) {
        // Token invalid
      }
    }
    // Check API key authentication
    else if (apiKey) {
      const validApiKeys = process.env.VALID_API_KEYS?.split(',') || ['test_api_key'];
      if (validApiKeys.includes(apiKey)) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized"
      });
    }

    const {
      transfer_id,
      from_store_id,
      to_store_id,
      from_store_name,
      to_store_name,
      type,
      items,
      validate_stock = true
    } = req.body;

    // Validate required fields
    if (!transfer_id || !from_store_id || !to_store_id || !items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Missing required fields: transfer_id, from_store_id, to_store_id, items'
      });
    }

    // Validate stock availability if requested
    if (validate_stock) {
      const insufficientStock = await InventoryTransferModel.validateStockForTransfer(items);

      if (insufficientStock.length > 0) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Insufficient stock for transfer',
          data: {
            insufficientStock
          }
        });
      }
    }

    // Prepare transfer data
    const transferData = {
      transfer_id,
      from_store_id,
      to_store_id,
      from_store_name: from_store_name || `Store ${from_store_id}`,
      to_store_name: to_store_name || `Store ${to_store_id}`,
      type: type || 'Transaction Out',
      created_by: userId || 'System',
      items
    };

    // Create the transfer
    const createdTransfer = await InventoryTransferModel.createTransfer(transferData);

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Transfer created successfully',
      data: {
        transfer: createdTransfer
      }
    });

  } catch (error) {
    console.error('Error creating inventory transfer:', error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to create transfer',
      error: error.message
    });
  }
}

// Handle PUT requests (update transfer status and stock)
async function handlePut(req, res) {
  try {
    // Authentication check
    const session = await getSession({ req });
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const apiKey = req.body.api_key;

    let isAuthenticated = false;

    // Check session authentication
    if (session?.user?.id) {
      isAuthenticated = true;
    }
    // Check JWT token authentication
    else if (token) {
      try {
        jwt.verify(token, JWT_SECRET);
        isAuthenticated = true;
      } catch (error) {
        // Token invalid
      }
    }
    // Check API key authentication
    else if (apiKey) {
      const validApiKeys = process.env.VALID_API_KEYS?.split(',') || ['test_api_key'];
      if (validApiKeys.includes(apiKey)) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized"
      });
    }

    const { transfer_id, action } = req.body;

    // Validate required fields
    if (!transfer_id || !action) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Missing required fields: transfer_id, action'
      });
    }

    // Validate action
    if (!['complete', 'cancel'].includes(action)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid action. Must be "complete" or "cancel"'
      });
    }

    // Update stock and transfer status
    const result = await InventoryTransferModel.updateStockAfterTransfer(transfer_id, action);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: result.message,
      data: result
    });

  } catch (error) {
    console.error('Error updating transfer:', error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to update transfer',
      error: error.message
    });
  }
}

// Helper function to validate date format
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}
