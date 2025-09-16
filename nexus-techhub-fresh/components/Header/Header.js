import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from '../../../components/SearchBar';
import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();

  // Navigation menu items
  const menuItems = [
    {
      id: 1,
      title: 'iPhone Parts',
      url: '/products/iphone-parts',
      submenu: [
        {
          title: 'By Model',
          items: [
            { title: 'iPhone 15 Series', url: '/products/iphone-15' },
            { title: 'iPhone 14 Series', url: '/products/iphone-14' },
            { title: 'iPhone 13 Series', url: '/products/iphone-13' },
            { title: 'iPhone 12 Series', url: '/products/iphone-12' },
          ]
        },
        {
          title: 'By Part Type',
          items: [
            { title: 'Screens & LCDs', url: '/products/iphone-screens' },
            { title: 'Batteries', url: '/products/iphone-batteries' },
            { title: 'Charging Ports', url: '/products/iphone-charging' },
            { title: 'Cameras', url: '/products/iphone-cameras' },
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Samsung Parts',
      url: '/products/samsung-parts',
      submenu: [
        {
          title: 'By Model',
          items: [
            { title: 'Galaxy S Series', url: '/products/galaxy-s' },
            { title: 'Galaxy Note Series', url: '/products/galaxy-note' },
            { title: 'Galaxy A Series', url: '/products/galaxy-a' },
          ]
        },
        {
          title: 'By Part Type',
          items: [
            { title: 'Screens & LCDs', url: '/products/samsung-screens' },
            { title: 'Batteries', url: '/products/samsung-batteries' },
            { title: 'Charging Ports', url: '/products/samsung-charging' },
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'iPad Parts',
      url: '/products/ipad-parts',
      submenu: [
        {
          title: 'By Model',
          items: [
            { title: 'iPad Pro', url: '/products/ipad-pro' },
            { title: 'iPad Air', url: '/products/ipad-air' },
            { title: 'iPad Mini', url: '/products/ipad-mini' },
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'Repair Tools',
      url: '/products/repair-tools',
      submenu: [
        {
          title: 'Tool Types',
          items: [
            { title: 'Tool Kits', url: '/products/tool-kits' },
            { title: 'Screwdrivers', url: '/products/screwdrivers' },
            { title: 'Heat Guns', url: '/products/heat-guns' },
          ]
        }
      ]
    }
  ];

  const toggleMobileMenu = () => {
    // For now, just log the action - can be enhanced later
    console.log('Mobile menu toggle clicked');
  };

  const handleMegaMenuHover = (id) => {
    // For now, just log the action - can be enhanced later
    console.log('Mega menu hover:', id);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/">
            <img 
              src="/images/nexus-logo.svg" 
              alt="Nexus Tech Hub"
              className={styles.logoImage}
            />
            <span className={styles.logoText}>Nexus Tech Hub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li 
                key={item.id}
                className={styles.navItem}
                onMouseEnter={() => handleMegaMenuHover(item.id)}
                onMouseLeave={() => handleMegaMenuHover(null)}
              >
                <Link
                  href={item.url}
                  className={router.asPath.includes(item.url) ? styles.active : ''}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            
            <li className={styles.navItem}>
              <Link href="/lcd-buyback">LCD Buyback</Link>
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <SearchBar />
        </div>

        {/* Header Actions */}
        <div className={styles.headerActions}>
          <Link href="/cart" className={styles.cartLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Cart</span>
          </Link>

          <Link href="/account" className={styles.accountLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Account</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={styles.mobileMenu}>
        <div className={styles.mobileMenuOverlay} onClick={toggleMobileMenu}></div>
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileMenuHeader}>
            <div className={styles.mobileLogo}>
              <Link href="/" onClick={toggleMobileMenu}>
                <img
                  src="/images/nexus-logo.svg"
                  alt="Nexus Tech Hub"
                  className={styles.mobileLogoImage}
                />
                <span className={styles.mobileLogoText}>Nexus Tech Hub</span>
              </Link>
            </div>
            <button
              className={styles.mobileMenuClose}
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className={styles.mobileNav}>
            {menuItems.map((item) => (
              <div key={item.id} className={styles.mobileNavSection}>
                <Link href={item.url} className={styles.mobileNavMainLink} onClick={toggleMobileMenu}>
                  {item.title}
                </Link>
                {item.submenu && (
                  <div className={styles.mobileNavSubmenu}>
                    {item.submenu.map((section, index) => (
                      <div key={index} className={styles.mobileNavSubsection}>
                        <h4 className={styles.mobileNavSubtitle}>{section.title}</h4>
                        <ul className={styles.mobileNavSublist}>
                          {section.items.slice(0, 4).map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link href={subItem.url} onClick={toggleMobileMenu}>
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className={styles.mobileNavSection}>
              <Link href="/lcd-buyback" className={styles.mobileNavMainLink} onClick={toggleMobileMenu}>
                LCD Buyback
              </Link>
            </div>

            <div className={styles.mobileNavSection}>
              <Link href="/cart" className={styles.mobileNavMainLink} onClick={toggleMobileMenu}>
                Cart
              </Link>
            </div>

            <div className={styles.mobileNavSection}>
              <Link href="/account" className={styles.mobileNavMainLink} onClick={toggleMobileMenu}>
                Account
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
