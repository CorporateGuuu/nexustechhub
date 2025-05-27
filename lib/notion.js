// Notion Integration for Nexus TechHub
// Mock implementation for demo purposes

export const getNotionContent = async (databaseId) => {
  console.log(`Getting Notion content from database ${databaseId}`);

  // Mock Notion content
  return {
    success: true,
    pages: [
      {
        id: 'page_1',
        title: 'iPhone Repair Guide',
        content: 'Complete guide for iPhone screen replacement and battery replacement.',
        category: 'Repair Guides',
        published: true,
        created_time: '2024-01-15T10:00:00.000Z',
        last_edited_time: '2024-01-20T15:30:00.000Z'
      },
      {
        id: 'page_2',
        title: 'Samsung Parts Catalog',
        content: 'Comprehensive catalog of Samsung Galaxy parts and accessories.',
        category: 'Product Catalogs',
        published: true,
        created_time: '2024-01-10T09:00:00.000Z',
        last_edited_time: '2024-01-18T14:20:00.000Z'
      },
      {
        id: 'page_3',
        title: 'Quality Standards',
        content: 'Our quality standards and testing procedures for all products.',
        category: 'Policies',
        published: true,
        created_time: '2024-01-05T11:00:00.000Z',
        last_edited_time: '2024-01-12T16:45:00.000Z'
      }
    ]
  };
};

export const createNotionPage = async (databaseId, properties) => {
  console.log(`Creating Notion page in database ${databaseId}`, properties);

  return {
    success: true,
    page: {
      id: `page_${Date.now()}`,
      ...properties,
      created_time: new Date().toISOString(),
      last_edited_time: new Date().toISOString()
    }
  };
};

export const updateNotionPage = async (pageId, properties) => {
  console.log(`Updating Notion page ${pageId}`, properties);

  return {
    success: true,
    page: {
      id: pageId,
      ...properties,
      last_edited_time: new Date().toISOString()
    }
  };
};

export const syncOrderToNotion = async (order) => {
  console.log(`Syncing order to Notion:`, order);

  return {
    success: true,
    notionPageId: `order_${order.id}_${Date.now()}`,
    synced_at: new Date().toISOString()
  };
};

export const syncProductToNotion = async (product) => {
  console.log(`Syncing product to Notion:`, product);

  return {
    success: true,
    notionPageId: `product_${product.id}_${Date.now()}`,
    synced_at: new Date().toISOString()
  };
};

export const getNotionDatabase = async (databaseId) => {
  console.log(`Getting Notion database ${databaseId}`);

  return {
    success: true,
    database: {
      id: databaseId,
      title: 'Nexus TechHub Database',
      properties: {
        Name: { type: 'title' },
        Category: { type: 'select' },
        Status: { type: 'select' },
        'Created Date': { type: 'created_time' },
        'Last Edited': { type: 'last_edited_time' }
      }
    }
  };
};

// Additional Notion functions
export const getContentPage = async (pageId) => {
  console.log(`Getting Notion content page ${pageId}`);

  return {
    success: true,
    page: {
      id: pageId,
      title: 'Sample Content Page',
      content: 'This is sample content from Notion.',
      created_time: '2024-01-15T10:00:00.000Z',
      last_edited_time: '2024-01-20T15:30:00.000Z'
    }
  };
};

export const getContentPages = async (databaseId, filters = {}) => {
  console.log(`Getting Notion content pages from database ${databaseId}`, filters);

  return {
    success: true,
    pages: [
      {
        id: 'page_1',
        title: 'iPhone Repair Guide',
        content: 'Complete guide for iPhone repairs',
        category: 'Repair Guides'
      },
      {
        id: 'page_2',
        title: 'Samsung Parts Catalog',
        content: 'Samsung Galaxy parts catalog',
        category: 'Product Catalogs'
      }
    ]
  };
};

export const createOrder = async (orderData) => {
  console.log('Creating order in Notion:', orderData);

  return {
    success: true,
    order: {
      id: `notion_order_${Date.now()}`,
      ...orderData,
      created_at: new Date().toISOString()
    }
  };
};

export const upsertCustomer = async (customerData) => {
  console.log('Upserting customer in Notion:', customerData);

  return {
    success: true,
    customer: {
      id: `notion_customer_${Date.now()}`,
      ...customerData,
      updated_at: new Date().toISOString()
    }
  };
};

export const getProduct = async (productId) => {
  console.log(`Getting product ${productId} from Notion`);

  return {
    success: true,
    product: {
      id: productId,
      name: 'iPhone 15 Pro Screen',
      price: 299.99,
      category: 'iPhone Parts',
      description: 'High-quality OLED screen'
    }
  };
};

export const getProducts = async (filters = {}) => {
  console.log('Getting products from Notion:', filters);

  // Mock products data
  const mockProducts = [
    {
      id: 'notion_product_1',
      name: 'iPhone 15 Pro Screen Assembly',
      price: 299.99,
      category: 'iPhone Parts',
      description: 'High-quality OLED screen assembly for iPhone 15 Pro',
      stock: 25,
      sku: 'IP15P-SCR-001',
      created_at: '2024-01-15T10:00:00.000Z'
    },
    {
      id: 'notion_product_2',
      name: 'Samsung Galaxy S24 Battery',
      price: 89.99,
      category: 'Samsung Parts',
      description: 'Original capacity battery for Samsung Galaxy S24',
      stock: 40,
      sku: 'SGS24-BAT-001',
      created_at: '2024-01-10T09:00:00.000Z'
    },
    {
      id: 'notion_product_3',
      name: 'Professional Repair Tool Kit',
      price: 149.99,
      category: 'Tools',
      description: 'Complete tool kit for mobile device repairs',
      stock: 15,
      sku: 'TOOL-KIT-001',
      created_at: '2024-01-05T11:00:00.000Z'
    }
  ];

  return {
    success: true,
    products: mockProducts,
    total: mockProducts.length
  };
};

export const createProduct = async (productData) => {
  console.log('Creating product in Notion:', productData);

  return {
    success: true,
    product: {
      id: `notion_product_${Date.now()}`,
      ...productData,
      created_at: new Date().toISOString()
    }
  };
};

export default {
  getNotionContent,
  createNotionPage,
  updateNotionPage,
  syncOrderToNotion,
  syncProductToNotion,
  getNotionDatabase,
  getContentPage,
  getContentPages,
  createOrder,
  upsertCustomer,
  getProduct,
  getProducts,
  createProduct
};
