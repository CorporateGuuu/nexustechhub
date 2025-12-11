import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // important for Netlify

  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // CSP Header - Strict Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://*.stripe.com https://www.paypal.com https://*.paypal.com https://www.google-analytics.com https://*.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://*.supabase.co https://api.stripe.com https://*.stripe.com https://www.paypal.com https://*.paypal.com https://www.google-analytics.com https://*.googletagmanager.com",
              "frame-src 'self' https://js.stripe.com https://*.stripe.com https://www.paypal.com https://*.paypal.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // Security Headers
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()'
          },
          // HSTS Header
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ];
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  experimental: {
    // Prevents Next from trying to pre-fetch data at build time
    missingSuspenseWithCSRBailout: false,
  },

  // Optimized Image Configuration
  images: {
    unoptimized: false, // Enable optimization for better performance
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 24 hours cache
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'stripe.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      }
    ],
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // Bundle analyzer (optional)
  // analyze: process.env.ANALYZE === 'true',

  webpack: (config, { dev }) => {
    // Resolve aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      'src': path.resolve(__dirname, 'src'),
      'lib': path.resolve(__dirname, 'src/lib'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'utils': path.resolve(__dirname, 'src/utils'),
    };

    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
