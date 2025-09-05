import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import styles from './StaggerList.module.css';

/**
 * StaggerList component for animating lists with staggered timing
 * @param {Object} props
 * @param {ReactNode} props.children - List items to animate
 * @param {number} props.staggerDelay - Delay between each item animation (in seconds)
 * @param {number} props.initialDelay - Initial delay before starting stagger (in seconds)
 * @param {string} props.animationType - Type of animation ('fade', 'slide', 'scale', 'bounce')
 * @param {string} props.direction - Animation direction for slide animations
 * @param {number} props.threshold - Intersection threshold (0-1)
 * @param {boolean} props.triggerOnce - Whether to trigger only once
 * @param {string} props.className - Additional CSS classes
 */
const StaggerList = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  animationType = 'fade',
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
      }, initialDelay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, initialDelay]);

  const childrenArray = React.Children.toArray(children);

  return (
    <div
      ref={ref}
      className={`${styles.staggerList} ${className}`}
      style={{
        '--stagger-delay': `${staggerDelay}s`,
        '--animation-type': animationType,
        '--direction': direction,
      }}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`${styles.staggerItem} ${isVisible ? styles.staggerItemVisible : ''}`}
          style={{
            animationDelay: `${initialDelay + (index * staggerDelay)}s`,
            '--item-index': index,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggerList;
