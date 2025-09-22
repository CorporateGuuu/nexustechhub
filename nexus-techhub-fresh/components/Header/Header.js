import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import PreOwnedModal from '../PreOwnedModal';
import Cart from '../Cart/Cart';
import styles from './Header.module.css';

// Lazy load SearchBar for better performance
const SearchBar = dynamic(() => import('../../../components/SearchBar'), {
  loading: () => (
    <div className={styles.searchContainer}>
      <div className={styles.searchPlaceholder}>
        <div className={styles.searchInput}></div>
        <div className={styles.searchButton}></div>
      </div>
    </div>
  ),
  ssr: false // Disable SSR for search component
});

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isPreOwnedModalOpen, setIsPreOwnedModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMouseEnter = (menuId) => {
    setActiveMegaMenu(menuId);
  };

  const handleMouseLeave = () => {
    setActiveMegaMenu(null);
  };

  // Navigation menu items - Simplified
  const menuItems = [
    {
      id: 1,
      title: 'Products',
      url: '/products',
      submenu: [
        {
          title: 'Apple',
          items: [
            { title: 'iPhone Parts', url: '/products/apple' },
            { title: 'iPad Parts', url: '/products/ipad' },
            { title: 'Mac Parts', url: '/products/mac' },
          ]
        },
        {
          title: 'Samsung',
          items: [
            { title: 'Galaxy Parts', url: '/products/samsung' },
          ]
        },
        {
          title: 'Tools',
          items: [
            { title: 'Repair Tools', url: '/products/tools' },
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Services',
      url: '/services',
    },
    {
      id: 3,
      title: 'Contact',
      url: '/contact',
    },
  ];

  return (
    <header className={styles.header} role="banner">
      <div className={styles.mainHeader}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/">
            <img
              src="/images/nexus-logo.svg"
              alt="Nexus Tech Hub"
              className={styles.logoImage}
              onError={(e) => e.target.src = '/images/logo-placeholder.svg'}
            />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Nexus Tech Hub</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} role="navigation" aria-label="Main navigation">
          <div className={styles.navList}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={styles.navItem}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={item.url} className={styles.navLink}>
                  {item.title}
                  {item.submenu && (
                    <svg className={styles.navArrow} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  )}
                </Link>

                {/* Mega Menu - Only render when active and limit items to reduce DOM size */}
                {item.submenu && activeMegaMenu === item.id && (
                  <div className={`${styles.megaMenu} ${styles.active}`}>
                    <div className={styles.megaMenuContent}>
                      {item.submenu.slice(0, 3).map((section, sectionIndex) => (
                        <div key={sectionIndex} className={styles.megaMenuColumn}>
                          <h3 className={styles.megaMenuTitle}>{section.title}</h3>
                          <div className={styles.megaMenuList}>
                            {section.items.slice(0, 5).map((subItem, subIndex) => (
                              <div key={subIndex}>
                                <Link href={subItem.url} className={styles.megaMenuLink}>
                                  {subItem.title}
                                  {subItem.count && <span className={styles.itemCount}>{subItem.count}</span>}
                                </Link>
                              </div>
                            ))}
                            {section.items.length > 5 && (
                              <div>
                                <Link href={item.url} className={styles.megaMenuLink}>
                                  View all {section.title.toLowerCase()} →
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Right Side Container */}
        <div className={styles.rightSide}>
        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <SearchBar
            placeholder="Search products..."
          />
        </div>

          {/* Header Actions */}
          <div className={styles.headerActions}>
            <Cart />

            <Link href="/account" className={styles.accountLink} aria-label="User account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Account</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileMenuHeader}>
            <div className={styles.mobileLogo}>
              <Link href="/">
                <img
                  src="/images/nexus-logo.svg"
                  alt="Nexus Tech Hub"
                  className={styles.mobileLogoImage}
                />
                <span className={styles.mobileLogoText}>Nexus Tech Hub</span>
              </Link>
            </div>
          </div>

          <div className={styles.mobileNav}>
            {menuItems.map((item) => (
              <div key={item.id} className={styles.mobileNavSection}>
                <Link href={item.url} className={styles.mobileNavMainLink} onClick={closeMobileMenu}>
                  {item.title}
                </Link>
                {item.submenu && (
                  <div className={styles.mobileNavSubmenu}>
                    {item.submenu.map((section, index) => (
                      <div key={index} className={styles.mobileNavSubsection}>
                        <h4 className={styles.mobileNavSubtitle}>{section.title}</h4>
                        <div className={styles.mobileNavSublist}>
                          {section.items.slice(0, 4).map((subItem, subIndex) => (
                            <div key={subIndex}>
                              <Link href={subItem.url}>
                                {subItem.title}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className={styles.mobileNavSection}>
              <Link href="/cart" className={styles.mobileNavMainLink} onClick={closeMobileMenu}>
                Cart
              </Link>
            </div>

            <div className={styles.mobileNavSection}>
              <Link href="/account" className={styles.mobileNavMainLink} onClick={closeMobileMenu}>
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Owned Devices Modal */}
      <PreOwnedModal
        isOpen={isPreOwnedModalOpen}
        onClose={() => setIsPreOwnedModalOpen(false)}
      />
    </header>
  );
};

export default Header;
