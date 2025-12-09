'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const categories = [
  {
    name: 'Apple',
    href: '/parts/apple',
    subcategories: [
      {
        name: 'iPhone Parts',
        href: '/parts/apple/iphone-parts',
        items: [
          { name: 'Screens & Displays', href: '/parts/apple/iphone-parts/screens' },
          { name: 'Batteries', href: '/parts/apple/iphone-parts/batteries' },
          { name: 'Cameras', href: '/parts/apple/iphone-parts/cameras' },
          { name: 'Charging Ports', href: '/parts/apple/iphone-parts/charging-ports' },
          { name: 'Home Buttons', href: '/parts/apple/iphone-parts/home-buttons' },
          { name: 'Speakers', href: '/parts/apple/iphone-parts/speakers' }
        ]
      },
      {
        name: 'iPad Parts',
        href: '/parts/apple/ipad-parts',
        items: [
          { name: 'Screens', href: '/parts/apple/ipad-parts/screens' },
          { name: 'Batteries', href: '/parts/apple/ipad-parts/batteries' },
          { name: 'Charging Ports', href: '/parts/apple/ipad-parts/charging-ports' },
          { name: 'Home Buttons', href: '/parts/apple/ipad-parts/home-buttons' }
        ]
      },
      {
        name: 'MacBook Parts',
        href: '/parts/apple/macbook-parts',
        items: [
          { name: 'Screens', href: '/parts/apple/macbook-parts/screens' },
          { name: 'Keyboards', href: '/parts/apple/macbook-parts/keyboards' },
          { name: 'Trackpads', href: '/parts/apple/macbook-parts/trackpads' },
          { name: 'Batteries', href: '/parts/apple/macbook-parts/batteries' }
        ]
      },
      {
        name: 'Apple Watch Parts',
        href: '/parts/apple/watch-parts',
        items: [
          { name: 'Screens', href: '/parts/apple/watch-parts/screens' },
          { name: 'Bands', href: '/parts/apple/watch-parts/bands' },
          { name: 'Batteries', href: '/parts/apple/watch-parts/batteries' }
        ]
      },
      {
        name: 'AirPods & Accessories',
        href: '/parts/apple/airpods',
        items: [
          { name: 'Cases', href: '/parts/apple/airpods/cases' },
          { name: 'Earbuds', href: '/parts/apple/airpods/earbuds' },
          { name: 'Charging Cases', href: '/parts/apple/airpods/charging-cases' }
        ]
      }
    ]
  },
  {
    name: 'Samsung',
    href: '/parts/samsung',
    subcategories: [
      {
        name: 'Galaxy Phone Parts',
        href: '/parts/samsung/galaxy-phone-parts',
        items: [
          { name: 'Screens', href: '/parts/samsung/galaxy-phone-parts/screens' },
          { name: 'Batteries', href: '/parts/samsung/galaxy-phone-parts/batteries' },
          { name: 'Cameras', href: '/parts/samsung/galaxy-phone-parts/cameras' },
          { name: 'Charging Ports', href: '/parts/samsung/galaxy-phone-parts/charging-ports' },
          { name: 'Motherboards', href: '/parts/samsung/galaxy-phone-parts/motherboards' }
        ]
      },
      {
        name: 'Galaxy Tab Parts',
        href: '/parts/samsung/galaxy-tab-parts',
        items: [
          { name: 'Screens', href: '/parts/samsung/galaxy-tab-parts/screens' },
          { name: 'Batteries', href: '/parts/samsung/galaxy-tab-parts/batteries' },
          { name: 'Charging Ports', href: '/parts/samsung/galaxy-tab-parts/charging-ports' }
        ]
      }
    ]
  },
  {
    name: 'Motorola',
    href: '/parts/motorola',
    subcategories: [
      {
        name: 'Moto Phone Parts',
        href: '/parts/motorola/moto-phone-parts',
        items: [
          { name: 'Screens', href: '/parts/motorola/moto-phone-parts/screens' },
          { name: 'Batteries', href: '/parts/motorola/moto-phone-parts/batteries' },
          { name: 'Cameras', href: '/parts/motorola/moto-phone-parts/cameras' },
          { name: 'Charging Ports', href: '/parts/motorola/moto-phone-parts/charging-ports' }
        ]
      }
    ]
  },
  {
    name: 'Google',
    href: '/parts/google-pixel',
    subcategories: [
      {
        name: 'Pixel Phone Parts',
        href: '/parts/google-pixel/pixel-phone-parts',
        items: [
          { name: 'Screens', href: '/parts/google-pixel/pixel-phone-parts/screens' },
          { name: 'Batteries', href: '/parts/google-pixel/pixel-phone-parts/batteries' },
          { name: 'Cameras', href: '/parts/google-pixel/pixel-phone-parts/cameras' },
          { name: 'Charging Ports', href: '/parts/google-pixel/pixel-phone-parts/charging-ports' }
        ]
      }
    ]
  },
  {
    name: 'Other Parts',
    href: '/parts/other-parts',
    subcategories: [
      {
        name: 'LG Parts',
        href: '/parts/other-parts/lg-parts',
        items: [
          { name: 'Screens', href: '/parts/other-parts/lg-parts/screens' },
          { name: 'Batteries', href: '/parts/other-parts/lg-parts/batteries' }
        ]
      },
      {
        name: 'OnePlus Parts',
        href: '/parts/other-parts/oneplus-parts',
        items: [
          { name: 'Screens', href: '/parts/other-parts/oneplus-parts/screens' },
          { name: 'Batteries', href: '/parts/other-parts/oneplus-parts/batteries' }
        ]
      }
    ]
  },
  {
    name: 'Game Console',
    href: '/parts/game-console',
    subcategories: [
      {
        name: 'PlayStation Parts',
        href: '/parts/game-console/playstation-parts',
        items: [
          { name: 'Controllers', href: '/parts/game-console/playstation-parts/controllers' },
          { name: 'Chargers', href: '/parts/game-console/playstation-parts/chargers' }
        ]
      },
      {
        name: 'Xbox Parts',
        href: '/parts/game-console/xbox-parts',
        items: [
          { name: 'Controllers', href: '/parts/game-console/xbox-parts/controllers' },
          { name: 'Chargers', href: '/parts/game-console/xbox-parts/chargers' }
        ]
      },
      {
        name: 'Nintendo Parts',
        href: '/parts/game-console/nintendo-parts',
        items: [
          { name: 'Joy-Cons', href: '/parts/game-console/nintendo-parts/joy-cons' },
          { name: 'Chargers', href: '/parts/game-console/nintendo-parts/chargers' }
        ]
      }
    ]
  },
  {
    name: 'Accessories',
    href: '/parts/accessories',
    subcategories: [
      {
        name: 'Chargers & Cables',
        href: '/parts/accessories/chargers-cables',
        items: [
          { name: 'USB-C Cables', href: '/parts/accessories/chargers-cables/usb-c-cables' },
          { name: 'Lightning Cables', href: '/parts/accessories/chargers-cables/lightning-cables' },
          { name: 'Wall Chargers', href: '/parts/accessories/chargers-cables/wall-chargers' },
          { name: 'Car Chargers', href: '/parts/accessories/chargers-cables/car-chargers' },
          { name: 'Wireless Chargers', href: '/parts/accessories/chargers-cables/wireless-chargers' },
          { name: 'Power Banks', href: '/parts/accessories/chargers-cables/power-banks' }
        ]
      },
      {
        name: 'Cases & Protection',
        href: '/parts/accessories/cases-protection',
        items: [
          { name: 'iPhone Cases', href: '/parts/accessories/cases-protection/iphone-cases' },
          { name: 'Samsung Cases', href: '/parts/accessories/cases-protection/samsung-cases' },
          { name: 'Screen Protectors', href: '/parts/accessories/cases-protection/screen-protectors' },
          { name: 'Tempered Glass', href: '/parts/accessories/cases-protection/tempered-glass' }
        ]
      },
      {
        name: 'Audio',
        href: '/parts/accessories/audio',
        items: [
          { name: 'Wired Earphones', href: '/parts/accessories/audio/wired-earphones' },
          { name: 'Bluetooth Earbuds', href: '/parts/accessories/audio/bluetooth-earbuds' },
          { name: 'Headphones', href: '/parts/accessories/audio/headphones' },
          { name: 'Speakers', href: '/parts/accessories/audio/speakers' }
        ]
      },
      {
        name: 'Mounts & Holders',
        href: '/parts/accessories/mounts-holders',
        items: [
          { name: 'Car Mounts', href: '/parts/accessories/mounts-holders/car-mounts' },
          { name: 'Desk Stands', href: '/parts/accessories/mounts-holders/desk-stands' },
          { name: 'Bike Mounts', href: '/parts/accessories/mounts-holders/bike-mounts' }
        ]
      }
    ]
  },
  {
    name: 'Tools & Supplies',
    href: '/parts/tools-and-supplies',
    subcategories: [
      {
        name: 'Essentials',
        href: '/parts/tools-and-supplies/essentials',
        items: [
          { name: 'Screwdrivers', href: '/parts/tools-and-supplies/essentials/screwdrivers' },
          { name: 'Tweezers', href: '/parts/tools-and-supplies/essentials/tweezers' },
          { name: 'Tool Kits', href: '/parts/tools-and-supplies/essentials/tool-kits' },
          { name: 'Adhesive Tapes', href: '/parts/tools-and-supplies/essentials/adhesive-tapes' },
          { name: 'Pry Tools', href: '/parts/tools-and-supplies/essentials/pry-tools' }
        ]
      },
      {
        name: 'Testing Devices',
        href: '/parts/tools-and-supplies/testing-devices',
        items: [
          { name: 'Screen Tester', href: '/parts/tools-and-supplies/testing-devices/screen-tester' },
          { name: 'Battery Tester', href: '/parts/tools-and-supplies/testing-devices/battery-tester' },
          { name: 'Tristar Tester', href: '/parts/tools-and-supplies/testing-devices/tristar-tester' },
          { name: 'MFI Tester', href: '/parts/tools-and-supplies/testing-devices/mfi-tester' }
        ]
      },
      {
        name: 'Microsoldering',
        href: '/parts/tools-and-supplies/microsoldering',
        items: [
          { name: 'Hot Air Stations', href: '/parts/tools-and-supplies/microsoldering/hot-air-stations' },
          { name: 'Soldering Stations', href: '/parts/tools-and-supplies/microsoldering/soldering-stations' },
          { name: 'Board Holders', href: '/parts/tools-and-supplies/microsoldering/board-holders' }
        ]
      }
    ]
  },
  {
    name: 'Refurbishing',
    href: '/parts/refurbishing',
    subcategories: [
      {
        name: 'OCA Machines',
        href: '/parts/refurbishing/oca-machines',
        items: [
          { name: 'Forward OCA Pro', href: '/parts/refurbishing/oca-machines/forward-oca-pro' },
          { name: 'TBK-578', href: '/parts/refurbishing/oca-machines/tbk-578' },
          { name: 'Mini Laminators', href: '/parts/refurbishing/oca-machines/mini-laminators' }
        ]
      },
      {
        name: 'Bubble Removers',
        href: '/parts/refurbishing/bubble-removers',
        items: [
          { name: 'Auto Bubble Remover', href: '/parts/refurbishing/bubble-removers/auto-bubble-remover' },
          { name: '30L Autoclave', href: '/parts/refurbishing/bubble-removers/30l-autoclave' }
        ]
      },
      {
        name: 'Separation',
        href: '/parts/refurbishing/separation',
        items: [
          { name: 'Freezer Separator', href: '/parts/refurbishing/separation/freezer-separator' },
          { name: 'Hot Plate', href: '/parts/refurbishing/separation/hot-plate' },
          { name: 'Wire Separator', href: '/parts/refurbishing/separation/wire-separator' }
        ]
      }
    ]
  },
  {
    name: 'Board Components',
    href: '/parts/board-components',
    subcategories: [
      {
        name: 'IC Chips',
        href: '/parts/board-components/ic-chips',
        items: [
          { name: 'Tristar / Tigris', href: '/parts/board-components/ic-chips/tristar-tigris' },
          { name: 'Charging IC', href: '/parts/board-components/ic-chips/charging-ic' },
          { name: 'Audio IC', href: '/parts/board-components/ic-chips/audio-ic' },
          { name: 'Power IC', href: '/parts/board-components/ic-chips/power-ic' }
        ]
      },
      {
        name: 'Connectors',
        href: '/parts/board-components/connectors',
        items: [
          { name: 'FPC Connectors', href: '/parts/board-components/connectors/fpc-connectors' },
          { name: 'Battery Connectors', href: '/parts/board-components/connectors/battery-connectors' },
          { name: 'Charging Port', href: '/parts/board-components/connectors/charging-port' }
        ]
      },
      {
        name: 'Cameras',
        href: '/parts/board-components/cameras',
        items: [
          { name: 'Front Camera', href: '/parts/board-components/cameras/front-camera' },
          { name: 'Rear Camera Modules', href: '/parts/board-components/cameras/rear-camera-modules' }
        ]
      }
    ]
  }
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedCategories(new Set());
  };

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSubcategory = (categoryName: string, subcategoryName: string) => {
    const key = `${categoryName}-${subcategoryName}`;
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Open mobile menu"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}
          />

          {/* Side Menu */}
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out">
            <div className="flex flex-col h-full">

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-black text-sky-500 tracking-tight">NEXUS</span>
                  <span className="text-xl font-black text-gray-900 tracking-tight">TECHHUB</span>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Categories */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-6 mb-4">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Categories
                  </h2>
                </div>

                <nav className="px-4">
                  <div className="space-y-1">
                    {categories.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="border-b border-gray-100 last:border-b-0">
                        {/* Main Category */}
                        <button
                          onClick={() => toggleCategory(category.name)}
                          className="flex items-center justify-between w-full text-left px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span>{category.name}</span>
                          {expandedCategories.has(category.name) ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                        </button>

                        {/* Subcategories */}
                        {expandedCategories.has(category.name) && (
                          <div className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-1 duration-200">
                            {category.subcategories.map((subcategory, subIndex) => (
                              <div key={subIndex}>
                                {/* Subcategory Header */}
                                <button
                                  onClick={() => toggleSubcategory(category.name, subcategory.name)}
                                  className="flex items-center justify-between w-full text-left px-4 py-2 text-gray-600 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-all duration-200 text-sm"
                                >
                                  <span>{subcategory.name}</span>
                                  {expandedCategories.has(`${category.name}-${subcategory.name}`) ? (
                                    <ChevronDown className="w-3 h-3 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="w-3 h-3 text-gray-400" />
                                  )}
                                </button>

                                {/* Subcategory Items */}
                                {expandedCategories.has(`${category.name}-${subcategory.name}`) && (
                                  <div className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-1 duration-200">
                                    {subcategory.items.map((item, itemIndex) => (
                                      <Link
                                        key={itemIndex}
                                        href={item.href}
                                        onClick={closeMenu}
                                        className="block w-full text-left px-4 py-2 text-gray-500 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-all duration-200 text-xs pl-6"
                                      >
                                        {item.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

                {/* Additional Links */}
                <div className="px-6 mt-8 mb-4">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Quick Links
                  </h2>
                </div>

                <nav className="px-4">
                  <div className="space-y-1">
                    <Link
                      href="/"
                      onClick={closeMenu}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-all duration-200"
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      onClick={closeMenu}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-all duration-200"
                    >
                      All Products
                    </Link>
                    <Link
                      href="/cart"
                      onClick={closeMenu}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition-all duration-200"
                    >
                      Cart
                    </Link>
                  </div>
                </nav>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-500">
                  © 2025 Nexus TechHub
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
