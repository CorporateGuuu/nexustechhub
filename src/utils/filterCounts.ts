import { supabaseServer } from '../lib/supabase/server';

export interface FilterCounts {
  brands: { [key: string]: number };
  devices: { [key: string]: number };
  partTypes: { [key: string]: number };
  conditions: { [key: string]: number };
  ratings: { [key: string]: number };
  totalProducts: number;
  inStockCount: number;
  hasVideoCount: number;
  has360ViewCount: number;
}

export async function getFilterCounts(categorySlug: string, currentFilters: any = {}): Promise<FilterCounts> {
  const categoryConfig = await import('./categoryConfig').then(m => m.getCategoryConfig(categorySlug));

  if (!categoryConfig) {
    return {
      brands: {},
      devices: {},
      partTypes: {},
      conditions: {},
      ratings: {},
      totalProducts: 0,
      inStockCount: 0,
      hasVideoCount: 0,
      has360ViewCount: 0,
    };
  }

  // Get total count for this category
  let totalQuery = supabaseServer
    .from('products')
    .select('*', { count: 'exact', head: true });

  totalQuery = categoryConfig.buildQuery(totalQuery, {
    search: '',
    brands: [],
    priceRange: [0, 5000],
    devices: [],
    partTypes: [],
    conditions: [],
    sort: 'newest' as const,
  });
  const { count: totalProducts } = await totalQuery;

  // Get brand counts
  const { data: brandData } = await supabaseServer
    .from('products')
    .select('brand_id')
    .eq('is_active', true);

  const brands: { [key: string]: number } = {};
  if (brandData) {
    brandData.forEach((product: any) => {
      if (product.brand_id) {
        brands[product.brand_id] = (brands[product.brand_id] || 0) + 1;
      }
    });
  }

  // Get device counts (from names containing device keywords)
  const deviceKeywords = ['iPhone', 'iPad', 'Galaxy', 'Pixel', 'Moto', 'OnePlus', 'Huawei', 'Xiaomi'];
  const devices: { [key: string]: number } = {};
  deviceKeywords.forEach(keyword => {
    devices[keyword] = Math.floor(Math.random() * 500) + 50; // Mock data for demo
  });

  // Get part type counts (from category_id or name patterns)
  const partTypePatterns = [
    { id: 'screen', patterns: ['screen', 'display', 'lcd', 'oled'] },
    { id: 'battery', patterns: ['battery'] },
    { id: 'camera', patterns: ['camera'] },
    { id: 'charging-port', patterns: ['charging', 'port', 'lightning', 'usb'] },
    { id: 'back-glass', patterns: ['back', 'glass', 'rear'] },
    { id: 'motherboard', patterns: ['motherboard', 'logic', 'board'] },
    { id: 'speaker', patterns: ['speaker', 'audio'] },
    { id: 'microphone', patterns: ['microphone', 'mic'] },
    { id: 'vibrator', patterns: ['vibrator', 'motor'] },
    { id: 'buttons', patterns: ['button', 'power', 'volume'] },
    { id: 'flex-cable', patterns: ['flex', 'cable'] },
    { id: 'antenna', patterns: ['antenna'] },
  ];

  const partTypes: { [key: string]: number } = {};
  partTypePatterns.forEach(({ id, patterns }) => {
    partTypes[id] = Math.floor(Math.random() * 200) + 10; // Mock data for demo
  });

  // Get condition counts
  const conditions: { [key: string]: number } = {
    'oem': Math.floor(Math.random() * 300) + 100,
    'high-quality': Math.floor(Math.random() * 400) + 150,
    'refurbished': Math.floor(Math.random() * 200) + 50,
    'used': Math.floor(Math.random() * 100) + 25,
  };

  // Get rating counts
  const ratings: { [key: string]: number } = {
    '4+': Math.floor(Math.random() * 800) + 200,
    '3+': Math.floor(Math.random() * 600) + 150,
    '2+': Math.floor(Math.random() * 200) + 50,
  };

  // Get special feature counts
  const inStockCount = Math.floor(Math.random() * 900) + 500;
  const hasVideoCount = Math.floor(Math.random() * 300) + 50;
  const has360ViewCount = Math.floor(Math.random() * 100) + 10;

  return {
    brands,
    devices,
    partTypes,
    conditions,
    ratings,
    totalProducts: totalProducts || 0,
    inStockCount,
    hasVideoCount,
    has360ViewCount,
  };
}
