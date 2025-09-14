import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './SideMenu.module.css';

const SideMenu = ({ onItemClick }) => {
  const router = useRouter();

  // Define simplified menu items
  const menuItems = [
    {
      id: 1,
      title: 'iPhone Parts',
      url: '/categories/iphone-parts',
      submenu: [
        { title: 'iPhone 15 Series', url: '/categories/iphone-parts?model=iphone-15' },
        { title: 'iPhone 14 Series', url: '/categories/iphone-parts?model=iphone-14' },
        { title: 'Screens & LCDs', url: '/categories/iphone-parts?type=screens' },
        { title: 'Batteries', url: '/categories/iphone-parts?type=batteries' },
      ]
    },
    {
      id: 2,
      title: 'Samsung Parts',
      url: '/categories/samsung-parts',
      submenu: [
        { title: 'Galaxy S Series', url: '/categories/samsung-parts?model=galaxy-s' },
        { title: 'Galaxy Note Series', url: '/categories/samsung-parts?model=galaxy-note' },
        { title: 'Screens & LCDs', url: '/categories/samsung-parts?type=screens' },
        { title: 'Batteries', url: '/categories/samsung-parts?type=batteries' },
      ]
    },
    {
      id: 3,
      title: 'iPad Parts',
      url: '/categories/ipad-parts',
      submenu: [
        { title: 'iPad Pro', url: '/categories/ipad-parts?model=ipad-pro' },
        { title: 'iPad Air', url: '/categories/ipad-parts?model=ipad-air' },
        { title: 'Screens & LCDs', url: '/categories/ipad-parts?type=screens' },
      ]
    },
    {
      id: 4,
      title: 'Repair Tools',
      url: '/categories/repair-tools',
      submenu: [
        { title: 'Tool Kits', url: '/categories/repair-tools?type=tool-kits' },
        { title: 'Screwdrivers', url: '/categories/repair-tools?type=screwdrivers' },
      ]
    },
  ];

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div className={styles.sideMenu}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <Link
                href={item.url}
                className={router.asPath.includes(item.url) ? styles.active : ''}
                onClick={handleItemClick}
              >
                {item.title}
              </Link>
              {item.submenu && (
                <ul className={styles.submenu}>
                  {item.submenu.map((subItem, index) => (
                    <li key={index} className={styles.subItem}>
                      <Link href={subItem.url} onClick={handleItemClick}>{subItem.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className={styles.navItem}>
            <Link href="/lcd-buyback" className={router.pathname === '/lcd-buyback' ? styles.active : ''} onClick={handleItemClick}>
              LCD Buyback
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/gapp" className={router.pathname === '/gapp' ? styles.active : ''} onClick={handleItemClick}>
              Apple Parts Program
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
