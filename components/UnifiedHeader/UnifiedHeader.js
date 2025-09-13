import React, { useState, useRef, useEffect } from 'react';
import styles from './UnifiedHeader.module.css';
import SideMenu from '../SideMenu/SideMenu';

const UnifiedHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.headerContainer} ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <button
        className={styles.dropdownToggle}
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-label="Toggle navigation menu"
      >
        <span className={styles.hamburgerIcon}>
          <span className={`${styles.hamburgerLine} ${isDropdownOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isDropdownOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isDropdownOpen ? styles.open : ''}`}></span>
        </span>
        <span className={styles.menuText}>Menu</span>
      </button>

      {/* Dropdown Menu */}
      <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`}>
        <SideMenu onItemClick={() => setIsDropdownOpen(false)} />
      </div>
    </div>
  );
};

export default UnifiedHeader;
