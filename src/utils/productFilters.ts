import { Product, FilterOption, FilterState } from '../types';

// Filter and sort products based on filter state
export function filterAndSortProducts(products: Product[], filters: FilterState): Product[] {
  let filtered = products.filter(product => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)));

      if (!matchesSearch) return false;
    }

    // Brand filter
    if (filters.brands.length > 0) {
      const brandMatch = filters.brands.some(brand =>
        product.brand?.toLowerCase().includes(brand.toLowerCase()) ||
        product.name.toLowerCase().includes(brand.toLowerCase())
      );
      if (!brandMatch) return false;
    }

    // Device filter (based on product name)
    if (filters.devices.length > 0) {
      const deviceMatch = filters.devices.some(device =>
        product.name.toLowerCase().includes(device.toLowerCase())
      );
      if (!deviceMatch) return false;
    }

    // Part type filter
    if (filters.partTypes.length > 0) {
      const partMatch = filters.partTypes.some(part =>
        product.name.toLowerCase().includes(part.toLowerCase()) ||
        product.description.toLowerCase().includes(part.toLowerCase()) ||
        product.category.toLowerCase().includes(part.toLowerCase())
      );
      if (!partMatch) return false;
    }

    // Condition filter
    if (filters.conditions.length > 0) {
      const conditionMatch = filters.conditions.some(condition =>
        product.condition?.toLowerCase().includes(condition.toLowerCase()) ||
        product.name.toLowerCase().includes(condition.toLowerCase())
      );
      if (!conditionMatch) return false;
    }

    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    return true;
  });

  // Sort products
  filtered.sort((a, b) => {
    switch (filters.sort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
  });

  return filtered;
}

// Calculate filter counts from products
export function calculateFilterCounts(products: Product[]): {
  brands: FilterOption[];
  devices: FilterOption[];
  partTypes: FilterOption[];
  conditions: FilterOption[];
} {
  const brandCounts = new Map<string, number>();
  const deviceCounts = new Map<string, number>();
  const partTypeCounts = new Map<string, number>();
  const conditionCounts = new Map<string, number>();

  products.forEach(product => {
    // Brands
    const brand = product.brand || 'Unknown';
    brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);

    // Devices (extract from product name - simplified logic)
    const devicePatterns = ['iPhone', 'iPad', 'Apple Watch', 'MacBook', 'Samsung', 'Google Pixel', 'OnePlus', 'Motorola'];
    devicePatterns.forEach(device => {
      if (product.name.toLowerCase().includes(device.toLowerCase())) {
        deviceCounts.set(device, (deviceCounts.get(device) || 0) + 1);
      }
    });

    // Part Types (extract from product name/description)
    const partTypePatterns = [
      'Screen', 'Display', 'Battery', 'Camera', 'Charging Port', 'Back Glass',
      'Screen Protector', 'Case', 'Cable', 'Charger', 'Headphones', 'Speakers'
    ];
    partTypePatterns.forEach(partType => {
      if (product.name.toLowerCase().includes(partType.toLowerCase()) ||
          product.description.toLowerCase().includes(partType.toLowerCase())) {
        partTypeCounts.set(partType, (partTypeCounts.get(partType) || 0) + 1);
      }
    });

    // Conditions
    const condition = product.condition || 'New';
    conditionCounts.set(condition, (conditionCounts.get(condition) || 0) + 1);
  });

  return {
    brands: Array.from(brandCounts.entries()).map(([name, count]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count
    })),
    devices: Array.from(deviceCounts.entries()).map(([name, count]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count
    })),
    partTypes: Array.from(partTypeCounts.entries()).map(([name, count]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count
    })),
    conditions: Array.from(conditionCounts.entries()).map(([name, count]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count
    }))
  };
}

// Build Supabase query from filters
export function buildSupabaseQuery(query: any, filters: FilterState) {
  let supabaseQuery = query;

  // Active status
  supabaseQuery = supabaseQuery.eq('is_active', true);

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.trim();
    supabaseQuery = supabaseQuery.or(
      `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,brand_id.ilike.%${searchTerm}%,sku.ilike.%${searchTerm}%`
    );
  }

  // Brand filter
  if (filters.brands.length > 0) {
    supabaseQuery = supabaseQuery.in('brand_id', filters.brands);
  }

  // Category/Device filter (simplified - assuming category_id maps to devices)
  if (filters.devices.length > 0) {
    supabaseQuery = supabaseQuery.in('category_id', filters.devices);
  }

  // Price range filter
  if (filters.priceRange[0] > 0) {
    supabaseQuery = supabaseQuery.gte('price', filters.priceRange[0]);
  }
  if (filters.priceRange[1] < 5000) {
    supabaseQuery = supabaseQuery.lte('price', filters.priceRange[1]);
  }

  // Condition filter
  if (filters.conditions.length > 0) {
    supabaseQuery = supabaseQuery.in('condition', filters.conditions);
  }

  // Sort
  switch (filters.sort) {
    case 'price-low':
      supabaseQuery = supabaseQuery.order('price', { ascending: true });
      break;
    case 'price-high':
      supabaseQuery = supabaseQuery.order('price', { ascending: false });
      break;
    case 'name':
      supabaseQuery = supabaseQuery.order('name', { ascending: true });
      break;
    case 'newest':
    default:
      supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
      break;
  }

  return supabaseQuery;
}

// Create URL from filter state
export function createFilterURL(filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.search) params.set('search', filters.search);
  if (filters.brands.length > 0) params.set('brands', filters.brands.join(','));
  if (filters.devices.length > 0) params.set('devices', filters.devices.join(','));
  if (filters.partTypes.length > 0) params.set('partTypes', filters.partTypes.join(','));
  if (filters.conditions.length > 0) params.set('conditions', filters.conditions.join(','));
  if (filters.priceRange[0] > 0) params.set('minPrice', filters.priceRange[0].toString());
  if (filters.priceRange[1] < 5000) params.set('maxPrice', filters.priceRange[1].toString());
  if (filters.sort !== 'newest') params.set('sort', filters.sort);

  return params.toString();
}

// Parse URL to filter state
export function parseURLToFilters(searchParams: URLSearchParams): FilterState {
  return {
    search: searchParams.get('search') || '',
    brands: searchParams.get('brands')?.split(',').filter(Boolean) || [],
    priceRange: [
      parseInt(searchParams.get('minPrice') || '0'),
      parseInt(searchParams.get('maxPrice') || '5000')
    ],
    devices: searchParams.get('devices')?.split(',').filter(Boolean) || [],
    partTypes: searchParams.get('partTypes')?.split(',').filter(Boolean) || [],
    conditions: searchParams.get('conditions')?.split(',').filter(Boolean) || [],
    sort: (searchParams.get('sort') || 'newest') as any
  };
}

// Server-side pagination utilities
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function getPaginationInfo(
  totalItems: number,
  currentPage: number = 1,
  itemsPerPage: number = 24
): PaginationInfo {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
}

export function getPageItems<T>(
  items: T[],
  page: number = 1,
  itemsPerPage: number = 24
): T[] {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
}
