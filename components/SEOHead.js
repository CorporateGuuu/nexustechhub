import Head from 'next/head';
import { BusinessStructuredData, WebsiteStructuredData } from './StructuredData';

export default function SEOHead({
  title = "Nexus TechHub - Professional Mobile Repair Parts UAE",
  description = "Professional mobile device repair parts and services in UAE. Specializing in iPhone, Samsung, and iPad replacement parts with quality guarantee. Located in Ras Al Khaimah.",
  keywords = "mobile repair parts UAE, iPhone parts Dubai, Samsung repair UAE, iPad parts Abu Dhabi, phone repair tools, mobile parts supplier UAE, Ras Al Khaimah repair parts",
  canonicalUrl = "https://nexustechhub.netlify.app",
  ogImage = "https://nexustechhub.netlify.app/images/NexusLogo.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  noIndex = false,
  structuredData = true
}) {
  const fullTitle = title.includes('Nexus TechHub') ? title : `${title} | Nexus TechHub`;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Nexus TechHub" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#10b981" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Robots */}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Nexus TechHub Logo" />
        <meta property="og:site_name" content="Nexus TechHub" />
        <meta property="og:locale" content="en_AE" />

        {/* Business-specific Open Graph */}
        <meta property="business:contact_data:street_address" content="FAMC3062, Compass Building, Al Shohada Road" />
        <meta property="business:contact_data:locality" content="AL Hamra Industrial Zone-FZ" />
        <meta property="business:contact_data:region" content="Ras Al Khaimah" />
        <meta property="business:contact_data:country_name" content="United Arab Emirates" />
        <meta property="business:contact_data:phone_number" content="+971585531029" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Nexus TechHub Logo" />

        {/* Additional Meta Tags for UAE Market */}
        <meta name="geo.region" content="AE-RK" />
        <meta name="geo.placename" content="Ras Al Khaimah" />
        <meta name="geo.position" content="25.7617;55.9757" />
        <meta name="ICBM" content="25.7617, 55.9757" />

        {/* Mobile App Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nexus TechHub" />

        {/* Favicon and Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect to External Domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Language and Alternate URLs */}
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <link rel="alternate" hrefLang="ar" href={`${canonicalUrl}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

        {/* Contact Information */}
        <meta name="contact" content="info@nexustechhub.ae" />
        <meta name="reply-to" content="info@nexustechhub.ae" />

        {/* Business Hours */}
        <meta name="business:hours:day" content="monday" />
        <meta name="business:hours:start" content="09:00" />
        <meta name="business:hours:end" content="18:00" />

        {/* Copyright */}
        <meta name="copyright" content="© 2024 Nexus TechHub. All rights reserved." />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        {/* Performance Hints */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>

      {/* Structured Data */}
      {structuredData && (
        <>
          <BusinessStructuredData />
          <WebsiteStructuredData />
        </>
      )}
    </>
  );
}

// Product-specific SEO component
export function ProductSEOHead({ product, category }) {
  if (!product) return <SEOHead />;

  const title = `${product.name} - ${category} | Nexus TechHub`;
  const description = `${product.description} Professional quality ${category.toLowerCase()} available in UAE. SKU: ${product.sku}. Contact +971 58 553 1029 for pricing.`;
  const canonicalUrl = `https://nexustechhub.netlify.app/products/${product.sku}`;
  const keywords = `${product.name}, ${category}, ${product.brand || 'OEM'}, UAE mobile parts, ${product.sku}`;

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={keywords}
      canonicalUrl={canonicalUrl}
      ogImage={product.image || "https://nexustechhub.netlify.app/images/NexusLogo.jpg"}
      ogType="product"
    />
  );
}

// Category-specific SEO component
export function CategorySEOHead({ category, description, products = [] }) {
  const title = `${category} - Professional Mobile Repair Parts | Nexus TechHub`;
  const metaDescription = description || `Professional ${category.toLowerCase()} for mobile device repairs in UAE. Quality guaranteed parts with fast delivery across UAE.`;
  const canonicalUrl = `https://nexustechhub.netlify.app/${category.toLowerCase().replace(/\s+/g, '-')}`;
  const keywords = `${category}, mobile repair parts UAE, ${category} Dubai, ${category} Abu Dhabi, professional repair parts`;

  return (
    <SEOHead
      title={title}
      description={metaDescription}
      keywords={keywords}
      canonicalUrl={canonicalUrl}
      ogType="website"
    />
  );
}
