'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../../styles/RepairDashboard.module.css';

export default function RepairDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState({
    orders: { total: 0, pending: 0, inProgress: 0, completed: 0 },
    inventory: { total: 0, lowStock: 0, outOfStock: 0 },
    customers: { total: 0, active: 0, vip: 0 },
    invoices: { total: 0, pending: 0, overdue: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch repair orders summary
      const ordersResponse = await fetch('/api/repair/orders?limit=1');
      const ordersData = await ordersResponse.json();

      // Fetch inventory summary
      const inventoryResponse = await fetch('/api/repair/inventory?limit=1');
      const inventoryData = await inventoryResponse.json();

      // Fetch customers summary
      const customersResponse = await fetch('/api/repair/crm?limit=1');
      const customersData = await customersResponse.json();

      // Fetch invoices summary
      const invoicesResponse = await fetch('/api/repair/invoices?limit=1');
      const invoicesData = await invoicesResponse.json();

      setDashboardData({
        orders: {
          total: ordersData.total || 0,
          pending: ordersData.data?.filter(o => o.status === 'received').length || 0,
          inProgress: ordersData.data?.filter(o => ['diagnosed', 'repairing', 'waiting_parts'].includes(o.status)).length || 0,
          completed: ordersData.data?.filter(o => o.status === 'completed').length || 0
        },
        inventory: {
          total: inventoryData.total || 0,
          lowStock: inventoryData.lowStockCount || 0,
          outOfStock: inventoryData.data?.filter(i => i.current_stock === 0).length || 0
        },
        customers: {
          total: customersData.total || 0,
          active: customersData.data?.filter(c => c.status === 'active').length || 0,
          vip: customersData.data?.filter(c => c.segment === 'vip').length || 0
        },
        invoices: {
          total: invoicesData.total || 0,
          pending: invoicesData.data?.filter(i => i.status === 'pending').length || 0,
          overdue: invoicesData.data?.filter(i => {
            return i.status === 'pending' &&
                   new Date(i.created_at) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          }).length || 0
        }
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'orders', label: 'Repair Orders', icon: '🔧' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'invoices', label: 'Invoices', icon: '📄' },
    { id: 'reports', label: 'Reports', icon: '📈' }
  ];

  return (
    <Layout title="Repair Desk Dashboard" description="Manage repair operations">
      <div className={styles.dashboard}>
        <div className="container">
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <h1>Repair Desk Dashboard</h1>
              <p>Manage repair orders, inventory, customers, and invoices</p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.primaryBtn}>
                + New Repair Order
              </button>
              <button className={styles.secondaryBtn}>
                Export Data
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className={styles.tabs}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className={styles.content}>
            {activeTab === 'overview' && (
              <OverviewTab dashboardData={dashboardData} loading={loading} />
            )}
            {activeTab === 'orders' && (
              <OrdersTab />
            )}
            {activeTab === 'inventory' && (
              <InventoryTab />
            )}
            {activeTab === 'customers' && (
              <CustomersTab />
            )}
            {activeTab === 'invoices' && (
              <InvoicesTab />
            )}
            {activeTab === 'reports' && (
              <ReportsTab />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Overview Tab Component
function OverviewTab({ dashboardData, loading }) {
  if (loading) {
    return <div className={styles.loading}>Loading dashboard data...</div>;
  }

  return (
    <div className={styles.overview}>
      {/* Key Metrics */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🔧</div>
          <div className={styles.metricContent}>
            <h3>{dashboardData.orders.total}</h3>
            <p>Total Repair Orders</p>
            <div className={styles.metricDetails}>
              <span className={styles.pending}>{dashboardData.orders.pending} Pending</span>
              <span className={styles.inProgress}>{dashboardData.orders.inProgress} In Progress</span>
              <span className={styles.completed}>{dashboardData.orders.completed} Completed</span>
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📦</div>
          <div className={styles.metricContent}>
            <h3>{dashboardData.inventory.total}</h3>
            <p>Inventory Items</p>
            <div className={styles.metricDetails}>
              <span className={styles.lowStock}>{dashboardData.inventory.lowStock} Low Stock</span>
              <span className={styles.outOfStock}>{dashboardData.inventory.outOfStock} Out of Stock</span>
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>👥</div>
          <div className={styles.metricContent}>
            <h3>{dashboardData.customers.total}</h3>
            <p>Total Customers</p>
            <div className={styles.metricDetails}>
              <span className={styles.active}>{dashboardData.customers.active} Active</span>
              <span className={styles.vip}>{dashboardData.customers.vip} VIP</span>
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📄</div>
          <div className={styles.metricContent}>
            <h3>{dashboardData.invoices.total}</h3>
            <p>Total Invoices</p>
            <div className={styles.metricDetails}>
              <span className={styles.pending}>{dashboardData.invoices.pending} Pending</span>
              <span className={styles.overdue}>{dashboardData.invoices.overdue} Overdue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.activitySection}>
        <h2>Recent Activity</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>📱</div>
            <div className={styles.activityContent}>
              <h4>New repair order received</h4>
              <p>iPhone 15 Pro Max screen replacement - Order #R250915001</p>
              <span className={styles.activityTime}>2 hours ago</span>
            </div>
          </div>

          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>⚠️</div>
            <div className={styles.activityContent}>
              <h4>Low stock alert</h4>
              <p>iPhone 15 Pro Max screens - Only 3 units remaining</p>
              <span className={styles.activityTime}>4 hours ago</span>
            </div>
          </div>

          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>✅</div>
            <div className={styles.activityContent}>
              <h4>Repair completed</h4>
              <p>Samsung Galaxy S24 battery replacement - Ready for pickup</p>
              <span className={styles.activityTime}>6 hours ago</span>
            </div>
          </div>

          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>💰</div>
            <div className={styles.activityContent}>
              <h4>Invoice paid</h4>
              <p>Invoice #INV250915001 - AED 450.00 received</p>
              <span className={styles.activityTime}>8 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <Link href="/admin/repair-dashboard?tab=orders" className={styles.actionCard}>
            <div className={styles.actionIcon}>🔧</div>
            <div className={styles.actionContent}>
              <h4>Create Repair Order</h4>
              <p>Start a new repair job</p>
            </div>
          </Link>

          <Link href="/admin/repair-dashboard?tab=inventory" className={styles.actionCard}>
            <div className={styles.actionIcon}>📦</div>
            <div className={styles.actionContent}>
              <h4>Update Inventory</h4>
              <p>Manage stock levels</p>
            </div>
          </Link>

          <Link href="/admin/repair-dashboard?tab=customers" className={styles.actionCard}>
            <div className={styles.actionIcon}>👥</div>
            <div className={styles.actionContent}>
              <h4>Add Customer</h4>
              <p>Create new customer profile</p>
            </div>
          </Link>

          <Link href="/admin/repair-dashboard?tab=invoices" className={styles.actionCard}>
            <div className={styles.actionIcon}>📄</div>
            <div className={styles.actionContent}>
              <h4>Generate Invoice</h4>
              <p>Create repair invoice</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Placeholder components for other tabs
function OrdersTab() {
  return (
    <div className={styles.tabContent}>
      <h2>Repair Orders Management</h2>
      <p>Manage all repair orders, track progress, and update statuses.</p>
      <div className={styles.placeholder}>
        <p>🔧 Repair Orders functionality will be implemented here</p>
        <p>Features: Create orders, track status, assign technicians, manage timelines</p>
      </div>
    </div>
  );
}

function InventoryTab() {
  return (
    <div className={styles.tabContent}>
      <h2>Inventory Management</h2>
      <p>Track parts inventory, manage stock levels, and handle suppliers.</p>
      <div className={styles.placeholder}>
        <p>📦 Inventory management functionality will be implemented here</p>
        <p>Features: Stock tracking, low stock alerts, supplier management, bulk updates</p>
      </div>
    </div>
  );
}

function CustomersTab() {
  return (
    <div className={styles.tabContent}>
      <h2>Customer Relationship Management</h2>
      <p>Manage customer profiles, interaction history, and segmentation.</p>
      <div className={styles.placeholder}>
        <p>👥 CRM functionality will be implemented here</p>
        <p>Features: Customer profiles, interaction logs, segmentation, analytics</p>
      </div>
    </div>
  );
}

function InvoicesTab() {
  return (
    <div className={styles.tabContent}>
      <h2>Invoice Management</h2>
      <p>Create and manage invoices, track payments, and handle overdue accounts.</p>
      <div className={styles.placeholder}>
        <p>📄 Invoice management functionality will be implemented here</p>
        <p>Features: Invoice generation, payment tracking, PDF export, email sending</p>
      </div>
    </div>
  );
}

function ReportsTab() {
  return (
    <div className={styles.tabContent}>
      <h2>Reports & Analytics</h2>
      <p>Generate reports on repair operations, inventory, customers, and financials.</p>
      <div className={styles.placeholder}>
        <p>📈 Reporting functionality will be implemented here</p>
        <p>Features: Performance reports, financial analytics, customer insights, inventory reports</p>
      </div>
    </div>
  );
}
