const { getInvoiceDueAmount, validateApiKey } = require('../../../../utils/invoiceUtils');

export default async function handler(req, res) {
  // Only allow GET requests
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
    // Extract parameters
    const { invoiceId } = req.query;
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

    // Validate invoice ID
    if (!invoiceId || isNaN(parseInt(invoiceId))) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Bad Request',
        data: {
          name: 'BadRequest',
          message: 'Invalid invoice ID provided',
          code: 0,
          status: 400
        }
      });
    }

    // Get invoice due amount
    const invoiceData = await getInvoiceDueAmount(parseInt(invoiceId));

    if (!invoiceData) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Not Found',
        data: {
          name: 'NotFound',
          message: 'Invoice not found',
          code: 0,
          status: 404
        }
      });
    }

    // Return successful response
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'OK',
      data: {
        invoice_id: invoiceData.id,
        amount_due: invoiceData.amount_due,
        is_paid: invoiceData.is_paid,
        total_amount: invoiceData.total_amount,
        created_at: invoiceData.created_at,
        updated_at: invoiceData.updated_at
      }
    });

  } catch (error) {
    console.error('Error in invoice due amount endpoint:', error);
    res.status(500).json({
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
