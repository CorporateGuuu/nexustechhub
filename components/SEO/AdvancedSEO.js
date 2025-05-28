// Advanced SEO & Schema Implementation for Nexus TechHub - UAE Market
import React from 'react';
import Head from 'next/head';

export default function AdvancedSEO({
  title = 'Professional Mobile Repair Parts UAE | Nexus TechHub',
  description = 'Premium quality mobile device repair parts in UAE. iPhone, Samsung, iPad parts with warranty. Located in Ras Al Khaimah. Fast shipping across UAE.',
  keywords = 'mobile repair parts UAE, iPhone parts Dubai, Samsung repair UAE, iPad screen replacement, phone repair tools, Ras Al Khaimah',
  canonicalUrl,
  ogImage = '/images/nexus-techhub-og.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  noindex = false,
  nofollow = false,
  alternateLanguages = [],
  breadcrumbs = [],
  products = [],
  reviews = [],
  faqData = [],
  businessInfo = true
}) {
  // Generate structured data
  const generateStructuredData = () => {
    const schemas = [];

    // Business/Organization Schema
    if (businessInfo) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://nexustechhub.netlify.app/#organization',
        name: 'Nexus TechHub',
        alternateName: 'NTH',
        description: 'Professional mobile device repair parts and services in UAE',
        url: 'https://nexustechhub.netlify.app',
        logo: 'https://nexustechhub.netlify.app/images/nexus-logo.svg',
        image: 'https://nexustechhub.netlify.app/images/nexus-techhub-og.jpg',
        telephone: '+971585531029',
        email: 'info@nexustechhub.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'FAMC3062, Compass Building, Al Shohada Road',
          addressLocality: 'AL Hamra Industrial Zone-FZ',
          addressRegion: 'Ras Al Khaimah',
          postalCode: '',
          addressCountry: 'AE'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 25.7617,
          longitude: 55.9757
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:00',
            closes: '15:00'
          }
        ],
        priceRange: 'AED 25 - AED 500',
        currenciesAccepted: 'AED',
        paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
        areaServed: {
          '@type': 'Country',
          name: 'United Arab Emirates'
        },
        serviceArea: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 25.2048,
            longitude: 55.2708
          },
          geoRadius: '200000'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Mobile Repair Parts',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'iPhone Repair Parts',
                category: 'Mobile Phone Parts'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Samsung Repair Parts',
                category: 'Mobile Phone Parts'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'iPad Repair Parts',
                category: 'Tablet Parts'
              }
            }
          ]
        },
        sameAs: [
          'https://www.facebook.com/nexustechhub',
          'https://www.instagram.com/nexustechhub',
          'https://www.linkedin.com/company/nexustechhub',
          'https://twitter.com/nexustechhub'
        ]
      });
    }

    // Website Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://nexustechhub.netlify.app/#website',
      url: 'https://nexustechhub.netlify.app',
      name: 'Nexus TechHub',
      description: 'Professional mobile device repair parts and services in UAE',
      publisher: {
        '@id': 'https://nexustechhub.netlify.app/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://nexustechhub.netlify.app/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      inLanguage: 'en-AE'
    });

    // Breadcrumb Schema
    if (breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url
        }))
      });
    }

    // Product Schema
    if (products.length > 0) {
      products.forEach(product => {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'Product',
          '@id': `https://nexustechhub.netlify.app/products/${product.slug}`,
          name: product.name,
          description: product.description,
          sku: product.sku,
          mpn: product.sku,
          brand: {
            '@type': 'Brand',
            name: product.brand || 'Nexus TechHub'
          },
          category: product.category,
          image: product.images || [],
          offers: {
            '@type': 'Offer',
            url: `https://nexustechhub.netlify.app/products/${product.slug}`,
            priceCurrency: 'AED',
            price: product.price,
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            itemCondition: 'https://schema.org/NewCondition',
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: {
              '@id': 'https://nexustechhub.netlify.app/#organization'
            },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: {
                '@type': 'MonetaryAmount',
                value: '0',
                currency: 'AED'
              },
              shippingDestination: {
                '@type': 'DefinedRegion',
                addressCountry: 'AE'
              },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 1,
                  maxValue: 2,
                  unitCode: 'DAY'
                },
                transitTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 1,
                  maxValue: 3,
                  unitCode: 'DAY'
                }
              }
            }
          },
          aggregateRating: product.rating ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating.average,
            reviewCount: product.rating.count,
            bestRating: 5,
            worstRating: 1
          } : undefined,
          review: product.reviews || []
        });
      });
    }

    // FAQ Schema
    if (faqData.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      });
    }

    // Review Schema
    if (reviews.length > 0) {
      reviews.forEach(review => {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'Review',
          itemReviewed: {
            '@type': 'LocalBusiness',
            '@id': 'https://nexustechhub.netlify.app/#organization'
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1
          },
          author: {
            '@type': 'Person',
            name: review.author
          },
          reviewBody: review.text,
          datePublished: review.date
        });
      });
    }

    // Custom structured data
    if (structuredData) {
      if (Array.isArray(structuredData)) {
        schemas.push(...structuredData);
      } else {
        schemas.push(structuredData);
      }
    }

    return schemas;
  };

  const schemas = generateStructuredData();
  const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Language Alternatives */}
      {alternateLanguages.map(lang => (
        <link
          key={lang.hreflang}
          rel="alternate"
          hrefLang={lang.hreflang}
          href={lang.href}
        />
      ))}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Nexus TechHub" />
      <meta property="og:locale" content="en_AE" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@nexustechhub" />
      <meta name="twitter:creator" content="@nexustechhub" />
      
      {/* Geographic Tags */}
      <meta name="geo.region" content="AE-RK" />
      <meta name="geo.placename" content="Ras Al Khaimah" />
      <meta name="geo.position" content="25.7617;55.9757" />
      <meta name="ICBM" content="25.7617, 55.9757" />
      
      {/* Business Tags */}
      <meta name="business:contact_data:street_address" content="FAMC3062, Compass Building, Al Shohada Road" />
      <meta name="business:contact_data:locality" content="AL Hamra Industrial Zone-FZ" />
      <meta name="business:contact_data:region" content="Ras Al Khaimah" />
      <meta name="business:contact_data:postal_code" content="" />
      <meta name="business:contact_data:country_name" content="United Arab Emirates" />
      <meta name="business:contact_data:phone_number" content="+971585531029" />
      <meta name="business:contact_data:website" content="https://nexustechhub.netlify.app" />
      
      {/* Mobile App Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Nexus TechHub" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#10b981" />
      <meta name="msapplication-navbutton-color" content="#10b981" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#10b981" />
      
      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.stripe.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//api.stripe.com" />
      <link rel="dns-prefetch" href="//js.stripe.com" />
      
      {/* Resource Hints */}
      <link rel="preload" href="/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/images/nexus-logo.svg" as="image" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Performance Hints */}
      <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
    </Head>
  );
}
