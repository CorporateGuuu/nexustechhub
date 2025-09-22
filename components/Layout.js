import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, title, description }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Head>
        <title>{title || 'Nexus Tech Hub - Professional Mobile Repair Parts UAE'}</title>
        <meta name="description" content={description || 'Professional mobile device repair parts and services in UAE. Specializing in iPhone, Samsung, and iPad replacement parts with quality guarantee.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      {/* Header */}
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.headerContent}>
            {/* Logo */}
            <div className={styles.logo}>
              <Link href="/" onClick={closeMenu}>
                <img src="/Logos/NexusLogo.jpg" alt="Nexus Tech Hub" />
              </Link>
            </div>

            {/* Navigation - Desktop */}
            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <Link href="/" className={router.pathname === '/' ? styles.active : ''} onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <div className={styles.dropdown}>
                    <button className={styles.dropdownTrigger}>
                      Products
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className={styles.dropdownMenu}>
                      <div className={styles.dropdownGrid}>
                        <div className={styles.dropdownColumn}>
                          <h4>iPhone Parts</h4>
                          <Link href="/products/iphone-parts" onClick={closeMenu}>All iPhone Parts</Link>
                          <Link href="/products/iphone-screens" onClick={closeMenu}>Screens</Link>
                          <Link href="/products/iphone-batteries" onClick={closeMenu}>Batteries</Link>
                          <Link href="/products/iphone-cameras" onClick={closeMenu}>Cameras</Link>
                          <Link href="/products/iphone-charging" onClick={closeMenu}>Charging Ports</Link>
                        </div>
                        <div className={styles.dropdownColumn}>
                          <h4>Samsung Parts</h4>
                          <Link href="/products/samsung-parts" onClick={closeMenu}>All Samsung Parts</Link>
                          <Link href="/products/samsung-screens" onClick={closeMenu}>Screens</Link>
                          <Link href="/products/samsung-batteries" onClick={closeMenu}>Batteries</Link>
                        </div>
                        <div className={styles.dropdownColumn}>
                          <h4>iPad & Tablets</h4>
                          <Link href="/products/ipad-parts" onClick={closeMenu}>iPad Parts</Link>
                          <Link href="/products/ipad-parts" onClick={closeMenu}>Tablet Screens</Link>
                        </div>
                        <div className={styles.dropdownColumn}>
                          <h4>Tools & Equipment</h4>
                          <Link href="/products/repair-tools" onClick={closeMenu}>Repair Tools</Link>
                          <Link href="/products/tool-kits" onClick={closeMenu}>Tool Kits</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={styles.navItem}>
                  <Link href="/services" className={router.pathname === '/services' ? styles.active : ''} onClick={closeMenu}>
                    Services
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/about" className={router.pathname === '/about' ? styles.active : ''} onClick={closeMenu}>
                    About
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/contact" className={router.pathname === '/contact' ? styles.active : ''} onClick={closeMenu}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Search Bar */}
            <div className={styles.searchBar}>
              <form className={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>

            {/* Header Icons */}
            <div className={styles.headerIcons}>
              <Link href="/cart" className={styles.iconLink} title="Shopping Cart">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 22C7.89543 22 7 21.1046 7 20V8C7 6.89543 7.89543 6 9 6H15C16.1046 6 17 6.89543 17 8V20C17 21.1046 16.1046 22 15 22H9Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 6V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V6" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="9.5" cy="10.5" r="0.5" fill="currentColor"/>
                  <circle cx="14.5" cy="10.5" r="0.5" fill="currentColor"/>
                  <circle cx="9.5" cy="13.5" r="0.5" fill="currentColor"/>
                  <circle cx="14.5" cy="13.5" r="0.5" fill="currentColor"/>
                  <circle cx="9.5" cy="16.5" r="0.5" fill="currentColor"/>
                  <circle cx="14.5" cy="16.5" r="0.5" fill="currentColor"/>
                </svg>
                <span className={styles.cartCount}>0</span>
              </Link>
              <Link href="/account" className={styles.iconLink} title="My Account">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/contact" className={styles.iconLink} title="Support & Help">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuBtn}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className={styles.hamburger}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                <img src="/Logos/NexusLogo.jpg" alt="Nexus Tech Hub" />
                <p>Professional mobile repair parts and services in UAE</p>
              </div>
              <div className={styles.socialLinks}>
                <a href="#" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className={styles.footerColumn}>
              <h4>Products</h4>
              <Link href="/products/iphone-parts">iPhone Parts</Link>
              <Link href="/products/samsung-parts">Samsung Parts</Link>
              <Link href="/products/ipad-parts">iPad Parts</Link>
              <Link href="/products/repair-tools">Repair Tools</Link>
              <Link href="/products">All Products</Link>
            </div>

            <div className={styles.footerColumn}>
              <h4>Customer Service</h4>
              <Link href="/contact">Contact Us</Link>
              <Link href="/shipping">Shipping Info</Link>
              <Link href="/returns">Returns & Exchanges</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/support">Technical Support</Link>
            </div>

            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <Link href="/about">About Us</Link>
              <Link href="/services">Our Services</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/partners">Partners</Link>
            </div>

            <div className={styles.footerColumn}>
              <h4>Policies</h4>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/warranty">Warranty</Link>
              <Link href="/compliance">Compliance</Link>
            </div>

            <div className={styles.footerColumn}>
              <h4>Newsletter</h4>
              <p>Subscribe to get updates on new products and special offers</p>
              <form className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterBtn}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.copyright}>
              <p>&copy; 2025 Nexus Tech Hub. All rights reserved.</p>
            </div>
            <div className={styles.paymentMethods}>
              <span>We Accept:</span>
              <div className={styles.paymentIcons}>
                <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                  <rect width="32" height="20" rx="2" fill="#0066CC"/>
                  <path d="M12 6H20V14H12V6Z" fill="white"/>
                  <path d="M14 10C14 8.89543 14.8954 8 16 8C17.1046 8 18 8.89543 18 10C18 11.1046 17.1046 12 16 12C14.8954 12 14 11.1046 14 10Z" fill="#0066CC"/>
                </svg>
                <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                  <rect width="32" height="20" rx="2" fill="#EA001B"/>
                  <path d="M12 6H20V14H12V6Z" fill="white"/>
                  <circle cx="16" cy="10" r="2" fill="#EA001B"/>
                </svg>
                <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                  <rect width="32" height="20" rx="2" fill="#0070BA"/>
                  <path d="M8 8L16 4L24 8V12L16 16L8 12V8Z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
