// Enhanced Customer Portal for Nexus TechHub
import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../lib/stripe';
import styles from './CustomerPortal.module.css';

export default function CustomerPortal() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [repairRequests, setRepairRequests] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load customer data when session is available
  useEffect(() => {
    if (session?.user) {
      loadCustomerData();
    }
  }, [session]);

  const loadCustomerData = async () => {
    setLoading(true);
    try {
      // Load orders
      const ordersResponse = await fetch('/api/customer/orders');
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setOrders(ordersData.orders || []);
      }

      // Load repair requests
      const repairsResponse = await fetch('/api/customer/repairs');
      if (repairsResponse.ok) {
        const repairsData = await repairsResponse.json();
        setRepairRequests(repairsData.repairs || []);
      }

      // Load wishlist
      const wishlistResponse = await fetch('/api/customer/wishlist');
      if (wishlistResponse.ok) {
        const wishlistData = await wishlistResponse.json();
        setWishlist(wishlistData.items || []);
      }

      // Load addresses
      const addressesResponse = await fetch('/api/customer/addresses');
      if (addressesResponse.ok) {
        const addressesData = await addressesResponse.json();
        setAddresses(addressesData.addresses || []);
      }
    } catch (error) {
      console.error('Error loading customer data:', error);
      toast.error('Failed to load customer data');
    } finally {
      setLoading(false);
    }
  };

  // Handle sign in
  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/account' });
  };

  // Handle sign out
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  // If not authenticated, show sign in form
  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading your account...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.signInContainer}>
        <div className={styles.signInCard}>
          <div className={styles.logo}>
            <img src="/images/nexus-logo.svg" alt="Nexus TechHub" />
          </div>
          <h2>Welcome to Nexus TechHub</h2>
          <p>Sign in to access your account, track orders, and manage your repair requests.</p>

          <div className={styles.signInOptions}>
            <button className={styles.googleSignIn} onClick={handleSignIn}>
              <img src="/images/google-icon.svg" alt="Google" />
              Continue with Google
            </button>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <button className={styles.emailSignIn} onClick={() => signIn('email')}>
              📧 Continue with Email
            </button>
          </div>

          <div className={styles.benefits}>
            <h3>Account Benefits:</h3>
            <ul>
              <li>✅ Track your orders in real-time</li>
              <li>✅ Manage repair service requests</li>
              <li>✅ Save items to your wishlist</li>
              <li>✅ Store multiple shipping addresses</li>
              <li>✅ Access exclusive member discounts</li>
              <li>✅ Priority customer support</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Main customer portal interface
  return (
    <div className={styles.portalContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {session.user.image ? (
              <img src={session.user.image} alt={session.user.name} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
              </div>
            )}
          </div>
          <div className={styles.userDetails}>
            <h2>Welcome back, {session.user.name || 'Customer'}!</h2>
            <p>{session.user.email}</p>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.supportBtn}>
            📞 Contact Support
          </button>
          <button className={styles.signOutBtn} onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.navigation}>
        <button
          className={`${styles.navTab} ${activeTab === 'dashboard' ? styles.active : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`${styles.navTab} ${activeTab === 'orders' ? styles.active : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📦 Orders ({orders.length})
        </button>
        <button
          className={`${styles.navTab} ${activeTab === 'repairs' ? styles.active : ''}`}
          onClick={() => setActiveTab('repairs')}
        >
          🔧 Repairs ({repairRequests.length})
        </button>
        <button
          className={`${styles.navTab} ${activeTab === 'wishlist' ? styles.active : ''}`}
          onClick={() => setActiveTab('wishlist')}
        >
          ❤️ Wishlist ({wishlist.length})
        </button>
        <button
          className={`${styles.navTab} ${activeTab === 'addresses' ? styles.active : ''}`}
          onClick={() => setActiveTab('addresses')}
        >
          📍 Addresses
        </button>
        <button
          className={`${styles.navTab} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
      </div>

      {/* Content Area */}
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && <DashboardTab orders={orders} repairRequests={repairRequests} />}
            {activeTab === 'orders' && <OrdersTab orders={orders} />}
            {activeTab === 'repairs' && <RepairsTab repairRequests={repairRequests} />}
            {activeTab === 'wishlist' && <WishlistTab wishlist={wishlist} />}
            {activeTab === 'addresses' && <AddressesTab addresses={addresses} />}
            {activeTab === 'profile' && <ProfileTab user={session.user} />}
          </>
        )}
      </div>
    </div>
  );
}

// Dashboard Tab Component
function DashboardTab({ orders, repairRequests }) {
  const recentOrders = orders.slice(0, 3);
  const activeRepairs = repairRequests.filter(repair => repair.status !== 'completed').slice(0, 3);

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statInfo}>
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🔧</div>
          <div className={styles.statInfo}>
            <h3>{repairRequests.length}</h3>
            <p>Repair Requests</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statInfo}>
            <h3>Premium</h3>
            <p>Member Status</p>
          </div>
        </div>
      </div>

      <div className={styles.dashboardSections}>
        <div className={styles.section}>
          <h3>Recent Orders</h3>
          {recentOrders.length > 0 ? (
            <div className={styles.ordersList}>
              {recentOrders.map(order => (
                <div key={order.id} className={styles.orderItem}>
                  <div className={styles.orderInfo}>
                    <strong>#{order.orderNumber}</strong>
                    <span>{order.date}</span>
                  </div>
                  <div className={styles.orderStatus}>
                    <span className={`${styles.status} ${styles[order.status]}`}>
                      {order.status}
                    </span>
                    <span className={styles.amount}>AED {order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>No orders yet. Start shopping!</p>
          )}
        </div>

        <div className={styles.section}>
          <h3>Active Repairs</h3>
          {activeRepairs.length > 0 ? (
            <div className={styles.repairsList}>
              {activeRepairs.map(repair => (
                <div key={repair.id} className={styles.repairItem}>
                  <div className={styles.repairInfo}>
                    <strong>{repair.deviceType}</strong>
                    <span>{repair.issue}</span>
                  </div>
                  <div className={styles.repairStatus}>
                    <span className={`${styles.status} ${styles[repair.status]}`}>
                      {repair.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>No active repairs.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Orders Tab Component
function OrdersTab({ orders }) {
  return (
    <div className={styles.ordersTab}>
      <div className={styles.tabHeader}>
        <h2>Order History</h2>
        <button className={styles.primaryBtn}>Track Order</button>
      </div>

      {orders.length > 0 ? (
        <div className={styles.ordersTable}>
          {orders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderNumber}>
                  <strong>Order #{order.orderNumber}</strong>
                  <span>{order.date}</span>
                </div>
                <div className={styles.orderTotal}>
                  <span>AED {order.total}</span>
                  <span className={`${styles.status} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className={styles.orderItems}>
                {order.items?.map((item, index) => (
                  <div key={index} className={styles.orderItem}>
                    <img src={item.image} alt={item.name} />
                    <div className={styles.itemDetails}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemSku}>SKU: {item.sku}</span>
                    </div>
                    <div className={styles.itemQuantity}>
                      Qty: {item.quantity}
                    </div>
                    <div className={styles.itemPrice}>
                      AED {item.price}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.orderActions}>
                <button className={styles.secondaryBtn}>View Details</button>
                <button className={styles.secondaryBtn}>Track Package</button>
                {order.status === 'delivered' && (
                  <button className={styles.primaryBtn}>Reorder</button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>No orders yet</h3>
          <p>When you place your first order, it will appear here.</p>
          <button className={styles.primaryBtn}>Start Shopping</button>
        </div>
      )}
    </div>
  );
}

// Repairs Tab Component
function RepairsTab({ repairRequests }) {
  const [showNewRepairForm, setShowNewRepairForm] = useState(false);

  return (
    <div className={styles.repairsTab}>
      <div className={styles.tabHeader}>
        <h2>Repair Services</h2>
        <button
          className={styles.primaryBtn}
          onClick={() => setShowNewRepairForm(true)}
        >
          + New Repair Request
        </button>
      </div>

      {repairRequests.length > 0 ? (
        <div className={styles.repairsGrid}>
          {repairRequests.map(repair => (
            <div key={repair.id} className={styles.repairCard}>
              <div className={styles.repairHeader}>
                <h3>{repair.deviceType}</h3>
                <span className={`${styles.status} ${styles[repair.status]}`}>
                  {repair.status}
                </span>
              </div>

              <div className={styles.repairDetails}>
                <p><strong>Issue:</strong> {repair.issue}</p>
                <p><strong>Submitted:</strong> {repair.submittedDate}</p>
                {repair.estimatedCompletion && (
                  <p><strong>Est. Completion:</strong> {repair.estimatedCompletion}</p>
                )}
                {repair.cost && (
                  <p><strong>Cost:</strong> AED {repair.cost}</p>
                )}
              </div>

              <div className={styles.repairActions}>
                <button className={styles.secondaryBtn}>View Details</button>
                {repair.status === 'quote_ready' && (
                  <button className={styles.primaryBtn}>Approve Quote</button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>No repair requests</h3>
          <p>Need a device repaired? Submit a repair request and we'll take care of it.</p>
          <button
            className={styles.primaryBtn}
            onClick={() => setShowNewRepairForm(true)}
          >
            Submit Repair Request
          </button>
        </div>
      )}
    </div>
  );
}

// Wishlist Tab Component
function WishlistTab({ wishlist }) {
  return (
    <div className={styles.wishlistTab}>
      <div className={styles.tabHeader}>
        <h2>My Wishlist</h2>
        <span>{wishlist.length} items</span>
      </div>

      {wishlist.length > 0 ? (
        <div className={styles.wishlistGrid}>
          {wishlist.map(item => (
            <div key={item.id} className={styles.wishlistItem}>
              <img src={item.image} alt={item.name} />
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <p>{item.sku}</p>
                <span className={styles.price}>AED {item.price}</span>
              </div>
              <div className={styles.itemActions}>
                <button className={styles.primaryBtn}>Add to Cart</button>
                <button className={styles.removeBtn}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>Your wishlist is empty</h3>
          <p>Save items you're interested in to your wishlist.</p>
          <button className={styles.primaryBtn}>Browse Products</button>
        </div>
      )}
    </div>
  );
}

// Addresses Tab Component
function AddressesTab({ addresses }) {
  return (
    <div className={styles.addressesTab}>
      <div className={styles.tabHeader}>
        <h2>Saved Addresses</h2>
        <button className={styles.primaryBtn}>+ Add Address</button>
      </div>

      <div className={styles.addressesGrid}>
        {addresses.map(address => (
          <div key={address.id} className={styles.addressCard}>
            <div className={styles.addressHeader}>
              <h3>{address.label}</h3>
              {address.isDefault && (
                <span className={styles.defaultBadge}>Default</span>
              )}
            </div>
            <div className={styles.addressDetails}>
              <p>{address.name}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.emirate}</p>
              <p>{address.phone}</p>
            </div>
            <div className={styles.addressActions}>
              <button className={styles.secondaryBtn}>Edit</button>
              <button className={styles.removeBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Profile Tab Component
function ProfileTab({ user }) {
  return (
    <div className={styles.profileTab}>
      <div className={styles.tabHeader}>
        <h2>Profile Settings</h2>
        <button className={styles.primaryBtn}>Edit Profile</button>
      </div>

      <div className={styles.profileForm}>
        <div className={styles.formSection}>
          <h3>Personal Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" value={user.name || ''} readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" value={user.email || ''} readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>Phone</label>
              <input type="tel" placeholder="+971 50 123 4567" />
            </div>
            <div className={styles.formGroup}>
              <label>Date of Birth</label>
              <input type="date" />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Preferences</h3>
          <div className={styles.checkboxGroup}>
            <label>
              <input type="checkbox" defaultChecked />
              Email notifications for order updates
            </label>
            <label>
              <input type="checkbox" defaultChecked />
              SMS notifications for repair status
            </label>
            <label>
              <input type="checkbox" />
              Marketing emails and promotions
            </label>
            <label>
              <input type="checkbox" defaultChecked />
              WhatsApp notifications
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
