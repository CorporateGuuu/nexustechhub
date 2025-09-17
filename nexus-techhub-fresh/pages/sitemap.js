import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Sitemap() {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'iPhone Parts', path: '/products/iphone-parts' },
    { name: 'Samsung Parts', path: '/products/samsung-parts' },
    { name: 'iPad Parts', path: '/products/ipad-parts' },
    { name: 'Repair Tools', path: '/products/repair-tools' },
    { name: 'Screens & LCDs', path: '/products/iphone-screens' },
    { name: 'Batteries', path: '/products/iphone-batteries' },
    { name: 'Charging Ports', path: '/products/iphone-charging' },
    { name: 'Cameras', path: '/products/iphone-cameras' },
    { name: 'Samsung Screens', path: '/products/samsung-screens' },
    { name: 'Samsung Batteries', path: '/products/samsung-batteries' },
    { name: 'Tool Kits', path: '/products/tool-kits' },
    { name: 'Bulk Ordering', path: '/services/bulk-ordering' },
    { name: 'Custom Orders', path: '/services/custom-orders' },
    { name: 'Technical Support', path: '/services/support' },
    { name: 'LCD Buyback', path: '/lcd-buyback' },
    { name: 'Repair Training', path: '/services/training' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Account', path: '/account' },
    { name: 'Cart', path: '/cart' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  return (
    <>
      <Head>
        <title>Sitemap - Nexus Tech Hub</title>
        <meta name="description" content="Complete sitemap of Nexus Tech Hub website. Find all pages and sections easily." />
      </Head>

      <div className="container">
        <div className="sitemap-header">
          <h1>Website Sitemap</h1>
          <p>Find all pages and sections of our website</p>
        </div>

        <div className="sitemap-content">
          <div className="sitemap-section">
            <h2>Main Pages</h2>
            <ul className="sitemap-list">
              {pages.slice(0, 4).map((page, index) => (
                <li key={index}>
                  <Link href={page.path}>
                    <a>{page.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sitemap-section">
            <h2>Product Categories</h2>
            <ul className="sitemap-list">
              {pages.slice(4, 12).map((page, index) => (
                <li key={index}>
                  <Link href={page.path}>
                    <a>{page.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sitemap-section">
            <h2>Services</h2>
            <ul className="sitemap-list">
              {pages.slice(12, 17).map((page, index) => (
                <li key={index}>
                  <Link href={page.path}>
                    <a>{page.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sitemap-section">
            <h2>Company & Account</h2>
            <ul className="sitemap-list">
              {pages.slice(17).map((page, index) => (
                <li key={index}>
                  <Link href={page.path}>
                    <a>{page.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 80vh;
        }

        .sitemap-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .sitemap-header h1 {
          color: #1e293b;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .sitemap-header p {
          color: #64748b;
          font-size: 1.125rem;
        }

        .sitemap-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .sitemap-section {
          background: white;
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .sitemap-section h2 {
          color: #1e293b;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 0.5rem;
        }

        .sitemap-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sitemap-list li {
          margin-bottom: 0.5rem;
        }

        .sitemap-list a {
          color: #3b82f6;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }

        .sitemap-list a:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .sitemap-header h1 {
            font-size: 2rem;
          }

          .sitemap-content {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}
