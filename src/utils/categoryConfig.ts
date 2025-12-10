import { FilterState } from '../types';

export interface CategoryConfig {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  gradient: string;
  features: string[];
  buildQuery: (query: any, filters: FilterState) => any;
  getMetadata: () => {
    title: string;
    description: string;
    keywords: string;
    openGraph: {
      title: string;
      description: string;
      type: 'website';
    };
  };
}

export const categoryConfigs: Record<string, CategoryConfig> = {
  'apple': {
    slug: 'apple',
    title: 'Apple Parts',
    description: 'Genuine OEM iPhone, iPad, Watch & MacBook components',
    keywords: ['Apple parts', 'iPhone repair', 'iPad parts', 'Apple Watch repair', 'MacBook parts', 'iPhone screen replacement'],
    gradient: 'from-gray-900 via-gray-800 to-black',
    features: ['Genuine OEM', '180-Day Warranty', 'Fast Shipping'],
    buildQuery: (query, filters) => {
      // Apply base filters
      query = query.eq('is_active', true);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
      }
      if (filters.brands.length > 0) {
        query = query.in('brand_id', filters.brands);
      }
      if (filters.priceRange[0] > 0) {
        query = query.gte('price', filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000) {
        query = query.lte('price', filters.priceRange[1]);
      }
      if (filters.conditions.length > 0) {
        query = query.in('condition', filters.conditions);
      }
      // Category-specific: Apple brand
      query = query.ilike('brand_id', 'Apple');
      return query;
    },
    getMetadata: () => ({
      title: 'Apple Parts | iPhone, iPad, Watch & MacBook Replacement Parts | Nexus Tech Hub',
      description: 'Premium Apple iPhone, iPad, Apple Watch and MacBook replacement parts. Genuine OEM and high-quality components with fast shipping.',
      keywords: 'Apple parts, iPhone repair, iPad parts, Apple Watch repair, MacBook parts, iPhone screen replacement',
      openGraph: {
        title: 'Apple Parts | iPhone, iPad, Watch & MacBook Replacement Parts | Nexus Tech Hub',
        description: 'Premium Apple replacement parts with fast shipping and expert support.',
        type: 'website',
      },
    }),
  },

  'samsung': {
    slug: 'samsung',
    title: 'Samsung Parts',
    description: 'Galaxy S, Note, A-series, and tablet replacement parts',
    keywords: ['Samsung parts', 'Galaxy S parts', 'Galaxy Note parts', 'Samsung repair parts', 'Galaxy screen replacement'],
    gradient: 'from-blue-600 via-blue-700 to-indigo-800',
    features: ['High Quality', 'Bulk Pricing', 'Expert Support'],
    buildQuery: (query, filters) => {
      query = query.eq('is_active', true);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
      }
      if (filters.brands.length > 0) {
        query = query.in('brand_id', filters.brands);
      }
      if (filters.priceRange[0] > 0) {
        query = query.gte('price', filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000) {
        query = query.lte('price', filters.priceRange[1]);
      }
      if (filters.conditions.length > 0) {
        query = query.in('condition', filters.conditions);
      }
      query = query.ilike('brand_id', 'Samsung');
      return query;
    },
    getMetadata: () => ({
      title: 'Samsung Parts | Galaxy Phone & Tablet Replacement Parts | Nexus Tech Hub',
      description: 'Premium Samsung Galaxy S, Note, A, Z series replacement parts. Screens, batteries, cameras, and more with fast shipping and expert support.',
      keywords: 'Samsung parts, Galaxy S parts, Galaxy Note parts, Samsung repair parts, Galaxy screen replacement',
      openGraph: {
        title: 'Samsung Parts | Galaxy Phone & Tablet Replacement Parts | Nexus Tech Hub',
        description: 'Premium Samsung Galaxy replacement parts with fast shipping and expert support.',
        type: 'website',
      },
    }),
  },

  'google-pixel': {
    slug: 'google-pixel',
    title: 'Google Pixel Parts',
    description: 'Pixel phone and tablet screens, batteries, cameras',
    keywords: ['Google Pixel parts', 'Pixel screen replacement', 'Pixel battery', 'Pixel camera', 'Pixel repair parts'],
    gradient: 'from-green-500 via-green-600 to-emerald-700',
    features: ['OEM Quality', 'Same-Day Ship', 'Technical Support'],
    buildQuery: (query, filters) => {
      query = query.eq('is_active', true);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
      }
      if (filters.brands.length > 0) {
        query = query.in('brand_id', filters.brands);
      }
      if (filters.priceRange[0] > 0) {
        query = query.gte('price', filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000) {
        query = query.lte('price', filters.priceRange[1]);
      }
      if (filters.conditions.length > 0) {
        query = query.in('condition', filters.conditions);
      }
      // Google brand OR name contains Pixel
      query = query.or('brand_id.ilike.%Google%,name.ilike.%Pixel%');
      return query;
    },
    getMetadata: () => ({
      title: 'Google Pixel Parts | Pixel Phone & Tablet Replacement Parts | Nexus Tech Hub',
      description: 'Premium Google Pixel replacement parts. Screens, batteries, cameras, and more for Pixel 8, 7, 6, 5, 4 series with fast shipping.',
      keywords: 'Google Pixel parts, Pixel screen replacement, Pixel battery, Pixel camera, Pixel repair parts',
      openGraph: {
        title: 'Google Pixel Parts | Pixel Phone & Tablet Replacement Parts | Nexus Tech Hub',
        description: 'Premium Google Pixel replacement parts with fast shipping and expert support.',
        type: 'website',
      },
    }),
  },

  'motorola': {
    slug: 'motorola',
    title: 'Motorola Parts',
    description: 'Moto G, Edge, One series replacement parts',
    keywords: ['Motorola parts', 'Moto repair', 'Motorola screen replacement', 'Moto battery', 'Motorola camera'],
    gradient: 'from-red-600 via-red-700 to-pink-800',
    features: ['Moto G Series', 'Moto Edge Series', 'Authorized Parts'],
    buildQuery: (query, filters) => {
      query = query.eq('is_active', true);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
      }
      if (filters.brands.length > 0) {
        query = query.in('brand_id', filters.brands);
      }
      if (filters.priceRange[0] > 0) {
        query = query.gte('price', filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000) {
        query = query.lte('price', filters.priceRange[1]);
      }
      if (filters.conditions.length > 0) {
        query = query.in('condition', filters.conditions);
      }
      query = query.ilike('brand_id', 'Motorola');
      return query;
    },
    getMetadata: () => ({
      title: 'Motorola Parts | Moto Phone & Tablet Replacement Parts | Nexus Tech Hub',
      description: 'Premium Motorola replacement parts for Moto G, Edge, One series. Screens, batteries, cameras, and more with fast shipping.',
      keywords: 'Motorola parts, Moto repair, Motorola screen replacement, Moto battery, Motorola camera',
      openGraph: {
        title: 'Motorola Parts | Moto Phone & Tablet Replacement Parts | Nexus Tech Hub',
        description: 'Premium Motorola replacement parts with fast shipping and expert support.',
        type: 'website',
      },
    }),
  },

  'other-parts': {
    slug: 'other-parts',
    title: 'Other Brands & Generic Parts',
    description: 'Generic and other brand replacement parts for phones and tablets',
    keywords: ['generic parts', 'other brands', 'replacement parts', 'phone parts', 'tablet parts'],
    gradient: 'from-purple-600 via-purple-700 to-indigo-800',
    features: ['Generic & Other Brands', 'Universal Compatibility', 'Same-Day Shipping'],
    buildQuery: (query, filters) => {
      query = query.eq('is_active', true);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
      }
      if (filters.brands.length > 0) {
        query = query.in('brand_id', filters.brands);
      }
      if (filters.priceRange[0] > 0) {
        query = query.gte('price', filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000) {
        query = query.lte('price', filters.priceRange[1]);
      }
      if (filters.conditions.length > 0) {
        query = query.in('condition', filters.conditions);
      }
      // All brands except Apple, Samsung, Google
      query = query.or('brand_id.is.null,brand_id.neq.Apple,brand_id.neq.Samsung,brand_id.neq.Google');
      return query;
    },
    getMetadata: () => ({
      title: 'Other Brands & Generic Parts | Replacement Parts | Nexus Tech Hub',
      description: 'Generic and other brand replacement parts for phones and tablets. Quality components from various manufacturers with fast shipping.',
      keywords: 'generic parts, other brands, replacement parts, phone parts, tablet parts',
      openGraph: {
        title: 'Other Brands & Generic Parts | Replacement Parts | Nexus Tech Hub',
        description: 'Generic and other brand replacement parts with fast shipping.',
        type: 'website',
      },
    }),
  },

  'board-components': {
    slug: 'board-components',
    title: 'Board-Level Components',
    description: 'IC chips, flex cables, PMICs, and daughterboards',
    keywords: ['board components', 'IC chips', 'flex cables', 'daughterboards', 'PMIC', 'electronics components'],
    gradient: 'from-emerald-600 via-emerald-700 to-teal-800',
    features: ['IC Chips & Processors', 'Flex Cables', 'Daughterboards'],
    buildQuery: (query, filters) => {
      query = query.eq('is_active', true);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
      }
      if (filters.brands.length > 0) {
        query = query.in('brand_id', filters.brands);
      }
      if (filters.priceRange[0] > 0) {
        query = query.gte('price', filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000) {
        query = query.lte('price', filters.priceRange[1]);
      }
      if (filters.conditions.length > 0) {
        query = query.in('condition', filters.conditions);
      }
      // Tags contain board-level component keywords
      query = query.or('tags.cs.{board},tags.cs.{ic},tags.cs.{flex},tags.cs.{pmic},tags.cs.{daughterboard}');
      return query;
    },
    getMetadata: () => ({
      title: 'Board-Level Components | IC Chips, Flex Cables, Daughterboards | Nexus Tech Hub',
      description: 'Premium board-level components including IC chips, flex cables, PMICs, and daughterboards. Professional-grade electronics components with fast shipping.',
      keywords: 'board components, IC chips, flex cables, daughterboards, PMIC, electronics components',
      openGraph: {
        title: 'Board-Level Components | IC Chips, Flex Cables, Daughterboards | Nexus Tech Hub',
        description: 'Premium board-level components for professional repairs with fast shipping.',
        type: 'website',
      },
    }),
  },

  'tools': {
    slug: 'tools',
    title: 'Tools & Supplies',
    description: 'Professional repair tools, adhesives, opening picks, testers',
    keywords: ['phone repair tools', 'opening tools', 'adhesives', 'repair supplies', 'screwdrivers', 'phone repair equipment'],
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    features: ['Professional Tools', 'Durable Quality', 'Complete Kits'],
    buildQuery: (query, filters) => {
      query = query.eq('is_active', true);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
      }
      if (filters.brands.length > 0) {
        query = query.in('brand_id', filters.brands);
      }
      if (filters.priceRange[0] > 0) {
        query = query.gte('price', filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000) {
        query = query.lte('price', filters.priceRange[1]);
      }
      if (filters.conditions.length > 0) {
        query = query.in('condition', filters.conditions);
      }
      // Category contains tool-related terms
      query = query.ilike('category_id', '%tool%');
      return query;
    },
    getMetadata: () => ({
      title: 'Phone Repair Tools & Supplies | Professional Repair Equipment | Nexus Tech Hub',
      description: 'Professional phone and tablet repair tools. Opening picks, adhesives, testers, screwdrivers, and repair supplies with fast shipping.',
      keywords: 'phone repair tools, opening tools, adhesives, repair supplies, screwdrivers, phone repair equipment',
      openGraph: {
        title: 'Phone Repair Tools & Supplies | Professional Repair Equipment | Nexus Tech Hub',
        description: 'Professional phone and tablet repair tools and supplies with fast shipping.',
        type: 'website',
      },
    }),
  },

  'game-console': {
    slug: 'game-console',
    title: 'Game Console Parts',
    description: 'PlayStation, Xbox, Nintendo replacement parts',
    keywords: ['game console parts', 'PlayStation repair', 'Xbox repair', 'Nintendo repair', 'console controllers', 'gaming parts'],
    gradient: 'from-indigo-500 via-purple-600 to-pink-600',
    features: ['Console Specific', 'Gaming Optimized', 'Quick Repair'],
    buildQuery: (query, filters) => {
      query = query.eq('is_active', true);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
      }
      if (filters.brands.length > 0) {
        query = query.in('brand_id', filters.brands);
      }
      if (filters.priceRange[0] > 0) {
        query = query.gte('price', filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000) {
        query = query.lte('price', filters.priceRange[1]);
      }
      if (filters.conditions.length > 0) {
        query = query.in('condition', filters.conditions);
      }
      // Gaming/console related categories or names
      query = query.or('category_id.ilike.%gaming%,category_id.ilike.%console%,category_id.ilike.%playstation%,category_id.ilike.%xbox%,category_id.ilike.%nintendo%');
      return query;
    },
    getMetadata: () => ({
      title: 'Game Console Parts | PlayStation, Xbox, Nintendo Repair Parts | Nexus Tech Hub',
      description: 'Game console replacement parts for PlayStation, Xbox, and Nintendo. Controllers, screens, chargers, and repair parts with fast shipping.',
      keywords: 'game console parts, PlayStation repair, Xbox repair, Nintendo repair, console controllers, gaming parts',
      openGraph: {
        title: 'Game Console Parts | PlayStation, Xbox, Nintendo Repair Parts | Nexus Tech Hub',
        description: 'Game console replacement parts for PlayStation, Xbox, and Nintendo with fast shipping.',
        type: 'website',
      },
    }),
  },

  'accessories': {
    slug: 'accessories',
    title: 'Accessories',
    description: 'Cables, chargers, cases, screen protectors, audio',
    keywords: ['phone accessories', 'cables', 'chargers', 'cases', 'screen protectors', 'audio accessories'],
    gradient: 'from-purple-500 via-purple-600 to-indigo-600',
    features: ['Premium Brands', 'Bulk Discounts', 'Fast Delivery'],
    buildQuery: (query, filters) => {
      query = query.eq('is_active', true);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
      }
      if (filters.brands.length > 0) {
        query = query.in('brand_id', filters.brands);
      }
      if (filters.priceRange[0] > 0) {
        query = query.gte('price', filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 5000) {
        query = query.lte('price', filters.priceRange[1]);
      }
      if (filters.conditions.length > 0) {
        query = query.in('condition', filters.conditions);
      }
      // Accessories category
      query = query.ilike('category_id', '%accessor%');
      return query;
    },
    getMetadata: () => ({
      title: 'Phone Accessories | Cables, Chargers, Cases, Screen Protectors | Nexus Tech Hub',
      description: 'Premium phone and tablet accessories including cables, chargers, cases, screen protectors, and audio accessories with fast shipping.',
      keywords: 'phone accessories, cables, chargers, cases, screen protectors, audio accessories',
      openGraph: {
        title: 'Phone Accessories | Cables, Chargers, Cases, Screen Protectors | Nexus Tech Hub',
        description: 'Premium phone and tablet accessories with fast shipping.',
        type: 'website',
      },
    }),
  },
};

export const getCategoryConfig = (slug: string): CategoryConfig | null => {
  return categoryConfigs[slug] || null;
};

export const getAllCategorySlugs = (): string[] => {
  return Object.keys(categoryConfigs);
};
