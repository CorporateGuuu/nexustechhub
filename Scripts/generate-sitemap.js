const fs = require('fs');
const path = require('path');

// Simple sitemap generation for Nexus TechHub
const baseUrl = 'https://nexustechhub.netlify.app';

const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/iphone-parts', priority: '0.9', changefreq: 'weekly' },
  { url: '/samsung-parts', priority: '0.9', changefreq: 'weekly' },
  { url: '/ipad-parts', priority: '0.9', changefreq: 'weekly' },
  { url: '/repair-tools', priority: '0.8', changefreq: 'weekly' },
  { url: '/lcd-buyback', priority: '0.8', changefreq: 'weekly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' }
];

// Generate sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

pages.forEach(page => {
  sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
});

sitemap += `
</urlset>`;

// Write sitemap
fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);

// Generate robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

Disallow: /admin/
Disallow: /api/
Disallow: /_next/`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), robots);

console.log('✅ Sitemap and robots.txt generated successfully!');
