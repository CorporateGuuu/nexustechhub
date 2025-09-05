import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import styles from './SlideIn.module.css';

/**
 * SlideIn component for scroll-triggered slide-in animations
 * @param {Object} props
 * @param {ReactNode} props.children - Content to animate
 * @param {number} props.delay - Animation delay in seconds
 * @param {string} props.direction - Animation direction ('left', 'right', 'up', 'down')
 * @param {number} props.distance - Distance to slide from (in pixels)
 * @param {number} props.threshold - Intersection threshold (0-1)
 * @param {boolean} props.triggerOnce - Whether to trigger only once
 * @param {string} props.className - Additional CSS classes
 */
const SlideIn = ({
  children,
  delay = 0,
  direction = 'left',
  distance = 50,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce,
    rootMargin: '50px',
  });

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, delay]);

  const animationClass = isVisible ? styles.slideInVisible : styles.slideInHidden;
  const directionClass = styles[`slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)}`];

  return (
    <div
      ref={ref}
      className={`${styles.slideIn} ${animationClass} ${directionClass} ${className}`}
      style={{
        '--slide-distance': `${distance}px`,
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default SlideIn;
