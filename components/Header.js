import React, { useState } from 'react';
import Link from 'next/link';
import { LogoImage } from './OptimizedImage';
import CartButton from './CartButton';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <LogoImage width={40} height={40} />
          <span className={styles.logoText}>Nexus TechHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <Link href="/products" className={styles.navLink}>Products</Link>
          <Link href="/iphone-parts" className={styles.navLink}>iPhone Parts</Link>
          <Link href="/samsung-parts" className={styles.navLink}>Samsung Parts</Link>
          <Link href="/ipad-parts" className={styles.navLink}>iPad Parts</Link>
          <Link href="/repair-tools" className={styles.navLink}>Repair Tools</Link>
          <Link href="/lcd-buyback" className={styles.navLink}>LCD Buyback</Link>
          <Link href="/genuine-parts-program" className={`${styles.navLink} ${styles.genuinePartsLink}`}>
            Genuine Parts Program
          </Link>
          <Link href="/about" className={styles.navLink}>About Us</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
          <Link href="/blog" className={styles.navLink}>Blog</Link>
        </nav>

        {/* Header Actions */}
        <div className={styles.headerActions}>
          <CartButton showLabel={false} />

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/products" className={styles.mobileLink}>Products</Link>
          <Link href="/iphone-parts" className={styles.mobileLink}>iPhone Parts</Link>
          <Link href="/samsung-parts" className={styles.mobileLink}>Samsung Parts</Link>
          <Link href="/ipad-parts" className={styles.mobileLink}>iPad Parts</Link>
          <Link href="/repair-tools" className={styles.mobileLink}>Repair Tools</Link>
          <Link href="/lcd-buyback" className={styles.mobileLink}>LCD Buyback</Link>
          <Link href="/genuine-parts-program" className={`${styles.mobileLink} ${styles.genuinePartsLink}`}>
            Genuine Parts Program
          </Link>
          <Link href="/about" className={styles.mobileLink}>About Us</Link>
          <Link href="/contact" className={styles.mobileLink}>Contact</Link>
          <Link href="/blog" className={styles.mobileLink}>Blog</Link>
        </div>
      )}
    </header>
  );
}
