'use client';

import { useState } from 'react';
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  showQuantity?: boolean;
  variant?: 'default' | 'compact' | 'inline';
}

export default function AddToCartButton({
  product,
  className = '',
  showQuantity = true,
  variant = 'default'
}: AddToCartButtonProps) {
  const { addToCart, items, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Find if product is already in cart
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.qty || 0;

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        condition: product.condition || 'New'
      });

      toast.success(`Added ${product.name} to cart!`, {
        description: `$${product.price.toFixed(2)}`,
        action: {
          label: 'View Cart',
          onClick: () => {
            // Dispatch custom event to open cart
            window.dispatchEvent(new CustomEvent('open-cart'));
          }
        }
      });
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty <= 0) {
      // Remove from cart
      updateQuantity(product.id, 0);
      toast.info(`Removed ${product.name} from cart`);
    } else {
      if (quantity === 0) {
        // Add to cart
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          condition: product.condition || 'New'
        });
        toast.success(`Added ${product.name} to cart!`);
      } else {
        // Update quantity
        updateQuantity(product.id, newQty);
      }
    }
  };

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {quantity > 0 ? (
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isAdding ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
            Add
          </button>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity === 0}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-8 text-center font-medium">
          {quantity > 0 ? quantity : 0}
        </span>

        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>

        {quantity === 0 && (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="ml-2 flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
          >
            {isAdding ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart className="w-3 h-3" />
            )}
          </button>
        )}
      </div>
    );
  }

  // Default variant
  if (quantity > 0 && showQuantity) {
    return (
      <div className={`flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-2 text-green-700">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">In Cart</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="p-1 hover:bg-green-100 rounded transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="p-1 hover:bg-green-100 rounded transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium ${className}`}
    >
      {isAdding ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <ShoppingCart className="w-5 h-5" />
      )}
      Add to Cart - ${product.price.toFixed(2)}
    </button>
  );
}
