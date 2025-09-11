import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../components/SEOHead';
import UnifiedHeader from '../components/UnifiedHeader/UnifiedHeader';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { supabase } from '../lib/db';
import styles from '../styles/Products.module.css';

export default function Products() {
  const router = useRouter();
  const { category, search } = router.query;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(search || '');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 12;

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, searchTerm, sortBy, currentPage]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            slug
          ),
          product_images (
            image_url,
            is_primary
          )
        `, { count: 'exact' });

      // Apply filters
      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        default:
          query = query.order('name', { ascending: true });
      }

      // Apply pagination
      const from = (currentPage - 1) * productsPerPage;
      const to = from + productsPerPage - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      setProducts(data || []);
      setTotalProducts(count || 0);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const getProductImage = (product) => {
    const primaryImage = product.product_images?.find(img => img.is_primary);
    return primaryImage?.image_url || product.image_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED'
    }).format(price);
  };

  return (
    <>
      <SEOHead
        title="iPhone Parts & Mobile Repair Products | Nexus TechHub UAE"
        description="Browse our comprehensive collection of iPhone parts, Samsung components, and professional repair tools. High-quality replacement parts with warranty guarantee."
        keywords="iPhone parts UAE, Samsung repair parts, mobile repair tools, replacement screens, batteries, Dubai repair parts"
      />

      <UnifiedHeader />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1>iPhone Parts & Mobile Repair Products</h1>
            <p>Professional quality replacement parts for all your repair needs</p>
          </div>

          {/* Filters and Search */}
          <div className={styles.filtersSection}>
            <div className={styles.searchBar}>
              <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                  🔍 Search
                </button>
              </form>
            </div>

            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <label>Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label>Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              <button onClick={clearFilters} className={styles.clearButton}>
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className={styles.resultsSummary}>
            <p>
              {loading ? 'Loading...' : `Showing ${products.length} of ${totalProducts} products`}
              {selectedCategory && ` in ${categories.find(c => c.id.toString() === selectedCategory)?.name}`}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className={styles.noProducts}>
              <h3>No products found</h3>
              <p>Try adjusting your search criteria or browse all products.</p>
              <button onClick={clearFilters} className={styles.clearButton}>
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className={styles.productsGrid}>
                {products.map((product) => (
                  <div key={product.id} className={styles.productCard}>
                    <div className={styles.productImage}>
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop';
                        }}
                      />
                      {product.is_featured && (
                        <span className={styles.featuredBadge}>Featured</span>
                      )}
                      {product.is_new && (
                        <span className={styles.newBadge}>New</span>
                      )}
                    </div>

                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productCategory}>
                        {product.categories?.name || 'Parts'}
                      </p>
                      <p className={styles.productDescription}>
                        {product.description?.substring(0, 100)}...
                      </p>

                      <div className={styles.productFooter}>
                        <div className={styles.priceSection}>
                          <span className={styles.price}>
                            {formatPrice(product.price)}
                          </span>
                          {product.discount_percentage > 0 && (
                            <span className={styles.discount}>
                              {product.discount_percentage}% off
                            </span>
                          )}
                        </div>

                        <div className={styles.stockInfo}>
                          {product.stock_quantity > 0 ? (
                            <span className={styles.inStock}>
                              {product.stock_quantity} in stock
                            </span>
                          ) : (
                            <span className={styles.outOfStock}>Out of stock</span>
                          )}
                        </div>
                      </div>

                      <button
                        className={styles.viewDetailsButton}
                        onClick={() => router.push(`/products/${product.slug}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={styles.pageButton}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={styles.pageButton}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
