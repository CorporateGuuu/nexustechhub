import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Breadcrumb.module.css';

const Breadcrumb = ({ customItems = null }) => {
  const router = useRouter();
  
  // Generate breadcrumb items from current path
  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = router.asPath.split('/').filter(segment => segment);
    const breadcrumbs = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Clean up segment for display
      let label = segment
        .replace(/-/g, ' ')
        .replace(/\?.*/, '') // Remove query parameters
        .replace(/%20/g, ' ') // Replace URL encoding
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Special cases for common routes
      if (segment === 'products') {
        label = 'Products';
      } else if (segment === 'lcd-buyback') {
        label = 'LCD Buyback';
      } else if (segment === 'gapp') {
        label = 'Apple Parts Program';
      } else if (segment === 'auth') {
        label = 'Account';
      } else if (segment === 'signin') {
        label = 'Sign In';
      } else if (segment === 'register') {
        label = 'Register';
      } else if (segment === 'user') {
        label = 'My Account';
      } else if (segment === 'cart') {
        label = 'Shopping Cart';
      } else if (segment === 'checkout') {
        label = 'Checkout';
      }

      breadcrumbs.push({
        label,
        href: currentPath,
        isLast: index === pathSegments.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (router.pathname === '/') {
    return null;
  }

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <div className={styles.container}>
        <ol className={styles.breadcrumbList}>
          {breadcrumbs.map((item, index) => (
            <li key={index} className={styles.breadcrumbItem}>
              {item.isLast ? (
                <span className={styles.currentPage} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className={styles.breadcrumbLink}>
                    {item.label}
                  </Link>
                  <svg 
                    className={styles.separator} 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
