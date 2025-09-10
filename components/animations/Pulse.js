import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import styles from './Pulse.module.css';

/**
 * Pulse component for pulsing animations
 * @param {Object} props
 * @param {ReactNode} props.children - Content to animate
 * @param {number} props.delay - Animation delay in seconds
 * @param {number} props.duration - Animation duration in seconds
 * @param {number} props.scale - Scale factor for pulse (default: 1.05)
 * @param {boolean} props.infinite - Whether animation should repeat infinitely
 * @param {number} props.threshold - Intersection threshold (0-1)
 * @param {boolean} props.triggerOnce - Whether to trigger only once
 * @param {string} props.className - Additional CSS classes
 */
const Pulse = ({
  children,
  delay = 0,
  duration = 2,
  scale = 1.05,
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

  const animationClass = isVisible ? styles.pulseVisible : styles.pulseHidden;

  return (
    <div
      ref={ref}
      className={`${styles.pulse} ${animationClass} ${className}`}
      style={{
        '--pulse-scale': scale,
        '--pulse-duration': `${duration}s`,
        '--pulse-timing': infinite ? 'infinite' : '1',
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Pulse;
