import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { useCart } from '../../../contexts/CartContext';
import styles from '../../../styles/ModelPage.module.css';

export default function MotorolaModel() {
  const router = useRouter();
  const { model } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('parts');

  // Mock data for different Motorola product models
  const getModelData = (modelSlug) => {
    const modelMap = {
      // Moto G Series
      'g96': {
        name: 'G96 (XT2531)',
        displayName: 'Moto G96 (XT2531/2025)',
        category: 'Moto G Series',
        releaseYear: '2025',
        display: '6.5" pOLED',
        processor: 'MediaTek Dimensity 930',
        storage: ['256GB'],
        colors: ['Marshmallow Blue', 'Pebble Grey']
      },
      'g-stylus-5g': {
        name: 'G Stylus 5G (XT2517)',
        displayName: 'Moto G Stylus 5G (XT2517/2025)',
        category: 'Moto G Series',
        releaseYear: '2025',
        display: '6.91" IPS LCD',
        processor: 'MediaTek Dimensity 7025',
        storage: ['256GB', '512GB'],
        colors: ['Cosmic Black', 'Stardust White']
      },
      'g15-power': {
        name: 'G15 Power (XT2521-5)',
        displayName: 'Moto G15 Power (XT2521-5/2025)',
        category: 'Moto G Series',
        releaseYear: '2025',
        display: '6.6" IPS LCD',
        processor: 'MediaTek Helio G85',
        storage: ['64GB'],
        colors: ['Dark Pearl', 'Light Silver']
      },
      'g15': {
        name: 'G15 (XT2521)',
        displayName: 'Moto G15 (XT2521/2025)',
        category: 'Moto G Series',
        releaseYear: '2025',
        display: '6.5" IPS LCD',
        processor: 'MediaTek Helio G85',
        storage: ['128GB'],
        colors: ['Dark Pearl', 'Light Silver']
      },
      'g05': {
        name: 'G05 (XT2523)',
        displayName: 'Moto G05 (XT2523/2025)',
        category: 'Moto G Series',
        releaseYear: '2025',
        display: '6.7" IPS LCD',
        processor: 'MediaTek Helio G81',
        storage: ['64GB'],
        colors: ['Forest Green', 'Lavender']
      },
      'g-5g': {
        name: 'G 5G (XT2513)',
        displayName: 'Moto G 5G (XT2513/2025)',
        category: 'Moto G Series',
        releaseYear: '2025',
        display: '6.5" IPS LCD',
        processor: 'MediaTek Dimensity 7020',
        storage: ['128GB'],
        colors: ['Mineral Grey', 'Iced Mint']
      },
      'g-power': {
        name: 'G Power (XT2515)',
        displayName: 'Moto G Power (XT2515/2025)',
        category: 'Moto G Series',
        releaseYear: '2025',
        display: '6.5" IPS LCD',
        processor: 'MediaTek Helio G85',
        storage: ['64GB'],
        colors: ['Flash Gray', 'Jade Green']
      },
      'g24-power': {
        name: 'G24 Power (XT2425)',
        displayName: 'Moto G24 Power (XT2425/2024)',
        category: 'Moto G Series',
        releaseYear: '2024',
        display: '6.6" IPS LCD',
        processor: 'MediaTek Helio G85',
        storage: ['128GB'],
        colors: ['Ink Blue', 'Polar Silver']
      },
      'g24': {
        name: 'G24 (XT2423)',
        displayName: 'Moto G24 (XT2423/2024)',
        category: 'Moto G Series',
        releaseYear: '2024',
        display: '6.6" IPS LCD',
        processor: 'MediaTek Helio G99',
        storage: ['128GB'],
        colors: ['Ink Blue', 'Polar Silver']
      },
      'g04': {
        name: 'G04 (XT2421)',
        displayName: 'Moto G04 (XT2421/2024)',
        category: 'Moto G Series',
        releaseYear: '2024',
        display: '6.6" IPS LCD',
        processor: 'MediaTek Helio P35',
        storage: ['64GB'],
        colors: ['Concord Black', 'Sea Green']
      },
      'g-stylus-5g-2024': {
        name: 'G Stylus 5G (XT2419)',
        displayName: 'Moto G Stylus 5G (XT2419/2024)',
        category: 'Moto G Series',
        releaseYear: '2024',
        display: '6.91" IPS LCD',
        processor: 'MediaTek Dimensity 7020',
        storage: ['256GB'],
        colors: ['Cosmic Black', 'Stardust White']
      },

      // Moto E Series
      'e13': {
        name: 'E13 (XT2345)',
        displayName: 'Moto E13 (XT2345/2023)',
        category: 'Moto E Series',
        releaseYear: '2023',
        display: '6.5" IPS LCD',
        processor: 'MediaTek Helio P22T',
        storage: ['64GB'],
        colors: ['Cosmic Black', 'Sandy Brown']
      },
      'e40': {
        name: 'E40 (XT2159)',
        displayName: 'Moto E40 (XT2159/2021)',
        category: 'Moto E Series',
        releaseYear: '2021',
        display: '6.5" IPS LCD',
        processor: 'MediaTek Helio P35',
        storage: ['64GB'],
        colors: ['Carbon Gray', 'Pink Clay']
      },
      'e32s': {
        name: 'E32S (XT2229)',
        displayName: 'Moto E32S (XT2229/2022)',
        category: 'Moto E Series',
        releaseYear: '2022',
        display: '6.5" IPS LCD',
        processor: 'MediaTek Helio G37',
        storage: ['64GB'],
        colors: ['Slate Gray', ' Misty Silver']
      },
      'e32': {
        name: 'E32 (XT2227)',
        displayName: 'Moto E32 (XT2227/2022)',
        category: 'Moto E Series',
        releaseYear: '2022',
        display: '6.5" IPS LCD',
        processor: 'MediaTek Helio G37',
        storage: ['64GB'],
        colors: ['Slate Gray', ' Misty Silver']
      },
      'e30': {
        name: 'E30 (XT2158)',
        displayName: 'Moto E30 (XT2158/2021)',
        category: 'Moto E Series',
        releaseYear: '2021',
        display: '6.5" IPS LCD',
        processor: 'MediaTek Helio P22',
        storage: ['32GB', '64GB'],
        colors: ['Dark Pearl', 'Additional Gray']
      },

      // Moto Edge Series
      'edge': {
        name: 'Edge (XT2519)',
        displayName: 'Moto Edge (XT2519/2025)',
        category: 'Moto Edge Series',
        releaseYear: '2025',
        display: '6.6" pOLED',
        processor: 'MediaTek Dimensity 7300',
        storage: ['256GB'],
        colors: ['Nebula Blue', 'Stardust White']
      },
      'edge-60': {
        name: 'Edge 60 (XT2505)',
        displayName: 'Moto Edge 60 (XT2505/2025)',
        category: 'Moto Edge Series',
        releaseYear: '2025',
        display: '6.79" pOLED',
        processor: 'MediaTek Dimensity 930',
        storage: ['256GB', '512GB'],
        colors: ['Sage Green', 'Midnight Blue']
      },
      'edge-60-stylus': {
        name: 'Edge 60 Stylus (XT2517-4)',
        displayName: 'Moto Edge 60 Stylus (XT2517-4/2025)',
        category: 'Moto Edge Series',
        releaseYear: '2025',
        display: '6.9" IPS LCD',
        processor: 'MediaTek Dimensity 7025',
        storage: ['256GB'],
        colors: ['Sage Green', 'Midnight Blue']
      },
      'edge-60-pro': {
        name: 'Edge 60 Pro (XT2507)',
        displayName: 'Moto Edge 60 Pro (XT2507/2025)',
        category: 'Moto Edge Series',
        releaseYear: '2025',
        display: '6.79" pOLED',
        processor: 'MediaTek Dimensity 930',
        storage: ['256GB', '512GB'],
        colors: ['Sage Green', 'Midnight Blue']
      },
      'edge-60-fusion': {
        name: 'Edge 60 Fusion (XT2503)',
        displayName: 'Moto Edge 60 Fusion (XT2503/2025)',
        category: 'Moto Edge Series',
        releaseYear: '2025',
        display: '6.79" pOLED',
        processor: 'MediaTek Dimensity 930',
        storage: ['256GB'],
        colors: ['Sage Green', 'Midnight Blue']
      },
      'edge-s50': {
        name: 'Edge S50 (XT2409)',
        displayName: 'Moto Edge S50 (XT2409/2024)',
        category: 'Moto Edge Series',
        releaseYear: '2024',
        display: '6.79" pOLED',
        processor: 'MediaTek Dimensity 7300',
        storage: ['256GB'],
        colors: ['Sage Green', 'Midnight Blue']
      },
      'edge-50-fusion-5g': {
        name: 'Edge 50 Fusion 5G (XT2429)',
        displayName: 'Moto Edge 50 Fusion 5G (XT2429/2024)',
        category: 'Moto Edge Series',
        releaseYear: '2024',
        display: '6.7" pOLED',
        processor: 'MediaTek Dimensity 7300',
        storage: ['256GB'],
        colors: ['Hot Pink', 'Forest Grey']
      },
      'edge-50-ultra': {
        name: 'Edge 50 Ultra (XT2401-2)',
        displayName: 'Moto Edge 50 Ultra (XT2401-2/2024)',
        category: 'Moto Edge Series',
        releaseYear: '2024',
        display: '6.7" pOLED',
        processor: 'MediaTek Dimensity 7300',
        storage: ['256GB', '512GB'],
        colors: ['Hot Pink', 'Forest Grey']
      },
      'edge-50': {
        name: 'Edge 50 (XT2407-3)',
        displayName: 'Moto Edge 50 (XT2407-3/2024)',
        category: 'Moto Edge Series',
        releaseYear: '2024',
        display: '6.7" pOLED',
        processor: 'MediaTek Dimensity 7300',
        storage: ['256GB'],
        colors: ['Hot Pink', 'Forest Grey']
      },
      'edge-2024': {
        name: 'Edge (XT2405)',
        displayName: 'Moto Edge (XT2405/2024)',
        category: 'Moto Edge Series',
        releaseYear: '2024',
        display: '6.6" pOLED',
        processor: 'MediaTek Dimensity 7020',
        storage: ['256GB'],
        colors: ['Nebula Blue', 'Stardust White']
      },

      // Razr Series
      'razr-plus-60-ultra': {
        name: 'Razr Plus / Razr 60 Ultra (XT2551)',
        displayName: 'Razr Plus / Razr 60 Ultra (XT2551/2025)',
        category: 'Razr Series',
        releaseYear: '2025',
        display: '6.9" pOLED (unfolded), 4.0" pOLED (folded)',
        processor: 'MediaTek Dimensity 7300',
        storage: ['256GB', '512GB'],
        colors: ['Sage Green', 'Midnight Blue']
      },
      'razr-60': {
        name: 'Razr / Razr 60 (XT2553)',
        displayName: 'Razr / Razr 60 (XT2553/2025)',
        category: 'Razr Series',
        releaseYear: '2025',
        display: '6.9" pOLED (unfolded), 4.0" pOLED (folded)',
        processor: 'MediaTek Dimensity 7300',
        storage: ['256GB'],
        colors: ['Sage Green', 'Midnight Blue']
      },
      'razr-plus-50-ultra': {
        name: 'Razr Plus / Razr 50 Ultra (XT2451)',
        displayName: 'Razr Plus / Razr 50 Ultra (XT2451/2024)',
        category: 'Razr Series',
        releaseYear: '2024',
        display: '6.9" pOLED (unfolded), 4.0" pOLED (folded)',
        processor: 'MediaTek Dimensity 7300',
        storage: ['256GB', '512GB'],
        colors: ['Sage Green', 'Midnight Blue']
      },
      'razr-50': {
        name: 'Razr / Razr 50 (XT2453)',
        displayName: 'Razr / Razr 50 (XT2453/2024)',
        category: 'Razr Series',
        releaseYear: '2024',
        display: '6.9" pOLED (unfolded), 4.0" pOLED (folded)',
        processor: 'MediaTek Dimensity 7300',
        storage: ['256GB'],
        colors: ['Sage Green', 'Midnight Blue']
      },
      'razr-plus-40-ultra': {
        name: 'Razr Plus / Razr 40 Ultra (XT2321)',
        displayName: 'Razr Plus / Razr 40 Ultra (XT2321/2023)',
        category: 'Razr Series',
        releaseYear: '2023',
        display: '6.9" pOLED (unfolded), 3.6" gOLED (folded)',
        processor: 'Snapdragon 8+ Gen 1',
        storage: ['256GB', '512GB'],
        colors: ['Infinite Black', 'Viva Magenta']
      },
      'razr-40': {
        name: 'Razr / Razr 40 (XT2323)',
        displayName: 'Razr / Razr 40 (XT2323/2023)',
        category: 'Razr Series',
        releaseYear: '2023',
        display: '6.9" pOLED (unfolded), 3.6" gOLED (folded)',
        processor: 'Snapdragon 7 Gen 1',
        storage: ['256GB'],
        colors: ['Infinite Black', 'Viva Magenta']
      },
      'razr-5g': {
        name: 'Razr 5G (XT2251)',
        displayName: 'Razr 5G (XT2251/2022)',
        category: 'Razr Series',
        releaseYear: '2022',
        display: '6.7" pOLED (unfolded), 2.7" gOLED (folded)',
        processor: 'Snapdragon 765G',
        storage: ['256GB'],
        colors: ['Polished Graphite', 'Luxe Lavender']
      },

      // Moto One Series
      'one-5g-ace': {
        name: 'One 5G Ace (XT2113)',
        displayName: 'Moto One 5G Ace (XT2113/2021)',
        category: 'Moto One Series',
        releaseYear: '2021',
        display: '6.7" IPS LCD',
        processor: 'Snapdragon 750G',
        storage: ['128GB'],
        colors: ['Volcanic Gray', 'Pearl White']
      },
      'one-5g': {
        name: 'One 5G (XT2075-1)',
        displayName: 'Moto One 5G (XT2075-1/2020)',
        category: 'Moto One Series',
        releaseYear: '2020',
        display: '6.7" IPS LCD',
        processor: 'Snapdragon 765',
        storage: ['128GB'],
        colors: ['Oxford Blue', 'Polished Graphite']
      },
      'one-fusion': {
        name: 'One Fusion (XT2073)',
        displayName: 'Moto One Fusion (XT2073/2020)',
        category: 'Moto One Series',
        releaseYear: '2020',
        display: '6.5" IPS LCD',
        processor: 'Snapdragon 710',
        storage: ['128GB'],
        colors: ['Deep Sapphire', 'Emerald Green']
      },
      'one-fusion-plus': {
        name: 'One Fusion Plus (XT2067)',
        displayName: 'Moto One Fusion Plus (XT2067/2020)',
        category: 'Moto One Series',
        releaseYear: '2020',
        display: '6.5" IPS LCD',
        processor: 'Snapdragon 730',
        storage: ['128GB'],
        colors: ['Twilight Blue', 'Marine Blue']
      },
      'one-hyper': {
        name: 'One Hyper (XT2027)',
        displayName: 'Moto One Hyper (XT2027/2019)',
        category: 'Moto One Series',
        releaseYear: '2019',
        display: '6.5" IPS LCD',
        processor: 'Snapdragon 675',
        storage: ['128GB'],
        colors: ['Fresh Orchid', 'Ultra Black']
      },

      // Droid Series
      'droid-turbo-2': {
        name: 'Droid Turbo 2 (XT1585)',
        displayName: 'Droid Turbo 2 (XT1585/2015)',
        category: 'Droid Series',
        releaseYear: '2015',
        display: '5.4" Super AMOLED',
        processor: 'Snapdragon 810',
        storage: ['32GB', '64GB'],
        colors: ['Ballistic Nylon', 'Black']
      },
      'droid-maxx-2': {
        name: 'Droid Maxx 2 (XT1565)',
        displayName: 'Droid Maxx 2 (XT1565/2015)',
        category: 'Droid Series',
        releaseYear: '2015',
        display: '5.4" Super AMOLED',
        processor: 'Snapdragon 810',
        storage: ['16GB', '32GB'],
        colors: ['Black', 'Champagne']
      },
      'droid-turbo': {
        name: 'Droid Turbo (XT1254)',
        displayName: 'Droid Turbo (XT1254/2014)',
        category: 'Droid Series',
        releaseYear: '2014',
        display: '5.2" Super AMOLED',
        processor: 'Snapdragon 805',
        storage: ['16GB', '32GB'],
        colors: ['Black', 'White']
      },
      'droid-maxx': {
        name: 'Droid Maxx (XT1080)',
        displayName: 'Droid Maxx (XT1080/2013)',
        category: 'Droid Series',
        releaseYear: '2013',
        display: '5.0" Super AMOLED',
        processor: 'Snapdragon 800',
        storage: ['16GB', '32GB'],
        colors: ['Black', 'White']
      },
      'droid-mini': {
        name: 'Droid Mini (XT1030)',
        displayName: 'Droid Mini (XT1030/2013)',
        category: 'Droid Series',
        releaseYear: '2013',
        display: '4.3" Super AMOLED',
        processor: 'Snapdragon 800',
        storage: ['8GB', '16GB'],
        colors: ['Black', 'White']
      },

      // Moto Z Series
      'z4': {
        name: 'Z4 (XT1980)',
        displayName: 'Moto Z4 (XT1980/2019)',
        category: 'Moto Z Series',
        releaseYear: '2019',
        display: '6.4" Super AMOLED',
        processor: 'Snapdragon 675',
        storage: ['128GB'],
        colors: ['Flash Gray', 'Studio Black']
      },
      'z3-play': {
        name: 'Z3 Play (XT1929)',
        displayName: 'Moto Z3 Play (XT1929/2018)',
        category: 'Moto Z Series',
        releaseYear: '2018',
        display: '6.01" Super AMOLED',
        processor: 'Snapdragon 636',
        storage: ['32GB', '64GB'],
        colors: ['Arctic Gray', 'Deep Indigo']
      },
      'z3': {
        name: 'Z3 (XT1929-17)',
        displayName: 'Moto Z3 (XT1929-17/2018)',
        category: 'Moto Z Series',
        releaseYear: '2018',
        display: '6.01" Super AMOLED',
        processor: 'Snapdragon 636',
        storage: ['32GB', '64GB'],
        colors: ['Ceramic Black', 'Gold Platinum']
      },
      'z2-force': {
        name: 'Z2 Force (XT1789)',
        displayName: 'Moto Z2 Force (XT1789/2017)',
        category: 'Moto Z Series',
        releaseYear: '2017',
        display: '5.5" Super AMOLED',
        processor: 'Snapdragon 835',
        storage: ['64GB', '128GB'],
        colors: ['Super Black', 'Lunar Gray']
      },
      'z2-play': {
        name: 'Z2 Play (XT1710)',
        displayName: 'Moto Z2 Play (XT1710/2017)',
        category: 'Moto Z Series',
        releaseYear: '2017',
        display: '5.5" Super AMOLED',
        processor: 'Snapdragon 626',
        storage: ['32GB', '64GB'],
        colors: ['Lunar Gray', 'Fine Gold']
      },

      // X Series
      'x30-pro': {
        name: 'X30 Pro (XT2241)',
        displayName: 'Moto X30 Pro (XT2241/2022)',
        category: 'X Series',
        releaseYear: '2022',
        display: '6.7" pOLED',
        processor: 'Snapdragon 8+ Gen 1',
        storage: ['256GB', '512GB'],
        colors: ['Cosmic Black', 'Solar White']
      },
      'x4': {
        name: 'X4 (XT1900)',
        displayName: 'Moto X4 (XT1900/2017)',
        category: 'X Series',
        releaseYear: '2017',
        display: '5.2" Super AMOLED',
        processor: 'Snapdragon 630',
        storage: ['32GB', '64GB'],
        colors: ['Sterling Blue', 'Super Black']
      },
      'x2': {
        name: 'X2 (XT1096)',
        displayName: 'Moto X2 (XT1096/2014)',
        category: 'X Series',
        releaseYear: '2014',
        display: '5.2" Super AMOLED',
        processor: 'Snapdragon 801',
        storage: ['16GB', '32GB'],
        colors: ['Black', 'White']
      },
      'x': {
        name: 'X (XT1060)',
        displayName: 'Moto X (XT1060/2013)',
        category: 'X Series',
        releaseYear: '2013',
        display: '4.7" Super AMOLED',
        processor: 'Snapdragon 800',
        storage: ['16GB', '32GB'],
        colors: ['Black', 'White']
      },
      'x-force': {
        name: 'X Force (XT1580)',
        displayName: 'Moto X Force (XT1580/2015)',
        category: 'X Series',
        releaseYear: '2015',
        display: '5.4" Super AMOLED',
        processor: 'Snapdragon 810',
        storage: ['32GB'],
        colors: ['Black', 'White']
      },

      // Watch Series
      'moto-360-2nd-gen': {
        name: 'Moto 360 (2nd gen)',
        displayName: 'Moto 360 (2nd Generation)',
        category: 'Watch Series',
        releaseYear: '2015',
        display: '1.56" LCD',
        processor: 'Snapdragon 400',
        storage: ['4GB'],
        colors: ['Black', 'Silver']
      }
    };

    return modelMap[modelSlug] || {
      name: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      displayName: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      category: 'Motorola Product',
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
          price: modelSlug.includes('edge') || modelSlug.includes('razr') ? 149.99 :
                 modelSlug.includes('g') ? 79.99 :
                 modelSlug.includes('e') ? 59.99 :
                 modelSlug.includes('z') ? 89.99 : 49.99,
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
          price: modelSlug.includes('edge') || modelSlug.includes('razr') ? 99.99 :
                 modelSlug.includes('g') ? 69.99 :
                 modelSlug.includes('e') ? 49.99 :
                 modelSlug.includes('z') ? 79.99 : 39.99,
          image: `/images/products/${modelSlug}-battery.jpg`,
          capacity: 'Original Motorola capacity',
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
              src={`/images/motorola/${model}.jpg`}
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
            {modelData.category === 'Moto G Series' && (
              <>
                <Link href="/products/motorola/g96" className={styles.modelLink}>
                  G96 (XT2531)
                </Link>
                <Link href="/products/motorola/g-stylus-5g" className={styles.modelLink}>
                  G Stylus 5G (XT2517)
                </Link>
                <Link href="/products/motorola/g24-power" className={styles.modelLink}>
                  G24 Power (XT2425)
                </Link>
                <Link href="/products/motorola/g24" className={styles.modelLink}>
                  G24 (XT2423)
                </Link>
              </>
            )}
            {modelData.category === 'Moto E Series' && (
              <>
                <Link href="/products/motorola/e13" className={styles.modelLink}>
                  E13 (XT2345)
                </Link>
                <Link href="/products/motorola/e40" className={styles.modelLink}>
                  E40 (XT2159)
                </Link>
                <Link href="/products/motorola/e32" className={styles.modelLink}>
                  E32 (XT2227)
                </Link>
                <Link href="/products/motorola/e30" className={styles.modelLink}>
                  E30 (XT2158)
                </Link>
              </>
            )}
            {modelData.category === 'Moto Edge Series' && (
              <>
                <Link href="/products/motorola/edge-60" className={styles.modelLink}>
                  Edge 60 (XT2505)
                </Link>
                <Link href="/products/motorola/edge-50-ultra" className={styles.modelLink}>
                  Edge 50 Ultra (XT2401-2)
                </Link>
                <Link href="/products/motorola/edge-50" className={styles.modelLink}>
                  Edge 50 (XT2407-3)
                </Link>
                <Link href="/products/motorola/edge-s50" className={styles.modelLink}>
                  Edge S50 (XT2409)
                </Link>
              </>
            )}
            {modelData.category === 'Razr Series' && (
              <>
                <Link href="/products/motorola/razr-plus-60-ultra" className={styles.modelLink}>
                  Razr Plus / Razr 60 Ultra (XT2551)
                </Link>
                <Link href="/products/motorola/razr-60" className={styles.modelLink}>
                  Razr / Razr 60 (XT2553)
                </Link>
                <Link href="/products/motorola/razr-plus-50-ultra" className={styles.modelLink}>
                  Razr Plus / Razr 50 Ultra (XT2451)
                </Link>
                <Link href="/products/motorola/razr-40" className={styles.modelLink}>
                  Razr / Razr 40 (XT2323)
                </Link>
              </>
            )}
            {modelData.category === 'Moto One Series' && (
              <>
                <Link href="/products/motorola/one-5g-ace" className={styles.modelLink}>
                  One 5G Ace (XT2113)
                </Link>
                <Link href="/products/motorola/one-5g" className={styles.modelLink}>
                  One 5G (XT2075-1)
                </Link>
                <Link href="/products/motorola/one-fusion" className={styles.modelLink}>
                  One Fusion (XT2073)
                </Link>
                <Link href="/products/motorola/one-hyper" className={styles.modelLink}>
                  One Hyper (XT2027)
                </Link>
              </>
            )}
            {modelData.category === 'Droid Series' && (
              <>
                <Link href="/products/motorola/droid-turbo-2" className={styles.modelLink}>
                  Droid Turbo 2 (XT1585)
                </Link>
                <Link href="/products/motorola/droid-maxx-2" className={styles.modelLink}>
                  Droid Maxx 2 (XT1565)
                </Link>
                <Link href="/products/motorola/droid-turbo" className={styles.modelLink}>
                  Droid Turbo (XT1254)
                </Link>
                <Link href="/products/motorola/droid-maxx" className={styles.modelLink}>
                  Droid Maxx (XT1080)
                </Link>
              </>
            )}
            {modelData.category === 'Moto Z Series' && (
              <>
                <Link href="/products/motorola/z4" className={styles.modelLink}>
                  Z4 (XT1980)
                </Link>
                <Link href="/products/motorola/z3-play" className={styles.modelLink}>
                  Z3 Play (XT1929)
                </Link>
                <Link href="/products/motorola/z2-force" className={styles.modelLink}>
                  Z2 Force (XT1789)
                </Link>
                <Link href="/products/motorola/z2-play" className={styles.modelLink}>
                  Z2 Play (XT1710)
                </Link>
              </>
            )}
            {modelData.category === 'X Series' && (
              <>
                <Link href="/products/motorola/x30-pro" className={styles.modelLink}>
                  X30 Pro (XT2241)
                </Link>
                <Link href="/products/motorola/x4" className={styles.modelLink}>
                  X4 (XT1900)
                </Link>
                <Link href="/products/motorola/x-force" className={styles.modelLink}>
                  X Force (XT1580)
                </Link>
                <Link href="/products/motorola/x" className={styles.modelLink}>
                  X (XT1060)
                </Link>
              </>
            )}
            {modelData.category === 'Watch Series' && (
              <>
                <Link href="/products/motorola/moto-360-2nd-gen" className={styles.modelLink}>
                  Moto 360 (2nd gen)
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
  // Generate paths for popular Motorola product models
  const models = [
    // Moto G Series
    'g96',
    'g-stylus-5g',
    'g15-power',
    'g15',
    'g05',
    'g-5g',
    'g-power',
    'g24-power',
    'g24',
    'g04',
    'g-stylus-5g-2024',
    // Moto E Series
    'e13',
    'e40',
    'e32s',
    'e32',
    'e30',
    // Moto Edge Series
    'edge',
    'edge-60',
    'edge-60-stylus',
    'edge-60-pro',
    'edge-60-fusion',
    'edge-s50',
    'edge-50-fusion-5g',
    'edge-50-ultra',
    'edge-50',
    'edge-2024',
    // Razr Series
    'razr-plus-60-ultra',
    'razr-60',
    'razr-plus-50-ultra',
    'razr-50',
    'razr-plus-40-ultra',
    'razr-40',
    'razr-5g',
    // Moto One Series
    'one-5g-ace',
    'one-5g',
    'one-fusion',
    'one-fusion-plus',
    'one-hyper',
    // Droid Series
    'droid-turbo-2',
    'droid-maxx-2',
    'droid-turbo',
    'droid-maxx',
    'droid-mini',
    // Moto Z Series
    'z4',
    'z3-play',
    'z3',
    'z2-force',
    'z2-play',
    // X Series
    'x30-pro',
    'x4',
    'x2',
    'x',
    'x-force',
    // Watch Series
    'moto-360-2nd-gen'
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
