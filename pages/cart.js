import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../styles/CartPage.module.css';
import Layout from '../components/Layout/Layout';

export default function Cart() {
  const { data: session } = useSession();
  const router = useRouter();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fetch cart data
  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/cart');

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();

      if (data.success) {
        setCart(data.cart);
        setLoading(false);
      } else {
        throw new Error(data.message || 'Failed to fetch cart');
      }

    } catch (err) {
      console.error('Error fetching cart:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      setUpdating(true);
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart');
      }

      const data = await response.json();

      if (data.success) {
        setCart(data.cart);
      } else {
        throw new Error(data.message || 'Failed to update cart');
      }
    } catch (err) {
      console.error('Error updating cart:', err);
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Remove item from cart
  const removeItem = async (itemId) => {
    try {
      setUpdating(true);

      // For production, use the real API
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      const data = await response.json();

      if (data.success) {
        setCart(data.cart);
      } else {
        throw new Error(data.message || 'Failed to remove item from cart');
      }

      setUpdating(false);
      return;
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your cart?')) {
      return;
    }

    try {
      setUpdating(true);

      // For production, use the real API
      const response = await fetch('/api/cart/clear', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      const data = await response.json();

      if (data.success) {
        fetchCart();
      } else {
        throw new Error(data.message || 'Failed to clear cart');
      }

      setUpdating(false);
      return;
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    router.push('/checkout');
  };

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <Layout title="Your Cart" description="View and manage your shopping cart">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Your Cart" description="View and manage your shopping cart">
        <div className="container">
          <h1>Your Cart</h1>
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchCart} className="btn btn-primary">Try Again</button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Layout title="Your Cart" description="View and manage your shopping cart">
        <div className="container">
          <h1>Your Cart</h1>
          <div className="empty-cart">
            <div className="empty-cart-image">
              <img src="/images/backgrounds/apple-devices-800x702.jpg" alt="Empty Cart" />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link href="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Your Cart" description="View and manage your shopping cart">
      <div className="container">
        <h1>Your Cart</h1>
        <div className={styles.cart_container}>
          <div className={styles.cart_items}>
            <table className={styles.cart_table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr key={item.id} className={styles.cart_item}>
                    <td className={styles.cart_item_product}>
                      <div className={styles.cart_item_image}>
                        <img src={item.image_url || "/images/products/0DA4ABBF-40A3-456A-8275-7A18F7831F17.JPG"} alt={item.name} />
                      </div>
                      <div className={styles.cart_item_details}>
                        <Link href={`/products/${item.slug}`} className={styles.cart_item_name}>
                          {item.name}
                        </Link>
                      </div>
                    </td>
                    <td className={styles.cart_item_price}>
                      {item.discount_percentage > 0 ? (
                        <>
                          <span className={styles.original_price}>${item.price.toFixed(2)}</span>
                          <span className={styles.discounted_price}>${item.discounted_price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span>${item.price.toFixed(2)}</span>
                      )}
                    </td>
                    <td className={styles.cart_item_quantity}>
                      <div className={styles.quantity_control}>
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={updating || item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={updating}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className={styles.cart_item_total}>
                      ${item.total.toFixed(2)}
                    </td>
                    <td className={styles.cart_item_actions}>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={updating}
                        className={styles.remove_item_button}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.cart_actions}>
              <button
                onClick={clearCart}
                disabled={updating}
                className="btn btn-secondary"
              >
                Clear Cart
              </button>
              <Link href="/products" className="btn btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className={styles.cart_summary}>
            <h2>Order Summary</h2>

            <div className={styles.summary_row}>
              <span>Items ({cart.item_count}):</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>

            <div className={styles.summary_row}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className={`${styles.summary_row} ${styles.total}`}>
              <span>Total:</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={proceedToCheckout}
              disabled={updating}
              className="btn btn-primary checkout_button"
            >
              Proceed to Checkout
            </button>

            {!session && (
              <div className={styles.guest_checkout_notice}>
                <p>
                  <Link href={`/auth/signin?callbackUrl=${encodeURIComponent('/cart')}`}>
                    Sign in
                  </Link> to use saved addresses and payment methods.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
