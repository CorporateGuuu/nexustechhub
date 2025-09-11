const axios = require('axios');

// Environment variables for RepairDesk API
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.repairdesk.co/api/web/v1';
const API_KEY = process.env.API_KEY;

// Axios instance for RepairDesk API
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

/**
 * Retry logic with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} retries - Number of retries
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise} Result of the function
 */
async function retryWithBackoff(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && (error.code === 'ECONNABORTED' || error.response?.status >= 500)) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryWithBackoff(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

/**
 * Validate input parameters for purchase order API
 * @param {Object} params - Parameters to validate
 * @returns {Array|null} Array of error messages or null if valid
 */
function validateParams(params) {
  const errors = [];

  const { apiKey, page, pagesize, id, item_name, manufacturer, purchase_order_status, po_order_id, supplier, sku, createdd_date, created_date } = params;

  if (!apiKey) errors.push('Missing api_key');

  if (!page || isNaN(page) || page < 1) errors.push('page must be a positive integer');

  if (!pagesize || isNaN(pagesize) || pagesize < 1) errors.push('pagesize must be a positive integer');

  if (id && isNaN(id)) errors.push('id must be an integer');

  if (manufacturer && isNaN(manufacturer)) errors.push('manufacturer must be an integer');

  if (item_name && typeof item_name !== 'string') errors.push('item_name must be a string');

  if (purchase_order_status && typeof purchase_order_status !== 'string') errors.push('purchase_order_status must be a string');

  if (po_order_id && typeof po_order_id !== 'string') errors.push('po_order_id must be a string');

  if (supplier && typeof supplier !== 'string') errors.push('supplier must be a string');

  if (sku && typeof sku !== 'string') errors.push('sku must be a string');

  if (createdd_date && !/^\d{4}-\d{2}-\d{2}$/.test(createdd_date)) errors.push('createdd_date must be in YYYY-MM-DD format');

  if (created_date && !["today", "7days", "14days", "30days"].includes(created_date) && !/^\d{4}-\d{2}-\d{2}$/.test(created_date)) {
    errors.push('created_date must be "today", "7days", "14days", "30days", or YYYY-MM-DD');
  }

  return errors.length ? errors : null;
}

/**
 * Get purchase orders with pagination and filters from RepairDesk API
 * @param {Object} params - Query parameters
 * @param {string} params.api_key - API key for authentication
 * @param {number} params.page - Page number for pagination
 * @param {number} params.pagesize - Number of items per page
 * @param {Object} params.filters - Optional filters
 * @returns {Promise<Object>} Purchase orders data with pagination
 */
async function getPurchaseOrders({ api_key, page, pagesize, filters = {} }) {
  try {
    // Validate parameters
    const validationErrors = validateParams({ apiKey: api_key, page, pagesize, ...filters });
    if (validationErrors) {
      throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
    }

    // Prepare query parameters for API request
    const queryParams = new URLSearchParams({
      api_key: api_key,
      page: page.toString(),
      pagesize: pagesize.toString()
    });

    // Add filters to query parameters
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    // Make API request to RepairDesk with retry logic
    const response = await retryWithBackoff(async () => {
      return await axiosInstance.get(`/inventory/list?${queryParams.toString()}`);
    });

    // Handle successful response
    if (response.data.success) {
      return {
        purchaseOrderListData: response.data.data.purchaseOrderListData || [],
        pagination: response.data.data.pagination || {
          page,
          total_pages: 1,
          total_records: response.data.data.purchaseOrderListData?.length || 0
        }
      };
    } else {
      throw new Error(response.data.message || 'API request failed');
    }
  } catch (error) {
    console.error('Error fetching purchase orders from RepairDesk API:', error.message);

    // Log error to Sentry if available
    try {
      const Sentry = require('@sentry/nextjs');
      Sentry.captureException(error, {
        extra: {
          api_key: api_key ? '***' : undefined, // Don't log actual API key
          page,
          pagesize,
          filters
        }
      });
    } catch (sentryError) {
      // Sentry not available, continue
    }

    // Handle specific API errors
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error('Invalid request parameters');
      } else if (error.response.status === 401) {
        throw new Error('Invalid API key');
      } else if (error.response.status === 500) {
        throw new Error('RepairDesk API server error');
      }
    }

    throw error;
  }
}

/**
 * Validate API key (placeholder - implement actual validation logic)
 * @param {string} apiKey - The API key to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateApiKey(apiKey) {
  // TODO: Implement actual API key validation
  // For now, accept any non-empty key (similar to existing endpoints)
  return apiKey && apiKey.length > 0;
}

/**
 * Mock data for development/testing when database is not available
 */
function getMockPurchaseOrders({ page, pagesize, filters = {} }) {
  const mockData = [
    {
      id: 1,
      item_name: 'iPhone 15 Pro Screen',
      manufacturer: 'Apple',
      purchase_order_status: 'pending',
      po_order_id: 'PO-2024-001',
      supplier: 'TechParts Inc.',
      sku: 'IPH15P-SCR-001',
      created_date: '2024-01-15T10:00:00Z',
      createdd_date: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      item_name: 'Samsung S24 Battery',
      manufacturer: 'Samsung',
      purchase_order_status: 'approved',
      po_order_id: 'PO-2024-002',
      supplier: 'MobileParts Ltd.',
      sku: 'SAM-S24-BAT-001',
      created_date: '2024-01-16T14:30:00Z',
      createdd_date: '2024-01-16T14:30:00Z'
    },
    {
      id: 3,
      item_name: 'iPad Pro 12.9" Display',
      manufacturer: 'Apple',
      purchase_order_status: 'shipped',
      po_order_id: 'PO-2024-003',
      supplier: 'DisplayTech Corp.',
      sku: 'IPAD12-DISP-001',
      created_date: '2024-01-17T09:15:00Z',
      createdd_date: '2024-01-17T09:15:00Z'
    }
  ];

  // Apply filters
  let filteredData = mockData;

  if (filters.id) {
    filteredData = filteredData.filter(item => item.id === parseInt(filters.id));
  }

  if (filters.item_name) {
    filteredData = filteredData.filter(item =>
      item.item_name.toLowerCase().includes(filters.item_name.toLowerCase())
    );
  }

  if (filters.manufacturer) {
    filteredData = filteredData.filter(item =>
      item.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase())
    );
  }

  if (filters.purchase_order_status) {
    filteredData = filteredData.filter(item =>
      item.purchase_order_status === filters.purchase_order_status
    );
  }

  if (filters.po_order_id) {
    filteredData = filteredData.filter(item => item.po_order_id === filters.po_order_id);
  }

  if (filters.supplier) {
    filteredData = filteredData.filter(item =>
      item.supplier.toLowerCase().includes(filters.supplier.toLowerCase())
    );
  }

  if (filters.sku) {
    filteredData = filteredData.filter(item =>
      item.sku.toLowerCase().includes(filters.sku.toLowerCase())
    );
  }

  // Pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pagesize);
  const startIndex = (page - 1) * pagesize;
  const endIndex = startIndex + pagesize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    purchaseOrderListData: paginatedData,
    pagination: {
      currentPage: page,
      pageSize: pagesize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
}

module.exports = {
  getPurchaseOrders,
  validateApiKey,
  getMockPurchaseOrders,
  validateParams
};
