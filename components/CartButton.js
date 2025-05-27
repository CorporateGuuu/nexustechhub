import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import ShoppingCart from './ShoppingCart';
import styles from './CartButton.module.css';

export default function CartButton({ className = '', showLabel = true }) {
  const { totalItems, total } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      <button
        className={`${styles.cartButton} ${className}`}
        onClick={openCart}
        aria-label={`Shopping cart with ${totalItems} items`}
      >
        <div className={styles.cartIcon}>
          🛒
          {totalItems > 0 && (
            <span className={styles.cartBadge}>
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </div>
        
        {showLabel && (
          <div className={styles.cartInfo}>
            <span className={styles.cartLabel}>Cart</span>
            {totalItems > 0 && (
              <span className={styles.cartTotal}>
                AED {total.toFixed(2)}
              </span>
            )}
          </div>
        )}
      </button>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </>
  );
}
