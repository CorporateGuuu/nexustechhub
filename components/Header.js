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
        <nav className={styles.nav} aria-label="Primary Navigation">
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
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu" role="menu" aria-label="Mobile Navigation Menu">
          <Link href="/products" className={styles.mobileLink} role="menuitem">Products</Link>
          <Link href="/iphone-parts" className={styles.mobileLink} role="menuitem">iPhone Parts</Link>
          <Link href="/samsung-parts" className={styles.mobileLink} role="menuitem">Samsung Parts</Link>
          <Link href="/ipad-parts" className={styles.mobileLink} role="menuitem">iPad Parts</Link>
          <Link href="/repair-tools" className={styles.mobileLink} role="menuitem">Repair Tools</Link>
          <Link href="/lcd-buyback" className={styles.mobileLink} role="menuitem">LCD Buyback</Link>
          <Link href="/genuine-parts-program" className={`${styles.mobileLink} ${styles.genuinePartsLink}`} role="menuitem">
            Genuine Parts Program
          </Link>
          <Link href="/about" className={styles.mobileLink} role="menuitem">About Us</Link>
          <Link href="/contact" className={styles.mobileLink} role="menuitem">Contact</Link>
          <Link href="/blog" className={styles.mobileLink} role="menuitem">Blog</Link>
        </div>
      )}
    </header>
  );
}
