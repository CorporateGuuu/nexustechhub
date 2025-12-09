'use client';
import { useState } from 'react';
import Link from 'next/link';

// Convert category names to kebab-case slugs
const categoryToSlug = (category: string) => {
  return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
};

const navItems = [
  { name: 'Apple', href: '/parts/apple', hasDropdown: true },
  { name: 'Samsung', href: '/parts/samsung', hasDropdown: false },
  { name: 'Motorola', href: '/parts/motorola', hasDropdown: false },
  { name: 'Google', href: '/parts/google-pixel', hasDropdown: false },
  { name: 'Other Parts', href: '/parts/other-parts', hasDropdown: false },
  { name: 'Game Console', href: '/parts/game-console', hasDropdown: false },
  { name: 'Accessories', href: '/parts/accessories', hasDropdown: true },
  { name: 'Tools & Supplies', href: '/parts/tools-and-supplies', hasDropdown: true },
  { name: 'Refurbishing', href: '/parts/refurbishing', hasDropdown: true },
  { name: 'Board Components', href: '/parts/board-components', hasDropdown: true },
  { name: 'Pre-Owned Devices', href: '/pre-owned-devices', hasDropdown: false }
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    console.log(`Category clicked: ${categoryName}`);
  };

  const toggleDropdown = (categoryName: string) => {
    setDropdownOpen(dropdownOpen === categoryName ? null : categoryName);
  };

  return (
    <nav className="bg-gray-50 py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2"
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>

        <ul className={`lg:flex lg:static absolute lg:bg-transparent bg-white lg:shadow-none shadow-lg lg:max-h-full transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'
        } top-full left-0 right-0 z-50`}>
          {navItems.map((item, index) => (
            <li key={index} className="w-full lg:w-auto relative">
              {item.hasDropdown ? (
                // Dropdown categories
                <div className="relative">
                  <button
                    onClick={() => {
                      handleCategoryClick(item.name);
                      toggleDropdown(item.name);
                    }}
                    className="flex items-center space-x-1 w-full lg:w-auto text-gray-700 font-semibold text-sm py-2 px-4 hover:text-blue-600 transition-colors"
                  >
                    <span>{item.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  {/* Simple dropdown menu */}
                  {dropdownOpen === item.name && (
                    <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 min-w-[200px]">
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          console.log(`Navigating to: ${item.href}`);
                          setDropdownOpen(null);
                        }}
                      >
                        View All {item.name}
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          console.log(`Sub-category clicked for ${item.name}`);
                          setDropdownOpen(null);
                        }}
                      >
                        Popular Items
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          console.log(`Sub-category clicked for ${item.name}`);
                          setDropdownOpen(null);
                        }}
                      >
                        New Arrivals
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Direct link categories
                <Link
                  href={item.href}
                  onClick={() => handleCategoryClick(item.name)}
                  className="block text-gray-700 font-semibold text-sm py-2 px-4 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
