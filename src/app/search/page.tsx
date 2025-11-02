'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getMockProducts, filterMockProducts, MockProduct } from '../../lib/mockData';
import { Product } from '../../types';
import ProductGrid from '../../components/Product/ProductGrid';
import FacetedFilters from '../../components/Product/FacetedFilters';

// Convert MockProduct to Product format
const convertToProduct = (mockProduct: MockProduct): Product => ({
  _id: mockProduct.id,
  id: mockProduct.id,
  name: mockProduct.name,
  price: mockProduct.price,
  originalPrice: mockProduct.originalPrice,
  image: mockProduct.image,
  gallery: [mockProduct.image], // Use image as single gallery item
  category: mockProduct.category,
  brand: mockProduct.brand,
  inStock: mockProduct.inStock,
  description: mockProduct.description,
});

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const allMockProducts = getMockProducts();
  const filters = {
    brands: [] as string[],
    priceRange: { min: 0, max: 1000 },
    conditions: [] as string[]
  };

  // Filter products based on search query and filters
  const filteredMockProducts = useMemo(() => {
    let products = allMockProducts;

    // First apply search query
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Then apply filters
    return filterMockProducts(products, filters);
  }, [allMockProducts, query]);

  // Convert to Product format for ProductGrid
  const filteredProducts: Product[] = filteredMockProducts.map(convertToProduct);

  if (!query.trim()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Results</h1>
          <p className="text-gray-600">Please enter a search term to find products.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600">
          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching your search
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-80 flex-shrink-0">
          <FacetedFilters
            products={filteredProducts}
            onFiltersChange={() => {}} // Placeholder - filters not implemented yet
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
