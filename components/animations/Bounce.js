import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import styles from './Bounce.module.css';

/**
 * Bounce component for bouncing animations
 * @param {Object} props
 * @param {ReactNode} props.children - Content to animate
 * @param {number} props.delay - Animation delay in seconds
 * @param {number} props.duration - Animation duration in seconds
 * @param {number} props.height - Bounce height in pixels
 * @param {boolean} props.infinite - Whether animation should repeat infinitely
 * @param {number} props.threshold - Intersection threshold (0-1)
 * @param {boolean} props.triggerOnce - Whether to trigger only once
 * @param {string} props.className - Additional CSS classes
 */
const Bounce = ({
  children,
  delay = 0,
  duration = 1,
  height = 30,
  infinite = true,
  threshold = 0.1,
  triggerOnce = false,
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

  const animationClass = isVisible ? styles.bounceVisible : styles.bounceHidden;

  return (
    <div
      ref={ref}
      className={`${styles.bounce} ${animationClass} ${className}`}
      style={{
        '--bounce-height': `${height}px`,
        '--bounce-duration': `${duration}s`,
        '--bounce-timing': infinite ? 'infinite' : '1',
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Bounce;
