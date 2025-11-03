'use client';
import { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState('09:58:49');

  useEffect(() => {
    let timer = 9 * 3600 + 58 * 60 + 49; // Current time: 03:33 PM EST, adjust if needed
    const interval = setInterval(() => {
      if (timer > 0) {
        timer--;
        const h = String(Math.floor(timer / 3600)).padStart(2, '0');
        const m = String(Math.floor((timer % 3600) / 60)).padStart(2, '0');
        const s = String(timer % 60).padStart(2, '0');
        setTime(`${h}:${m}:${s}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-black text-white text-center py-2.5 text-sm z-50">
        Introducing the Genuine Apple Parts Program! Official Apple parts.{' '}
        <a href="#" className="font-semibold hover:underline">Learn More</a>
      </div>
      <header className="bg-white shadow-md sticky top-0 z-40 p-4">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-4">
          <div className="lg:w-1/6 w-1/2">
            <a href="/" className="text-3xl font-bold text-black">
              Nexus<span className="text-blue-600">T</span>ech Hub
            </a>
          </div>
          <div className="lg:w-5/12 w-full order-2 lg:order-none mt-3 lg:mt-0">
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl" aria-label="Search">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="lg:w-5/12 text-end">
            <div className="flex justify-end items-center gap-3">
              <a href="#" className="text-gray-600 text-sm">NT Services</a>
              <a href="/my-account" className="text-gray-600 text-sm">My Account</a>
              <a href="#" className="text-gray-600 text-sm">
                FedEx Ground <span className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">{time}</span>
              </a>
              <a href="#" className="bg-white border border-green-500 text-green-500 font-semibold px-3 py-1.5 rounded-full text-sm">
                Cart $0.00
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
