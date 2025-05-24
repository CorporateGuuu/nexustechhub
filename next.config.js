/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['localhost', 'nexustechhub.netlify.app', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 180,
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@/components': path.resolve(__dirname, 'components'),
      '@/pages': path.resolve(__dirname, 'pages'),
      '@/styles': path.resolve(__dirname, 'styles'),
      '@/public': path.resolve(__dirname, 'public'),
    };
    return config;
  },
};

module.exports = nextConfig;
