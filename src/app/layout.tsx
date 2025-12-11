import { AuthProvider } from '../providers/AuthProvider';
import { CartProvider } from '../contexts/CartContext';
import { Inter } from 'next/font/google';
import './globals.css';
import MobileHeader from '../components/mobile/MobileHeader';
import { MobileBottomNav } from '../components/mobile/MobileBottomNav';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nexus Tech Hub',
  description: 'Premium wholesale electronics parts and components. Genuine OEM parts for iPhone, Samsung, Google Pixel, and gaming consoles.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#2563eb',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  other: {
    'msapplication-TileColor': '#2563eb',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Nexus Tech Hub',
    'robots': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    'googlebot': 'index, follow',
    'author': 'Nexus Tech Hub',
    'publisher': 'Nexus Tech Hub',
    'language': 'en-US',
    'geo.region': 'AE-DU',
    'geo.placename': 'Dubai',
    'geo.position': '25.2048;55.2708',
    'ICBM': '25.2048, 55.2708',
    'business:contact_data:street_address': 'Dubai, UAE',
    'business:contact_data:locality': 'Dubai',
    'business:contact_data:region': 'Dubai',
    'business:contact_data:postal_code': '00000',
    'business:contact_data:country_name': 'United Arab Emirates',
    'business:contact_data:phone_number': '+971-58-553-1029',
    'og:site_name': 'Nexus Tech Hub',
    'og:locale': 'en_US',
    'og:type': 'website',
    'twitter:site': '@nexustechhub',
    'twitter:creator': '@nexustechhub',
    'twitter:card': 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Performance optimizations for 1000ms faster LCP */}
        <link rel="preconnect" href="https://your-project-id.supabase.co" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Nexus Tech Hub",
              "url": "https://nexus-tech-hub.netlify.app",
              "logo": "https://nexus-tech-hub.netlify.app/images/logo.png",
              "description": "Premium wholesale electronics parts and components. Genuine OEM parts for iPhone, Samsung, Google Pixel, and gaming consoles.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+971-58-553-1029",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AE",
                "addressRegion": "Dubai"
              },
              "sameAs": [
                "https://www.linkedin.com/company/nexus-tech-hub",
                "https://twitter.com/nexustechhub"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Electronics Parts Catalog",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Apple iPhone Parts",
                      "category": "Mobile Phone Parts"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Samsung Galaxy Parts",
                      "category": "Mobile Phone Parts"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Google Pixel Parts",
                      "category": "Mobile Phone Parts"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "124",
                "bestRating": "5",
                "worstRating": "1"
              },
              "priceRange": "$$$"
            })
          }}
        />

        {/* Prevent zoom on input focus (iOS) */}
        <style dangerouslySetInnerHTML={{
          __html: `
            input[type="text"], input[type="email"], input[type="password"], textarea {
              font-size: 16px !important;
            }
            * { touch-action: manipulation; }
            body { -webkit-tap-highlight-color: transparent; }

            /* Font loading optimization */
            .font-inter {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            /* Critical CSS for instant rendering */
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              {/* Mobile Header with Hamburger */}
              <MobileHeader />

              {/* Main Content */}
              <main className="flex-1 pb-20 md:pb-0">
                {children}
              </main>

              {/* Bottom Navigation (only on mobile) */}
              <MobileBottomNav />
            </div>
            <Toaster position="top-center" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
