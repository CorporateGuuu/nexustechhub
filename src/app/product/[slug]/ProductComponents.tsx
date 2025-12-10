'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { Product } from '../../../types';

// PRODUCT GALLERY COMPONENT WITH ZOOM
export function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const allImages = [product.image, ...(product.gallery || [])];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* MAIN IMAGE WITH ZOOM */}
      <div
        className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-lg cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-200 ${zoomed ? 'scale-150' : 'scale-100'}`}
          style={zoomed ? {
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          } : undefined}
          priority
        />

        {zoomed && (
          <div className="absolute inset-0 bg-black/10 pointer-events-none">
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              Zoomed
            </div>
          </div>
        )}
      </div>

      {/* THUMBNAIL GALLERY */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {allImages.slice(0, 8).map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(img)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
              selectedImage === img ? 'border-blue-600 shadow-md' : 'border-gray-300 hover:border-gray-400'
            }`}
            aria-label={`View product image ${i + 1}`}
          >
            <Image src={img} alt="" width={64} height={64} className="object-cover w-full h-full" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ADD TO CART COMPONENT WITH TOAST
export function AddToCartSection({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = async () => {
    if (!product.inStock) return;

    setIsAdding(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Reset quantity
      setQuantity(1);
    } catch (error) {
      console.error('Add to cart error:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (!product.inStock) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 font-medium">Out of Stock</p>
        <p className="text-red-600 text-sm mt-1">This product is currently unavailable.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* QUANTITY SELECTOR */}
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="font-medium text-gray-900">Quantity:</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
            className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setQuantity(Math.min(99, quantity + 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            disabled={quantity >= 99}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition font-semibold text-lg shadow-lg hover:shadow-xl"
      >
        {isAdding ? 'Adding...' : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
      </button>

      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3">
          <Check className="w-5 h-5" />
          <span className="font-medium">Added to cart successfully!</span>
        </div>
      )}
    </div>
  );
}
