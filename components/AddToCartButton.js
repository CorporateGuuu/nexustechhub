import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from './LoadingSpinner';
import styles from './AddToCartButton.module.css';

export default function AddToCartButton({ 
  product, 
  quantity = 1, 
  options = {}, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  showQuantity = false,
  className = '',
  children,
  onAddSuccess,
  onAddError
}) {
  const { addToCart, isInCart, getItemCount } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentQuantity = getItemCount(product.id, options);
  const inCart = isInCart(product.id, options);

  const handleAddToCart = async () => {
    if (disabled || isAdding || !product) return;

    setIsAdding(true);
    
    try {
      addToCart(product, quantity, options);
      
      // Show success feedback
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      
      // Call success callback
      if (onAddSuccess) {
        onAddSuccess(product, quantity, options);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      
      // Call error callback
      if (onAddError) {
        onAddError(error, product, quantity, options);
      }
    } finally {
      setIsAdding(false);
    }
  };

  // Check if product is out of stock
  const isOutOfStock = !product?.inStock || product?.stock === 0;
  
  // Check if adding would exceed max quantity
  const wouldExceedMax = currentQuantity + quantity > (product?.maxQuantity || 999);

  // Determine button state
  const isDisabled = disabled || isAdding || isOutOfStock || wouldExceedMax;

  // Button text logic
  const getButtonText = () => {
    if (isAdding) return '';
    if (showSuccess) return '✓ Added!';
    if (isOutOfStock) return 'Out of Stock';
    if (wouldExceedMax) return 'Max Quantity Reached';
    if (children) return children;
    if (inCart && showQuantity) return `Add More (${currentQuantity} in cart)`;
    return 'Add to Cart';
  };

  // Button classes
  const buttonClasses = [
    styles.addToCartButton,
    styles[variant],
    styles[size],
    showSuccess && styles.success,
    isOutOfStock && styles.outOfStock,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={handleAddToCart}
      disabled={isDisabled}
      aria-label={`Add ${product?.name || 'product'} to cart`}
      title={wouldExceedMax ? `Maximum quantity is ${product?.maxQuantity}` : undefined}
    >
      {isAdding && <LoadingSpinner size="small" />}
      <span className={styles.buttonText}>
        {getButtonText()}
      </span>
      {showQuantity && currentQuantity > 0 && !showSuccess && (
        <span className={styles.quantityBadge}>
          {currentQuantity}
        </span>
      )}
    </button>
  );
}

// Quick Add Button - simplified version for product grids
export function QuickAddButton({ product, className = '' }) {
  return (
    <AddToCartButton
      product={product}
      variant="secondary"
      size="small"
      className={`${styles.quickAdd} ${className}`}
      showQuantity={true}
    >
      +
    </AddToCartButton>
  );
}

// Bulk Add Button - for wholesale/technician customers
export function BulkAddButton({ product, quantities = [1, 5, 10, 25], className = '' }) {
  const [selectedQuantity, setSelectedQuantity] = useState(quantities[0]);

  return (
    <div className={`${styles.bulkAddContainer} ${className}`}>
      <select
        value={selectedQuantity}
        onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
        className={styles.quantitySelect}
      >
        {quantities.map(qty => (
          <option key={qty} value={qty}>
            {qty} {qty === 1 ? 'piece' : 'pieces'}
          </option>
        ))}
      </select>
      
      <AddToCartButton
        product={product}
        quantity={selectedQuantity}
        variant="primary"
        size="medium"
        className={styles.bulkAddButton}
      >
        Add {selectedQuantity}
      </AddToCartButton>
    </div>
  );
}
