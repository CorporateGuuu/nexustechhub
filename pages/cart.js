import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Cart.module.css';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock cart data - in a real app, this would come from context/state management
  useEffect(() => {
    // Simulate loading cart data
    const timer = setTimeout(() => {
      setCartItems([
        {
          id: 'ip15-pro-max-screen',
          name: 'iPhone 15 Pro Max OLED Screen - Aftermarket Pro',
          price: 399.99,
          quantity: 1,
          image: '/images/products/iphone-15-pro-max-screen.jpg',
          model: 'iPhone 15 Pro Max'
        },
        {
          id: 'toolkit-pro-65pc',
          name: 'Professional iFixit Repair Toolkit - 65 Pieces',
          price: 199.99,
          quantity: 2,
          image: '/images/products/professional-toolkit.jpg',
          model: 'Complete Set'
        }
      ]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <Layout title="Shopping Cart - Nexus Tech Hub" description="View and manage your shopping cart">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading your cart...</h3>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout
        title="Shopping Cart - Nexus Tech Hub"
        description="Your shopping cart is empty"
      >
        <div className={styles.emptyCart}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>Cart</span>
          </div>

          <div className={styles.emptyCartContent}>
            <div className={styles.emptyCartIcon}>🛒</div>
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <p>Browse our wide selection of mobile repair parts and tools.</p>

            <div className={styles.emptyCartActions}>
              <Link href="/products" className={styles.shopBtn}>
                Start Shopping
              </Link>
              <Link href="/products/iphone-parts" className={styles.browseBtn}>
                Browse iPhone Parts
              </Link>
            </div>

            <div className={styles.popularCategories}>
              <h3>Popular Categories</h3>
              <div className={styles.categoryGrid}>
                <Link href="/products/iphone-parts" className={styles.categoryLink}>
                  📱 iPhone Parts
                </Link>
                <Link href="/products/samsung-parts" className={styles.categoryLink}>
                  📱 Samsung Parts
                </Link>
                <Link href="/products/ipad-parts" className={styles.categoryLink}>
                  📱 iPad Parts
                </Link>
                <Link href="/products/repair-tools" className={styles.categoryLink}>
                  🔧 Repair Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Shopping Cart - Nexus Tech Hub"
      description="Review your cart and proceed to checkout"
    >
      <div className={styles.cartPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Cart</span>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className={styles.cartContainer}>
          {/* Cart Items */}
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = '/images/products/placeholder.svg';
                    }}
                  />
                </div>

                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>
                    <Link href={`/products/${item.id}`}>{item.name}</Link>
                  </h3>
                  <p className={styles.itemModel}>{item.model}</p>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                </div>

                <div className={styles.itemQuantity}>
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className={styles.quantityValue}>{item.quantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.itemTotal}>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div className={styles.itemActions}>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal ({cartItems.length} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {subtotal < 500 && (
              <div className={styles.freeShipping}>
                Add ${(500 - subtotal).toFixed(2)} more for FREE shipping!
              </div>
            )}

            <Link href="/checkout" className={styles.checkoutBtn}>
              Proceed to Checkout
            </Link>

            <Link href="/products" className={styles.continueShopping}>
              Continue Shopping
            </Link>

            {/* Promo Code Section */}
            <div className={styles.promoSection}>
              <h3>Have a Promo Code?</h3>
              <div className={styles.promoInput}>
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className={styles.promoField}
                />
                <button className={styles.promoBtn}>Apply</button>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-sell Section */}
        <div className={styles.crossSell}>
          <h2>You Might Also Need</h2>
          <div className={styles.crossSellGrid}>
            <div className={styles.crossSellItem}>
              <img src="/images/products/thermal-paste.jpg" alt="Thermal Paste" />
              <h4>High-Quality Thermal Paste</h4>
              <p>$9.99</p>
              <button className={styles.addToCartBtn}>Add to Cart</button>
            </div>
            <div className={styles.crossSellItem}>
              <img src="/images/products/suction-cups.jpg" alt="Suction Cups" />
              <h4>Professional Suction Cups</h4>
              <p>$19.99</p>
              <button className={styles.addToCartBtn}>Add to Cart</button>
            </div>
            <div className={styles.crossSellItem}>
              <img src="/images/products/adhesive-strips.jpg" alt="Adhesive Strips" />
              <h4>Screen Adhesive Strips</h4>
              <p>$12.99</p>
              <button className={styles.addToCartBtn}>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className={styles.shippingInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h4>🚚 Free Shipping</h4>
              <p>On orders over $500</p>
            </div>
            <div className={styles.infoItem}>
              <h4>⚡ Fast Delivery</h4>
              <p>Express options available</p>
            </div>
            <div className={styles.infoItem}>
              <h4>🛡️ Secure Checkout</h4>
              <p>SSL encrypted payment</p>
            </div>
            <div className={styles.infoItem}>
              <h4>↩️ Easy Returns</h4>
              <p>30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
