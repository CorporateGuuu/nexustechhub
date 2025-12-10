'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug?: string;
  category: string;
  brand: string;
}

interface ProductSearchBarProps {
  categorySlug: string;
  baseUrl: string;
  placeholder?: string;
  className?: string;
}

export default function ProductSearchBar({
  categorySlug,
  baseUrl,
  placeholder = "Search products...",
  className = ""
}: ProductSearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search function - replace with real API call
  const searchProducts = async (searchQuery: string): Promise<Product[]> => {
    if (!searchQuery.trim()) return [];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock results - replace with real Supabase query
    const mockResults: Product[] = [
      {
        id: '1',
        name: `${searchQuery} iPhone 15 Pro Screen`,
        price: 299.99,
        image: '/images/products/iphone-screen.jpg',
        slug: 'iphone-15-pro-screen',
        category: 'screens',
        brand: 'Apple'
      },
      {
        id: '2',
        name: `${searchQuery} Samsung Galaxy Battery`,
        price: 49.99,
        image: '/images/products/samsung-battery.jpg',
        slug: 'samsung-galaxy-battery',
        category: 'batteries',
        brand: 'Samsung'
      },
      {
        id: '3',
        name: `${searchQuery} Google Pixel Camera`,
        price: 89.99,
        image: '/images/products/pixel-camera.jpg',
        slug: 'google-pixel-camera',
        category: 'cameras',
        brand: 'Google'
      },
      {
        id: '4',
        name: `${searchQuery} iPhone Charging Port`,
        price: 24.99,
        image: '/images/products/iphone-charging.jpg',
        slug: 'iphone-charging-port',
        category: 'charging-ports',
        brand: 'Apple'
      },
      {
        id: '5',
        name: `${searchQuery} Samsung Screen Protector`,
        price: 14.99,
        image: '/images/products/screen-protector.jpg',
        slug: 'samsung-screen-protector',
        category: 'accessories',
        brand: 'Samsung'
      }
    ].filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return mockResults.slice(0, 5); // Return top 5 results
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await searchProducts(query);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(handleSearch, 150);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `${baseUrl}?search=${encodeURIComponent(query.trim())}`;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base shadow-sm"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <>
                {/* Results List */}
                <div className="py-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={product.slug ? `/product/${product.slug}` : `/products/${product.id}`}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/products/placeholder.svg';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View All Results */}
                <div className="border-t border-gray-100 p-3">
                  <Link
                    href={`${baseUrl}?search=${encodeURIComponent(query.trim())}`}
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    View all results for "{query}"
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </>
            ) : query.length >= 2 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4">
                <Search className="w-8 h-8 text-gray-300 mb-3" />
                <p className="text-sm text-gray-600 text-center">
                  No products found for "{query}"
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try different keywords or check spelling
                </p>
              </div>
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
}
