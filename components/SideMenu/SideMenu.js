import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './SideMenu.module.css';

const SideMenu = () => {
  const router = useRouter();

  // Define simplified menu items
  const menuItems = [
    {
      id: 1,
      title: 'iPhone Parts',
      url: '/products?category=iphone-parts',
      submenu: [
        { title: 'iPhone 15 Series', url: '/products?category=iphone-parts&subcategory=iphone-parts/iphone-15' },
        { title: 'iPhone 14 Series', url: '/products?category=iphone-parts&subcategory=iphone-parts/iphone-14' },
        { title: 'Screens & LCDs', url: '/products?category=iphone-parts&subcategory=iphone-parts/screens' },
        { title: 'Batteries', url: '/products?category=iphone-parts&subcategory=iphone-parts/batteries' },
      ]
    },
    {
      id: 2,
      title: 'Samsung Parts',
      url: '/products?category=samsung-parts',
      submenu: [
        { title: 'Galaxy S Series', url: '/products?category=samsung-parts&subcategory=samsung-parts/galaxy-s' },
        { title: 'Galaxy Note Series', url: '/products?category=samsung-parts&subcategory=samsung-parts/galaxy-note' },
        { title: 'Screens & LCDs', url: '/products?category=samsung-parts&subcategory=samsung-parts/screens' },
        { title: 'Batteries', url: '/products?category=samsung-parts&subcategory=samsung-parts/batteries' },
      ]
    },
    {
      id: 3,
      title: 'iPad Parts',
      url: '/products?category=ipad-parts',
      submenu: [
        { title: 'iPad Pro', url: '/products?category=ipad-parts&subcategory=ipad-parts/ipad-pro' },
        { title: 'iPad Air', url: '/products?category=ipad-parts&subcategory=ipad-parts/ipad-air' },
        { title: 'Screens & LCDs', url: '/products?category=ipad-parts&subcategory=ipad-parts/screens' },
      ]
    },
    {
      id: 4,
      title: 'Repair Tools',
      url: '/products?category=repair-tools',
      submenu: [
        { title: 'Tool Kits', url: '/products?category=repair-tools&subcategory=repair-tools/tool-kits' },
        { title: 'Screwdrivers', url: '/products?category=repair-tools&subcategory=repair-tools/screwdrivers' },
      ]
    },
  ];

  return (
    <div className={styles.sideMenu}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <Link
                href={item.url}
                className={router.asPath.includes(item.url) ? styles.active : ''}
              >
                {item.title}
              </Link>
              {item.submenu && (
                <ul className={styles.submenu}>
                  {item.submenu.map((subItem, index) => (
                    <li key={index} className={styles.subItem}>
                      <Link href={subItem.url}>{subItem.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className={styles.navItem}>
            <Link href="/lcd-buyback" className={router.pathname === '/lcd-buyback' ? styles.active : ''}>
              LCD Buyback
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/gapp" className={router.pathname === '/gapp' ? styles.active : ''}>
              Apple Parts Program
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
