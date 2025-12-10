'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface ProductImageZoomProps {
  images: string[];
  productName: string;
  className?: string;
}

export default function ProductImageZoom({
  images,
  productName,
  className = ''
}: ProductImageZoomProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isMobileZoomed, setIsMobileZoomed] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const dragStart = useRef({ x: 0, y: 0 });

  const ZOOM_LEVEL = 2.5;

  // Desktop hover zoom
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth >= 768) { // Desktop only
      setIsZoomed(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
  }, []);

  // Mobile touch handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.innerWidth < 768) {
      const touch = e.touches[0];
      dragStart.current = { x: touch.clientX, y: touch.clientY };
      setTouchStartTime(Date.now());

      // Start long press timer
      longPressTimer.current = setTimeout(() => {
        setIsLongPress(true);
        setIsMobileZoomed(true);
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const x = ((touch.clientX - rect.left) / rect.width) * 100;
          const y = ((touch.clientY - rect.top) / rect.height) * 100;
          setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
        }
      }, 500); // 500ms long press
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (window.innerWidth < 768) {
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - dragStart.current.x);
      const deltaY = Math.abs(touch.clientY - dragStart.current.y);

      // If moved more than 10px, cancel long press and treat as drag
      if (deltaX > 10 || deltaY > 10) {
        setIsDragging(true);
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }
      }

      if (isMobileZoomed) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const x = ((touch.clientX - rect.left) / rect.width) * 100;
          const y = ((touch.clientY - rect.top) / rect.height) * 100;
          setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
        }
      }
    }
  }, [isMobileZoomed]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    // If it was a short tap and not a drag, toggle zoom
    if (!isDragging && !isLongPress && Date.now() - touchStartTime < 300) {
      setIsMobileZoomed(!isMobileZoomed);
      if (!isMobileZoomed) {
        // Center the zoom on tap
        setZoomPosition({ x: 50, y: 50 });
      }
    }

    setIsLongPress(false);
    setIsDragging(false);
  }, [isDragging, isLongPress, isMobileZoomed, touchStartTime]);

  // Handle pinch-to-zoom for mobile
  useEffect(() => {
    let initialDistance = 0;
    let isPinching = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2 && window.innerWidth < 768) {
        e.preventDefault();
        isPinching = true;
        initialDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isPinching && e.touches.length === 2) {
        e.preventDefault();
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );

        if (currentDistance > initialDistance * 1.2) {
          setIsMobileZoomed(true);
          // Center zoom position
          setZoomPosition({ x: 50, y: 50 });
        } else if (currentDistance < initialDistance * 0.8) {
          setIsMobileZoomed(false);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        isPinching = false;
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
    setIsMobileZoomed(false);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
    setIsMobileZoomed(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image Container */}
      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-lg cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Image */}
        <div ref={imageRef} className="relative w-full h-full">
          <Image
            src={images[selectedImage]}
            alt={productName}
            fill
            className="object-contain"
            priority
            quality={95}
          />
        </div>

        {/* Zoom Lens Overlay (Desktop) */}
        {isZoomed && !isMobileZoomed && (
          <div
            className="absolute pointer-events-none border-2 border-white shadow-lg"
            style={{
              width: '120px',
              height: '120px',
              left: `${zoomPosition.x}%`,
              top: `${zoomPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(1px)',
            }}
          />
        )}

        {/* Zoomed Image (Desktop Hover) */}
        {isZoomed && !isMobileZoomed && (
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-white border-2 border-gray-200 shadow-2xl rounded-lg overflow-hidden z-50 pointer-events-none"
            style={{
              transform: 'translateX(calc(100% + 20px))',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${images[selectedImage]})`,
                backgroundSize: `${ZOOM_LEVEL * 100}%`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
        )}

        {/* Mobile Zoom Overlay */}
        {isMobileZoomed && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
            onClick={() => setIsMobileZoomed(false)}
          >
            <div
              className="relative w-full h-full max-w-md max-h-md"
              style={{
                backgroundImage: `url(${images[selectedImage]})`,
                backgroundSize: `${ZOOM_LEVEL * 100}%`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundRepeat: 'no-repeat',
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsMobileZoomed(false)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg z-50"
            >
              ✕
            </button>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110 z-30"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110 z-30"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}

        {/* Zoom Hint */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-30">
          {window.innerWidth >= 768 ? 'Hover to zoom' : 'Tap & hold or pinch to zoom'}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 px-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedImage(i);
                setIsZoomed(false);
                setIsMobileZoomed(false);
              }}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === i
                  ? 'border-blue-600 shadow-lg scale-105'
                  : 'border-gray-300 hover:border-gray-400 hover:scale-105'
              }`}
              aria-label={`View product image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} view ${i + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                loading="lazy"
                quality={80}
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center text-sm text-gray-600">
          {selectedImage + 1} of {images.length}
        </div>
      )}
    </div>
  );
}
