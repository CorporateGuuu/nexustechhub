import Image from 'next/image';
import { useState } from 'react';
import styles from './OptimizedImage.module.css';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
  loading = 'lazy',
  unoptimized = false,
  onLoad,
  onError,
  fallbackSrc = '/images/placeholder.jpg',
  showLoadingSpinner = true,
  ...props
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);

  // Generate blur data URL if not provided
  const defaultBlurDataURL = blurDataURL || generateBlurDataURL();

  const handleLoad = (event) => {
    setImageLoading(false);
    if (onLoad) onLoad(event);
  };

  const handleError = (event) => {
    setImageError(true);
    setImageLoading(false);
    setImageSrc(fallbackSrc);
    if (onError) onError(event);
  };

  const imageProps = {
    src: imageSrc,
    alt: alt || 'Nexus TechHub Image',
    quality,
    priority,
    loading: priority ? 'eager' : loading,
    placeholder: placeholder === 'blur' ? 'blur' : 'empty',
    blurDataURL: placeholder === 'blur' ? defaultBlurDataURL : undefined,
    sizes: !fill ? sizes : undefined,
    unoptimized,
    onLoad: handleLoad,
    onError: handleError,
    className: `${styles.optimizedImage} ${className} ${imageLoading ? styles.loading : ''} ${imageError ? styles.error : ''}`,
    ...props
  };

  if (fill) {
    imageProps.fill = true;
    imageProps.style = {
      objectFit,
      objectPosition,
      ...props.style
    };
  } else {
    imageProps.width = width;
    imageProps.height = height;
  }

  return (
    <div className={`${styles.imageContainer} ${fill ? styles.fillContainer : ''}`}>
      {showLoadingSpinner && imageLoading && (
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
        </div>
      )}

      <Image {...imageProps} />

      {imageError && (
        <div className={styles.errorOverlay}>
          <div className={styles.errorIcon}>📷</div>
          <span className={styles.errorText}>Image unavailable</span>
        </div>
      )}
    </div>
  );
}

// Product Image Component with specific optimizations
export function ProductImage({
  product,
  width = 300,
  height = 300,
  priority = false,
  className = '',
  showBadge = true,
  ...props
}) {
  const alt = `${product.name} - ${product.brand || 'Nexus TechHub'} - SKU: ${product.sku}`;

  return (
    <div className={`${styles.productImageContainer} ${className}`}>
      <OptimizedImage
        src={product.image}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={90}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
        className={styles.productImage}
        {...props}
      />

      {showBadge && product.inStock && (
        <div className={styles.stockBadge}>
          <span>In Stock</span>
        </div>
      )}

      {showBadge && !product.inStock && (
        <div className={styles.outOfStockBadge}>
          <span>Out of Stock</span>
        </div>
      )}

      {showBadge && product.featured && (
        <div className={styles.featuredBadge}>
          <span>Featured</span>
        </div>
      )}
    </div>
  );
}

// Hero Image Component
export function HeroImage({
  src,
  alt,
  className = '',
  overlay = true,
  overlayOpacity = 0.4,
  children,
  ...props
}) {
  return (
    <div className={`${styles.heroContainer} ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority
        quality={95}
        objectFit="cover"
        objectPosition="center"
        sizes="100vw"
        className={styles.heroImage}
        {...props}
      />

      {overlay && (
        <div
          className={styles.heroOverlay}
          style={{ opacity: overlayOpacity }}
        />
      )}

      {children && (
        <div className={styles.heroContent}>
          {children}
        </div>
      )}
    </div>
  );
}

// Logo Component with optimizations
export function LogoImage({
  width = 150,
  height = 60,
  priority = true,
  className = '',
  ...props
}) {
  return (
    <OptimizedImage
      src="/images/nexus-logo.svg"
      alt="Nexus TechHub Logo - Professional Mobile Repair Parts UAE"
      width={width}
      height={height}
      priority={priority}
      quality={100}
      className={`${styles.logo} ${className}`}
      placeholder="empty"
      {...props}
    />
  );
}

// Gallery Image Component
export function GalleryImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  onClick,
  index,
  ...props
}) {
  return (
    <div
      className={`${styles.galleryImageContainer} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(index) : undefined}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={85}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className={styles.galleryImage}
        {...props}
      />

      {onClick && (
        <div className={styles.galleryOverlay}>
          <div className={styles.zoomIcon}>🔍</div>
        </div>
      )}
    </div>
  );
}

// Utility function to generate blur data URL
function generateBlurDataURL(width = 10, height = 10) {
  const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    // Fallback for SSR
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Create a simple gradient blur
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.1);
}
