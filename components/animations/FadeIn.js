import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import styles from './FadeIn.module.css';

/**
 * FadeIn component for scroll-triggered fade-in animations
 * @param {Object} props
 * @param {ReactNode} props.children - Content to animate
 * @param {number} props.delay - Animation delay in seconds
 * @param {string} props.direction - Animation direction ('up', 'down', 'left', 'right')
 * @param {number} props.threshold - Intersection threshold (0-1)
 * @param {boolean} props.triggerOnce - Whether to trigger only once
 * @param {string} props.className - Additional CSS classes
 */
const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
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

  const animationClass = isVisible ? styles.fadeInVisible : styles.fadeInHidden;
  const directionClass = styles[`fadeIn${direction.charAt(0).toUpperCase() + direction.slice(1)}`];

  return (
    <div
      ref={ref}
      className={`${styles.fadeIn} ${animationClass} ${directionClass} ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeIn;
