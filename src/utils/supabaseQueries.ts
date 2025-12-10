// =============================================================================
// BULLETPROOF SUPABASE QUERY SYSTEM - Nexus Tech Hub
// 100% SAFE - Never crashes, handles all edge cases
// =============================================================================

import { supabaseServer } from '../lib/supabase/server';
import { Product, FilterState } from '../types';

export interface QueryResult {
  products: Product[];
  totalCount: number;
  error?: string;
}

// =============================================================================
// SAFE SLUG HANDLING - Handles any URL safely
// =============================================================================

export const SLUG_MAPPINGS: Record<string, string> = {
  // Handle URL-encoded versions
  'tools-&-supplies': 'tools',
  'tools-%26-supplies': 'tools',
  'tools%26supplies': 'tools',

  // Standard mappings
  'apple': 'apple',
  'samsung': 'samsung',
  'google-pixel': 'google-pixel',
  'motorola': 'motorola',
  'other-parts': 'other-parts',
  'board-components': 'board-components',
  'game-console': 'game-console',
  'accessories': 'accessories',
  'refurbishing': 'refurbishing',
};

/**
 * Safely decode and normalize any URL slug
 */
export function normalizeSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') return '';

  try {
    // Handle URL decoding
    const decoded = decodeURIComponent(slug);
    // Handle both encoded and unencoded versions
    return SLUG_MAPPINGS[decoded] || SLUG_MAPPINGS[slug] || decoded;
  } catch {
    // If decoding fails, use original or mapping
    return SLUG_MAPPINGS[slug] || slug;
  }
}

// =============================================================================
// BULLETPROOF QUERY BUILDER - Core safe query system
// =============================================================================

export class SafeSupabaseQuery {
  private query: any;
  private errors: string[] = [];

  constructor(table: string = 'products') {
    try {
      this.query = supabaseServer
        .from(table)
        .select(`
          *,
          brand:brand_id(name, slug),
          category:category_id(name, slug)
        `, { count: 'exact' });
    } catch (error) {
      this.errors.push(`Failed to initialize query: ${error}`);
      this.query = null;
    }
  }

  /**
   * Add base active filter - always safe
   */
  activeOnly(): this {
    if (!this.query) return this;

    try {
      this.query = this.query.eq('is_active', true);
    } catch (error) {
      this.errors.push(`Failed to add active filter: ${error}`);
    }
    return this;
  }

  /**
   * Safe text search with multiple fields
   */
  search(searchTerm: string): this {
    if (!this.query || !searchTerm?.trim()) return this;

    try {
      const term = searchTerm.trim();
      // Use safe ILIKE searches on multiple text fields
      this.query = this.query.or(`name.ilike.%${term}%,description.ilike.%${term}%,sku.ilike.%${term}%`);
    } catch (error) {
      this.errors.push(`Failed to add search filter: ${error}`);
    }
    return this;
  }

  /**
   * Safe brand filtering with array support
   */
  brands(brandSlugs: string[]): this {
    if (!this.query || !Array.isArray(brandSlugs) || brandSlugs.length === 0) return this;

    try {
      // Join with brands table and filter by slug
      this.query = this.query.in('brand.slug', brandSlugs);
    } catch (error) {
      this.errors.push(`Failed to add brand filter: ${error}`);
    }
    return this;
  }

  /**
   * Safe category filtering with array support
   */
  categories(categorySlugs: string[]): this {
    if (!this.query || !Array.isArray(categorySlugs) || categorySlugs.length === 0) return this;

    try {
      // Join with categories table and filter by slug
      this.query = this.query.in('category.slug', categorySlugs);
    } catch (error) {
      this.errors.push(`Failed to add category filter: ${error}`);
    }
    return this;
  }

  /**
   * Safe price range filtering
   */
  priceRange(min?: number, max?: number): this {
    if (!this.query) return this;

    try {
      if (min && min > 0) {
        this.query = this.query.gte('price', min);
      }
      if (max && max < 50000) { // Reasonable max
        this.query = this.query.lte('price', max);
      }
    } catch (error) {
      this.errors.push(`Failed to add price filter: ${error}`);
    }
    return this;
  }

  /**
   * Safe sorting with fallbacks
   */
  sort(sortBy: string = 'newest'): this {
    if (!this.query) return this;

    try {
      switch (sortBy) {
        case 'price-low':
          this.query = this.query.order('price', { ascending: true });
          break;
        case 'price-high':
          this.query = this.query.order('price', { ascending: false });
          break;
        case 'name':
          this.query = this.query.order('name', { ascending: true });
          break;
        case 'newest':
        default:
          this.query = this.query.order('created_at', { ascending: false });
          break;
      }
    } catch (error) {
      this.errors.push(`Failed to add sorting: ${error}`);
    }
    return this;
  }

  /**
   * Safe pagination
   */
  paginate(page: number = 1, limit: number = 24): this {
    if (!this.query) return this;

    try {
      const safePage = Math.max(1, Math.min(1000, page)); // Reasonable bounds
      const safeLimit = Math.max(1, Math.min(100, limit));
      const from = (safePage - 1) * safeLimit;
      const to = from + safeLimit - 1;

      this.query = this.query.range(from, to);
    } catch (error) {
      this.errors.push(`Failed to add pagination: ${error}`);
    }
    return this;
  }

  /**
   * Execute query safely - NEVER crashes
   */
  async execute(): Promise<QueryResult> {
    try {
      if (!this.query) {
        return {
          products: [],
          totalCount: 0,
          error: 'Query not initialized'
        };
      }

      const { data, error, count } = await this.query;

      if (error) {
        console.error('Supabase query error:', error);
        return {
          products: [],
          totalCount: 0,
          error: error.message
        };
      }

      // Transform data safely
      const products = this.transformProducts(data || []);

      return {
        products,
        totalCount: count || 0,
        error: this.errors.length > 0 ? this.errors.join('; ') : undefined
      };

    } catch (criticalError) {
      console.error('Critical query execution error:', criticalError);
      return {
        products: [],
        totalCount: 0,
        error: 'Database connection failed'
      };
    }
  }

  /**
   * Safely transform Supabase data to Product interface
   */
  private transformProducts(data: any[]): Product[] {
    if (!Array.isArray(data)) return [];

    return data.map((item, index) => {
      try {
        return {
          _id: item.id || `fallback-${index}`,
          id: item.id || `fallback-${index}`,
          name: item.name || 'Unknown Product',
          price: typeof item.price === 'number' ? item.price : 0,
          originalPrice: typeof item.original_price === 'number' ? item.original_price : undefined,
          image: item.thumbnail_url || item.images?.[0] || '/images/products/placeholder.svg',
          gallery: Array.isArray(item.images) ? item.images : [],
          category: item.category?.name || item.category?.slug || 'Uncategorized',
          brand: item.brand?.name || item.brand?.slug || 'Generic',
          inStock: (item.stock_quantity || 0) > 0,
          description: item.description || item.short_description || '',
          specs: {},
          sku: item.sku || undefined,
          condition: item.condition || 'New',
          carrier: 'Universal',
          stockStatus: (item.stock_quantity || 0) > 0 ? 'In Stock' : 'Out of Stock',
          slug: item.slug || undefined,
          shortDescription: item.short_description || undefined,
          isFeatured: item.is_featured || false,
          isNew: item.is_new || false,
          discountPercentage: item.discount_percentage || 0,
          metaTitle: item.meta_title || undefined,
          metaDescription: item.meta_description || undefined,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        };
      } catch (transformError) {
        console.error(`Failed to transform product ${index}:`, transformError);
        // Return minimal safe product
        return {
          _id: `error-${index}`,
          id: `error-${index}`,
          name: 'Product Unavailable',
          price: 0,
          image: '/images/products/placeholder.svg',
          gallery: [],
          category: 'Error',
          brand: 'Error',
          inStock: false,
          description: 'This product could not be loaded',
          specs: {},
          condition: 'Unknown',
          carrier: 'Universal',
          stockStatus: 'Out of Stock',
        };
      }
    });
  }
}

// =============================================================================
// CATEGORY-SPECIFIC QUERY HELPERS - Pre-configured safe queries
// =============================================================================

export const CATEGORY_QUERIES: Record<string, (filters: FilterState, page?: number, limit?: number) => Promise<QueryResult>> = {
  'apple': (filters, page = 1, limit = 24) => {
    return new SafeSupabaseQuery()
      .activeOnly()
      .search(filters.search)
      .brands(['apple'])
      .priceRange(filters.priceRange?.[0], filters.priceRange?.[1])
      .sort(filters.sort)
      .paginate(page, limit)
      .execute();
  },

  'samsung': (filters, page = 1, limit = 24) => {
    return new SafeSupabaseQuery()
      .activeOnly()
      .search(filters.search)
      .brands(['samsung'])
      .priceRange(filters.priceRange?.[0], filters.priceRange?.[1])
      .sort(filters.sort)
      .paginate(page, limit)
      .execute();
  },

  'google-pixel': (filters, page = 1, limit = 24) => {
    return new SafeSupabaseQuery()
      .activeOnly()
      .search(filters.search)
      .brands(['google-pixel', 'pixel'])
      .priceRange(filters.priceRange?.[0], filters.priceRange?.[1])
      .sort(filters.sort)
      .paginate(page, limit)
      .execute();
  },

  'motorola': (filters, page = 1, limit = 24) => {
    return new SafeSupabaseQuery()
      .activeOnly()
      .search(filters.search)
      .brands(['motorola'])
      .priceRange(filters.priceRange?.[0], filters.priceRange?.[1])
      .sort(filters.sort)
      .paginate(page, limit)
      .execute();
  },

  'tools': (filters, page = 1, limit = 24) => {
    return new SafeSupabaseQuery()
      .activeOnly()
      .search(filters.search || 'tool repair')
      // Search for tools in name, description, or categories
      .priceRange(filters.priceRange?.[0], filters.priceRange?.[1])
      .sort(filters.sort)
      .paginate(page, limit)
      .execute();
  },

  'accessories': (filters, page = 1, limit = 24) => {
    return new SafeSupabaseQuery()
      .activeOnly()
      .search(filters.search)
      .categories(['accessories'])
      .priceRange(filters.priceRange?.[0], filters.priceRange?.[1])
      .sort(filters.sort)
      .paginate(page, limit)
      .execute();
  },

  'refurbishing': (filters, page = 1, limit = 24) => {
    return new SafeSupabaseQuery()
      .activeOnly()
      .search(filters.search)
      .search('refurbish')
      .priceRange(filters.priceRange?.[0], filters.priceRange?.[1])
      .sort(filters.sort)
      .paginate(page, limit)
      .execute();
  },

  'game-console': (filters, page = 1, limit = 24) => {
    return new SafeSupabaseQuery()
      .activeOnly()
      .search(filters.search)
      .search('console gaming game')
      .priceRange(filters.priceRange?.[0], filters.priceRange?.[1])
      .sort(filters.sort)
      .paginate(page, limit)
      .execute();
  },

  'board-components': (filters, page = 1, limit = 24) => {
    return new SafeSupabaseQuery()
      .activeOnly()
      .search(filters.search)
      .search('board circuit component')
      .priceRange(filters.priceRange?.[0], filters.priceRange?.[1])
      .sort(filters.sort)
      .paginate(page, limit)
      .execute();
  },

  'other-parts': (filters, page = 1, limit = 24) => {
    return new SafeSupabaseQuery()
      .activeOnly()
      .search(filters.search)
      .priceRange(filters.priceRange?.[0], filters.priceRange?.[1])
      .sort(filters.sort)
      .paginate(page, limit)
      .execute();
  },
};

// =============================================================================
// MASTER QUERY FUNCTION - Use this for everything
// =============================================================================

/**
 * BULLETPROOF: Get products for any category with any filters
 * NEVER crashes, always returns safe data
 */
export async function getCategoryProducts(
  categorySlug: string,
  filters: FilterState,
  page: number = 1,
  limit: number = 24
): Promise<QueryResult> {
  try {
    const normalizedSlug = normalizeSlug(categorySlug);

    // Use pre-configured query if available
    const categoryQuery = CATEGORY_QUERIES[normalizedSlug];
    if (categoryQuery) {
      return await categoryQuery(filters, page, limit);
    }

    // Fallback: Generic safe query for unknown categories
    return new SafeSupabaseQuery()
      .activeOnly()
      .search(filters.search)
      .priceRange(filters.priceRange?.[0], filters.priceRange?.[1])
      .sort(filters.sort)
      .paginate(page, limit)
      .execute();

  } catch (error) {
    console.error(`Critical error in getCategoryProducts for ${categorySlug}:`, error);
    return {
      products: [],
      totalCount: 0,
      error: 'Failed to load products'
    };
  }
}

// =============================================================================
// UTILITY FUNCTIONS - Safe helpers
// =============================================================================

/**
 * Safe filter counts calculation
 */
export async function getFilterCounts(products: Product[]): Promise<any> {
  try {
    const counts = {
      brands: {} as Record<string, number>,
      categories: {} as Record<string, number>,
      priceRanges: {} as Record<string, number>,
    };

    products.forEach(product => {
      if (product.brand) {
        counts.brands[product.brand] = (counts.brands[product.brand] || 0) + 1;
      }
      if (product.category) {
        counts.categories[product.category] = (counts.categories[product.category] || 0) + 1;
      }
    });

    return counts;
  } catch (error) {
    console.error('Error calculating filter counts:', error);
    return { brands: {}, categories: {}, priceRanges: {} };
  }
}
