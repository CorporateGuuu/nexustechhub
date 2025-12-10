'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
  platform: 'youtube' | 'vimeo';
  duration?: string;
  videoUrl?: string; // Direct video URL for custom player
}

interface ThreeSixtyData {
  id: string;
  title: string;
  thumbnail: string;
  frames: string[]; // Array of frame URLs (36-72 frames)
  frameCount: number;
}

interface MediaItem {
  type: 'image' | 'video' | '360';
  src: string;
  videoData?: VideoData;
  threeSixtyData?: ThreeSixtyData;
}

interface ProductGalleryProps {
  images: string[];
  videos?: VideoData[];
  threeSixty?: ThreeSixtyData;
  productName: string;
  className?: string;
  thumbnailPosition?: 'bottom' | 'left' | 'right';
  showZoomHint?: boolean;
}

export default function ProductGallery({
  images,
  videos = [],
  threeSixty,
  productName,
  className = '',
  thumbnailPosition = 'bottom',
  showZoomHint = true
}: ProductGalleryProps) {
  // Combine images, videos, and 360 into unified media array
  const mediaItems: MediaItem[] = [
    ...images.map(src => ({ type: 'image' as const, src })),
    ...videos.map(video => ({ type: 'video' as const, src: video.thumbnail, videoData: video })),
    ...(threeSixty ? [{ type: '360' as const, src: threeSixty.thumbnail, threeSixtyData: threeSixty }] : [])
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isMobileZoomed, setIsMobileZoomed] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swipeStartX, setSwipeStartX] = useState(0);
  const [swipeStartY, setSwipeStartY] = useState(0);
  const [swipeVelocity, setSwipeVelocity] = useState(0);

  // Mobile zoom state
  const [mobileZoomScale, setMobileZoomScale] = useState(1);
  const [mobileZoomPan, setMobileZoomPan] = useState({ x: 0, y: 0 });
  const [isPinching, setIsPinching] = useState(false);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [lastTapPosition, setLastTapPosition] = useState({ x: 0, y: 0 });
  const [pinchStartDistance, setPinchStartDistance] = useState(0);
  const [pinchStartScale, setPinchStartScale] = useState(1);
  const [isPanning, setIsPanning] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  const ZOOM_LEVEL = 2.5;
  const currentItem = mediaItems[selectedIndex];
  const isCurrentItemVideo = currentItem?.type === 'video';
  const isCurrentItem360 = currentItem?.type === '360';

  // Smooth transition when changing media
  const changeMedia = useCallback((newIndex: number) => {
    if (newIndex === selectedIndex) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIndex(newIndex);
      setIsZoomed(false);
      setIsMobileZoomed(false);
      setTimeout(() => setIsTransitioning(false), 150);
    }, 75);
  }, [selectedIndex]);

  const nextMedia = () => {
    const nextIndex = (selectedIndex + 1) % mediaItems.length;
    changeMedia(nextIndex);
  };

  const prevMedia = () => {
    const prevIndex = (selectedIndex - 1 + mediaItems.length) % mediaItems.length;
    changeMedia(prevIndex);
  };

  // Desktop hover zoom
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth >= 768 && !isCurrentItemVideo) { // Desktop only, images only
      setIsZoomed(true);
    }
  }, [isCurrentItemVideo]);

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
  }, []);

  // Mobile touch handling with advanced zoom and swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.innerWidth < 768) {
      const touch = e.touches[0];
      dragStart.current = { x: touch.clientX, y: touch.clientY };
      setSwipeStartX(touch.clientX);
      setSwipeStartY(touch.clientY);
      setTouchStartTime(Date.now());
      setSwipeVelocity(0);

      // Handle pinch start
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
        setPinchStartDistance(distance);
        setPinchStartScale(mobileZoomScale);
        setIsPinching(true);
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }
        return;
      }

      // Handle single touch
      if (mobileZoomScale > 1) {
        // When zoomed, start panning
        panStart.current = { x: touch.clientX - mobileZoomPan.x, y: touch.clientY - mobileZoomPan.y };
        setIsPanning(true);
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }
        return;
      }

      // Start long press timer for non-zoomed state
      longPressTimer.current = setTimeout(() => {
        setIsLongPress(true);
        setIsMobileZoomed(true);
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const x = ((touch.clientX - rect.left) / rect.width) * 100;
          const y = ((touch.clientY - rect.top) / rect.height) * 100;
          setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
        }
      }, 500);
    }
  }, [mobileZoomScale, mobileZoomPan]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (window.innerWidth < 768) {
      // Handle pinch zoom
      if (e.touches.length === 2 && isPinching) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);

        const scale = Math.max(1, Math.min(4, pinchStartScale * (distance / pinchStartDistance)));
        setMobileZoomScale(scale);

        // Center the pinch point
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const x = ((centerX - rect.left) / rect.width) * 100;
          const y = ((centerY - rect.top) / rect.height) * 100;
          setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
        }
        return;
      }

      // Handle panning when zoomed
      if (isPanning && mobileZoomScale > 1 && e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const maxPanX = (mobileZoomScale - 1) * rect.width / 2;
          const maxPanY = (mobileZoomScale - 1) * rect.height / 2;

          const newPanX = touch.clientX - panStart.current.x;
          const newPanY = touch.clientY - panStart.current.y;

          setMobileZoomPan({
            x: Math.max(-maxPanX, Math.min(maxPanX, newPanX)),
            y: Math.max(-maxPanY, Math.min(maxPanY, newPanY))
          });
        }
        return;
      }

      // Handle swipe detection
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - dragStart.current.x);
      const deltaY = Math.abs(touch.clientY - dragStart.current.y);

      // Calculate velocity for swipe detection
      const now = Date.now();
      const timeDelta = now - touchStartTime;
      if (timeDelta > 0) {
        setSwipeVelocity(Math.abs(touch.clientX - swipeStartX) / timeDelta);
      }

      // If moved more than 10px and not pinching/panning, cancel long press
      if (deltaX > 10 || deltaY > 10) {
        setIsDragging(true);
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }
      }

      if (isMobileZoomed && !isPinching && !isPanning) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const x = ((touch.clientX - rect.left) / rect.width) * 100;
          const y = ((touch.clientY - rect.top) / rect.height) * 100;
          setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
        }
      }
    }
  }, [isPinching, isPanning, mobileZoomScale, mobileZoomPan, pinchStartScale, pinchStartDistance, touchStartTime, swipeStartX, isMobileZoomed]);

  const handleTouchEnd = useCallback(() => {
    if (window.innerWidth < 768) {
      // Handle pinch end
      if (isPinching) {
        setIsPinching(false);
        return;
      }

      // Handle pan end
      if (isPanning) {
        setIsPanning(false);
        return;
      }

      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }

      // Handle double tap
      const now = Date.now();
      const touch = { clientX: swipeStartX, clientY: swipeStartY }; // Use last touch position
      const timeSinceLastTap = now - lastTapTime;
      const distanceFromLastTap = Math.hypot(touch.clientX - lastTapPosition.x, touch.clientY - lastTapPosition.y);

      if (timeSinceLastTap < 300 && distanceFromLastTap < 30 && !isDragging && !isLongPress) {
        // Double tap detected
        if (mobileZoomScale > 1) {
          // Zoom out
          setMobileZoomScale(1);
          setMobileZoomPan({ x: 0, y: 0 });
        } else {
          // Zoom in to 2.5x at tap point
          setMobileZoomScale(2.5);
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const x = ((touch.clientX - rect.left) / rect.width) * 100;
            const y = ((touch.clientY - rect.top) / rect.height) * 100;
            setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
            // Center the zoom on tap point
            setMobileZoomPan({ x: 0, y: 0 });
          }
        }
        setLastTapTime(0); // Reset to prevent triple-tap
        return;
      }

      // Update last tap info
      setLastTapTime(now);
      setLastTapPosition({ x: touch.clientX, y: touch.clientY });

      // Detect swipe gestures for media navigation (only when not zoomed)
      if (mobileZoomScale <= 1) {
        const deltaX = swipeStartX - dragStart.current.x;
        const deltaY = Math.abs(swipeStartY - dragStart.current.y);
        const minSwipeDistance = 50;
        const maxVerticalMovement = 100;

        if (Math.abs(deltaX) > minSwipeDistance && deltaY < maxVerticalMovement && swipeVelocity > 0.3) {
          if (deltaX > 0) {
            prevMedia();
          } else {
            nextMedia();
          }
        } else if (!isDragging && !isLongPress && now - touchStartTime < 300) {
          // Single tap when not zoomed
          setIsMobileZoomed(!isMobileZoomed);
          if (!isMobileZoomed) {
            setZoomPosition({ x: 50, y: 50 });
          }
        }
      }
    }

    setIsLongPress(false);
    setIsDragging(false);
  }, [isPinching, isPanning, mobileZoomScale, lastTapTime, lastTapPosition, isDragging, isLongPress, touchStartTime, swipeStartX, swipeStartY, swipeVelocity, prevMedia, nextMedia, isMobileZoomed]);



  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevMedia();
      } else if (e.key === 'ArrowRight') {
        nextMedia();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedIndex, mediaItems.length]);

  // Thumbnail scroll to active on mobile
  useEffect(() => {
    if (thumbnailRef.current && window.innerWidth < 768) {
      const activeThumbnail = thumbnailRef.current.children[selectedIndex] as HTMLElement;
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedIndex]);

  const mainImageClass = `relative w-full h-full transition-opacity duration-150 ${
    isTransitioning ? 'opacity-0' : 'opacity-100'
  }`;

  const thumbnailContainerClass = thumbnailPosition === 'bottom'
    ? 'flex gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide'
    : `flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-hide ${thumbnailPosition === 'left' ? 'order-first' : ''}`;

  const thumbnailClass = thumbnailPosition === 'bottom'
    ? 'flex-shrink-0 w-20 h-20'
    : 'flex-shrink-0 w-16 h-16';

  return (
    <div className={`space-y-4 ${className}`}>
      <div className={`flex gap-6 ${thumbnailPosition !== 'bottom' ? 'items-start' : ''}`}>
        {/* Main Media Container */}
        <div className={`flex-1 ${thumbnailPosition !== 'bottom' ? 'max-w-2xl' : ''}`}>
          <div
            ref={containerRef}
            className={`relative aspect-square overflow-hidden rounded-lg bg-white shadow-lg ${
              isCurrentItemVideo ? 'cursor-pointer' : 'cursor-crosshair'
            }`}
            onMouseMove={!isCurrentItemVideo ? handleMouseMove : undefined}
            onMouseEnter={!isCurrentItemVideo ? handleMouseEnter : undefined}
            onMouseLeave={!isCurrentItemVideo ? handleMouseLeave : undefined}
            onTouchStart={!isCurrentItemVideo ? handleTouchStart : undefined}
            onTouchMove={!isCurrentItemVideo ? handleTouchMove : undefined}
            onTouchEnd={!isCurrentItemVideo ? handleTouchEnd : undefined}
          >
            {isCurrentItemVideo ? (
              /* Custom Video Player */
              <CustomVideoPlayer
                src={currentItem.videoData?.videoUrl || `https://www.youtube.com/embed/${currentItem.videoData?.videoId}`}
                className={mainImageClass}
                thumbnail={currentItem.src}
              />
            ) : isCurrentItem360 ? (
              /* 360 Degree Viewer */
              <ThreeSixtyViewer
                frames={currentItem.threeSixtyData?.frames || []}
                className={mainImageClass}
                mobileZoomScale={mobileZoomScale}
                mobileZoomPan={mobileZoomPan}
              />
            ) : (
              /* Image Display with Zoom */
              <>
                <div
                  ref={imageRef}
                  className={mainImageClass}
                  style={{
                    transform: `scale(${mobileZoomScale}) translate(${mobileZoomPan.x / mobileZoomScale}px, ${mobileZoomPan.y / mobileZoomScale}px)`,
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transition: mobileZoomScale === 1 ? 'transform 0.3s ease-out' : 'none'
                  }}
                >
                  <Image
                    src={currentItem.src}
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
                        backgroundImage: `url(${currentItem.src})`,
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
                        backgroundImage: `url(${currentItem.src})`,
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
              </>
            )}

            {/* Navigation Arrows */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110 z-30 opacity-0 group-hover:opacity-100"
                  aria-label="Previous media"
                >
                  ‹
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110 z-30 opacity-0 group-hover:opacity-100"
                  aria-label="Next media"
                >
                  ›
                </button>
              </>
            )}

            {/* Hint */}
            {showZoomHint && !isCurrentItemVideo && (
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-30">
                {window.innerWidth >= 768
                  ? 'Hover to zoom'
                  : isCurrentItem360
                    ? 'Swipe to rotate • 360°'
                    : 'Swipe to navigate • Tap & hold to zoom'
                }
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {mediaItems.length > 1 && (
          <div
            ref={thumbnailRef}
            className={thumbnailContainerClass}
            style={thumbnailPosition !== 'bottom' ? { maxHeight: '400px' } : {}}
          >
            {mediaItems.map((item, i) => (
              <button
                key={`${item.type}-${i}`}
                onClick={() => changeMedia(i)}
                className={`${thumbnailClass} rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 relative ${
                  selectedIndex === i
                    ? 'border-blue-600 shadow-lg scale-105 ring-2 ring-blue-500'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                aria-label={item.type === 'video' ? `Play ${item.videoData?.title}` : `View product image ${i + 1}`}
              >
                <Image
                  src={item.src}
                  alt={item.type === 'video' ? (item.videoData?.title || 'Product video') : `${productName} view ${i + 1}`}
                  width={thumbnailPosition === 'bottom' ? 80 : 64}
                  height={thumbnailPosition === 'bottom' ? 80 : 64}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  quality={80}
                />

                {/* Play button overlay for videos */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-2 transform scale-75 group-hover:scale-90 transition-transform duration-200 shadow-lg">
                      <svg
                        className="w-4 h-4 text-gray-900 ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l8-5-8-5z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Duration badge for videos */}
                {item.type === 'video' && item.videoData?.duration && (
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                    {item.videoData.duration}
                  </div>
                )}

                {/* 360° badge for 360 views */}
                {item.type === '360' && (
                  <div className="absolute top-1 left-1 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                    360°
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Media Counter */}
      {mediaItems.length > 1 && (
        <div className="text-center text-sm text-gray-600">
          {selectedIndex + 1} of {mediaItems.length}
        </div>
      )}
    </div>
  );
}

// Lightweight 360-degree viewer component with smooth touch support
function ThreeSixtyViewer({
  frames,
  className,
  mobileZoomScale = 1,
  mobileZoomPan = { x: 0, y: 0 }
}: {
  frames: string[];
  className: string;
  mobileZoomScale?: number;
  mobileZoomPan?: { x: number; y: number };
}) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const [isMomentumScrolling, setIsMomentumScrolling] = useState(false);
  const frameCount = frames.length;
  const animationFrameRef = useRef<number>();

  // Smooth frame updates using requestAnimationFrame
  const updateFrame = useCallback((newFrame: number) => {
    setCurrentFrame((newFrame + frameCount) % frameCount);
  }, [frameCount]);

  // Momentum scrolling for smooth deceleration
  const applyMomentum = useCallback(() => {
    if (Math.abs(velocity) < 0.1) {
      setIsMomentumScrolling(false);
      setVelocity(0);
      return;
    }

    const newFrame = currentFrame + velocity;
    updateFrame(Math.round(newFrame));
    setVelocity(velocity * 0.95); // Deceleration factor

    animationFrameRef.current = requestAnimationFrame(applyMomentum);
  }, [velocity, currentFrame, updateFrame]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setIsMomentumScrolling(false);
    setVelocity(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartX;
    const sensitivity = 1.5; // More sensitive for mouse
    const frameChange = deltaX / sensitivity;

    updateFrame(currentFrame + frameChange);
    setDragStartX(e.clientX);
  }, [isDragging, dragStartX, currentFrame, updateFrame]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setLastMoveTime(Date.now());
    setIsMomentumScrolling(false);
    setVelocity(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;

    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartX;
    const now = Date.now();
    const timeDelta = now - lastMoveTime;

    if (timeDelta > 0) {
      const newVelocity = deltaX / timeDelta;
      setVelocity(newVelocity);
    }

    const sensitivity = 1; // More sensitive for touch
    const frameChange = deltaX / sensitivity;

    updateFrame(currentFrame + frameChange);
    setDragStartX(touch.clientX);
    setLastMoveTime(now);
  }, [isDragging, dragStartX, currentFrame, lastMoveTime, updateFrame]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);

    // Start momentum scrolling if velocity is significant
    if (Math.abs(velocity) > 0.5) {
      setIsMomentumScrolling(true);
      applyMomentum();
    }
  }, [velocity, applyMomentum]);

  // Auto-rotate every 3 seconds when not interacting
  useEffect(() => {
    if (isDragging || isMomentumScrolling) return;

    const interval = setInterval(() => {
      updateFrame(currentFrame + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragging, isMomentumScrolling, currentFrame, updateFrame]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`${className} cursor-grab ${isDragging ? 'cursor-grabbing' : ''} select-none`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundImage: `url(${frames[currentFrame]})`,
        backgroundSize: mobileZoomScale > 1 ? `${mobileZoomScale * 100}%` : 'contain',
        backgroundPosition: mobileZoomScale > 1
          ? `calc(50% + ${mobileZoomPan.x / mobileZoomScale}px) calc(50% + ${mobileZoomPan.y / mobileZoomScale}px)`
          : 'center',
        backgroundRepeat: 'no-repeat',
        touchAction: 'none', // Prevent default touch behaviors
        transform: mobileZoomScale === 1 ? 'none' : `scale(${mobileZoomScale})`,
        transformOrigin: 'center',
        transition: mobileZoomScale === 1 ? 'transform 0.3s ease-out' : 'none'
      }}
    >
      {/* 360 Hint */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
        {isDragging ? 'Dragging...' : 'Swipe to rotate • 360°'}
      </div>
    </div>
  );
}

// Custom Video Player with premium controls
function CustomVideoPlayer({ src, className, thumbnail }: { src: string; className: string; thumbnail: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Format time display
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [isPlaying]);

  // Handle play/pause events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

  // Auto-hide controls
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  // Handle mouse/touch interactions to show controls
  const handleInteraction = useCallback(() => {
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  // Seek to position
  const handleSeek = useCallback((e: React.MouseEvent) => {
    if (!videoRef.current || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;

    videoRef.current.currentTime = Math.max(0, Math.min(duration, newTime));
    setCurrentTime(newTime);
  }, [duration]);

  // Handle progress bar scrubbing
  const handleProgressMouseDown = useCallback((e: React.MouseEvent) => {
    setIsScrubbing(true);
    handleSeek(e);
  }, [handleSeek]);

  const handleProgressMouseMove = useCallback((e: React.MouseEvent) => {
    if (isScrubbing) {
      handleSeek(e);
    }
  }, [isScrubbing, handleSeek]);

  const handleProgressMouseUp = useCallback(() => {
    setIsScrubbing(false);
  }, []);

  // Volume control
  const handleVolumeChange = useCallback((e: React.MouseEvent) => {
    if (!volumeRef.current) return;

    const rect = volumeRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, percent));

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;

    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  }, [isMuted]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.warn('Fullscreen not supported');
    }
  }, [isFullscreen]);

  // Picture-in-Picture toggle
  const togglePictureInPicture = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.warn('Picture-in-Picture not supported');
    }
  }, []);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Reset controls timeout when playing state changes
  useEffect(() => {
    resetControlsTimeout();
  }, [isPlaying, resetControlsTimeout]);

  // Handle mobile touch for controls
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.innerWidth < 768) {
      handleInteraction();
    }
  }, [handleInteraction]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className} bg-black group`}
      onMouseMove={handleInteraction}
      onMouseLeave={() => setShowControls(false)}
      onTouchStart={handleTouchStart}
      onMouseDown={handleProgressMouseDown}
      onMouseMove={handleProgressMouseMove}
      onMouseUp={handleProgressMouseUp}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={thumbnail}
        preload="metadata"
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play Button Overlay (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <button
            onClick={togglePlay}
            className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5v10l8-5-8-5z" />
            </svg>
          </button>
        </div>
      )}

      {/* Controls Overlay */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer relative"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-blue-500 rounded-full relative"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="hover:scale-110 transition-transform duration-200"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 4a1 1 0 00-1 1v10a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H6zm4 0a1 1 0 00-1 1v10a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1h-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z" />
                </svg>
              )}
            </button>

            {/* Time Display */}
            <span className="text-sm font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Volume */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="hover:scale-110 transition-transform duration-200"
              >
                {isMuted || volume === 0 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.414 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.414l3.969-3.816a1 1 0 011.616.193zM14.293 5.707a1 1 0 011.414 0L17 7.586l1.293-1.293a1 1 0 111.414 1.414L18.414 9l1.293 1.293a1 1 0 01-1.414 1.414L17 10.414l-1.293 1.293a1 1 0 01-1.414-1.414L15.586 9l-1.293-1.293a1 1 0 011.414-1.414L17 7.586z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.414 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.414l3.969-3.816a1 1 0 011.616.193zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 011.414-1.414L15 8.586z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <div
                ref={volumeRef}
                className="w-20 h-1 bg-white/30 rounded-full cursor-pointer relative"
                onClick={handleVolumeChange}
              >
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Picture-in-Picture */}
            {document.pictureInPictureEnabled && (
              <button
                onClick={togglePictureInPicture}
                className="hover:scale-110 transition-transform duration-200"
                title="Picture-in-Picture"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2H3V4zM3 10h14V8H3v2zm0 4h14v-2H3v2z" />
                </svg>
              </button>
            )}

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="hover:scale-110 transition-transform duration-200"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 8a1 1 0 011.414 0L10 10.586l2.586-2.586A1 1 0 1113.414 8L11 10.414l2.586 2.586a1 1 0 01-1.414 1.414L10 11.586l-2.586 2.586A1 1 0 016 13.414L8.414 11 6 8.586A1 1 0 016 8z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zM15 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12a1 1 0 01-1-1zM9 13a1 1 0 011 1v4a1 1 0 011-1h4a1 1 0 010 2h-2.586l2.293 2.293a1 1 0 11-1.414 1.414L9 16.414V19a1 1 0 01-2 0v-4a1 1 0 011-1z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Complete example with images, videos, and 360 view
export function ProductGalleryCompleteExample() {
  const exampleImages = [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
  ];

  const exampleVideos: VideoData[] = [
    {
      id: 'iphone-screen-install',
      title: 'iPhone Screen Installation Guide',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ', // Replace with real repair video
      platform: 'youtube',
      duration: '12:34'
    },
    {
      id: 'samsung-back-glass',
      title: 'Samsung Back Glass Replacement',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
      videoId: 'jNQXAC9IVRw', // Replace with real repair video
      platform: 'youtube',
      duration: '18:45'
    }
  ];

  // Simulated 360-degree view (replace with real 360 photo sequence)
  const example360: ThreeSixtyData = {
    id: 'repair-tool-360',
    title: '360° Tool Inspection',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
    frames: [
      // In a real implementation, these would be 36-72 sequential 360-degree photos
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80',
      'https://images.unsplash.com/photo-1621905252472-943afaa20e20?w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-0052b335d6ae?w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80',
      'https://images.unsplash.com/photo-1621905252472-943afaa20e20?w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-0052b335d6ae?w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80'
    ],
    frameCount: 24
  };

  return (
    <ProductGallery
      images={exampleImages}
      videos={exampleVideos}
      threeSixty={example360}
      productName="Premium Repair Tool Kit"
      thumbnailPosition="bottom"
      showZoomHint={true}
    />
  );
}

// Example usage component with mixed images and videos
export function ProductGalleryWithVideosExample() {
  const exampleImages = [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
  ];

  const exampleVideos: VideoData[] = [
    {
      id: 'iphone-screen-install',
      title: 'iPhone Screen Installation Guide',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ', // Replace with real repair video
      platform: 'youtube',
      duration: '12:34'
    },
    {
      id: 'samsung-back-glass',
      title: 'Samsung Back Glass Replacement',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
      videoId: 'jNQXAC9IVRw', // Replace with real repair video
      platform: 'youtube',
      duration: '18:45'
    },
    {
      id: 'tool-demonstration',
      title: 'Premium Repair Tool Kit Demo',
      thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
      videoId: 'kJQP7kiw5Fk', // Replace with real tool demo
      platform: 'youtube',
      duration: '8:22'
    },
    {
      id: 'quality-testing',
      title: 'Quality Control & Testing Process',
      thumbnail: 'https://img.youtube.com/vi/y6120QOlsfU/maxresdefault.jpg',
      videoId: 'y6120QOlsfU', // Replace with real quality video
      platform: 'youtube',
      duration: '15:30'
    }
  ];

  return (
    <ProductGallery
      images={exampleImages}
      videos={exampleVideos}
      productName="Premium Repair Tool Kit"
      thumbnailPosition="bottom"
      showZoomHint={true}
    />
  );
}

// Legacy example for images only
export function ProductGalleryExample() {
  const exampleImages = [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
    'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&q=80'
  ];

  return (
    <ProductGallery
      images={exampleImages}
      productName="Premium Wireless Headphones"
      thumbnailPosition="bottom"
      showZoomHint={true}
    />
  );
}
