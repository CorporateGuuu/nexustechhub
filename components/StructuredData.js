import Head from 'next/head';

// Nexus TechHub Business Information Structured Data
export function BusinessStructuredData() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://nexustechhub.netlify.app/#business",
    "name": "Nexus TechHub",
    "alternateName": "NTH",
    "description": "Professional mobile device repair parts and services in UAE. Specializing in iPhone, Samsung, and iPad replacement parts with quality guarantee.",
    "url": "https://nexustechhub.netlify.app",
    "logo": "https://nexustechhub.netlify.app/images/NexusLogo.jpg",
    "image": "https://nexustechhub.netlify.app/images/NexusLogo.jpg",
    "telephone": "+971585531029",
    "email": "info@nexustechhub.ae",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "FAMC3062, Compass Building, Al Shohada Road",
      "addressLocality": "AL Hamra Industrial Zone-FZ",
      "addressRegion": "Ras Al Khaimah",
      "addressCountry": "AE",
      "postalCode": ""
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.7617",
      "longitude": "55.9757"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "AED",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "areaServed": {
      "@type": "Country",
      "name": "United Arab Emirates"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "25.2048",
        "longitude": "55.2708"
      },
      "geoRadius": "200000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mobile Device Repair Parts",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "iPhone Repair Parts",
            "category": "Mobile Phone Parts"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Samsung Repair Parts",
            "category": "Mobile Phone Parts"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "iPad Repair Parts",
            "category": "Tablet Parts"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Repair Tools",
            "category": "Professional Tools"
          }
        }
      ]
    },
    "sameAs": [
      "https://wa.me/971585531029",
      "https://github.com/CorporateGuuu/nexustechhub"
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
      />
    </Head>
  );
}

// Product Structured Data
export function ProductStructuredData({ product, category }) {
  if (!product) return null;

  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://nexustechhub.netlify.app/products/${product.sku}`,
    "name": product.name,
    "description": product.description,
    "sku": product.sku,
    "mpn": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Nexus TechHub"
    },
    "category": category,
    "image": product.image,
    "offers": {
      "@type": "Offer",
      "url": `https://nexustechhub.netlify.app/products/${product.sku}`,
      "priceCurrency": "AED",
      "price": product.price,
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Nexus TechHub",
        "url": "https://nexustechhub.netlify.app"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Arab Emirates"
      }
    },
    "manufacturer": {
      "@type": "Organization",
      "name": product.manufacturer || "OEM"
    },
    "warranty": {
      "@type": "WarrantyPromise",
      "durationOfWarranty": "P6M",
      "warrantyScope": "Full replacement warranty for manufacturing defects"
    },
    "aggregateRating": product.rating ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount || 1,
      "bestRating": 5,
      "worstRating": 1
    } : undefined
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
      />
    </Head>
  );
}

// Breadcrumb Structured Data
export function BreadcrumbStructuredData({ breadcrumbs }) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://nexustechhub.netlify.app${crumb.url}`
    }))
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </Head>
  );
}

// FAQ Structured Data
export function FAQStructuredData({ faqs }) {
  if (!faqs || faqs.length === 0) return null;

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </Head>
  );
}

// Website Structured Data
export function WebsiteStructuredData() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://nexustechhub.netlify.app/#website",
    "url": "https://nexustechhub.netlify.app",
    "name": "Nexus TechHub",
    "description": "Professional mobile device repair parts and services in UAE",
    "publisher": {
      "@type": "Organization",
      "name": "Nexus TechHub",
      "@id": "https://nexustechhub.netlify.app/#business"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://nexustechhub.netlify.app/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </Head>
  );
}
