import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../styles/Account.module.css';

export default function Account() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: 'John Smith',
    email: 'john.smith@email.com',
    memberSince: 'January 2024',
    ordersCount: 12,
    totalSpent: 2847.50
  };

  const recentOrders = [
    {
      id: 'ORD-2025-001',
      date: '2025-01-15',
      status: 'Delivered',
      total: 299.99,
      items: ['iPhone 15 Pro Screen', 'Repair Toolkit']
    },
    {
      id: 'ORD-2025-002',
      date: '2025-01-08',
      status: 'Shipped',
      total: 149.99,
      items: ['Samsung Battery', 'Thermal Paste']
    },
    {
      id: 'ORD-2025-003',
      date: '2025-01-02',
      status: 'Processing',
      total: 79.99,
      items: ['iPad Charging Port']
    }
  ];

  const accountTabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'orders', name: 'Order History', icon: '📦' },
    { id: 'addresses', name: 'Addresses', icon: '📍' },
    { id: 'settings', name: 'Account Settings', icon: '⚙️' },
    { id: 'support', name: 'Support Tickets', icon: '🎫' }
  ];

  const renderDashboard = () => (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <h2>Welcome back, {user.name}!</h2>
        <p>Here's an overview of your account</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statContent}>
            <h3>{user.ordersCount}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statContent}>
            <h3>${user.totalSpent.toFixed(2)}</h3>
            <p>Total Spent</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statContent}>
            <h3>4.8</h3>
            <p>Average Rating</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🎯</div>
          <div className={styles.statContent}>
            <h3>Gold</h3>
            <p>Member Status</p>
          </div>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h3>Quick Actions</h3>
        <div className={styles.actionsGrid}>
          <Link href="/products" className={styles.actionCard}>
            <div className={styles.actionIcon}>🛍️</div>
            <div className={styles.actionContent}>
              <h4>Shop Now</h4>
              <p>Browse our latest products</p>
            </div>
          </Link>
          <Link href="/services/custom-orders" className={styles.actionCard}>
            <div className={styles.actionIcon}>🔧</div>
            <div className={styles.actionContent}>
              <h4>Custom Order</h4>
              <p>Request bespoke parts</p>
            </div>
          </Link>
          <Link href="/services/support" className={styles.actionCard}>
            <div className={styles.actionIcon}>💬</div>
            <div className={styles.actionContent}>
              <h4>Get Support</h4>
              <p>Contact our technical team</p>
            </div>
          </Link>
          <Link href="/account/orders" className={styles.actionCard}>
            <div className={styles.actionIcon}>📋</div>
            <div className={styles.actionContent}>
              <h4>Track Orders</h4>
              <p>View your order history</p>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.recentOrders}>
        <div className={styles.sectionHeader}>
          <h3>Recent Orders</h3>
          <Link href="/account/orders" className={styles.viewAll}>
            View All Orders →
          </Link>
        </div>
        <div className={styles.ordersList}>
          {recentOrders.slice(0, 3).map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderInfo}>
                <h4>Order {order.id}</h4>
                <p className={styles.orderDate}>{order.date}</p>
                <p className={styles.orderItems}>{order.items.join(', ')}</p>
              </div>
              <div className={styles.orderStatus}>
                <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                  {order.status}
                </span>
                <p className={styles.orderTotal}>${order.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className={styles.orders}>
      <div className={styles.sectionHeader}>
        <h3>Order History</h3>
        <p>View and track all your orders</p>
      </div>

      <div className={styles.ordersList}>
        {recentOrders.map(order => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderInfo}>
              <h4>Order {order.id}</h4>
              <p className={styles.orderDate}>{order.date}</p>
              <p className={styles.orderItems}>{order.items.join(', ')}</p>
            </div>
            <div className={styles.orderStatus}>
              <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                {order.status}
              </span>
              <p className={styles.orderTotal}>${order.total.toFixed(2)}</p>
            </div>
            <div className={styles.orderActions}>
              <button className={styles.trackBtn}>Track Order</button>
              <button className={styles.detailsBtn}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className={styles.addresses}>
      <div className={styles.sectionHeader}>
        <h3>Address Book</h3>
        <p>Manage your shipping and billing addresses</p>
      </div>

      <div className={styles.addressGrid}>
        <div className={styles.addressCard}>
          <div className={styles.addressHeader}>
            <h4>🏠 Default Shipping Address</h4>
            <button className={styles.editBtn}>Edit</button>
          </div>
          <div className={styles.addressContent}>
            <p>John Smith</p>
            <p>123 Business Street</p>
            <p>Dubai, UAE 12345</p>
            <p>+971 50 123 4567</p>
          </div>
        </div>

        <div className={styles.addressCard}>
          <div className={styles.addressHeader}>
            <h4>💼 Work Address</h4>
            <button className={styles.editBtn}>Edit</button>
          </div>
          <div className={styles.addressContent}>
            <p>Tech Solutions LLC</p>
            <p>456 Repair Center</p>
            <p>Sharjah, UAE 67890</p>
            <p>+971 50 987 6543</p>
          </div>
        </div>

        <div className={styles.addAddressCard}>
          <button className={styles.addAddressBtn}>
            <span>+</span>
            <span>Add New Address</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className={styles.settings}>
      <div className={styles.sectionHeader}>
        <h3>Account Settings</h3>
        <p>Manage your account preferences and information</p>
      </div>

      <div className={styles.settingsGrid}>
        <div className={styles.settingsCard}>
          <h4>👤 Personal Information</h4>
          <div className={styles.settingItem}>
            <label>Name:</label>
            <span>{user.name}</span>
            <button className={styles.editBtn}>Edit</button>
          </div>
          <div className={styles.settingItem}>
            <label>Email:</label>
            <span>{user.email}</span>
            <button className={styles.editBtn}>Edit</button>
          </div>
          <div className={styles.settingItem}>
            <label>Phone:</label>
            <span>+971 50 123 4567</span>
            <button className={styles.editBtn}>Edit</button>
          </div>
        </div>

        <div className={styles.settingsCard}>
          <h4>🔒 Security</h4>
          <div className={styles.settingItem}>
            <label>Password:</label>
            <span>••••••••</span>
            <button className={styles.editBtn}>Change</button>
          </div>
          <div className={styles.settingItem}>
            <label>Two-Factor Auth:</label>
            <span>Enabled</span>
            <button className={styles.editBtn}>Manage</button>
          </div>
        </div>

        <div className={styles.settingsCard}>
          <h4>🔔 Notifications</h4>
          <div className={styles.settingItem}>
            <label>Email Updates:</label>
            <span>Enabled</span>
            <button className={styles.editBtn}>Manage</button>
          </div>
          <div className={styles.settingItem}>
            <label>Order Updates:</label>
            <span>Enabled</span>
            <button className={styles.editBtn}>Manage</button>
          </div>
          <div className={styles.settingItem}>
            <label>Promotional Emails:</label>
            <span>Disabled</span>
            <button className={styles.editBtn}>Manage</button>
          </div>
        </div>

        <div className={styles.settingsCard}>
          <h4>🚨 Danger Zone</h4>
          <button className={styles.dangerBtn}>Delete Account</button>
          <p className={styles.dangerText}>
            This action cannot be undone. All your data will be permanently deleted.
          </p>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className={styles.support}>
      <div className={styles.sectionHeader}>
        <h3>Support Tickets</h3>
        <p>View and manage your support requests</p>
      </div>

      <div className={styles.ticketsList}>
        <div className={styles.ticketCard}>
          <div className={styles.ticketHeader}>
            <h4>Order Delay - ORD-2025-001</h4>
            <span className={`${styles.ticketStatus} ${styles.open}`}>Open</span>
          </div>
          <p className={styles.ticketMessage}>
            My order hasn't arrived yet. Can you provide an update on the shipping status?
          </p>
          <div className={styles.ticketMeta}>
            <span>Created: Jan 16, 2025</span>
            <button className={styles.viewBtn}>View Details</button>
          </div>
        </div>

        <div className={styles.ticketCard}>
          <div className={styles.ticketHeader}>
            <h4>Product Compatibility Question</h4>
            <span className={`${styles.ticketStatus} ${styles.resolved}`}>Resolved</span>
          </div>
          <p className={styles.ticketMessage}>
            Is the iPhone 15 screen compatible with iPhone 15 Pro Max?
          </p>
          <div className={styles.ticketMeta}>
            <span>Created: Jan 10, 2025</span>
            <button className={styles.viewBtn}>View Details</button>
          </div>
        </div>
      </div>

      <div className={styles.newTicket}>
        <button className={styles.newTicketBtn}>
          Create New Support Ticket
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'orders':
        return renderOrders();
      case 'addresses':
        return renderAddresses();
      case 'settings':
        return renderSettings();
      case 'support':
        return renderSupport();
      default:
        return renderDashboard();
    }
  };

  return (
    <Layout
      title="My Account - Nexus Tech Hub"
      description="Manage your account, view orders, and update your preferences"
    >
      <div className={styles.accountPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>My Account</span>
        </div>

        {/* Account Header */}
        <div className={styles.accountHeader}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>👤</div>
            <div className={styles.userDetails}>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <p className={styles.memberSince}>Member since {user.memberSince}</p>
            </div>
          </div>
        </div>

        <div className={styles.accountContainer}>
          {/* Sidebar Navigation */}
          <div className={styles.accountSidebar}>
            <nav className={styles.accountNav}>
              {accountTabs.map(tab => (
                <button
                  key={tab.id}
                  className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className={styles.navIcon}>{tab.icon}</span>
                  <span className={styles.navText}>{tab.name}</span>
                </button>
              ))}
            </nav>

            <div className={styles.sidebarActions}>
              <Link href="/contact" className={styles.sidebarBtn}>
                Contact Support
              </Link>
              <Link href="/products" className={styles.sidebarBtn}>
                Browse Products
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.accountContent}>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
}
