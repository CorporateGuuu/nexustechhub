module.exports = {
  // Content Security Policy for XSS protection
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.stripe.com https://js.stripe.com; frame-src https://js.stripe.com https://hooks.stripe.com;"
          }
        ]
      }
    ];
  },

  // Performance optimizations
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression and optimization
  compress: true,

  // Reduce bundle size
  swcMinify: true,

  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: [
      '@mui/material',
      '@mui/icons-material',
      '@stripe/stripe-js',
      '@supabase/supabase-js',
      '@sentry/nextjs'
    ],
    concurrentFeatures: true,
    serverComponentsExternalPackages: [],
    // Optimize third-party usage
    esmExternals: 'loose',
  },

  // Optimize build output
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimized bundle analysis - balance between caching and request count
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // More conservative chunk splitting to reduce request count
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Framework chunk - React, Next.js, and core libraries
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|next|@next|scheduler|prop-types)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Vendor chunk - commonly used libraries
          vendor: {
            test: /[\\/]node_modules[\\/](?!react|react-dom|next|@next|scheduler|prop-types)/,
            name: 'vendor',
            chunks: 'all',
            priority: 30,
            enforce: true,
            minSize: 100000, // 100KB minimum
          },
          // Large third-party libraries (only if they're actually large)
          stripe: {
            test: /[\\/]node_modules[\\/]@stripe[\\/]/,
            name: 'stripe',
            chunks: 'async', // Load asynchronously when needed
            priority: 20,
          },
          supabase: {
            test: /[\\/]node_modules[\\/]@supabase[\\/]/,
            name: 'supabase',
            chunks: 'async', // Load asynchronously when needed
            priority: 20,
          },
          // MUI only if it's actually used on the page
          mui: {
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            name: 'mui',
            chunks: 'async', // Load asynchronously when needed
            priority: 10,
          },
        },
      };

      // Enable compression and optimization
      config.optimization.minimize = true;

      // Reduce bundle size by removing unused exports
      config.optimization.usedExports = true;
      config.optimization.sideEffects = true;
    }

    return config;
  },
};
