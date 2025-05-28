// Real-Time Inventory Sync API for Nexus TechHub
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check authentication (in production, verify admin role)
    const session = await getSession({ req });
    if (!session && process.env.NODE_ENV === 'production') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Simulate real-time inventory data
    // In production, this would fetch from your database
    const currentTime = new Date().toISOString();
    
    const products = [
      {
        id: 1,
        name: 'iPhone 14 Pro Max LCD Screen',
        sku: 'NTH-IPHONE-LCD-001',
        category: 'iPhone Parts',
        price: 299.99,
        cost: 199.99,
        stock: Math.floor(Math.random() * 20) + 5, // Random stock for demo
        low_stock_threshold: 5,
        supplier: 'Premium Parts UAE',
        location: 'Warehouse A-1',
        weight: '0.2kg',
        dimensions: '160x78x7mm',
        lastSold: '2024-01-19T09:15:00Z',
        totalSold: 45 + Math.floor(Math.random() * 5),
        created_at: '2024-01-15T10:30:00Z',
        updated_at: currentTime
      },
      {
        id: 2,
        name: 'Samsung Galaxy S23 Ultra Battery',
        sku: 'NTH-SAMSUNG-BAT-002',
        category: 'Samsung Parts',
        price: 89.99,
        cost: 45.00,
        stock: Math.floor(Math.random() * 10) + 1, // Often low stock for demo
        low_stock_threshold: 5,
        supplier: 'Samsung Parts Direct',
        location: 'Warehouse B-2',
        weight: '0.1kg',
        dimensions: '75x50x5mm',
        lastSold: '2024-01-18T14:30:00Z',
        totalSold: 28 + Math.floor(Math.random() * 3),
        created_at: '2024-01-10T08:20:00Z',
        updated_at: currentTime
      },
      {
        id: 3,
        name: 'iPad Pro 12.9" LCD Assembly',
        sku: 'NTH-IPAD-LCD-003',
        category: 'iPad Parts',
        price: 399.99,
        cost: 250.00,
        stock: Math.floor(Math.random() * 15) + 3,
        low_stock_threshold: 3,
        supplier: 'Apple Parts Pro',
        location: 'Warehouse A-3',
        weight: '0.5kg',
        dimensions: '280x215x8mm',
        lastSold: '2024-01-17T11:45:00Z',
        totalSold: 12 + Math.floor(Math.random() * 2),
        created_at: '2024-01-05T12:00:00Z',
        updated_at: currentTime
      },
      {
        id: 4,
        name: 'Professional Repair Tool Kit',
        sku: 'NTH-TOOLS-KIT-004',
        category: 'Repair Tools',
        price: 129.99,
        cost: 65.00,
        stock: Math.floor(Math.random() * 30) + 10,
        low_stock_threshold: 10,
        supplier: 'Tech Tools UAE',
        location: 'Warehouse C-1',
        weight: '1.2kg',
        dimensions: '300x200x50mm',
        lastSold: '2024-01-16T13:20:00Z',
        totalSold: 67 + Math.floor(Math.random() * 5),
        created_at: '2024-01-01T09:00:00Z',
        updated_at: currentTime
      },
      {
        id: 5,
        name: 'iPhone 13 Pro Battery',
        sku: 'NTH-IPHONE-BAT-005',
        category: 'iPhone Parts',
        price: 79.99,
        cost: 40.00,
        stock: Math.floor(Math.random() * 25) + 5,
        low_stock_threshold: 8,
        supplier: 'Premium Parts UAE',
        location: 'Warehouse A-2',
        weight: '0.1kg',
        dimensions: '70x45x4mm',
        lastSold: '2024-01-19T16:30:00Z',
        totalSold: 89 + Math.floor(Math.random() * 8),
        created_at: '2024-01-08T14:15:00Z',
        updated_at: currentTime
      },
      {
        id: 6,
        name: 'MacBook Pro M2 Trackpad',
        sku: 'NTH-MACBOOK-TP-006',
        category: 'MacBook Parts',
        price: 189.99,
        cost: 95.00,
        stock: Math.floor(Math.random() * 8) + 1,
        low_stock_threshold: 3,
        supplier: 'Apple Parts Pro',
        location: 'Warehouse A-4',
        weight: '0.3kg',
        dimensions: '120x80x10mm',
        lastSold: '2024-01-15T10:45:00Z',
        totalSold: 23 + Math.floor(Math.random() * 3),
        created_at: '2024-01-03T11:30:00Z',
        updated_at: currentTime
      }
    ];

    // Generate low stock alerts
    const lowStockAlerts = products
      .filter(product => product.stock <= product.low_stock_threshold)
      .map(product => ({
        id: Date.now() + product.id,
        productId: product.id,
        productName: product.name,
        currentStock: product.stock,
        threshold: product.low_stock_threshold,
        severity: product.stock === 0 ? 'critical' : product.stock <= Math.floor(product.low_stock_threshold / 2) ? 'high' : 'medium',
        isNew: Math.random() > 0.7, // 30% chance of being a new alert
        createdAt: currentTime
      }));

    // Generate recent stock updates (simulated)
    const stockUpdates = [];
    
    // Simulate some recent sales
    if (Math.random() > 0.5) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      stockUpdates.push({
        type: 'sale',
        productId: randomProduct.id,
        productName: randomProduct.name,
        quantity: Math.floor(Math.random() * 3) + 1,
        timestamp: new Date(Date.now() - Math.random() * 300000).toISOString() // Within last 5 minutes
      });
    }

    // Simulate some restocking
    if (Math.random() > 0.7) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      stockUpdates.push({
        type: 'restock',
        productId: randomProduct.id,
        productName: randomProduct.name,
        quantity: Math.floor(Math.random() * 20) + 10,
        timestamp: new Date(Date.now() - Math.random() * 600000).toISOString() // Within last 10 minutes
      });
    }

    // Calculate inventory statistics
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const lowStockCount = lowStockAlerts.length;
    const outOfStockCount = products.filter(product => product.stock === 0).length;
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);

    // Generate performance metrics
    const metrics = {
      totalProducts,
      totalStock,
      lowStockCount,
      outOfStockCount,
      totalValue: Math.round(totalValue * 100) / 100,
      averageStockLevel: Math.round((totalStock / totalProducts) * 100) / 100,
      stockTurnover: Math.round(Math.random() * 5 + 2), // Simulated turnover rate
      lastSyncTime: currentTime,
      syncStatus: 'success'
    };

    // Simulate occasional sync errors for testing
    if (Math.random() > 0.95) {
      return res.status(500).json({
        error: 'Sync temporarily unavailable',
        message: 'Please try again in a few moments',
        retryAfter: 30
      });
    }

    // Return comprehensive inventory data
    res.status(200).json({
      success: true,
      timestamp: currentTime,
      products,
      lowStockAlerts,
      stockUpdates,
      metrics,
      notifications: [
        ...lowStockAlerts.filter(alert => alert.isNew).map(alert => ({
          type: 'warning',
          title: 'Low Stock Alert',
          message: `${alert.productName} has only ${alert.currentStock} units remaining`,
          timestamp: currentTime
        })),
        ...stockUpdates.map(update => ({
          type: update.type === 'sale' ? 'info' : 'success',
          title: update.type === 'sale' ? 'Sale Recorded' : 'Stock Replenished',
          message: `${update.productName}: ${update.type === 'sale' ? '-' : '+'}${update.quantity} units`,
          timestamp: update.timestamp
        }))
      ]
    });

  } catch (error) {
    console.error('Inventory sync error:', error);
    
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to sync inventory data',
      timestamp: new Date().toISOString()
    });
  }
}
