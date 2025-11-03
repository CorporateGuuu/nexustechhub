'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const categories = [
    {
      name: 'Macbook Parts',
      sub: [
        ['MacBook Air 13"', 'MacBook Pro 13"', 'MacBook Pro 14"', 'MacBook Pro 16"'],
        ['Screens', 'Keyboards', 'Batteries', 'Trackpads'],
        ['Logic Boards', 'RAM', 'SSD', 'Fans'],
        ['Cases', 'Hinges', 'Ports', 'Speakers']
      ]
    },
    {
      name: 'Game Console',
      sub: [
        ['PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One'],
        ['Controllers', 'Power Supplies', 'Disc Drives', 'Cooling Fans'],
        ['Motherboards', 'Hard Drives', 'Optical Drives', 'Cables'],
        ['Cases', 'Faceplates', 'Accessories', 'Repair Tools']
      ]
    },
    {
      name: 'iPhone Parts',
      sub: [
        ['iPhone 15 Series', 'iPhone 14 Series', 'iPhone 13 Series', 'iPhone 12 Series'],
        ['Screens', 'Batteries', 'Cameras', 'Charging Ports'],
        ['Face ID', 'Home Buttons', 'Speakers', 'Microphones'],
        ['Cases', 'Glass', 'Frames', 'Flex Cables']
      ]
    },
    {
      name: 'iPad Parts',
      sub: [
        ['iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad Mini'],
        ['Screens', 'Batteries', 'Cameras', 'Home Buttons'],
        ['Face ID', 'Touch ID', 'Speakers', 'Ports'],
        ['Cases', 'Glass', 'Frames', 'Logic Boards']
      ]
    },
    {
      name: 'Watch Parts',
      sub: [
        ['Apple Watch Series 9', 'Series 8', 'Series 7', 'Series 6'],
        ['Screens', 'Batteries', 'Bands', 'Cases'],
        ['Digital Crown', 'Side Button', 'Speakers', 'Sensors'],
        ['Tools', 'Adhesives', 'Screws', 'Chargers']
      ]
    },
    {
      name: 'iPod Parts',
      sub: [
        ['iPod Touch', 'iPod Classic', 'iPod Nano', 'iPod Shuffle'],
        ['Screens', 'Batteries', 'Buttons', 'Cases'],
        ['Logic Boards', 'Hard Drives', 'Headphone Jacks', 'Cameras'],
        ['Tools', 'Cables', 'Adapters', 'Accessories']
      ]
    },
    {
      name: 'AirPods Parts',
      sub: [
        ['AirPods Pro 2nd Gen', 'AirPods 3rd Gen', 'AirPods 2nd Gen', 'AirPods Max'],
        ['Drivers', 'Cases', 'Stems', 'Mesh'],
        ['Sensors', 'Microphones', 'Chips', 'Batteries'],
        ['Tools', 'Adhesives', 'Cables', 'Cases']
      ]
    },
    {
      name: 'Samsung Parts',
      sub: [
        ['Galaxy S24 Series', 'Galaxy S23 Series', 'Galaxy Note', 'Galaxy Z Fold'],
        ['Screens', 'Batteries', 'Cameras', 'Charging Ports'],
        ['Fingerprint', 'Face Unlock', 'Speakers', 'Vibration Motors'],
        ['Cases', 'Glass', 'Frames', 'Motherboards']
      ]
    },
    {
      name: 'Motorola Parts',
      sub: [
        ['Moto G Series', 'Moto Edge Series', 'Razr', 'One Series'],
        ['Screens', 'Batteries', 'Cameras', 'Charging Ports'],
        ['Fingerprint', 'Face Unlock', 'Speakers', 'Buttons'],
        ['Cases', 'Glass', 'Frames', 'Motherboards']
      ]
    },
    {
      name: 'Google',
      sub: [
        ['Pixel 8 Series', 'Pixel 7 Series', 'Pixel 6 Series', 'Pixel 5 Series'],
        ['Screens', 'Batteries', 'Cameras', 'Speakers'],
        ['Fingerprint', 'USB-C', 'SIM Card', 'Buttons'],
        ['Cases', 'Glass', 'Frames', 'Motherboards']
      ]
    },
    {
      name: 'Others',
      sub: [
        ['OnePlus', 'Sony', 'LG', 'Nokia'],
        ['Huawei', 'Xiaomi', 'Oppo', 'Vivo'],
        ['Asus', 'Lenovo', 'Dell', 'HP'],
        ['Acer', 'Toshiba', 'Panasonic', 'Others']
      ]
    }
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
        * { font-family: 'Open Sans', sans-serif; }
      `}</style>

      {/* Top Bar - Free Shipping Tiers */}
      <div className="bg-gray-100 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center space-x-4 text-sm">
            <span className="text-gray-600">FREE SHIPPING ON ORDERS OVER:</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">$750</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">$450</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">$250</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">$100</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm" style={{ height: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-48 h-12 bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg">
                MobileSentrix
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <div key={category.name} className="relative group">
                  <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors py-2">
                    {category.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 w-96 bg-white shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="grid grid-cols-4 gap-0 p-4">
                      {category.sub.map((column, colIndex) => (
                        <div key={colIndex} className="space-y-2">
                          {column.map((item) => (
                            <Link
                              key={item}
                              href={`/products/${category.name.toLowerCase().replace(' ', '-')}/${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                              className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search parts..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">

              {/* Cart */}
              <div className="relative">
                <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </button>

                {/* Cart Dropdown */}
                <div className="absolute top-full right-0 w-80 bg-white shadow-xl border border-gray-200 opacity-0 invisible hover:opacity-100 hover:visible transition-all duration-200 z-50">
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Shopping Cart</h3>
                    <p className="text-sm text-gray-500">Your cart is empty</p>
                    <Link href="/cart" className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg mt-4 hover:bg-blue-700 transition-colors">
                      View Cart
                    </Link>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Log In
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenu(true)}
                className="lg:hidden p-2 text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <div className="bg-white w-full h-full overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="w-48 h-12 bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg">
                  MobileSentrix
                </div>
                <button
                  onClick={() => setMobileMenu(false)}
                  className="p-2"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="p-4">
                {categories.map((category) => (
                  <div key={category.name} className="border-b border-gray-100 last:border-b-0">
                    <button className="w-full text-left py-3 px-2 text-gray-700 font-medium flex items-center justify-between">
                      {category.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-2 pb-3">
                      {category.sub.flat().slice(0, 8).map((item) => (
                        <Link
                          key={item}
                          href={`/products/${category.name.toLowerCase().replace(' ', '-')}/${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                          className="text-sm text-gray-600 hover:text-blue-600 py-1 px-2"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Log In</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Log In
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/register" className="text-blue-600 hover:underline text-sm">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
