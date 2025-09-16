import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {

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
            { title: 'iPhone 16 Series', url: '/products/iphone-16', count: '12+' },
            { title: 'iPhone 15 Series', url: '/products/iphone-15', count: '15+' },
            { title: 'iPhone 14 Series', url: '/products/iphone-14', count: '18+' },
            { title: 'iPhone 13 Series', url: '/products/iphone-13', count: '20+' },
          ]
        },
        {
          title: 'By Part Type',
          items: [
            { title: 'Screens & LCDs', url: '/products/iphone-screens', count: '50+' },
            { title: 'Batteries', url: '/products/iphone-batteries', count: '25+' },
            { title: 'Charging Ports', url: '/products/iphone-charging', count: '30+' },
            { title: 'Cameras', url: '/products/iphone-cameras', count: '15+' },
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
            { title: 'Galaxy S24 Series', url: '/products/galaxy-s24', count: '8+' },
            { title: 'Galaxy S23 Series', url: '/products/galaxy-s23', count: '12+' },
            { title: 'Galaxy A Series', url: '/products/galaxy-a', count: '25+' },
            { title: 'Galaxy Z Fold', url: '/products/galaxy-z-fold', count: '6+' },
          ]
        },
        {
          title: 'By Part Type',
          items: [
            { title: 'Screens & LCDs', url: '/products/samsung-screens', count: '60+' },
            { title: 'Batteries', url: '/products/samsung-batteries', count: '35+' },
            { title: 'Charging Ports', url: '/products/samsung-charging', count: '25+' },
            { title: 'S Pen', url: '/products/samsung-s-pen', count: '8+' },
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
            { title: 'iPad Pro 12.9"', url: '/products/ipad-pro-12-9', count: '6+' },
            { title: 'iPad Pro 11"', url: '/products/ipad-pro-11', count: '4+' },
            { title: 'iPad Air', url: '/products/ipad-air', count: '8+' },
            { title: 'iPad Mini', url: '/products/ipad-mini', count: '5+' },
          ]
        },
        {
          title: 'By Part Type',
          items: [
            { title: 'Screens & LCDs', url: '/products/ipad-screens', count: '20+' },
            { title: 'Batteries', url: '/products/ipad-batteries', count: '15+' },
            { title: 'Charging Ports', url: '/products/ipad-charging', count: '12+' },
            { title: 'Home Buttons', url: '/products/ipad-home-buttons', count: '8+' },
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
          title: 'Tool Kits',
          items: [
            { title: 'Complete Toolkits', url: '/products/tool-kits', count: '5+' },
            { title: 'Precision Sets', url: '/products/precision-tools', count: '8+' },
            { title: 'Essential Kits', url: '/products/essential-kits', count: '3+' },
          ]
        },
        {
          title: 'Specialized Tools',
          items: [
            { title: 'Screwdrivers', url: '/products/screwdrivers', count: '15+' },
            { title: 'Heat Guns', url: '/products/heat-guns', count: '6+' },
            { title: 'Multimeters', url: '/products/multimeters', count: '4+' },
            { title: 'Microscopes', url: '/products/microscopes', count: '3+' },
          ]
        }
      ]
    },
    {
      id: 5,
      title: 'Services',
      url: '/services',
      submenu: [
        {
          title: 'Business Services',
          items: [
            { title: 'Bulk Ordering', url: '/services/bulk-ordering', count: '' },
            { title: 'Custom Orders', url: '/services/custom-orders', count: '' },
            { title: 'Technical Support', url: '/services/support', count: '' },
          ]
        },
        {
          title: 'Other Services',
          items: [
            { title: 'LCD Buyback', url: '/lcd-buyback', count: '' },
            { title: 'Repair Training', url: '/services/training', count: '' },
            { title: 'Warranty Claims', url: '/services/warranty', count: '' },
          ]
        }
      ]
    }
  ];



  return (
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topBarContent}>
            <div className={styles.contactInfo}>
              <span>+971 58 553 1029</span>
              <span>sales@nexustechhub.com</span>
            </div>
            <div className={styles.topBarLinks}>
              <Link href="/lcd-buyback">LCD Buyback</Link>
              <Link href="/services">Services</Link>
              <Link href="/support">Support</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
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
                <span className={styles.logoSubtitle}>Wholesale Parts</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              {menuItems.map((item) => (
                <li key={item.id} className={styles.navItem}>
                  <Link href={item.url} className={styles.navLink}>
                    {item.title}
                    {item.submenu && (
                      <svg className={styles.navArrow} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {item.submenu && (
                    <div className={styles.megaMenu}>
                      <div className={styles.megaMenuContent}>
                        {item.submenu.map((section, sectionIndex) => (
                          <div key={sectionIndex} className={styles.megaMenuColumn}>
                            <h3 className={styles.megaMenuTitle}>{section.title}</h3>
                            <ul className={styles.megaMenuList}>
                              {section.items.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <Link href={subItem.url} className={styles.megaMenuLink}>
                                    {subItem.title}
                                    {subItem.count && <span className={styles.itemCount}>{subItem.count}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <form className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search products..."
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </button>
            </form>
          </div>

          {/* Header Actions */}
          <div className={styles.headerActions}>
            <Link href="/cart" className={styles.cartLink}>
              <div className={styles.cartIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
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
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Static for now */}
      <div className={styles.mobileMenu}>
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
                <Link href={item.url} className={styles.mobileNavMainLink}>
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
              <Link href="/cart" className={styles.mobileNavMainLink}>
                Cart
              </Link>
            </div>

            <div className={styles.mobileNavSection}>
              <Link href="/account" className={styles.mobileNavMainLink}>
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
