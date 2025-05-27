/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false, // Disable to prevent Fast Refresh issues
  swcMinify: true, // Use SWC for faster builds
  images: {
    domains: ['localhost', 'nexustechhub.ae', 'nexustechhub.netlify.app', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 180,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Optimize Fast Refresh
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 minute
    pagesBufferLength: 5,
  },
  webpack: (config, { dev }) => {
    // Add aliases for common directories
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'components'),
      '@styles': path.resolve(__dirname, 'styles'),
      '@lib': path.resolve(__dirname, 'lib'),
    };

    // Fix module resolution issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Configure webpack for stability
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
      };

      // Reduce Fast Refresh noise
      config.infrastructureLogging = {
        level: 'error',
      };
    }

    return config;
  }
};

module.exports = nextConfig;
