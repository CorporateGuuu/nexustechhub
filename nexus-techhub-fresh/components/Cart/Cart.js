import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { cart, loading, updateItem, removeItem, getTotal, getItemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    const result = await updateItem(cartItemId, newQuantity);
    if (!result.success) {
      console.error('Failed to update quantity:', result.error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    const result = await removeItem(cartItemId);
    if (!result.success) {
      console.error('Failed to remove item:', result.error);
    }
  };

  if (loading) {
    return (
      <div className={styles.cartIcon}>
        <button className={styles.cartButton} disabled>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className={styles.loading}>...</span>
        </button>
      </div>
    );
  }

  const itemCount = getItemCount();
  const total = getTotal();

  return (
    <div className={styles.cartContainer}>
      {/* Cart Icon Button */}
      <div className={styles.cartIcon}>
        <button className={styles.cartButton} onClick={toggleCart}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {itemCount > 0 && (
            <span className={styles.itemCount}>{itemCount}</span>
          )}
        </button>
      </div>

      {/* Cart Dropdown */}
      {isOpen && (
        <>
          <div className={styles.overlay} onClick={toggleCart}></div>
          <div className={styles.cartDropdown}>
            <div className={styles.cartHeader}>
              <h3>Shopping Cart</h3>
              <button className={styles.closeButton} onClick={toggleCart}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className={styles.cartContent}>
              {cart?.items?.length === 0 ? (
                <div className={styles.emptyCart}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <p>Your cart is empty</p>
                  <Link href="/products" className={styles.shopButton} onClick={toggleCart}>
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className={styles.cartItems}>
                    {cart.items.map((item) => (
                      <div key={item.cart_item_id} className={styles.cartItem}>
                        <div className={styles.itemImage}>
                          <img
                            src={item.image || '/images/products/placeholder.jpg'}
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = '/images/products/placeholder.jpg';
                            }}
                          />
                        </div>
                        <div className={styles.itemDetails}>
                          <h4 className={styles.itemName}>{item.name}</h4>
                          <div className={styles.itemPrice}>${item.price.toFixed(2)}</div>
                          {item.variant_info && (
                            <div className={styles.itemVariant}>
                              {item.variant_info.type}: {item.variant_info.value}
                            </div>
                          )}
                          <div className={styles.quantityControls}>
                            <button
                              className={styles.quantityButton}
                              onClick={() => handleQuantityChange(item.cart_item_id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className={styles.quantity}>{item.quantity}</span>
                            <button
                              className={styles.quantityButton}
                              onClick={() => handleQuantityChange(item.cart_item_id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className={styles.itemActions}>
                          <div className={styles.itemTotal}>${item.total.toFixed(2)}</div>
                          <button
                            className={styles.removeButton}
                            onClick={() => handleRemoveItem(item.cart_item_id)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.cartFooter}>
                    <div className={styles.cartTotal}>
                      <span>Total:</span>
                      <span className={styles.totalAmount}>${total.toFixed(2)}</span>
                    </div>
                    <div className={styles.cartActions}>
                      <Link href="/cart" className={styles.viewCartButton} onClick={toggleCart}>
                        View Cart
                      </Link>
                      <Link href="/checkout" className={styles.checkoutButton} onClick={toggleCart}>
                        Checkout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
