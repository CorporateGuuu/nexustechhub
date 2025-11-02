export interface MockProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  condition: 'OEM' | 'Aftermarket';
  inStock: boolean;
  description: string;
  tags: string[];
}

export const mockProducts: MockProduct[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max Screen Assembly',
    price: 299.99,
    originalPrice: 349.99,
    image: '/images/products/iphone-15-screen.jpg',
    category: 'Screens',
    brand: 'Apple',
    condition: 'OEM',
    inStock: true,
    description: 'Original Apple iPhone 15 Pro Max OLED display assembly with Touch ID',
    tags: ['iphone', 'screen', 'oled', 'pro max', '15']
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Battery',
    price: 49.99,
    image: '/images/products/samsung-battery.jpg',
    category: 'Batteries',
    brand: 'Samsung',
    condition: 'Aftermarket',
    inStock: true,
    description: 'High-quality replacement battery for Samsung Galaxy S24',
    tags: ['samsung', 'battery', 'galaxy', 's24']
  },
  {
    id: '3',
    name: 'iPhone 14 Charging Port',
    price: 24.99,
    image: '/images/products/iphone-charging-port.jpg',
    category: 'Charging Ports',
    brand: 'Apple',
    condition: 'OEM',
    inStock: false,
    description: 'Genuine Apple Lightning charging port assembly',
    tags: ['iphone', 'charging', 'lightning', '14']
  },
  {
    id: '4',
    name: 'iPad Pro 12.9" Screen Protector',
    price: 39.99,
    image: '/images/products/ipad-screen-protector.jpg',
    category: 'Accessories',
    brand: 'Apple',
    condition: 'Aftermarket',
    inStock: true,
    description: 'Tempered glass screen protector for iPad Pro 12.9"',
    tags: ['ipad', 'screen protector', 'pro', '12.9']
  },
  {
    id: '5',
    name: 'Samsung Galaxy Tab S9 Battery',
    price: 69.99,
    originalPrice: 79.99,
    image: '/images/products/samsung-tab-battery.jpg',
    category: 'Batteries',
    brand: 'Samsung',
    condition: 'OEM',
    inStock: true,
    description: 'Original Samsung battery for Galaxy Tab S9 series',
    tags: ['samsung', 'battery', 'tablet', 'tab s9']
  },
  {
    id: '6',
    name: 'iPhone Repair Toolkit Pro',
    price: 89.99,
    image: '/images/products/repair-toolkit.jpg',
    category: 'Tools',
    brand: 'Generic',
    condition: 'Aftermarket',
    inStock: true,
    description: 'Professional repair toolkit with precision screwdrivers and tools',
    tags: ['toolkit', 'repair', 'screwdriver', 'tools']
  },
  {
    id: '7',
    name: 'iPhone 13 Home Button Assembly',
    price: 19.99,
    image: '/images/products/iphone-home-button.jpg',
    category: 'Buttons',
    brand: 'Apple',
    condition: 'Aftermarket',
    inStock: true,
    description: 'Replacement home button assembly with Touch ID sensor',
    tags: ['iphone', 'home button', 'touch id', '13']
  },
  {
    id: '8',
    name: 'Samsung A54 Screen Digitizer',
    price: 89.99,
    image: '/images/products/samsung-screen.jpg',
    category: 'Screens',
    brand: 'Samsung',
    condition: 'OEM',
    inStock: false,
    description: 'Original Samsung AMOLED screen digitizer for Galaxy A54',
    tags: ['samsung', 'screen', 'amoled', 'a54']
  },
  {
    id: '9',
    name: 'Wireless Charging Coil',
    price: 14.99,
    image: '/images/products/wireless-coil.jpg',
    category: 'Charging',
    brand: 'Generic',
    condition: 'Aftermarket',
    inStock: true,
    description: 'Universal wireless charging coil replacement',
    tags: ['wireless', 'charging', 'coil', 'replacement']
  },
  {
    id: '10',
    name: 'iPad Air 5 Screen Assembly',
    price: 199.99,
    originalPrice: 249.99,
    image: '/images/products/ipad-air-screen.jpg',
    category: 'Screens',
    brand: 'Apple',
    condition: 'OEM',
    inStock: true,
    description: 'Complete screen assembly for iPad Air 5th generation',
    tags: ['ipad', 'screen', 'air', '5th gen']
  }
];

export const getMockProducts = (): MockProduct[] => {
  return mockProducts;
};

export const searchMockProducts = (query: string): MockProduct[] => {
  if (!query.trim()) return mockProducts;

  const searchTerm = query.toLowerCase();
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const filterMockProducts = (
  products: MockProduct[],
  filters: {
    brands: string[];
    priceRange: { min: number; max: number };
    conditions: string[];
  }
): MockProduct[] => {
  return products.filter(product => {
    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }

    // Price range filter
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
      return false;
    }

    // Condition filter
    if (filters.conditions.length > 0 && !filters.conditions.includes(product.condition)) {
      return false;
    }

    return true;
  });
};
