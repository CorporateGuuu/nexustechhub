import { getPurchaseOrders, createPurchaseOrder, updatePurchaseOrder, supabase } from '../../lib/db';

export default async function handler(req, res) {
  if (!['GET', 'POST', 'PUT'].includes(req.method)) {
    return res.status(405).json({
      success: false,
      statusCode: 405,
      message: 'Method not allowed',
      data: {
        name: 'MethodNotAllowed',
        message: 'Only GET, POST, and PUT requests are allowed for this endpoint',
        code: 0,
        status: 405
      }
    });
  }

  if (req.method === 'POST') {
    return await handleCreatePurchaseOrder(req, res);
  }

  if (req.method === 'PUT') {
    return await handleUpdatePurchaseOrder(req, res);
  }

  // GET method
  return await handleGetPurchaseOrders(req, res);
}

async function handleGetPurchaseOrders(req, res) {
  try {
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
      created_date
    } = req.query;

    // Parse and validate parameters
    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(pagesize) || 20;

    if (pageNum < 1) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Bad Request',
        data: {
          name: 'BadRequest',
          message: 'Page must be a positive integer',
          code: 0,
          status: 400
        }
      });
    }

    if (pageSize < 1 || pageSize > 100) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Bad Request',
        data: {
          name: 'BadRequest',
          message: 'Page size must be between 1 and 100',
          code: 0,
          status: 400
        }
      });
    }

    // Prepare filters object
    const filters = {
      page: pageNum,
      pagesize: pageSize
    };

    // Add optional filters
    if (id) filters.id = parseInt(id);
    if (item_name) filters.item_name = item_name;
    if (manufacturer) filters.manufacturer = manufacturer;
    if (purchase_order_status) filters.purchase_order_status = purchase_order_status;
    if (po_order_id) filters.po_order_id = po_order_id;
    if (supplier) filters.supplier = supplier;
    if (sku) filters.sku = sku;
    if (created_date) filters.created_date = created_date;

    // Get purchase orders from database
    const purchaseOrders = await getPurchaseOrders(filters);

    // Get total count for pagination
    let total = 0;
    if (!supabase) {
      // Mock mode
      total = purchaseOrders.length;
    } else {
      try {
        let countQuery = supabase
          .from('purchase_orders')
          .select('id', { count: 'exact', head: true });

        // Apply same filters for count
        if (filters.id) countQuery = countQuery.eq('id', filters.id);
        if (filters.item_name) countQuery = countQuery.ilike('item_name', `%${filters.item_name}%`);
        if (filters.manufacturer) countQuery = countQuery.ilike('manufacturer', `%${filters.manufacturer}%`);
        if (filters.purchase_order_status) countQuery = countQuery.eq('purchase_order_status', filters.purchase_order_status);
        if (filters.po_order_id) countQuery = countQuery.eq('po_order_id', filters.po_order_id);
        if (filters.supplier) countQuery = countQuery.ilike('supplier', `%${filters.supplier}%`);
        if (filters.sku) countQuery = countQuery.ilike('sku', `%${filters.sku}%`);

        if (filters.created_date) {
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
            startDate = new Date(filters.created_date);
          }

          countQuery = countQuery.gte('created_date', startDate.toISOString());
        }

        const { count, error } = await countQuery;

        if (error) {
          console.error('Error getting purchase order count:', error);
          total = purchaseOrders.length;
        } else {
          total = count || 0;
        }
      } catch (error) {
        console.error('Error getting purchase order count:', error);
        total = purchaseOrders.length;
      }
    }

    const totalPages = Math.ceil(total / pageSize) || 1;

    // Return successful response
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'OK',
      purchaseOrderListData: purchaseOrders,
      pagination: {
        currentPage: pageNum,
        pageSize: pageSize,
        totalItems: total,
        totalPages: totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
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

async function handleCreatePurchaseOrder(req, res) {
  try {
    const {
      item_name,
      manufacturer,
      purchase_order_status,
      po_order_id,
      supplier,
      sku
    } = req.body;

    // Validate required fields
    if (!item_name || !manufacturer || !supplier) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Bad Request',
        data: {
          name: 'BadRequest',
          message: 'item_name, manufacturer, and supplier are required fields',
          code: 0,
          status: 400
        }
      });
    }

    // Prepare purchase order data
    const orderData = {
      item_name,
      manufacturer,
      purchase_order_status: purchase_order_status || 'pending',
      po_order_id,
      supplier,
      sku,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Create purchase order
    const newPurchaseOrder = await createPurchaseOrder(orderData);

    // Return successful response
    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Purchase order created successfully',
      data: newPurchaseOrder
    });
  } catch (error) {
    console.error('Error creating purchase order:', error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      data: {
        name: 'InternalServerError',
        message: 'An unexpected error occurred while creating the purchase order',
        code: 0,
        status: 500
      }
    });
  }
}

async function handleUpdatePurchaseOrder(req, res) {
  try {
    const { id } = req.query;
    const {
      item_name,
      manufacturer,
      purchase_order_status,
      po_order_id,
      supplier,
      sku
    } = req.body;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Bad Request',
        data: {
          name: 'BadRequest',
          message: 'Valid purchase order ID is required',
          code: 0,
          status: 400
        }
      });
    }

    // Prepare update data
    const updateData = {
      updated_at: new Date().toISOString()
    };

    if (item_name !== undefined) updateData.item_name = item_name;
    if (manufacturer !== undefined) updateData.manufacturer = manufacturer;
    if (purchase_order_status !== undefined) updateData.purchase_order_status = purchase_order_status;
    if (po_order_id !== undefined) updateData.po_order_id = po_order_id;
    if (supplier !== undefined) updateData.supplier = supplier;
    if (sku !== undefined) updateData.sku = sku;

    // Update purchase order
    const updatedPurchaseOrder = await updatePurchaseOrder(parseInt(id), updateData);

    if (!updatedPurchaseOrder) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Not Found',
        data: {
          name: 'NotFound',
          message: 'Purchase order not found',
          code: 0,
          status: 404
        }
      });
    }

    // Return successful response
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Purchase order updated successfully',
      data: updatedPurchaseOrder
    });
  } catch (error) {
    console.error('Error updating purchase order:', error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      data: {
        name: 'InternalServerError',
        message: 'An unexpected error occurred while updating the purchase order',
        code: 0,
        status: 500
      }
    });
  }
}
