/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  experimental: {
    appDir: false
  },
  env: {
    CUSTOM_KEY: 'nexus-techhub'
  }
}

module.exports = nextConfig
