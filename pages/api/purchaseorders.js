const { getPurchaseOrders, validateApiKey, getMockPurchaseOrders, validateParams } = require('../../utils/purchaseOrderUtils.js');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      statusCode: 405,
      message: 'Method not allowed',
      data: {
        name: 'MethodNotAllowed',
        message: 'Only GET requests are allowed for this endpoint',
        code: 0,
        status: 405
      }
    });
  }

  try {
    // Extract API key from header or query
    const apiKey = req.headers['x-api-key'] || req.query.api_key;

    // Validate API key
    if (!apiKey || !validateApiKey(apiKey)) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Unauthorized',
        data: {
          name: 'Unauthorized',
          message: 'Your request was made with invalid or missing API key.',
          code: 0,
          status: 401
        }
      });
    }

    const {
      page,
      pagesize,
      id,
      item_name,
      manufacturer,
      purchase_order_status,
      po_order_id,
      supplier,
      sku,
      createdd_date,
      created_date
    } = req.query;

    // Validate required parameters using validateParams
    const validationErrors = validateParams({
      apiKey,
      page: parseInt(page),
      pagesize: parseInt(pagesize),
      id,
      item_name,
      manufacturer,
      purchase_order_status,
      po_order_id,
      supplier,
      sku,
      createdd_date,
      created_date
    });

    if (validationErrors) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Bad Request',
        data: {
          name: 'BadRequest',
          message: `Validation failed: ${validationErrors.join(', ')}`,
          code: 0,
          status: 400
        }
      });
    }

    // Prepare filters object
    const filters = {
      id,
      item_name,
      manufacturer,
      purchase_order_status,
      po_order_id,
      supplier,
      sku,
      createdd_date,
      created_date
    };

    // Remove undefined or empty filters
    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined || filters[key] === '') {
        delete filters[key];
      }
    });

    // Call the utility function to get purchase orders
    let data;
    try {
      data = await getPurchaseOrders({
        api_key: apiKey,
        page: parseInt(page),
        pagesize: parseInt(pagesize),
        filters
      });
    } catch (error) {
      if (error.message.includes('Invalid API key') || error.message.includes('Unauthorized')) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: 'Unauthorized',
          data: {
            name: 'Unauthorized',
            message: 'Your request was made with invalid or missing API key.',
            code: 0,
            status: 401
          }
        });
      } else if (error.message.includes('Invalid request parameters') || error.message.includes('Validation failed')) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Bad Request',
          data: {
            name: 'BadRequest',
            message: error.message,
            code: 0,
            status: 400
          }
        });
      } else if (error.message.includes('RepairDesk API server error')) {
        return res.status(502).json({
          success: false,
          statusCode: 502,
          message: 'Bad Gateway',
          data: {
            name: 'BadGateway',
            message: 'RepairDesk API is currently unavailable.',
            code: 0,
            status: 502
          }
        });
      }
      throw error;
    }

    // Return successful response
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'OK',
      purchaseOrderListData: data.purchaseOrderListData,
      pagination: data.pagination
    });
  } catch (error) {
    console.error('Error in purchase orders endpoint:', error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      data: {
        name: 'InternalServerError',
        message: 'An unexpected error occurred while processing your request',
        code: 0,
        status: 500
      }
    });
  }
}
