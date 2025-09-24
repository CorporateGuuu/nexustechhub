import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { useCart } from '../../../contexts/CartContext';
import styles from '../../../styles/ModelPage.module.css';

export default function SamsungModel() {
  const router = useRouter();
  const { model } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('parts');

  // Mock data for different Samsung product models
  const getModelData = (modelSlug) => {
    const modelMap = {
      // S Series
      'galaxy-s25-edge': {
        name: 'Galaxy S25 Edge',
        displayName: 'Galaxy S25 Edge',
        category: 'S Series',
        releaseYear: '2025',
        display: '6.7" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 4',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Phantom Black', 'Phantom White', 'Phantom Titanium']
      },
      'galaxy-s25-ultra': {
        name: 'Galaxy S25 Ultra',
        displayName: 'Galaxy S25 Ultra',
        category: 'S Series',
        releaseYear: '2025',
        display: '6.9" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 4',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Phantom Black', 'Phantom White', 'Phantom Titanium']
      },
      'galaxy-s25-plus': {
        name: 'Galaxy S25 Plus',
        displayName: 'Galaxy S25 Plus',
        category: 'S Series',
        releaseYear: '2025',
        display: '6.7" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 4',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Phantom Black', 'Phantom White', 'Phantom Titanium']
      },
      'galaxy-s25': {
        name: 'Galaxy S25',
        displayName: 'Galaxy S25',
        category: 'S Series',
        releaseYear: '2025',
        display: '6.6" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 4',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Phantom Black', 'Phantom White', 'Phantom Titanium']
      },
      'galaxy-s24-ultra': {
        name: 'Galaxy S24 Ultra',
        displayName: 'Galaxy S24 Ultra',
        category: 'S Series',
        releaseYear: '2024',
        display: '6.8" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 3',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow']
      },
      'galaxy-s24-plus': {
        name: 'Galaxy S24+',
        displayName: 'Galaxy S24+',
        category: 'S Series',
        releaseYear: '2024',
        display: '6.7" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 3',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Cobalt Violet', 'Onyx Black', 'Marble Gray', 'Amber Yellow']
      },
      'galaxy-s24': {
        name: 'Galaxy S24',
        displayName: 'Galaxy S24',
        category: 'S Series',
        releaseYear: '2024',
        display: '6.2" Dynamic AMOLED 2X',
        processor: 'Exynos 2400',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow']
      },
      'galaxy-s23-ultra': {
        name: 'Galaxy S23 Ultra',
        displayName: 'Galaxy S23 Ultra',
        category: 'S Series',
        releaseYear: '2023',
        display: '6.8" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 2',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Phantom Black', 'Cream', 'Green', 'Lavender']
      },
      'galaxy-s23-plus': {
        name: 'Galaxy S23+',
        displayName: 'Galaxy S23+',
        category: 'S Series',
        releaseYear: '2023',
        display: '6.6" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 2',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Phantom Black', 'Cream', 'Green', 'Lavender']
      },
      'galaxy-s23': {
        name: 'Galaxy S23',
        displayName: 'Galaxy S23',
        category: 'S Series',
        releaseYear: '2023',
        display: '6.1" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 2',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Phantom Black', 'Cream', 'Green', 'Lavender']
      },

      // Note Series
      'galaxy-note-20-ultra': {
        name: 'Galaxy Note 20 Ultra',
        displayName: 'Galaxy Note 20 Ultra',
        category: 'Note Series',
        releaseYear: '2020',
        display: '6.9" Dynamic AMOLED 2X',
        processor: 'Exynos 990',
        storage: ['256GB', '512GB'],
        colors: ['Mystic Bronze', 'Mystic Black', 'Mystic White']
      },
      'galaxy-note-20': {
        name: 'Galaxy Note 20',
        displayName: 'Galaxy Note 20',
        category: 'Note Series',
        releaseYear: '2020',
        display: '6.7" Super AMOLED Plus',
        processor: 'Exynos 990',
        storage: ['256GB'],
        colors: ['Mystic Gray', 'Mystic Green', 'Mystic Bronze']
      },
      'galaxy-note-10-plus': {
        name: 'Galaxy Note 10 Plus',
        displayName: 'Galaxy Note 10 Plus',
        category: 'Note Series',
        releaseYear: '2019',
        display: '6.8" Dynamic AMOLED',
        processor: 'Exynos 9825',
        storage: ['256GB', '512GB'],
        colors: ['Aura Glow', 'Aura Black', 'Aura White', 'Aura Blue']
      },
      'galaxy-note-10-lite': {
        name: 'Galaxy Note 10 Lite',
        displayName: 'Galaxy Note 10 Lite',
        category: 'Note Series',
        releaseYear: '2020',
        display: '6.7" Super AMOLED',
        processor: 'Exynos 9810',
        storage: ['128GB'],
        colors: ['Aura Black', 'Aura Red', 'Aura Glow']
      },
      'galaxy-note-10': {
        name: 'Galaxy Note 10',
        displayName: 'Galaxy Note 10',
        category: 'Note Series',
        releaseYear: '2019',
        display: '6.3" Dynamic AMOLED',
        processor: 'Exynos 9825',
        storage: ['256GB'],
        colors: ['Aura Glow', 'Aura Black', 'Aura White', 'Aura Blue']
      },

      // A Series
      'a90-5g': {
        name: 'A90 5G (A908)',
        displayName: 'A90 5G (A908/2019)',
        category: 'A Series',
        releaseYear: '2019',
        display: '6.7" Super AMOLED',
        processor: 'Snapdragon 855',
        storage: ['128GB'],
        colors: ['White', 'Black']
      },
      'a9-pro': {
        name: 'A9 Pro (A910)',
        displayName: 'A9 Pro (A910/2016)',
        category: 'A Series',
        releaseYear: '2016',
        display: '6.0" Super AMOLED',
        processor: 'Exynos 7870',
        storage: ['32GB'],
        colors: ['Black', 'Gold']
      },
      'a9': {
        name: 'A9 (A920)',
        displayName: 'A9 (A920/2018)',
        category: 'A Series',
        releaseYear: '2018',
        display: '6.3" Super AMOLED',
        processor: 'Snapdragon 660',
        storage: ['128GB'],
        colors: ['Caviar Black', 'Lemonade Blue', 'Bubblegum Pink']
      },
      'a80': {
        name: 'A80 (A805)',
        displayName: 'A80 (A805/2019)',
        category: 'A Series',
        releaseYear: '2019',
        display: '6.7" Super AMOLED',
        processor: 'Snapdragon 730',
        storage: ['128GB'],
        colors: ['Phantom Black', 'Angel Gold', 'Ghost White']
      },
      'a8-plus': {
        name: 'A8 Plus (A730)',
        displayName: 'A8 Plus (A730/2018)',
        category: 'A Series',
        releaseYear: '2018',
        display: '6.0" Super AMOLED',
        processor: 'Exynos 7885',
        storage: ['64GB'],
        colors: ['Black', 'Blue', 'Gold']
      },

      // Z Series (Foldables)
      'galaxy-z-fold-5': {
        name: 'Galaxy Z Fold 5',
        displayName: 'Galaxy Z Fold 5',
        category: 'Z Series',
        releaseYear: '2023',
        display: '7.6" Dynamic AMOLED 2X (unfolded), 6.2" Dynamic AMOLED 2X (folded)',
        processor: 'Snapdragon 8 Gen 2',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Phantom Black', 'Cream', 'Icy Blue']
      },
      'galaxy-z-flip-5': {
        name: 'Galaxy Z Flip 5',
        displayName: 'Galaxy Z Flip 5',
        category: 'Z Series',
        releaseYear: '2023',
        display: '6.7" Dynamic AMOLED 2X (unfolded), 3.4" Super AMOLED (folded)',
        processor: 'Snapdragon 8 Gen 2',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Mint', 'Graphite', 'Lavender', 'Cream']
      },
      'galaxy-z-fold-4': {
        name: 'Galaxy Z Fold 4',
        displayName: 'Galaxy Z Fold 4',
        category: 'Z Series',
        releaseYear: '2022',
        display: '7.6" Dynamic AMOLED 2X (unfolded), 6.2" Dynamic AMOLED 2X (folded)',
        processor: 'Snapdragon 8+ Gen 1',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Phantom Black', 'Graygreen', 'Beige']
      },
      'galaxy-z-flip-4': {
        name: 'Galaxy Z Flip 4',
        displayName: 'Galaxy Z Flip 4',
        category: 'Z Series',
        releaseYear: '2022',
        display: '6.7" Dynamic AMOLED 2X (unfolded), 3.4" Super AMOLED (folded)',
        processor: 'Snapdragon 8+ Gen 1',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Bora Purple', 'Graphite', 'Pink Gold', 'Blue']
      },

      // J Series
      'j8-plus': {
        name: 'J8 Plus (J805)',
        displayName: 'J8 Plus (J805/2018)',
        category: 'J Series',
        releaseYear: '2018',
        display: '6.0" Super AMOLED',
        processor: 'Exynos 7885',
        storage: ['64GB'],
        colors: ['Black', 'Gold', 'Blue']
      },
      'j8': {
        name: 'J8 (J810)',
        displayName: 'J8 (J810/2018)',
        category: 'J Series',
        releaseYear: '2018',
        display: '6.0" Super AMOLED',
        processor: 'Exynos 7884',
        storage: ['64GB'],
        colors: ['Black', 'Gold', 'Blue']
      },
      'j7-refine': {
        name: 'J7 Refine (J737)',
        displayName: 'J7 Refine (J737/2018)',
        category: 'J Series',
        releaseYear: '2018',
        display: '5.5" Super AMOLED',
        processor: 'Exynos 7870',
        storage: ['32GB'],
        colors: ['Black', 'Gold']
      },
      'j7-pro': {
        name: 'J7 Pro (J730)',
        displayName: 'J7 Pro (J730/2017)',
        category: 'J Series',
        releaseYear: '2017',
        display: '5.5" Super AMOLED',
        processor: 'Exynos 7870',
        storage: ['64GB'],
        colors: ['Black', 'Gold', 'Pink']
      },
      'j7-prime': {
        name: 'J7 Prime (G610)',
        displayName: 'J7 Prime (G610/2016)',
        category: 'J Series',
        releaseYear: '2016',
        display: '5.5" Super AMOLED',
        processor: 'Exynos 7870',
        storage: ['32GB'],
        colors: ['Black', 'Gold']
      },

      // Tab A Series
      'tab-a9-plus-11': {
        name: 'Tab A9 Plus 11.0"',
        displayName: 'Tab A9 Plus 11.0" (2023)',
        category: 'Tab A Series',
        releaseYear: '2023',
        display: '11.0" TFT',
        processor: 'MediaTek Helio G99',
        storage: ['64GB', '128GB'],
        colors: ['Graphite', 'Silver']
      },
      'tab-a9-8-7': {
        name: 'Tab A9 8.7"',
        displayName: 'Tab A9 8.7" (2023)',
        category: 'Tab A Series',
        releaseYear: '2023',
        display: '8.7" TFT',
        processor: 'MediaTek Helio G99',
        storage: ['64GB', '128GB'],
        colors: ['Graphite', 'Silver']
      },
      'tab-a8-10-5': {
        name: 'Tab A8 10.5"',
        displayName: 'Tab A8 10.5" (2021)',
        category: 'Tab A Series',
        releaseYear: '2021',
        display: '10.5" TFT',
        processor: 'MediaTek Helio P22T',
        storage: ['32GB', '64GB'],
        colors: ['Gray', 'Silver']
      },
      'tab-a7-lite-8-7': {
        name: 'Tab A7 Lite 8.7"',
        displayName: 'Tab A7 Lite 8.7" (2021)',
        category: 'Tab A Series',
        releaseYear: '2021',
        display: '8.7" TFT',
        processor: 'MediaTek MT8768T',
        storage: ['32GB', '64GB'],
        colors: ['Gray', 'Silver']
      },
      'tab-a7-10-4': {
        name: 'Tab A7 10.4"',
        displayName: 'Tab A7 10.4" (2020)',
        category: 'Tab A Series',
        releaseYear: '2020',
        display: '10.4" TFT',
        processor: 'MediaTek Helio P22T',
        storage: ['32GB', '64GB'],
        colors: ['Gray', 'Silver']
      },

      // Tab S Series
      'tab-s9-fe-plus-12-4': {
        name: 'Tab S9 FE Plus 12.4"',
        displayName: 'Tab S9 FE Plus 12.4" (2023)',
        category: 'Tab S Series',
        releaseYear: '2023',
        display: '12.4" TFT',
        processor: 'Exynos 1380',
        storage: ['128GB', '256GB'],
        colors: ['Graphite', 'Silver', 'Mint']
      },
      'tab-s9-fe-10-9': {
        name: 'Tab S9 FE 10.9"',
        displayName: 'Tab S9 FE 10.9" (2023)',
        category: 'Tab S Series',
        releaseYear: '2023',
        display: '10.9" TFT',
        processor: 'Exynos 1380',
        storage: ['128GB', '256GB'],
        colors: ['Graphite', 'Silver', 'Mint']
      },
      'tab-s9-ultra-14-6': {
        name: 'Tab S9 Ultra 14.6"',
        displayName: 'Tab S9 Ultra 14.6" (2023)',
        category: 'Tab S Series',
        releaseYear: '2023',
        display: '14.6" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 2',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Beige', 'Graphite']
      },
      'tab-s9-plus-12-4': {
        name: 'Tab S9 Plus 12.4"',
        displayName: 'Tab S9 Plus 12.4" (2023)',
        category: 'Tab S Series',
        releaseYear: '2023',
        display: '12.4" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 2',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Beige', 'Graphite']
      },
      'tab-s9-11': {
        name: 'Tab S9 11"',
        displayName: 'Tab S9 11" (2023)',
        category: 'Tab S Series',
        releaseYear: '2023',
        display: '11.0" Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 2',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Beige', 'Graphite']
      },

      // Tab Active Series
      'galaxy-tab-active-4-pro': {
        name: 'Galaxy Tab Active 4 Pro',
        displayName: 'Galaxy Tab Active 4 Pro',
        category: 'Tab Active Series',
        releaseYear: '2023',
        display: '10.1" TFT',
        processor: 'MediaTek Dimensity 9300',
        storage: ['64GB', '128GB'],
        colors: ['Black']
      },
      'galaxy-tab-active-3': {
        name: 'Galaxy Tab Active 3',
        displayName: 'Galaxy Tab Active 3',
        category: 'Tab Active Series',
        releaseYear: '2021',
        display: '8.0" TFT',
        processor: 'Exynos 9810',
        storage: ['64GB'],
        colors: ['Black']
      },
      'galaxy-tab-active-2': {
        name: 'Galaxy Tab Active 2',
        displayName: 'Galaxy Tab Active 2',
        category: 'Tab Active Series',
        releaseYear: '2017',
        display: '8.0" Super AMOLED',
        processor: 'Exynos 7870',
        storage: ['16GB'],
        colors: ['Black']
      },

      // Tab Note Series
      'note-pro-12-2': {
        name: 'Note Pro 12.2"',
        displayName: 'Note Pro 12.2"',
        category: 'Tab Note Series',
        releaseYear: '2014',
        display: '12.2" Super Clear LCD',
        processor: 'Exynos 5 Octa',
        storage: ['32GB', '64GB'],
        colors: ['Black', 'White']
      },
      'note-10-1': {
        name: 'Note 10.1"',
        displayName: 'Note 10.1"',
        category: 'Tab Note Series',
        releaseYear: '2012',
        display: '10.1" PLS LCD',
        processor: 'Exynos 4 Quad',
        storage: ['16GB', '32GB'],
        colors: ['Black', 'White']
      },
      'note-8-0': {
        name: 'Note 8.0"',
        displayName: 'Note 8.0"',
        category: 'Tab Note Series',
        releaseYear: '2013',
        display: '8.0" WXGA TFT',
        processor: 'Exynos 4 Quad',
        storage: ['16GB'],
        colors: ['Black', 'White']
      },

      // Tab Series
      'tab-3-lite-7-0-ve': {
        name: 'Tab 3 Lite 7.0" VE',
        displayName: 'Tab 3 Lite 7.0 VE (2015)',
        category: 'Tab Series',
        releaseYear: '2015',
        display: '7.0" TFT',
        processor: 'Spreadtrum SC7731',
        storage: ['8GB'],
        colors: ['Black', 'White']
      },
      'tab-4-10-1': {
        name: 'Tab 4 10.1"',
        displayName: 'Tab 4 10.1" (2014)',
        category: 'Tab Series',
        releaseYear: '2014',
        display: '10.1" TFT',
        processor: 'Exynos 5 Octa',
        storage: ['16GB'],
        colors: ['Black', 'White']
      },
      'tab-4-8-0': {
        name: 'Tab 4 8.0"',
        displayName: 'Tab 4 8.0" (2014)',
        category: 'Tab Series',
        releaseYear: '2014',
        display: '8.0" TFT',
        processor: 'Exynos 5 Octa',
        storage: ['16GB'],
        colors: ['Black', 'White']
      },
      'tab-4-7-0': {
        name: 'Tab 4 7.0"',
        displayName: 'Tab 4 7.0" (2014)',
        category: 'Tab Series',
        releaseYear: '2014',
        display: '7.0" TFT',
        processor: 'Exynos 5 Octa',
        storage: ['8GB', '16GB'],
        colors: ['Black', 'White']
      },
      'tab-3-lite': {
        name: 'Tab 3 Lite',
        displayName: 'Tab 3 Lite (2014)',
        category: 'Tab Series',
        releaseYear: '2014',
        display: '7.0" TFT',
        processor: 'Spreadtrum SC7731',
        storage: ['8GB'],
        colors: ['Black', 'White']
      },

      // XCover Series
      'galaxy-xcover7-pro': {
        name: 'Galaxy XCover7 Pro',
        displayName: 'Galaxy XCover7 Pro',
        category: 'XCover Series',
        releaseYear: '2023',
        display: '6.3" PLS TFT',
        processor: 'MediaTek Dimensity 930',
        storage: ['128GB'],
        colors: ['Black']
      },
      'galaxy-xcover-7': {
        name: 'Galaxy XCover 7',
        displayName: 'Galaxy XCover 7',
        category: 'XCover Series',
        releaseYear: '2022',
        display: '6.6" PLS TFT',
        processor: 'MediaTek Helio G85',
        storage: ['64GB'],
        colors: ['Black']
      },
      'galaxy-xcover-6-pro': {
        name: 'Galaxy XCover 6 Pro',
        displayName: 'Galaxy XCover 6 Pro',
        category: 'XCover Series',
        releaseYear: '2021',
        display: '6.6" PLS TFT',
        processor: 'Exynos 9611',
        storage: ['64GB'],
        colors: ['Black']
      },
      'galaxy-xcover-5': {
        name: 'Galaxy XCover 5',
        displayName: 'Galaxy XCover 5',
        category: 'XCover Series',
        releaseYear: '2020',
        display: '5.3" PLS TFT',
        processor: 'Exynos 850',
        storage: ['32GB'],
        colors: ['Black']
      },
      'galaxy-xcover-4s': {
        name: 'Galaxy XCover 4s',
        displayName: 'Galaxy XCover 4s',
        category: 'XCover Series',
        releaseYear: '2019',
        display: '5.0" PLS TFT',
        processor: 'Exynos 7885',
        storage: ['32GB'],
        colors: ['Black']
      },
      'galaxy-xcover-4': {
        name: 'Galaxy XCover 4',
        displayName: 'Galaxy XCover 4',
        category: 'XCover Series',
        releaseYear: '2017',
        display: '5.0" PLS TFT',
        processor: 'Exynos 7570',
        storage: ['16GB'],
        colors: ['Black']
      },

      // Watch Series
      'watch-6-classic-47mm': {
        name: 'Watch 6 Classic (47MM)',
        displayName: 'Watch 6 Classic (47MM)',
        category: 'Watch Series',
        releaseYear: '2023',
        display: '1.5" Super AMOLED',
        processor: 'Exynos W930',
        storage: ['16GB'],
        colors: ['Black', 'Silver']
      },
      'watch-6-classic-43mm': {
        name: 'Watch 6 Classic (43MM)',
        displayName: 'Watch 6 Classic (43MM)',
        category: 'Watch Series',
        releaseYear: '2023',
        display: '1.3" Super AMOLED',
        processor: 'Exynos W930',
        storage: ['16GB'],
        colors: ['Black', 'Silver']
      },
      'watch-6-44mm': {
        name: 'Watch 6 (44MM)',
        displayName: 'Watch 6 (44MM)',
        category: 'Watch Series',
        releaseYear: '2023',
        display: '1.5" Super AMOLED',
        processor: 'Exynos W930',
        storage: ['16GB'],
        colors: ['Black', 'Silver', 'Gold']
      },
      'watch-6-40mm': {
        name: 'Watch 6 (40MM)',
        displayName: 'Watch 6 (40MM)',
        category: 'Watch Series',
        releaseYear: '2023',
        display: '1.2" Super AMOLED',
        processor: 'Exynos W930',
        storage: ['16GB'],
        colors: ['Black', 'Silver', 'Gold']
      },
      'watch-5-40mm': {
        name: 'Watch 5 (40MM)',
        displayName: 'Watch 5 (40MM)',
        category: 'Watch Series',
        releaseYear: '2022',
        display: '1.2" Super AMOLED',
        processor: 'Exynos W920',
        storage: ['16GB'],
        colors: ['Black', 'Silver', 'Gold']
      },
      'watch-4-classic-46mm': {
        name: 'Watch 4 Classic (46MM)',
        displayName: 'Watch 4 Classic (46MM)',
        category: 'Watch Series',
        releaseYear: '2021',
        display: '1.4" Super AMOLED',
        processor: 'Exynos 9110',
        storage: ['16GB'],
        colors: ['Black', 'Silver']
      },
      'watch-4-40mm': {
        name: 'Watch 4 (40MM)',
        displayName: 'Watch 4 (40MM)',
        category: 'Watch Series',
        releaseYear: '2021',
        display: '1.2" Super AMOLED',
        processor: 'Exynos 9110',
        storage: ['16GB'],
        colors: ['Black', 'Silver', 'Gold', 'Pink Gold']
      },
      'watch-3-45mm': {
        name: 'Watch 3 (45MM)',
        displayName: 'Watch 3 (45MM)',
        category: 'Watch Series',
        releaseYear: '2019',
        display: '1.4" Super AMOLED',
        processor: 'Exynos 9110',
        storage: ['8GB'],
        colors: ['Black', 'Silver']
      },
      'watch-3-41mm': {
        name: 'Watch 3 (41MM)',
        displayName: 'Watch 3 (41MM)',
        category: 'Watch Series',
        releaseYear: '2019',
        display: '1.2" Super AMOLED',
        processor: 'Exynos 9110',
        storage: ['8GB'],
        colors: ['Black', 'Silver']
      },
      'watch-active-2-44mm': {
        name: 'Watch Active 2 (44MM)',
        displayName: 'Watch Active 2 (44MM)',
        category: 'Watch Series',
        releaseYear: '2019',
        display: '1.4" Super AMOLED',
        processor: 'Exynos 9110',
        storage: ['4GB'],
        colors: ['Black', 'Silver', 'Rose Gold', 'Green']
      },
      'watch-active-2-40mm': {
        name: 'Watch Active 2 (40MM)',
        displayName: 'Watch Active 2 (40MM)',
        category: 'Watch Series',
        releaseYear: '2019',
        display: '1.2" Super AMOLED',
        processor: 'Exynos 9110',
        storage: ['4GB'],
        colors: ['Black', 'Silver', 'Rose Gold', 'Green']
      },
      'gear-s3-classic-46mm': {
        name: 'Gear S3 Classic (46MM)',
        displayName: 'Gear S3 Classic (46MM)',
        category: 'Watch Series',
        releaseYear: '2017',
        display: '1.3" Circular Super AMOLED',
        processor: 'Exynos 7270',
        storage: ['4GB'],
        colors: ['Black', 'Silver']
      },
      'gear-s3-frontier-46mm': {
        name: 'Gear S3 Frontier (46MM)',
        displayName: 'Gear S3 Frontier (46MM)',
        category: 'Watch Series',
        releaseYear: '2017',
        display: '1.3" Circular Super AMOLED',
        processor: 'Exynos 7270',
        storage: ['4GB'],
        colors: ['Black', 'Silver']
      },

      // Mega Series
      'galaxy-mega-6-3': {
        name: 'Galaxy Mega 6.3',
        displayName: 'Galaxy Mega 6.3',
        category: 'Mega Series',
        releaseYear: '2013',
        display: '6.3" HD Super AMOLED',
        processor: 'Exynos 5 Octa',
        storage: ['8GB', '16GB'],
        colors: ['Black', 'White']
      },
      'galaxy-mega-5-8': {
        name: 'Galaxy Mega 5.8',
        displayName: 'Galaxy Mega 5.8',
        category: 'Mega Series',
        releaseYear: '2013',
        display: '5.8" HD Super AMOLED',
        processor: 'Exynos 5 Octa',
        storage: ['8GB', '16GB'],
        colors: ['Black', 'White']
      },

      // M Series
      'm54': {
        name: 'M54 (M546)',
        displayName: 'M54 (M546/2023)',
        category: 'M Series',
        releaseYear: '2023',
        display: '6.7" Super AMOLED Plus',
        processor: 'Exynos 1380',
        storage: ['128GB', '256GB'],
        colors: ['Pearl Blue', 'Emerald Green', 'Dark Blue']
      },
      'm53-5g': {
        name: 'M53 5G (M536)',
        displayName: 'M53 5G (M536/2022)',
        category: 'M Series',
        releaseYear: '2022',
        display: '6.7" Super AMOLED Plus',
        processor: 'MediaTek Dimensity 900',
        storage: ['128GB', '256GB'],
        colors: ['Deep Ocean Blue', 'Emerald Brown', 'Pearl White']
      },
      'm52-5g': {
        name: 'M52 5G (M526)',
        displayName: 'M52 5G (M526/2021)',
        category: 'M Series',
        releaseYear: '2021',
        display: '6.7" Super AMOLED',
        processor: 'Snapdragon 750G',
        storage: ['128GB'],
        colors: ['Blazing Black', 'Icy Blue', 'Emerald Green']
      },
      'm51': {
        name: 'M51 (M515)',
        displayName: 'M51 (M515/2020)',
        category: 'M Series',
        releaseYear: '2020',
        display: '6.7" Super AMOLED Plus',
        processor: 'Snapdragon 730G',
        storage: ['64GB', '128GB'],
        colors: ['Celestial Black', 'Electric Blue', 'Stardust Brown']
      },
      'm40': {
        name: 'M40 (M405)',
        displayName: 'M40 (M405/2019)',
        category: 'M Series',
        releaseYear: '2019',
        display: '6.3" Super AMOLED',
        processor: 'Exynos 9611',
        storage: ['64GB'],
        colors: ['Seawater Blue', 'Cocktail Orange', 'Midnight Blue']
      },

      // Core Series
      'galaxy-core-prime': {
        name: 'Galaxy Core Prime',
        displayName: 'Galaxy Core Prime',
        category: 'Core Series',
        releaseYear: '2014',
        display: '4.5" qHD TFT',
        processor: 'Spreadtrum SC7730',
        storage: ['8GB'],
        colors: ['Black', 'White']
      },
      'galaxy-core-2': {
        name: 'Galaxy Core 2',
        displayName: 'Galaxy Core 2',
        category: 'Core Series',
        releaseYear: '2014',
        display: '4.5" qHD TFT',
        processor: 'Spreadtrum SC7730',
        storage: ['8GB'],
        colors: ['Black', 'White']
      },
      'galaxy-core': {
        name: 'Galaxy Core',
        displayName: 'Galaxy Core',
        category: 'Core Series',
        releaseYear: '2013',
        display: '4.3" TFT',
        processor: 'Dual-core 1.2 GHz',
        storage: ['8GB'],
        colors: ['Black', 'White']
      },

      // Grand Series
      'galaxy-grand-prime': {
        name: 'Galaxy Grand Prime',
        displayName: 'Galaxy Grand Prime',
        category: 'Grand Series',
        releaseYear: '2014',
        display: '5.0" HD TFT',
        processor: 'Snapdragon 410',
        storage: ['8GB'],
        colors: ['Black', 'White', 'Gray']
      },
      'galaxy-grand-2': {
        name: 'Galaxy Grand 2',
        displayName: 'Galaxy Grand 2',
        category: 'Grand Series',
        releaseYear: '2014',
        display: '5.25" qHD TFT',
        processor: 'Snapdragon 400',
        storage: ['8GB'],
        colors: ['Black', 'White']
      },
      'galaxy-grand-neo': {
        name: 'Galaxy Grand Neo',
        displayName: 'Galaxy Grand Neo',
        category: 'Grand Series',
        releaseYear: '2014',
        display: '5.0" qHD TFT',
        processor: 'Snapdragon 400',
        storage: ['8GB'],
        colors: ['Black', 'White']
      },

      // F Series
      'galaxy-f54': {
        name: 'Galaxy F54',
        displayName: 'Galaxy F54',
        category: 'F Series',
        releaseYear: '2023',
        display: '6.7" Super AMOLED',
        processor: 'Exynos 1380',
        storage: ['128GB', '256GB'],
        colors: ['Meteor Blue', 'Stardust Silver', 'Midnight Black']
      },
      'galaxy-f34': {
        name: 'Galaxy F34',
        displayName: 'Galaxy F34',
        category: 'F Series',
        releaseYear: '2023',
        display: '6.5" Super AMOLED',
        processor: 'Exynos 1280',
        storage: ['128GB'],
        colors: ['Electric Black', 'Mystic Green', 'Orchid Violet']
      },
      'galaxy-f14': {
        name: 'Galaxy F14',
        displayName: 'Galaxy F14',
        category: 'F Series',
        releaseYear: '2023',
        display: '6.6" PLS LCD',
        processor: 'Exynos 1330',
        storage: ['64GB', '128GB'],
        colors: ['GOAT Green', 'OMG Black', 'B.A.E. Purple']
      },

      // Book Series
      'galaxy-book-3-ultra': {
        name: 'Galaxy Book 3 Ultra',
        displayName: 'Galaxy Book 3 Ultra',
        category: 'Book Series',
        releaseYear: '2023',
        display: '16.0" AMOLED',
        processor: 'Intel Core i9',
        storage: ['512GB', '1TB'],
        colors: ['Graphite', 'Beige']
      },
      'galaxy-book-3-pro': {
        name: 'Galaxy Book 3 Pro',
        displayName: 'Galaxy Book 3 Pro',
        category: 'Book Series',
        releaseYear: '2023',
        display: '16.0" AMOLED',
        processor: 'Intel Core i7',
        storage: ['512GB', '1TB'],
        colors: ['Graphite', 'Beige']
      },
      'galaxy-book-3': {
        name: 'Galaxy Book 3',
        displayName: 'Galaxy Book 3',
        category: 'Book Series',
        releaseYear: '2023',
        display: '15.6" AMOLED',
        processor: 'Intel Core i5',
        storage: ['256GB', '512GB'],
        colors: ['Graphite', 'Silver']
      },
      'galaxy-book-2': {
        name: 'Galaxy Book 2',
        displayName: 'Galaxy Book 2',
        category: 'Book Series',
        releaseYear: '2022',
        display: '15.6" AMOLED',
        processor: 'Intel Core i5',
        storage: ['256GB', '512GB'],
        colors: ['Graphite', 'Silver']
      },

      // Chromebook Series
      'chromebook-4': {
        name: 'Chromebook 4',
        displayName: 'Chromebook 4',
        category: 'Chromebook Series',
        releaseYear: '2020',
        display: '11.6" HD',
        processor: 'MediaTek MT8183',
        storage: ['32GB'],
        colors: ['Black']
      },
      'chromebook-3': {
        name: 'Chromebook 3',
        displayName: 'Chromebook 3',
        category: 'Chromebook Series',
        releaseYear: '2018',
        display: '11.6" HD',
        processor: 'Rockchip RK3399',
        storage: ['32GB'],
        colors: ['Black']
      },
      'chromebook-plus': {
        name: 'Chromebook Plus',
        displayName: 'Chromebook Plus',
        category: 'Chromebook Series',
        releaseYear: '2018',
        display: '12.2" 2400x1600',
        processor: 'Intel Core m3',
        storage: ['32GB'],
        colors: ['Black']
      },

      // Others
      'galaxy-on5': {
        name: 'Galaxy On5',
        displayName: 'Galaxy On5',
        category: 'Others',
        releaseYear: '2016',
        display: '5.0" HD TFT',
        processor: 'Spreadtrum SC7731',
        storage: ['8GB'],
        colors: ['Black', 'Gold']
      },
      'galaxy-alpha': {
        name: 'Galaxy Alpha',
        displayName: 'Galaxy Alpha',
        category: 'Others',
        releaseYear: '2014',
        display: '4.7" Super AMOLED',
        processor: 'Exynos 5430',
        storage: ['32GB'],
        colors: ['Frosted Gold', 'Dazzling White', 'Midnight Black']
      },
      'galaxy-avant': {
        name: 'Galaxy Avant',
        displayName: 'Galaxy Avant',
        category: 'Others',
        releaseYear: '2015',
        display: '5.5" Super AMOLED',
        processor: 'Snapdragon 615',
        storage: ['16GB'],
        colors: ['Black', 'White']
      },
      'galaxy-ace-4': {
        name: 'Galaxy Ace 4',
        displayName: 'Galaxy Ace 4 / Ace Style',
        category: 'Others',
        releaseYear: '2014',
        display: '4.0" WVGA TFT',
        processor: 'Spreadtrum SC7730',
        storage: ['8GB'],
        colors: ['Black', 'White']
      }
    };

    return modelMap[modelSlug] || {
      name: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      displayName: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      category: 'Samsung Product',
      releaseYear: '2023',
      colors: ['Black', 'White']
    };
  };

  const modelData = getModelData(model);

  // Parts data for the specific model
  const getPartsForModel = (modelSlug, category) => {
    const baseParts = {
      parts: [
        {
          id: `${modelSlug}-repair-kit`,
          name: `${modelData.displayName} Repair Kit`,
          price: modelSlug.includes('s25') || modelSlug.includes('s24') ? 129.99 :
                 modelSlug.includes('fold') || modelSlug.includes('flip') ? 149.99 :
                 modelSlug.includes('tab') ? 89.99 :
                 modelSlug.includes('watch') ? 79.99 : 49.99,
          image: `/images/products/${modelSlug}-kit.jpg`,
          compatibility: modelData.displayName,
          type: 'Complete repair kit with tools and parts',
          stock: 25,
          rating: 4.5,
          reviews: 67
        },
        {
          id: `${modelSlug}-battery`,
          name: `${modelData.displayName} Battery Replacement`,
          price: modelSlug.includes('s25') || modelSlug.includes('s24') ? 89.99 :
                 modelSlug.includes('fold') || modelSlug.includes('flip') ? 99.99 :
                 modelSlug.includes('tab') ? 69.99 :
                 modelSlug.includes('watch') ? 59.99 : 39.99,
          image: `/images/products/${modelSlug}-battery.jpg`,
          capacity: 'Original Samsung capacity',
          compatibility: modelData.displayName,
          stock: 40,
          rating: 4.4,
          reviews: 89
        }
      ]
    };

    return baseParts[category] || baseParts.parts;
  };

  useEffect(() => {
    if (model) {
      const parts = getPartsForModel(model, selectedCategory);
      setProducts(parts);
      setLoading(false);
    }
  }, [model, selectedCategory]);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product, 1);
      // Success feedback
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const categories = [
    { id: 'parts', name: 'Repair Parts', icon: '🔧' },
    { id: 'batteries', name: 'Batteries', icon: '🔋' },
    { id: 'accessories', name: 'Accessories', icon: '🎧' }
  ];

  if (loading) {
    return (
      <Layout title={`${modelData.displayName} Parts - Nexus Tech Hub`} description={`Repair parts for ${modelData.displayName}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading {modelData.displayName} parts...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${modelData.displayName} Parts - Professional Repair Components | Nexus Tech Hub`}
      description={`Complete range of repair parts for ${modelData.displayName}. High-quality components with warranty.`}
    >
      <div className={styles.modelPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{modelData.displayName}</span>
        </div>

        {/* Model Header */}
        <div className={styles.modelHeader}>
          <div className={styles.modelInfo}>
            <h1>{modelData.displayName} Parts</h1>
            <div className={styles.modelSpecs}>
              <span>📅 Released: {modelData.releaseYear}</span>
              {modelData.display && <span>📺 Display: {modelData.display}</span>}
              {modelData.processor && <span>🖥️ Processor: {modelData.processor}</span>}
              {modelData.storage && <span>💾 Storage: {modelData.storage.join(', ')}</span>}
              {modelData.features && <span>✨ Features: {modelData.features.join(', ')}</span>}
            </div>
            <div className={styles.modelColors}>
              <span>🎨 Colors: {modelData.colors.join(', ')}</span>
            </div>
          </div>
          <div className={styles.modelImage}>
            <img
              src={`/images/samsung/${model}.jpg`}
              alt={modelData.displayName}
              onError={(e) => {
                e.target.src = '/images/products/placeholder.svg';
              }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className={styles.categoryTabs}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryTab} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Parts Grid */}
        <div className={styles.partsGrid}>
          {products.map(product => (
            <div key={product.id} className={styles.partCard}>
              <div className={styles.partImage}>
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/images/products/placeholder.svg';
                  }}
                />
                <div className={styles.partOverlay}>
                  <Link href={`/products/${product.id}`} className={styles.viewDetailsBtn}>
                    View Details
                  </Link>
                </div>
              </div>

              <div className={styles.partInfo}>
                <h3 className={styles.partName}>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <div className={styles.partSpecs}>
                  <p><strong>Type:</strong> {product.type}</p>
                  <p><strong>Compatibility:</strong> {product.compatibility}</p>
                  {product.capacity && <p><strong>Capacity:</strong> {product.capacity}</p>}
                </div>

                <div className={styles.partRating}>
                  <div className={styles.stars}>
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className={styles.ratingValue}>{product.rating}</span>
                  <span className={styles.reviewCount}>({product.reviews})</span>
                </div>

                <div className={styles.partPrice}>
                  <span className={styles.currentPrice}>${product.price}</span>
                </div>

                <div className={styles.partStock}>
                  {product.stock > 10 ? (
                    <span className={styles.inStock}>✓ In Stock</span>
                  ) : product.stock > 0 ? (
                    <span className={styles.lowStock}>⚠ Only {product.stock} left</span>
                  ) : (
                    <span className={styles.outOfStock}>✗ Out of Stock</span>
                  )}
                </div>

                <button
                  className={styles.addToCartBtn}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Related Models */}
        <div className={styles.relatedModels}>
          <h2>Other {modelData.category} Models</h2>
          <div className={styles.modelsGrid}>
            {modelData.category === 'S Series' && (
              <>
                <Link href="/products/samsung/galaxy-s25-ultra" className={styles.modelLink}>
                  Galaxy S25 Ultra
                </Link>
                <Link href="/products/samsung/galaxy-s25-plus" className={styles.modelLink}>
                  Galaxy S25 Plus
                </Link>
                <Link href="/products/samsung/galaxy-s25" className={styles.modelLink}>
                  Galaxy S25
                </Link>
                <Link href="/products/samsung/galaxy-s24-ultra" className={styles.modelLink}>
                  Galaxy S24 Ultra
                </Link>
              </>
            )}
            {modelData.category === 'Note Series' && (
              <>
                <Link href="/products/samsung/galaxy-note-20-ultra" className={styles.modelLink}>
                  Galaxy Note 20 Ultra
                </Link>
                <Link href="/products/samsung/galaxy-note-20" className={styles.modelLink}>
                  Galaxy Note 20
                </Link>
                <Link href="/products/samsung/galaxy-note-10-plus" className={styles.modelLink}>
                  Galaxy Note 10 Plus
                </Link>
                <Link href="/products/samsung/galaxy-note-10" className={styles.modelLink}>
                  Galaxy Note 10
                </Link>
              </>
            )}
            {modelData.category === 'A Series' && (
              <>
                <Link href="/products/samsung/a90-5g" className={styles.modelLink}>
                  A90 5G
                </Link>
                <Link href="/products/samsung/a80" className={styles.modelLink}>
                  A80
                </Link>
                <Link href="/products/samsung/a9" className={styles.modelLink}>
                  A9
                </Link>
                <Link href="/products/samsung/a8-plus" className={styles.modelLink}>
                  A8 Plus
                </Link>
              </>
            )}
            {modelData.category === 'Z Series' && (
              <>
                <Link href="/products/samsung/galaxy-z-fold-5" className={styles.modelLink}>
                  Galaxy Z Fold 5
                </Link>
                <Link href="/products/samsung/galaxy-z-flip-5" className={styles.modelLink}>
                  Galaxy Z Flip 5
                </Link>
                <Link href="/products/samsung/galaxy-z-fold-4" className={styles.modelLink}>
                  Galaxy Z Fold 4
                </Link>
                <Link href="/products/samsung/galaxy-z-flip-4" className={styles.modelLink}>
                  Galaxy Z Flip 4
                </Link>
              </>
            )}
            {modelData.category === 'Watch Series' && (
              <>
                <Link href="/products/samsung/watch-6-classic-47mm" className={styles.modelLink}>
                  Watch 6 Classic (47MM)
                </Link>
                <Link href="/products/samsung/watch-6-44mm" className={styles.modelLink}>
                  Watch 6 (44MM)
                </Link>
                <Link href="/products/samsung/watch-5-40mm" className={styles.modelLink}>
                  Watch 5 (40MM)
                </Link>
                <Link href="/products/samsung/watch-4-classic-46mm" className={styles.modelLink}>
                  Watch 4 Classic (46MM)
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Technical Support */}
        <div className={styles.supportSection}>
          <div className={styles.supportContent}>
            <h2>Need Help with {modelData.displayName}?</h2>
            <p>Our technical experts can help you identify the right parts and provide repair guidance.</p>
            <div className={styles.supportActions}>
              <Link href="/services/support" className={styles.supportBtn}>
                Get Technical Support
              </Link>
              <Link href="/contact" className={styles.contactBtn}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Generate paths for popular Samsung product models
  const models = [
    // S Series
    'galaxy-s25-edge',
    'galaxy-s25-ultra',
    'galaxy-s25-plus',
    'galaxy-s25',
    'galaxy-s24-ultra',
    'galaxy-s24-plus',
    'galaxy-s24',
    'galaxy-s23-ultra',
    'galaxy-s23-plus',
    'galaxy-s23',
    // Note Series
    'galaxy-note-20-ultra',
    'galaxy-note-20',
    'galaxy-note-10-plus',
    'galaxy-note-10-lite',
    'galaxy-note-10',
    // A Series
    'a90-5g',
    'a9-pro',
    'a9',
    'a80',
    'a8-plus',
    // Z Series
    'galaxy-z-fold-5',
    'galaxy-z-flip-5',
    'galaxy-z-fold-4',
    'galaxy-z-flip-4',
    // J Series
    'j8-plus',
    'j8',
    'j7-refine',
    'j7-pro',
    'j7-prime',
    // Tab A Series
    'tab-a9-plus-11',
    'tab-a9-8-7',
    'tab-a8-10-5',
    'tab-a7-lite-8-7',
    'tab-a7-10-4',
    // Tab S Series
    'tab-s9-fe-plus-12-4',
    'tab-s9-fe-10-9',
    'tab-s9-ultra-14-6',
    'tab-s9-plus-12-4',
    'tab-s9-11',
    // Tab Active Series
    'galaxy-tab-active-4-pro',
    'galaxy-tab-active-3',
    'galaxy-tab-active-2',
    // Tab Note Series
    'note-pro-12-2',
    'note-10-1',
    'note-8-0',
    // Tab Series
    'tab-3-lite-7-0-ve',
    'tab-4-10-1',
    'tab-4-8-0',
    'tab-4-7-0',
    'tab-3-lite',
    // XCover Series
    'galaxy-xcover7-pro',
    'galaxy-xcover-7',
    'galaxy-xcover-6-pro',
    'galaxy-xcover-5',
    'galaxy-xcover-4s',
    'galaxy-xcover-4',
    // Watch Series
    'watch-6-classic-47mm',
    'watch-6-classic-43mm',
    'watch-6-44mm',
    'watch-6-40mm',
    'watch-5-40mm',
    'watch-4-classic-46mm',
    'watch-4-40mm',
    'watch-3-45mm',
    'watch-3-41mm',
    'watch-active-2-44mm',
    'watch-active-2-40mm',
    'gear-s3-classic-46mm',
    'gear-s3-frontier-46mm',
    // Mega Series
    'galaxy-mega-6-3',
    'galaxy-mega-5-8',
    // M Series
    'm54',
    'm53-5g',
    'm52-5g',
    'm51',
    'm40',
    // Core Series
    'galaxy-core-prime',
    'galaxy-core-2',
    'galaxy-core',
    // Grand Series
    'galaxy-grand-prime',
    'galaxy-grand-2',
    'galaxy-grand-neo',
    // F Series
    'galaxy-f54',
    'galaxy-f34',
    'galaxy-f14',
    // Book Series
    'galaxy-book-3-ultra',
    'galaxy-book-3-pro',
    'galaxy-book-3',
    'galaxy-book-2',
    // Chromebook Series
    'chromebook-4',
    'chromebook-3',
    'chromebook-plus',
    // Others
    'galaxy-on5',
    'galaxy-alpha',
    'galaxy-avant',
    'galaxy-ace-4'
  ];

  const paths = models.map(model => ({
    params: { model }
  }));

  return {
    paths,
    fallback: 'blocking' // Generate pages on-demand for new models
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {},
    revalidate: 3600 // Regenerate every hour
  };
}
