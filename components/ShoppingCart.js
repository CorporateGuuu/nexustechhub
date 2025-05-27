import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import { ProductImage } from './OptimizedImage';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import styles from './ShoppingCart.module.css';

// Cart Item Component
function CartItem({ item, onUpdateQuantity, onRemove, isUpdating }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item.maxQuantity) return;
    
    setIsLoading(true);
    setQuantity(newQuantity);
    
    try {
      await onUpdateQuantity(item.id, newQuantity, item.options);
    } catch (error) {
      console.error('Failed to update quantity:', error);
      setQuantity(item.quantity); // Revert on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      await onRemove(item.id, item.options);
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        <ProductImage
          product={item}
          width={80}
          height={80}
          className={styles.productImage}
        />
      </div>
      
      <div className={styles.itemDetails}>
        <h4 className={styles.itemName}>{item.name}</h4>
        <p className={styles.itemSku}>SKU: {item.sku}</p>
        
        {/* Item Options */}
        {Object.keys(item.options).length > 0 && (
          <div className={styles.itemOptions}>
            {Object.entries(item.options).map(([key, value]) => (
              <span key={key} className={styles.option}>
                {key}: {value}
              </span>
            ))}
          </div>
        )}
        
        {/* Stock Status */}
        {!item.inStock && (
          <span className={styles.outOfStock}>Out of Stock</span>
        )}
      </div>
      
      <div className={styles.itemControls}>
        <div className={styles.quantityControls}>
          <button
            className={styles.quantityBtn}
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1 || isLoading || isUpdating}
            aria-label="Decrease quantity"
          >
            −
          </button>
          
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const newQty = parseInt(e.target.value) || 1;
              if (newQty !== quantity) {
                handleQuantityChange(newQty);
              }
            }}
            min="1"
            max={item.maxQuantity}
            className={styles.quantityInput}
            disabled={isLoading || isUpdating}
          />
          
          <button
            className={styles.quantityBtn}
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= item.maxQuantity || isLoading || isUpdating}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        
        <div className={styles.itemPrice}>
          <span className={styles.price}>AED {item.price.toFixed(2)}</span>
          {item.originalPrice !== item.price && (
            <span className={styles.originalPrice}>
              AED {item.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <button
          className={styles.removeBtn}
          onClick={handleRemove}
          disabled={isLoading || isUpdating}
          aria-label="Remove item"
        >
          {isLoading ? <LoadingSpinner size="small" /> : '🗑️'}
        </button>
      </div>
      
      <div className={styles.itemTotal}>
        AED {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}

// Customer Type Selector
function CustomerTypeSelector({ currentType, onTypeChange }) {
  const customerTypes = [
    { value: 'retail', label: 'Retail Customer', discount: '0%' },
    { value: 'technician', label: 'Technician', discount: '10%' },
    { value: 'wholesale', label: 'Wholesale', discount: '15%' }
  ];

  return (
    <div className={styles.customerTypeSelector}>
      <h4>Customer Type</h4>
      <div className={styles.typeOptions}>
        {customerTypes.map(type => (
          <label key={type.value} className={styles.typeOption}>
            <input
              type="radio"
              name="customerType"
              value={type.value}
              checked={currentType === type.value}
              onChange={(e) => onTypeChange(e.target.value)}
            />
            <span className={styles.typeLabel}>
              {type.label}
              <small>({type.discount} off)</small>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Discount Code Component
function DiscountCode({ discount, onApplyDiscount, onRemoveDiscount }) {
  const [code, setCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState('');

  const handleApplyDiscount = async () => {
    if (!code.trim()) return;
    
    setIsApplying(true);
    setError('');
    
    try {
      // Simulate discount validation
      const validDiscounts = {
        'WELCOME10': { code: 'WELCOME10', type: 'percentage', value: 10, description: '10% off first order' },
        'TECH15': { code: 'TECH15', type: 'percentage', value: 15, description: '15% off for technicians' },
        'BULK20': { code: 'BULK20', type: 'percentage', value: 20, description: '20% off bulk orders' },
        'SAVE50': { code: 'SAVE50', type: 'fixed', value: 50, description: 'AED 50 off' }
      };
      
      const discountData = validDiscounts[code.toUpperCase()];
      if (discountData) {
        onApplyDiscount(discountData);
        setCode('');
      } else {
        setError('Invalid discount code');
      }
    } catch (error) {
      setError('Failed to apply discount');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className={styles.discountCode}>
      <h4>Discount Code</h4>
      {discount ? (
        <div className={styles.appliedDiscount}>
          <span className={styles.discountInfo}>
            {discount.code} - {discount.description}
          </span>
          <button
            className={styles.removeDiscountBtn}
            onClick={onRemoveDiscount}
          >
            Remove
          </button>
        </div>
      ) : (
        <div className={styles.discountInput}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter discount code"
            className={styles.codeInput}
            disabled={isApplying}
          />
          <button
            className={styles.applyBtn}
            onClick={handleApplyDiscount}
            disabled={!code.trim() || isApplying}
          >
            {isApplying ? <LoadingSpinner size="small" /> : 'Apply'}
          </button>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

// Cart Summary Component
function CartSummary({ cart }) {
  return (
    <div className={styles.cartSummary}>
      <h3>Order Summary</h3>
      
      <div className={styles.summaryLine}>
        <span>Subtotal ({cart.totalItems} items)</span>
        <span>AED {cart.subtotal.toFixed(2)}</span>
      </div>
      
      {cart.discountAmount > 0 && (
        <div className={styles.summaryLine}>
          <span>Discount ({cart.discount.code})</span>
          <span className={styles.discount}>-AED {cart.discountAmount.toFixed(2)}</span>
        </div>
      )}
      
      <div className={styles.summaryLine}>
        <span>Shipping</span>
        <span>{cart.shipping > 0 ? `AED ${cart.shipping.toFixed(2)}` : 'Free'}</span>
      </div>
      
      <div className={styles.summaryLine}>
        <span>VAT (5%)</span>
        <span>AED {cart.tax.toFixed(2)}</span>
      </div>
      
      <div className={styles.summaryTotal}>
        <span>Total</span>
        <span>AED {cart.total.toFixed(2)}</span>
      </div>
    </div>
  );
}

// Main Shopping Cart Component
export default function ShoppingCart({ isOpen, onClose, showCheckoutButton = true }) {
  const cart = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateQuantity = async (id, quantity, options) => {
    setIsUpdating(true);
    try {
      cart.updateQuantity(id, quantity, options);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (id, options) => {
    setIsUpdating(true);
    try {
      cart.removeFromCart(id, options);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ErrorBoundary componentName="ShoppingCart">
      <div className={styles.cartOverlay} onClick={onClose}>
        <div className={styles.cartPanel} onClick={(e) => e.stopPropagation()}>
          {/* Cart Header */}
          <div className={styles.cartHeader}>
            <h2>Shopping Cart ({cart.totalItems})</h2>
            <button className={styles.closeBtn} onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Cart Content */}
          <div className={styles.cartContent}>
            {cart.items.length === 0 ? (
              <div className={styles.emptyCart}>
                <p>Your cart is empty</p>
                <Link href="/iphone-parts" className={styles.shopBtn}>
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Customer Type Selector */}
                <CustomerTypeSelector
                  currentType={cart.customerType}
                  onTypeChange={cart.setCustomerType}
                />

                {/* Cart Items */}
                <div className={styles.cartItems}>
                  {cart.items.map((item, index) => (
                    <CartItem
                      key={`${item.id}-${JSON.stringify(item.options)}-${index}`}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                      isUpdating={isUpdating}
                    />
                  ))}
                </div>

                {/* Discount Code */}
                <DiscountCode
                  discount={cart.discount}
                  onApplyDiscount={cart.applyDiscount}
                  onRemoveDiscount={cart.removeDiscount}
                />

                {/* Cart Summary */}
                <CartSummary cart={cart} />

                {/* Action Buttons */}
                <div className={styles.cartActions}>
                  <button
                    className={styles.clearBtn}
                    onClick={cart.clearCart}
                    disabled={isUpdating}
                  >
                    Clear Cart
                  </button>
                  
                  {showCheckoutButton && (
                    <Link href="/checkout" className={styles.checkoutBtn}>
                      Proceed to Checkout
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
