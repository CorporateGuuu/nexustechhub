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

  // Navigation menu items
  const menuItems = [
    {
      id: 1,
      title: 'Apple',
      url: '/products/apple',
      submenu: [
        {
          title: 'iPhone',
          items: [
            { title: 'iPhone 17 Air', url: '/products/apple/iphone-17-air' },
            { title: 'iPhone 17 Pro Max', url: '/products/apple/iphone-17-pro-max' },
            { title: 'iPhone 17 Pro', url: '/products/apple/iphone-17-pro' },
            { title: 'iPhone 17', url: '/products/apple/iphone-17' },
            { title: 'iPhone 16e', url: '/products/apple/iphone-16e' },
            { title: 'iPhone 16 Pro Max', url: '/products/apple/iphone-16-pro-max' },
            { title: 'View all models', url: '/products/apple/iphone' },
          ]
        },
        {
          title: 'iPad',
          items: [
            { title: 'iPad Pro 13" 7th Gen (2024)', url: '/products/apple/ipad-pro-13-7th-gen' },
            { title: 'iPad Pro 12.9" 6th Gen (2022)', url: '/products/apple/ipad-pro-12-9-6th-gen' },
            { title: 'iPad Pro 12.9" 5th Gen (2021)', url: '/products/apple/ipad-pro-12-9-5th-gen' },
            { title: 'iPad Pro 12.9" 4th Gen (2020)', url: '/products/apple/ipad-pro-12-9-4th-gen' },
            { title: 'iPad Pro 12.9" 3rd Gen (2018)', url: '/products/apple/ipad-pro-12-9-3rd-gen' },
            { title: 'View all models', url: '/products/apple/ipad' },
          ]
        },
        {
          title: 'Watch',
          items: [
            { title: 'Series 9 (45MM)', url: '/products/apple/watch-series-9-45mm' },
            { title: 'Series 9 (41MM)', url: '/products/apple/watch-series-9-41mm' },
            { title: 'Series Ultra (2nd Gen) (49MM)', url: '/products/apple/watch-ultra-2nd-gen' },
            { title: 'Series Ultra (1st Gen) (49MM)', url: '/products/apple/watch-ultra-1st-gen' },
            { title: 'Series 8 (45MM)', url: '/products/apple/watch-series-8-45mm' },
            { title: 'View all models', url: '/products/apple/watch' },
          ]
        },
        {
          title: 'iPod',
          items: [
            { title: 'iPod Touch 7', url: '/products/apple/ipod-touch-7' },
            { title: 'iPod Touch 6', url: '/products/apple/ipod-touch-6' },
            { title: 'iPod Touch 5', url: '/products/apple/ipod-touch-5' },
            { title: 'iPod Touch 4', url: '/products/apple/ipod-touch-4' },
            { title: 'iPod Nano 7', url: '/products/apple/ipod-nano-7' },
            { title: 'View all models', url: '/products/apple/ipod' },
          ]
        },
        {
          title: 'AirPods',
          items: [
            { title: 'AirPods Pro 1st Gen (2019)', url: '/products/apple/airpods-pro-1st-gen' },
            { title: 'AirPods Pro 2nd Gen (2022)', url: '/products/apple/airpods-pro-2nd-gen' },
            { title: 'AirPods 3rd Gen (2021)', url: '/products/apple/airpods-3rd-gen' },
            { title: 'AirPods 2nd Gen (2019)', url: '/products/apple/airpods-2nd-gen' },
            { title: 'AirPods 1st Gen (2016)', url: '/products/apple/airpods-1st-gen' },
            { title: 'AirPods Max 1st Gen (2020)', url: '/products/apple/airpods-max-1st-gen' },
          ]
        },
        {
          title: 'iMac',
          items: [
            { title: 'iMac 27" (A2115)', url: '/products/apple/imac-27-a2115' },
            { title: 'iMac 27" (A1862)', url: '/products/apple/imac-27-a1862' },
            { title: 'iMac 27" (A1419)', url: '/products/apple/imac-27-a1419' },
            { title: 'iMac 21.5" (A1418)', url: '/products/apple/imac-21-5-a1418' },
            { title: 'iMac 24" (A2438)', url: '/products/apple/imac-24-a2438' },
          ]
        },
        {
          title: 'MacBook Pro',
          items: [
            { title: 'Pro 16" (A2991)', url: '/products/apple/macbook-pro-16-a2991' },
            { title: 'Pro 16" (A2780)', url: '/products/apple/macbook-pro-16-a2780' },
            { title: 'Pro 16" (A2485)', url: '/products/apple/macbook-pro-16-a2485' },
            { title: 'Pro 16" (A2141)', url: '/products/apple/macbook-pro-16-a2141' },
            { title: 'Pro 15" (A1260)', url: '/products/apple/macbook-pro-15-a1260' },
            { title: 'View all models', url: '/products/apple/macbook-pro' },
          ]
        },
        {
          title: 'MacBook Air',
          items: [
            { title: 'Air 15" (A2941)', url: '/products/apple/macbook-air-15-a2941' },
            { title: 'Air 13" (A3113)', url: '/products/apple/macbook-air-13-a3113' },
            { title: 'Air 13" (A2681)', url: '/products/apple/macbook-air-13-a2681' },
            { title: 'Air 13" (A2337)', url: '/products/apple/macbook-air-13-a2337' },
            { title: 'Air 13" (A2179)', url: '/products/apple/macbook-air-13-a2179' },
            { title: 'View all models', url: '/products/apple/macbook-air' },
          ]
        },
        {
          title: 'MacBook',
          items: [
            { title: '13" (A1181)', url: '/products/apple/macbook-13-a1181' },
            { title: 'Retina 12" (A1534)', url: '/products/apple/macbook-retina-12-a1534' },
            { title: 'Unibody 13" (A1342)', url: '/products/apple/macbook-unibody-13-a1342' },
            { title: 'Unibody 13" (A1278)', url: '/products/apple/macbook-unibody-13-a1278' },
          ]
        },
        {
          title: 'Apollo SSDs',
          items: [
            { title: 'Apollo 2.5 PC SSD', url: '/products/apple/apollo-2-5-pc-ssd' },
            { title: 'Apollo S1 Mac SSD', url: '/products/apple/apollo-s1-mac-ssd' },
            { title: 'Apollo S2 Mac SSD', url: '/products/apple/apollo-s2-mac-ssd' },
            { title: 'Apollo S3 Mac SSD', url: '/products/apple/apollo-s3-mac-ssd' },
            { title: 'Apollo S3 Plus Mac SSD', url: '/products/apple/apollo-s3-plus-mac-ssd' },
            { title: 'View all models', url: '/products/apple/apollo-ssds' },
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Samsung',
      url: '/products/samsung',
      submenu: [
        {
          title: 'S Series',
          items: [
            { title: 'Galaxy S25 Edge', url: '/products/samsung/galaxy-s25-edge' },
            { title: 'Galaxy S25 Ultra', url: '/products/samsung/galaxy-s25-ultra' },
            { title: 'Galaxy S25 Plus', url: '/products/samsung/galaxy-s25-plus' },
            { title: 'Galaxy S25', url: '/products/samsung/galaxy-s25' },
            { title: 'Galaxy S24 Ultra', url: '/products/samsung/galaxy-s24-ultra' },
            { title: 'Galaxy S24+', url: '/products/samsung/galaxy-s24-plus' },
            { title: 'Galaxy S24', url: '/products/samsung/galaxy-s24' },
            { title: 'Galaxy S23 Ultra', url: '/products/samsung/galaxy-s23-ultra' },
            { title: 'Galaxy S23+', url: '/products/samsung/galaxy-s23-plus' },
            { title: 'Galaxy S23', url: '/products/samsung/galaxy-s23' },
            { title: 'View all models', url: '/products/samsung/s-series' },
          ]
        },
        {
          title: 'Note Series',
          items: [
            { title: 'Galaxy Note 20 Ultra', url: '/products/samsung/galaxy-note-20-ultra' },
            { title: 'Galaxy Note 20', url: '/products/samsung/galaxy-note-20' },
            { title: 'Galaxy Note 10 Plus', url: '/products/samsung/galaxy-note-10-plus' },
            { title: 'Galaxy Note 10 Lite', url: '/products/samsung/galaxy-note-10-lite' },
            { title: 'Galaxy Note 10', url: '/products/samsung/galaxy-note-10' },
            { title: 'View all models', url: '/products/samsung/note-series' },
          ]
        },
        {
          title: 'A Series',
          items: [
            { title: 'A90 5G (A908 /2019)', url: '/products/samsung/a90-5g' },
            { title: 'A9 Pro (A910 / 2016)', url: '/products/samsung/a9-pro' },
            { title: 'A9 (A920 / 2018)', url: '/products/samsung/a9' },
            { title: 'A80 (A805 / 2019)', url: '/products/samsung/a80' },
            { title: 'A8 Plus (A730 / 2018)', url: '/products/samsung/a8-plus' },
            { title: 'View all models', url: '/products/samsung/a-series' },
          ]
        },
        {
          title: 'Z Series',
          items: [
            { title: 'Galaxy Z Fold 5', url: '/products/samsung/galaxy-z-fold-5' },
            { title: 'Galaxy Z Flip 5', url: '/products/samsung/galaxy-z-flip-5' },
            { title: 'Galaxy Z Fold 4', url: '/products/samsung/galaxy-z-fold-4' },
            { title: 'Galaxy Z Flip 4', url: '/products/samsung/galaxy-z-flip-4' },
            { title: 'View all models', url: '/products/samsung/z-series' },
          ]
        },
        {
          title: 'J Series',
          items: [
            { title: 'J8 Plus (J805 / 2018)', url: '/products/samsung/j8-plus' },
            { title: 'J8 (J810 / 2018)', url: '/products/samsung/j8' },
            { title: 'J7 Refine (J737 / 2018)', url: '/products/samsung/j7-refine' },
            { title: 'J7 Pro (J730 / 2017)', url: '/products/samsung/j7-pro' },
            { title: 'J7 Prime (G610 / 2016)', url: '/products/samsung/j7-prime' },
            { title: 'View all models', url: '/products/samsung/j-series' },
          ]
        },
        {
          title: 'Tab A Series',
          items: [
            { title: 'Tab A9 Plus 11.0" (2023)', url: '/products/samsung/tab-a9-plus-11-0' },
            { title: 'Tab A9 8.7" (2023)', url: '/products/samsung/tab-a9-8-7' },
            { title: 'Tab A8 10.5" (2021)', url: '/products/samsung/tab-a8-10-5' },
            { title: 'Tab A7 Lite 8.7" (2021)', url: '/products/samsung/tab-a7-lite-8-7' },
            { title: 'Tab A7 10.4" (2020)', url: '/products/samsung/tab-a7-10-4' },
            { title: 'View all models', url: '/products/samsung/tab-a-series' },
          ]
        },
        {
          title: 'Tab S Series',
          items: [
            { title: 'Tab S9 FE Plus 12.4" (2023)', url: '/products/samsung/tab-s9-fe-plus-12-4' },
            { title: 'Tab S9 FE 10.9" (2023)', url: '/products/samsung/tab-s9-fe-10-9' },
            { title: 'Tab S9 Ultra 14.6" (2023)', url: '/products/samsung/tab-s9-ultra-14-6' },
            { title: 'Tab S9 Plus 12.4" (2023)', url: '/products/samsung/tab-s9-plus-12-4' },
            { title: 'Tab S9 11" (2023)', url: '/products/samsung/tab-s9-11' },
            { title: 'View all models', url: '/products/samsung/tab-s-series' },
          ]
        },
        {
          title: 'Tab Active Series',
          items: [
            { title: 'Galaxy Tab Active 4 Pro', url: '/products/samsung/galaxy-tab-active-4-pro' },
            { title: 'Galaxy Tab Active 3', url: '/products/samsung/galaxy-tab-active-3' },
            { title: 'Galaxy Tab Active 2', url: '/products/samsung/galaxy-tab-active-2' },
            { title: 'View all models', url: '/products/samsung/tab-active-series' },
          ]
        },
        {
          title: 'Tab Note Series',
          items: [
            { title: 'Note Pro 12.2"', url: '/products/samsung/note-pro-12-2' },
            { title: 'Note 10.1"', url: '/products/samsung/note-10-1' },
            { title: 'Note 8.0"', url: '/products/samsung/note-8-0' },
            { title: 'Note 10.1" (2012)', url: '/products/samsung/note-10-1-2012' },
          ]
        },
        {
          title: 'Tab Series',
          items: [
            { title: 'Tab 3 Lite 7.0 VE (2015)', url: '/products/samsung/tab-3-lite-7-0-ve' },
            { title: 'Tab 4 10.1" (2014)', url: '/products/samsung/tab-4-10-1' },
            { title: 'Tab 4 8.0" (2014)', url: '/products/samsung/tab-4-8-0' },
            { title: 'Tab 4 7.0" (2014)', url: '/products/samsung/tab-4-7-0' },
            { title: 'Tab 3 Lite (2014)', url: '/products/samsung/tab-3-lite' },
            { title: 'View all models', url: '/products/samsung/tab-series' },
          ]
        },
        {
          title: 'XCover Series',
          items: [
            { title: 'Galaxy XCover7 Pro', url: '/products/samsung/galaxy-xcover7-pro' },
            { title: 'Galaxy XCover 7', url: '/products/samsung/galaxy-xcover-7' },
            { title: 'Galaxy XCover 6 Pro', url: '/products/samsung/galaxy-xcover-6-pro' },
            { title: 'Galaxy XCover 5', url: '/products/samsung/galaxy-xcover-5' },
            { title: 'Galaxy XCover 4s', url: '/products/samsung/galaxy-xcover-4s' },
            { title: 'Galaxy XCover 4', url: '/products/samsung/galaxy-xcover-4' },
            { title: 'View all models', url: '/products/samsung/xcover-series' },
          ]
        },
        {
          title: 'Watch Series',
          items: [
            { title: 'Watch 6 Classic (47MM)', url: '/products/samsung/watch-6-classic-47mm' },
            { title: 'Watch 6 Classic (43MM)', url: '/products/samsung/watch-6-classic-43mm' },
            { title: 'Watch 6 (44MM)', url: '/products/samsung/watch-6-44mm' },
            { title: 'Watch 6 (40MM)', url: '/products/samsung/watch-6-40mm' },
            { title: 'Watch 5 (40MM)', url: '/products/samsung/watch-5-40mm' },
            { title: 'Watch 4 Classic (46MM)', url: '/products/samsung/watch-4-classic-46mm' },
            { title: 'Watch 4 (40MM)', url: '/products/samsung/watch-4-40mm' },
            { title: 'Watch 3 (45MM)', url: '/products/samsung/watch-3-45mm' },
            { title: 'Watch 3 (41MM)', url: '/products/samsung/watch-3-41mm' },
            { title: 'Watch Active 2 (44MM)', url: '/products/samsung/watch-active-2-44mm' },
            { title: 'Watch Active 2 (40MM)', url: '/products/samsung/watch-active-2-40mm' },
            { title: 'Gear S3 Classic (46MM)', url: '/products/samsung/gear-s3-classic-46mm' },
            { title: 'Gear S3 Frontier (46MM)', url: '/products/samsung/gear-s3-frontier-46mm' },
            { title: 'View all models', url: '/products/samsung/watch-series' },
          ]
        },
        {
          title: 'Mega Series',
          items: [
            { title: 'Galaxy Mega 6.3', url: '/products/samsung/galaxy-mega-6-3' },
            { title: 'Galaxy Mega 5.8', url: '/products/samsung/galaxy-mega-5-8' },
            { title: 'View all models', url: '/products/samsung/mega-series' },
          ]
        },
        {
          title: 'M Series',
          items: [
            { title: 'M54 (M546 / 2023)', url: '/products/samsung/m54' },
            { title: 'M53 5G (M536 / 2022)', url: '/products/samsung/m53-5g' },
            { title: 'M52 5G (M526 / 2021)', url: '/products/samsung/m52-5g' },
            { title: 'M51 (M515 / 2020)', url: '/products/samsung/m51' },
            { title: 'M40 (M405 / 2019)', url: '/products/samsung/m40' },
            { title: 'View all models', url: '/products/samsung/m-series' },
          ]
        },
        {
          title: 'Core Series',
          items: [
            { title: 'Galaxy Core Prime', url: '/products/samsung/galaxy-core-prime' },
            { title: 'Galaxy Core 2', url: '/products/samsung/galaxy-core-2' },
            { title: 'Galaxy Core', url: '/products/samsung/galaxy-core' },
            { title: 'View all models', url: '/products/samsung/core-series' },
          ]
        },
        {
          title: 'Grand Series',
          items: [
            { title: 'Galaxy Grand Prime', url: '/products/samsung/galaxy-grand-prime' },
            { title: 'Galaxy Grand 2', url: '/products/samsung/galaxy-grand-2' },
            { title: 'Galaxy Grand Neo', url: '/products/samsung/galaxy-grand-neo' },
            { title: 'View all models', url: '/products/samsung/grand-series' },
          ]
        },
        {
          title: 'F Series',
          items: [
            { title: 'Galaxy F54', url: '/products/samsung/galaxy-f54' },
            { title: 'Galaxy F34', url: '/products/samsung/galaxy-f34' },
            { title: 'Galaxy F14', url: '/products/samsung/galaxy-f14' },
            { title: 'View all models', url: '/products/samsung/f-series' },
          ]
        },
        {
          title: 'Book Series',
          items: [
            { title: 'Galaxy Book 3 Ultra', url: '/products/samsung/galaxy-book-3-ultra' },
            { title: 'Galaxy Book 3 Pro', url: '/products/samsung/galaxy-book-3-pro' },
            { title: 'Galaxy Book 3', url: '/products/samsung/galaxy-book-3' },
            { title: 'Galaxy Book 2', url: '/products/samsung/galaxy-book-2' },
            { title: 'View all models', url: '/products/samsung/book-series' },
          ]
        },
        {
          title: 'Chromebook Series',
          items: [
            { title: 'Chromebook 4', url: '/products/samsung/chromebook-4' },
            { title: 'Chromebook 3', url: '/products/samsung/chromebook-3' },
            { title: 'Chromebook Plus', url: '/products/samsung/chromebook-plus' },
            { title: 'View all models', url: '/products/samsung/chromebook-series' },
          ]
        },
        {
          title: 'Others',
          items: [
            { title: 'Galaxy On5', url: '/products/samsung/galaxy-on5' },
            { title: 'Galaxy Alpha', url: '/products/samsung/galaxy-alpha' },
            { title: 'Galaxy Avant', url: '/products/samsung/galaxy-avant' },
            { title: 'Galaxy Ace 4 / Ace Style', url: '/products/samsung/galaxy-ace-4' },
            { title: 'View all models', url: '/products/samsung/others' },
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Motorola',
      url: '/products/motorola',
      submenu: [
        {
          title: 'Moto G Series',
          items: [
            { title: 'G96 (XT2531 / 2025)', url: '/products/motorola/moto-g-series/g96' },
            { title: 'G Stylus 5G (XT2517 / 2025)', url: '/products/motorola/moto-g-series/g-stylus-5g' },
            { title: 'G15 Power (XT2521-5 / 2025)', url: '/products/motorola/moto-g-series/g15-power' },
            { title: 'G15 (XT2521 / 2025)', url: '/products/motorola/moto-g-series/g15' },
            { title: 'G05 (XT2523 / 2025)', url: '/products/motorola/moto-g-series/g05' },
            { title: 'G 5G (XT2513 / 2025)', url: '/products/motorola/moto-g-series/g-5g' },
            { title: 'G Power (XT2515 / 2025)', url: '/products/motorola/moto-g-series/g-power' },
            { title: 'G24 Power (XT2425 / 2024)', url: '/products/motorola/moto-g-series/g24-power' },
            { title: 'G24 (XT2423 / 2024)', url: '/products/motorola/moto-g-series/g24' },
            { title: 'G04 (XT2421 / 2024)', url: '/products/motorola/moto-g-series/g04' },
            { title: 'G Stylus 5G (XT2419 / 2024)', url: '/products/motorola/moto-g-series/g-stylus-5g-2024' },
            { title: 'View all models', url: '/products/motorola/moto-g-series' },
          ]
        },
        {
          title: 'Moto E Series',
          items: [
            { title: 'E13 (XT2345 / 2023)', url: '/products/motorola/moto-e-series/e13' },
            { title: 'E40 (XT2159 / 2021)', url: '/products/motorola/moto-e-series/e40' },
            { title: 'E32S (XT2229 / 2022)', url: '/products/motorola/moto-e-series/e32s' },
            { title: 'E32 (XT2227 / 2022)', url: '/products/motorola/moto-e-series/e32' },
            { title: 'E30 (XT2158 / 2021)', url: '/products/motorola/moto-e-series/e30' },
            { title: 'View all models', url: '/products/motorola/moto-e-series' },
          ]
        },
        {
          title: 'Moto Edge Series',
          items: [
            { title: 'Edge (XT2519 / 2025)', url: '/products/motorola/moto-edge-series/edge' },
            { title: 'Edge 60 (XT2505 / 2025)', url: '/products/motorola/moto-edge-series/edge-60' },
            { title: 'Edge 60 Stylus (XT2517-4 / 2025)', url: '/products/motorola/moto-edge-series/edge-60-stylus' },
            { title: 'Edge 60 Pro (XT2507 / 2025)', url: '/products/motorola/moto-edge-series/edge-60-pro' },
            { title: 'Edge 60 Fusion (XT2503 / 2025)', url: '/products/motorola/moto-edge-series/edge-60-fusion' },
            { title: 'Edge S50 (XT2409 / 2024)', url: '/products/motorola/moto-edge-series/edge-s50' },
            { title: 'Edge 50 Fusion 5G (XT2429 / 2024)', url: '/products/motorola/moto-edge-series/edge-50-fusion-5g' },
            { title: 'Edge 50 Ultra (XT2401-2 / 2024)', url: '/products/motorola/moto-edge-series/edge-50-ultra' },
            { title: 'Edge 50 (XT2407-3 / 2024)', url: '/products/motorola/moto-edge-series/edge-50' },
            { title: 'Edge (XT2405 / 2024)', url: '/products/motorola/moto-edge-series/edge-2024' },
            { title: 'View all models', url: '/products/motorola/moto-edge-series' },
          ]
        },
        {
          title: 'Razr Series',
          items: [
            { title: 'Razr Plus / Razr 60 Ultra (XT2551 / 2025)', url: '/products/motorola/razr-series/razr-60-ultra' },
            { title: 'Razr / Razr 60 (XT2553 / 2025)', url: '/products/motorola/razr-series/razr-60' },
            { title: 'Razr Plus / Razr 50 Ultra (XT2451 / 2024)', url: '/products/motorola/razr-series/razr-50-ultra' },
            { title: 'Razr / Razr 50 (XT2453 / 2024)', url: '/products/motorola/razr-series/razr-50' },
            { title: 'Razr Plus / Razr 40 Ultra (XT2321 / 2023)', url: '/products/motorola/razr-series/razr-40-ultra' },
            { title: 'Razr / Razr 40 (XT2323 / 2023)', url: '/products/motorola/razr-series/razr-40' },
            { title: 'Razr 5G (XT2251 / 2022)', url: '/products/motorola/razr-series/razr-5g' },
            { title: 'View all models', url: '/products/motorola/razr-series' },
          ]
        },
        {
          title: 'Moto One Series',
          items: [
            { title: 'One 5G Ace (XT2113 / 2021)', url: '/products/motorola/moto-one-series/one-5g-ace' },
            { title: 'One 5G (XT2075-1 / 2020)', url: '/products/motorola/moto-one-series/one-5g' },
            { title: 'One Fusion (XT2073 / 2020)', url: '/products/motorola/moto-one-series/one-fusion' },
            { title: 'One Fusion Plus (XT2067 / 2020)', url: '/products/motorola/moto-one-series/one-fusion-plus' },
            { title: 'One Hyper (XT2027 / 2019)', url: '/products/motorola/moto-one-series/one-hyper' },
            { title: 'View all models', url: '/products/motorola/moto-one-series' },
          ]
        },
        {
          title: 'Droid Series',
          items: [
            { title: 'Droid Turbo 2 (XT1585 / 2015)', url: '/products/motorola/droid-series/droid-turbo-2' },
            { title: 'Droid Maxx 2 (XT1565 / 2015)', url: '/products/motorola/droid-series/droid-maxx-2' },
            { title: 'Droid Turbo (XT1254 / 2014)', url: '/products/motorola/droid-series/droid-turbo' },
            { title: 'Droid Maxx (XT1080 / 2013)', url: '/products/motorola/droid-series/droid-maxx' },
            { title: 'Droid Mini (XT1030 / 2013)', url: '/products/motorola/droid-series/droid-mini' },
            { title: 'View all models', url: '/products/motorola/droid-series' },
          ]
        },
        {
          title: 'Moto Z Series',
          items: [
            { title: 'Z4 (XT1980 / 2019)', url: '/products/motorola/moto-z-series/z4' },
            { title: 'Z3 Play (XT1929 / 2018)', url: '/products/motorola/moto-z-series/z3-play' },
            { title: 'Z3 (XT1929-17 / 2018)', url: '/products/motorola/moto-z-series/z3' },
            { title: 'Z2 Force (XT1789 / 2017)', url: '/products/motorola/moto-z-series/z2-force' },
            { title: 'Z2 Play (XT1710 / 2017)', url: '/products/motorola/moto-z-series/z2-play' },
            { title: 'View all models', url: '/products/motorola/moto-z-series' },
          ]
        },
        {
          title: 'X Series',
          items: [
            { title: 'X30 Pro (XT2241 / 2022)', url: '/products/motorola/x-series/x30-pro' },
            { title: 'X4 (XT1900 / 2017)', url: '/products/motorola/x-series/x4' },
            { title: 'X2 (XT1096 / 2014)', url: '/products/motorola/x-series/x2' },
            { title: 'X (XT1060 / 2013)', url: '/products/motorola/x-series/x' },
            { title: 'X Force (XT1580 / 2015)', url: '/products/motorola/x-series/x-force' },
            { title: 'View all models', url: '/products/motorola/x-series' },
          ]
        },
        {
          title: 'Watch Series',
          items: [
            { title: 'Moto 360 (2nd gen)', url: '/products/motorola/watch-series/moto-360' },
            { title: 'View all models', url: '/products/motorola/watch-series' },
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'Google',
      url: '/products/google',
      submenu: [
        {
          title: 'Pixel',
          items: [
            { title: 'Pixel 10 Pro XL', url: '/products/google/pixel-series/pixel-10-pro-xl' },
            { title: 'Pixel 10 Pro', url: '/products/google/pixel-series/pixel-10-pro' },
            { title: 'Pixel 10', url: '/products/google/pixel-series/pixel-10' },
            { title: 'Pixel 9a', url: '/products/google/pixel-series/pixel-9a' },
            { title: 'Pixel 9 Pro XL', url: '/products/google/pixel-series/pixel-9-pro-xl' },
            { title: 'Pixel 9 Pro Fold', url: '/products/google/pixel-series/pixel-9-pro-fold' },
            { title: 'Pixel 9 Pro', url: '/products/google/pixel-series/pixel-9-pro' },
            { title: 'Pixel 9', url: '/products/google/pixel-series/pixel-9' },
            { title: 'Pixel 8a', url: '/products/google/pixel-series/pixel-8a' },
            { title: 'View all models', url: '/products/google/pixel-series' },
          ]
        },
        {
          title: 'Pixelbook',
          items: [
            { title: 'Pixelbook Go', url: '/products/google/pixelbook-series/pixelbook-go' },
            { title: 'Pixelbook', url: '/products/google/pixelbook-series/pixelbook' },
            { title: 'View all models', url: '/products/google/pixelbook-series' },
          ]
        },
        {
          title: 'Pixel Tablet',
          items: [
            { title: 'Pixel Tablet (GTU8P / 2023)', url: '/products/google/pixel-tablet-series/pixel-tablet' },
            { title: 'View all models', url: '/products/google/pixel-tablet-series' },
          ]
        }
      ]
    },
    {
      id: 5,
      title: 'Other Parts',
      url: '/products/other-parts',
      submenu: [
        {
          title: 'LG',
          items: [
            { title: 'Velvet', url: '/products/other-parts/lg-series/velvet' },
            { title: 'G8X ThinQ', url: '/products/other-parts/lg-series/g8x-thinq' },
            { title: 'G8S ThinQ', url: '/products/other-parts/lg-series/g8s-thinq' },
            { title: 'G8 ThinQ', url: '/products/other-parts/lg-series/g8-thinq' },
            { title: 'G7 ThinQ', url: '/products/other-parts/lg-series/g7-thinq' },
            { title: 'View all models', url: '/products/other-parts/lg-series' },
          ]
        },
        {
          title: 'Microsoft',
          items: [
            { title: 'Surface Laptop 5 15"', url: '/products/other-parts/microsoft-series/surface-laptop-5-15' },
            { title: 'Surface Laptop 5 13.5"', url: '/products/other-parts/microsoft-series/surface-laptop-5-13-5' },
            { title: 'Surface Laptop Go 2', url: '/products/other-parts/microsoft-series/surface-laptop-go-2' },
            { title: 'Surface Laptop 4 15"', url: '/products/other-parts/microsoft-series/surface-laptop-4-15' },
            { title: 'Surface Go 3 (2021)', url: '/products/other-parts/microsoft-series/surface-go-3' },
            { title: 'View all models', url: '/products/other-parts/microsoft-series' },
          ]
        },
        {
          title: 'Asus',
          items: [
            { title: 'ROG Phone 9 Pro', url: '/products/other-parts/asus-series/rog-phone-9-pro' },
            { title: 'ROG Phone 9', url: '/products/other-parts/asus-series/rog-phone-9' },
            { title: 'ROG Phone 8 Pro', url: '/products/other-parts/asus-series/rog-phone-8-pro' },
            { title: 'ROG Phone 8', url: '/products/other-parts/asus-series/rog-phone-8' },
            { title: 'ROG Phone 7 Pro', url: '/products/other-parts/asus-series/rog-phone-7-pro' },
            { title: 'ROG Phone 7', url: '/products/other-parts/asus-series/rog-phone-7' },
            { title: 'ROG Phone 6 Pro', url: '/products/other-parts/asus-series/rog-phone-6-pro' },
            { title: 'ROG Phone 6', url: '/products/other-parts/asus-series/rog-phone-6' },
            { title: 'View all models', url: '/products/other-parts/asus-series' },
          ]
        },
        {
          title: 'OnePlus',
          items: [
            { title: 'OnePlus 13 5G', url: '/products/other-parts/oneplus-series/oneplus-13-5g' },
            { title: 'OnePlus 12R 5G', url: '/products/other-parts/oneplus-series/oneplus-12r-5g' },
            { title: 'OnePlus Ace 3 5G', url: '/products/other-parts/oneplus-series/oneplus-ace-3-5g' },
            { title: 'OnePlus Ace Pro', url: '/products/other-parts/oneplus-series/oneplus-ace-pro' },
            { title: 'OnePlus Nord CE 3 Lite', url: '/products/other-parts/oneplus-series/oneplus-nord-ce-3-lite' },
            { title: 'OnePlus Nord N300 5G', url: '/products/other-parts/oneplus-series/oneplus-nord-n300-5g' },
            { title: 'View all models', url: '/products/other-parts/oneplus-series' },
          ]
        },
        {
          title: 'ZTE',
          items: [
            { title: 'Blade L210', url: '/products/other-parts/zte-series/blade-l210' },
            { title: 'Blade A72 (A7040)', url: '/products/other-parts/zte-series/blade-a72' },
            { title: 'Blade A7 (2019)', url: '/products/other-parts/zte-series/blade-a7-2019' },
            { title: 'Blade A5 (2020)', url: '/products/other-parts/zte-series/blade-a5-2020' },
            { title: 'Blade Max 3 (Z986)', url: '/products/other-parts/zte-series/blade-max-3' },
            { title: 'View all models', url: '/products/other-parts/zte-series' },
          ]
        },
        {
          title: 'Huawei',
          items: [
            { title: 'Enjoy 70Z', url: '/products/other-parts/huawei-series/enjoy-70z' },
            { title: 'Enjoy 70', url: '/products/other-parts/huawei-series/enjoy-70' },
            { title: 'Nova Y72', url: '/products/other-parts/huawei-series/nova-y72' },
            { title: 'Nova 11I', url: '/products/other-parts/huawei-series/nova-11i' },
            { title: 'Nova 11 Pro', url: '/products/other-parts/huawei-series/nova-11-pro' },
            { title: 'View all models', url: '/products/other-parts/huawei-series' },
          ]
        },
        {
          title: 'Xiaomi',
          items: [
            { title: 'Redmi Note 13R Pro', url: '/products/other-parts/xiaomi-series/redmi-note-13r-pro' },
            { title: 'Redmi Note 14', url: '/products/other-parts/xiaomi-series/redmi-note-14' },
            { title: 'View all models', url: '/products/other-parts/xiaomi-series' },
          ]
        },
        {
          title: 'Sony',
          items: [
            { title: 'Xperia 10 IV', url: '/products/other-parts/sony-series/xperia-10-iv' },
            { title: 'Xperia 10 III', url: '/products/other-parts/sony-series/xperia-10-iii' },
            { title: 'Xperia 10 II', url: '/products/other-parts/sony-series/xperia-10-ii' },
            { title: 'Xperia 10 Plus', url: '/products/other-parts/sony-series/xperia-10-plus' },
            { title: 'Xperia 10', url: '/products/other-parts/sony-series/xperia-10' },
            { title: 'View all models', url: '/products/other-parts/sony-series' },
          ]
        },
        {
          title: 'TCL',
          items: [
            { title: 'TCL Stylus 5G', url: '/products/other-parts/tcl-series/tcl-stylus-5g' },
            { title: 'TCL 40T', url: '/products/other-parts/tcl-series/tcl-40t' },
            { title: 'TCL 40 XE 5G', url: '/products/other-parts/tcl-series/tcl-40-xe-5g' },
            { title: 'TCL 30 V 5G', url: '/products/other-parts/tcl-series/tcl-30-v-5g' },
            { title: 'TCL 30 XE 5G', url: '/products/other-parts/tcl-series/tcl-30-xe-5g' },
            { title: 'View all models', url: '/products/other-parts/tcl-series' },
          ]
        },
        {
          title: 'Lenovo',
          items: [
            { title: 'Chromebook 300e 81H0', url: '/products/other-parts/lenovo-series/chromebook-300e-81h0' },
            { title: 'Smart Tab P10 10.1"', url: '/products/other-parts/lenovo-series/smart-tab-p10-10-1' },
            { title: 'Tab M10 FHD Plus 2nd Gen 10.3"', url: '/products/other-parts/lenovo-series/tab-m10-fhd-plus-2nd-gen-10-3' },
            { title: 'Tab M10 FHD 10.1"', url: '/products/other-parts/lenovo-series/tab-m10-fhd-10-1' },
            { title: 'Tab M10 HD 2nd Gen 10.1"', url: '/products/other-parts/lenovo-series/tab-m10-hd-2nd-gen-10-1' },
            { title: 'View all models', url: '/products/other-parts/lenovo-series' },
          ]
        },
        {
          title: 'Amazon',
          items: [
            { title: 'Kindle Fire HD 10 (11th Gen, 2021)', url: '/products/other-parts/amazon-series/kindle-fire-hd-10-11th-gen' },
            { title: 'Kindle Fire HD 10 (9th Gen, 2019)', url: '/products/other-parts/amazon-series/kindle-fire-hd-10-9th-gen' },
            { title: 'Kindle Fire HD 8 Plus (12th Gen, 2022)', url: '/products/other-parts/amazon-series/kindle-fire-hd-8-plus-12th-gen' },
            { title: 'View all models', url: '/products/other-parts/amazon-series' },
          ]
        }
      ]
    },
    {
      id: 6,
      title: 'Tools & Supplies',
      url: '/products/tools-supplies',
      submenu: [
        {
          title: 'Repair Tools',
          items: [
            { title: 'Precision Screwdrivers', url: '/products/tools-supplies/precision-screwdrivers' },
            { title: 'Prying Tools', url: '/products/tools-supplies/prying-tools' },
            { title: 'Opening Tools', url: '/products/tools-supplies/opening-tools' },
            { title: 'Suction Cups', url: '/products/tools-supplies/suction-cups' },
            { title: 'Heat Guns', url: '/products/tools-supplies/heat-guns' },
            { title: 'View all tools', url: '/products/tools-supplies/repair-tools' },
          ]
        },
        {
          title: 'Adhesives',
          items: [
            { title: 'B7000 Glue', url: '/products/tools-supplies/b7000-glue' },
            { title: 'T7000 Glue', url: '/products/tools-supplies/t7000-glue' },
            { title: 'UV Adhesive', url: '/products/tools-supplies/uv-adhesive' },
            { title: 'Double Sided Tape', url: '/products/tools-supplies/double-sided-tape' },
            { title: 'View all adhesives', url: '/products/tools-supplies/adhesives' },
          ]
        },
        {
          title: 'Testing Equipment',
          items: [
            { title: 'Multimeters', url: '/products/tools-supplies/multimeters' },
            { title: 'Battery Testers', url: '/products/tools-supplies/battery-testers' },
            { title: 'LCD Testers', url: '/products/tools-supplies/lcd-testers' },
            { title: 'Cable Testers', url: '/products/tools-supplies/cable-testers' },
            { title: 'View all testing equipment', url: '/products/tools-supplies/testing-equipment' },
          ]
        },
        {
          title: 'Workstation Supplies',
          items: [
            { title: 'Anti-Static Mats', url: '/products/tools-supplies/anti-static-mats' },
            { title: 'Magnifying Lamps', url: '/products/tools-supplies/magnifying-lamps' },
            { title: 'Tool Organizers', url: '/products/tools-supplies/tool-organizers' },
            { title: 'Cleaning Supplies', url: '/products/tools-supplies/cleaning-supplies' },
            { title: 'View all supplies', url: '/products/tools-supplies/workstation-supplies' },
          ]
        }
      ]
    },
    {
      id: 7,
      title: 'Pre-Owned Devices',
      url: '/products/pre-owned',
      submenu: [
        {
          title: 'iPhone',
          items: [
            { title: 'iPhone 15 Series', url: '/products/pre-owned/iphone-15-series' },
            { title: 'iPhone 14 Series', url: '/products/pre-owned/iphone-14-series' },
            { title: 'iPhone 13 Series', url: '/products/pre-owned/iphone-13-series' },
            { title: 'iPhone 12 Series', url: '/products/pre-owned/iphone-12-series' },
            { title: 'View all iPhones', url: '/products/pre-owned/iphone' },
          ]
        },
        {
          title: 'Samsung',
          items: [
            { title: 'Galaxy S24 Series', url: '/products/pre-owned/galaxy-s24-series' },
            { title: 'Galaxy S23 Series', url: '/products/pre-owned/galaxy-s23-series' },
            { title: 'Galaxy S22 Series', url: '/products/pre-owned/galaxy-s22-series' },
            { title: 'Galaxy S21 Series', url: '/products/pre-owned/galaxy-s21-series' },
            { title: 'View all Samsung', url: '/products/pre-owned/samsung' },
          ]
        },
        {
          title: 'Tablets',
          items: [
            { title: 'iPad Pro', url: '/products/pre-owned/ipad-pro' },
            { title: 'iPad Air', url: '/products/pre-owned/ipad-air' },
            { title: 'iPad', url: '/products/pre-owned/ipad' },
            { title: 'Samsung Tablets', url: '/products/pre-owned/samsung-tablets' },
            { title: 'View all tablets', url: '/products/pre-owned/tablets' },
          ]
        }
      ]
    },
    {
      id: 8,
      title: 'Services',
      url: '/services',
      submenu: [
        {
          title: 'Repair Services',
          items: [
            { title: 'Screen Replacement', url: '/services/screen-replacement' },
            { title: 'Battery Replacement', url: '/services/battery-replacement' },
            { title: 'Charging Port Repair', url: '/services/charging-port-repair' },
            { title: 'Camera Repair', url: '/services/camera-repair' },
            { title: 'Water Damage Repair', url: '/services/water-damage-repair' },
            { title: 'View all repairs', url: '/services/repair-services' },
          ]
        },
        {
          title: 'Device Inspection',
          items: [
            { title: 'Pre-Purchase Inspection', url: '/services/pre-purchase-inspection' },
            { title: 'Device Diagnostics', url: '/services/device-diagnostics' },
            { title: 'Data Recovery', url: '/services/data-recovery' },
            { title: 'Device Unlocking', url: '/services/device-unlocking' },
            { title: 'View all inspections', url: '/services/device-inspection' },
          ]
        },
        {
          title: 'Trade-In Program',
          items: [
            { title: 'Sell Your Device', url: '/services/sell-your-device' },
            { title: 'Trade-In Value Calculator', url: '/services/trade-in-calculator' },
            { title: 'Bulk Trade-In', url: '/services/bulk-trade-in' },
            { title: 'View trade-in options', url: '/services/trade-in-program' },
          ]
        }
      ]
    },
    {
      id: 9,
      title: 'Support',
      url: '/support',
      submenu: [
        {
          title: 'Help Center',
          items: [
            { title: 'Repair Guides', url: '/support/repair-guides' },
            { title: 'Troubleshooting', url: '/support/troubleshooting' },
            { title: 'Warranty Information', url: '/support/warranty' },
            { title: 'Contact Support', url: '/support/contact' },
            { title: 'FAQ', url: '/support/faq' },
          ]
        },
        {
          title: 'Resources',
          items: [
            { title: 'Product Manuals', url: '/support/product-manuals' },
            { title: 'Video Tutorials', url: '/support/video-tutorials' },
            { title: 'Parts Compatibility', url: '/support/parts-compatibility' },
            { title: 'Shipping Information', url: '/support/shipping' },
            { title: 'Returns & Exchanges', url: '/support/returns' },
          ]
        }
      ]
    },
    {
      id: 10,
      title: 'About',
      url: '/about',
      submenu: [
        {
          title: 'Company',
          items: [
            { title: 'About Us', url: '/about' },
            { title: 'Our Team', url: '/about/team' },
            { title: 'Careers', url: '/about/careers' },
            { title: 'News & Updates', url: '/about/news' },
            { title: 'Contact Us', url: '/contact' },
          ]
        },
        {
          title: 'Locations',
          items: [
            { title: 'Ras Al Khaimah', url: '/locations/ras-al-khaimah' },
            { title: 'Dubai', url: '/locations/dubai' },
            { title: 'Abu Dhabi', url: '/locations/abu-dhabi' },
            { title: 'Sharjah', url: '/locations/sharjah' },
            { title: 'View all locations', url: '/locations' },
          ]
        }
      ]
    },
    {
      id: 11,
      title: 'Bulk Orders',
      url: '/bulk-orders',
      submenu: [
        {
          title: 'Wholesale Pricing',
          items: [
            { title: 'Volume Discounts', url: '/bulk-orders/volume-discounts' },
            { title: 'Bulk Order Form', url: '/bulk-orders/form' },
            { title: 'Account Manager', url: '/bulk-orders/account-manager' },
            { title: 'Payment Terms', url: '/bulk-orders/payment-terms' },
            { title: 'Shipping Options', url: '/bulk-orders/shipping' },
          ]
        },
        {
          title: 'Business Solutions',
          items: [
            { title: 'Repair Shops', url: '/bulk-orders/repair-shops' },
            { title: 'Retail Stores', url: '/bulk-orders/retail-stores' },
            { title: 'Educational Institutions', url: '/bulk-orders/education' },
            { title: 'Government Contracts', url: '/bulk-orders/government' },
            { title: 'Custom Solutions', url: '/bulk-orders/custom' },
          ]
        }
      ]
    }
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
