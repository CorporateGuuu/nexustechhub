// Real-Time Inventory Management for Nexus TechHub
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import styles from './RealTimeInventory.module.css';

export default function RealTimeInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [lastSync, setLastSync] = useState(new Date());
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const intervalRef = useRef(null);
  const wsRef = useRef(null);

  // Categories for filtering
  const categories = [
    'iPhone Parts',
    'Samsung Parts', 
    'iPad Parts',
    'MacBook Parts',
    'Repair Tools',
    'Accessories'
  ];

  // Real-time inventory sync via API
  const syncInventory = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/inventory/sync', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        setLowStockAlerts(data.lowStockAlerts || []);
        setLastSync(new Date());
        
        // Show notifications for new low stock items
        data.lowStockAlerts?.forEach(alert => {
          if (alert.isNew) {
            toast.warning(`Low stock alert: ${alert.productName} (${alert.currentStock} remaining)`);
            addNotification('warning', `Low stock: ${alert.productName}`, alert.currentStock);
          }
        });

        // Show notifications for stock updates
        data.stockUpdates?.forEach(update => {
          if (update.type === 'sale') {
            addNotification('info', `Sale: ${update.productName}`, `Qty: ${update.quantity}`);
          } else if (update.type === 'restock') {
            addNotification('success', `Restocked: ${update.productName}`, `+${update.quantity}`);
          }
        });
      }
    } catch (error) {
      console.error('Inventory sync error:', error);
      toast.error('Failed to sync inventory data');
    }
  }, []);

  // Add notification to the list
  const addNotification = (type, title, message) => {
    const notification = {
      id: Date.now(),
      type,
      title,
      message,
      timestamp: new Date(),
    };
    
    setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep last 10
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  // WebSocket connection for real-time updates
  useEffect(() => {
    if (realTimeUpdates && typeof window !== 'undefined') {
      // In production, this would connect to your WebSocket server
      // For demo, we'll simulate with periodic updates
      const connectWebSocket = () => {
        try {
          // Simulated WebSocket connection
          console.log('Connecting to real-time inventory updates...');
          
          // Simulate receiving real-time updates
          const simulateUpdates = () => {
            const updateTypes = ['sale', 'restock', 'low_stock'];
            const randomType = updateTypes[Math.floor(Math.random() * updateTypes.length)];
            
            if (products.length > 0) {
              const randomProduct = products[Math.floor(Math.random() * products.length)];
              
              if (randomType === 'sale' && randomProduct.stock > 0) {
                const saleQuantity = Math.floor(Math.random() * 3) + 1;
                updateProductStock(randomProduct.id, -saleQuantity);
                addNotification('info', `Sale: ${randomProduct.name}`, `Qty: ${saleQuantity}`);
              } else if (randomType === 'restock') {
                const restockQuantity = Math.floor(Math.random() * 10) + 5;
                updateProductStock(randomProduct.id, restockQuantity);
                addNotification('success', `Restocked: ${randomProduct.name}`, `+${restockQuantity}`);
              }
            }
          };

          // Simulate updates every 30-60 seconds
          const updateInterval = setInterval(simulateUpdates, Math.random() * 30000 + 30000);
          
          return () => clearInterval(updateInterval);
        } catch (error) {
          console.error('WebSocket connection error:', error);
        }
      };

      const cleanup = connectWebSocket();
      return cleanup;
    }
  }, [realTimeUpdates, products]);

  // Update product stock
  const updateProductStock = (productId, stockChange) => {
    setProducts(prev => prev.map(product => {
      if (product.id === productId) {
        const newStock = Math.max(0, product.stock + stockChange);
        const updatedProduct = {
          ...product,
          stock: newStock,
          updated_at: new Date().toISOString()
        };

        // Check for low stock
        if (newStock <= product.low_stock_threshold && newStock > 0) {
          const alert = {
            id: Date.now(),
            productId: product.id,
            productName: product.name,
            currentStock: newStock,
            threshold: product.low_stock_threshold,
            isNew: true
          };
          setLowStockAlerts(prev => [...prev, alert]);
          toast.warning(`Low stock alert: ${product.name} (${newStock} remaining)`);
        }

        return updatedProduct;
      }
      return product;
    }));
  };

  // Auto-sync every 30 seconds when real-time updates are enabled
  useEffect(() => {
    if (realTimeUpdates) {
      intervalRef.current = setInterval(syncInventory, 30000);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [realTimeUpdates, syncInventory]);

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockProducts = [
          {
            id: 1,
            name: 'iPhone 14 Pro Max LCD Screen',
            sku: 'NTH-IPHONE-LCD-001',
            category: 'iPhone Parts',
            price: 299.99,
            cost: 199.99,
            stock: 15,
            low_stock_threshold: 5,
            supplier: 'Premium Parts UAE',
            location: 'Warehouse A-1',
            lastSold: '2024-01-19T09:15:00Z',
            totalSold: 45,
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-20T14:45:00Z'
          },
          {
            id: 2,
            name: 'Samsung Galaxy S23 Ultra Battery',
            sku: 'NTH-SAMSUNG-BAT-002',
            category: 'Samsung Parts',
            price: 89.99,
            cost: 45.00,
            stock: 3, // Low stock
            low_stock_threshold: 5,
            supplier: 'Samsung Parts Direct',
            location: 'Warehouse B-2',
            lastSold: '2024-01-18T14:30:00Z',
            totalSold: 28,
            created_at: '2024-01-10T08:20:00Z',
            updated_at: '2024-01-19T16:15:00Z'
          },
          {
            id: 3,
            name: 'iPad Pro 12.9" LCD Assembly',
            sku: 'NTH-IPAD-LCD-003',
            category: 'iPad Parts',
            price: 399.99,
            cost: 250.00,
            stock: 8,
            low_stock_threshold: 3,
            supplier: 'Apple Parts Pro',
            location: 'Warehouse A-3',
            lastSold: '2024-01-17T11:45:00Z',
            totalSold: 12,
            created_at: '2024-01-05T12:00:00Z',
            updated_at: '2024-01-18T10:30:00Z'
          },
          {
            id: 4,
            name: 'Professional Repair Tool Kit',
            sku: 'NTH-TOOLS-KIT-004',
            category: 'Repair Tools',
            price: 129.99,
            cost: 65.00,
            stock: 25,
            low_stock_threshold: 10,
            supplier: 'Tech Tools UAE',
            location: 'Warehouse C-1',
            lastSold: '2024-01-16T13:20:00Z',
            totalSold: 67,
            created_at: '2024-01-01T09:00:00Z',
            updated_at: '2024-01-17T15:45:00Z'
          }
        ];

        setProducts(mockProducts);
        
        // Check for initial low stock alerts
        const alerts = mockProducts
          .filter(product => product.stock <= product.low_stock_threshold)
          .map(product => ({
            id: Date.now() + product.id,
            productId: product.id,
            productName: product.name,
            currentStock: product.stock,
            threshold: product.low_stock_threshold,
            isNew: false
          }));
        
        setLowStockAlerts(alerts);
        
      } catch (error) {
        console.error('Error loading inventory:', error);
        toast.error('Failed to load inventory data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') comparison = a.name.localeCompare(b.name);
      else if (sortBy === 'sku') comparison = a.sku.localeCompare(b.sku);
      else if (sortBy === 'price') comparison = a.price - b.price;
      else if (sortBy === 'stock') comparison = a.stock - b.stock;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Manual sync trigger
  const handleManualSync = () => {
    syncInventory();
    toast.info('Syncing inventory data...');
  };

  // Toggle real-time updates
  const toggleRealTimeUpdates = () => {
    setRealTimeUpdates(!realTimeUpdates);
    if (!realTimeUpdates) {
      toast.success('Real-time updates enabled');
    } else {
      toast.info('Real-time updates disabled');
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading real-time inventory...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header with controls */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2>Real-Time Inventory Management</h2>
          <div className={styles.syncStatus}>
            <span className={`${styles.statusIndicator} ${realTimeUpdates ? styles.active : styles.inactive}`}></span>
            <span>Last sync: {lastSync.toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className={styles.headerRight}>
          <button 
            className={styles.toggleButton}
            onClick={toggleRealTimeUpdates}
          >
            {realTimeUpdates ? '⏸️ Pause' : '▶️ Resume'} Real-Time
          </button>
          <button 
            className={styles.syncButton}
            onClick={handleManualSync}
          >
            🔄 Sync Now
          </button>
        </div>
      </div>

      {/* Notifications panel */}
      {notifications.length > 0 && (
        <div className={styles.notifications}>
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`${styles.notification} ${styles[notification.type]}`}
            >
              <div className={styles.notificationContent}>
                <strong>{notification.title}</strong>
                <span>{notification.message}</span>
              </div>
              <span className={styles.timestamp}>
                {notification.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Low stock alerts */}
      {lowStockAlerts.length > 0 && (
        <div className={styles.alertsPanel}>
          <h3>⚠️ Low Stock Alerts ({lowStockAlerts.length})</h3>
          <div className={styles.alerts}>
            {lowStockAlerts.map(alert => (
              <div key={alert.id} className={styles.alert}>
                <span className={styles.alertProduct}>{alert.productName}</span>
                <span className={styles.alertStock}>
                  {alert.currentStock} / {alert.threshold} remaining
                </span>
                <button 
                  className={styles.alertAction}
                  onClick={() => {
                    // In real app, this would open reorder modal
                    toast.info(`Reorder initiated for ${alert.productName}`);
                  }}
                >
                  Reorder
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and search */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="sku">Sort by SKU</option>
          <option value="price">Sort by Price</option>
          <option value="stock">Sort by Stock</option>
        </select>
        
        <button 
          className={styles.sortOrder}
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {/* Products table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className={product.stock <= product.low_stock_threshold ? styles.lowStock : ''}>
                <td>
                  <div className={styles.productInfo}>
                    <strong>{product.name}</strong>
                    <small>Supplier: {product.supplier}</small>
                  </div>
                </td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>AED {product.price.toFixed(2)}</td>
                <td>
                  <span className={`${styles.stockBadge} ${product.stock <= product.low_stock_threshold ? styles.lowStockBadge : styles.normalStockBadge}`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <span className={`${styles.status} ${product.stock > 0 ? styles.inStock : styles.outOfStock}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td>{new Date(product.updated_at).toLocaleString()}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.editBtn}>Edit</button>
                    <button className={styles.restockBtn}>Restock</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
