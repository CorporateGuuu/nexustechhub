'use client';

import { FilterOption, FilterState } from '../../types';
import { useState, useEffect } from 'react';
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Package,
  Smartphone,
  Cpu,
  Shield,
  DollarSign,
  CheckCircle,
  Filter,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { FilterCounts } from '../../utils/filterCounts';

interface FilterSidebarProps {
  brands: FilterOption[];
  devices: FilterOption[];
  partTypes: FilterOption[];
  conditions: FilterOption[];
  currentFilters: FilterState;
  baseUrl: string;
  className?: string;
  mobile?: boolean;
  onMobileClose?: () => void;
  filterCounts?: FilterCounts;
}

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'popular', label: 'Most Popular' },
];

const partTypeOptions = [
  { id: 'screen', name: 'Screen / Display', count: 0 },
  { id: 'battery', name: 'Battery', count: 0 },
  { id: 'camera', name: 'Camera', count: 0 },
  { id: 'charging-port', name: 'Charging Port', count: 0 },
  { id: 'back-glass', name: 'Back Glass', count: 0 },
  { id: 'motherboard', name: 'Motherboard', count: 0 },
  { id: 'speaker', name: 'Speaker', count: 0 },
  { id: 'microphone', name: 'Microphone', count: 0 },
  { id: 'vibrator', name: 'Vibrator Motor', count: 0 },
  { id: 'buttons', name: 'Buttons', count: 0 },
  { id: 'flex-cable', name: 'Flex Cable', count: 0 },
  { id: 'antenna', name: 'Antenna', count: 0 },
];

const conditionOptions = [
  { id: 'oem', name: 'OEM (Original)', count: 0 },
  { id: 'high-quality', name: 'High-Quality', count: 0 },
  { id: 'refurbished', name: 'Refurbished', count: 0 },
  { id: 'used', name: 'Used', count: 0 },
];

const ratingOptions = [
  { id: '4+', name: '4+ Stars', count: 0 },
  { id: '3+', name: '3+ Stars', count: 0 },
  { id: '2+', name: '2+ Stars', count: 0 },
];



function createFilterLink(baseUrl: string, updates: Partial<FilterState>): string {
  // Get current URL params from window.location
  const currentParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const params = new URLSearchParams(currentParams);

  // Handle array-based updates (multi-select)
  if (updates.brands !== undefined) {
    if (updates.brands.length === 0) {
      params.delete('brands');
    } else {
      params.set('brands', updates.brands.join(','));
    }
  }

  if (updates.devices !== undefined) {
    if (updates.devices.length === 0) {
      params.delete('devices');
    } else {
      params.set('devices', updates.devices.join(','));
    }
  }

  if (updates.partTypes !== undefined) {
    if (updates.partTypes.length === 0) {
      params.delete('partTypes');
    } else {
      params.set('partTypes', updates.partTypes.join(','));
    }
  }

  if (updates.conditions !== undefined) {
    if (updates.conditions.length === 0) {
      params.delete('conditions');
    } else {
      params.set('conditions', updates.conditions.join(','));
    }
  }

  // Handle single-value updates
  if (updates.search !== undefined) {
    if (updates.search === '') {
      params.delete('search');
    } else {
      params.set('search', updates.search);
    }
  }

  if (updates.sort !== undefined) {
    if (updates.sort === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', updates.sort);
    }
  }

  if (updates.priceRange !== undefined) {
    if (updates.priceRange[0] === 0) {
      params.delete('minPrice');
    } else {
      params.set('minPrice', updates.priceRange[0].toString());
    }
    if (updates.priceRange[1] === 5000) {
      params.delete('maxPrice');
    } else {
      params.set('maxPrice', updates.priceRange[1].toString());
    }
  }

  // Extended filters
  if (updates.rating !== undefined) {
    if (updates.rating === '') {
      params.delete('rating');
    } else {
      params.set('rating', updates.rating);
    }
  }

  if (updates.inStockOnly !== undefined) {
    if (updates.inStockOnly) {
      params.set('inStockOnly', 'true');
    } else {
      params.delete('inStockOnly');
    }
  }

  if (updates.hasVideo !== undefined) {
    if (updates.hasVideo) {
      params.set('hasVideo', 'true');
    } else {
      params.delete('hasVideo');
    }
  }

  if (updates.has360View !== undefined) {
    if (updates.has360View) {
      params.set('has360View', 'true');
    } else {
      params.delete('has360View');
    }
  }

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

function toggleArrayFilter(current: string[], value: string): string[] {
  return current.includes(value)
    ? current.filter(item => item !== value)
    : [...current, value];
}

function getCurrentArrayFromUrl(urlParams: URLSearchParams, key: string): string[] {
  const value = urlParams.get(key);
  return value ? value.split(',').filter(Boolean) : [];
}

export default function FilterSidebar({
  brands = [],
  devices = [],
  currentFilters,
  baseUrl,
  className = '',
  mobile = false,
  onMobileClose,
  filterCounts,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    search: true,
    sort: true,
    price: false,
    brand: false,
    device: false,
    partType: false,
    condition: false,
    compatibility: false,
    rating: false,
    features: false,
  });

  const [priceRange, setPriceRange] = useState<[number, number]>(
    currentFilters?.priceRange || [0, 5000]
  );

  const [filterSearch, setFilterSearch] = useState<Record<string, string>>({
    brands: '',
    devices: '',
    partTypes: '',
  });

  // Provide default filter state if currentFilters is undefined
  const filters = currentFilters || {
    search: '',
    brands: [],
    priceRange: [0, 5000],
    devices: [],
    partTypes: [],
    conditions: [],
    sort: 'newest' as const,
    rating: '',
    inStockOnly: false,
    hasVideo: false,
    has360View: false,
  };

  const activeFiltersCount =
    (filters.brands?.length || 0) +
    (filters.devices?.length || 0) +
    (filters.partTypes?.length || 0) +
    (filters.conditions?.length || 0) +
    ((filters.priceRange?.[0] || 0) > 0 || (filters.priceRange?.[1] || 5000) < 5000 ? 1 : 0) +
    (filters.search ? 1 : 0) +
    (filters.rating ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.hasVideo ? 1 : 0) +
    (filters.has360View ? 1 : 0);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({
    title,
    children,
    sectionKey,
    icon: Icon,
    defaultExpanded = false
  }: {
    title: string;
    children: React.ReactNode;
    sectionKey: string;
    icon?: any;
    defaultExpanded?: boolean;
  }) => {
    const isExpanded = expandedSections[sectionKey] ?? defaultExpanded;

    return (
      <div className="border-b border-gray-100 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full text-left py-2 hover:bg-gray-50 -m-2 px-2 rounded"
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-gray-500" />}
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  const CheckboxGroup = ({
    title,
    options,
    selected,
    filterKey,
    icon: Icon,
    searchable = false
  }: {
    title: string;
    options: FilterOption[];
    selected: string[];
    filterKey: keyof Pick<FilterState, 'brands' | 'devices' | 'partTypes' | 'conditions'>;
    icon?: any;
    searchable?: boolean;
  }) => {
    const searchQuery = filterSearch[filterKey] || '';
    const filteredOptions = searchable && searchQuery
      ? options.filter(option =>
          option.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

    return (
      <FilterSection title={title} sectionKey={filterKey} icon={Icon} defaultExpanded={false}>
        {/* Search box inside filter group */}
        {searchable && (
          <div className="relative mb-3">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setFilterSearch(prev => ({
                ...prev,
                [filterKey]: e.target.value
              }))}
              className="w-full pl-7 pr-3 py-2 text-xs border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setFilterSearch(prev => ({
                  ...prev,
                  [filterKey]: ''
                }))}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {filteredOptions.length > 0 ? filteredOptions.map(option => {
            const isSelected = selected.includes(option.id);
            const linkUrl = createFilterLink(baseUrl, {
              [filterKey]: toggleArrayFilter(selected, option.id)
            });

            return (
              <a
                key={option.id}
                href={linkUrl}
                className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                  isSelected
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm ${isSelected ? 'font-medium text-blue-900' : 'text-gray-700'}`}>
                    {option.name}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isSelected ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.count}
                </span>
              </a>
            );
          }) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              No {title.toLowerCase()} found
            </div>
          )}
        </div>
      </FilterSection>
    );
  };

  const SpecialToggle = ({
    id,
    name,
    icon: Icon,
    isActive,
    count = 0
  }: {
    id: string;
    name: string;
    icon: any;
    isActive: boolean;
    count?: number;
  }) => {
    const linkUrl = createFilterLink(baseUrl, {
      [id]: !isActive
    });

    return (
      <a
        href={linkUrl}
        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
          isActive
            ? 'bg-green-50 border-green-200'
            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-600'}`} />
          <span className={`text-sm font-medium ${isActive ? 'text-green-900' : 'text-gray-900'}`}>
            {name}
          </span>
        </div>
        {count > 0 && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
          }`}>
            {count}
          </span>
        )}
      </a>
    );
  };

  return (
    <div className={`bg-white ${mobile ? 'h-full overflow-y-auto' : 'rounded-lg border border-gray-200'} ${className}`}>
      {/* Mobile Header */}
      {mobile && (
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onMobileClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Desktop Header */}
      {!mobile && (
        <div className="p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            {activeFiltersCount > 0 && (
              <a
                href={baseUrl}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all ({activeFiltersCount})
              </a>
            )}
          </div>
        </div>
      )}

      <div className={`${mobile ? 'p-4' : 'p-6 pt-4'}`}>
        {/* Search Form */}
        <FilterSection title="Search Products" sectionKey="search" icon={Search} defaultExpanded={true}>
          <form method="GET" action={baseUrl} className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search parts, models, brands..."
              defaultValue={filters.search || ''}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => window.location.href = createFilterLink(baseUrl, { search: '' })}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {/* Preserve other filters in hidden inputs */}
            {filters.brands?.length > 0 && (
              <input type="hidden" name="brands" value={filters.brands.join(',')} />
            )}
            {filters.devices?.length > 0 && (
              <input type="hidden" name="devices" value={filters.devices.join(',')} />
            )}
            {filters.partTypes?.length > 0 && (
              <input type="hidden" name="partTypes" value={filters.partTypes.join(',')} />
            )}
            {filters.conditions?.length > 0 && (
              <input type="hidden" name="conditions" value={filters.conditions.join(',')} />
            )}
            {(filters.priceRange?.[0] || 0) > 0 && (
              <input type="hidden" name="minPrice" value={filters.priceRange[0]} />
            )}
            {(filters.priceRange?.[1] || 5000) < 5000 && (
              <input type="hidden" name="maxPrice" value={filters.priceRange[1]} />
            )}
            {filters.sort !== 'newest' && (
              <input type="hidden" name="sort" value={filters.sort} />
            )}
          </form>
        </FilterSection>

        {/* Sort */}
        <FilterSection title="Sort By" sectionKey="sort" defaultExpanded={true}>
          <div className="grid grid-cols-1 gap-1">
            {sortOptions.map(option => {
              const isSelected = filters.sort === option.value;
              const linkUrl = createFilterLink(baseUrl, { sort: option.value as FilterState['sort'] });

              return (
                <a
                  key={option.value}
                  href={linkUrl}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className={isSelected ? 'font-medium' : ''}>{option.label}</span>
                </a>
              );
            })}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" sectionKey="price" icon={DollarSign} defaultExpanded={false}>
          <div className="space-y-4">
            {/* Price inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newMin = parseInt(e.target.value) || 0;
                    setPriceRange([newMin, priceRange[1]]);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value) || 5000;
                    setPriceRange([priceRange[0], newMax]);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="5000"
                />
              </div>
            </div>

            {/* Apply button */}
            <a
              href={createFilterLink(baseUrl, { priceRange: priceRange as [number, number] })}
              className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Apply Price Range
            </a>

            {/* Quick price options */}
            <div className="space-y-1">
              {[
                { label: 'Under $50', range: [0, 50] },
                { label: 'Under $100', range: [0, 100] },
                { label: '$100 - $500', range: [100, 500] },
                { label: 'All Prices', range: [0, 5000] },
              ].map((option, index) => {
                const isSelected = filters.priceRange?.[0] === option.range[0] && filters.priceRange?.[1] === option.range[1];
                return (
                  <a
                    key={index}
                    href={createFilterLink(baseUrl, { priceRange: option.range as [number, number] })}
                    className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </a>
                );
              })}
            </div>
          </div>
        </FilterSection>

        {/* Brands */}
        {brands.length > 0 && (
          <CheckboxGroup
            title="Brand"
            options={brands}
            selected={filters.brands || []}
            filterKey="brands"
            searchable={brands.length > 10}
          />
        )}

        {/* Devices */}
        {devices.length > 0 && (
          <CheckboxGroup
            title="Device / Model"
            options={devices}
            selected={filters.devices || []}
            filterKey="devices"
            icon={Smartphone}
            searchable={devices.length > 15}
          />
        )}

        {/* Part Types */}
        <FilterSection title="Part Type" sectionKey="partType" icon={Cpu} defaultExpanded={false}>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {partTypeOptions.map(option => {
              const isSelected = filters.partTypes?.includes(option.id);
              const realCount = filterCounts?.partTypes?.[option.id] || option.count || 0;
              const linkUrl = createFilterLink(baseUrl, {
                partTypes: toggleArrayFilter(filters.partTypes || [], option.id)
              });

              return (
                <a
                  key={option.id}
                  href={linkUrl}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-sm ${isSelected ? 'font-medium text-blue-900' : 'text-gray-700'}`}>
                      {option.name}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isSelected ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {realCount.toLocaleString()}
                  </span>
                </a>
              );
            })}
          </div>
        </FilterSection>

        {/* Condition */}
        <FilterSection title="Condition" sectionKey="condition" icon={Shield} defaultExpanded={false}>
          <div className="space-y-2">
            {conditionOptions.map(option => {
              const isSelected = filters.conditions?.includes(option.id);
              const realCount = filterCounts?.conditions?.[option.id] || option.count || 0;
              const linkUrl = createFilterLink(baseUrl, {
                conditions: toggleArrayFilter(filters.conditions || [], option.id)
              });

              return (
                <a
                  key={option.id}
                  href={linkUrl}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                    isSelected
                      ? 'bg-green-50 border border-green-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className={`text-sm ${isSelected ? 'font-medium text-green-900' : 'text-gray-700'}`}>
                      {option.name}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isSelected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {realCount.toLocaleString()}
                  </span>
                </a>
              );
            })}
          </div>
        </FilterSection>

        {/* Compatibility - Dynamic */}
        <FilterSection title="Compatibility" sectionKey="compatibility" icon={CheckCircle} defaultExpanded={false}>
          <div className="text-sm text-gray-600 p-3 bg-blue-50 rounded-lg">
            <p>Compatible with selected device models and series.</p>
            <p className="text-xs mt-1">Filter by device above to see compatibility options.</p>
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Customer Rating" sectionKey="rating" icon={Star} defaultExpanded={false}>
          <div className="space-y-2">
            {ratingOptions.map(option => {
              const isSelected = filters.rating === option.id;
              const linkUrl = createFilterLink(baseUrl, { rating: isSelected ? '' : option.id });

              return (
                <a
                  key={option.id}
                  href={linkUrl}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    isSelected
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= parseInt(option.id.replace('+', ''))
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-sm font-medium ${isSelected ? 'text-yellow-900' : 'text-gray-900'}`}>
                      {option.name}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isSelected ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {option.count}
                  </span>
                </a>
              );
            })}
          </div>
        </FilterSection>

        {/* Special Features */}
        <FilterSection title="Special Features" sectionKey="features" icon={Filter} defaultExpanded={false}>
          <div className="space-y-3">
            <SpecialToggle
              id="inStockOnly"
              name="In Stock Only"
              icon={Package}
              isActive={filters.inStockOnly || false}
              count={0}
            />
            <SpecialToggle
              id="hasVideo"
              name="With Installation Video"
              icon={CheckCircle}
              isActive={filters.hasVideo || false}
              count={0}
            />
            <SpecialToggle
              id="has360View"
              name="360° Product View"
              icon={RotateCcw}
              isActive={filters.has360View || false}
              count={0}
            />
          </div>
        </FilterSection>

        {/* Clear All */}
        {activeFiltersCount > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <a
              href={baseUrl}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Clear All Filters ({activeFiltersCount})
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
