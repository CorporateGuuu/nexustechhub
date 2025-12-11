import { MetadataRoute } from 'next';

// Dynamic sitemap generation for Nexus Tech Hub
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nexus-tech-hub.netlify.app';

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Category pages - high priority for SEO
  const categoryPages = [
    'apple',
    'samsung',
    'google-pixel',
    'motorola',
    'tools',
    'accessories',
    'refurbishing',
    'game-console',
    'board-components',
    'other-parts'
  ].map(category => ({
    url: `${baseUrl}/parts/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic product pages - highest priority
  // Note: In a real implementation, you'd fetch these from your database
  // For now, we'll include some example product URLs
  const productPages = [
    // Example product URLs - replace with real dynamic fetching
    'iphone-15-pro-screen-replacement',
    'samsung-galaxy-s24-battery',
    'google-pixel-8-camera-module',
    'apple-watch-series-9-screen',
    'samsung-galaxy-z-fold-5-hinge',
  ].map(product => ({
    url: `${baseUrl}/products/${product}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.95,
  }));

  // Combine all pages
  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
  ];
}
